import { createSupabaseClient } from "@/lib/supabase/client";

const getSupabase = () => {
  try {
    return createSupabaseClient();
  } catch (error) {
    console.error(
      "Supabase client initialization failed for announcements service:",
      error,
    );
    throw error;
  }
};

export interface AnnouncementItem {
  id: string;
  title: string;
  description: string;
  display_order: number;
  category?: string;
  content?: string;
  publishedAt?: string;
  status?: string;
}

/**
 * Get all announcements
 */
export async function getAll(): Promise<AnnouncementItem[]> {
  try {
    const supabase = getSupabase();

    const { data, error } = await supabase
      .from("announcements")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      console.error("Announcements Supabase Error:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });

      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Announcements getAll Error:", error);
    return [];
  }
}

/**
 * Get announcement by ID
 */
export async function getById(
  id: string
): Promise<AnnouncementItem | null> {
  try {
    const supabase = getSupabase();

    const { data, error } = await supabase
      .from("announcements")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Announcement getById Supabase Error:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });

      return null;
    }

    return data;
  } catch (error) {
    console.error("Announcement getById Error:", error);
    return null;
  }
}

/**
 * Create announcement
 */
export async function create(
  data: Omit<AnnouncementItem, "id">
) {
  try {
    const response = await fetch(
      "/api/admin/announcements/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      let errorMessage = "Failed to create announcement";

      try {
        const errorData = await response.json();
        errorMessage =
          errorData.error || errorData.message || errorMessage;
      } catch {
        // Ignore JSON parsing error
      }

      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error("Announcement create Error:", error);
    throw error;
  }
}

/**
 * Update announcement
 */
export async function update(
  id: string,
  data: Partial<AnnouncementItem>
) {
  try {
    const response = await fetch(
      `/api/admin/announcements/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      let errorMessage = "Failed to update announcement";

      try {
        const errorData = await response.json();
        errorMessage =
          errorData.error || errorData.message || errorMessage;
      } catch {
        // Ignore JSON parsing error
      }

      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error("Announcement update Error:", error);
    throw error;
  }
}

/**
 * Delete announcement
 */
export async function remove(id: string) {
  try {
    const response = await fetch(
      `/api/admin/announcements/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      let errorMessage = "Failed to delete announcement";

      try {
        const errorData = await response.json();
        errorMessage =
          errorData.error || errorData.message || errorMessage;
      } catch {
        // Ignore JSON parsing error
      }

      throw new Error(errorMessage);
    }

    return true;
  } catch (error) {
    console.error("Announcement delete Error:", error);
    throw error;
  }
}