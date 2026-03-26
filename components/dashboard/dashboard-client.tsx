"use client";

import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/auth/user-menu";
import { motion } from "framer-motion";
import { getCurrentLevel, GamifiedUserStats, BADGES, LEVELS } from "@/lib/productivity";
import { HeroCard } from "@/components/dashboard/hero-card";
import { Leaderboard } from "@/components/dashboard/leaderboard";
import { BadgeCollection } from "@/components/dashboard/badge-collection";
import { LevelUpModal } from "@/components/dashboard/level-up-modal";
import { BadgeToast } from "@/components/dashboard/badge-toast";

import { LeaderboardUser } from "@/lib/db";

interface DashboardClientProps {
  initialStats: GamifiedUserStats;
  leaderboard: LeaderboardUser[];
}

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export function DashboardClient({ initialStats, leaderboard }: DashboardClientProps) {
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
      className="relative min-h-screen bg-transparent text-foreground overflow-x-hidden transition-colors duration-500 isolate"
      style={glowStyle}
    >
      {/* ── BACKGROUND ──────────────────────────────────────────────────────── */}
      <div className="fixed inset-x-0 top-0 -z-10 h-full overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-80" />
        
        {/* Vibrant Glowing Blobs */}
        <div className="absolute -top-[5%] left-1/2 -z-10 h-[400px] w-[500px] -translate-x-1/2 rounded-full bg-blue-500/30 blur-3xl sm:-top-[10%] sm:h-[600px] sm:w-[800px] dark:bg-blue-500/20" />
        <div className="absolute -left-[10%] top-[5%] -z-10 h-[300px] w-[400px] rounded-full bg-cyan-500/30 blur-3xl sm:h-[400px] sm:w-[500px] dark:bg-cyan-500/20" />
        <div className="absolute -right-[10%] top-[10%] -z-10 h-[350px] w-[400px] rounded-full bg-teal-500/30 blur-3xl sm:h-[450px] sm:w-[500px] dark:bg-teal-500/20" />
      </div>

      {/* ── HEADER ──────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/70 backdrop-blur-2xl">
        <div className="mx-auto flex h-14 max-w-screen-xl items-center justify-between px-5 gap-4">
          <div className="flex items-center gap-2.5 group outline-none">
            <img src="/logo.svg" alt="PlaySaver" className="h-7 w-7 transition-transform group-hover:scale-110 duration-200" />
            <span className="font-bold tracking-tight text-sm hidden sm:block">
              Play<span className="text-blue-500">Saver</span>
            </span>
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
            joinedAt={stats.joinedAt}
          />
        </motion.div>

        {/* ROW 2 — Leaderboard Centered */}
        <motion.div
          className="mx-auto max-w-4xl"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Leaderboard leaderboard={leaderboard} currentUserId={stats.userId} />
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
