export interface ProductivityLevel {
  id: number;
  name: string;
  subtitle: string;
  threshold: number; // in minutes
  color: string; // hex or tailwind class
  phase: number;
}

export const LEVELS: ProductivityLevel[] = [
  // Phase 1 — Initiate
  { id: 1, name: "Pebble", threshold: 1, subtitle: "First save — the journey begins", color: "#3B82F6", phase: 1 },
  { id: 2, name: "First Saver", threshold: 10, subtitle: "10 minutes back in your pocket", color: "#3B82F6", phase: 1 },
  { id: 3, name: "Time Starter", threshold: 30, subtitle: "Half an hour — real momentum now", color: "#3B82F6", phase: 1 },
  { id: 4, name: "Hour Hacker", threshold: 60, subtitle: "One full hour reclaimed", color: "#3B82F6", phase: 1 },
  { id: 5, name: "Time Bender", threshold: 180, subtitle: "3 hours — you're bending the clock", color: "#3B82F6", phase: 1 },
  { id: 6, name: "Speed Apprentice", threshold: 300, subtitle: "5 hours — a full half-workday back", color: "#3B82F6", phase: 1 },
  { id: 7, name: "Efficiency Seeker", threshold: 600, subtitle: "10 hours — a full workday reclaimed", color: "#3B82F6", phase: 1 },

  // Phase 2 — Momentum
  { id: 8, name: "Time Optimizer", threshold: 900, subtitle: "15 hours — optimizing life itself", color: "#3B82F6", phase: 2 },
  { id: 9, name: "Focus Builder", threshold: 1200, subtitle: "20 hours — deep focus is your superpower", color: "#3B82F6", phase: 2 },
  { id: 10, name: "Momentum Master", threshold: 1800, subtitle: "30 hours — unstoppable compound effect", color: "#3B82F6", phase: 2 },
  { id: 11, name: "Productivity Pro", threshold: 3000, subtitle: "50 hours — two full work weeks recaptured", color: "#3B82F6", phase: 2 },
  { id: 12, name: "Time Strategist", threshold: 4500, subtitle: "75 hours — playing chess with your time", color: "#3B82F6", phase: 2 },
  { id: 13, name: "Century Saver", threshold: 6000, subtitle: "100 hours — a century milestone 🎖", color: "#3B82F6", phase: 2 },

  // Phase 3 — Mastery
  { id: 14, name: "Time Architect", threshold: 9000, subtitle: "150 hours — you design your own time", color: "#3B82F6", phase: 3 },
  { id: 15, name: "Efficiency Elite", threshold: 12000, subtitle: "200 hours — top 1% of time savers", color: "#3B82F6", phase: 3 },
  { id: 16, name: "Time Commander", threshold: 18000, subtitle: "300 hours — commanding every second", color: "#3B82F6", phase: 3 },
  { id: 17, name: "Half-K Saver", threshold: 30000, subtitle: "500 hours — half a thousand hours free", color: "#3B82F6", phase: 3 },
  { id: 18, name: "Time Dominator", threshold: 45000, subtitle: "750 hours — dominating the clock", color: "#3B82F6", phase: 3 },
  { id: 19, name: "1K Hours Reclaimed", threshold: 60000, subtitle: "1,000 hours — a full month of life back 🏆", color: "#3B82F6", phase: 3 },

  // Phase 4 — Legend
  { id: 20, name: "Time Warper", threshold: 120000, subtitle: "2,000 hours — reality bends to your will", color: "#3B82F6", phase: 4 },
  { id: 21, name: "Reality Optimizer", threshold: 300000, subtitle: "5,000 hours — you've hacked existence itself", color: "#3B82F6", phase: 4 },
  { id: 22, name: "Time Legend", threshold: 600000, subtitle: "10,000 hours — you ARE time ✦", color: "#3B82F6", phase: 4 },
];

export function getCurrentLevel(minutesSaved: number) {
  const currentId = [...LEVELS].reverse().find(l => minutesSaved >= l.threshold)?.id || LEVELS[0].id;
  const current = LEVELS.find(l => l.id === currentId)!;
  const next = LEVELS.find(l => l.id === currentId + 1);
  
  let progress = 100;
  if (next) {
    const range = next.threshold - current.threshold;
    const progressInTier = Math.max(0, minutesSaved - current.threshold);
    progress = range > 0 ? Math.min(100, Math.max(0, (progressInTier / range) * 100)) : 100;
  }
  
  return { current, next, progress };
}

export interface Badge {
  id: string;
  icon: string;
  name: string;
  condition: string;
}

export const BADGES: Badge[] = [
  // Progression badges
  { id: 'speed_starter',  icon: '⚡', name: 'Speed Starter',  condition: 'Save your first minute' },
  { id: 'week_warrior',   icon: '⏱️', name: 'Hour Hacker',    condition: 'Save 1 full hour' },
  { id: 'turbo_mode',     icon: '💨', name: 'Turbo Mover',    condition: 'Save 5 hours' },
  { id: 'streak_lord',    icon: '💎', name: 'Time Master',    condition: 'Save 10 hours' },
  { id: 'deep_learner',   icon: '🧠', name: 'Deep Learner',   condition: 'Save 50 hours' },
  { id: 'century_club',   icon: '🎯', name: 'Century Club',   condition: 'Save 200 hours' },
  { id: 'hall_of_fame',   icon: '👑', name: 'Hall of Fame',   condition: 'Reach Time Legend rank (10,000h)' },
];

export interface LoyaltyMilestone {
  id: string;
  label: string;
  icon: string;
  title: string;
  days: number;
}

export const LOYALTY_MILESTONES: LoyaltyMilestone[] = [
  { id: 'day1',    label: 'Day 1',     icon: '🌱', title: 'Welcome Aboard',    days: 1   },
  { id: 'week1',   label: 'Week 1',    icon: '🔑', title: 'You Came Back',     days: 7   },
  { id: 'month1',  label: '1 Month',   icon: '⭐', title: 'Committed',         days: 30  },
  { id: 'month3',  label: '3 Months',  icon: '🔥', title: 'Habit Formed',      days: 90  },
  { id: 'month6',  label: '6 Months',  icon: '💪', title: 'Half-Year Hero',    days: 180 },
  { id: 'year1',   label: '1 Year',    icon: '🏅', title: 'Annual Legend',     days: 365 },
  { id: 'year2',   label: '2 Years',   icon: '💎', title: 'Diamond Member',    days: 730 },
  { id: 'year5',   label: '5 Years',   icon: '👑', title: 'Hall of Fame',      days: 1825},
];

export interface GamifiedUserStats {
  userId: string;
  username: string;
  joinedAt: Date;
  totalMinutesSaved: number;
  earnedBadges: string[];
}

import { UserStats, DbUser } from "./db";

// Helper to generate a deterministic number from a string
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// Generate honest gamified stats based strictly on real DB data
export function generateGamifiedStats(userStats: UserStats | null, dbUser: DbUser): GamifiedUserStats {
  const totalMinutesSaved = userStats ? Math.floor(userStats.total_ms / 60000) : 0;
  const joinedAt = new Date(dbUser.created_at);

  // Earned badges logic strictly based on real time saved
  const earnedBadges: string[] = [];
  if (totalMinutesSaved >= 1) earnedBadges.push('speed_starter');
  if (totalMinutesSaved >= 60) earnedBadges.push('week_warrior'); // Repurposed for 1h saved
  if (totalMinutesSaved >= 300) earnedBadges.push('turbo_mode'); // Repurposed for 5h saved
  if (totalMinutesSaved >= 600) earnedBadges.push('streak_lord'); // Repurposed for 10h saved
  if (totalMinutesSaved >= 3000) earnedBadges.push('deep_learner');
  if (totalMinutesSaved >= 12000) earnedBadges.push('century_club'); // Repurposed for 200h saved
  if (totalMinutesSaved >= 600000) earnedBadges.push('hall_of_fame'); // Legend

  return {
    userId: dbUser.id,
    username: dbUser.name || dbUser.email.split('@')[0],
    joinedAt,
    totalMinutesSaved,
    earnedBadges,
  };
}

// Converts abstract saved minutes into emotional, real-world value equivalents.
export function getTimeEquivalence(minutes: number): string {
  if (minutes < 5) return "Every second counts. Keep going! 🚀";
  if (minutes < 30) return "Enough time to brew and enjoy a perfect coffee. ☕";
  if (minutes < 60) return "You just earned a quick workout session. 💪";
  if (minutes < 120) return "A full extra hour to read, walk, or breathe! 🍃";
  if (minutes < 240) return "You've earned back a feature-length movie. 🎬";
  if (minutes < 480) return "You just reclaimed a half workday for yourself. 🌅";
  if (minutes < 960) return "That's an entire 8-hour workday back in your life. 💼";
  if (minutes < 1440) return "A full, glorious 8-hour night's sleep restored. 😴";
  if (minutes < 2880) return "You just gained a whole new 24-hour day of living. 🌟";
  if (minutes < 7200) return "You've successfully reclaimed a long weekend! 🏖️";
  if (minutes < 24000) return "An entire standard work-week added back to your life. 🏢";
  if (minutes < 87600) return "You've accumulated over a month of pure free time. 📅";
  return "You are literally bending the fabric of time itself. 🌌";
}
