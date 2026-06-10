"use client";

import { useActiveSection } from "@/hooks/useActiveSection";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavLink {
  label: string;
  href: string;
  id: string;
}

const navLinks: NavLink[] = [
  { label: "المنصة", href: "#about", id: "about" },
  { label: "الخدمات", href: "#services", id: "services" },
  { label: "الفرصة", href: "#problem", id: "problem" },
  { label: "الرحلة", href: "#steps", id: "steps" },
  { label: "الأمان", href: "#trust", id: "trust" },
];

export function Header() {
  const activeSection = useActiveSection(navLinks.map((l) => l.id));

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const offset = 80; // height of header + buffer
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="fixed top-[18px] left-1/2 -translate-x-1/2 z-[90] w-[min(1120px,calc(100%-32px))] h-16 px-[14px] flex items-center justify-between border border-line-gold rounded-lg bg-[rgba(11,19,41,0.78)] shadow-[0_18px_70px_rgba(0,0,0,0.5)] backdrop-blur-[18px]">
      {/* Brand logo */}
      <a href="#hero" className="flex items-center gap-2.5 font-bold text-white cursor-pointer">
        <span className="grid place-items-center w-9 h-9 border border-line-gold rounded-lg bg-[linear-gradient(145deg,rgba(212,166,77,0.22),rgba(255,255,255,0.02))] shadow-[inset_0_0_18px_rgba(212,166,77,0.16)] text-gold-soft">
          ن
        </span>
        <span className="text-xl tracking-wide select-none">نية</span>
      </a>

      {/* Desktop navigation links */}
      <nav className="hidden md:flex items-center justify-center gap-5 text-muted-gold text-[0.92rem] font-medium" aria-label="التنقل الرئيسي">
        {navLinks.map((link) => {
          const isActive = activeSection === link.id;
          return (
            <a
              key={link.id}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className={cn(
                "relative py-1 transition-colors duration-200 select-none",
                isActive ? "text-white font-semibold" : "hover:text-white"
              )}
            >
              {link.label}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute bottom-[-8px] right-0 left-0 h-[1.5px] bg-gold"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          );
        })}
      </nav>

      {/* Header CTA action button */}
      <a
        href="#services"
        onClick={(e) => handleScroll(e, "#services")}
        className="flex items-center gap-2 min-h-[42px] px-3.5 border border-[rgba(212,166,77,0.42)] rounded-lg bg-[rgba(212,166,77,0.12)] font-bold text-white hover:bg-white hover:text-[#030712] hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.6)] transition-all duration-300 select-none"
      >
        <Sparkles className="w-5 h-5 text-gold group-hover:text-[#030712]" />
        <span className="text-sm">ابدأ الآن</span>
      </a>
    </header>
  );
}
