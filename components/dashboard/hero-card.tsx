"use client";

import { motion } from "framer-motion";
import { ProductivityLevel, getTimeEquivalence } from "@/lib/productivity";
import { ArrowRight, Sparkles } from "lucide-react";

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
        <div className="flex-1 space-y-7">
          {/* Greeting */}
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-medium text-muted-foreground">
              Welcome back, <strong className="text-foreground">{username}</strong>
            </span>
            <span className="text-muted-foreground/30">•</span>
            <span className="text-[13px] text-muted-foreground/80">
              Member since {joinedAt.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </span>
          </div>

          {/* Rank Title */}
          <div>
            <div className="mb-2.5 flex items-center gap-2.5">
              <span 
                className="inline-flex items-center justify-center rounded-lg px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-lg"
                style={{ backgroundColor: currentLevel.color, boxShadow: `0 4px 15px -4px ${currentLevel.color}` }}
              >
                Level {currentLevel.id}
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80" style={{ color: currentLevel.color }}>
                Current Rank
              </span>
            </div>
            <h1
              className="mt-1 text-4xl font-black tracking-tight text-foreground sm:text-5xl"
              style={{ textShadow: `0 0 60px ${currentLevel.color}30` }}
            >
              {currentLevel.name}
            </h1>
          </div>

          {/* Minimal Progress Bar */}
          {nextLevel && (
            <div className="max-w-md pt-2">
              <div className="mb-2.5 flex items-center justify-between text-xs font-bold">
                <span className="text-muted-foreground">
                  Next: <span className="text-foreground tracking-tight">{nextLevel.name}</span>
                </span>
                <span style={{ color: currentLevel.color }}>{minsToNext} mins left</span>
              </div>
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted/60">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${currentLevel.color}aa, ${currentLevel.color})`,
                    boxShadow: `0 0 12px ${currentLevel.color}60`,
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max(2, progressPct)}%` }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                />
              </div>
            </div>
          )}
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
          </div>
        </div>
      </div>

      {/* ── BOTTOM STRIP: EMOTIONAL ROI REWARD ── */}
      <div 
        className="relative border-t px-7 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        style={{
          borderColor: `${currentLevel.color}20`,
          background: `linear-gradient(90deg, ${currentLevel.color}10, transparent 60%)`,
        }}
      >
        <div className="flex items-center gap-4">
          <div 
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl shadow-lg ring-1 transition-all duration-500"
            style={{ 
              backgroundColor: `${currentLevel.color}15`, 
              boxShadow: `0 0 20px -5px ${currentLevel.color}` 
            }}
          >
            <Sparkles size={22} style={{ color: currentLevel.color }} />
          </div>
          <div>
            <span className="block text-[10px] font-black uppercase tracking-[0.2em] mb-1 opacity-80" style={{ color: currentLevel.color }}>
              The Real Reward
            </span>
            <p className="text-lg sm:text-xl font-bold text-foreground tracking-tight drop-shadow-sm">
              {getTimeEquivalence(minutesSaved)}
            </p>
          </div>
        </div>
        <div className="hidden md:block opacity-30">
           <ArrowRight size={24} style={{ color: currentLevel.color }} />
        </div>
      </div>
    </div>
  );
}
