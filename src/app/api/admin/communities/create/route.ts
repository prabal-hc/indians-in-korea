import { createSupabaseServiceRoleClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const {
      name,
      abbr,
      category,
      tag,
      icon,
      members,
      since,
      description,
      highlights,
      websiteUrl,
      facebookUrl,
      email,
      contact,
      imageUrl,
      accentColor,
      status,
      isFeatured,
      displayOrder,
    } = await request.json();

    const supabaseAdmin = createSupabaseServiceRoleClient();

    const { data, error } = await supabaseAdmin
      .from("communities")
      .insert([
        {
          name,
          abbr,
          category,
          tag: tag || category,
          icon: icon || "🎉",
          members: members || "0",
          since: since || null,
          description,
          highlights: highlights || [],
          website_url: websiteUrl || null,
          facebook_url: facebookUrl || null,
          email: email || null,
          contact: contact || null,
          image_url: imageUrl || null,
          accent_color: accentColor || "#ea580c",
          is_active: status === "Published",
          is_featured: isFeatured || false,
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
