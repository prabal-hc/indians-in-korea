import { createSupabaseServiceRoleClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const {
      title,
      caption,
      tag,
      tagColor,
      year,
      likes,
      imageUrl,
      status,
      displayOrder,
    } = await request.json();

    const supabaseAdmin = createSupabaseServiceRoleClient();

    const { data, error } = await supabaseAdmin
      .from("gallery")
      .insert([
        {
          title,
          caption: caption || null,
          tag,
          tag_color: tagColor,
          year: year || new Date().getFullYear().toString(),
          likes: likes || 0,
          image_url: imageUrl || null,
          is_active: status === "Published",
          display_order: displayOrder || 0,
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
