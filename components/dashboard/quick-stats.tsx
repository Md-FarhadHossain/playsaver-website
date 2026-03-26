"use client";

import CountUp from "react-countup";
import { Clock, PlaySquare, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface QuickStatsProps {
  minutesSaved: number;
  videosWatched: number;
  avgSpeedUsed: number;
}

export function QuickStats({ minutesSaved, videosWatched, avgSpeedUsed }: QuickStatsProps) {
  const hours = Math.floor(minutesSaved / 60);
  const minutes = minutesSaved % 60;
  
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const hoverBg = mounted && resolvedTheme === 'dark' 
    ? "rgba(255, 255, 255, 0.08)" 
    : "rgba(0, 0, 0, 0.03)";

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      {/* Time Saved Card */}
      <motion.div 
        className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-6 backdrop-blur-md transition-colors duration-300 shadow-sm"
        whileHover={{ y: -4, backgroundColor: hoverBg }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10 text-blue-500 dark:text-blue-400 ring-1 ring-blue-500/20 group-hover:bg-blue-500/20">
          <Clock size={24} />
        </div>
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Total Reclaimed</p>
        <div className="mt-1 flex items-baseline gap-1">
          <span className="text-3xl font-extrabold text-foreground">
            <CountUp end={hours} duration={2} />h{" "}
            <CountUp end={minutes} duration={2} />m
          </span>
        </div>
      </motion.div>

      {/* Videos Watched Card */}
      <motion.div 
        className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-6 backdrop-blur-md transition-colors duration-300 shadow-sm"
        whileHover={{ y: -4, backgroundColor: hoverBg }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-violet-500/10 text-violet-500 dark:text-violet-400 ring-1 ring-violet-500/20 group-hover:bg-violet-500/20">
          <PlaySquare size={24} />
        </div>
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Videos Watched</p>
        <div className="mt-1 flex items-baseline gap-1">
          <span className="text-3xl font-extrabold text-foreground">
            <CountUp end={videosWatched} duration={1.8} />
          </span>
          <span className="text-muted-foreground">videos</span>
        </div>
      </motion.div>

      {/* Avg Speed Card */}
      <motion.div 
        className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-6 backdrop-blur-md transition-colors duration-300 shadow-sm"
        whileHover={{ y: -4, backgroundColor: hoverBg }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10 text-amber-500 dark:text-amber-400 ring-1 ring-amber-500/20 group-hover:bg-amber-500/20">
          <Zap size={24} />
        </div>
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Avg Speed</p>
        <div className="mt-1 flex items-baseline gap-1">
          <span className="text-3xl font-extrabold text-foreground">
            <CountUp end={avgSpeedUsed} decimals={2} duration={2.2} />×
          </span>
        </div>
      </motion.div>
    </div>
  );
}
