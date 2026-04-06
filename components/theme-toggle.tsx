"use client";

import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  const cycle = () => {
    if (theme === "system") setTheme("light");
    else if (theme === "light") setTheme("dark");
    else setTheme("system");
  };

  return (
    <button
      onClick={cycle}
      className="group relative flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground backdrop-blur-sm transition-all duration-200 hover:bg-white/10 hover:scale-105 active:scale-95"
      aria-label="Toggle theme"
      title={`Theme: ${theme}. Click to change.`}
    >
      {theme === "dark" && <Moon size={16} className="text-violet-300" />}
      {theme === "light" && <Sun size={16} className="text-amber-400" />}
      {theme === "system" && <Monitor size={16} className="text-sky-400" />}
    </button>
  );
}
