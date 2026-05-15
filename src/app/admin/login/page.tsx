"use client";

import { useState } from "react";

const mockSignIn = async (email: string, password: string) => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  if (email.toLowerCase() === "admin@iik.org" && password === "admin123") {
    return { success: true };
  }
  return { success: false, message: "Invalid email or password." };
};

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    const result = await mockSignIn(email, password);
    setLoading(false);

    if (!result.success) {
      setError(result.message ?? "Unable to sign in.");
      return;
    }

    window.location.href = "/admin/dashboard";
  };

  return (
    <div className="min-h-[calc(100vh-96px)] bg-gradient-to-br from-orange-200 via-white to-slate-100 px-4 py-14 sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-center">
        <div className="grid w-full gap-10 rounded-[36px] border border-white/80 bg-white/95 p-8 shadow-[0_30px_90px_rgba(251,146,60,0.14)] backdrop-blur-xl sm:p-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div className="space-y-6">
            <div className="rounded-[28px] bg-orange-500/10 p-6 shadow-lg shadow-orange-200/20">
              <p className="text-sm uppercase tracking-[0.28em] text-orange-600">
                IIK Admin
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
                Secure sign in
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600">
                Access the admin dashboard to manage content, events, sports,
                communities, gallery, announcements, and hero experience.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[26px] border border-slate-200 bg-white p-5 text-sm text-slate-700 shadow-sm">
                <p className="font-semibold text-slate-900">Email</p>
                <p className="mt-3 text-slate-500">
                  Use admin@iik.org to preview the mock flow.
                </p>
              </div>
              <div className="rounded-[26px] border border-slate-200 bg-white p-5 text-sm text-slate-700 shadow-sm">
                <p className="font-semibold text-slate-900">Password</p>
                <p className="mt-3 text-slate-500">
                  Enter a secure password such as admin123 for the demo.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-8 shadow-sm shadow-slate-900/5">
            <p className="text-sm uppercase tracking-[0.28em] text-orange-500">
              Sign in
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-950">
              Welcome back
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Enter your credentials to continue to the admin dashboard.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <label className="block space-y-2 text-sm text-slate-700">
                <span>Email address</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
                  placeholder="admin@iik.org"
                />
              </label>

              <label className="block space-y-2 text-sm text-slate-700">
                <span>Password</span>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 pr-28 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute inset-y-0 right-3 inline-flex items-center rounded-full px-4 text-sm text-slate-500 transition hover:text-slate-900"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </label>

              {error ? (
                <p className="rounded-3xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center rounded-3xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Signing in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
