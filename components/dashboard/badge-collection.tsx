"use client";

import { motion } from "framer-motion";
import { BADGES, Badge } from "@/lib/productivity";
import { Lock } from "lucide-react";

interface BadgeCollectionProps {
  earnedBadges: string[];
}

export function BadgeCollection({ earnedBadges }: BadgeCollectionProps) {
  const earnedSet = new Set(earnedBadges);

  return (
    <div className="rounded-3xl border border-border/50 bg-card p-8 backdrop-blur-md transition-colors duration-300 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground tracking-tight">Achievements</h2>
        <span className="text-sm font-medium text-muted-foreground">{earnedSet.size} / {BADGES.length} unlocked</span>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {BADGES.map((badge, idx) => {
          const isEarned = earnedSet.has(badge.id);

          return (
            <motion.div
              key={badge.id}
              className={`group relative flex flex-col items-center justify-center rounded-2xl border p-4 text-center transition-all ${
                isEarned 
                  ? "border-blue-500/30 bg-blue-500/10 hover:border-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]" 
                  : "border-border/50 bg-muted/50 grayscale opacity-50 hover:opacity-80"
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isEarned ? 1 : 0.6, scale: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              {/* Unlock shimmer effect on hover if earned */}
              {isEarned && (
                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-foreground/5 dark:via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                </div>
              )}

              {/* Locked overlay */}
              {!isEarned && (
                <div className="absolute right-2 top-2 rounded-full bg-muted-foreground/20 p-1">
                  <Lock size={12} className="text-muted-foreground" />
                </div>
              )}

              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-background/50 dark:bg-black/20 text-3xl shadow-inner ring-1 ring-border/50 group-hover:scale-110 transition-transform duration-300">
                {badge.icon}
              </div>
              <h3 className={`text-sm font-bold ${isEarned ? "text-foreground" : "text-muted-foreground"}`}>
                {badge.name}
              </h3>
              
              {/* Tooltip on hover */}
              <div className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-popover px-3 py-1.5 text-xs font-medium text-popover-foreground shadow-xl opacity-0 transition-opacity group-hover:opacity-100 z-50 ring-1 ring-border">
                {badge.condition}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
