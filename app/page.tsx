import { ThemeToggle } from "@/components/theme-toggle";
import { SignInButton } from "@/components/auth/sign-in-button";
import { UserMenu } from "@/components/auth/user-menu";
import { Chrome, Clock, Zap, BarChart3, RefreshCw, Star, ArrowRight, Terminal } from "lucide-react";
import { SavingsCalculator } from "@/components/savings-calculator";
import { SupportedPlatforms } from "@/components/supported-platforms";

const SPEEDS = [
  { label: "1.25×", bg: "bg-primary text-foreground", timeSaved: "20 min saved per hour", percent: "20%" },
  { label: "1.5×", bg: "bg-accent text-foreground", timeSaved: "33 min saved per hour", percent: "33%" },
  { label: "1.75×", bg: "bg-secondary text-foreground", timeSaved: "43 min saved per hour", percent: "43%" },
  { label: "2×", bg: "bg-card text-foreground", timeSaved: "30 min saved per hour", percent: "50%" },
];

const FEATURES = [
  {
    icon: Clock,
    title: "REAL-TIME TRACKING",
    description: "See your time savings update live as you watch. No manual input required. <STATUS: AUTOMATED_SYNC>",
    bg: "bg-primary text-foreground",
  },
  {
    icon: BarChart3,
    title: "DATA DASHBOARD",
    description: "Daily, weekly, and all-time breakdowns. Clean charts to satisfy your analytic dopamine loops.",
    bg: "bg-accent text-foreground",
  },
  {
    icon: RefreshCw,
    title: "CROSS-DEVICE SYNC",
    description: "Savings follow you everywhere. Sign in once and stats sync immediately on all Chrome instances.",
    bg: "bg-secondary text-foreground",
  },
  {
    icon: Zap,
    title: "ZERO IMPACT",
    description: "Feather-light operations. PlaySaver never drops frames or slows down your stream. <CPU_LOAD: 0.1%>",
    bg: "bg-card text-foreground",
  },
];

const FAQS = [
  {
    q: "Which sites does PlaySaver support?",
    a: "PlaySaver works on every single website with video speed controls. YouTube, Netflix, Prime, Udemy, Coursera, Vimeo, etc. If it has a video tag, we track it.",
  },
  {
    q: "Does it work for speeds below 1×?",
    a: "Negative. PlaySaver focuses exclusively on speeds above 1× so your counter only increments. Time flows forward.",
  },
  {
    q: "Is my data private?",
    a: "Affirmative. Watch data remains local by default. Cloud sync is elective. We do not sell data packages.",
  },
  {
    q: "Is PlaySaver free?",
    a: "The core extension is 100% free. Pro upgrades for extended telemetry data coming soon.",
  },
];

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden selection:bg-primary selection:text-foreground">
      {/* ─── Navbar ──────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 brutal-border border-x-0 border-t-0 bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <a href="#" className="flex items-center gap-3 brutal-border p-1 bg-card hover:bg-primary transition-colors" aria-label="PlaySaver Home">
            <span className="bg-foreground text-background font-black px-2 py-1 uppercase text-sm font-ai">PS_</span>
            <span className="text-xl font-black uppercase tracking-tighter pr-2">
              PlaySaver
            </span>
          </a>
          <nav className="hidden items-center gap-8 font-black uppercase tracking-widest text-foreground md:flex">
            <a href="#how-it-works" className="hover:text-primary transition-colors hover:underline decoration-foreground decoration-4 underline-offset-4">How it works</a>
            <a href="#features" className="hover:text-accent transition-colors hover:underline decoration-foreground decoration-4 underline-offset-4">Features</a>
            <a href="#faq" className="hover:text-secondary transition-colors hover:underline decoration-foreground decoration-4 underline-offset-4">FAQ</a>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <UserMenu />
            <SignInButton className="hidden sm:flex brutal-button bg-card px-4 py-2" />
            <a
              id="nav-cta"
              href="https://chrome.google.com/webstore"
              target="_blank"
              rel="noopener noreferrer"
              className="brutal-button items-center gap-2 bg-primary px-5 py-2.5 text-sm hidden lg:flex hover:bg-secondary transition-colors text-foreground"
            >
              <Chrome size={16} strokeWidth={3} className="text-foreground" />
              INSTALL_NOW
            </a>
          </div>
        </div>
      </header>

      <main className="relative isolate bg-background">
        {/* ─── Abstract Brutalist Background ───────────────────── */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--color-border)_2px,transparent_2px),linear-gradient(to_bottom,var(--color-border)_2px,transparent_2px)] bg-[size:60px_60px] opacity-[0.2] dark:opacity-[0.1]" aria-hidden="true" />
        
        {/* Striped warning tape left/right */}
        <div className="absolute left-0 top-0 bottom-0 w-2 md:w-4 bg-[repeating-linear-gradient(45deg,var(--color-primary),var(--color-primary)_10px,var(--color-foreground)_10px,var(--color-foreground)_20px)] border-r-4 border-foreground z-20" />
        <div className="absolute right-0 top-0 bottom-0 w-2 md:w-4 bg-[repeating-linear-gradient(-45deg,var(--color-primary),var(--color-primary)_10px,var(--color-foreground)_10px,var(--color-foreground)_20px)] border-l-4 border-foreground z-20" />

        {/* ─── Hero ─────────────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-8 pt-20 pb-24 text-center md:pt-32 md:pb-32 relative">
          
          <div className="inline-flex items-center gap-2 brutal-border bg-accent px-4 py-1.5 text-sm font-black uppercase tracking-widest text-foreground brutal-shadow mb-8 origin-left -rotate-2">
            <Terminal size={16} strokeWidth={3} /> V.1.0 // ONLINE
          </div>

          <h1 className="mx-auto max-w-4xl text-6xl font-black uppercase leading-[0.95] tracking-tighter text-foreground md:text-8xl lg:text-[10rem] break-words">
            WATCH <br className="hidden md:block"/> SMARTER
          </h1>
          
          <div className="mt-8 flex justify-center">
            <span className="brutal-border bg-secondary text-foreground text-3xl md:text-5xl lg:text-7xl font-black uppercase px-6 py-2 brutal-shadow rotate-1 transform-gpu">
              RECLAIM TIME
            </span>
          </div>

          <p className="mx-auto mt-12 max-w-3xl text-xl font-bold uppercase leading-relaxed text-foreground md:text-2xl border-y-4 border-foreground py-6 bg-card px-4 brutal-shadow">
            PlaySaver tracks exactly how many minutes you save by watching at 
            <span className="bg-primary px-2 mx-2 border-2 border-foreground shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff]">1.25×</span>
            <span className="bg-accent px-2 mx-2 border-2 border-foreground shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff]">1.5×</span>
            <span className="bg-secondary px-2 mx-2 border-2 border-foreground shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff]">2×</span>.
            <br/>
            Your time is an asset.
          </p>

          <div className="mt-14 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <a
              id="hero-cta"
              href="https://chrome.google.com/webstore"
              target="_blank"
              rel="noopener noreferrer"
              className="brutal-button flex w-full sm:w-auto items-center justify-center gap-3 bg-primary px-10 py-5 text-xl hover:bg-secondary text-foreground transition-colors"
            >
              <Chrome size={28} strokeWidth={2.5} className="text-foreground" />
              <span>ACQUIRE <span className="underline decoration-4 underline-offset-4">EXTENSION</span></span>
            </a>
            <a
              href="#how-it-works"
              className="brutal-button flex w-full sm:w-auto items-center justify-center gap-2 bg-card px-8 py-5 text-xl group hover:bg-foreground hover:text-background transition-colors text-foreground"
            >
              VIEW_DOCS
              <ArrowRight size={24} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Faux review data */}
          <div className="mt-16 inline-flex flex-col items-center gap-2 brutal-border bg-background p-4 mx-auto font-ai text-sm font-bold shadow-[8px_8px_0px_var(--color-foreground)]">
            <div className="flex gap-1 border-b-2 border-foreground pb-2 w-full justify-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} className="fill-foreground text-foreground" />
              ))}
            </div>
            <span className="uppercase tracking-widest pt-1 bg-primary text-foreground px-2">DATA: 2,400+ ACTIVE USERS // RATING: 4.9</span>
          </div>
        </section>

        <SupportedPlatforms />

        {/* ─── Speed Cards / How it Works ────────────────────────── */}
        <section id="how-it-works" className="border-y-4 border-foreground py-20 bg-[linear-gradient(to_right,var(--color-muted)_2px,transparent_2px),linear-gradient(to_bottom,var(--color-muted)_2px,transparent_2px)] bg-[size:24px_24px]">
          <div className="mx-auto max-w-7xl px-8">
            <div className="mb-16 brutal-border bg-background p-8 brutal-shadow inline-block">
              <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter text-foreground mb-4">
                SPEED = SAVINGS
              </h2>
              <p className="max-w-xl text-xl font-bold uppercase font-ai text-foreground">
                <span className="text-primary mr-2">{'>'}</span> System calculates delta between raw video length and accelerated playback duration.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {SPEEDS.map((s, idx) => (
                <div
                  key={s.label}
                  className={`brutal-card ${s.bg} transform-gpu hover:-translate-y-2 transition-transform duration-200 ${idx % 2 === 0 ? '-rotate-1' : 'rotate-1'}`}
                >
                  <div className="flex justify-between items-start mb-6 border-b-4 border-foreground pb-4">
                    <span className="font-ai text-sm font-black tracking-widest uppercase bg-background text-foreground px-2 py-0.5 border-2 border-foreground">
                      MUX: {s.label}
                    </span>
                    <Terminal size={20} strokeWidth={3} className="text-foreground" />
                  </div>
                  
                  <div className="text-6xl font-black uppercase tracking-tighter mb-4 h-16 text-foreground">
                    {s.label}
                  </div>

                  <p className="text-lg font-bold uppercase mb-2 h-14 flex items-center leading-tight border-t-2 border-foreground border-dashed pt-2 text-foreground">
                    {s.timeSaved}
                  </p>
                  
                  {/* Hard progress bar */}
                  <div className="mt-4 h-8 border-4 border-foreground bg-background relative overflow-hidden group">
                    <div
                      className="absolute left-0 top-0 bottom-0 bg-foreground group-hover:bg-accent transition-colors"
                      style={{ width: s.percent }}
                    />
                    <div className="absolute inset-0 flex items-center px-3 text-xs font-black font-ai mix-blend-difference text-white">
                      {s.percent} CAPACITY
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* The math explained */}
            <div className="mt-20 mx-auto max-w-3xl brutal-border bg-primary p-8 text-center brutal-shadow transform-gpu rotate-1">
              <p className="text-sm font-black uppercase tracking-widest font-ai mb-4 border-b-4 border-foreground pb-2 inline-flex items-center gap-2 bg-background px-4 text-foreground">
                <Zap size={14} className="fill-foreground text-foreground" /> ALGORITHM.EXE
              </p>
              <p className="mt-6 text-4xl md:text-5xl font-black uppercase text-foreground leading-[1.3]">
                1 HR @ <span className="bg-background border-4 border-foreground px-3 mx-1 shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#fff]">1.5×</span> = <br/>
                <span className="text-background bg-foreground px-4 mt-4 inline-block transform-gpu -rotate-1 border-4 border-background">20 MIN RECLAIMED</span>
              </p>
            </div>

            <div className="mt-20 filter drop-shadow-[8px_8px_0px_var(--color-foreground)] bg-card border-4 border-foreground">
              <SavingsCalculator />
            </div>
          </div>
        </section>

        {/* ─── Features ──────────────────────────────────────────── */}
        <section id="features" className="py-24 relative overflow-hidden bg-background">
          {/* Abstract graphic */}
          <div className="absolute top-20 right-[-10%] opacity-10 dark:opacity-5 hidden lg:block select-none pointer-events-none">
            <h1 className="text-[20rem] font-black uppercase leading-none transform-gpu -rotate-12">+TIME</h1>
          </div>

          <div className="mx-auto max-w-7xl px-8 relative z-10">
            <div className="mb-16 inline-block brutal-border bg-accent p-6 brutal-shadow text-foreground">
              <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter mb-2">
                SYSTEM SPECS
              </h2>
              <p className="text-xl font-bold uppercase font-ai">
                <span className="text-background mr-2">{'>'}</span> Optimized for maximal efficiency.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {FEATURES.map((f, i) => (
                <div
                  key={f.title}
                  className={`brutal-card ${f.bg} flex flex-col hover:-translate-y-2 transition-transform duration-300 relative`}
                >
                  <div className="absolute -top-4 -right-4 bg-background border-4 border-foreground text-foreground font-ai font-black w-12 h-12 flex items-center justify-center text-xl z-10">
                    0{i + 1}
                  </div>
                  <div className="flex justify-between border-b-4 border-foreground pb-4 mb-6">
                    <div className="brutal-border bg-background p-3 brutal-shadow">
                      <f.icon size={36} strokeWidth={2.5} className="text-foreground" />
                    </div>
                  </div>
                  <h3 className="text-4xl font-black uppercase tracking-tighter mb-4">{f.title}</h3>
                  <p className="text-xl font-bold font-ai leading-relaxed flex-grow opacity-90 border-t-2 border-foreground border-dashed pt-4">
                    {f.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Extension Visuals Split Section ────────────── */}
        <section className="border-y-4 border-foreground">
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y-4 divide-foreground lg:divide-y-0 lg:divide-x-4">
            {/* Left side info */}
            <div className="bg-secondary text-foreground p-8 lg:p-16 flex flex-col justify-center">
              <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
                LIVE TARGET ACQUISITION
              </h2>
              <div className="p-8 bg-background brutal-border text-foreground text-2xl font-bold font-ai leading-relaxed brutal-shadow rotate-1 transform-gpu">
                <p><span className="text-primary">{'>'}</span> Extension embeds seamlessly into YouTube DOM.</p>
                <div className="w-full h-1 bg-foreground my-4 opacity-20" />
                <p><span className="text-primary">{'>'}</span> Overlay injects via ShadowDOM to prevent CSS conflicts.</p>
                <div className="w-full h-1 bg-foreground my-4 opacity-20" />
                <p className="text-background bg-foreground px-4 py-2 inline-block shadow-[4px_4px_0px_var(--color-primary)]">Displays savings in real-time.</p>
              </div>
            </div>
            
            {/* Right side image placeholder / UI mock */}
            <div className="p-8 lg:p-16 bg-[repeating-linear-gradient(45deg,var(--color-muted),var(--color-muted)_10px,var(--color-background)_10px,var(--color-background)_20px)] flex items-center justify-center min-h-[400px]">
              <div className="brutal-border bg-card brutal-shadow max-w-lg w-full relative group">
                {/* Fake browser header */}
                <div className="border-b-4 border-foreground p-4 flex gap-2 bg-muted items-center">
                  <div className="w-4 h-4 bg-foreground rounded-none border-2 border-background" />
                  <div className="w-4 h-4 bg-foreground rounded-none border-2 border-background" />
                  <div className="w-4 h-4 bg-foreground rounded-none border-2 border-background" />
                  <div className="ml-4 font-ai text-sm font-black bg-background border-2 border-foreground px-4 py-1 flex-1 text-foreground overflow-hidden whitespace-nowrap text-ellipsis">
                    youtube.com/watch?v=brutal
                  </div>
                </div>
                {/* Fake video body */}
                <div className="aspect-video bg-background relative flex items-center justify-center p-4">
                  {/* Video skeleton */}
                  <div className="absolute inset-4 border-4 border-dashed border-foreground opacity-30 flex items-center justify-center">
                    <div className="w-24 h-24 bg-foreground flex items-center justify-center pl-2 brutal-shadow">
                      <div className="w-0 h-0 border-t-[15px] border-l-[30px] border-b-[15px] border-t-transparent border-l-background border-b-transparent" />
                    </div>
                  </div>
                  {/* Brutal Overlay popup */}
                  <div className="absolute top-6 left-6 brutal-border bg-primary px-4 py-2 font-black font-ai text-2xl z-10 text-foreground inline-flex shadow-[6px_6px_0px_#000] dark:shadow-[6px_6px_0px_#fff] group-hover:scale-105 transition-transform">
                    <Zap className="mr-2 fill-foreground" size={28} /> +3M 43S
                  </div>
                  <div className="absolute bottom-6 right-6 font-ai bg-accent text-foreground border-4 border-foreground px-3 py-1 font-black z-10 text-2xl shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#fff]">
                    1.5×
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Social Proof / Stats ──────────────────────────────── */}
        <section className="bg-foreground py-16 text-background overflow-hidden relative">
           <div className="flex w-[300%] animate-marquee gap-8 items-center border-y-4 border-background py-4 mb-16 opacity-70 font-ai uppercase text-3xl font-black">
              <span>// 340K+ HOURS RECLAIMED</span>
              <Star className="fill-background" size={24} />
              <span>// NO TRACKING PIXELS</span>
              <Star className="fill-background" size={24} />
              <span>// ZERO SUBSCRIPTION FEES</span>
              <Star className="fill-background" size={24} />
              <span>// OPEN SOURCED EXTENSION</span>
              <Star className="fill-background" size={24} />
              <span>// 340K+ HOURS RECLAIMED</span>
           </div>

          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-8 text-center md:grid-cols-4 relative z-10">
            {[
              { value: "2,400+", label: "ACTIVE AGENTS" },
              { value: "340k+", label: "HOURS LOGGED" },
              { value: "4.9★", label: "CHROME INDEX" },
              { value: "100%", label: "COST TO USE" },
            ].map((stat, i) => (
              <div key={stat.label} className="border-l-8 border-background pl-6 text-left group">
                <p className="text-5xl lg:text-6xl font-black mb-4 group-hover:text-primary transition-colors">{stat.value}</p>
                <p className="text-sm font-ai font-black uppercase bg-background text-foreground inline-block px-3 py-1 brutal-border border-background group-hover:bg-primary group-hover:border-primary transition-colors">
                  SYS_{i}: {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Testimonials ──────────────────────────────────────── */}
        <section className="py-24 bg-background">
          <div className="mx-auto max-w-7xl px-8">
            <h2 className="mb-12 inline-block bg-foreground text-background px-8 py-4 text-5xl lg:text-7xl font-black uppercase brutal-shadow translate-y-[-20%] drop-shadow-[8px_8px_0px_var(--color-primary)]">
              USER LOGS
            </h2>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3 mt-8">
              {[
                { name: "SARAH_M", text: "Watched entire Udemy catalog at 1.75×. Net +6 hours this month. Absurd roi." },
                { name: "JAMES_CODE", text: "Brilliant UI. Seeing the numbers climb is highly gamified. Fully integrated into my workflow." },
                { name: "PRIYA_TECH", text: "No bloat, just data. The aesthetic is loud but the performance footprint is zero." },
              ].map((t, i) => (
                <div key={t.name} className="brutal-card bg-card flex flex-col relative pt-12 transform-gpu hover:-rotate-2 transition-transform duration-300">
                  <div className="absolute top-2 right-4 text-8xl font-serif leading-none italic opacity-10 text-foreground">"</div>
                  <div className="absolute -top-6 -left-6 bg-primary text-foreground brutal-border px-4 py-2 font-ai text-sm font-black shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#fff]">
                    LOG_0{i+1}
                  </div>
                  <div className="flex gap-2 mb-6 bg-background inline-flex brutal-border px-3 py-2 w-fit">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star key={idx} size={20} className="fill-foreground text-foreground" />
                    ))}
                  </div>
                  <p className="text-2xl font-bold uppercase flex-grow leading-tight mb-8">
                    {t.text}
                  </p>
                  <div className="border-t-4 border-foreground pt-6 mt-auto">
                    <p className="text-xl font-black uppercase bg-accent text-foreground inline-block px-4 py-2 border-2 border-foreground">{t.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FAQ ───────────────────────────────────────────────── */}
        <section id="faq" className="border-y-4 border-foreground py-24 bg-muted">
          <div className="mx-auto max-w-3xl px-8">
            <h2 className="mb-16 text-center">
              <span className="text-5xl lg:text-7xl font-black uppercase text-foreground bg-primary px-6 py-2 inline-block border-4 border-foreground shadow-[8px_8px_0px_#000] dark:shadow-[8px_8px_0px_#fff] -rotate-1">
                QUERY DATABASE
              </span>
            </h2>
            <div className="space-y-8">
              {FAQS.map((faq, idx) => (
                <div key={idx} className="brutal-border bg-card brutal-shadow p-8 group hover:-translate-y-1 transition-transform bg-background">
                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    <span className="font-ai text-3xl font-black text-primary bg-foreground px-3 py-1">Q{idx+1}_</span>
                    <div>
                      <p className="text-2xl font-black uppercase mb-4 text-foreground">{faq.q}</p>
                      <p className="text-lg font-bold font-ai bg-card border-l-8 border-accent p-4 text-foreground opacity-90">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Final CTA ─────────────────────────────────────────── */}
        <section className="py-32 bg-[radial-gradient(var(--color-border)_3px,transparent_3px)] bg-[size:40px_40px] bg-background">
          <div className="mx-auto max-w-5xl px-8 text-center relative">
            
            {/* Decoration squares */}
            <div className="absolute top-0 right-10 w-20 h-20 bg-accent brutal-border z-0 shadow-[8px_8px_0px_#000] dark:shadow-[8px_8px_0px_#fff] rotate-12" />
            <div className="absolute bottom-10 left-10 w-16 h-16 bg-secondary brutal-border z-0 shadow-[8px_8px_0px_#000] dark:shadow-[8px_8px_0px_#fff] -rotate-12" />

            <div className="brutal-border bg-primary brutal-shadow p-12 lg:p-24 relative z-10 text-foreground transform-gpu -rotate-1">
              
              <div className="inline-flex items-center gap-3 bg-background border-4 border-foreground px-6 py-2 mb-10 font-ai font-black uppercase text-lg shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#fff]">
                <div className="w-4 h-4 bg-secondary border-2 border-foreground rounded-full animate-pulse" />
                SYSTEM READY FOR DEPLOYMENT
              </div>

              <h2 className="text-6xl lg:text-8xl font-black uppercase tracking-tighter mb-8 leading-none">
                EXECUTE FILE
              </h2>
              <p className="mx-auto max-w-2xl text-3xl font-bold uppercase mb-14 bg-foreground text-background py-2">
                Initiliaze PlaySaver directly via Chrome Web Store.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <a
                  href="https://chrome.google.com/webstore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brutal-button items-center justify-center gap-4 bg-secondary px-12 py-8 text-3xl hover:bg-foreground hover:text-background inline-flex text-foreground group"
                >
                  <Chrome size={36} strokeWidth={2.5} className="group-hover:text-background" />
                  INSTALL NOW <span className="font-ai text-xl bg-background text-foreground px-3 py-1 ml-2 border-2 border-foreground group-hover:bg-primary">FREE</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ─── Footer ───────────────────────────────────────────── */}
      <footer className="border-t-8 border-foreground bg-foreground text-background py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 px-8 md:flex-row font-ai text-sm font-bold uppercase">
          <div className="flex items-center gap-4 bg-background text-foreground border-4 border-foreground p-2 shadow-[4px_4px_0px_var(--color-primary)]">
            <span className="bg-primary px-3 py-2 font-black border-2 border-foreground">PS_V1</span>
            <span className="pr-3 text-lg">PLAY_SAVER</span>
          </div>
          <p className="text-lg opacity-80">© {new Date().getFullYear()} PLAY_SAVER ORG. // SYSTEMS ONLINE.</p>
          <div className="flex gap-8 underline decoration-4 underline-offset-8 text-lg">
            <a href="/feedback" className="hover:text-primary transition-colors">FEEDBACK</a>
            <a href="/privacy" className="hover:text-primary transition-colors">PRIVACY</a>
            <a href="/terms" className="hover:text-primary transition-colors">TERMS</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
