"use client";

import { useState } from "react";
import { Clock, Frown, CheckCircle2, ChevronRight, MessageSquare, AlertCircle } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const UNINSTALL_REASONS = [
  { id: "broken", label: "It's broken / not tracking time properly on some sites." },
  { id: "distracting", label: "The in-video pop-up was too annoying or distracting." },
  { id: "not-useful", label: "I didn't find it motivating or useful." },
  { id: "buggy", label: "There were too many bugs or glitches." },
  { id: "slowed-down", label: "It slowed down my browser." },
  { id: "other", label: "Other..." },
];

export default function UninstallFeedbackPage() {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedReason) return;
    
    setIsSubmitting(true);
    
    try {
      await fetch('/api/uninstall-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: selectedReason, details: feedbackText })
      });
    } catch (err) {
      console.error(err);
    }
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      {/* ─── Minimal Navbar ──────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/30">
              <Clock size={16} className="text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground">
              Time<span className="text-violet-500">Saver</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="relative isolate flex-1 bg-background px-6 py-12 md:py-20">
        {/* Background Effect */}
        <div className="absolute inset-x-0 top-0 -z-10 h-full overflow-hidden" aria-hidden="true">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)]" />
        </div>

        <div className="mx-auto max-w-2xl">
          {isSubmitted ? (
            /* ─── Thank You State ──────────────────────────────────── */
            <div className="animate-in fade-in slide-in-from-bottom-4 flex flex-col items-center justify-center rounded-3xl border border-border/60 bg-background p-10 text-center shadow-lg md:p-14 duration-500">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10">
                <CheckCircle2 size={40} className="text-emerald-500" />
              </div>
              <h1 className="mb-2 text-3xl font-extrabold text-foreground">Thank you for your feedback!</h1>
              <p className="max-w-md text-muted-foreground">
                We're sorry to see you go, but your input will directly help us improve TimeSaver for everyone else. Have a highly productive day!
              </p>
              <a
                href="/"
                className="mt-8 flex items-center justify-center rounded-full bg-muted px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-muted/70"
              >
                Return to Homepage
              </a>
            </div>
          ) : (
            /* ─── Feedback Form ────────────────────────────────────── */
            <div className="rounded-3xl border border-border/60 bg-background/80 p-8 shadow-sm backdrop-blur-sm md:p-12">
              <div className="mb-8 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/10">
                  <Frown size={32} className="text-amber-500" />
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
                  We're sorry to see you go.
                </h1>
                <p className="mt-4 text-base text-muted-foreground">
                  TimeSaver has been successfully uninstalled. Could you take <strong className="text-foreground">30 seconds</strong> to tell us why? We read every single response.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Options */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <AlertCircle size={16} className="text-violet-500" />
                    What was the main reason you uninstalled? (Required)
                  </label>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {UNINSTALL_REASONS.map((reason) => (
                      <label
                         key={reason.id}
                         className={`relative flex cursor-pointer rounded-xl border p-4 transition-all duration-200 hover:bg-muted/50 ${
                           selectedReason === reason.id 
                             ? "border-violet-500 bg-violet-500/5 shadow-sm shadow-violet-500/10" 
                             : "border-border bg-background"
                         }`}
                      >
                         <input
                           type="radio"
                           name="uninstall-reason"
                           value={reason.id}
                           checked={selectedReason === reason.id}
                           onChange={() => setSelectedReason(reason.id)}
                           className="sr-only"
                         />
                         <div className="flex w-full items-center justify-between gap-3">
                           <span className={`text-sm ${selectedReason === reason.id ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                             {reason.label}
                           </span>
                           <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                              selectedReason === reason.id 
                                ? "border-violet-500 bg-violet-500" 
                                : "border-muted-foreground/30"
                           }`}>
                             {selectedReason === reason.id && (
                               <div className="h-2 w-2 rounded-full bg-white" />
                             )}
                           </div>
                         </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Textarea */}
                <div className="space-y-3">
                   <label htmlFor="feedback" className="flex items-center gap-2 text-sm font-semibold text-foreground">
                     <MessageSquare size={16} className="text-sky-500" />
                     Tell us more (Optional)
                   </label>
                   <textarea
                     id="feedback"
                     rows={4}
                     placeholder={selectedReason === "broken" ? "Which site was it broken on?" : selectedReason === "other" ? "Please specify..." : "Any other thoughts you'd like to share with the developers?"}
                     value={feedbackText}
                     onChange={(e) => setFeedbackText(e.target.value)}
                     className="w-full resize-none rounded-xl border border-border bg-background p-4 text-sm text-foreground focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                   />
                </div>

                {/* Submit */}
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between pt-2">
                  <p className="text-xs text-muted-foreground text-center sm:text-left">
                    Your feedback is anonymous and helps us build a better tool.
                  </p>
                  <button
                    type="submit"
                    disabled={!selectedReason || isSubmitting}
                    className="group flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-bold text-background transition-all hover:scale-[1.02] hover:bg-foreground/90 disabled:pointer-events-none disabled:opacity-50 sm:w-auto"
                  >
                    {isSubmitting ? "Sending..." : "Submit Feedback"}
                    {!isSubmitting && <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
      
      {/* ─── Footer ───────────────────────────────────────────── */}
      <footer className="border-t border-border/50 py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} TimeSaver. All rights reserved.
      </footer>
    </div>
  );
}
