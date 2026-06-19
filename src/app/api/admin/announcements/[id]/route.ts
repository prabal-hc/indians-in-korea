import { createSupabaseServiceRoleClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Validate id
    if (!id || typeof id !== "string") {
      return Response.json(
        { error: "Invalid announcement ID" },
        { status: 400 },
      );
    }

    // Create server-side client with service role key (bypasses RLS)
    const supabaseAdmin = createSupabaseServiceRoleClient();

    // Update announcement
    const { data, error } = await supabaseAdmin
      .from("announcements")
      .update({
        ...body,
        updated_at: new Date().toISOString(),
      })
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
        { error: "Announcement not found" },
        { status: 404 },
      );
    }

    return Response.json(data);
  } catch (error) {
    console.error("Unexpected error in announcement update:", error);
    return Response.json(
      { error: "An unexpected error occurred while updating the announcement" },
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

    // Validate id
    if (!id || typeof id !== "string") {
      return Response.json(
        { error: "Invalid announcement ID" },
        { status: 400 },
      );
    }

    // Create server-side client with service role key (bypasses RLS)
    const supabaseAdmin = createSupabaseServiceRoleClient();

    // Delete announcement
    const { error } = await supabaseAdmin
      .from("announcements")
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
    console.error("Unexpected error in announcement deletion:", error);
    return Response.json(
      { error: "An unexpected error occurred while deleting the announcement" },
      { status: 500 },
    );
  }
}
