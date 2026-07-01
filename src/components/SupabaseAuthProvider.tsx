"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import type { Session, SupabaseClient } from "@supabase/supabase-js";

interface SupabaseAuthContextValue {
  supabase: SupabaseClient;
  session: Session | null;
  isLoading: boolean;
}

const SupabaseAuthContext = createContext<SupabaseAuthContextValue | undefined>(
  undefined,
);

interface SupabaseAuthProviderProps {
  children: React.ReactNode;
}

export default function SupabaseAuthProvider({
  children,
}: SupabaseAuthProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: false,
        },
      },
    ),
  );

  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setIsLoading(false);

        if (pathname?.startsWith("/admin") && !session) {
          router.replace("/admin/login");
        }
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [supabase, pathname, router]);

  return (
    <SupabaseAuthContext.Provider value={{ supabase, session, isLoading }}>
      {children}
    </SupabaseAuthContext.Provider>
  );
}

export function useSupabaseAuth() {
  const context = useContext(SupabaseAuthContext);
  if (!context) {
    throw new Error(
      "useSupabaseAuth must be used within a SupabaseAuthProvider",
    );
  }
  return context;
}
