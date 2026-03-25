import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/session";
import { findUserById, getUserStats } from "@/lib/db";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/auth/user-menu";
import { Clock, BookOpen, Tv, Activity, Coffee, Code, Brain, Trophy, Zap, Chrome, Target, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getUserTier, getTimeEquivalents, TimeEquivalent } from "@/lib/productivity";

function formatSeconds(totalSeconds: number): string {
  if (totalSeconds < 60) return `${Math.round(totalSeconds)}s`;
  const hours   = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  if (hours === 0) return `${minutes}m`;
  return `${hours}h ${minutes}m`;
}

function getIconForEquivalent(iconStr: string) {
  switch (iconStr) {
    case "book": return <BookOpen className="text-amber-500" size={24} />;
    case "tv": return <Tv className="text-blue-500" size={24} />;
    case "meditate": return <Brain className="text-fuchsia-500" size={24} />;
    case "workout": return <Activity className="text-emerald-500" size={24} />;
    case "coffee": return <Coffee className="text-stone-500" size={24} />;
    case "code": return <Code className="text-slate-500" size={24} />;
    default: return <Zap className="text-yellow-500" size={24} />;
  }
}

export default async function DashboardPage() {
  const session = await getServerSession();
  if (!session) redirect("/?auth=required");

  const user  = await findUserById(session.sub);
  if (!user)  redirect("/?auth=required");

  const userStats = await getUserStats(user.id);
  const totalSeconds = (userStats?.total_ms ?? 0) / 1000;

  const { current: currentTier, next: nextTier, progressPct } = getUserTier(totalSeconds);
  const equivalents = getTimeEquivalents(totalSeconds);

  return (
    <div className="min-h-screen bg-background">
      {/* ── Top Nav ──────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/30">
              <Clock size={16} className="text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground">
              Time<span className="text-violet-500">Saver</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <UserMenu />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">
        {/* ── Celebration Hero ─────────────────────────────────────── */}
        <section className="mb-14 text-center">
          <div className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 ring-4 ring-background">
            {user.avatar ? (
              <Image src={user.avatar} alt="User" width={80} height={80} className="rounded-full shadow-xl" />
            ) : (
              <span className="text-3xl font-bold text-violet-500">{(user.name ?? user.email)[0].toUpperCase()}</span>
            )}
          </div>
          
          <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            You've reclaimed <br className="sm:hidden" />
            <span className={`bg-gradient-to-r ${currentTier.gradient} bg-clip-text text-transparent`}>
              {formatSeconds(totalSeconds)}
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            That's time you got back just by watching smarter. Keep up the high-speed learning!
          </p>

          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/50 px-6 py-2.5 backdrop-blur-sm">
            <Trophy size={18} className={currentTier.color} />
            <span className="text-sm font-medium text-muted-foreground">Current Rank:</span>
            <span className={`text-sm font-bold ${currentTier.color}`}>{currentTier.name}</span>
          </div>
        </section>

        {/* ── Milestone Tracker ────────────────────────────────────── */}
        {nextTier && (
          <section className="mb-14 relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-background to-muted/20 p-8 shadow-sm">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-500/5 blur-3xl"></div>
            
            <div className="mb-6 flex items-end justify-between">
              <div>
                <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
                  <Target className="text-violet-500" size={24} />
                  Next Milestone
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">Unlock the rank of <span className={`font-semibold ${nextTier.color}`}>{nextTier.name}</span></p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-foreground">{formatSeconds(nextTier.minSeconds)}</span>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Goal</p>
              </div>
            </div>

            <div className="relative h-4 w-full overflow-hidden rounded-full bg-muted shadow-inner">
              <div
                className={`absolute left-0 top-0 h-full rounded-full bg-gradient-to-r ${currentTier.gradient} shadow-lg transition-all duration-1000 ease-out`}
                style={{ width: `${Math.max(2, progressPct)}%` }}
              >
                <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]"></div>
              </div>
            </div>
            
            <div className="mt-3 flex justify-between text-xs font-semibold text-muted-foreground">
              <span>{formatSeconds(totalSeconds)} saved</span>
              <span>{formatSeconds(nextTier.minSeconds - totalSeconds)} to go</span>
            </div>
          </section>
        )}

        {/* ── Time Equivalents ─────────────────────────────────────── */}
        <section className="mb-14">
          <div className="mb-8 flex items-center justify-center gap-2 text-center text-foreground">
            <Sparkles className="text-amber-500" size={24} />
            <h2 className="text-2xl font-bold">What could you do with this time?</h2>
            <Sparkles className="text-amber-500" size={24} />
          </div>

          {totalSeconds === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border/60 p-12 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Clock className="text-muted-foreground" size={32} />
              </div>
              <h3 className="text-lg font-bold text-foreground">No time saved yet</h3>
              <p className="mt-2 text-sm text-muted-foreground">Install the extension and start watching videos at higher speeds to unlock your stats!</p>
              <a
                  href="https://chrome.google.com/webstore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-6 py-3 text-sm font-bold text-white shadow-md shadow-violet-500/20 transition-all hover:scale-105"
                >
                  <Chrome size={18} />
                  Add to Chrome
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {equivalents.map((eq, i) => (
                <div key={i} className="group relative overflow-hidden rounded-3xl border border-border/60 bg-background p-6 shadow-sm transition-all hover:border-violet-500/30 hover:shadow-md hover:shadow-violet-500/10">
                  <div className="mb-4 inline-flex rounded-2xl bg-muted/50 p-3 ring-1 ring-border shadow-sm">
                    {getIconForEquivalent(eq.icon)}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold text-foreground">{eq.count}</span>
                    <span className="text-lg font-bold text-muted-foreground">{eq.title}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{eq.description}</p>
                  
                  <div className="absolute -bottom-10 -right-10 opacity-[0.03] transition-opacity group-hover:opacity-10">
                    {getIconForEquivalent(eq.icon)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </main>
    </div>
  );
}
