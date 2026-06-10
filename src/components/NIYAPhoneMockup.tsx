"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Compass,
  BookOpen,
  Heart,
  Home,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ChevronLeft,
  Timer,
  BadgeCheck,
  ArrowRightLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Slides for onboarding (taken from onboarding_page.dart)
const onboardingSlides = [
  {
    title: "نية | Niya",
    subtitle: "إخلاص النية | Purity of Intent",
    description: "منصة إسلامية متكاملة لتقديم خدمات العبادات بالنيابة والأعمال الخيرية بأعلى معايير الشفافية والتقنية الحديثة.",
    icon: Sparkles,
  },
  {
    title: "العمرة بالنيابة",
    subtitle: "أمانة مقدسة | Sacred Trusts",
    description: "أداء العمرة عن المرضى أو المتوفين عبر شبكة من الطلبة والموثوقين داخل المشاعر المقدسة مع توثيق رقمي كامل.",
    icon: ShieldCheck,
  },
  {
    title: "الأثر والشفافية",
    subtitle: "تتبع رقمي موثق | Real-time Tracking",
    description: "تابع كافة مراحل طلبك (ماء، تمر، عمرة) لحظة بلحظة بالتقارير والصور الموثقة مباشرة من مكة المكرمة.",
    icon: CheckCircle2,
  },
];

// Quran Surahs for the Quran tab
const quranSurahs = [
  {
    name: "سورة الفاتحة",
    verses: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ (١) الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ (٢) الرَّحْمَنِ الرَّحِيمِ (٣) مَالِكِ يَوْمِ الدِّينِ (٤) إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ (٥) اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ (٦) صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ (٧)",
  },
  {
    name: "سورة يس",
    verses: "يس (١) وَالْقُرْآنِ الْحَكِيمِ (٢) إِنَّكَ لَمِنَ الْمُرْسَلِينَ (٣) عَلَى صِرَاطٍ مُسْتَقِيمٍ (٤) تَنْزِيلَ الْعَزِيزِ الرَّحِيمِ (٥) لِتُنْذِرَ قَوْمًا مَا أُنْذِرَ آبَاؤُهُمْ فَهُمْ غَافِلُونَ (٦)",
  },
  {
    name: "سورة الملك",
    verses: "تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ (١) الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا وَهُوَ الْعَزِيزُ الْغَفُورُ (٢)",
  },
];

export function NIYAPhoneMockup() {
  const [appStep, setAppStep] = useState<"splash" | "onboarding" | "home">("splash");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState<"home" | "services" | "qibla" | "quran">("home");
  const [orderedService, setOrderedService] = useState<string | null>(null);
  const [selectedSurah, setSelectedSurah] = useState<typeof quranSurahs[0] | null>(null);

  // Auto transition splash -> onboarding after 2.2 seconds
  useEffect(() => {
    if (appStep === "splash") {
      const timer = setTimeout(() => {
        setAppStep("onboarding");
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [appStep]);

  // Handle slide controls
  const nextSlide = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      setAppStep("home");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 34, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
      className="relative mx-auto w-[min(320px,88vw)] select-none"
    >
      <div className="relative z-10 p-2 rounded-[44px] border border-[#d4a64d33] bg-[#0b0d10] shadow-[0_42px_110px_rgba(0,0,0,0.85)]">
        <div className="relative min-h-[640px] overflow-hidden rounded-[36px] border border-white/10 bg-[#060913] text-white">
          <div className="absolute inset-0 bg-[linear-gradient(150deg,rgba(212,166,77,0.08),transparent_40%)]" />
          <div className="absolute inset-x-16 top-3 z-50 h-5 rounded-full bg-black/95" />

          {/* Interactive Screen States */}
          <div className="relative z-10 flex min-h-[620px] flex-col p-4 pt-8 text-right">
            <AnimatePresence mode="wait">
              {/* 1. SPLASH SCREEN */}
              {appStep === "splash" && (
                <motion.div
                  key="splash"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center min-h-[560px] text-center"
                >
                  <motion.h1 
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="text-gold text-7xl font-extrabold drop-shadow-[0_0_24px_rgba(212,166,77,0.4)]"
                  >
                    نية
                  </motion.h1>
                  <p className="text-xs tracking-wider text-slate-400 mt-4">NIYA APP</p>
                  <p className="text-[10px] text-[#ead2ac] mt-1">Sacred Worship & Safety Ecosystem</p>
                  <div className="mt-20 w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin" />
                </motion.div>
              )}

              {/* 2. ONBOARDING SCREEN */}
              {appStep === "onboarding" && (
                <motion.div
                  key="onboarding"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col justify-between min-h-[570px] text-center pt-4"
                >
                  <div>
                    <h2 className="text-gold text-4xl font-extrabold mb-10 drop-shadow-[0_0_12px_rgba(212,166,77,0.3)]">نية</h2>
                    
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="rounded-2xl border border-[#d4a64d1f] bg-[#0b1329]/80 p-5 mt-4"
                    >
                      {React.createElement(onboardingSlides[currentSlide].icon, {
                        className: "w-12 h-12 text-gold mx-auto mb-6 drop-shadow-[0_0_10px_rgba(212,166,77,0.3)]"
                      })}
                      <h3 className="text-lg font-bold text-white mb-1">{onboardingSlides[currentSlide].title}</h3>
                      <h4 className="text-xs text-gold mb-3">{onboardingSlides[currentSlide].subtitle}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed px-2">{onboardingSlides[currentSlide].description}</p>
                    </motion.div>
                  </div>

                  <div className="flex items-center justify-between mt-8" dir="rtl">
                    <div className="flex gap-1.5">
                      {onboardingSlides.map((_, i) => (
                        <div
                          key={i}
                          className={cn(
                            "h-2 rounded-full transition-all duration-300",
                            currentSlide === i ? "w-6 bg-gold" : "w-2 bg-slate-700"
                          )}
                        />
                      ))}
                    </div>

                    <button
                      onClick={nextSlide}
                      className="min-w-24 px-4 py-2 text-xs font-bold text-[#030712] bg-gradient-to-r from-[#ead2ac] to-[#d4a64d] rounded-lg shadow-lg"
                    >
                      {currentSlide === onboardingSlides.length - 1 ? "ابدأ الآن" : "التالي"}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* 3. HOME / INTERACTIVE NAV SYSTEM */}
              {appStep === "home" && (
                <motion.div
                  key="home"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col justify-between min-h-[580px]"
                >
                  {/* APP HEADER */}
                  <header className="flex items-center justify-between mb-4 border-b border-white/5 pb-3 pt-1">
                    <button
                      onClick={() => setAppStep("splash")}
                      className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-[#d4a64d] text-[10px] font-bold"
                    >
                      خروج
                    </button>
                    <div className="text-center">
                      <span className="text-lg font-black text-white">نية</span>
                      <p className="text-[9px] text-[#ead2ac] -mt-1 font-medium">عمل موثق وأجر دائم</p>
                    </div>
                    <div className="grid h-8 w-8 place-items-center rounded-full border border-[#d4a64d33] bg-[#d4a64d12] text-xs font-bold text-gold">
                      أ
                    </div>
                  </header>

                  {/* ACTIVE TAB VIEWS */}
                  <div className="flex-1 overflow-y-auto max-h-[440px] pr-0.5 space-y-3 scrollbar-none">
                    
                    {/* TAB A: HOME SCREEN */}
                    {activeTab === "home" && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">


                        {/* Recent Status Update */}
                        <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3 text-right">
                          <h4 className="text-xs font-extrabold text-white mb-2">تتبع عمرة النيابة النشطة</h4>
                          <div className="space-y-2 text-[10px]">
                            {[
                              { label: "استلام الطلب", status: "مكتمل" },
                              { label: "الربط مع الشريك الميداني", status: "مكتمل" },
                              { label: "الطواف والسعي", status: "قيد التنفيذ" },
                              { label: "توثيق التقرير النهائي", status: "انتظار" },
                            ].map((step, idx) => (
                              <div key={idx} className="flex justify-between items-center" dir="rtl">
                                <span className={cn(
                                  "w-4 h-4 rounded-full border grid place-items-center text-[9px]",
                                  step.status === "مكتمل" ? "border-emerald-500 bg-emerald-500/10 text-emerald-300" :
                                  step.status === "قيد التنفيذ" ? "border-gold bg-gold/10 text-gold animate-pulse" : "border-white/10 text-slate-500"
                                )}>
                                  {idx + 1}
                                </span>
                                <span className="flex-1 mr-2.5 text-slate-300">{step.label}</span>
                                <span className={step.status === "قيد التنفيذ" ? "text-gold font-bold" : "text-slate-500"}>{step.status}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* TAB B: SERVICES SCREEN */}
                    {activeTab === "services" && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                        <p className="text-xs font-bold text-slate-400 text-right mb-1">الخدمات المتاحة للطلب</p>
                        
                        {orderedService ? (
                          <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-5 text-center space-y-4">
                            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                            <h4 className="text-sm font-bold text-white">تم استلام طلبك بنجاح!</h4>
                            <p className="text-xs text-slate-300 leading-relaxed">
                              لقد بدأت نيتك رحلتها للتنفيذ في مكة. يمكنك متابعة التحديثات والتقارير من لوحة البيانات.
                            </p>
                            <button
                              onClick={() => setOrderedService(null)}
                              className="px-4 py-1.5 bg-emerald-500 text-[#030712] font-bold rounded-lg text-xs"
                            >
                              طلب خدمة أخرى
                            </button>
                          </div>
                        ) : (
                          [
                            { title: "عمرة بالنيابة عن متوفى أو مريض", price: "1300 ريال", desc: "ينفذها طلاب علم وموثقون بالكامل بالصور وفيديو الدعاء.", type: "umrah" },
                            { title: "سقيا الماء في الحرم المكي", price: "6 ريال / عبوة", desc: "توزيع مياه زمزم ومياه نقية لضيوف الرحمن في المشاعر.", type: "water" },
                            { title: "توزيع التمور لضيوف الرحمن", price: "8 ريال / علبة", desc: "صدقة إطعام للصائمين والمعتمرين بالمسجد الحرام.", type: "dates" },
                          ].map((srv, idx) => (
                            <div
                              key={idx}
                              className="rounded-xl border border-white/5 bg-white/[0.03] p-3 text-right hover:border-gold/30 transition-all duration-300"
                            >
                              <div className="flex justify-between items-start" dir="rtl">
                                <h4 className="text-xs font-extrabold text-white">{srv.title}</h4>
                                <span className="text-[10px] font-bold text-gold shrink-0">{srv.price}</span>
                              </div>
                              <p className="text-[10px] text-slate-400 mt-1.5 leading-relaxed">{srv.desc}</p>
                              <div className="flex justify-end mt-3">
                                <button
                                  onClick={() => setOrderedService(srv.title)}
                                  className="px-3 py-1 bg-gold/10 hover:bg-gold hover:text-[#030712] border border-gold/30 text-gold font-bold text-[10px] rounded transition-all"
                                >
                                  أرسل نيتك الآن
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </motion.div>
                    )}

                    {/* TAB C: QIBLA COMPASS SCREEN */}
                    {activeTab === "qibla" && (
                      <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        className="flex flex-col items-center justify-center min-h-[300px] text-center"
                      >
                        <p className="text-xs font-bold text-gold mb-4">بوصلة القبلة الذكية</p>
                        
                        {/* Rotating Compass Graphic */}
                        <div className="relative w-40 h-40 rounded-full border border-[#d4a64d40] bg-[#0b1329] flex items-center justify-center animate-pulse-gold shadow-[0_0_24px_rgba(212,166,77,0.15)]">
                          <motion.div
                            animate={{ rotate: [0, 8, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                            className="absolute inset-2 border border-dashed border-gold/30 rounded-full"
                          />
                          <motion.div 
                            animate={{ rotate: [-20, -16, -24, -20] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="w-full h-full relative"
                          >
                            {/* Compass Needle pointing north-east */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-24 bg-gradient-to-b from-gold via-gold/50 to-transparent rounded-full" />
                            <div className="absolute top-3 left-1/2 -translate-x-1/2 text-gold font-extrabold text-[10px]">كعبة</div>
                          </motion.div>
                          <div className="absolute w-3 h-3 rounded-full bg-white border border-gold" />
                        </div>

                        <p className="text-xs text-white font-extrabold mt-6">اتجاه القبلة: ٢١.٤° شرق الشمال</p>
                        <p className="text-[10px] text-slate-400 mt-1">اضبط الهاتف لمطابقة المؤشر مع اتجاه الكعبة</p>
                      </motion.div>
                    )}

                    {/* TAB D: QURAN SCREEN */}
                    {activeTab === "quran" && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                        <p className="text-xs font-bold text-slate-400 text-right mb-1">الورد اليومي والقرآن الكريم</p>
                        
                        {selectedSurah ? (
                          <div className="rounded-xl border border-[#d4a64d30] bg-[#0b1329]/90 p-4 text-right">
                            <div className="flex items-center gap-2 mb-3 cursor-pointer text-gold hover:text-white" onClick={() => setSelectedSurah(null)}>
                              <ChevronRight className="w-4 h-4" />
                              <span className="text-xs font-bold">العودة للفهرس</span>
                            </div>
                            <h4 className="text-sm font-extrabold text-gold border-b border-white/5 pb-2 mb-3 text-center">{selectedSurah.name}</h4>
                            <p className="text-sm leading-8 text-white font-arabic font-medium leading-[2] text-justify select-text">
                              {selectedSurah.verses}
                            </p>
                          </div>
                        ) : (
                          quranSurahs.map((surah, idx) => (
                            <div
                              key={idx}
                              onClick={() => setSelectedSurah(surah)}
                              className="flex justify-between items-center p-3 rounded-xl border border-white/5 bg-white/[0.03] hover:border-gold/30 cursor-pointer transition-all duration-300"
                              dir="rtl"
                            >
                              <div className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded-lg bg-gold/10 border border-gold/30 text-gold grid place-items-center text-[10px] font-extrabold">
                                  {idx + 1}
                                </span>
                                <span className="text-xs font-bold text-white">{surah.name}</span>
                              </div>
                              <ChevronLeft className="w-4 h-4 text-gold" />
                            </div>
                          ))
                        )}
                      </motion.div>
                    )}

                  </div>

                  {/* BOTTOM NAVBAR */}
                  <footer className="flex justify-around items-center border-t border-white/5 pt-3 mt-auto bg-[#060913]">
                    {[
                      { id: "home", label: "الرئيسية", icon: Home },
                      { id: "services", label: "الخدمات", icon: Heart },
                      { id: "qibla", label: "القبلة", icon: Compass },
                      { id: "quran", label: "القرآن", icon: BookOpen },
                    ].map((tab) => {
                      const Icon = tab.icon;
                      const isActive = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => {
                            setActiveTab(tab.id as any);
                            setSelectedSurah(null);
                            setOrderedService(null);
                          }}
                          className={cn(
                            "flex flex-col items-center justify-center text-[9px] font-bold transition-all",
                            isActive ? "text-gold scale-105" : "text-slate-500 hover:text-slate-300"
                          )}
                        >
                          <Icon className="w-4.5 h-4.5 mb-1" />
                          <span>{tab.label}</span>
                        </button>
                      );
                    })}
                  </footer>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Decorative Outer Rings */}
      <div className="pointer-events-none absolute inset-[-18%] -z-10 rounded-[50px] border border-[#d4a64d24] animate-pulse" />
    </motion.div>
  );
}
