export const supabaseServer = {
  from: () => ({ select: async () => [] }),
  auth: {
    getSession: async () => null,
  },
};
