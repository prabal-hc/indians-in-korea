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

    const toInitials = (n: string) =>
      n
        .split(" ")
        .map((w: string) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    const payload: Record<string, any> = {};
    if (body.name !== undefined) payload.name = body.name;
    if (body.initials !== undefined)
      payload.initials = body.initials || toInitials(body.name ?? "");
    if (body.role !== undefined) payload.role = body.role;
    if (body.location !== undefined) payload.location = body.location;
    if (body.color !== undefined) payload.color = body.color;
    if (body.quote !== undefined) payload.quote = body.quote;
    if (body.rating !== undefined) payload.rating = body.rating;
    if (body.isVerified !== undefined) payload.is_verified = body.isVerified;
    if (body.displayOrder !== undefined)
      payload.display_order = body.displayOrder;
    if (body.status !== undefined)
      payload.is_active = body.status === "Published";

    const { data, error } = await supabaseAdmin
      .from("testimonials")
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
      return Response.json({ error: "Testimonial not found" }, { status: 404 });
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
      .from("testimonials")
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
