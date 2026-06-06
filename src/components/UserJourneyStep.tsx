"use client";

import { motion } from "framer-motion";
import type { ComponentType } from "react";
import { cn } from "@/lib/utils";

interface UserJourneyStepProps {
  num: string;
  title: string;
  desc: string;
  icon: ComponentType<{ className?: string }>;
  delay?: number;
  isLast?: boolean;
}

export function UserJourneyStep({
  num,
  title,
  desc,
  icon: Icon,
  delay = 0,
  isLast = false,
}: UserJourneyStepProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      whileHover={{ y: -5 }}
      className="group relative rounded-lg border border-[rgba(212,166,77,0.2)] bg-[rgba(12,18,32,0.72)] p-5 shadow-[0_18px_58px_rgba(0,0,0,0.26)] backdrop-blur-xl"
    >
      {!isLast && (
        <div
          className={cn(
            "pointer-events-none absolute hidden h-px bg-gradient-to-l from-transparent via-[#d4a64d80] to-transparent lg:block",
            "left-[-24px] top-11 w-12"
          )}
        />
      )}
      <div className="mb-5 flex items-center justify-between gap-4">
        <span className="grid h-12 w-12 place-items-center rounded-full border border-[#d4a64d55] bg-[#d4a64d18] text-sm font-extrabold text-[#f2d58e] shadow-[0_0_24px_rgba(212,166,77,0.16)]">
          {num}
        </span>
        <div className="grid h-12 w-12 place-items-center rounded-lg border border-white/10 bg-white/[0.06] text-white">
          <Icon className="h-6 w-6 text-[#f2d58e]" />
        </div>
      </div>
      <h3 className="text-lg font-extrabold text-white transition-colors duration-300 group-hover:text-[#f2d58e]">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-slate-300">{desc}</p>
    </motion.article>
  );
}
