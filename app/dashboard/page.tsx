import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/session";
import { getUserStats, findUserById, getLeaderboard } from "@/lib/db";
import { generateGamifiedStats } from "@/lib/productivity";
import { DashboardClient } from "@/components/dashboard/dashboard-client";

export default async function GamifiedDashboardPage() {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }

  // Fetch real data
  const dbUser = await findUserById(session.sub);
  if (!dbUser) {
    redirect("/login");
  }

  const userStats = await getUserStats(session.sub);
  const leaderboard = await getLeaderboard(5); // Top 5 users

  // Generate the deterministic full gamified profile using real metrics
  const gamifiedStats = generateGamifiedStats(userStats, dbUser);

  return <DashboardClient initialStats={gamifiedStats} leaderboard={leaderboard} />;
}
