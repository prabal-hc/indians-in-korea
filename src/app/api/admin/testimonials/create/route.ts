import { createSupabaseServiceRoleClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const {
      name,
      initials,
      role,
      location,
      color,
      quote,
      rating,
      status,
      isVerified,
      displayOrder,
    } = await request.json();

    const supabaseAdmin = createSupabaseServiceRoleClient();

    const toInitials = (n: string) =>
      n
        .split(" ")
        .map((w: string) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    const { data, error } = await supabaseAdmin
      .from("testimonials")
      .insert([
        {
          name,
          initials: initials || toInitials(name),
          role,
          location,
          color,
          quote,
          rating: rating ?? 5,
          is_active: status === "Published",
          is_verified: isVerified ?? true,
          display_order: displayOrder ?? 0,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return Response.json(
        { error: error.message, code: error.code },
        { status: 500 },
      );
    }

    return Response.json(data, { status: 201 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return Response.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
