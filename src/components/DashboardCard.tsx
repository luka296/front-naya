"use client";

import { motion } from "framer-motion";
import type { ComponentType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title?: string;
  eyebrow?: string;
  icon?: ComponentType<{ className?: string }>;
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function DashboardCard({
  title,
  eyebrow,
  icon: Icon,
  children,
  className,
  delay = 0,
}: DashboardCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={{ y: -3 }}
      className={cn(
        "rounded-xl border border-[#d4a64d25] bg-[#0b1329]/88 p-5 shadow-[0_16px_42px_rgba(0,0,0,0.5)] transition-shadow duration-300 hover:shadow-[0_22px_58px_rgba(0,0,0,0.7)]",
        className
      )}
    >
      {(title || eyebrow || Icon) && (
        <div className="mb-5 flex items-start justify-between gap-4" dir="rtl">
          <div>
            {eyebrow && <p className="mb-1 text-xs font-bold text-gold">{eyebrow}</p>}
            {title && <h3 className="text-base font-extrabold text-white">{title}</h3>}
          </div>
          {Icon && (
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-[#d4a64d33] bg-[#d4a64d18] text-gold">
              <Icon className="h-5 w-5" />
            </div>
          )}
        </div>
      )}
      <div className="text-slate-300">{children}</div>
    </motion.article>
  );
}
