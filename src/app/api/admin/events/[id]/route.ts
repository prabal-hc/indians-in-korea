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
    if (body.category !== undefined) payload.category = body.category;
    if (body.date !== undefined) payload.event_date = body.date;
    if (body.time !== undefined) payload.time = body.time ?? null;
    if (body.location !== undefined) payload.location = body.location;
    if (body.description !== undefined) payload.description = body.description;
    if (body.imageUrl !== undefined) payload.image_url = body.imageUrl ?? null;
    if (body.attendees !== undefined) payload.attendees = body.attendees;
    if (body.isActive !== undefined) payload.is_active = body.isActive;
    if (body.status !== undefined)
      payload.is_active = body.status === "Published";

    const { data, error } = await supabaseAdmin
      .from("events")
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
      return Response.json({ error: "Event not found" }, { status: 404 });
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

    const { error } = await supabaseAdmin.from("events").delete().eq("id", id);

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
