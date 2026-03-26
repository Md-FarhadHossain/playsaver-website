"use client";

import { motion } from "framer-motion";
import { ProductivityLevel, getTimeEquivalence } from "@/lib/productivity";
import { ArrowRight } from "lucide-react";

interface HeroCardProps {
  currentLevel: ProductivityLevel;
  nextLevel?: ProductivityLevel;
  progressPct: number;
  minutesSaved: number;
  username: string;
  joinedAt: Date;
}

export function HeroCard({ currentLevel, nextLevel, progressPct, minutesSaved, username, joinedAt }: HeroCardProps) {
  const hours = Math.floor(minutesSaved / 60);
  const mins = minutesSaved % 60;
  const minsToNext = nextLevel ? (nextLevel.threshold - minutesSaved).toLocaleString() : null;

  const phaseNames: Record<number, string> = { 1: "Initiate", 2: "Momentum", 3: "Mastery", 4: "Legend" };

  return (
    <div
      className="relative w-full overflow-hidden rounded-3xl border border-border/40"
      style={{
        background: `radial-gradient(ellipse 80% 60% at 70% -10%, ${currentLevel.color}22 0%, transparent 65%),
                     radial-gradient(ellipse 50% 80% at 0% 100%, ${currentLevel.color}10 0%, transparent 60%)`,
      }}
    >
      {/* Glass background */}
      <div className="absolute inset-0 bg-card/80 backdrop-blur-sm" />

      {/* Decorative glow orb */}
      <div
        className="pointer-events-none absolute right-[-60px] top-[-60px] h-[340px] w-[340px] rounded-full opacity-[0.12] dark:opacity-[0.18]"
        style={{ backgroundColor: currentLevel.color, filter: "blur(90px)" }}
      />

      <div className="relative flex flex-col gap-8 p-7 md:flex-row md:items-end md:justify-between">
        {/* LEFT — Identity */}
        <div className="flex-1 space-y-5">
          {/* Phase badge */}
          <div className="flex items-center gap-3">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-white"
              style={{ background: `linear-gradient(135deg, ${currentLevel.color}dd, ${currentLevel.color}88)` }}
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/70" />
              Phase {currentLevel.phase} · {phaseNames[currentLevel.phase]}
            </span>
            <span className="text-[11px] text-muted-foreground font-medium">
              Welcome back, <strong className="text-foreground">{username}</strong> <span className="mx-1.5 opacity-40">•</span> <span className="opacity-80">Member since {joinedAt.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
            </span>
          </div>

          {/* Big level title */}
          <div>
            <div className="flex items-baseline gap-3">
              <span
                className="inline-flex items-center justify-center rounded-lg px-2.5 py-1 text-[12px] font-black uppercase tracking-[0.2em] text-white shadow-xl"
                style={{ backgroundColor: currentLevel.color, boxShadow: `0 4px 20px -5px ${currentLevel.color}` }}
              >
                Level {currentLevel.id}
              </span>
            </div>
            <h1
              className="mt-1 text-5xl font-black tracking-tight text-foreground sm:text-6xl"
              style={{ textShadow: `0 0 60px ${currentLevel.color}30` }}
            >
              {currentLevel.name}
            </h1>
            <p className="mt-2 text-base text-muted-foreground max-w-md">{currentLevel.subtitle}</p>
          </div>

          {/* XP Progress */}
          <div className="max-w-lg space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-muted-foreground">
                XP Progress{nextLevel ? ` → Level ${nextLevel.id}` : " · Max Level"}
              </span>
              <span style={{ color: currentLevel.color }}>{Math.round(progressPct)}%</span>
            </div>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted/60">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${currentLevel.color}bb, ${currentLevel.color})`,
                  boxShadow: `0 0 12px 1px ${currentLevel.color}60`,
                }}
                initial={{ width: 0 }}
                animate={{ width: `${Math.max(1.5, progressPct)}%` }}
                transition={{ duration: 1.8, ease: [0.25, 1, 0.5, 1], delay: 0.4 }}
              />
            </div>
            {minsToNext && (
              <p className="text-[11px] text-muted-foreground/70">
                <strong className="text-foreground">{minsToNext}</strong> mins until <strong className="text-foreground">{nextLevel?.name}</strong>
              </p>
            )}
          </div>
        </div>

        {/* RIGHT — Big time stat */}
        <div className="shrink-0">
          <div
            className="flex flex-col items-end gap-1 rounded-2xl border border-border/30 px-7 py-5"
            style={{
              background: `linear-gradient(145deg, ${currentLevel.color}14, ${currentLevel.color}06)`,
              borderColor: `${currentLevel.color}28`,
            }}
          >
            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-muted-foreground">Total Time Reclaimed</p>
            <div className="flex items-end gap-1.5">
              <span className="text-6xl font-black tabular-nums text-foreground leading-none">{hours.toLocaleString()}</span>
              <span className="mb-1.5 text-2xl font-bold text-muted-foreground">h</span>
              <span className="text-6xl font-black tabular-nums text-foreground leading-none">{String(mins).padStart(2, "0")}</span>
              <span className="mb-1.5 text-2xl font-bold text-muted-foreground">m</span>
            </div>
            <div 
              className="mt-3 inline-flex max-w-[260px] items-center justify-end rounded-xl border px-3.5 py-2.5 text-right shadow-sm backdrop-blur-md"
              style={{
                borderColor: `${currentLevel.color}40`,
                backgroundColor: `${currentLevel.color}15`,
              }}
            >
              <p className="text-[12px] font-bold leading-snug text-foreground/90" style={{ textShadow: `0 2px 10px ${currentLevel.color}30` }}>
                {getTimeEquivalence(minutesSaved)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
