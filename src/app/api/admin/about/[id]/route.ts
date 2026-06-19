import { createSupabaseServiceRoleClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { table, data } = body;

    if (!table) {
      return Response.json(
        { error: "Table name is required" },
        { status: 400 },
      );
    }

    const supabaseAdmin = createSupabaseServiceRoleClient();

    const { data: updated, error } = await supabaseAdmin
      .from(table)
      .update(data)
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

    if (!updated) {
      return Response.json({ error: "Record not found" }, { status: 404 });
    }

    return Response.json(updated);
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
    const body = await request.json();
    const { table } = body;

    if (!table) {
      return Response.json(
        { error: "Table name is required" },
        { status: 400 },
      );
    }

    const supabaseAdmin = createSupabaseServiceRoleClient();

    const { error } = await supabaseAdmin.from(table).delete().eq("id", id);

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
