"use client";

import CountUp from "react-countup";
import { Clock, PlaySquare, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface QuickStatsProps {
  minutesSaved: number;
  videosWatched: number;
  avgSpeedUsed: number;
}

// Kept for backward compatibility — the main stats display moved to the KPI row in dashboard-client
export function QuickStats({ minutesSaved, videosWatched, avgSpeedUsed }: QuickStatsProps) {
  const hours = Math.floor(minutesSaved / 60);
  const mins = minutesSaved % 60;

  const items = [
    {
      icon: <Clock size={18} />, label: "Time Reclaimed",
      display: `${hours}h ${String(mins).padStart(2, "0")}m`,
      end: hours, decimals: 0, suffix: "h", color: "blue",
    },
    {
      icon: <PlaySquare size={18} />, label: "Videos",
      display: `${videosWatched}`, end: videosWatched, decimals: 0, suffix: "", color: "violet",
    },
    {
      icon: <Zap size={18} />, label: "Avg Speed",
      display: `${avgSpeedUsed.toFixed(2)}×`, end: avgSpeedUsed, decimals: 2, suffix: "×", color: "amber",
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <motion.div
          key={i}
          className={`flex items-center gap-4 rounded-2xl border border-border/50 bg-card p-4 transition-all hover:border-border`}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08, duration: 0.35 }}
        >
          <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-${item.color}-500/10 text-${item.color}-500`}>
            {item.icon}
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{item.label}</p>
            <p className="text-xl font-extrabold text-foreground tabular-nums">
              <CountUp end={item.end} decimals={item.decimals} suffix={item.suffix} duration={1.5} />
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
