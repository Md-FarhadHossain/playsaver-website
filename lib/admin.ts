import { getServerSession } from "./session";
import { redirect } from "next/navigation";

export async function requireAdmin() {
  const session = await getServerSession();
  
  if (!session || !session.email) {
    redirect("/");
  }
  
  if (session.email !== process.env.ADMIN_EMAIL) {
    redirect("/");
  }
  
  return session;
}
