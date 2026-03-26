"use client";

import { useState } from "react";
import { MessageSquare, CheckCircle2, ChevronRight, AlertCircle, Lightbulb, Bug, HelpCircle } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const FEEDBACK_TOPICS = [
  { id: "feature-request", label: "Feature Request", icon: Lightbulb },
  { id: "bug-report", label: "Bug Report", icon: Bug },
  { id: "general", label: "General Feedback", icon: MessageSquare },
  { id: "question", label: "Question / Help", icon: HelpCircle },
];

export default function FeedbackPage() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedTopic || !feedbackText.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: selectedTopic, details: feedbackText })
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
          <a href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
            <img src="/logo.svg" alt="PlaySaver Logo" className="h-8 w-8 drop-shadow-md" />
            <span className="text-lg font-bold tracking-tight text-foreground">
              Play<span className="text-blue-500">Saver</span>
            </span>
          </a>
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
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/10">
                <CheckCircle2 size={40} className="text-blue-500" />
              </div>
              <h1 className="mb-2 text-3xl font-extrabold text-foreground">Feedback Received!</h1>
              <p className="max-w-md text-muted-foreground">
                Thank you for taking the time to share your thoughts. Your feedback directly helps us improve PlaySaver for everyone.
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
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10">
                  <MessageSquare size={32} className="text-blue-500" />
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
                  We value your feedback
                </h1>
                <p className="mt-4 text-base text-muted-foreground">
                  Have an idea, found a bug, or just want to share your thoughts? We're all ears and read every single message.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Options */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <AlertCircle size={16} className="text-blue-500" />
                    What kind of feedback do you have? (Required)
                  </label>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {FEEDBACK_TOPICS.map((topic) => {
                      const Icon = topic.icon;
                      return (
                        <label
                          key={topic.id}
                          className={`relative flex cursor-pointer rounded-xl border p-4 transition-all duration-200 hover:bg-muted/50 ${
                            selectedTopic === topic.id 
                              ? "border-blue-500 bg-blue-500/5 shadow-sm shadow-blue-500/10" 
                              : "border-border bg-background"
                          }`}
                        >
                          <input
                            type="radio"
                            name="feedback-topic"
                            value={topic.id}
                            checked={selectedTopic === topic.id}
                            onChange={() => setSelectedTopic(topic.id)}
                            className="sr-only"
                          />
                          <div className="flex w-full items-center gap-3">
                            <Icon size={18} className={selectedTopic === topic.id ? "text-blue-500" : "text-muted-foreground"} />
                            <span className={`text-sm flex-1 ${selectedTopic === topic.id ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                              {topic.label}
                            </span>
                            <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                               selectedTopic === topic.id 
                                 ? "border-blue-500 bg-blue-500" 
                                 : "border-muted-foreground/30"
                            }`}>
                              {selectedTopic === topic.id && (
                                <div className="h-2 w-2 rounded-full bg-white" />
                              )}
                            </div>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Textarea */}
                <div className="space-y-3">
                   <label htmlFor="feedback" className="flex items-center gap-2 text-sm font-semibold text-foreground">
                     <MessageSquare size={16} className="text-sky-500" />
                     Tell us more (Required)
                   </label>
                   <textarea
                     id="feedback"
                     rows={5}
                     required
                     placeholder={
                       selectedTopic === "feature-request" ? "Describe the feature you'd like to see..." : 
                       selectedTopic === "bug-report" ? "What went wrong? Steps to reproduce?" : 
                       selectedTopic === "question" ? "What do you need help with?" : 
                       "Share your thoughts..."
                     }
                     value={feedbackText}
                     onChange={(e) => setFeedbackText(e.target.value)}
                     className="w-full resize-none rounded-xl border border-border bg-background p-4 text-sm text-foreground focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                   />
                </div>

                {/* Submit */}
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between pt-2">
                  <p className="text-xs text-muted-foreground text-center sm:text-left">
                    Your feedback is anonymous.
                  </p>
                  <button
                    type="submit"
                    disabled={!selectedTopic || !feedbackText.trim() || isSubmitting}
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
        © {new Date().getFullYear()} PlaySaver. All rights reserved.
      </footer>
    </div>
  );
}
