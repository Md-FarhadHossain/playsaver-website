import { Clock, Shield, Globe, Lock, Check } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata = {
  title: "Privacy Policy | PlaySaver",
  description: "Privacy Policy for the PlaySaver Chrome Extension",
};

export default function PrivacyPolicy() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      {/* ─── Navbar ──────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-2.5" aria-label="PlaySaver Home">
            <img src="/logo.svg" alt="PlaySaver Logo" className="h-8 w-8 drop-shadow-md" />
            <span className="text-lg font-bold tracking-tight text-foreground">
              Play<span className="text-blue-500">Saver</span>
            </span>
          </a>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href="/"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Back to Home
            </a>
          </div>
        </div>
      </header>

      <main className="relative isolate flex-1 bg-background px-6 py-16 md:py-24">
        {/* Background Effect */}
        <div className="absolute inset-x-0 top-0 -z-10 h-full overflow-hidden" aria-hidden="true">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
          <div className="absolute -top-[5%] left-1/2 -z-10 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl" />
        </div>

        <div className="mx-auto max-w-3xl rounded-2xl border border-border/60 bg-background p-8 shadow-sm md:p-12">
          <div className="mb-10 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
              <Shield size={32} className="text-blue-500" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground">Privacy Policy</h1>
            <p className="mt-4 text-lg text-muted-foreground italic">
              "Turn up the speed, track the time you save. The ultimate watch-time productivity scoreboard for YouTube, Udemy, and beyond."
            </p>
          </div>

          <div className="space-y-12 text-muted-foreground">
            {/* 1. What problem does it solve? */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-foreground">1. What problem does the extension solve?</h2>
              <div className="space-y-4">
                <p>
                  <strong className="text-foreground">The Problem:</strong> We all watch hours of video content every day (lectures, tutorials, entertainment) and many of us speed up the videos to save time. But nobody actually knows <em>how much</em> time they are getting back. It feels productive, but there's no proof or motivation.
                </p>
                <p>
                  <strong className="text-foreground">The Solution:</strong> This extension acts as a personal scoreboard for your time. It silently runs in the background on any site (YouTube, Udemy, Twitter, etc.) and precisely tallies every second you save by speeding up videos, turning a passive habit into a satisfying, measurable productivity metric.
                </p>
              </div>
            </section>

            {/* 2. Core Features */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-foreground">2. Core Features</h2>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
                    <Check size={14} />
                  </div>
                  <div>
                    <strong className="text-foreground">Works Everywhere:</strong> It detects HTML5 videos automatically, so it tracks your saved time whether you are studying on Udemy, scrolling Facebook, or watching YouTube. <span className="inline-flex items-center rounded bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground border border-border">✅ Works on websites that contain HTML5 video players</span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-500/10 text-sky-500">
                    <Check size={14} />
                  </div>
                  <div>
                    <strong className="text-foreground">Instant Gratification:</strong> Whenever you speed up a video, a tiny non-intrusive pop-up shows you exactly how much time you've banked during that session.
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                    <Check size={14} />
                  </div>
                  <div>
                    <strong className="text-foreground">Cross-Device Syncing:</strong> You can log in with Google, and it will safely sync your lifetime "saved time" stats across all your computers and browsers so you never lose your progress.
                  </div>
                </li>
              </ul>
            </section>

            {/* 3. The <all_urls> Permission */}
            <section className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-6">
              <div className="mb-3 flex items-center gap-2">
                <Globe className="text-blue-500" size={20} />
                <h2 className="text-xl font-bold text-foreground">Why we need the &lt;all_urls&gt; Permission</h2>
              </div>
              <p className="leading-relaxed">
                This extension detects HTML5 video elements on any website (YouTube, Udemy, Facebook, Twitter, etc.) to track time saved from watching videos at higher speeds. The <code>&lt;all_urls&gt;</code> permission is required because video content exists across many different domains, and we need to automatically bind our tracker to video players no matter where you browse.
              </p>
            </section>

            {/* 4. Data Collection & Privacy */}
            <section>
              <div className="mb-4 flex items-center gap-2">
                <Lock className="text-foreground" size={24} />
                <h2 className="text-2xl font-bold text-foreground">Data Collection and Usage</h2>
              </div>
              <p className="mb-4">
                We believe in keeping things simple and private. Since PlaySaver acts as a productivity tool that crosses your devices, here is what you need to know about your data:
              </p>
              <div className="space-y-4 rounded-xl border border-border/50 bg-muted/20 p-6">
                <div>
                  <h3 className="font-semibold text-foreground">What we collect</h3>
                  <p className="mt-1 text-sm">We strictly only collect the total numerical amount of time you have saved by watching videos at increased speeds. <strong className="text-foreground">We DO NOT track your browsing history, which specific videos you watch, or any other personal behavior data.</strong></p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Google Account Syncing</h3>
                  <p className="mt-1 text-sm">When you choose to securely log in with your Google account, your accumulated "saved time" statistics are synced. This is so you can maintain a unified productivity scoreboard across all your devices and browsers.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">How your data is used</h3>
                  <p className="mt-1 text-sm">Your data is strictly used to power your own PlaySaver dashboard and display your personal stats. We never sell, trade, or share your information with any third parties.</p>
                </div>
              </div>
            </section>

            {/* 5. In-Video Pop-Up Notification */}
            <section>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500/20 to-cyan-500/20">
                  <span className="text-base">💬</span>
                </div>
                <h2 className="text-2xl font-bold text-foreground">In-Video Time-Saved Pop-Up</h2>
              </div>
              <p className="mb-5 leading-relaxed">
                While you watch a video, PlaySaver optionally displays a small, non-intrusive overlay in the corner of the video player  showing exactly how many minutes and seconds you have saved so far in that session (e.g. <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono border border-border">+2m 28s saved</code>).
              </p>
              <div className="space-y-3 rounded-xl border border-border/50 bg-muted/20 p-6">
                <h3 className="font-semibold text-foreground">Display Mode Options</h3>
                <p className="text-sm">You can control exactly when this pop-up appears. There are three modes:</p>
                <ul className="mt-3 space-y-3 text-sm">
                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-xs font-bold text-blue-500">1</span>
                    <div>
                      <strong className="text-foreground">Always On</strong> — The pop-up stays visible and continuously updates in real time as time is being saved while you watch. Great for staying motivated throughout long videos.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-500/15 text-xs font-bold text-sky-500">2</span>
                    <div>
                      <strong className="text-foreground">Middle &amp; End</strong> — The pop-up appears twice: once at the midpoint of the video and once when the video finishes. This gives you a quick check-in without constantly being on screen.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-xs font-bold text-emerald-500">3</span>
                    <div>
                      <strong className="text-foreground">Hidden</strong> — The pop-up is fully disabled and will never appear on screen. Choose this if you prefer a completely distraction-free viewing experience.
                    </div>
                  </li>
                </ul>
              </div>
              <div className="mt-4 rounded-xl border border-teal-500/20 bg-teal-500/5 p-4">
                <p className="text-sm leading-relaxed">
                  <strong className="text-foreground">Why does this pop-up exist?</strong> The sole purpose of this feature is motivational. By showing you a live, tangible reward (the time you are getting back), it actively encourages you to keep your video speed up and build a productive viewing habit. It contains no ads, no tracking pixels, and does not communicate with any external service — it is purely a visual display of your locally computed savings.
                </p>
              </div>
            </section>

          </div>
        </div>
      </main>

      {/* ─── Footer ───────────────────────────────────────────── */}
      <footer className="border-t border-border/50 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground md:flex-row">
           <div className="flex items-center gap-2">
             <img src="/logo.svg" alt="PlaySaver Logo" className="h-6 w-6 drop-shadow-sm" />
             <span className="font-semibold text-foreground">PlaySaver</span>
             <span>— Watch smarter.</span>
           </div>
           <p>© {new Date().getFullYear()} PlaySaver. All rights reserved.</p>
           <div className="flex gap-6">
             <a href="/privacy" className="transition-colors text-foreground">Privacy</a>
             <a href="#" className="transition-colors hover:text-foreground">Terms</a>
             <a href="https://chrome.google.com/webstore" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">Chrome Store</a>
           </div>
        </div>
      </footer>
    </div>
  );
}
