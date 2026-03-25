import { ThemeToggle } from "@/components/theme-toggle";
import { SignInButton } from "@/components/auth/sign-in-button";
import { UserMenu } from "@/components/auth/user-menu";
import { Chrome, Clock, Zap, BarChart3, RefreshCw, Star, Check, ChevronDown } from "lucide-react";
import { SavingsCalculator } from "@/components/savings-calculator";
import { SupportedPlatforms } from "@/components/supported-platforms";

const SPEEDS = [
  { label: "1.25×", color: "from-sky-500 to-cyan-400", timeSaved: "20 min saved per hour", percent: "20%" },
  { label: "1.5×", color: "from-violet-500 to-purple-400", timeSaved: "33 min saved per hour", percent: "33%" },
  { label: "1.75×", color: "from-fuchsia-500 to-pink-400", timeSaved: "43 min saved per hour", percent: "43%" },
  { label: "2×", color: "from-orange-500 to-amber-400", timeSaved: "30 min saved per hour", percent: "50%" },
];

const FEATURES = [
  {
    icon: Clock,
    title: "Real-Time Tracking",
    description: "See your time savings update live as you watch. No manual input required — TimeSaver works silently in the background.",
    gradient: "from-violet-500/20 to-purple-600/5",
    iconColor: "text-violet-400",
  },
  {
    icon: BarChart3,
    title: "Beautiful Stats Dashboard",
    description: "Daily, weekly, and all-time breakdowns of the time you've reclaimed. Clean charts you'll actually enjoy opening.",
    gradient: "from-sky-500/20 to-cyan-600/5",
    iconColor: "text-sky-400",
  },
  {
    icon: RefreshCw,
    title: "Cross-Device Sync",
    description: "Your savings follow you everywhere. Sign in once and your stats sync seamlessly across all your Chrome sessions.",
    gradient: "from-emerald-500/20 to-teal-600/5",
    iconColor: "text-emerald-400",
  },
  {
    icon: Zap,
    title: "Zero Performance Impact",
    description: "Engineered to be feather-light. TimeSaver never slows down your browser or interrupts your viewing experience.",
    gradient: "from-amber-500/20 to-orange-600/5",
    iconColor: "text-amber-400",
  },
];

const FAQS = [
  {
    q: "Which sites does TimeSaver support?",
    a: "TimeSaver works on every single website that has video speed controls! This includes popular platforms where you consume video content like YouTube, Netflix, Prime Video, Udemy, Coursera, Skillshare, MasterClass, Facebook Videos, Vimeo, LinkedIn Learning, and thousands more.",
  },
  {
    q: "Does it work for speeds below 1×?",
    a: "TimeSaver focuses only on speeds above 1× so your savings counter only goes up — never down.",
  },
  {
    q: "Is my data private?",
    a: "Absolutely. Your watch data stays on your device by default. Cloud sync is optional and requires sign-in. We never sell your data.",
  },
  {
    q: "Is TimeSaver free?",
    a: "The core extension is completely free. A Pro plan with extended analytics and priority support is coming soon.",
  },
];

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      {/* ─── Navbar ──────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-2.5" aria-label="TimeSaver Home">
            <img src="/logo.svg" alt="TimeSaver Logo" className="h-8 w-8 drop-shadow-md" />
            <span className="text-lg font-bold tracking-tight text-foreground">
              Time<span className="text-violet-500">Saver</span>
            </span>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
            <a href="#how-it-works" className="transition-colors hover:text-foreground">How it works</a>
            <a href="#features" className="transition-colors hover:text-foreground">Features</a>
            <a href="/blog" className="transition-colors hover:text-foreground">Blog</a>
            <a href="#faq" className="transition-colors hover:text-foreground">FAQ</a>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <UserMenu />
            <SignInButton className="hidden sm:flex" />
            <a
              id="nav-cta"
              href="https://chrome.google.com/webstore"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:scale-105 hover:shadow-violet-500/40 active:scale-95"
            >
              <Chrome size={15} />
              Add to Chrome
            </a>
          </div>
        </div>
      </header>

      <main className="relative isolate bg-background">
        {/* ─── Hero SaaS Background Effect ───────────────────────────── */}
        <div className="absolute inset-x-0 top-0 -z-10 h-full overflow-hidden" aria-hidden="true">
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
          
          {/* Vibrant Glowing Blobs */}
          <div className="absolute -top-[5%] left-1/2 -z-10 h-[400px] w-[500px] -translate-x-1/2 rounded-full bg-violet-600/40 blur-3xl sm:-top-[10%] sm:h-[600px] sm:w-[800px] dark:bg-violet-600/30" />
          <div className="absolute -left-[10%] top-[5%] -z-10 h-[300px] w-[400px] rounded-full bg-sky-500/40 blur-3xl sm:h-[400px] sm:w-[500px] dark:bg-sky-500/30" />
          <div className="absolute -right-[10%] top-[10%] -z-10 h-[350px] w-[400px] rounded-full bg-fuchsia-500/40 blur-3xl sm:h-[450px] sm:w-[500px] dark:bg-fuchsia-500/30" />
        </div>

        {/* ─── Hero ─────────────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-6 pt-24 pb-20 text-center md:pt-36 md:pb-28">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-violet-400">
            <Star size={12} fill="currentColor" /> Now available · Free
          </div>

          <h1 className="mx-auto mt-6 max-w-3xl text-5xl font-extrabold leading-[1.1] tracking-tight text-foreground md:text-7xl">
            Watch smarter.{" "}
            <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
              Reclaim your time.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            TimeSaver tracks exactly how many minutes and hours you&apos;ve reclaimed by watching videos at{" "}
            <span className="font-semibold text-foreground">1.25×, 1.5×, 1.75× or 2×</span> speed.
            One glance and you&apos;ll know your time is working for you.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              id="hero-cta"
              href="https://chrome.google.com/webstore"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-8 py-4 text-base font-bold text-white shadow-xl shadow-violet-500/30 transition-all duration-200 hover:scale-105 hover:shadow-violet-500/50 active:scale-95"
            >
              <Chrome size={20} />
              Add to Chrome — It&apos;s Free
            </a>
            <a
              href="#how-it-works"
              className="flex items-center gap-2 rounded-full border border-border bg-background px-8 py-4 text-base font-semibold text-foreground transition-all duration-200 hover:bg-muted active:scale-95"
            >
              See how it works
              <ChevronDown size={16} />
            </a>
          </div>

          {/* Faux review strip */}
          <div className="mt-12 flex flex-col items-center gap-1 text-sm text-muted-foreground">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} fill="currentColor" className="text-amber-400" />
              ))}
            </div>
            <span>Loved by <strong className="text-foreground">2,400+</strong> productivity-focused users</span>
          </div>
        </section>

        <SupportedPlatforms />

        {/* ─── Speed Cards / How it Works ────────────────────────── */}
        <section id="how-it-works" className="bg-muted/30 border-y border-border/50 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-14 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Your speed, your savings
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                Every time you bump up the playback speed, TimeSaver silently calculates and accumulates
                the exact time you&apos;ve freed up.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {SPEEDS.map((s) => (
                <div
                  key={s.label}
                  className="group relative overflow-hidden rounded-2xl border border-border/60 bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* top gradient bar */}
                  <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${s.color}`} />

                  <div className={`mb-4 inline-flex items-center justify-center rounded-xl bg-gradient-to-br ${s.color} p-3 text-3xl font-extrabold text-white shadow-md`}>
                    {s.label}
                  </div>

                  <p className="text-xl font-bold text-foreground">{s.timeSaved}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{s.percent} freed from every video</p>

                  {/* progress bar */}
                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${s.color} transition-all duration-700`}
                      style={{ width: s.percent }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* The math explained */}
            <div className="mt-14 mx-auto max-w-2xl rounded-2xl border border-violet-400/20 bg-violet-500/5 p-6 text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-violet-400">Simple maths, big results</p>
              <p className="mt-3 text-4xl font-extrabold text-foreground">
                1 hr at 1.5× = <span className="text-violet-500">20 min saved</span>
              </p>
              <p className="mt-2 text-muted-foreground">
                Watch 4 hours of YouTube this week at 1.5× and you&apos;ve saved{" "}
                <strong className="text-foreground">1 hour 20 minutes</strong> — back in your pocket.
              </p>
            </div>

            <SavingsCalculator />
          </div>
        </section>

        {/* ─── Features ──────────────────────────────────────────── */}
        <section id="features" className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-14 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Everything you need, nothing you don&apos;t
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                TimeSaver is laser-focused on one job: showing you how much time you save.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {FEATURES.map((f) => (
                <div
                  key={f.title}
                  className={`group relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br ${f.gradient} p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-border`}
                >
                  <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-background/60 backdrop-blur-sm`}>
                    <f.icon size={22} className={f.iconColor} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{f.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Social Proof / Stats ──────────────────────────────── */}
        <section className="border-y border-border/50 bg-muted/30 py-16">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 text-center md:grid-cols-4">
            {[
              { value: "2,400+", label: "Active users" },
              { value: "340k+", label: "Hours saved" },
              { value: "4.9★", label: "Chrome rating" },
              { value: "100%", label: "Free forever" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-extrabold text-foreground md:text-4xl">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Testimonials ──────────────────────────────────────── */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              What people are saying
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                {
                  name: "Sarah M.",
                  handle: "@sarahlearns",
                  text: "I watch all my Udemy courses at 1.75× and after a month TimeSaver told me I'd saved 6+ hours. Insane!",
                  avatar: "SM",
                  color: "from-violet-500 to-fuchsia-500",
                },
                {
                  name: "James K.",
                  handle: "@jkode",
                  text: "Such a simple idea but it genuinely motivates me to watch at faster speeds because I can see the time piling up.",
                  avatar: "JK",
                  color: "from-sky-500 to-cyan-400",
                },
                {
                  name: "Priya R.",
                  handle: "@priyatech",
                  text: "The UI is beautiful and it's the only extension I've kept enabled permanently. Lightweight and smart.",
                  avatar: "PR",
                  color: "from-emerald-500 to-teal-400",
                },
              ].map((t) => (
                <div
                  key={t.name}
                  className="rounded-2xl border border-border/60 bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="mb-4 flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={13} fill="currentColor" className="text-amber-400" />
                    ))}
                  </div>
                  <p className="leading-relaxed text-muted-foreground">&ldquo;{t.text}&rdquo;</p>
                  <div className="mt-5 flex items-center gap-3">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${t.color} text-xs font-bold text-white`}>
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.handle}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FAQ ───────────────────────────────────────────────── */}
        <section id="faq" className="border-t border-border/50 bg-muted/30 py-20">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Frequently asked questions
            </h2>
            <div className="space-y-4">
              {FAQS.map((faq) => (
                <div key={faq.q} className="rounded-xl border border-border/60 bg-background p-6">
                  <p className="font-semibold text-foreground">{faq.q}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Final CTA ─────────────────────────────────────────── */}
        <section className="py-24">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-600 p-12 shadow-2xl shadow-violet-500/30">
              {/* decorative circles */}
              <div aria-hidden className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
              <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />

              <h2 className="relative text-3xl font-extrabold text-white md:text-5xl">
                Start saving time today
              </h2>
              <p className="relative mx-auto mt-4 max-w-lg text-white/80">
                Install TimeSaver in seconds and watch your reclaimed hours grow with every video you watch.
              </p>

              <div className="relative mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <a
                  id="bottom-cta"
                  href="https://chrome.google.com/webstore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-base font-bold text-violet-700 shadow-xl transition-all duration-200 hover:scale-105 hover:shadow-2xl active:scale-95"
                >
                  <Chrome size={20} />
                  Add to Chrome — Free
                </a>
              </div>

              <p className="relative mt-5 text-sm text-white/60">
                No account required · No credit card · Works instantly
              </p>

              <div className="relative mt-4 flex items-center justify-center gap-4 text-sm text-white/70">
                {["Real-time tracking", "Dark & Light mode", "Privacy first"].map((tag) => (
                  <span key={tag} className="flex items-center gap-1">
                    <Check size={13} className="text-white/90" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ─── Footer ───────────────────────────────────────────── */}
      <footer className="border-t border-border/50 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground md:flex-row">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="TimeSaver Logo" className="h-6 w-6 drop-shadow-sm" />
            <span className="font-semibold text-foreground">TimeSaver</span>
            <span>— Watch smarter.</span>
          </div>
          <p>© {new Date().getFullYear()} TimeSaver. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="/privacy" className="transition-colors hover:text-foreground">Privacy</a>
            <a href="#" className="transition-colors hover:text-foreground">Terms</a>
            <a href="https://chrome.google.com/webstore" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">Chrome Store</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
