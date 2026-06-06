"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { AnimatedCounter } from "./AnimatedCounter";

interface MetricItem {
  label: string;
  value: string;
  percentage?: number;
  icon?: React.ComponentType<{ className?: string }>;
  color?: string;
}

interface DashboardProps {
  title?: string;
  metrics: MetricItem[];
  layout?: "grid" | "list" | "bars";
  delay?: number;
}

export function Dashboard({ title, metrics, layout = "bars", delay = 0 }: DashboardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="w-full"
    >
      {title && (
        <h3 className="text-2xl font-bold text-gold-soft mb-8">{title}</h3>
      )}

      {layout === "bars" && (
        <div className="space-y-6">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="space-y-2"
            >
              <div className="flex justify-between items-center">
                <span className="text-text-gold font-semibold">{metric.label}</span>
                <AnimatedCounter
                  value={metric.value}
                  className="text-gold-soft font-bold text-lg"
                  duration={2}
                />
              </div>
              {metric.percentage && (
                <div className="relative h-2 bg-[rgba(212,166,77,0.1)] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${metric.percentage}%` } : { width: 0 }}
                    transition={{ duration: 2.5, ease: "easeOut", delay: 0.2 + i * 0.1 }}
                    className={`h-full ${metric.color || "bg-white"} rounded-full shadow-[0_0_12px_rgba(255,255,255,0.5)]`}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {layout === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="p-6 rounded-2xl border border-[rgba(212,166,77,0.2)] bg-[rgba(11,19,41,0.7)] backdrop-blur-xl text-center hover:border-[rgba(212,166,77,0.4)] transition-all"
              >
                {Icon && <Icon className="w-8 h-8 mx-auto mb-4 text-gold-soft" />}
                <AnimatedCounter
                  value={metric.value}
                  className="text-4xl font-extrabold text-gold-soft mb-2"
                  duration={2.5}
                />
                <p className="text-muted-gold text-sm">{metric.label}</p>
              </motion.div>
            );
          })}
        </div>
      )}

      {layout === "list" && (
        <div className="space-y-4">
          {metrics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex items-center gap-4 p-4 rounded-xl border border-[rgba(212,166,77,0.15)] bg-[rgba(11,19,41,0.5)] hover:border-[rgba(212,166,77,0.3)] transition-all"
              >
                {Icon && (
                  <div className="w-12 h-12 rounded-lg bg-[rgba(212,166,77,0.1)] border border-[rgba(212,166,77,0.2)] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-gold-soft" />
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-text-gold font-semibold">{metric.label}</p>
                </div>
                <AnimatedCounter
                  value={metric.value}
                  className="text-gold-soft font-bold text-lg"
                  duration={2}
                />
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
