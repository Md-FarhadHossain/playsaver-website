import { Shield, FileText, Scale, Lock, Info } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata = {
  title: "Terms of Service | PlaySaver",
  description: "Terms of Service for the PlaySaver Chrome Extension",
};

export default function TermsOfService() {
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
             <img src="/logo.svg" alt="PlaySaver Logo" className="h-6 w-6 drop-shadow-sm mx-auto mb-4" />
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground">Terms of Service</h1>
            <p className="mt-4 text-lg text-muted-foreground italic">
              Please read these terms carefully before using the PlaySaver browser extension. By installing or using the service, you agree to be bound by these terms.
            </p>
          </div>

          <div className="space-y-12 text-muted-foreground">
            {/* 1. Acceptance of Terms */}
            <section>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10">
                  <FileText className="text-blue-500" size={16} />
                </div>
                <h2 className="text-2xl font-bold text-foreground">1. Acceptance of Terms</h2>
              </div>
              <p className="leading-relaxed">
                By installing, accessing, or using the <strong>PlaySaver</strong> browser extension ("the Service"), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you do not have permission to access or use the Service.
              </p>
            </section>

            {/* 2. Description of Service */}
            <section>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/10">
                  <Info className="text-cyan-500" size={16} />
                </div>
                <h2 className="text-2xl font-bold text-foreground">2. Description of Service</h2>
              </div>
              <p className="leading-relaxed mb-4">
                PlaySaver is a browser extension designed to track, calculate, and visualize the time you save by watching HTML5 videos (e.g., on YouTube, Udemy, etc.) at increased playback speeds.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>The Service relies on standard web technologies and the structure of third-party websites.</li>
                <li>While we strive for accuracy, we cannot guarantee that time tracking will work flawlessly on every single video player or website on the internet.</li>
                <li>The Service is intended entirely as a personal productivity and motivational tool.</li>
              </ul>
            </section>

            {/* 3. Privacy and Data */}
            <section className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-6">
              <div className="mb-3 flex items-center gap-2">
                <Lock className="text-blue-500" size={20} />
                <h2 className="text-xl font-bold text-foreground">3. Privacy and Data Usage</h2>
              </div>
              <p className="leading-relaxed">
                Your privacy is paramount. By using PlaySaver, you agree to the collection and use of your time-saved statistics as detailed in our <a href="/privacy" className="font-semibold text-blue-500 hover:underline">Privacy Policy</a>. We do not track the content of the videos you watch or your browsing history. Cross-device syncing requires secure authentication via your Google Account.
              </p>
            </section>

            {/* 4. User Conduct */}
            <section>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-500/10">
                  <Shield className="text-teal-500" size={16} />
                </div>
                <h2 className="text-2xl font-bold text-foreground">4. User Conduct</h2>
              </div>
              <p className="mb-4 leading-relaxed">
                You agree to use PlaySaver only for its intended purpose. You must not:
              </p>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-border text-foreground">1</div>
                  <div>Attempt to interfere with, hack, or disrupt the Service's backend infrastructure or database.</div>
                </li>
                <li className="flex gap-3">
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-border text-foreground">2</div>
                  <div>Reverse engineer, decompile, or digitally manipulate the extension code to artificially inflate your statistics on the global leaderboards (if applicable).</div>
                </li>
                <li className="flex gap-3">
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-border text-foreground">3</div>
                  <div>Use the extension for any illegal or unauthorized purpose.</div>
                </li>
              </ul>
            </section>

            {/* 5. Disclaimer of Warranties */}
            <section>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10">
                  <Scale className="text-blue-500" size={16} />
                </div>
                <h2 className="text-2xl font-bold text-foreground">5. Disclaimer of Warranties</h2>
              </div>
              <p className="leading-relaxed">
                The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties, expressed or implied, regarding the reliability, accuracy, or availability of the Service. Because the extension interacts with third-party websites that frequently change their code (like video players), the Service may occasionally break or fail to track time on certain platforms.
              </p>
            </section>

            {/* 6. Limitation of Liability */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-foreground">6. Limitation of Liability</h2>
              <div className="rounded-xl border border-border/50 bg-muted/20 p-6">
                <p className="text-sm leading-relaxed text-foreground">
                  In no event shall PlaySaver or its creators be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; or (iii) unauthorized access, use or alteration of your transmissions or content.
                </p>
              </div>
            </section>

            {/* 7. Changes to Terms */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-foreground">7. Changes to Terms</h2>
              <p className="leading-relaxed">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>
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
             <a href="/privacy" className="transition-colors hover:text-foreground">Privacy</a>
             <a href="/terms" className="transition-colors text-foreground">Terms</a>
             <a href="https://chrome.google.com/webstore" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">Chrome Store</a>
           </div>
        </div>
      </footer>
    </div>
  );
}
