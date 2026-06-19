import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { createSupabaseServiceRoleClient } from "@/lib/supabase/server";

const MAX_ATTEMPTS = 5;
const LOCK_DURATION_MINUTES = 15;

async function getIpAddress(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  return "unknown";
}

async function recordLoginFailure(email: string, ipAddress: string) {
  const service = createSupabaseServiceRoleClient();
  const now = new Date().toISOString();
  const { data } = await service
    .from("admin_login_attempts")
    .select("id,failed_count,blocked_until")
    .eq("email", email)
    .eq("ip_address", ipAddress)
    .single();

  if (data) {
    const failedCount = data.failed_count + 1;
    const blockedUntil =
      failedCount >= MAX_ATTEMPTS
        ? new Date(Date.now() + LOCK_DURATION_MINUTES * 60000).toISOString()
        : data.blocked_until;

    await service
      .from("admin_login_attempts")
      .update({
        failed_count: failedCount,
        blocked_until: blockedUntil,
        last_attempt_at: now,
      })
      .eq("id", data.id);
  } else {
    await service.from("admin_login_attempts").insert({
      email,
      ip_address: ipAddress,
      failed_count: 1,
      blocked_until: null,
      last_attempt_at: now,
    });
  }
}

async function clearLoginFailures(email: string, ipAddress: string) {
  const service = createSupabaseServiceRoleClient();
  await service
    .from("admin_login_attempts")
    .delete()
    .eq("email", email)
    .eq("ip_address", ipAddress);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email ?? "")
      .trim()
      .toLowerCase();
    const password = String(body.password ?? "").trim();
    const requestedRedirect = String(body.redirect ?? "").trim();

    const safeRedirect =
      requestedRedirect && requestedRedirect.startsWith("/admin")
        ? requestedRedirect
        : "/admin/dashboard";

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required.",
        },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid email address.",
        },
        { status: 400 },
      );
    }

    if (!password) {
      return NextResponse.json(
        {
          success: false,
          message: "Password is required.",
        },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 8 characters.",
        },
        { status: 400 },
      );
    }

    const ipAddress = await getIpAddress(request);
    const service = createSupabaseServiceRoleClient();

    // Check login attempts - but don't fail the entire request if the table doesn't exist
    let attemptData = null;
    try {
      const { data, error: attemptsError } = await service
        .from("admin_login_attempts")
        .select("failed_count,blocked_until")
        .eq("email", email)
        .eq("ip_address", ipAddress)
        .single();

      if (attemptsError && attemptsError.code !== "PGRST116") {
        console.error("Login attempt check failed", attemptsError);
        // Continue anyway - this is not critical
      } else {
        attemptData = data;
      }
    } catch (error) {
      console.error("Error checking login attempts:", error);
      // Continue anyway - this is not critical
    }

    if (attemptData?.blocked_until) {
      const blockedUntil = new Date(attemptData.blocked_until);
      if (blockedUntil > new Date()) {
        return NextResponse.json(
          {
            success: false,
            message: `Too many failed login attempts. Try again after ${blockedUntil.toLocaleTimeString()}.`,
          },
          { status: 429 },
        );
      }
    }

    const nextCookies = await cookies();
    const authClient = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL ?? "",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
        process.env.SUPABASE_ANON_KEY ??
        "",
      {
        cookies: {
          getAll() {
            return nextCookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              nextCookies.set(name, value, options),
            );
          },
        },
        auth: {
          persistSession: true,
          autoRefreshToken: false,
          detectSessionInUrl: false,
        },
      },
    );
    const { data: authData, error: authError } =
      await authClient.auth.signInWithPassword({
        email,
        password,
      });

    if (authError || !authData.session) {
      try {
        await recordLoginFailure(email, ipAddress);
      } catch (error) {
        console.error("Error recording login failure:", error);
        // Continue anyway - this is not critical
      }
      const message =
        authError?.message ?? "Authentication failed. Please try again.";
      return NextResponse.json({ success: false, message }, { status: 401 });
    }

    const userId = authData.session.user.id;
    const { data: profile, error: profileError } = await service
      .from("users")
      .select("role,email")
      .eq("id", userId)
      .single();

    if (profileError || !profile || profile.role !== "admin") {
      await authClient.auth.signOut();
      return NextResponse.json(
        {
          success: false,
          message: "You do not have permission to access the admin dashboard.",
        },
        { status: 403 },
      );
    }

    try {
      await clearLoginFailures(email, ipAddress);
    } catch (error) {
      console.error("Error clearing login failures:", error);
      // Continue anyway - login was successful
    }

    return NextResponse.json({ success: true, redirect: safeRedirect });
  } catch (error: any) {
    console.error("Unexpected error in admin login:", error);

    const isMissingServiceKey =
      typeof error?.message === "string" &&
      error.message.includes("SUPABASE_SERVICE_ROLE_KEY");

    return NextResponse.json(
      {
        success: false,
        message: isMissingServiceKey
          ? "Server misconfiguration: SUPABASE_SERVICE_ROLE_KEY is not set."
          : "An unexpected error occurred. Please try again later.",
      },
      { status: 500 },
    );
  }
}
