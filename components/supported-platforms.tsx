"use client";

import { MonitorPlay } from "lucide-react";

export function SupportedPlatforms() {
  const platforms = [
    "YOUTUBE", "NETFLIX", "UDEMY", "COURSERA", "SKILLSHARE", 
    "MASTERCLASS", "FACEBOOK", "VIMEO", "LINKEDIN", 
    "PRIME VIDEO", "TWITCH VODS", "X / TWITTER", "PLURALSIGHT",
    "KHAN ACADEMY", "DOMESTIKA", "++ MORE"
  ];

  return (
    <section className="relative overflow-hidden border-y-4 border-foreground bg-primary py-12">
      {/* Harsh fade edges for the marquee using hard colors instead of smooth gradient */}
      <div className="absolute left-0 top-0 z-10 h-full w-12 md:w-24 bg-gradient-to-r from-primary via-primary to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 z-10 h-full w-12 md:w-24 bg-gradient-to-l from-primary via-primary to-transparent pointer-events-none" />

      <div className="mx-auto max-w-7xl px-8 mb-8 relative z-20 brutal-border bg-background brutal-shadow p-6 inline-block ml-8 rotate-1">
        <p className="text-sm font-black uppercase font-ai tracking-widest text-secondary border-b-2 border-foreground pb-2 mb-2 w-fit">
          {'>'} COMPATIBILITY_MATRIX
        </p>
        <h2 className="text-2xl font-black uppercase tracking-tighter text-foreground sm:text-4xl">
          EVERY PLATFORM. <span className="bg-foreground text-background px-2">ONE EXTENSION.</span>
        </h2>
      </div>
      
      {/* Marquee container */}
      <div className="relative flex w-full flex-col gap-6 mt-8 py-4 bg-background border-y-4 border-foreground transform -skew-y-1 shadow-[0_8px_0px_#000] dark:shadow-[0_8px_0px_#fff]">
        {/* Row 1 - Left to Right */}
        <div 
          className="flex w-max space-x-6 pl-6 hover:[animation-play-state:paused]"
          style={{ animation: 'marqueeLeft 30s linear infinite' }}
        >
          {platforms.map((platform, i) => (
            <PlatformBadge key={`${platform}-${i}`} name={platform} />
          ))}
          {/* Duplicate for seamless looping */}
          {platforms.map((platform, i) => (
            <PlatformBadge key={`dup-${platform}-${i}`} name={platform} />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

function PlatformBadge({ name }: { name: string }) {
  return (
    <div className="flex shrink-0 items-center justify-center gap-3 border-4 border-foreground bg-card px-6 py-3 shadow-[4px_4px_0px_var(--color-primary)] transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0px_var(--color-secondary)]">
      <MonitorPlay size={24} className="text-foreground stroke-[3px]" />
      <span className="text-xl font-black uppercase tracking-widest text-foreground font-ai">{name}</span>
    </div>
  );
}
