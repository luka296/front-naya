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
  tone?: "gold" | "teal" | "blue";
  delay?: number;
  compact?: boolean;
  className?: string;
}

const toneStyles = {
  gold: "from-[#d4a64d] to-[#f6d993] text-[#f4d58a] border-[#d4a64d33]",
  teal: "from-[#14b8a6] to-[#99f6e4] text-[#5eead4] border-[#14b8a633]",
  blue: "from-[#60a5fa] to-[#bfdbfe] text-[#93c5fd] border-[#60a5fa33]",
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
        "group relative overflow-hidden rounded-lg border bg-white/[0.055] p-5 shadow-[0_16px_48px_rgba(0,0,0,0.22)] backdrop-blur-xl transition-colors duration-300 hover:bg-white/[0.08]",
        toneStyles[tone].split(" ").at(-1),
        className
      )}
    >
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-1 bg-gradient-to-r opacity-80",
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
          <h3 className={cn("mt-3 font-bold text-white", compact ? "text-sm" : "text-base")}>
            {label}
          </h3>
        </div>
        {Icon && (
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.08] text-white shadow-inner">
            <Icon className={cn("h-5 w-5", toneStyles[tone].split(" ")[2])} />
          </div>
        )}
      </div>
      {description && (
        <p className="relative mt-3 text-sm leading-6 text-slate-300">{description}</p>
      )}
    </motion.article>
  );
}
