"use client";

import { motion } from "framer-motion";
import type { ComponentType } from "react";
import { cn } from "@/lib/utils";
import { AnimatedCounter } from "@/components/AnimatedCounter";

interface StatCardProps {
  label: string;
  value: string;
  description?: string;
  icon?: ComponentType<{ className?: string }>;
  tone?: "gold" | "navy" | "black";
  delay?: number;
  compact?: boolean;
  className?: string;
}

const toneStyles = {
  gold: "from-[#a37a28] to-[#c59b27] text-[#a37a28] border-gold/15",
  navy: "from-[#0b192c] to-[#1e293b] text-[#0b192c] border-slate-900/15",
  black: "from-[#000000] to-[#0f172a] text-[#000000] border-slate-950/15",
};

export function StatCard({
  label,
  value,
  description,
  icon: Icon,
  tone = "gold",
  delay = 0,
  compact = false,
  className,
}: StatCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className={cn(
        "group relative overflow-hidden rounded-lg border bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_18px_48px_rgba(163,122,40,0.06)]",
        toneStyles[tone].split(" ").at(-1),
        className
      )}
    >
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-1 bg-gradient-to-r opacity-90",
          toneStyles[tone].split(" ").slice(0, 2).join(" ")
        )}
      />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <AnimatedCounter
            value={value}
            duration={2.2}
            className={cn(
              "text-3xl font-extrabold leading-none md:text-4xl",
              toneStyles[tone].split(" ")[2]
            )}
          />
          <h3 className={cn("mt-3 font-bold text-slate-800", compact ? "text-sm" : "text-base")}>
            {label}
          </h3>
        </div>
        {Icon && (
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-slate-100 bg-slate-50 text-slate-700 shadow-inner">
            <Icon className={cn("h-5 w-5", toneStyles[tone].split(" ")[2])} />
          </div>
        )}
      </div>
      {description && (
        <p className="relative mt-3 text-sm leading-6 text-slate-500 font-medium">{description}</p>
      )}
    </motion.article>
  );
}
