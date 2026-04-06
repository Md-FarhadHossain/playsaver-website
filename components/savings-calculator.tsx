"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { BookOpen, Code, Dumbbell } from "lucide-react";

const PRESET_MINUTES = [5, 15, 30, 60];

export function SavingsCalculator() {
  const [minutesPerDay, setMinutesPerDay] = useState(10);

  const yearlyMinutes = minutesPerDay * 365;
  const yearlyHours = Math.floor(yearlyMinutes / 60);
  const yearlyDays = (yearlyHours / 24).toFixed(1);
  const monthlyHours = (minutesPerDay * 30 / 60).toFixed(1);

  // Example achievements based on time
  const booksRead = Math.max(0, Math.floor(yearlyHours / 5)); // 5 hours per book
  const workouts = Math.max(0, Math.floor(yearlyHours / 1.5)); // 1.5 hours per workout
  const codingProjects = Math.max(0, Math.floor(yearlyHours / 20)); // 20 hours per project

  return (
    <div className="mx-auto mt-16 max-w-4xl space-y-8 px-4">
      <div className="text-center">
        <h3 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Visualize Your Savings</h3>
        <p className="mt-4 text-lg text-muted-foreground">See how small daily changes compound into massive results over a year.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Interactive Left Side */}
        <div className="flex flex-col justify-between rounded-2xl border border-violet-400/20 bg-background p-8 shadow-xl shadow-violet-500/5">
          <div>
            <div className="mb-8 flex items-center justify-between">
              <span className="font-medium text-foreground">Time saved per day:</span>
              <span className="rounded-full bg-violet-500/10 px-4 py-1.5 font-bold text-violet-600 dark:text-violet-400 transition-all duration-300">
                {minutesPerDay} minutes
              </span>
            </div>
            
            <div className="mb-10 relative pt-2 pb-6">
              <Slider
                value={[minutesPerDay]}
                onValueChange={(val) => setMinutesPerDay(val[0])}
                min={1}
                max={120}
                step={1}
                className="relative z-10"
              />
              
              {/* Tick marks & labels */}
              <div className="absolute top-4 left-0 right-0 pointer-events-none px-1.5 h-8">
                <div className="relative w-full h-full">
                  {/* Major ticks */}
                  {[15, 30, 60, 90, 120].map((tick) => (
                    <div
                      key={`major-${tick}`}
                      className="absolute h-full flex flex-col items-center -translate-x-1/2"
                      style={{ left: `${((tick - 1) / 119) * 100}%` }}
                    >
                      <div className={`w-[2px] h-2.5 rounded-full mt-1 ${minutesPerDay >= tick ? 'bg-violet-500/60' : 'bg-border'}`} />
                      <span className={`text-[10px] mt-1 font-medium ${minutesPerDay >= tick ? 'text-violet-600 dark:text-violet-400' : 'text-muted-foreground'}`}>{tick}</span>
                    </div>
                  ))}
                  {/* Minor ticks */}
                  {[5, 10, 20, 40, 50, 70, 80, 100, 110].map((tick) => (
                    <div
                      key={`minor-${tick}`}
                      className="absolute h-full flex flex-col items-center -translate-x-1/2"
                      style={{ left: `${((tick - 1) / 119) * 100}%` }}
                    >
                      <div className={`w-[2px] h-1.5 rounded-full mt-1.5 ${minutesPerDay >= tick ? 'bg-violet-500/40' : 'bg-border/50'}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-8 flex flex-wrap gap-3">
              {PRESET_MINUTES.map((mins) => (
                <button
                  key={mins}
                  onClick={() => setMinutesPerDay(mins)}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                    minutesPerDay === mins
                      ? "bg-violet-600 text-white shadow-md shadow-violet-500/20 scale-105"
                      : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                  }`}
                >
                  {mins} mins
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-violet-500/5 p-5 border border-violet-500/10">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Saving <strong className="text-violet-600 dark:text-violet-400">{minutesPerDay} minutes</strong> a day gives you back almost <strong className="text-violet-600 dark:text-violet-400">{yearlyDays} full days</strong> of your life every year.
            </p>
          </div>
        </div>

        {/* Results Right Side */}
        <div className="flex flex-col justify-center gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="group rounded-xl border border-violet-500/20 bg-card p-5 transition-all hover:bg-violet-500/5 hover:border-violet-500/30">
              <p className="text-xs font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400">In a Month</p>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-foreground tabular-nums">{monthlyHours}</span>
                <span className="text-sm font-medium text-muted-foreground">hrs</span>
              </div>
            </div>
            <div className="group rounded-xl border border-fuchsia-500/20 bg-card p-5 transition-all hover:bg-fuchsia-500/5 hover:border-fuchsia-500/30">
              <p className="text-xs font-semibold uppercase tracking-wider text-fuchsia-600 dark:text-fuchsia-400">In a Year</p>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-foreground tabular-nums">{yearlyHours}</span>
                <span className="text-sm font-medium text-muted-foreground">hrs</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
             <h4 className="mb-5 font-semibold text-foreground">What you could achieve in a year:</h4>
             <ul className="space-y-5">
               <li className="flex items-center gap-4 group cursor-default">
                 <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 transition-colors group-hover:bg-blue-500/20 dark:text-blue-400">
                   <BookOpen className="h-6 w-6" />
                 </div>
                 <div>
                   <p className="font-semibold text-foreground">Read <span className="tabular-nums text-blue-600 dark:text-blue-400">{booksRead}</span> books</p>
                   <p className="text-sm text-muted-foreground mt-0.5">At 5 hours per book</p>
                 </div>
               </li>
               <li className="flex items-center gap-4 group cursor-default">
                 <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 transition-colors group-hover:bg-green-500/20 dark:text-green-400">
                   <Dumbbell className="h-6 w-6" />
                 </div>
                 <div>
                   <p className="font-semibold text-foreground">Complete <span className="tabular-nums text-green-600 dark:text-green-400">{workouts}</span> workouts</p>
                   <p className="text-sm text-muted-foreground mt-0.5">At 1.5 hours per session</p>
                 </div>
               </li>
               <li className="flex items-center gap-4 group cursor-default">
                 <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-orange-600 transition-colors group-hover:bg-orange-500/20 dark:text-orange-400">
                   <Code className="h-6 w-6" />
                 </div>
                 <div>
                   <p className="font-semibold text-foreground">Build <span className="tabular-nums text-orange-600 dark:text-orange-400">{codingProjects}</span> projects</p>
                   <p className="text-sm text-muted-foreground mt-0.5">At 20 hours per project</p>
                 </div>
               </li>
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
