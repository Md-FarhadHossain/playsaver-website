"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import canvasConfetti from "canvas-confetti";
import { ProductivityLevel } from "@/lib/productivity";
import { Sparkles, X } from "lucide-react";

interface LevelUpModalProps {
  newLevel: ProductivityLevel;
  isOpen: boolean;
  onClose: () => void;
}

export function LevelUpModal({ newLevel, isOpen, onClose }: LevelUpModalProps) {
  useEffect(() => {
    if (isOpen) {
      // Fire confetti when modal opens
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        canvasConfetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: [newLevel.color, "#ffffff", "#0A0A12"]
        });
        canvasConfetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: [newLevel.color, "#ffffff", "#0A0A12"]
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      
      frame();

      // Auto-dismiss after 4 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, newLevel, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Background flash */}
          <motion.div
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            {/* Color tint matching phase */}
            <motion.div 
              className="absolute inset-0 opacity-20 dark:opacity-40 mix-blend-overlay"
              style={{ backgroundColor: newLevel.color }}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.6, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>

          {/* Modal Card */}
          <motion.div
            className="relative w-full max-w-lg overflow-hidden rounded-[2rem] border border-border bg-card p-10 text-center shadow-2xl backdrop-blur-2xl"
            initial={{ scale: 0.8, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 30, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
            style={{ boxShadow: `0 25px 50px -12px ${newLevel.color}40, 0 0 0 1px ${newLevel.color}20` }}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full bg-muted/50 p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X size={20} />
            </button>

            <motion.div
              className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border-4 bg-muted shadow-inner"
              style={{ borderColor: newLevel.color }}
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", damping: 12, delay: 0.2 }}
            >
              <Sparkles size={40} style={{ color: newLevel.color }} />
            </motion.div>

            <motion.h4 
              className="mb-2 text-sm font-bold uppercase tracking-widest text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Level Up! You reached Level {newLevel.id}
            </motion.h4>
            
            <motion.h2 
              className="mb-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{ textShadow: `0 0 20px ${newLevel.color}80` }}
            >
              {newLevel.name}
            </motion.h2>

            <motion.p 
              className="text-lg font-medium text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              "{newLevel.subtitle}"
            </motion.p>
            
            <motion.button
              onClick={onClose}
              className="mt-8 rounded-full px-8 py-3 font-bold text-white transition-all hover:scale-105 active:scale-95"
              style={{ backgroundColor: newLevel.color, boxShadow: `0 10px 20px -10px ${newLevel.color}` }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Continue Journey
            </motion.button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
