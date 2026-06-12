"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Landmark, Droplets, Utensils, MapPin, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImpactSlide {
  image: string;
  title: string;
  statement: string;
  metric: string;
  metricLabel: string;
  badge: string;
  location: string;
  icon: any;
}

const impactSlides: ImpactSlide[] = [
  {
    image: "/assets/impact-umrah.jpg",
    title: "العمرة بالنيابة الموثقة",
    statement: "أداء العمرة بالنيابة عن المرضى والمتوفين بأمانة، مع تسجيل لحظي للمسار GPS وتوثيق بالفيديو والأدعية الموصى بها.",
    metric: "38,420+",
    metricLabel: "عمرة منفذة بالنيابة",
    badge: "توثيق رقمي معتمد",
    location: "مكة المكرمة • الحرم المكي",
    icon: Landmark,
  },
  {
    image: "/assets/impact-water.jpg",
    title: "حملات سقيا زمزم والماء",
    statement: "توزيع مياه زمزم والمياه المبردة على الطائفين والمعتمرين في أوقات الذروة، مع تقارير مصورة تثبت الكميات والتوزيع الميداني.",
    metric: "2.4M+",
    metricLabel: "عبوة ماء موزعة",
    badge: "تقارير كميات مصورة",
    location: "مكة المكرمة • المشاعر المقدسة",
    icon: Droplets,
  },
  {
    image: "/assets/impact-dates.jpg",
    title: "إطعام صائم وتوزيع التمور",
    statement: "توزيع وجبات الإفطار والتمور الفاخرة على ضيوف الرحمن في ساحات المسجد الحرام بالتعاون مع الجهات الخيرية المعتمدة.",
    metric: "850K+",
    metricLabel: "مستفيد من وجبات الإفطار",
    badge: "شركاء ميدانيون مرخصون",
    location: "مكة المكرمة • ساحات الحرم",
    icon: Utensils,
  },
];

export function NiyaImpactCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Timer logic for carousel transitions
  useEffect(() => {
    if (!isPlaying) return;

    const slideDuration = 6000; // 6 seconds per slide
    const steps = 100;
    const stepTime = slideDuration / steps;
    let currentStep = 0;

    setProgress(0);

    const progressInterval = setInterval(() => {
      currentStep += 1;
      setProgress((currentStep / steps) * 100);
    }, stepTime);

    const transitionTimer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % impactSlides.length);
    }, slideDuration);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(transitionTimer);
    };
  }, [activeIndex, isPlaying]);

  const activeSlide = impactSlides[activeIndex];

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center justify-between" dir="rtl">
      
      {/* Right Column: Title, Intro & Interlinked Vertical Tabs */}
      <div className="flex flex-col text-right justify-center">
        <span className="mb-3 inline-flex items-center gap-2 text-xs font-bold text-[#a37a28]">
          <span className="h-px w-8 bg-[#a37a28]" />
          من هو تطبيق نية؟
          <span className="h-px w-8 bg-[#a37a28]" />
        </span>
        <h2 className="text-3xl font-extrabold leading-snug text-slate-800 md:text-4xl">
          نحول النية إلى أثر حقيقي موثق
        </h2>
        <p className="mt-4 text-xs md:text-sm leading-relaxed text-slate-550 font-medium max-w-[580px]">
          نية ليست صفحة عرض فقط، بل تجربة تطبيق متكاملة تربط طالب الخدمة بالمشاعر المقدسة وتوثق كل خطوة إتمام بشفافية وأثر ملموس على أرض الواقع.
        </p>

        {/* Vertical/Horizontal Tab Indicators list */}
        <div className="mt-6 space-y-3 max-w-[580px]">
          {impactSlides.map((slide, idx) => {
            const Icon = slide.icon;
            const isActive = activeIndex === idx;

            return (
              <div
                key={idx}
                onClick={() => {
                  setActiveIndex(idx);
                  setProgress(0);
                }}
                className={cn(
                  "relative rounded-xl border p-3.5 text-right cursor-pointer select-none transition-all duration-300 flex items-start gap-3.5",
                  isActive
                    ? "border-[#d4a64d] bg-[#d4a64d]/5 shadow-sm"
                    : "border-slate-100 bg-white hover:border-slate-200"
                )}
              >
                {/* Active Tab loading indicator bar (Navy base, Gold loader) */}
                {isActive && (
                  <div className="absolute bottom-0 inset-x-0 h-[3px] bg-slate-100 rounded-b-xl overflow-hidden">
                    <motion.div
                      className="h-full bg-gold"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}

                <span className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-slate-50 text-slate-500 transition-colors",
                  isActive && "bg-[#d4a64d]/15 text-[#a37a28]"
                )}>
                  <Icon className="w-4.5 h-4.5" />
                </span>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h4 className="text-xs font-black text-slate-800">{slide.title}</h4>
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium leading-relaxed truncate">
                    {slide.statement}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Left Column: Premium Carousel View displaying Evidence Images */}
      <div className="relative flex justify-center items-center">
        <div className="relative w-full aspect-[4/3] max-w-[460px] rounded-2xl border border-slate-150 bg-white p-2.5 shadow-sm overflow-hidden flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.55, ease: "easeInOut" }}
              className="relative w-full h-full rounded-xl overflow-hidden group"
            >
              {/* Evidence-Based Photo */}
              <div className="relative w-full h-full">
                <Image
                  src={activeSlide.image}
                  alt={activeSlide.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 460px"
                  className="object-cover"
                />
              </div>
              {/* Ambient overlay gradient for typography readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/5" />

              {/* Verified Badge Header overlay */}
              <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur border border-[#d4a64d]/30 text-slate-800 text-[9px] font-black px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1 select-none">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#a37a28]" />
                {activeSlide.badge}
              </div>

              {/* Details card footer overlay */}
              <div className="absolute bottom-0 inset-x-0 p-5 text-right text-white select-none">
                <div className="flex justify-between items-baseline mb-2">
                  <div className="flex items-center gap-1 text-[#ead2ac] text-[9px] font-bold">
                    <MapPin className="w-3 h-3" />
                    {activeSlide.location}
                  </div>
                </div>

                <h3 className="text-sm font-extrabold">{activeSlide.title}</h3>
                <p className="text-[10px] text-slate-300 font-medium leading-relaxed mt-1.5">
                  {activeSlide.statement}
                </p>


              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}
