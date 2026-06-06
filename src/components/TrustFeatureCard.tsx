"use client";

import { motion } from "framer-motion";
import type { ComponentType } from "react";

interface TrustFeatureCardProps {
  title: string;
  desc: string;
  badge: string;
  icon: ComponentType<{ className?: string }>;
  delay?: number;
}

export function TrustFeatureCard({
  title,
  desc,
  badge,
  icon: Icon,
  delay = 0,
}: TrustFeatureCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="group rounded-lg border border-[rgba(212,166,77,0.18)] bg-[rgba(10,15,27,0.78)] p-5 shadow-[0_18px_54px_rgba(0,0,0,0.26)] backdrop-blur-xl transition-colors duration-300 hover:border-[rgba(212,166,77,0.42)]"
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="grid h-12 w-12 place-items-center rounded-lg border border-[#d4a64d33] bg-[#d4a64d14] text-[#f2d58e]">
          <Icon className="h-6 w-6" />
        </div>
        <span className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-[11px] font-bold text-emerald-200">
          {badge}
        </span>
      </div>
      <h3 className="text-lg font-extrabold text-white transition-colors duration-300 group-hover:text-[#f2d58e]">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-slate-300">{desc}</p>
    </motion.article>
  );
}
