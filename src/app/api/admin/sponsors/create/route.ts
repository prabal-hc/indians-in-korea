import { createSupabaseServiceRoleClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const { name, logoUrl, websiteUrl, displayOrder, isActive } =
      await request.json();

    const supabaseAdmin = createSupabaseServiceRoleClient();

    const { data, error } = await supabaseAdmin
      .from("sponsors")
      .insert([
        {
          name,
          logo_url: logoUrl || null,
          website_url: websiteUrl || null,
          display_order: displayOrder || 0,
          is_active: isActive ?? true,
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
