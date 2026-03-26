"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/auth/user-menu";
import { Flame } from "lucide-react";
import { motion } from "framer-motion";

// Productivity Lib
import { 
  getCurrentLevel, 
  GamifiedUserStats,
  BADGES, 
  LEVELS 
} from "@/lib/productivity";

// Components
import { HeroCard } from "@/components/dashboard/hero-card";
import { QuickStats } from "@/components/dashboard/quick-stats";
import { LevelJourney } from "@/components/dashboard/level-journey";
import { BadgeCollection } from "@/components/dashboard/badge-collection";
import { TimeChart } from "@/components/dashboard/time-chart";
import { LoyaltyTimeline } from "@/components/dashboard/loyalty-timeline";
import { LevelUpModal } from "@/components/dashboard/level-up-modal";
import { BadgeToast } from "@/components/dashboard/badge-toast";

interface DashboardClientProps {
  initialStats: GamifiedUserStats;
}

export function DashboardClient({ initialStats }: DashboardClientProps) {
  const [stats, setStats] = useState(initialStats);
  
  // Modals and Toasts
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [activeToastBadge, setActiveToastBadge] = useState<any | null>(null);

  // Derived state
  const { current: currentLevel, next: nextLevel, progress } = getCurrentLevel(stats.totalMinutesSaved);

  // Simple demonstration hook: if you click the logo, it triggers a level up or badge toast.
  const handleTestAnimations = () => {
    const newBadge = BADGES.find(b => !stats.earnedBadges.includes(b.id));
    if (newBadge) {
      setActiveToastBadge(newBadge);
      setStats(prev => ({ ...prev, earnedBadges: [...prev.earnedBadges, newBadge.id] }));
    } else {
      const nextLvl = nextLevel || LEVELS[LEVELS.length - 1];
      setStats(prev => ({ ...prev, totalMinutesSaved: nextLvl.threshold + 10 }));
      setShowLevelUp(true);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-blue-500/30 overflow-x-hidden transition-colors duration-300">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl transition-colors duration-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <button onClick={handleTestAnimations} className="flex items-center gap-2.5 transition-opacity hover:opacity-80 outline-none text-left">
            <img src="/logo.svg" alt="PlaySaver Logo" className="h-8 w-8 drop-shadow-md brightness-150 dark:brightness-150" />
            <span className="text-lg font-bold tracking-tight text-foreground hidden sm:inline-block">
              Play<span className="text-blue-500">Saver</span>
            </span>
          </button>

          <div className="flex flex-1 justify-center gap-4">
             {/* Centered User Info */}
             <div className="flex items-center gap-3 rounded-full bg-muted/50 dark:bg-white/5 px-4 py-1.5 ring-1 ring-border shadow-sm">
               <span className="text-sm font-bold">{stats.username}</span>
               
               <div className="h-4 w-px bg-border group-hover:bg-border/80 transition-colors" />
               
               {/* Current Level Badge Mini */}
               <div className="flex items-center gap-1.5">
                 <span className="flex h-4 w-4 items-center justify-center rounded-sm text-[9px] font-bold text-white shadow-sm" style={{ backgroundColor: currentLevel.color }}>
                   {currentLevel.id}
                 </span>
                 <span className="hidden sm:inline-block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                   {currentLevel.name}
                 </span>
               </div>
               
               <div className="h-4 w-px bg-border transition-colors" />
               
               {/* Streak Fire */}
               <div className="group flex items-center gap-1 relative cursor-default">
                 <motion.div 
                   animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }} 
                   transition={{ repeat: Infinity, duration: 2 }}
                 >
                   <Flame size={16} className={stats.currentStreak >= 7 ? "text-orange-500 font-bold" : "text-amber-500"} fill="currentColor" />
                 </motion.div>
                 <span className={`text-sm font-bold ${stats.currentStreak >= 7 ? "text-orange-500" : "text-amber-500"}`}>
                   {stats.currentStreak}
                 </span>
                 
                 {/* Tooltip */}
                 <div className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-popover px-3 py-1.5 text-xs font-medium text-popover-foreground opacity-0 shadow-xl transition-all group-hover:top-10 group-hover:opacity-100 z-50 ring-1 ring-border pointer-events-none">
                   {stats.currentStreak} day streak! 🔥
                 </div>
               </div>
             </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <UserMenu />
          </div>
        </div>
      </header>

      {/* ── Main Layout ────────────────────────────────────────────── */}
      <main className="mx-auto max-w-7xl px-4 py-8 space-y-8 sm:px-6 lg:px-8">
        
        {/* Top: Hero & Stats */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <HeroCard 
            currentLevel={currentLevel} 
            nextLevel={nextLevel || undefined} 
            progressPct={progress} 
            minutesSaved={stats.totalMinutesSaved} 
          />
          <div className="flex flex-col justify-center gap-8">
            <QuickStats 
              minutesSaved={stats.totalMinutesSaved}
              videosWatched={stats.videosWatched}
              avgSpeedUsed={stats.avgSpeedUsed}
            />
            <TimeChart 
              data={stats.dailySaves} 
              phaseColor={currentLevel.color} 
            />
          </div>
        </div>

        {/* Level Journey */}
        <LevelJourney currentLevelId={currentLevel.id} />

        {/* Achievements Grid */}
        <BadgeCollection earnedBadges={stats.earnedBadges} />

        {/* Loyalty Timeline */}
        <LoyaltyTimeline joinedAt={stats.joinedAt} />

      </main>

      {/* ── Floating Modals / Toasts ───────────────────────────────── */}
      <LevelUpModal 
        isOpen={showLevelUp} 
        onClose={() => setShowLevelUp(false)} 
        newLevel={currentLevel} 
      />
      
      <BadgeToast 
        badge={activeToastBadge} 
        onDismiss={() => setActiveToastBadge(null)} 
      />

    </div>
  );
}
