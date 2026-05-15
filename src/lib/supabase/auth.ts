export async function getSession() {
  return null;
}

export async function requireAdmin() {
  throw new Error("Supabase auth integration is not configured yet.");
}
