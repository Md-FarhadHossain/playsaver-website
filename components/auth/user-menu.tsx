"use client";

import { useEffect, useRef, useState } from "react";
import { LogOut, User, ChevronDown, Loader2 } from "lucide-react";
import Image from "next/image";
import type { DbUser } from "@/lib/db";

export function UserMenu() {
  const [user, setUser]       = useState<DbUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen]       = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { user: DbUser } | null) => setUser(data?.user ?? null))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      window.location.href = "/";
    } catch {
      setLoggingOut(false);
    }
  };

  if (loading) {
    return <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />;
  }

  if (!user) return null;

  return (
    <div ref={dropdownRef} className="relative">
      <button
        id="user-menu-trigger"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 brutal-border bg-background px-3 py-1.5 text-sm font-black uppercase text-foreground brutal-shadow transition-all hover:bg-muted"
        aria-label="User menu"
        aria-expanded={open}
      >
        {user.avatar ? (
          <Image
            src={user.avatar}
            alt={user.name ?? "User"}
            width={24}
            height={24}
            className="border-2 border-foreground rounded-none"
          />
        ) : (
          <div className="flex h-6 w-6 items-center justify-center border-2 border-foreground bg-primary text-foreground">
            <User size={14} className="stroke-[3px]" />
          </div>
        )}
        <span className="hidden max-w-[120px] truncate sm:block font-ai border-l-2 border-foreground pl-2 ml-1">{user.name ?? user.email}</span>
        <ChevronDown
          size={16}
          className={`text-foreground stroke-[3px] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-56 brutal-border bg-card brutal-shadow overflow-hidden">
          {/* Profile */}
          <div className="border-b-4 border-foreground px-4 py-4 bg-background">
            <p className="truncate text-base font-black uppercase text-foreground">{user.name}</p>
            <p className="truncate text-xs font-ai font-bold text-foreground opacity-80">{user.email}</p>
          </div>

          {/* Links */}
          <div className="flex flex-col bg-card">
            <a
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-3 border-b-2 border-foreground px-4 py-3 text-sm font-black uppercase text-foreground hover:bg-primary transition-colors"
            >
              <User size={16} className="stroke-[3px]" />
              SYS_DASHBOARD
            </a>
            <button
              id="logout-button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex w-full items-center gap-3 px-4 py-3 text-sm font-black uppercase text-foreground hover:bg-secondary transition-colors disabled:opacity-60"
            >
              {loggingOut ? <Loader2 size={16} className="animate-spin stroke-[3px]" /> : <LogOut size={16} className="stroke-[3px]" />}
              {loggingOut ? "TERMINATING…" : "TERMINATE_SESSION"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
