"use client";

import { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

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

  // Format date string to display
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.getMonth() + 1}/${d.getDate()}`;
  };

  const gridColor = mounted && resolvedTheme === 'dark' ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";
  const textColor = mounted && resolvedTheme === 'dark' ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)";
  const tooltipBg = mounted && resolvedTheme === 'dark' ? "rgba(10, 10, 18, 0.9)" : "rgba(255, 255, 255, 0.9)";
  const tooltipBorder = mounted && resolvedTheme === 'dark' ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const tooltipText = mounted && resolvedTheme === 'dark' ? "#fff" : "#000";

  return (
    <div className="rounded-3xl border border-border/50 bg-card p-8 backdrop-blur-md transition-colors duration-300 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground tracking-tight">Time Saved History</h2>
          <p className="mt-1 text-sm text-muted-foreground">Cumulative impact over time</p>
        </div>
        
        <div className="flex gap-2 rounded-lg bg-muted/50 p-1 ring-1 ring-border shadow-inner">
          <button
            onClick={() => setPeriod("7d")}
            className={`rounded-md px-3 py-1 text-xs font-semibold transition-all ${
              period === "7d" ? "bg-background text-foreground shadow" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            7 Days
          </button>
          <button
            onClick={() => setPeriod("30d")}
            className={`rounded-md px-3 py-1 text-xs font-semibold transition-all ${
              period === "30d" ? "bg-background text-foreground shadow" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            30 Days
          </button>
        </div>
      </div>

      <motion.div 
        className="h-[300px] w-full"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        key={period} // Re-animate on toggle
        transition={{ duration: 0.5 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorMinutes" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={phaseColor || "#3B82F6"} stopOpacity={0.4} />
                <stop offset="95%" stopColor={phaseColor || "#3B82F6"} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tickFormatter={formatDate}
              tick={{ fill: textColor, fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: textColor, fontSize: 12 }}
              dx={-10}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: tooltipBg, 
                borderColor: tooltipBorder,
                borderRadius: "12px",
                color: tooltipText,
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
              }}
              itemStyle={{ color: phaseColor || "#3B82F6" }}
              labelFormatter={formatDate}
            />
            <Area 
              type="monotone" 
              dataKey="minutesSaved" 
              name="Mins Saved"
              stroke={phaseColor || "#3B82F6"} 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorMinutes)" 
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
