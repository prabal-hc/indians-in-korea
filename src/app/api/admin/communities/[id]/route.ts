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
    if (body.name !== undefined) payload.name = body.name;
    if (body.abbr !== undefined) payload.abbr = body.abbr;
    if (body.category !== undefined) payload.category = body.category;
    if (body.tag !== undefined) payload.tag = body.tag;
    if (body.icon !== undefined) payload.icon = body.icon;
    if (body.members !== undefined) payload.members = body.members;
    if (body.since !== undefined) payload.since = body.since;
    if (body.description !== undefined) payload.description = body.description;
    if (body.highlights !== undefined) payload.highlights = body.highlights;
    if (body.websiteUrl !== undefined) payload.website_url = body.websiteUrl;
    if (body.facebookUrl !== undefined) payload.facebook_url = body.facebookUrl;
    if (body.email !== undefined) payload.email = body.email;
    if (body.contact !== undefined) payload.contact = body.contact;
    if (body.imageUrl !== undefined) payload.image_url = body.imageUrl;
    if (body.accentColor !== undefined) payload.accent_color = body.accentColor;
    if (body.displayOrder !== undefined)
      payload.display_order = body.displayOrder;
    if (body.status !== undefined)
      payload.is_active = body.status === "Published";
    if (body.isFeatured !== undefined) payload.is_featured = body.isFeatured;

    const { data, error } = await supabaseAdmin
      .from("communities")
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
      return Response.json({ error: "Community not found" }, { status: 404 });
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

    const { error } = await supabaseAdmin
      .from("communities")
      .delete()
      .eq("id", id);

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
