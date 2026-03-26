"use client";

import { motion } from "framer-motion";
import { LEVELS } from "@/lib/productivity";
import { Check, Lock } from "lucide-react";

interface LevelJourneyProps {
  currentLevelId: number;
  phaseColor: string;
}

export function LevelJourney({ currentLevelId, phaseColor }: LevelJourneyProps) {
  const currentIndex = LEVELS.findIndex(l => l.id === currentLevelId);
  if (currentIndex === -1) return null;

  const currentLevel = LEVELS[currentIndex];
  const nextLevel = LEVELS[currentIndex + 1];
  const futureLevel = LEVELS[currentIndex + 2];

  const items = [
    { type: "current", level: currentLevel },
    ...(nextLevel ? [{ type: "next", level: nextLevel }] : []),
    ...(futureLevel ? [{ type: "future", level: futureLevel }] : []),
  ];

  return (
    <div className="flex flex-col rounded-[2rem] border border-border/60 bg-card p-6 shadow-sm transition-colors duration-300">
      {/* ── HEADER ── */}
      <div className="mb-6 flex items-center justify-between border-b border-border/40 pb-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">
            Progression
          </p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-xl font-black text-foreground tracking-tight">
              Level <span style={{ color: phaseColor }}>{currentLevel.id}</span>
            </h2>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Target</span>
          <span className="text-sm font-extrabold text-foreground">{nextLevel ? `Lvl ${nextLevel.id}` : "MAX"}</span>
        </div>
      </div>

      {/* ── VERTICAL LIST ── */}
      <div className="relative pl-3 space-y-6">
        {/* Connecting Line */}
        {items.length > 1 && (
          <div className="absolute left-[1.3rem] top-4 bottom-6 w-px bg-border group-hover:bg-border/80" />
        )}

        {items.map((item, i) => {
          const isCurrent = item.type === "current";
          const isNext = item.type === "next";
          const isFuture = item.type === "future";

          const col = isCurrent ? phaseColor : isNext ? "var(--color-blue-500)" : "var(--color-muted-foreground)";

          return (
            <motion.div
              key={item.level.id}
              className={`relative flex items-start gap-4 ${isFuture ? "opacity-50 grayscale" : ""}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: isFuture ? 0.4 : 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              {/* Node */}
              <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-card ring-4 ring-card pt-0.5">
                {isCurrent ? (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full shadow-sm text-white" style={{ backgroundColor: phaseColor }}>
                    <Check size={12} strokeWidth={4} />
                  </div>
                ) : isNext ? (
                  <div className="relative flex h-5 w-5 items-center justify-center rounded-full border-[3px] border-blue-500 bg-card">
                    <span className="absolute inset-[-6px] rounded-full border-2 border-blue-500/30 animate-[ping_2s_ease-out_infinite]" />
                  </div>
                ) : (
                  <div className="flex h-4 w-4 items-center justify-center rounded-full border-[2px] border-muted-foreground bg-muted" />
                )}
              </div>

              {/* Data */}
              <div className="flex-1 pt-0.5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className={`text-sm font-black tracking-tight ${isCurrent || isNext ? "text-foreground" : "text-muted-foreground"}`}>
                    Level {item.level.id} · {item.level.name}
                  </h3>
                  {!isCurrent && (
                    <Lock size={12} className="text-muted-foreground/40 shrink-0" />
                  )}
                </div>
                <p className="mt-0.5 text-[11px] font-medium text-muted-foreground/80 line-clamp-1">
                  {item.level.subtitle}
                </p>
                <div className="mt-1.5 flex items-center gap-2">
                  <span className={`inline-block rounded-sm px-1.5 py-0.5 text-[8px] font-black uppercase tracking-widest ${isCurrent ? "text-white" : "bg-muted text-muted-foreground"}`}
                        style={isCurrent ? { backgroundColor: phaseColor } : undefined}>
                    Phase {item.level.phase}
                  </span>
                  <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">
                    {item.level.threshold >= 60 ? `${(item.level.threshold/60).toFixed(1).replace('.0','')}h threshold` : `${item.level.threshold}m threshold`}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
