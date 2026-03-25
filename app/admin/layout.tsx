import { getServerSession } from "@/lib/session";
import Link from "next/link";
import { Clock, LayoutDashboard, FileText, ArrowLeft, ShieldAlert } from "lucide-react";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();
  
  if (!session) {
    redirect("/"); // Must login first
  }

  if (session.email !== process.env.ADMIN_EMAIL) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <ShieldAlert size={64} className="text-red-500 mb-6" />
        <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
        <p className="text-muted-foreground mb-6 max-w-md">
          You are currently logged in as <strong className="text-foreground">{session.email}</strong>, 
          but the system is configured to only allow <strong className="text-foreground">{process.env.ADMIN_EMAIL || "[Not Set]"}</strong>.
        </p>
        <div className="bg-card border border-border rounded-xl p-6 text-left max-w-lg mb-8">
          <p className="text-sm text-muted-foreground mb-2">To fix this, open your <strong className="text-foreground">.env</strong> file and change it to match your session:</p>
          <code className="block bg-muted p-3 rounded-lg text-sm text-violet-500 font-mono mb-4">
            ADMIN_EMAIL={session.email}
          </code>
          <p className="text-sm text-foreground bg-amber-500/10 border border-amber-500/20 p-3 rounded-lg">
            ⚠️ <strong>Important:</strong> You MUST completely restart your terminal (<kbd className="font-mono">Ctrl+C</kbd> then <kbd className="font-mono">npm run dev</kbd>) for Next.js to load the new .env changes!
          </p>
        </div>
        <Link href="/" className="px-6 py-2.5 rounded-lg font-medium bg-foreground text-background hover:bg-foreground/90 transition">
          Return Home
        </Link>
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-border bg-card p-6 flex flex-col gap-6">
        <Link href="/" className="flex items-center gap-2 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500">
            <Clock size={16} className="text-white" />
          </div>
          <span className="text-lg font-bold">Admin Saver</span>
        </Link>

        <nav className="flex flex-col gap-2">
          <Link href="/admin" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted text-foreground">
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
          <Link href="/admin/blogs/new" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted text-muted-foreground hover:text-foreground">
            <FileText size={18} />
            New Post
          </Link>
          <Link href="/admin/feedback" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted text-muted-foreground hover:text-foreground">
            <ShieldAlert size={18} />
            Feedback
          </Link>
          <Link href="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted text-muted-foreground mt-8">
            <ArrowLeft size={18} />
            Back to Site
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-auto">
        {children}
      </main>
    </div>
  );
}
