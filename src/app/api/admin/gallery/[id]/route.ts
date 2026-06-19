import { createSupabaseServiceRoleClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const supabaseAdmin = createSupabaseServiceRoleClient();

    const payload: Record<string, any> = {};
    if (body.title !== undefined) payload.title = body.title;
    if (body.caption !== undefined) payload.caption = body.caption || null;
    if (body.tag !== undefined) payload.tag = body.tag;
    if (body.tagColor !== undefined) payload.tag_color = body.tagColor;
    if (body.year !== undefined) payload.year = body.year;
    if (body.likes !== undefined) payload.likes = body.likes;
    if (body.imageUrl !== undefined) payload.image_url = body.imageUrl || null;
    if (body.displayOrder !== undefined)
      payload.display_order = body.displayOrder;
    if (body.status !== undefined)
      payload.is_active = body.status === "Published";

    const { data, error } = await supabaseAdmin
      .from("gallery")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return Response.json(
        { error: error.message, code: error.code },
        { status: 500 },
      );
    }

    if (!data) {
      return Response.json(
        { error: "Gallery item not found" },
        { status: 404 },
      );
    }

    return Response.json(data);
  } catch (error) {
    console.error("Unexpected error:", error);
    return Response.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const supabaseAdmin = createSupabaseServiceRoleClient();

    const { error } = await supabaseAdmin.from("gallery").delete().eq("id", id);

    if (error) {
      console.error("Supabase error:", error);
      return Response.json(
        { error: error.message, code: error.code },
        { status: 500 },
      );
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Unexpected error:", error);
    return Response.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
