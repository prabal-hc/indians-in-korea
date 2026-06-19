import { createSupabaseServiceRoleClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const {
      title,
      category,
      date,
      time,
      location,
      description,
      imageUrl,
      attendees,
      isActive,
      status,
    } = await request.json();

    const supabaseAdmin = createSupabaseServiceRoleClient();

    const { data, error } = await supabaseAdmin
      .from("events")
      .insert([
        {
          title,
          category: category || "General",
          is_active: isActive ?? status === "Published",
          event_date: date,
          time: time ?? null,
          location,
          description,
          image_url: imageUrl ?? null,
          attendees: attendees ?? "0",
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
