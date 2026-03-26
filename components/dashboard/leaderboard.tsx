"use client";

import { motion } from "framer-motion";
import { LeaderboardUser } from "@/lib/db";
import { Trophy, Medal, Award } from "lucide-react";

interface LeaderboardProps {
  leaderboard: LeaderboardUser[];
  currentUserId: string;
}

export function Leaderboard({ leaderboard, currentUserId }: LeaderboardProps) {
  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  };

  return (
    <div className="flex flex-col rounded-[2rem] border border-border/60 bg-card p-6 shadow-sm transition-colors duration-300">
      {/* ── HEADER ── */}
      <div className="mb-6 flex items-center justify-between border-b border-border/40 pb-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">
            Global Rank
          </p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-xl font-black text-foreground tracking-tight">
              Leaderboard
            </h2>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Top Savers</span>
          <span className="text-sm font-extrabold text-foreground">{leaderboard.length}</span>
        </div>
      </div>

      {/* ── LIST ── */}
      <div className="flex flex-col gap-3">
        {leaderboard.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">No data available yet.</p>
        ) : (
          leaderboard.map((user, index) => {
            const isCurrentUser = user.userId === currentUserId;
            
            // Medals
            let medalNode = null;
            if (index === 0) medalNode = <Trophy size={16} className="text-yellow-400" />;
            else if (index === 1) medalNode = <Medal size={16} className="text-slate-300" />;
            else if (index === 2) medalNode = <Award size={16} className="text-amber-600" />;
            else medalNode = <span className="text-xs font-bold text-muted-foreground w-4 text-center">{index + 1}</span>;

            return (
              <motion.div
                key={user.userId}
                className={`flex items-center justify-between rounded-xl px-4 py-3 transition-colors ${
                  isCurrentUser ? "bg-blue-500/10 ring-1 ring-blue-500/30" : "bg-muted/40 hover:bg-muted"
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center">
                    {medalNode}
                  </div>
                  
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full object-cover shadow-sm bg-muted" />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 text-xs font-bold text-blue-500 shadow-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div className="flex flex-col">
                    <span className={`text-sm font-bold tracking-tight ${isCurrentUser ? "text-blue-500 dark:text-blue-400" : "text-foreground"}`}>
                      {user.name} 
                      {isCurrentUser && <span className="ml-2 text-[10px] uppercase font-black tracking-wider text-blue-500/60">(You)</span>}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-black text-foreground tabular-nums">
                    {formatTime(user.totalMinutesSaved)}
                  </span>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
