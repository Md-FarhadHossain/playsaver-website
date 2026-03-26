"use client";

import { motion } from "framer-motion";
import { LOYALTY_MILESTONES } from "@/lib/productivity";
import { Check } from "lucide-react";

interface LoyaltyTimelineProps {
  joinedAt: Date;
}

export function LoyaltyTimeline({ joinedAt }: LoyaltyTimelineProps) {
  const daysSinceJoin = Math.floor((Date.now() - new Date(joinedAt).getTime()) / 86400000);

  const activeIdx = LOYALTY_MILESTONES.reduce((acc, m, i) => (daysSinceJoin >= m.days ? i : acc), -1);
  const nextIdx = activeIdx + 1 < LOYALTY_MILESTONES.length ? activeIdx + 1 : -1;
  const futureIdx = nextIdx + 1 < LOYALTY_MILESTONES.length ? nextIdx + 1 : -1;

  const items = [
    ...(activeIdx >= 0 ? [{ type: "current", milestone: LOYALTY_MILESTONES[activeIdx] }] : []),
    ...(nextIdx >= 0 ? [{ type: "next", milestone: LOYALTY_MILESTONES[nextIdx] }] : []),
    ...(futureIdx >= 0 ? [{ type: "future", milestone: LOYALTY_MILESTONES[futureIdx] }] : []),
  ];

  // If new user, show first 3
  if (items.length === 0) {
    items.push(
      { type: "next", milestone: LOYALTY_MILESTONES[0] },
      { type: "future", milestone: LOYALTY_MILESTONES[1] },
      { type: "future", milestone: LOYALTY_MILESTONES[2] }
    );
  }

  return (
    <div className="flex flex-col rounded-[2rem] border border-border/60 bg-card p-6 shadow-sm transition-colors duration-300">
      {/* ── HEADER ── */}
      <div className="mb-6 flex items-center justify-between border-b border-border/40 pb-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">
            Membership
          </p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-xl font-black text-foreground tracking-tight">
              <span className="text-blue-500">{daysSinceJoin}</span> days 
            </h2>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Joined</span>
          <span className="text-sm font-extrabold text-foreground">{new Date(joinedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </div>

      {/* ── VERTICAL TIMELINE ── */}
      <div className="relative pl-3 space-y-6">
        {/* Connecting Line */}
        {items.length > 1 && (
          <div className="absolute left-[1.35rem] top-4 bottom-6 w-px bg-border group-hover:bg-border/80" />
        )}

        {items.map((item, i) => {
          const isCurrent = item.type === "current";
          const isNext = item.type === "next";
          const isFuture = item.type === "future";

          const ms = item.milestone;

          return (
            <motion.div
              key={ms.id}
              className={`relative flex items-start gap-4 ${isFuture ? "opacity-50 grayscale" : ""}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: isFuture ? 0.4 : 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              {/* Node */}
              <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-card ring-4 ring-card pt-0.5">
                {isCurrent ? (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500 shadow-sm text-white">
                    <Check size={14} strokeWidth={4} />
                  </div>
                ) : isNext ? (
                  <div className="relative flex h-6 w-6 items-center justify-center rounded-full border-[3px] border-blue-500 bg-card">
                    <span className="absolute inset-[-6px] rounded-full border-2 border-blue-500/30 animate-[ping_2s_ease-out_infinite]" />
                  </div>
                ) : (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full border-[2px] border-muted-foreground bg-muted" />
                )}
              </div>

              {/* Data */}
              <div className="flex-1 pt-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className={`text-sm font-black tracking-tight uppercase ${isCurrent ? "text-blue-500" : isNext ? "text-foreground" : "text-muted-foreground"}`}>
                    {ms.label}
                  </h3>
                  {isNext && (
                    <span className="inline-flex rounded-full bg-blue-500/10 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-blue-500 border border-blue-500/20">
                      Target
                    </span>
                  )}
                </div>
                
                <p className="mt-0.5 text-[11px] font-medium text-muted-foreground line-clamp-1">
                  {ms.title}
                </p>
                
                {isNext && (
                  <p className="mt-1 text-[10px] font-bold text-muted-foreground/80">
                    <span className="text-foreground">{ms.days - daysSinceJoin}</span> days away
                  </p>
                )}
                {isCurrent && (
                  <p className="mt-1 text-[10px] font-bold text-muted-foreground/80">
                    Milestone achieved
                  </p>
                )}
                {isFuture && (
                  <p className="mt-1 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">
                    {ms.days} Days Total
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
