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
        "rounded-xl border border-slate-200/80 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.02)] transition-shadow duration-300 hover:shadow-[0_12px_42px_rgba(163,122,40,0.05)]",
        className
      )}
    >
      {(title || eyebrow || Icon) && (
        <div className="mb-5 flex items-start justify-between gap-4" dir="rtl">
          <div>
            {eyebrow && <p className="mb-1 text-xs font-bold text-gold">{eyebrow}</p>}
            {title && <h3 className="text-base font-extrabold text-slate-800">{title}</h3>}
          </div>
          {Icon && (
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-[#d4a64d]/20 bg-[#d4a64d]/10 text-[#a37a28]">
              <Icon className="h-5 w-5" />
            </div>
          )}
        </div>
      )}
      <div className="text-slate-600">{children}</div>
    </motion.article>
  );
}
