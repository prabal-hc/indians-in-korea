import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import {
  createSupabaseServerClient,
  createSupabaseServiceRoleClient,
} from "./server";

interface AdminSession {
  userId: string;
  email: string;
  role: string;
}

export async function resolveAdminSession() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    await supabase.auth.signOut();
    return null;
  }

  const service = createSupabaseServiceRoleClient();
  const { data: profile, error: profileError } = await service
    .from("users")
    .select("role,email")
    .eq("id", user.id)
    .single();

  if (profileError || !profile || profile.role !== "admin") {
    await supabase.auth.signOut();
    return null;
  }

  return {
    userId: user.id,
    email: profile.email,
    role: profile.role,
  } as AdminSession;
}

export async function requireAdminSessionOrRedirect() {
  const admin = await resolveAdminSession();
  if (!admin) {
    redirect(
      "/admin/login?message=Your session has expired. Please login again.",
    );
  }
  return admin;
}

export function unauthorizedJson(message = "Unauthorized") {
  return NextResponse.json({ success: false, message }, { status: 401 });
}

export function forbiddenJson(message = "Access denied") {
  return NextResponse.json({ success: false, message }, { status: 403 });
}

export async function requireAdminApi() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    await supabase.auth.signOut();
    return null;
  }

  const service = createSupabaseServiceRoleClient();
  const { data: profile, error: profileError } = await service
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError || !profile || profile.role !== "admin") {
    await supabase.auth.signOut();
    return null;
  }

  return { user };
}
