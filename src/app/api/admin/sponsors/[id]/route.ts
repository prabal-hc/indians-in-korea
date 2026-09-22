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
    if (body.logoUrl !== undefined) payload.logo_url = body.logoUrl;
    if (body.websiteUrl !== undefined) payload.website_url = body.websiteUrl;
    if (body.displayOrder !== undefined)
      payload.display_order = body.displayOrder;
    if (body.isActive !== undefined) payload.is_active = body.isActive;

    const { data, error } = await supabaseAdmin
      .from("sponsors")
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
      return Response.json({ error: "Sponsor not found" }, { status: 404 });
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
      .from("sponsors")
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
