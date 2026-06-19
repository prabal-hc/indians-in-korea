import { createSupabaseServiceRoleClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const { title, description, display_order } = await request.json();

    // Validate input
    if (!title || typeof title !== "string" || title.trim().length === 0) {
      return Response.json(
        { error: "Title is required and must be a non-empty string" },
        { status: 400 },
      );
    }

    if (
      !description ||
      typeof description !== "string" ||
      description.trim().length === 0
    ) {
      return Response.json(
        { error: "Description is required and must be a non-empty string" },
        { status: 400 },
      );
    }

    if (typeof display_order !== "number" || display_order < 0) {
      return Response.json(
        { error: "Display order must be a non-negative number" },
        { status: 400 },
      );
    }

    // Create server-side client with service role key (bypasses RLS)
    const supabaseAdmin = createSupabaseServiceRoleClient();

    // Insert announcement
    const { data, error } = await supabaseAdmin
      .from("announcements")
      .insert([
        {
          title: title.trim(),
          description: description.trim(),
          display_order,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);

      // Check for specific error codes
      if (error.code === "42P01") {
        return Response.json(
          {
            error:
              "Announcements table does not exist. Please set up the database schema.",
            code: error.code,
          },
          { status: 500 },
        );
      }

      return Response.json(
        { error: error.message, code: error.code },
        { status: 500 },
      );
    }

    return Response.json(data, { status: 201 });
  } catch (error) {
    console.error("Unexpected error in announcement creation:", error);
    return Response.json(
      { error: "An unexpected error occurred while creating the announcement" },
      { status: 500 },
    );
  }
}
