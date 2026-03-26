"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { LEVELS } from "@/lib/productivity";
import { CheckCircle2, Lock } from "lucide-react";

interface LevelJourneyProps {
  currentLevelId: number;
}

export function LevelJourney({ currentLevelId }: LevelJourneyProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to current level on mount
  useEffect(() => {
    if (scrollRef.current) {
      const activeElement = scrollRef.current.querySelector('[data-active="true"]');
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  }, [currentLevelId]);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card p-8 backdrop-blur-md transition-colors duration-300 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground tracking-tight">Level Journey</h2>
        <span className="text-sm text-muted-foreground">{currentLevelId} / {LEVELS.length} unlocked</span>
      </div>

      {/* Horizontal Scroll Area */}
      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-6 scrollbar-thin scrollbar-track-secondary scrollbar-thumb-muted-foreground/30 snap-x snap-mandatory"
        style={{ scrollBehavior: 'smooth' }}
      >
        {LEVELS.map((level, index) => {
          const isUnlocked = level.id <= currentLevelId;
          const isCurrent = level.id === currentLevelId;

          return (
            <motion.div
              key={level.id}
              data-active={isCurrent}
              className={`relative flex-shrink-0 snap-center w-[260px] rounded-2xl border p-5 transition-all
                ${isCurrent 
                  ? "border-border shadow-xl dark:bg-white/10 bg-black/5" 
                  : isUnlocked 
                  ? "border-border/50 bg-background opacity-90" 
                  : "border-border/10 bg-background opacity-40 grayscale"
                }
              `}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: isCurrent ? 1 : isUnlocked ? 0.9 : 0.5, scale: 1 }}
              viewport={{ once: true }}
              style={isCurrent ? { boxShadow: `0 0 30px ${level.color}30`, borderColor: level.color } : undefined}
            >
              {isCurrent && (
                <div className="absolute -inset-px rounded-2xl animate-pulse ring-2 ring-foreground/10" style={{ ringColor: level.color }} />
              )}
              
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground/10 text-xs font-bold font-mono text-foreground">
                    {level.id}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: isUnlocked ? level.color : undefined }}>
                    Phase {level.phase}
                  </span>
                </div>
                {isUnlocked ? (
                  <CheckCircle2 size={18} style={{ color: level.color }} />
                ) : (
                  <Lock size={18} className="text-muted-foreground" />
                )}
              </div>

              <h3 className={`text-xl font-bold ${isUnlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
                {level.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                {level.subtitle}
              </p>
              
              <div className="mt-4 text-xs font-medium text-muted-foreground/60 border-t border-border/50 pt-4">
                {level.threshold.toLocaleString()} mins required
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Edge Gradients for scrolling */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-card to-transparent pointer-events-none transition-colors duration-300" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-card to-transparent pointer-events-none transition-colors duration-300" />
    </div>
  );
}
