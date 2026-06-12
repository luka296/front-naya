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
      className="group relative rounded-lg border border-slate-100 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_18px_48px_rgba(163,122,40,0.06)]"
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
        <span className="grid h-12 w-12 place-items-center rounded-full border border-[#d4a64d]/30 bg-[#d4a64d]/10 text-sm font-extrabold text-[#a37a28] shadow-sm">
          {num}
        </span>
        <div className="grid h-12 w-12 place-items-center rounded-lg border border-slate-100 bg-slate-50 text-slate-700">
          <Icon className="h-6 w-6 text-[#a37a28]" />
        </div>
      </div>
      <h3 className="text-lg font-extrabold text-slate-800 transition-colors duration-300 group-hover:text-[#a37a28]">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-slate-500 font-medium">{desc}</p>
    </motion.article>
  );
}
