"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { LOYALTY_MILESTONES } from "@/lib/productivity";
import { Check } from "lucide-react";

interface LoyaltyTimelineProps {
  joinedAt: Date;
}

export function LoyaltyTimeline({ joinedAt }: LoyaltyTimelineProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const today = new Date();
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysSinceJoin = Math.floor((today.getTime() - new Date(joinedAt).getTime()) / msPerDay);

  // Auto-scroll to current milestone
  useEffect(() => {
    if (scrollRef.current) {
      const activeElement = scrollRef.current.querySelector('[data-current="true"]');
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  }, [daysSinceJoin]);

  return (
    <div className="overflow-hidden rounded-3xl border border-border/50 bg-card p-8 backdrop-blur-md transition-colors duration-300 shadow-sm">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-foreground tracking-tight">Membership Journey</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          You've been with us for <strong className="text-foreground">{daysSinceJoin}</strong> days
        </p>
      </div>

      <div 
        ref={scrollRef}
        className="relative flex items-center justify-start gap-16 overflow-x-auto pb-8 pt-4 scrollbar-thin scrollbar-track-secondary scrollbar-thumb-muted-foreground/30 px-8"
      >
        {/* Track Line Background */}
        <div className="absolute left-8 right-8 top-10 h-1 bg-border" />

        {LOYALTY_MILESTONES.map((milestone, index) => {
          const isReached = daysSinceJoin >= milestone.days;
          
          // Find if this is the currently active milestone (reached, but next one isn't)
          const nextMilestone = LOYALTY_MILESTONES[index + 1];
          const isCurrentTarget = !isReached && (index === 0 || daysSinceJoin >= LOYALTY_MILESTONES[index - 1].days);
          const isLatestReached = isReached && (!nextMilestone || daysSinceJoin < nextMilestone.days);

          // Calculate line fill percentage to the next node
          let lineFill = 0;
          if (isReached && nextMilestone) {
            if (daysSinceJoin >= nextMilestone.days) {
              lineFill = 100;
            } else {
              const range = nextMilestone.days - milestone.days;
              const progress = daysSinceJoin - milestone.days;
              lineFill = (progress / range) * 100;
            }
          }

          return (
            <div 
              key={milestone.id} 
              className="relative flex flex-col items-center flex-shrink-0 w-24"
              data-current={isLatestReached || isCurrentTarget}
            >
              {/* Active Track Line Segment */}
              {index < LOYALTY_MILESTONES.length - 1 && (
                <div 
                  className="absolute left-1/2 top-6 h-1 bg-blue-500 transition-all duration-1000"
                  style={{ width: `${lineFill}%`, minWidth: lineFill > 0 ? `calc(100% + 48px + 16px)` : 0, maxWidth: `calc(100% + 64px)` }}
                />
              )}

              {/* Node */}
              <motion.div
                className={`group relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-4 transition-all duration-500 ${
                  isReached 
                    ? "border-blue-500 bg-background shadow-[0_0_20px_rgba(59,130,246,0.3)]" 
                    : isCurrentTarget
                    ? "border-border/50 bg-background ring-2 ring-blue-500/50 ring-offset-4 ring-offset-background animate-pulse"
                    : "border-border/50 bg-muted/50"
                }`}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
              >
                {/* Checkmark overlay for reached */}
                {isReached ? (
                  <Check size={20} className="text-blue-500" />
                ) : (
                  <span className="text-2xl grayscale opacity-40">{milestone.icon}</span>
                )}

                {/* Tooltip */}
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-popover px-4 py-2 text-center opacity-0 shadow-xl transition-all group-hover:-top-20 group-hover:opacity-100 ring-1 ring-border pointer-events-none z-50">
                  <p className="text-sm font-bold text-popover-foreground">{milestone.title}</p>
                  {isCurrentTarget ? (
                    <p className="text-xs text-muted-foreground mt-1">{milestone.days - daysSinceJoin} days left</p>
                  ) : (
                    <p className="text-xs text-muted-foreground mt-1">{milestone.days} days required</p>
                  )}
                  <div className="absolute -bottom-1 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-popover ring-1 ring-border border-t-0 border-l-0" />
                </div>
              </motion.div>

              <div className="mt-4 text-center">
                <span className={`block text-xs font-bold uppercase tracking-widest ${isReached ? "text-blue-500 dark:text-blue-400" : "text-muted-foreground"}`}>
                  {milestone.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
