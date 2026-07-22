"use client";

import { Eye, EyeOff, Loader2, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!password.trim()) {
      setError("Please enter the password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Invalid password");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="absolute inset-0 noise pointer-events-none opacity-20" />

      <div className="relative w-full max-w-sm">
        <div className="rounded-3xl border border-border/30 bg-card p-8 shadow-premium">
          <div className="flex justify-center">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-luxury-gold/10">
              <Lock className="h-5 w-5 text-luxury-gold" />
            </div>
          </div>

          <div className="mt-6 text-center">
            <Badge variant="gold">Admin</Badge>
            <h1 className="mt-4 font-serif text-3xl">Welcome back</h1>
            <p className="mt-2 text-sm text-muted-foreground/50">
              Enter the password to access the admin panel.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Enter password"
                autoFocus
                className="flex h-12 w-full rounded-full border border-border/80 bg-background/90 px-5 pr-12 text-sm shadow-soft outline-none backdrop-blur-sm transition-all duration-500 placeholder:text-muted-foreground/40 focus:border-luxury-gold focus:ring-4 focus:ring-luxury-gold/8"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/40 transition-colors hover:text-muted-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {error && (
              <p className="text-center text-sm text-red-500">{error}</p>
            )}

            <Button type="submit" variant="gold" size="lg" disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Enter Admin Panel"
              )}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
