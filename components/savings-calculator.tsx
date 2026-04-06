"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { BookOpen, Code, Dumbbell, Terminal } from "lucide-react";

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
    <div className="mx-auto mt-16 max-w-4xl space-y-8 px-4 text-left">
      <div className="mb-12 inline-block brutal-border bg-card p-6 brutal-shadow">
        <h3 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter text-foreground mb-4">
          DATA PROJECTION
        </h3>
        <p className="max-w-xl text-xl font-bold uppercase font-ai text-foreground">
          <span className="text-primary mr-2">{'>'}</span> Calculate annual compounded time reclamation.
        </p>
      </div>

      <div className="grid gap-12 md:grid-cols-2">
        {/* Interactive Left Side */}
        <div className="flex flex-col justify-between border-4 border-foreground bg-background p-8 brutal-shadow relative">
          <div className="absolute top-0 right-0 bg-primary text-foreground font-ai font-black border-l-4 border-b-4 border-foreground px-3 py-1 text-sm uppercase">
            CALCULATOR.EXE
          </div>
          <div>
            <div className="mb-12 flex flex-col items-start pt-6">
              <span className="font-bold text-foreground text-xl uppercase mb-4">DAILY YIELD:</span>
              <span className="border-4 border-foreground bg-accent px-6 py-2 text-4xl font-black text-foreground shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#fff]">
                {minutesPerDay} MIN/DAY
              </span>
            </div>
            
            <div className="mb-12 relative pt-2 pb-6 px-2">
              <Slider
                value={[minutesPerDay]}
                onValueChange={(val) => setMinutesPerDay(val[0])}
                min={1}
                max={120}
                step={1}
                className="relative z-10 py-4 cursor-pointer"
              />
              
              {/* Tick marks & labels */}
              <div className="absolute top-8 left-0 right-0 pointer-events-none px-3 h-8">
                <div className="relative w-full h-full">
                  {/* Major ticks */}
                  {[15, 30, 60, 90, 120].map((tick) => (
                    <div
                      key={`major-${tick}`}
                      className="absolute h-full flex flex-col items-center -translate-x-1/2"
                      style={{ left: `${((tick - 1) / 119) * 100}%` }}
                    >
                      <div className={`w-1 h-3 mt-1 border border-foreground ${minutesPerDay >= tick ? 'bg-primary' : 'bg-muted'}`} />
                      <span className={`text-xs mt-2 font-black font-ai ${minutesPerDay >= tick ? 'text-foreground' : 'text-muted-foreground'}`}>{tick}</span>
                    </div>
                  ))}
                  {/* Minor ticks */}
                  {[5, 10, 20, 40, 50, 70, 80, 100, 110].map((tick) => (
                    <div
                      key={`minor-${tick}`}
                      className="absolute h-full flex flex-col items-center -translate-x-1/2 hidden sm:flex"
                      style={{ left: `${((tick - 1) / 119) * 100}%` }}
                    >
                      <div className={`w-0.5 h-2 mt-2 ${minutesPerDay >= tick ? 'bg-foreground' : 'bg-muted-foreground opacity-50'}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-10 flex flex-wrap gap-4 mt-8">
              {PRESET_MINUTES.map((mins) => (
                <button
                  key={mins}
                  onClick={() => setMinutesPerDay(mins)}
                  className={`border-4 border-foreground px-5 py-2 text-lg font-black font-ai uppercase transition-all ${
                    minutesPerDay === mins
                      ? "bg-foreground text-background shadow-[4px_4px_0px_var(--color-primary)] translate-x-[-2px] translate-y-[-2px]"
                      : "bg-card text-foreground hover:bg-muted shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff]"
                  }`}
                >
                  {mins} MI
                </button>
              ))}
            </div>
          </div>

          <div className="bg-secondary p-5 border-4 border-foreground text-foreground shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#fff]">
            <p className="text-xl font-bold uppercase leading-snug">
              Saving <span className="bg-background px-2 mx-1 border-2 border-foreground">{minutesPerDay}M</span> daily yields <span className="bg-foreground text-background px-2 mx-1">{yearlyDays} DAYS</span> of reclaimed lifespan annually.
            </p>
          </div>
        </div>

        {/* Results Right Side */}
        <div className="flex flex-col justify-center gap-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="group border-4 border-foreground bg-card p-6 shadow-[6px_6px_0px_#000] dark:shadow-[6px_6px_0px_#fff] hover:bg-primary transition-colors">
              <p className="text-sm font-black uppercase font-ai tracking-wider text-foreground mb-4 opacity-80">{'>'} MONTHLY_YIELD</p>
              <div className="mt-2 flex items-end gap-2">
                <span className="text-6xl font-black text-foreground tabular-nums leading-none tracking-tighter">{monthlyHours}</span>
                <span className="text-xl font-black font-ai uppercase mb-1">HR</span>
              </div>
            </div>
            <div className="group border-4 border-foreground bg-card p-6 shadow-[6px_6px_0px_var(--color-secondary)] hover:bg-secondary transition-colors">
              <p className="text-sm font-black uppercase font-ai tracking-wider text-foreground mb-4 opacity-80">{'>'} ANNUAL_YIELD</p>
              <div className="mt-2 flex items-end gap-2">
                <span className="text-6xl font-black text-foreground tabular-nums leading-none tracking-tighter">{yearlyHours}</span>
                <span className="text-xl font-black font-ai uppercase mb-1">HR</span>
              </div>
            </div>
          </div>

          <div className="border-4 border-foreground bg-background p-8 mt-4 brutal-shadow relative">
             <div className="absolute top-0 right-0 p-2">
               <Terminal size={24} className="text-foreground opacity-50" />
             </div>
             <h4 className="mb-8 text-2xl font-black uppercase">POTENTIAL VECTOR UTILIZATION:</h4>
             <ul className="space-y-6">
               <li className="flex items-start gap-4">
                 <div className="flex h-14 w-14 mt-1 shrink-0 items-center justify-center border-4 border-foreground bg-accent text-foreground shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff]">
                   <BookOpen className="h-6 w-6 stroke-[3px]" />
                 </div>
                 <div>
                   <p className="text-xl font-bold uppercase text-foreground">Read <span className="text-2xl font-black font-ai border-b-4 border-accent px-1">{booksRead}</span> books</p>
                   <p className="text-sm font-bold font-ai text-foreground mt-2 opacity-70">RUNTIME: 5 HR / BOOK</p>
                 </div>
               </li>
               <li className="flex items-start gap-4">
                 <div className="flex h-14 w-14 mt-1 shrink-0 items-center justify-center border-4 border-foreground bg-primary text-foreground shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff]">
                   <Dumbbell className="h-6 w-6 stroke-[3px]" />
                 </div>
                 <div>
                   <p className="text-xl font-bold uppercase text-foreground">Complete <span className="text-2xl font-black font-ai border-b-4 border-primary px-1">{workouts}</span> workouts</p>
                   <p className="text-sm font-bold font-ai text-foreground mt-2 opacity-70">RUNTIME: 1.5 HR / SESSION</p>
                 </div>
               </li>
               <li className="flex items-start gap-4">
                 <div className="flex h-14 w-14 mt-1 shrink-0 items-center justify-center border-4 border-foreground bg-secondary text-foreground shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff]">
                   <Code className="h-6 w-6 stroke-[3px]" />
                 </div>
                 <div>
                   <p className="text-xl font-bold uppercase text-foreground">Build <span className="text-2xl font-black font-ai border-b-4 border-secondary px-1">{codingProjects}</span> projects</p>
                   <p className="text-sm font-bold font-ai text-foreground mt-2 opacity-70">RUNTIME: 20 HR / PROJECT</p>
                 </div>
               </li>
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
