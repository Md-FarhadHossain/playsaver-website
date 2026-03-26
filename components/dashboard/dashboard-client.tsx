"use client";

import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/auth/user-menu";
import { motion } from "framer-motion";
import { getCurrentLevel, GamifiedUserStats, BADGES, LEVELS } from "@/lib/productivity";
import { HeroCard } from "@/components/dashboard/hero-card";
import { LevelJourney } from "@/components/dashboard/level-journey";
import { BadgeCollection } from "@/components/dashboard/badge-collection";
import { LoyaltyTimeline } from "@/components/dashboard/loyalty-timeline";
import { LevelUpModal } from "@/components/dashboard/level-up-modal";
import { BadgeToast } from "@/components/dashboard/badge-toast";

interface DashboardClientProps {
  initialStats: GamifiedUserStats;
}

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export function DashboardClient({ initialStats }: DashboardClientProps) {
  const [stats, setStats] = useState(initialStats);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [activeToastBadge, setActiveToastBadge] = useState<any | null>(null);

  const { current: currentLevel, next: nextLevel, progress } = getCurrentLevel(stats.totalMinutesSaved);

  const handleLogoClick = () => {
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

  const glowStyle = {
    "--phase-color": currentLevel.color,
  } as React.CSSProperties;

  return (
    <div
      className="min-h-screen bg-background text-foreground overflow-x-hidden transition-colors duration-500"
      style={glowStyle}
    >
      {/* ── HEADER ──────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/70 backdrop-blur-2xl">
        <div className="mx-auto flex h-14 max-w-screen-xl items-center justify-between px-5 gap-4">
          <button onClick={handleLogoClick} className="flex items-center gap-2.5 group outline-none">
            <img src="/logo.svg" alt="PlaySaver" className="h-7 w-7 transition-transform group-hover:scale-110 duration-200" />
            <span className="font-bold tracking-tight text-sm hidden sm:block">
              Play<span className="text-blue-500">Saver</span>
            </span>
          </button>

          {/* User pill */}
          <div className="flex items-center gap-2.5 rounded-full border border-border bg-muted/30 px-3.5 py-1.5 text-xs font-medium backdrop-blur">
            <span className="font-semibold">{stats.username}</span>
            <span className="h-3 w-px bg-border" />
            <span
              className="flex h-4.5 w-4.5 items-center justify-center rounded-md text-[9px] font-black text-white px-1"
              style={{ backgroundColor: currentLevel.color }}
            >
              {currentLevel.id}
            </span>
            <span className="hidden sm:block text-muted-foreground">{currentLevel.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <UserMenu />
          </div>
        </div>
      </header>

      {/* ── MAIN ────────────────────────────────────────────────────────── */}
      <main className="mx-auto max-w-screen-xl px-5 py-8 xl:px-8 space-y-6">

        {/* ROW 1 — Hero */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.5 }}>
          <HeroCard
            currentLevel={currentLevel}
            nextLevel={nextLevel || undefined}
            progressPct={progress}
            minutesSaved={stats.totalMinutesSaved}
            username={stats.username}
          />
        </motion.div>

        {/* ROW 2 — Minimal Progress side-by-side */}
        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <LevelJourney currentLevelId={currentLevel.id} phaseColor={currentLevel.color} />
          <LoyaltyTimeline joinedAt={stats.joinedAt} />
        </motion.div>

        {/* ROW 3 — Badges Full Width */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <BadgeCollection earnedBadges={stats.earnedBadges} />
        </motion.div>

      </main>

      {/* ── OVERLAYS ─────────────────────────────────────────────────────── */}
      <LevelUpModal isOpen={showLevelUp} onClose={() => setShowLevelUp(false)} newLevel={currentLevel} />
      <BadgeToast badge={activeToastBadge} onDismiss={() => setActiveToastBadge(null)} />
    </div>
  );
}
