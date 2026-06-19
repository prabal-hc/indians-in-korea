"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AdminAuthProviderProps {
  children: React.ReactNode;
}

export function AdminAuthProvider({ children }: AdminAuthProviderProps) {
  const [online, setOnline] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setOnline(navigator.onLine);

    const handleStorage = (event: StorageEvent) => {
      if (event.key === "iik-admin-logout") {
        router.replace("/admin/login");
      }
    };

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "iik-admin-logout") {
        router.replace("/admin/login");
      }
    };

    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener("storage", handleStorage);
    window.addEventListener("message", handleMessage);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("message", handleMessage);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [router]);

  return (
    <div className={online ? "" : "pt-10"}>
      {!online ? (
        <div className="fixed inset-x-0 top-0 z-50 bg-amber-500 px-4 py-2 text-center text-sm font-semibold text-white shadow-lg shadow-slate-900/10">
          You are currently offline. Reconnect to resume admin operations.
        </div>
      ) : null}
      {children}
    </div>
  );
}

export function broadcastAdminLogout() {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem("iik-admin-logout", Date.now().toString());
    window.postMessage({ type: "iik-admin-logout" }, window.location.origin);
  } catch {
    // ignore
  }
}
