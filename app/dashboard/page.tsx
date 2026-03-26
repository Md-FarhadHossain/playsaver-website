import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/session";
import { getUserStats, findUserById } from "@/lib/db";
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

  // Generate the deterministic full gamified profile using real metrics
  const gamifiedStats = generateGamifiedStats(userStats, dbUser);

  return <DashboardClient initialStats={gamifiedStats} />;
}
