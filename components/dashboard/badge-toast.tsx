"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/lib/productivity";
import { X } from "lucide-react";

interface BadgeToastProps {
  badge: Badge | null;
  onDismiss: () => void;
}

export function BadgeToast({ badge, onDismiss }: BadgeToastProps) {
  useEffect(() => {
    if (badge) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 5000); // 5s auto-dismiss per spec
      return () => clearTimeout(timer);
    }
  }, [badge, onDismiss]);

  return (
    <AnimatePresence>
      {badge && (
        <motion.div
          className="fixed bottom-6 right-6 z-[100] flex w-80 items-start gap-4 overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-2xl backdrop-blur-xl"
          initial={{ opacity: 0, x: 100, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {/* Glowing border animated wrapper */}
          <div className="absolute -inset-[200%] animate-[shimmer_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_120deg,rgba(59,130,246,0.3)_180deg,transparent_240deg_360deg)] pointer-events-none opacity-50 dark:opacity-80" />
          <div className="absolute inset-[1px] rounded-2xl bg-card backdrop-blur-3xl -z-10" />

          {/* Toast content */}
          <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-2xl shadow-inner ring-1 ring-blue-500/30">
            {badge.icon}
          </div>

          <div className="relative z-10 flex-1">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-blue-500 dark:text-blue-400">Badge Unlocked!</h4>
            <h3 className="mt-0.5 text-sm font-bold text-foreground">{badge.name}</h3>
            <p className="mt-1 text-xs text-muted-foreground leading-tight">{badge.condition}</p>
          </div>

          <button 
            onClick={onDismiss}
            className="relative z-10 shrink-0 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
