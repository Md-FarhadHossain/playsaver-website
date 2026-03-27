"use client";

import { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { BarChart2 } from "lucide-react";

interface TimeChartProps {
  data: { date: string; minutesSaved: number }[];
  phaseColor: string;
}

export function TimeChart({ data, phaseColor }: TimeChartProps) {
  const [period, setPeriod] = useState<"7d" | "30d">("7d");
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const chartData = period === "7d" ? data.slice(-7) : data.slice(-30);
  const total = chartData.reduce((s, d) => s + d.minutesSaved, 0);
  const h = Math.floor(total / 60), m = total % 60;

  const formatDate = (s: any) => { const d = new Date(s); return `${d.getMonth()+1}/${d.getDate()}`; };
  const isDark = mounted && resolvedTheme === "dark";
  const grid = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)";
  const tick = isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)";
  const ttBg = isDark ? "#0c0c18" : "#fff";
  const ttBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";

  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-border/50 bg-card transition-colors duration-300">
      <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BarChart2 size={14} className="text-muted-foreground" />
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Time Saved</span>
          </div>
          <p className="text-3xl font-extrabold text-foreground tabular-nums">
            {h}h {String(m).padStart(2, "0")}m
            <span className="ml-2 text-sm font-medium text-muted-foreground">in {period === "7d" ? "7 days" : "30 days"}</span>
          </p>
        </div>
        <div className="flex shrink-0 gap-1 rounded-xl border border-border bg-muted/30 p-1">
          {(["7d", "30d"] as const).map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`rounded-lg px-3 py-1 text-xs font-bold transition-all ${period === p ? "bg-background text-foreground shadow-sm border border-border/50" : "text-muted-foreground hover:text-foreground"}`}
            >
              {p === "7d" ? "7d" : "30d"}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        className="flex-1 px-2 pb-5"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={period} transition={{ duration: 0.35 }}
      >
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -22, bottom: 0 }}>
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={phaseColor} stopOpacity={0.3} />
                <stop offset="100%" stopColor={phaseColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={grid} />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tickFormatter={formatDate} tick={{ fill: tick, fontSize: 11 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: tick, fontSize: 11 }} />
            <Tooltip
              contentStyle={{ background: ttBg, border: `1px solid ${ttBorder}`, borderRadius: 12, fontSize: 12, boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}
              itemStyle={{ color: phaseColor, fontWeight: 700 }}
              labelFormatter={formatDate}
            />
            <Area
              type="monotone" dataKey="minutesSaved" name="Mins Saved"
              stroke={phaseColor} strokeWidth={2} fill="url(#areaGrad)"
              dot={false} activeDot={{ r: 4, fill: phaseColor, strokeWidth: 0 }}
              animationDuration={1200}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
