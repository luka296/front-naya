"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";
import { Users, Landmark, TrendingUp, Play, Pause, RotateCcw, ArrowLeftRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Decimals-handling count-up helper
function Counter({
  from,
  to,
  duration = 1.2,
  decimals = 1,
  suffix = "",
}: {
  from: number;
  to: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    const controls = animate(from, to, {
      duration: duration,
      ease: "easeOut",
      onUpdate(value) {
        setCount(value);
      },
    });
    return () => controls.stop();
  }, [from, to, duration]);

  return (
    <span>
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

interface MarketStat {
  value: number;
  decimals: number;
  suffix: string;
  label: string;
  sub: string;
  percentage: number;
  color: string;
  icon: any;
}

const statsData: MarketStat[] = [
  {
    value: 7.0,
    decimals: 1,
    suffix: "T$",
    label: "حجم الاقتصاد الإسلامي",
    sub: "حجم سوق السلع والخدمات والتمويل الإسلامي المتوافق",
    percentage: 100,
    color: "#c59b27", // Gold
    icon: TrendingUp,
  },
  {
    value: 2.0,
    decimals: 1,
    suffix: "B+",
    label: "المسلمون حول العالم",
    sub: "القاعدة الاستهلاكية والشرائح الديموغرافية المستهدفة عالمياً",
    percentage: 75,
    color: "#0b192c", // Navy
    icon: Users,
  },
  {
    value: 30.0,
    decimals: 0,
    suffix: "M+",
    label: "المعتمرون المستهدفون",
    sub: "مستهدف رؤية السعودية 2030 لتسهيل استضافة ضيوف الرحمن",
    percentage: 50,
    color: "#1e293b", // Navy Soft
    icon: Landmark,
  },
];

export default function MarketLeaderboardChart() {
  const [currentIndex, setCurrentIndex] = useState(0); // 0, 1, 2, 3 (3 is the pause/summary state)
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0); // progress bar for current slide
  
  // Timer handler for loop and progress animation
  useEffect(() => {
    if (!isPlaying) return;

    const totalDuration = currentIndex === 3 ? 3000 : 5000;
    const steps = 100;
    const stepTime = totalDuration / steps;
    let currentStep = 0;

    setProgress(0);

    const progressInterval = setInterval(() => {
      currentStep += 1;
      setProgress((currentStep / steps) * 100);
    }, stepTime);

    const transitionTimer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % 4);
    }, totalDuration);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(transitionTimer);
    };
  }, [currentIndex, isPlaying]);

  const handlePauseToggle = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setProgress(0);
    setIsPlaying(true);
  };

  // Get active item or summary info
  const isActiveSummary = currentIndex === 3;
  const currentStat = !isActiveSummary ? statsData[currentIndex] : null;

  return (
    <div className="relative w-full rounded-2xl border border-slate-150 bg-white p-5 shadow-[0_12px_48px_rgba(0,0,0,0.02)] flex flex-col justify-between h-[390px]" dir="rtl">
      
      {/* Top dashboard control bar */}
      <div className="flex justify-between items-center border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse shadow-[0_0_8px_#c59b27]" />
          <h4 className="text-xs font-black text-slate-800">تحليل وتوقعات الفرصة السوقية الحية</h4>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5" dir="ltr">
          <button
            onClick={handlePauseToggle}
            className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-150 bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-all cursor-pointer shadow-sm"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={handleReset}
            className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-150 bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-all cursor-pointer shadow-sm"
            title="إعادة التشغيل"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-[0.7fr_1.3fr_0.7fr] gap-4 items-center py-3">
        
        {/* Flanking Card Left */}
        <div className="hidden md:block">
          <FlankingCard
            stat={statsData[0]}
            isActive={currentIndex === 0}
            isSummary={isActiveSummary}
            onClick={() => {
              setCurrentIndex(0);
              setProgress(0);
            }}
          />
        </div>

        {/* Central Dynamic Gauge/Counter */}
        <div className="flex flex-col items-center justify-center text-center">
          <div className="relative w-48 h-48 flex items-center justify-center">
            
            {/* SVG Circular Progress Gauge */}
            <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="#f1f5f9"
                strokeWidth="4"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="url(#gaugeGold)"
                strokeWidth="4.5"
                strokeDasharray="276"
                initial={{ strokeDashoffset: 276 }}
                animate={{
                  strokeDashoffset: isActiveSummary
                    ? 0
                    : 276 - (276 * currentStat!.percentage) / 100,
                }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="gaugeGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ead2ac" />
                  <stop offset="100%" stopColor="#c59b27" />
                </linearGradient>
              </defs>
            </svg>

            {/* Central numbers container */}
            <div className="z-10 flex flex-col items-center justify-center p-3 select-none">
              <AnimatePresence mode="wait">
                {isActiveSummary ? (
                  <motion.div
                    key="summary"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center"
                  >
                    <span className="text-2xl font-black text-slate-800">نية</span>
                    <span className="text-[9px] font-bold text-gold uppercase tracking-wider mt-1">
                      ربط الأثر بالفرصة
                    </span>
                  </motion.div>
                ) : (
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="flex flex-col items-center"
                  >
                    {currentStat && (
                      <>
                        <span className="text-[#a37a28] font-black text-4xl tracking-tight drop-shadow-sm">
                          <Counter
                            from={0}
                            to={currentStat.value}
                            decimals={currentStat.decimals}
                            suffix={currentStat.suffix}
                          />
                        </span>
                        <span className="text-[10px] font-extrabold text-slate-800 max-w-[120px] leading-relaxed mt-1.5">
                          {currentStat.label}
                        </span>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Flanking Card Right */}
        <div className="hidden md:block">
          <FlankingCard
            stat={statsData[1]}
            isActive={currentIndex === 1}
            isSummary={isActiveSummary}
            onClick={() => {
              setCurrentIndex(1);
              setProgress(0);
            }}
          />
        </div>
      </div>

      {/* Bottom pagination & timeline indicators */}
      <div className="flex flex-col gap-2.5">
        
        {/* Horizontal details subtext */}
        <div className="text-center min-h-[32px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-[11px] text-slate-500 font-bold leading-relaxed max-w-[500px]"
            >
              {isActiveSummary
                ? "دورة إحصائية كاملة. منصة نية تسد فجوة الشفافية في هذا الاقتصاد الضخم."
                : currentStat!.sub}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Timeline dots indicators */}
        <div className="flex items-center justify-center gap-2">
          {statsData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx);
                setProgress(0);
              }}
              className="relative h-1.5 rounded-full overflow-hidden bg-slate-100 transition-all duration-300 cursor-pointer"
              style={{ width: currentIndex === idx ? "36px" : "8px" }}
            >
              {currentIndex === idx && (
                <motion.div
                  className="h-full bg-gold"
                  style={{ width: `${progress}%` }}
                />
              )}
            </button>
          ))}
          
          {/* Pause slide dot indicator */}
          <button
            onClick={() => {
              setCurrentIndex(3);
              setProgress(0);
            }}
            className="relative h-1.5 rounded-full overflow-hidden bg-slate-100 transition-all duration-300 cursor-pointer"
            style={{ width: currentIndex === 3 ? "36px" : "8px" }}
          >
            {currentIndex === 3 && (
              <motion.div
                className="h-full bg-[#0b192c]"
                style={{ width: `${progress}%` }}
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// Helper component for flanking cards
function FlankingCard({
  stat,
  isActive,
  isSummary,
  onClick,
}: {
  stat: MarketStat;
  isActive: boolean;
  isSummary: boolean;
  onClick: () => void;
}) {
  const Icon = stat.icon;

  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-xl border p-3.5 text-center cursor-pointer transition-all duration-500 flex flex-col items-center gap-2",
        isActive && !isSummary
          ? "border-[#d4a64d] bg-[#d4a64d]/5 scale-105 shadow-sm"
          : "border-slate-100 bg-white hover:border-slate-200 opacity-60 hover:opacity-95"
      )}
    >
      <span className={cn(
        "grid h-8 w-8 place-items-center rounded-lg bg-slate-50 text-slate-600 transition-colors",
        isActive && "bg-[#d4a64d]/15 text-[#a37a28]"
      )}>
        <Icon className="w-4 h-4" />
      </span>
      <div>
        <h5 className="text-xs font-black text-slate-800 leading-tight">
          {stat.value}
          {stat.suffix}
        </h5>
        <p className="text-[9px] font-bold text-slate-500 mt-1 leading-snug">
          {stat.label}
        </p>
      </div>
    </div>
  );
}
