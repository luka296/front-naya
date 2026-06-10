"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, TrendingUp, Users, Globe, Award } from "lucide-react";
import { cn } from "@/lib/utils";

import { useData } from "@/context/DataContext";

interface Dataset {
  id: string;
  name: string;
  nameEn: string;
  color: string;
  glowColor: string;
  points: number[];
  metric: string;
  metricLabel: string;
}

export default function MarketLeaderboardChart() {
  const { data } = useData();
  const datasets = data.leaderboardDatasets;
  const [progress, setProgress] = useState(0); // 0 to 1
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1); // multiplier
  const [hoveredLine, setHoveredLine] = useState<string | null>(null);

  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);

  // Animation loop
  useEffect(() => {
    const animate = (time: number) => {
      if (previousTimeRef.current !== undefined && previousTimeRef.current !== null) {
        const deltaTime = (time - previousTimeRef.current) / 1000;
        if (isPlaying) {
          setProgress((prev) => {
            const next = prev + (deltaTime / 14) * speed; // 14 seconds for full animation
            if (next >= 1) {
              setIsPlaying(false);
              return 1;
            }
            return next;
          });
        }
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, speed]);

  const handleReplay = () => {
    setProgress(0);
    previousTimeRef.current = null;
    setIsPlaying(true);
  };

  // SVG Chart Specs
  const width = 600;
  const height = 350;
  const padLeft = 60;
  const padRight = 30;
  const padTop = 40;
  const padBottom = 40;
  
  const activeW = width - padLeft - padRight;
  const activeH = height - padTop - padBottom;

  const currentMonth = progress * 12;

  const getX = (month: number) => padLeft + (month / 12) * activeW;
  const getY = (val: number) => height - padBottom - (val / 0.8) * activeH;

  // Interpolated values for current progress
  const getInterpolatedValue = (points: number[], current: number) => {
    const idx = Math.floor(current);
    if (idx >= 12) return points[12];
    const t = current - idx;
    return points[idx] * (1 - t) + points[idx + 1] * t;
  };

  // Generate SVG path for a dataset up to the current progress
  const getPathD = (points: number[], current: number) => {
    const idx = Math.floor(current);
    let d = `M ${getX(0)} ${getY(points[0])}`;
    for (let i = 1; i <= idx; i++) {
      d += ` L ${getX(i)} ${getY(points[i])}`;
    }
    if (idx < 12) {
      const nextX = getX(current);
      const nextVal = getInterpolatedValue(points, current);
      const nextY = getY(nextVal);
      d += ` L ${nextX} ${nextY}`;
    }
    return d;
  };

  // Live total opportunity calculation (animates up to 7.0T)
  const currentOpportunity = (progress * 7.0).toFixed(1);

  return (
    <div className="relative w-full rounded-xl border border-[#d4a64d24] bg-[#060b13]/90 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
      {/* Top cyan progress bar */}
      <div className="absolute left-0 right-0 top-0 h-[3px] overflow-hidden bg-slate-900 rounded-t-xl">
        <div
          className="h-full bg-cyan-400 transition-all duration-100 ease-out shadow-[0_0_12px_rgba(34,211,238,0.8)]"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Header section */}
      <div className="mb-6 flex flex-col justify-between gap-4 border-b border-[#d4a64d12] pb-4 sm:flex-row sm:items-center" dir="rtl">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-cyan-500 shadow-[0_0_8px_#06b6d4]" />
            <h4 className="text-base font-extrabold text-white">
              مؤشر فرصة السوق الحية لمنصة نية
            </h4>
          </div>
          <p className="mt-1 text-xs text-slate-400 font-medium">
            مؤشر التحول الرقمي وتوقعات النمو خلال 12 شهراً
          </p>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-3" dir="ltr">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] hover:text-white transition-all cursor-pointer"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <button
            onClick={handleReplay}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] hover:text-white transition-all cursor-pointer"
            title="Replay"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <div className="flex rounded-md border border-white/10 bg-white/[0.02] p-0.5">
            {[1, 2].map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={cn(
                  "px-2 py-0.5 text-[10px] font-mono rounded transition-all cursor-pointer",
                  speed === s ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/20" : "text-slate-400 hover:text-white"
                )}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Layout: Full-Width Chart first, then Horizontal Cards underneath */}
      <div className="space-y-6">
        {/* Dynamic Chart (Full Width) */}
        <div className="relative min-h-[350px] w-full select-none rounded-xl bg-[#030712]/50 p-4 border border-white/[0.03]">
          {/* Big number counter overlay */}
          <div className="absolute right-6 top-6 z-10 pointer-events-none text-right" dir="rtl">
            <div className="flex items-baseline gap-1.5 justify-start">
              <span className="text-3xl sm:text-4xl font-black text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                {currentOpportunity} تريليون $
              </span>
              <span className="text-slate-500 text-xs">/ 7.0 تريليون $</span>
            </div>
            <p className="mt-1.5 text-[10px] font-bold text-slate-450 tracking-wide">
              فرصة الاقتصاد الإسلامي المستهدفة
            </p>
          </div>

          {/* SVG Canvas */}
          <svg className="w-full h-auto" viewBox={`0 0 ${width} ${height}`}>
            {/* Grid Background */}
            <g opacity="0.07" stroke="#ffffff" strokeWidth="1">
              {/* Horizontal lines */}
              {[0, 0.2, 0.4, 0.6, 0.8].map((val) => (
                <line key={val} x1={padLeft} y1={getY(val)} x2={width - padRight} y2={getY(val)} />
              ))}
              {/* Vertical lines */}
              {[0, 3, 6, 9, 12].map((month) => (
                <line key={month} x1={getX(month)} y1={padTop} x2={getX(month)} y2={height - padBottom} />
              ))}
            </g>

            {/* Axes labels */}
            <g className="text-[10px] fill-slate-500 font-mono">
              {/* Y Axis labels */}
              {[0, 0.2, 0.4, 0.6, 0.8].map((val) => (
                <text key={val} x={padLeft - 12} y={getY(val) + 4} textAnchor="end">
                  {val.toFixed(1)}
                </text>
              ))}
              {/* X Axis labels */}
              {[0, 3, 6, 9, 12].map((month) => (
                <text key={month} x={getX(month)} y={height - padBottom + 18} textAnchor="middle">
                  M{month}
                </text>
              ))}
              <text x={width / 2} y={height - 5} textAnchor="middle" className="text-[9px] fill-slate-400 font-bold">
                المدى الزمني للتوقعات (بالأشهر)
              </text>
            </g>

            {/* Dotted Red Baseline Line */}
            <line
              x1={padLeft}
              y1={getY(0.6)}
              x2={width - padRight}
              y2={getY(0.6)}
              stroke="#ef4444"
              strokeDasharray="4 4"
              strokeWidth="1.5"
              opacity="0.5"
            />
            <text
              x={width - padRight - 5}
              y={getY(0.6) - 5}
              textAnchor="end"
              className="text-[9px] fill-red-400 font-bold opacity-80"
            >
              الحد الأدنى للفرصة (0.6)
            </text>

            {/* Animated Data Lines */}
            {datasets.map((dataset) => {
              const isHovered = hoveredLine === dataset.id;
              const isAnyHovered = hoveredLine !== null;
              const pathD = getPathD(dataset.points, currentMonth);

              return (
                <g
                  key={dataset.id}
                  onMouseEnter={() => setHoveredLine(dataset.id)}
                  onMouseLeave={() => setHoveredLine(null)}
                  className="cursor-pointer"
                >
                  {/* Glowing background stroke */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke={dataset.color}
                    strokeWidth={isHovered ? 6 : 4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={isHovered ? 0.75 : isAnyHovered ? 0.15 : 0.4}
                    style={{
                      filter: `drop-shadow(0 0 8px ${dataset.color})`,
                    }}
                  />
                  {/* Core solid stroke */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke={dataset.color}
                    strokeWidth={isHovered ? 3.5 : 2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={isHovered ? 1 : isAnyHovered ? 0.25 : 0.9}
                  />
                </g>
              );
            })}

            {/* Vertical scanning line */}
            {progress > 0 && (
              <line
                x1={getX(currentMonth)}
                y1={padTop}
                x2={getX(currentMonth)}
                y2={height - padBottom}
                stroke="#22d3ee"
                strokeWidth="1.5"
                opacity="0.8"
                style={{
                  filter: "drop-shadow(0 0 4px rgba(34,211,238,0.8))",
                }}
              />
            )}

            {/* Pulsing Intersection Dots and Floating Pills */}
            {progress > 0 &&
              datasets.map((dataset, idx) => {
                const currentVal = getInterpolatedValue(dataset.points, currentMonth);
                const cx = getX(currentMonth);
                const cy = getY(currentVal);
                const isHovered = hoveredLine === dataset.id;
                const isAnyHovered = hoveredLine !== null;
                const opacity = isHovered ? 1 : isAnyHovered ? 0.2 : 0.8;

                return (
                  <g key={dataset.id} className="transition-opacity duration-200" opacity={opacity}>
                    {/* Glowing outer circle */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r="7"
                      fill={dataset.color}
                      className="animate-ping"
                      opacity="0.4"
                    />
                    {/* Inner core circle */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r="4"
                      fill="#ffffff"
                      stroke={dataset.color}
                      strokeWidth="2.5"
                    />

                    {/* Floating Value Pill */}
                    <g transform={`translate(${cx + 10}, ${cy - 8})`}>
                      <rect
                        width="38"
                        height="16"
                        rx="3"
                        fill="#0b1329"
                        stroke={dataset.color}
                        strokeWidth="1"
                        opacity="0.95"
                      />
                      <text
                        x="19"
                        y="11"
                        textAnchor="middle"
                        fill="#ffffff"
                        className="text-[9px] font-bold font-mono"
                      >
                        {currentVal.toFixed(3)}
                      </text>
                    </g>
                  </g>
                );
              })}
          </svg>
        </div>

        {/* Horizontal Cards underneath */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {datasets.map((dataset, idx) => {
            const currentVal = getInterpolatedValue(dataset.points, currentMonth);
            const isHovered = hoveredLine === dataset.id;
            const isFirst = idx === 0;

            return (
              <div
                key={dataset.id}
                onMouseEnter={() => setHoveredLine(dataset.id)}
                onMouseLeave={() => setHoveredLine(null)}
                className={cn(
                  "relative flex flex-col justify-between rounded-xl border p-4 transition-all duration-300 select-none cursor-pointer",
                  isHovered
                    ? "border-[#d4a64d] bg-[#d4a64d]/[0.06] shadow-[0_0_16px_rgba(212,166,77,0.2)] scale-[1.03]"
                    : "border-white/[0.05] bg-[#0b1329]/40 hover:border-white/15 hover:bg-[#0b1329]/60",
                  isFirst && !isHovered && "border-[#d4a64d]/30"
                )}
              >
                {/* Rank & Current Live Score row */}
                <div className="flex items-center justify-between mb-3" dir="rtl">
                  <span className="text-xs font-mono font-extrabold text-gold">
                    {currentVal.toFixed(3)}
                  </span>
                  <span
                    className={cn(
                      "flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold font-mono",
                      isFirst ? "bg-[#eab308] text-[#030712]" : "bg-white/5 text-slate-400"
                    )}
                  >
                    #{idx + 1}
                  </span>
                </div>

                {/* Color Dot & Value & Name info */}
                <div className="text-right" dir="rtl">
                  <div className="flex items-center gap-2 mb-1 justify-start">
                    <span
                      className="h-2 w-2 rounded-full shadow-[0_0_6px_currentColor] shrink-0"
                      style={{
                        backgroundColor: dataset.color,
                        color: dataset.color,
                      }}
                    />
                    <h5 className="text-sm font-black text-white leading-none">
                      {dataset.metric}
                    </h5>
                  </div>
                  <p className="text-[11px] text-slate-400 font-bold leading-normal mt-1.5">
                    {dataset.name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Info text at the bottom */}
        <div className="mt-4 border-t border-[#d4a64d12] pt-4 text-xs leading-6 text-slate-400 text-right" dir="rtl">
          <span className="font-extrabold text-[#f2d58e]">مؤشر الاقتصاد الرقمي:</span>
          {" يوضح النمو التصاعدي المتوقع للمنصة وتكاملها مع الفرص السوقية للخدمات الإسلامية."}
        </div>
      </div>
    </div>
  );
}
