"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Lock, MapPin, FileCheck2, ShieldCheck, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function TrustRadarScene() {
  return (
    <div className="relative w-full aspect-square max-w-[420px] mx-auto flex items-center justify-center p-4">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,155,39,0.06)_0%,transparent_70%)] pointer-events-none" />

      {/* SVG Security Orbits and Rays */}
      <svg className="w-full h-full absolute inset-0 select-none pointer-events-none" viewBox="0 0 400 400">
        <defs>
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ead2ac" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ead2ac" />
            <stop offset="50%" stopColor="#c59b27" />
            <stop offset="100%" stopColor="#8c6a18" />
          </linearGradient>
        </defs>

        {/* Center Glow */}
        <circle cx="200" cy="200" r="120" fill="url(#centerGlow)" />

        {/* Dynamic Pulsing Concentric Ripple Rings */}
        <motion.circle
          cx="200"
          cy="200"
          r="95"
          fill="none"
          stroke="#c59b27"
          strokeWidth="1.2"
          strokeDasharray="4, 4"
          initial={{ opacity: 0.1, scale: 0.8 }}
          animate={{
            opacity: [0.3, 0.1, 0.3],
            scale: [1, 1.05, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut",
          }}
        />

        {/* Outer Orbit Ring (Slow rotation) */}
        <motion.circle
          cx="200"
          cy="200"
          r="140"
          fill="none"
          stroke="#0b192c"
          strokeWidth="1"
          strokeOpacity="0.15"
          strokeDasharray="12, 6"
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 45,
            ease: "linear",
          }}
          style={{ transformOrigin: "200px 200px" }}
        />

        {/* Inner Security Ring (Reverse rotation) */}
        <motion.circle
          cx="200"
          cy="200"
          r="65"
          fill="none"
          stroke="#0b192c"
          strokeWidth="1.5"
          strokeOpacity="0.08"
          animate={{ rotate: -360 }}
          transition={{
            repeat: Infinity,
            duration: 25,
            ease: "linear",
          }}
          style={{ transformOrigin: "200px 200px" }}
        />

        {/* Connecting Rays from Center to Nodes */}
        {/* Top Left Ray */}
        <line x1="200" y1="200" x2="80" y2="80" stroke="#c59b27" strokeWidth="1" strokeDasharray="3, 3" strokeOpacity="0.4" />
        {/* Top Right Ray */}
        <line x1="200" y1="200" x2="320" y2="80" stroke="#c59b27" strokeWidth="1" strokeDasharray="3, 3" strokeOpacity="0.4" />
        {/* Bottom Left Ray */}
        <line x1="200" y1="200" x2="80" y2="320" stroke="#c59b27" strokeWidth="1" strokeDasharray="3, 3" strokeOpacity="0.4" />
        {/* Bottom Right Ray */}
        <line x1="200" y1="200" x2="320" y2="320" stroke="#c59b27" strokeWidth="1" strokeDasharray="3, 3" strokeOpacity="0.4" />

        {/* Animated Signal Wave dots flowing along the rays */}
        <motion.circle
          r="3"
          fill="#c59b27"
          animate={{
            cx: [200, 80],
            cy: [200, 80],
            opacity: [0, 1, 0],
          }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear", delay: 0.5 }}
        />
        <motion.circle
          r="3"
          fill="#c59b27"
          animate={{
            cx: [200, 320],
            cy: [200, 80],
            opacity: [0, 1, 0],
          }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear", delay: 1.2 }}
        />
        <motion.circle
          r="3"
          fill="#c59b27"
          animate={{
            cx: [200, 80],
            cy: [200, 320],
            opacity: [0, 1, 0],
          }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear", delay: 1.8 }}
        />
        <motion.circle
          r="3"
          fill="#c59b27"
          animate={{
            cx: [200, 320],
            cy: [200, 320],
            opacity: [0, 1, 0],
          }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear", delay: 0.2 }}
        />
      </svg>

      {/* Central Shield/Vault Logo Component */}
      <motion.div
        className="relative z-10 w-24 h-24 rounded-full border border-[#d4a64d]/30 bg-white shadow-[0_12px_36px_rgba(11,25,44,0.05)] flex items-center justify-center cursor-default"
        animate={{
          boxShadow: [
            "0 12px 36px rgba(163,122,40,0.04)",
            "0 12px 48px rgba(163,122,40,0.12)",
            "0 12px 36px rgba(163,122,40,0.04)"
          ]
        }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      >
        <div className="absolute inset-2 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center">
          <ShieldCheck className="w-10 h-10 text-[#a37a28]" />
        </div>
        
        {/* Expanding circle wave */}
        <motion.div
          className="absolute inset-0 rounded-full border border-[#c59b27]/40 pointer-events-none"
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeOut" }}
        />
      </motion.div>

      {/* Absolutely Overlayed Nodes */}
      {/* Node 1: Top-Right (GPS Validation) */}
      <motion.div
        className="absolute top-6 right-6 z-20 flex flex-col items-center gap-1.5"
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.2 }}
      >
        <div className="w-9 h-9 rounded-full border border-slate-150 bg-white shadow-sm flex items-center justify-center text-slate-800 hover:border-[#d4a64d]/30 transition-all duration-300">
          <MapPin className="w-4 h-4 text-[#a37a28]" />
        </div>
        <span className="text-[10px] font-bold text-slate-800 bg-white px-2 py-0.5 rounded-full border border-slate-100 shadow-sm whitespace-nowrap">
          مزامنة GPS
        </span>
      </motion.div>

      {/* Node 2: Top-Left (Payment Encryption) */}
      <motion.div
        className="absolute top-6 left-6 z-20 flex flex-col items-center gap-1.5"
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.9 }}
      >
        <div className="w-9 h-9 rounded-full border border-slate-150 bg-white shadow-sm flex items-center justify-center text-slate-800 hover:border-[#d4a64d]/30 transition-all duration-300">
          <Lock className="w-4 h-4 text-[#a37a28]" />
        </div>
        <span className="text-[10px] font-bold text-slate-800 bg-white px-2 py-0.5 rounded-full border border-slate-100 shadow-sm whitespace-nowrap">
          تشفير المعاملات
        </span>
      </motion.div>

      {/* Node 3: Bottom-Left (Verification Reports) */}
      <motion.div
        className="absolute bottom-6 left-6 z-20 flex flex-col items-center gap-1.5"
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 1.6 }}
      >
        <div className="w-9 h-9 rounded-full border border-slate-150 bg-white shadow-sm flex items-center justify-center text-slate-800 hover:border-[#d4a64d]/30 transition-all duration-300">
          <FileCheck2 className="w-4 h-4 text-[#a37a28]" />
        </div>
        <span className="text-[10px] font-bold text-slate-800 bg-white px-2 py-0.5 rounded-full border border-slate-100 shadow-sm whitespace-nowrap">
          تقارير إتمام موثقة
        </span>
      </motion.div>

      {/* Node 4: Bottom-Right (Independent Audit) */}
      <motion.div
        className="absolute bottom-6 right-6 z-20 flex flex-col items-center gap-1.5"
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 2.3 }}
      >
        <div className="w-9 h-9 rounded-full border border-slate-150 bg-white shadow-sm flex items-center justify-center text-slate-800 hover:border-[#d4a64d]/30 transition-all duration-300">
          <div className="relative w-4 h-4 flex items-center justify-center">
            <Check className="w-3.5 h-3.5 text-[#a37a28] stroke-[3]" />
          </div>
        </div>
        <span className="text-[10px] font-bold text-slate-800 bg-white px-2 py-0.5 rounded-full border border-slate-100 shadow-sm whitespace-nowrap">
          تدقيق واعتماد مستقل
        </span>
      </motion.div>

      {/* Bottom Info Badges */}
      <div className="absolute bottom-1 bg-emerald-50 border border-emerald-100 text-emerald-700 text-[9px] font-extrabold px-3 py-1 rounded-full shadow-sm flex items-center gap-1 select-none pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        مؤشر موثوقية البنية الأساسية: 100%
      </div>
    </div>
  );
}
