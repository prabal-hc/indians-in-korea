import { createSupabaseServiceRoleClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { operation, data } = body;

    if (!operation) {
      return Response.json({ error: "Operation is required" }, { status: 400 });
    }

    const supabaseAdmin = createSupabaseServiceRoleClient();

    if (operation === "saveAbout") {
      const {
        headline,
        subheadline,
        description,
        mission,
        established,
        members,
        events,
        ctaLabel,
        ctaUrl,
        heroImage,
      } = data;

      // Check if content exists
      const { data: existing, error: existingError } = await supabaseAdmin
        .from("about_content")
        .select("id")
        .limit(1)
        .maybeSingle();

      if (existingError) throw existingError;

      const payload = {
        headline,
        subheadline: subheadline ?? null,
        description: description ?? null,
        mission: mission ?? null,
        established: established ?? null,
        members: members ?? null,
        events: events ?? null,
        cta_label: ctaLabel ?? null,
        cta_url: ctaUrl ?? null,
        hero_image: heroImage ?? null,
        updated_at: new Date().toISOString(),
      };

      if (existing?.id) {
        const { error } = await supabaseAdmin
          .from("about_content")
          .update(payload)
          .eq("id", existing.id);
        if (error) throw error;
      } else {
        const { error } = await supabaseAdmin
          .from("about_content")
          .insert([payload]);
        if (error) throw error;
      }

      return Response.json({ success: true });
    }

    if (operation === "saveBoardMembers") {
      const members = data;

      // Fetch all current IDs
      const { data: existing, error: fetchErr } = await supabaseAdmin
        .from("about_board")
        .select("id");
      if (fetchErr) throw fetchErr;

      const existingIds = new Set((existing ?? []).map((r: any) => r.id));

      // Partition into persisted vs brand-new
      const UUID_RE =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      const persisted = members.filter((m: any) => UUID_RE.test(m.id));
      const brandNew = members.filter((m: any) => !UUID_RE.test(m.id));

      // IDs to delete
      const keptIds = new Set(persisted.map((m: any) => m.id));
      const toDelete = [...existingIds].filter((id) => !keptIds.has(id));

      // Delete removed rows
      if (toDelete.length > 0) {
        const { error } = await supabaseAdmin
          .from("about_board")
          .delete()
          .in("id", toDelete);
        if (error) throw error;
      }

      // Upsert existing
      if (persisted.length > 0) {
        const rows = persisted.map((m: any, i: number) => ({
          id: m.id,
          name: m.name,
          initials: m.initials,
          role: m.role,
          profession: m.profession ?? null,
          korean_title: m.koreanTitle ?? null,
          type: m.type,
          image_url: m.imageUrl ?? null,
          display_order: m.displayOrder ?? i,
          is_active: m.isActive ?? true,
        }));

        const { error } = await supabaseAdmin
          .from("about_board")
          .upsert(rows, { onConflict: "id" });
        if (error) throw error;
      }

      // Insert new
      if (brandNew.length > 0) {
        const rows = brandNew.map((m: any, i: number) => ({
          name: m.name,
          initials: m.initials,
          role: m.role,
          profession: m.profession ?? null,
          korean_title: m.koreanTitle ?? null,
          type: m.type,
          image_url: m.imageUrl ?? null,
          display_order: m.displayOrder ?? persisted.length + i,
          is_active: m.isActive ?? true,
        }));

        const { error } = await supabaseAdmin.from("about_board").insert(rows);
        if (error) throw error;
      }

      return Response.json({ success: true });
    }

    if (operation === "addBoardMembers") {
      const brandNew = data; // expect only new items

      if (!Array.isArray(brandNew) || brandNew.length === 0) {
        return Response.json({ success: true });
      }

      const rows = brandNew.map((m: any, i: number) => ({
        name: m.name,
        initials: m.initials,
        role: m.role,
        profession: m.profession ?? null,
        korean_title: m.koreanTitle ?? null,
        type: m.type,
        image_url: m.imageUrl ?? null,
        display_order: m.displayOrder ?? 0,
        is_active: m.isActive ?? true,
      }));

      const { error } = await supabaseAdmin.from("about_board").insert(rows);
      if (error) throw error;

      return Response.json({ success: true });
    }

    if (operation === "saveContacts") {
      const contacts = data;

      // Fetch all current IDs
      const { data: existing, error: fetchErr } = await supabaseAdmin
        .from("about_contacts")
        .select("id");
      if (fetchErr) throw fetchErr;

      const existingIds = new Set((existing ?? []).map((r: any) => r.id));

      // Partition
      const UUID_RE =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      const persisted = contacts.filter((c: any) => UUID_RE.test(c.id));
      const brandNew = contacts.filter((c: any) => !UUID_RE.test(c.id));

      const keptIds = new Set(persisted.map((c: any) => c.id));
      const toDelete = [...existingIds].filter((id) => !keptIds.has(id));

      // Delete
      if (toDelete.length > 0) {
        const { error } = await supabaseAdmin
          .from("about_contacts")
          .delete()
          .in("id", toDelete);
        if (error) throw error;
      }

      // Upsert
      if (persisted.length > 0) {
        const rows = persisted.map((c: any, i: number) => ({
          id: c.id,
          label: c.label,
          value: c.value,
          type: c.type,
          emoji: c.emoji ?? null,
          href: c.href ?? null,
          bg_class: c.bgClass ?? "bg-orange-50 border-orange-200",
          display_order: c.displayOrder ?? i,
          is_active: c.isActive ?? true,
        }));
        const { error } = await supabaseAdmin
          .from("about_contacts")
          .upsert(rows, { onConflict: "id" });
        if (error) throw error;
      }

      // Insert
      if (brandNew.length > 0) {
        const rows = brandNew.map((c: any, i: number) => ({
          label: c.label,
          value: c.value,
          type: c.type,
          emoji: c.emoji ?? null,
          href: c.href ?? null,
          bg_class: c.bgClass ?? "bg-orange-50 border-orange-200",
          display_order: c.displayOrder ?? persisted.length + i,
          is_active: c.isActive ?? true,
        }));
        const { error } = await supabaseAdmin
          .from("about_contacts")
          .insert(rows);
        if (error) throw error;
      }

      return Response.json({ success: true });
    }

    return Response.json({ error: "Unknown operation" }, { status: 400 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return Response.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
