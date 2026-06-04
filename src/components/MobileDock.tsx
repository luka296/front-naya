"use client";

import { useActiveSection } from "@/hooks/useActiveSection";
import { Info, TrendingUp, Route, ShieldCheck, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface DockItem {
  label: string;
  href: string;
  id: string;
  icon: React.ComponentType<{ className?: string }>;
}

const dockItems: DockItem[] = [
  { label: "المنصة", href: "#about", id: "about", icon: Info },
  { label: "الفرصة", href: "#problem", id: "problem", icon: TrendingUp },
  { label: "العمل", href: "#steps", id: "steps", icon: Route },
  { label: "الأمان", href: "#trust", id: "trust", icon: ShieldCheck },
  { label: "ابدأ", href: "#cta", id: "cta", icon: Sparkles },
];

export function MobileDock() {
  const activeSection = useActiveSection(dockItems.map((item) => item.id));

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const offset = 70; // mobile header buffer
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav
      className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-[150] flex justify-around items-center w-[min(440px,calc(100%-32px))] h-16 px-2 border border-line-gold rounded-[20px] bg-[rgba(11,19,41,0.88)] shadow-[0_16px_48px_rgba(0,0,0,0.7),0_0_24px_rgba(212,166,77,0.12),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-[24px]"
      aria-label="تنقل الهاتف"
    >
      {dockItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;

        return (
          <a
            key={item.id}
            href={item.href}
            onClick={(e) => handleScroll(e, item.href)}
            className="relative flex flex-col items-center justify-center gap-0.5 flex-1 h-full text-muted-gold text-[0.7rem] font-medium cursor-pointer"
            aria-label={item.label}
          >
            {/* Active Icon Background Glow */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  layoutId="activeGlow"
                  className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(212,166,77,0.14),transparent_60%)] pointer-events-none"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
            </AnimatePresence>

            {/* Icon Wrapper with Scaling Micro-interaction */}
            <motion.div
              animate={{
                scale: isActive ? 1.15 : 1,
                y: isActive ? -2 : 0,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className="relative z-10"
            >
              <Icon
                className={cn(
                  "w-5 h-5 transition-colors duration-200",
                  isActive ? "text-gold drop-shadow-[0_0_8px_rgba(212,166,77,0.45)]" : "text-muted-gold"
                )}
              />
            </motion.div>

            {/* Text label */}
            <span
              className={cn(
                "relative z-10 text-[0.68rem] transition-colors duration-200 font-semibold",
                isActive ? "text-gold" : "text-muted-gold"
              )}
            >
              {item.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
