"use client";

import { motion } from "framer-motion";
import { BADGES } from "@/lib/productivity";
import { Lock } from "lucide-react";

interface BadgeCollectionProps {
  earnedBadges: string[];
  compact?: boolean;
}

export function BadgeCollection({ earnedBadges, compact }: BadgeCollectionProps) {
  const earnedSet = new Set(earnedBadges);
  const earned = BADGES.filter(b => earnedSet.has(b.id));
  const locked = BADGES.filter(b => !earnedSet.has(b.id));
  const sorted = [...earned, ...locked];

  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-border/50 bg-card transition-colors duration-300">
      {/* Header */}
      <div className="flex items-end justify-between px-6 pt-6 pb-4 border-b border-border/40">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Achievements</p>
          <p className="text-2xl font-extrabold text-foreground leading-none">
            {earned.length}
            <span className="text-lg font-medium text-muted-foreground ml-1">/ {BADGES.length}</span>
          </p>
        </div>
        {/* Earned emoji strip */}
        <div className="flex flex-wrap gap-1 justify-end max-w-[100px]">
          {earned.slice(0, 6).map(b => (
            <span key={b.id} title={b.name} className="text-lg leading-none">{b.icon}</span>
          ))}
          {earned.length > 6 && (
            <span className="self-center text-[10px] font-bold text-muted-foreground">+{earned.length - 6}</span>
          )}
        </div>
      </div>

      {/* Badge grid */}
      <div
        className="grid grid-cols-3 gap-2.5 p-4 overflow-y-auto"
        style={{ maxHeight: compact ? 272 : undefined }}
      >
        {sorted.map((badge, idx) => {
          const isEarned = earnedSet.has(badge.id);
          return (
            <motion.div
              key={badge.id}
              className={`group relative flex flex-col items-center gap-1.5 rounded-xl border py-3 px-2 text-center cursor-default transition-all duration-200 ${
                isEarned
                  ? "border-border/40 bg-background hover:border-blue-500/40 hover:shadow-[0_2px_16px_rgba(59,130,246,0.12)]"
                  : "border-border/20 bg-muted/20 opacity-35 grayscale"
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isEarned ? 1 : 0.4, scale: 1 }}
              transition={{ duration: 0.25, delay: idx * 0.02 }}
            >
              {!isEarned && (
                <Lock size={9} className="absolute top-1.5 right-1.5 text-muted-foreground/40" />
              )}
              <span className="text-2xl leading-none group-hover:scale-110 transition-transform duration-200">
                {badge.icon}
              </span>
              <span className={`text-[9px] font-bold leading-tight ${isEarned ? "text-foreground" : "text-muted-foreground"}`}>
                {badge.name}
              </span>

              {/* Tooltip */}
              <div className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap rounded-lg border border-border bg-popover px-2.5 py-1 text-[11px] font-medium text-popover-foreground shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">
                {badge.condition}
                <div className="absolute -bottom-[5px] left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 border-b border-r border-border bg-popover" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
