export interface ProductivityTier {
  name: string;
  minSeconds: number;
  color: string;
  gradient: string;
}

export const TIERS: ProductivityTier[] = [
  { name: "Novice", minSeconds: 0, color: "text-slate-400", gradient: "from-slate-400 to-slate-500" },
  { name: "Time Saver", minSeconds: 3600, color: "text-emerald-400", gradient: "from-emerald-400 to-teal-500" },
  { name: "Productivity Ninja", minSeconds: 3600 * 5, color: "text-sky-400", gradient: "from-sky-400 to-blue-500" },
  { name: "Time Lord", minSeconds: 3600 * 24, color: "text-violet-400", gradient: "from-violet-400 to-fuchsia-500" },
  { name: "Master of Time", minSeconds: 3600 * 100, color: "text-amber-400", gradient: "from-amber-400 to-orange-500" },
];

export function getUserTier(totalSeconds: number): { current: ProductivityTier; next: ProductivityTier | null; progressPct: number } {
  let currentTier = TIERS[0];
  let nextTier: ProductivityTier | null = TIERS[1] || null;

  for (let i = 0; i < TIERS.length; i++) {
    if (totalSeconds >= TIERS[i].minSeconds) {
      currentTier = TIERS[i];
      nextTier = TIERS[i + 1] ?? null;
    } else {
      break;
    }
  }

  let progressPct = 100; // Max tier reached
  if (nextTier) {
    const range = nextTier.minSeconds - currentTier.minSeconds;
    const progressInTier = totalSeconds - currentTier.minSeconds;
    progressPct = Math.min(100, Math.max(0, (progressInTier / range) * 100));
  }

  return { current: currentTier, next: nextTier, progressPct };
}

export interface TimeEquivalent {
  title: string;
  description: string;
  count: number;
  icon: "book" | "tv" | "meditate" | "workout" | "coffee" | "code";
}

export function getTimeEquivalents(totalSeconds: number): TimeEquivalent[] {
  // Rough estimations
  // 1 chapter = ~15 mins (900 seconds)
  // 1 episode = ~45 mins (2700 seconds)
  // 1 workout = ~30 mins (1800 seconds)
  // 1 cup of coffee = ~10 mins (600 seconds)
  
  const equivalents: TimeEquivalent[] = [];

  if (totalSeconds >= 900) {
    equivalents.push({
      title: "Read Chapters",
      description: "Average chapters of a book",
      count: Math.floor(totalSeconds / 900),
      icon: "book",
    });
  }
  
  if (totalSeconds >= 1800) {
    equivalents.push({
      title: "Workouts",
      description: "Full 30-minute sessions",
      count: Math.floor(totalSeconds / 1800),
      icon: "workout",
    });
  }

  if (totalSeconds >= 2700) {
    equivalents.push({
      title: "TV Episodes",
      description: "Standard 45-min episodes",
      count: Math.floor(totalSeconds / 2700),
      icon: "tv",
    });
  }

  if (equivalents.length === 0 && totalSeconds >= 600) {
    equivalents.push({
      title: "Coffee Breaks",
      description: "10-minute unwind sessions",
      count: Math.floor(totalSeconds / 600),
      icon: "coffee",
    });
  }
  
  if (equivalents.length === 0) {
     equivalents.push({
      title: "Breaths Taken",
      description: "Deep, mindful breaths",
      count: Math.floor(totalSeconds / 4), // 4 seconds per breath
      icon: "meditate",
    });
  }

  return equivalents.slice(0, 3); // Max 3 cards
}
