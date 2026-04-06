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
      className="group relative flex h-10 w-10 items-center justify-center brutal-border bg-card text-foreground brutal-shadow transition-all duration-200"
      aria-label="Toggle theme"
      title={`Theme: ${theme}. Click to change.`}
    >
      {theme === "dark" && <Moon size={20} className="text-foreground fill-primary" />}
      {theme === "light" && <Sun size={20} className="text-foreground fill-primary" />}
      {theme === "system" && <Monitor size={20} className="text-foreground stroke-[3px]" />}
    </button>
  );
}
