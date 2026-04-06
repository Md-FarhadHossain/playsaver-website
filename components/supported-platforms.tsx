"use client";

import { MonitorPlay } from "lucide-react";

export function SupportedPlatforms() {
  const platforms = [
    "YouTube", "Netflix", "Udemy", "Coursera", "Skillshare", 
    "MasterClass", "Facebook Videos", "Vimeo", "LinkedIn Learning", 
    "Prime Video", "Twitch VODs", "X / Twitter", "Pluralsight",
    "Khan Academy", "Domestika", "And thousands more..."
  ];

  return (
    <section className="relative overflow-hidden border-y border-border/50 bg-background/50 py-16">
      {/* Subtle fade edges for the marquee */}
      <div className="absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent" />

      <div className="mx-auto max-w-7xl px-6 mb-10 text-center relative z-20">
        <p className="text-sm font-bold uppercase tracking-widest text-violet-500">
          Works seamlessly where you watch
        </p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Every platform, <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500">one extension.</span>
        </h2>
      </div>
      
      {/* Marquee container */}
      <div className="relative flex w-full flex-col gap-6">
        {/* Row 1 - Left to Right */}
        <div 
          className="flex w-max space-x-4 pl-4 hover:[animation-play-state:paused]"
          style={{ animation: 'marqueeLeft 40s linear infinite' }}
        >
          {platforms.map((platform, i) => (
            <PlatformBadge key={`${platform}-${i}`} name={platform} />
          ))}
          {/* Duplicate for seamless looping */}
          {platforms.map((platform, i) => (
            <PlatformBadge key={`dup-${platform}-${i}`} name={platform} />
          ))}
        </div>

        {/* Row 2 - Right to Left (reverse order of platforms) */}
        <div 
          className="flex w-max space-x-4 pl-4 hover:[animation-play-state:paused]"
          style={{ animation: 'marqueeRight 35s linear infinite' }}
        >
          {platforms.slice().reverse().map((platform, i) => (
            <PlatformBadge key={`rev-${platform}-${i}`} name={platform} />
          ))}
          {/* Duplicate for seamless looping */}
          {platforms.slice().reverse().map((platform, i) => (
            <PlatformBadge key={`dup-rev-${platform}-${i}`} name={platform} />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}

function PlatformBadge({ name }: { name: string }) {
  return (
    <div className="flex shrink-0 items-center justify-center gap-2.5 rounded-2xl border border-border/60 bg-background/80 px-8 py-4 shadow-sm backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-violet-500/30 hover:shadow-md dark:bg-muted/30">
      <MonitorPlay size={20} className="text-violet-500" />
      <span className="text-base font-semibold text-foreground whitespace-nowrap">{name}</span>
    </div>
  );
}
