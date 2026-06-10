"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings } from "lucide-react";
import { motion } from "framer-motion";

export function AdminTrigger() {
  const pathname = usePathname();

  // Hide the floating button if we are on the admin page itself
  if (pathname === "/admin") return null;

  return (
    <div className="fixed bottom-6 left-6 z-[999] pointer-events-auto">
      <Link href="/admin">
        <motion.button
          whileHover={{ scale: 1.1, rotate: 45 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-[#d4a64d55] bg-[#0b1329] text-gold-soft shadow-[0_12px_36px_rgba(0,0,0,0.5),0_0_20px_rgba(212,166,77,0.25)] hover:text-white transition-colors duration-200 cursor-pointer"
          aria-label="لوحة التحكم"
        >
          <Settings className="w-6 h-6 animate-spin-slow" />
          
          {/* Tooltip */}
          <span className="absolute right-16 top-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition-all duration-200 origin-right rounded-lg border border-[#d4a64d33] bg-[#0b1329]/95 px-3 py-1.5 text-xs font-bold text-[#ead2ac] whitespace-nowrap shadow-lg">
            لوحة التحكم (Admin Panel)
          </span>
        </motion.button>
      </Link>
    </div>
  );
}
