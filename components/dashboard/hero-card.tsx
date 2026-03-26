"use client";

import { motion } from "framer-motion";
import { ProductivityLevel } from "@/lib/productivity";

interface HeroCardProps {
  currentLevel: ProductivityLevel;
  nextLevel?: ProductivityLevel;
  progressPct: number;
  minutesSaved: number;
}

export function HeroCard({ currentLevel, nextLevel, progressPct, minutesSaved }: HeroCardProps) {
  const isMaxLevel = !nextLevel;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card p-8 shadow-2xl backdrop-blur-xl transition-colors duration-300">
      {/* Dynamic Background Glow based on Phase Color */}
      <div 
        className="absolute -right-20 -top-20 h-64 w-64 rounded-full blur-[100px] opacity-20 dark:opacity-20 pointer-events-none" 
        style={{ backgroundColor: currentLevel.color }}
      />
      <div 
        className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full blur-[80px] opacity-10 dark:opacity-10 pointer-events-none" 
        style={{ backgroundColor: currentLevel.color }}
      />

      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 dark:bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            <span className="flex h-2 w-2 rounded-full" style={{ backgroundColor: currentLevel.color, boxShadow: `0 0 10px ${currentLevel.color}` }} />
            Phase {currentLevel.phase}
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl" style={{ textShadow: `0 0 30px ${currentLevel.color}40` }}>
            {currentLevel.name}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">{currentLevel.subtitle}</p>
        </div>

        <div className="text-left md:text-right flex-shrink-0">
          <p className="text-3xl font-bold text-foreground tabular-nums">
            Level {currentLevel.id}
          </p>
          <p className="text-sm text-muted-foreground uppercase tracking-widest mt-1">Current Rank</p>
        </div>
      </div>

      <div className="relative z-10 mt-10">
        <div className="mb-3 flex items-center justify-between text-sm font-medium">
          <span className="text-muted-foreground">
            <strong className="text-foreground">{minutesSaved.toLocaleString()}</strong> mins saved
          </span>
          {nextLevel ? (
            <span className="text-muted-foreground">
              Next: <strong className="text-foreground">{nextLevel.threshold.toLocaleString()}</strong> mins
            </span>
          ) : (
            <span className="text-muted-foreground">Max Level Reached</span>
          )}
        </div>

        {/* Progress Bar Container */}
        <div className="relative h-4 w-full overflow-hidden rounded-full bg-secondary shadow-inner">
          <motion.div
            className="absolute left-0 top-0 h-full rounded-full shadow-lg"
            style={{ backgroundColor: currentLevel.color, boxShadow: `0 0 20px ${currentLevel.color}80` }}
            initial={{ width: 0 }}
            animate={{ width: `${Math.max(2, progressPct)}%` }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          >
            {/* Shimmer effect inside progress bar */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
