"use client";

import React, { useState, useEffect } from "react";
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
  ChevronRight,
  Smartphone,
  Send,
  MapPin,
  RefreshCw,
  Check,
  Play,
  ArrowRightLeft,
  Users,
  Compass as QiblaIcon,
  BookOpen as QuranIcon,
  Info,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

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

type UmrahStatus = "idle" | "ordered" | "accepted" | "tawaf" | "sai" | "halq" | "completed";

export function NIYAPhonesCarousel() {
  // Carousel State: "client" | "performer" (used on mobile screens)
  const [activeMobilePhone, setActiveMobilePhone] = useState<"client" | "performer">("client");

  // Shared Simulator States
  const [umrahStatus, setUmrahStatus] = useState<UmrahStatus>("idle");
  const [clientName, setClientName] = useState("");
  const [worshipperName, setWorshipperName] = useState("");
  const [relationship, setRelationship] = useState("والد/والدة");
  const [recommendedPrayers, setRecommendedPrayers] = useState("");
  
  // Performer states
  const [performerOnline, setPerformerOnline] = useState(false);
  const [performerStepIndex, setPerformerStepIndex] = useState(0); // 0: Miqat, 1: Tawaf, 2: Sai, 3: Halq, 4: Completed
  
  // Client Screen States
  const [clientAppStep, setClientAppStep] = useState<"splash" | "onboarding" | "home">("onboarding");
  const [clientSlide, setClientSlide] = useState(0);
  const [clientActiveTab, setClientActiveTab] = useState<"home" | "services" | "qibla" | "quran">("home");
  const [selectedSurah, setSelectedSurah] = useState<typeof quranSurahs[0] | null>(null);

  // Performer Screen States
  const [performerAppStep, setPerformerAppStep] = useState<"login" | "dashboard" | "active">("login");

  // Sync simulator state changes
  useEffect(() => {
    if (umrahStatus === "idle") {
      setPerformerStepIndex(0);
      if (performerAppStep === "active") {
        setPerformerAppStep("dashboard");
      }
    } else if (umrahStatus === "accepted") {
      setPerformerStepIndex(0);
      setPerformerAppStep("active");
    } else if (umrahStatus === "tawaf") {
      setPerformerStepIndex(1);
    } else if (umrahStatus === "sai") {
      setPerformerStepIndex(2);
    } else if (umrahStatus === "halq") {
      setPerformerStepIndex(3);
    } else if (umrahStatus === "completed") {
      setPerformerStepIndex(4);
    }
  }, [umrahStatus, performerAppStep]);

  // Sync active step changes back from performer
  const advancePerformerStep = () => {
    if (umrahStatus === "accepted") {
      setUmrahStatus("tawaf");
    } else if (umrahStatus === "tawaf") {
      setUmrahStatus("sai");
    } else if (umrahStatus === "sai") {
      setUmrahStatus("halq");
    } else if (umrahStatus === "halq") {
      setUmrahStatus("completed");
    } else if (umrahStatus === "completed") {
      // Send report, finish journey
      setUmrahStatus("idle");
      setClientName("");
      setWorshipperName("");
      setRecommendedPrayers("");
      setClientActiveTab("home");
    }
  };

  const handleOrderUmrah = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !worshipperName) {
      alert("يرجى ملء البيانات المطلوبة");
      return;
    }
    setUmrahStatus("ordered");
    setClientActiveTab("home");
  };

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
      title: "تتبع العميل GPS",
      subtitle: "رصد مباشر ونشط | Real-time GPS Tracking",
      description: "تتبع خط سير المعتمر خطوة بخطوة بالخرائط مباشرة من المسجد الحرام وتلقي الإشعارات اللحظية.",
      icon: Compass,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[1100px] mx-auto gap-6 px-2 md:px-0">
      


      {/* Mobile view selector switcher */}
      <div className="flex md:hidden w-full max-w-[320px] rounded-full border border-slate-200 bg-white p-1 mb-2 shadow-sm">
        <button
          onClick={() => setActiveMobilePhone("client")}
          className={cn(
            "flex-1 rounded-full py-2 text-xs font-extrabold transition-all duration-300",
            activeMobilePhone === "client" ? "bg-[#d4a64d] text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-800"
          )}
        >
          📱 تطبيق العميل
        </button>
        <button
          onClick={() => setActiveMobilePhone("performer")}
          className={cn(
            "flex-1 rounded-full py-2 text-xs font-extrabold transition-all duration-300",
            activeMobilePhone === "performer" ? "bg-[#d4a64d] text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-800"
          )}
        >
          🕋 تطبيق المؤدي
        </button>
      </div>

      {/* Main Containers: Two phone mockups with animated sync arrow on Desktop */}
      <div className="relative flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-16 w-full" dir="ltr">
        
        {/* =======================================================
            PHONE 1: CLIENT APP
           ======================================================= */}
        <div className={cn(
          "relative select-none transition-all duration-500",
          activeMobilePhone === "client" ? "flex" : "hidden md:flex"
        )}>
          {/* Label Tag above the phone */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-20 rounded-full border border-slate-200 bg-white px-4 py-1 text-xs font-bold text-[#a37a28] shadow-sm" dir="rtl">
            تطبيق طالب العمرة (العميل)
          </div>

          <div className="relative z-10 p-2 rounded-[44px] border border-slate-300 bg-slate-900 shadow-[0_30px_70px_rgba(0,0,0,0.25)] w-[min(320px,88vw)]">
            <div className="relative h-[500px] overflow-hidden rounded-[36px] border border-slate-950/20 bg-white text-slate-800">
              <div className="absolute inset-0 bg-[linear-gradient(150deg,rgba(212,166,77,0.03),transparent_60%)] pointer-events-none" />
              <div className="absolute inset-x-16 top-3 z-50 h-5 rounded-full bg-black" />

              {/* Status bar */}
              <div className="absolute top-2.5 inset-x-6 z-40 flex justify-between items-center text-[10px] text-slate-500 px-1 font-bold">
                <span>06:55 AM</span>
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-[2px]" />
                  <span>5G</span>
                </div>
              </div>

              {/* Client App Content Screen */}
              <div className="relative z-10 flex h-[480px] flex-col p-3 pt-7.5 text-right font-sans">
                <AnimatePresence mode="wait">
                  
                  {/* CLIENT ONBOARDING */}
                  {clientAppStep === "onboarding" && (
                    <motion.div
                      key="client-onboarding"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex flex-col justify-between h-[435px] text-center pt-2"
                    >
                      <div className="px-2">
                        <h2 className="text-[#a37a28] text-2xl font-extrabold mb-5 drop-shadow-sm">نية</h2>
                        
                        <motion.div
                          key={clientSlide}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="rounded-2xl border border-[#d4a64d]/10 bg-slate-50/50 p-3.5 mt-2 shadow-sm"
                        >
                          {React.createElement(onboardingSlides[clientSlide].icon, {
                            className: "w-9 h-9 text-[#a37a28] mx-auto mb-3"
                          })}
                          <h3 className="text-sm font-extrabold text-slate-800 mb-0.5">{onboardingSlides[clientSlide].title}</h3>
                          <h4 className="text-[10px] text-[#a37a28] mb-1.5">{onboardingSlides[clientSlide].subtitle}</h4>
                          <p className="text-[9px] text-slate-500 leading-relaxed px-1">{onboardingSlides[clientSlide].description}</p>
                        </motion.div>
                      </div>

                      <div className="flex items-center justify-between mt-4 px-2" dir="rtl">
                        <div className="flex gap-1.5">
                          {onboardingSlides.map((_, i) => (
                            <div
                              key={i}
                              className={cn(
                                "h-2 rounded-full transition-all duration-300",
                                clientSlide === i ? "w-6 bg-[#a37a28]" : "w-2 bg-slate-200"
                              )}
                            />
                          ))}
                        </div>

                        <button
                          onClick={() => {
                            if (clientSlide < onboardingSlides.length - 1) {
                              setClientSlide(clientSlide + 1);
                            } else {
                              setClientAppStep("home");
                            }
                          }}
                          className="min-w-20 px-3 py-1.5 text-[10px] font-bold text-white bg-[#a37a28] hover:bg-[#8f681a] rounded-lg shadow-sm cursor-pointer transition-colors"
                        >
                          {clientSlide === onboardingSlides.length - 1 ? "ابدأ الآن" : "التالي"}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* CLIENT HOME / TABS APP STATE */}
                  {clientAppStep === "home" && (
                    <motion.div
                      key="client-app-home"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col justify-between h-[435px] relative"
                    >
                      {/* HEADER */}
                      <header className="flex items-center justify-between mb-2 border-b border-slate-100 pb-1.5">
                        <button
                          onClick={() => {
                            setClientAppStep("onboarding");
                            setClientSlide(0);
                          }}
                          className="grid h-6 px-2 place-items-center rounded-full border border-slate-200 bg-slate-50 text-[#a37a28] text-[8px] font-bold hover:bg-slate-100 transition-colors"
                        >
                          خروج
                        </button>
                        <div className="text-center">
                          <span className="text-sm font-black text-slate-800">نية</span>
                          <p className="text-[7.5px] text-[#a37a28] -mt-1 font-extrabold">عمل موثق وأجر دائم</p>
                        </div>
                        <div className="grid h-6 w-6 place-items-center rounded-full bg-[#d4a64d]/10 text-[9px] font-bold text-[#a37a28]">
                          ع
                        </div>
                      </header>

                      {/* MAIN CONTENT AREA FOR TABS */}
                      <div className="flex-1 overflow-y-auto pr-0.5 space-y-2 scrollbar-none">
                        
                        {/* TAB A: CLIENT HOME SCREEN */}
                        {clientActiveTab === "home" && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                            
                            {/* ACTIVE TRACKING CARD OR NO ACTIVE JOB STATE */}
                            {umrahStatus === "idle" ? (
                              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-3 text-center space-y-2 shadow-sm">
                                <MapPin className="w-7 h-7 text-slate-400 mx-auto" />
                                <h4 className="text-[10px] font-extrabold text-slate-800">لا توجد رحلة عمرة نشطة حالياً</h4>
                                <p className="text-[9px] text-slate-500 leading-relaxed">
                                  يمكنك طلب عمرة بالنيابة عن والديك أو من تحب وتتبع المؤدي خطوة بخطوة بالـ GPS.
                                </p>
                                <button
                                  onClick={() => setClientActiveTab("services")}
                                  className="px-3 py-1.5 bg-[#a37a28] text-white font-bold rounded-lg text-[9px] mx-auto hover:bg-[#8f681a] transition shadow-sm cursor-pointer"
                                >
                                  طلب عمرة الآن
                                </button>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                
                                {/* Live GPS Tracking Map Card */}
                                <div className="rounded-xl border border-slate-150 bg-white p-2.5 text-right space-y-2 shadow-sm">
                                  <div className="flex justify-between items-center border-b border-slate-50 pb-1.5">
                                    <div className="flex items-center gap-1">
                                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                                      <span className="text-[9px] font-extrabold text-[#0f172a]">تتبع مباشر GPS</span>
                                    </div>
                                    <span className="text-[9px] font-bold text-slate-700">موقع المؤدي في الحرم</span>
                                  </div>

                                  {/* THE INTERACTIVE MAP AREA (LIGHT THEME) */}
                                  <div className="relative h-32 rounded-lg bg-slate-50 border border-slate-200/60 overflow-hidden flex items-center justify-center">
                                    {/* Map Grid / Style Lines */}
                                    <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] bg-[size:10px_10px] opacity-70" />
                                    
                                    {/* The Holy Mosque Boundaries (SVG style drawing) */}
                                    <svg className="w-full h-full absolute inset-0 opacity-40" viewBox="0 0 100 100">
                                      {/* Outer circular courtyard */}
                                      <circle cx="50" cy="50" r="32" fill="none" stroke="#d4a64d" strokeWidth="0.75" strokeDasharray="3,3" />
                                      {/* Safa & Marwa gallery */}
                                      <path d="M 82 25 L 82 75" fill="none" stroke="#0f172a" strokeWidth="1.75" strokeLinecap="round" />
                                    </svg>

                                    {/* Landmark: Safa & Marwa Text */}
                                    <div className="absolute right-3.5 top-[32%] -translate-y-1/2 flex flex-col items-center">
                                      <span className="text-[8px] font-bold text-[#0f172a]">الصفا</span>
                                      <span className="w-1 h-1 rounded-full bg-[#0f172a] mt-0.5" />
                                    </div>
                                    <div className="absolute right-3.5 bottom-[32%] translate-y-1/2 flex flex-col items-center">
                                      <span className="w-1 h-1 rounded-full bg-[#0f172a] mb-0.5" />
                                      <span className="text-[8px] font-bold text-[#0f172a]">المروة</span>
                                    </div>

                                    {/* Landmark: Miqat */}
                                    <div className="absolute left-3.5 top-6 flex flex-col items-center">
                                      <span className="text-[8px] font-extrabold text-slate-400">نقطة الميقات</span>
                                      <span className="w-1 h-1 rounded-full bg-slate-400 mt-0.5" />
                                    </div>

                                    {/* Landmark: Kaaba in Center */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
                                      {/* Kaaba Shape */}
                                      <div className="w-6 h-6 bg-slate-900 border border-[#d4a64d] rounded-[3px] flex flex-col justify-between p-[2px] shadow-sm">
                                        {/* Golden belt */}
                                        <div className="w-full h-[2.5px] bg-[#d4a64d]" />
                                      </div>
                                      <span className="text-[7.5px] font-extrabold text-slate-800 mt-1">الكعبة</span>
                                    </div>

                                    {/* -----------------------------------------------------------
                                        DYNAMIC PERFORMER PIN ON THE MAP
                                       ----------------------------------------------------------- */}
                                    {umrahStatus === "ordered" && (
                                      <div className="absolute text-[8px] text-[#a37a28] font-bold animate-pulse bg-white/90 border border-slate-100 rounded px-2 py-0.5 shadow-sm">
                                        في انتظار القبول...
                                      </div>
                                    )}

                                    {umrahStatus === "accepted" && (
                                      /* Position: At Miqat (top-left) */
                                      <motion.div
                                        initial={{ x: -60, y: -35 }}
                                        animate={{ x: -60, y: -35 }}
                                        className="absolute w-2.5 h-2.5 z-30"
                                      >
                                        <span className="absolute inset-0 rounded-full bg-[#a37a28] opacity-50 animate-ping" />
                                        <span className="relative block w-2.5 h-2.5 rounded-full bg-[#a37a28] border border-white shadow-sm" />
                                      </motion.div>
                                    )}

                                    {umrahStatus === "tawaf" && (
                                      /* Position: Circular orbit around Kaaba */
                                      <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                                        className="absolute w-10 h-10 flex items-center justify-center z-30"
                                      >
                                        <span className="absolute -top-1 w-2.5 h-2.5 rounded-full bg-[#a37a28] border border-white shadow-md" />
                                        <span className="absolute -top-1 w-2.5 h-2.5 rounded-full bg-[#a37a28] opacity-40 animate-ping" />
                                      </motion.div>
                                    )}

                                    {umrahStatus === "sai" && (
                                      /* Position: Moving vertically between Safa & Marwa */
                                      <motion.div
                                        animate={{ y: [-25, 25, -25] }}
                                        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                                        className="absolute right-5.5 w-2.5 h-2.5 z-30"
                                      >
                                        <span className="absolute inset-0 rounded-full bg-[#a37a28] opacity-50 animate-ping" />
                                        <span className="relative block w-2.5 h-2.5 rounded-full bg-[#a37a28] border border-white shadow-md" />
                                      </motion.div>
                                    )}

                                    {umrahStatus === "halq" && (
                                      /* Position: Near the exit (bottom-left) */
                                      <motion.div
                                        initial={{ x: -35, y: 35 }}
                                        animate={{ x: -35, y: 35 }}
                                        className="absolute w-2.5 h-2.5 z-30"
                                      >
                                        <span className="absolute inset-0 rounded-full bg-[#a37a28] opacity-50 animate-ping" />
                                        <span className="relative block w-2.5 h-2.5 rounded-full bg-[#a37a28] border border-white shadow-md" />
                                      </motion.div>
                                    )}

                                    {umrahStatus === "completed" && (
                                      /* Position: Center green checkmark */
                                      <motion.div
                                        initial={{ scale: 0.5, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="absolute z-30 bg-emerald-500 rounded-full p-1 border border-white shadow-md"
                                      >
                                        <Check className="w-2.5 h-2.5 text-white" />
                                      </motion.div>
                                    )}
                                  </div>

                                  {/* Progress Description */}
                                  <div className="text-[9px] leading-relaxed border-t border-slate-100 pt-1.5">
                                    <div className="font-extrabold text-slate-800 mb-0.5">خطوات التنفيذ المباشرة:</div>
                                    <div className="text-slate-500 font-medium">
                                      {umrahStatus === "ordered" && "تم إرسال الطلب، في انتظار قبول الطالب الميداني بمكة..."}
                                      {umrahStatus === "accepted" && "الخطوة ١: وصل المعتمر إلى الميقات وأحرم بالنيابة بنية عمرة لـ " + worshipperName}
                                      {umrahStatus === "tawaf" && "الخطوة ٢: المعتمر الآن في صحن المطاف يطوف حول الكعبة المشرفة ٧ أشواط."}
                                      {umrahStatus === "sai" && "الخطوة ٣: المعتمر يسعى الآن بين الصفا والمروة بالنيابة."}
                                      {umrahStatus === "halq" && "الخطوة ٤: المعتمر انتهى من السعي ويقوم بالتحلل (الحلق أو التقصير)."}
                                      {umrahStatus === "completed" && "تم إتمام العمرة بالكامل بنجاح! تم حفظ الأدعية وتسجيل فيديو الإثبات."}
                                    </div>
                                  </div>
                                </div>

                                {/* Order details card */}
                                <div className="rounded-xl border border-slate-150 bg-slate-50/50 p-2.5 text-right shadow-sm">
                                  <h4 className="text-[10px] font-extrabold text-[#a37a28] border-b border-slate-200/60 pb-1 mb-1.5">بيانات النية المسجلة</h4>
                                  <div className="space-y-1 text-[9px] font-medium">
                                    <div className="flex justify-between" dir="rtl">
                                      <span className="text-slate-500">المعتمر عنه:</span>
                                      <span className="text-slate-800 font-extrabold">{worshipperName}</span>
                                    </div>
                                    <div className="flex justify-between" dir="rtl">
                                      <span className="text-slate-500">القرابة / الحالة:</span>
                                      <span className="text-slate-700">{relationship}</span>
                                    </div>
                                    <div className="flex justify-between" dir="rtl">
                                      <span className="text-slate-500">المرسل:</span>
                                      <span className="text-slate-700">{clientName}</span>
                                    </div>
                                    {recommendedPrayers && (
                                      <div className="mt-1.5 text-right">
                                        <span className="text-slate-500 block mb-0.5">الأدعية الموصى بها:</span>
                                        <p className="p-2 rounded bg-white text-slate-600 border border-slate-100 text-[8px] leading-relaxed select-text italic shadow-inner">
                                          "{recommendedPrayers}"
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Stepper Progress Timeline */}
                                <div className="rounded-xl border border-slate-150 bg-white p-2.5 text-right shadow-sm">
                                  <h4 className="text-[10px] font-extrabold text-slate-800 mb-1.5">تتبع الخطوات الجغرافي</h4>
                                  <div className="space-y-2 text-[9px] font-medium">
                                    {[
                                      { label: "نية العمرة والإحرام في الميقات", active: performerStepIndex >= 0, current: performerStepIndex === 0 },
                                      { label: "الطواف حول الكعبة المشرفة ٧ أشواط", active: performerStepIndex >= 1, current: performerStepIndex === 1 },
                                      { label: "السعي بين الصفا والمروة ٧ أشواط", active: performerStepIndex >= 2, current: performerStepIndex === 2 },
                                      { label: "التحلل (الحلق أو التقصير) وإنهاء الإحرام", active: performerStepIndex >= 3, current: performerStepIndex === 3 },
                                      { label: "العمرة مكتملة وإرسال التقرير النهائي", active: performerStepIndex >= 4, current: performerStepIndex === 4 },
                                    ].map((step, idx) => (
                                      <div key={idx} className="flex justify-between items-center" dir="rtl">
                                        <span className={cn(
                                          "w-4 h-4 rounded-full border grid place-items-center text-[9px]",
                                          step.current ? "border-[#a37a28] bg-[#d4a64d]/10 text-[#a37a28] font-extrabold animate-pulse" :
                                          step.active ? "border-emerald-500 bg-emerald-50 text-emerald-600" : "border-slate-200 text-slate-400 bg-slate-50"
                                        )}>
                                          {idx + 1}
                                        </span>
                                        <span className={cn(
                                          "flex-1 mr-2.5",
                                          step.current ? "text-[#a37a28] font-extrabold" :
                                          step.active ? "text-slate-800" : "text-slate-400"
                                        )}>{step.label}</span>
                                        <span className="text-[9px] font-bold">
                                          {step.current ? "قيد التنفيذ" : step.active ? "مكتمل" : "انتظار"}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}

                          </motion.div>
                        )}

                        {/* TAB B: SERVICES SCREEN */}
                        {clientActiveTab === "services" && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                            <p className="text-[10px] font-bold text-slate-500 text-right mb-0.5">الخدمات المتاحة للطلب</p>
                            
                            {umrahStatus !== "idle" ? (
                              <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 text-center space-y-3 shadow-sm">
                                <CheckCircle2 className="w-9 h-9 text-emerald-500 mx-auto" />
                                <h4 className="text-xs font-extrabold text-slate-800">لديك طلب عمرة نشط!</h4>
                                <p className="text-[9px] text-slate-500 leading-relaxed">
                                  لقد بدأت نيتك رحلتها للتنفيذ في مكة. يرجى التوجه إلى قسم "الرئيسية" لمتابعة موقع المؤدي لحظياً بالـ GPS.
                                </p>
                                <button
                                  onClick={() => setClientActiveTab("home")}
                                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-lg text-[10px] cursor-pointer shadow-sm transition-colors"
                                >
                                  الذهاب لصفحة التتبع
                                </button>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                {/* Service Form Overlay */}
                                <div className="rounded-xl border border-[#d4a64d]/20 bg-[#fbf9f4] p-2.5 text-right space-y-2 shadow-sm">
                                  <div className="border-b border-slate-200/60 pb-1.5">
                                    <h4 className="text-[10px] font-extrabold text-[#a37a28]">أدخل بيانات العمرة بالنيابة</h4>
                                    <p className="text-[8px] text-slate-500 mt-0.5">سيتم إرسال كافة البيانات لطلبة العلم المنفذين في مكة</p>
                                  </div>

                                  <form onSubmit={handleOrderUmrah} className="space-y-2 text-[9px] font-medium">
                                    <div className="space-y-0.5">
                                      <label className="text-slate-600 block font-extrabold">اسم طالب الخدمة (العميل):</label>
                                      <input
                                        type="text"
                                        required
                                        placeholder="مثال: أحمد عبد الله"
                                        value={clientName}
                                        onChange={(e) => setClientName(e.target.value)}
                                        className="w-full rounded bg-white border border-slate-200 p-1.5 text-slate-800 text-right text-[9px] focus:outline-none focus:border-[#a37a28] shadow-inner"
                                      />
                                    </div>

                                    <div className="space-y-0.5">
                                      <label className="text-slate-600 block font-extrabold">اسم المعتمر عنه:</label>
                                      <input
                                        type="text"
                                        required
                                        placeholder="مثال: الوالد محمد عبد الله رحمه الله"
                                        value={worshipperName}
                                        onChange={(e) => setWorshipperName(e.target.value)}
                                        className="w-full rounded bg-white border border-slate-200 p-1.5 text-slate-800 text-right text-[9px] focus:outline-none focus:border-[#a37a28] shadow-inner"
                                      />
                                    </div>

                                    <div className="space-y-0.5 relative">
                                      <label className="text-slate-600 block font-extrabold">صلة القرابة / الحالة:</label>
                                      <select
                                        value={relationship}
                                        onChange={(e) => setRelationship(e.target.value)}
                                        className="w-full rounded bg-white border border-slate-200 p-1.5 text-slate-800 text-right text-[9px] focus:outline-none focus:border-[#a37a28] appearance-none shadow-inner"
                                        dir="rtl"
                                      >
                                        <option value="والد/والدة">والد/والدة</option>
                                        <option value="قريب متوفى">قريب متوفى</option>
                                        <option value="مريض عاجز">مريض عاجز</option>
                                        <option value="صدقة عامة">صدقة عامة</option>
                                      </select>
                                      <ChevronDown className="absolute left-2 bottom-2 w-3 h-3 text-slate-400 pointer-events-none" />
                                    </div>

                                    <div className="space-y-0.5">
                                      <label className="text-slate-600 block font-extrabold">الأدعية الموصى بها (ليقوم المؤدي بقراءتها):</label>
                                      <textarea
                                        rows={2}
                                        placeholder="اكتب الأدعية التي تريد أن يقرأها..."
                                        value={recommendedPrayers}
                                        onChange={(e) => setRecommendedPrayers(e.target.value)}
                                        className="w-full rounded bg-white border border-slate-200 p-1.5 text-slate-800 text-right text-[9px] focus:outline-none focus:border-[#a37a28] shadow-inner"
                                      />
                                    </div>

                                    <div className="flex justify-between items-center pt-1">
                                      <span className="text-[#a37a28] font-extrabold text-[10px]">1300 ريال</span>
                                      <button
                                        type="submit"
                                        className="flex items-center gap-1 px-3 py-1.5 bg-[#a37a28] hover:bg-[#8f681a] text-white font-extrabold rounded-lg shadow-sm cursor-pointer transition-colors text-[9px]"
                                      >
                                        <span>إرسال النية والدفع</span>
                                        <Send className="w-3 h-3 rotate-180" />
                                      </button>
                                    </div>
                                  </form>
                                </div>

                                {/* Other Services list items for visual completeness */}
                                {[
                                  { title: "سقيا الماء في الحرم المكي", price: "6 ريال", desc: "توزيع مياه زمزم ومياه نقية لضيوف الرحمن في المشاعر." },
                                  { title: "توزيع التمور لضيوف الرحمن", price: "8 ريال", desc: "صدقة إطعام للصائمين والمعتمرين بالمسجد الحرام." },
                                ].map((srv, idx) => (
                                  <div
                                    key={idx}
                                    className="rounded-xl border border-slate-100 bg-slate-50/50 p-3 text-right opacity-60"
                                  >
                                    <div className="flex justify-between items-start" dir="rtl">
                                      <h4 className="text-[10px] font-extrabold text-slate-700">{srv.title}</h4>
                                      <span className="text-[10px] font-bold text-[#a37a28] shrink-0">{srv.price}</span>
                                    </div>
                                    <p className="text-[9px] text-slate-500 mt-1 font-medium">{srv.desc}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        )}

                        {/* TAB C: QIBLA COMPASS SCREEN */}
                        {clientActiveTab === "qibla" && (
                          <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            className="flex flex-col items-center justify-center h-[300px] text-center"
                          >
                            <p className="text-[10px] font-bold text-[#a37a28] mb-2">بوصلة القبلة الذكية</p>
                            
                            {/* Rotating Compass Graphic */}
                            <div className="relative w-28 h-28 rounded-full border border-slate-100 bg-slate-50 flex items-center justify-center shadow-inner">
                              <motion.div
                                animate={{ rotate: [0, 8, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                                className="absolute inset-2 border border-dashed border-[#d4a64d]/30 rounded-full"
                              />
                              <motion.div 
                                animate={{ rotate: [-20, -16, -24, -20] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                className="w-full h-full relative"
                              >
                                {/* Compass Needle pointing north-east */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-18 bg-gradient-to-b from-[#a37a28] via-[#d4a64d] to-transparent rounded-full" />
                                <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[#a37a28] font-extrabold text-[8px]">كعبة</div>
                              </motion.div>
                              <div className="absolute w-2.5 h-2.5 rounded-full bg-white border border-[#a37a28] shadow-sm" />
                            </div>

                            <p className="text-[10px] text-slate-800 font-extrabold mt-3">اتجاه القبلة: ٢١.٤° شرق الشمال</p>
                            <p className="text-[8px] text-slate-500 mt-0.5">اضبط الهاتف لمطابقة المؤشر مع اتجاه الكعبة</p>
                          </motion.div>
                        )}

                        {/* TAB D: QURAN SCREEN */}
                        {clientActiveTab === "quran" && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1.5">
                            <p className="text-[10px] font-bold text-slate-500 text-right mb-0.5">الورد اليومي والقرآن الكريم</p>
                            
                            {selectedSurah ? (
                              <div className="rounded-xl border border-slate-200 bg-[#fbf9f4] p-2.5 text-right shadow-sm">
                                <div className="flex items-center gap-1.5 mb-1.5 cursor-pointer text-[#a37a28] hover:text-[#8f681a]" onClick={() => setSelectedSurah(null)}>
                                  <ChevronRight className="w-3.5 h-3.5" />
                                  <span className="text-[9px] font-bold">العودة للفهرس</span>
                                </div>
                                <h4 className="text-[11px] font-extrabold text-[#a37a28] border-b border-slate-200/60 pb-1 mb-2 text-center">{selectedSurah.name}</h4>
                                <p className="text-[9.5px] leading-5 text-slate-800 font-medium text-justify select-text">
                                  {selectedSurah.verses}
                                </p>
                              </div>
                            ) : (
                              quranSurahs.map((surah, idx) => (
                                <div
                                  key={idx}
                                  onClick={() => setSelectedSurah(surah)}
                                  className="flex justify-between items-center p-2.5 rounded-lg border border-slate-100 bg-white hover:border-[#d4a64d]/30 hover:bg-slate-50/50 cursor-pointer transition-all duration-300 shadow-sm"
                                  dir="rtl"
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="w-5.5 h-5.5 rounded-lg bg-[#d4a64d]/10 border border-[#d4a64d]/20 text-[#a37a28] grid place-items-center text-[9px] font-extrabold">
                                      {idx + 1}
                                    </span>
                                    <span className="text-[10px] font-bold text-slate-800">{surah.name}</span>
                                  </div>
                                  <ChevronLeft className="w-3.5 h-3.5 text-[#a37a28]" />
                                </div>
                              ))
                            )}
                          </motion.div>
                        )}

                      </div>

                      {/* BOTTOM NAVBAR */}
                      <footer className="flex justify-around items-center border-t border-slate-100 pt-1 bg-white">
                        {[
                          { id: "home", label: "الرئيسية", icon: Home },
                          { id: "services", label: "الخدمات", icon: Heart },
                          { id: "qibla", label: "القبلة", icon: Compass },
                          { id: "quran", label: "القرآن", icon: BookOpen },
                        ].map((tab) => {
                          const Icon = tab.icon;
                          const isActive = clientActiveTab === tab.id;
                          return (
                            <button
                              key={tab.id}
                              onClick={() => {
                                setClientActiveTab(tab.id as any);
                                setSelectedSurah(null);
                              }}
                              className={cn(
                                "flex flex-col items-center justify-center text-[8.5px] font-extrabold transition-all cursor-pointer",
                                isActive ? "text-[#a37a28] scale-105" : "text-slate-400 hover:text-slate-600"
                              )}
                            >
                              <Icon className="w-4 h-4 mb-0.5" />
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
          <div className="pointer-events-none absolute inset-[-18%] -z-10 rounded-[50px] border border-slate-200/50 animate-pulse" />
        </div>

        {/* =======================================================
            DESKTOP CONNECTING LINES / SYNC DOTS (LIGHT THEME)
           ======================================================= */}
        <div className="hidden md:flex flex-col items-center justify-center gap-2 text-center select-none w-16 lg:w-32 z-10" dir="rtl">
          
          {/* Connection state animations */}
          <div className="relative w-full h-8 flex items-center justify-center">
            {/* Dashed line */}
            <div className="w-full h-[2px] border-t-2 border-dashed border-slate-300" />
            
            {/* Flying dot representing communication */}
            {umrahStatus !== "idle" && (
              <motion.div
                animate={{ x: [-60, 60] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                className="absolute w-2 h-2 rounded-full bg-[#a37a28] shadow-sm z-20"
              />
            )}
          </div>
          
          <span className="text-[10px] font-extrabold text-[#a37a28]">مزامنة GPS والبيانات</span>
          <p className="text-[8px] text-slate-500 font-bold">اتصال ثنائي مباشر</p>
          <ArrowRightLeft className="w-4.5 h-4.5 text-[#a37a28]/30 animate-pulse mt-1" />
        </div>

        {/* =======================================================
            PHONE 2: PERFORMER APP
           ======================================================= */}
        <div className={cn(
          "relative select-none transition-all duration-500",
          activeMobilePhone === "performer" ? "flex" : "hidden md:flex"
        )}>
          {/* Label Tag above the phone */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-20 rounded-full border border-slate-200 bg-white px-4 py-1 text-xs font-bold text-[#0f172a] shadow-sm" dir="rtl">
            تطبيق مزود الخدمة (مؤدي العمرة)
          </div>

          <div className="relative z-10 p-2 rounded-[44px] border border-slate-300 bg-slate-900 shadow-[0_30px_70px_rgba(0,0,0,0.25)] w-[min(320px,88vw)]">
            <div className="relative h-[500px] overflow-hidden rounded-[36px] border border-slate-950/20 bg-white text-slate-800">
              <div className="absolute inset-0 bg-[linear-gradient(150deg,rgba(212,166,77,0.03),transparent_40%)] pointer-events-none" />
              <div className="absolute inset-x-16 top-3 z-50 h-5 rounded-full bg-black" />

              {/* Status bar */}
              <div className="absolute top-2.5 inset-x-6 z-40 flex justify-between items-center text-[10px] text-slate-500 px-1 font-bold">
                <span>06:55 AM</span>
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 bg-[#0b192c] rounded-[2px]" />
                  <span>GPS ON</span>
                </div>
              </div>

              {/* Performer App Content Screen */}
              <div className="relative z-10 flex h-[480px] flex-col p-3 pt-7.5 text-right font-sans">
                <AnimatePresence mode="wait">
                  
                  {/* SCREEN 1: LOGIN / START ONLINE */}
                  {performerAppStep === "login" && (
                    <motion.div
                      key="performer-login"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex flex-col justify-between h-[435px] text-center pt-4"
                    >
                      <div className="space-y-4">
                        <div className="h-12 w-12 rounded-2xl bg-[#d4a64d]/10 border border-[#d4a64d]/20 text-[#a37a28] flex items-center justify-center mx-auto shadow-sm">
                          <Users className="w-6 h-6" />
                        </div>
                        
                        <div className="space-y-1.5 px-2">
                          <h3 className="text-base font-black text-slate-800">شريك نية الميداني</h3>
                          <p className="text-[9px] text-slate-500 leading-relaxed">
                            تطبيق مخصص لطلاب العلم والمؤدين في المشاعر المقدسة لتلقي طلبات العمرة والصدقات ومتابعتها بالـ GPS والتقارير المصورة.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2 pb-3 px-2">
                        <button
                          onClick={() => {
                            setPerformerOnline(true);
                            setPerformerAppStep("dashboard");
                          }}
                          className="w-full py-1.5 px-3 bg-[#0b192c] hover:bg-[#1e293b] text-white font-extrabold rounded-lg text-[10px] shadow-sm cursor-pointer transition-colors"
                        >
                          ابدأ استقبال الطلبات (التحول لمتصل)
                        </button>
                        <p className="text-[8px] text-slate-400">يتطلب هذا التطبيق صلاحية تتبع موقعك الجغرافي النشط</p>
                      </div>
                    </motion.div>
                  )}

                  {/* SCREEN 2: ONLINE DASHBOARD */}
                  {performerAppStep === "dashboard" && (
                    <motion.div
                      key="performer-dashboard"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col justify-between h-[435px]"
                    >
                      {/* HEADER */}
                      <header className="flex justify-between items-center border-b border-slate-100 pb-1.5 mb-2">
                        <span className="px-2 py-0.5 text-[8.5px] font-extrabold text-[#a37a28] bg-[#d4a64d]/10 border border-[#d4a64d]/20 rounded-full animate-pulse">متصل</span>
                        <div className="text-center">
                          <span className="text-sm font-black text-slate-800">لوحة الشريك</span>
                        </div>
                        <button
                          onClick={() => {
                            setPerformerOnline(false);
                            setPerformerAppStep("login");
                          }}
                          className="text-[9px] text-slate-400 font-bold hover:text-slate-600 transition-colors"
                        >
                          خروج
                        </button>
                      </header>

                      {/* WORK STATUS OR INCOMING NOTIFICATION */}
                      <div className="flex-1 flex flex-col justify-center relative px-1">
                        {umrahStatus === "ordered" ? (
                          /* 🚨 INCOMING RINGING ORDER REQUEST MODAL */
                          <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="rounded-xl border border-[#d4a64d]/20 bg-[#fbf9f4] p-3 text-right space-y-2.5 shadow-sm"
                          >
                            <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#a37a28] animate-ping" />
                              <h4 className="text-[10px] font-black text-[#a37a28]">طلب عمرة بالنيابة وارد!</h4>
                            </div>

                            <div className="space-y-1.5 text-[9px] font-medium">
                              <div>
                                <span className="text-slate-500">العميل الطالب:</span>
                                <p className="text-slate-800 font-extrabold">{clientName}</p>
                              </div>
                              <div>
                                <span className="text-slate-500">المعتمر عنه:</span>
                                <p className="text-[#a37a28] font-extrabold text-[10px]">{worshipperName} ({relationship})</p>
                              </div>
                              {recommendedPrayers && (
                                <div className="bg-white p-2 rounded border border-slate-100 max-h-16 overflow-y-auto shadow-inner">
                                  <span className="text-slate-500 text-[8px] block">الأدعية الموصى بقراءتها:</span>
                                  <p className="text-slate-600 italic text-[8px] leading-relaxed mt-0.5 select-text">
                                    "{recommendedPrayers}"
                                  </p>
                                </div>
                              )}
                            </div>

                            <div className="flex gap-2 pt-1">
                              <button
                                onClick={() => {
                                  setUmrahStatus("idle");
                                }}
                                className="flex-1 py-1.5 bg-white text-slate-500 border border-slate-200 hover:bg-slate-50 rounded font-bold text-[9px] cursor-pointer transition-colors shadow-sm"
                              >
                                رفض الطلب
                              </button>
                              <button
                                onClick={() => {
                                  setUmrahStatus("accepted");
                                }}
                                className="flex-1 py-1.5 bg-[#0b192c] text-white hover:bg-[#1e293b] rounded font-black text-[9px] cursor-pointer transition-colors shadow-sm"
                              >
                                قبول والبدء
                              </button>
                            </div>
                          </motion.div>
                        ) : (
                          /* ONLINE RADAR VIEW (WAITING) */
                          <div className="text-center space-y-2.5 py-4">
                            <div className="relative w-18 h-18 mx-auto flex items-center justify-center">
                              {/* Pulse rings */}
                              <span className="absolute inset-0 rounded-full bg-[#a37a28]/5 animate-ping" />
                              <span className="absolute inset-3 rounded-full bg-[#a37a28]/5" />
                              <div className="w-10 h-10 rounded-full bg-[#d4a64d]/10 border border-[#d4a64d]/20 text-[#a37a28] flex items-center justify-center relative shadow-inner">
                                <QiblaIcon className="w-4 h-4 animate-spin-slow text-[#a37a28]" />
                              </div>
                            </div>
                            <div className="space-y-1">
                              <h4 className="text-[10px] font-bold text-slate-800">بانتظار طلبات العمرة...</h4>
                              <p className="text-[8.5px] text-slate-500 leading-relaxed px-4">
                                أنت الآن متصل بالخادم وتظهر كشريك متاح للتنفيذ في مكة.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* STATS FOOTER */}
                      <footer className="grid grid-cols-3 gap-2 border-t border-slate-100 pt-1.5 text-center text-[7.5px] text-slate-500 font-bold">
                        <div className="p-1 rounded bg-slate-50 border border-slate-100 shadow-inner">
                          <span className="block font-black text-slate-800 text-[8.5px]">٠</span>
                          <span>الطلبات المنجزة</span>
                        </div>
                        <div className="p-1 rounded bg-slate-50 border border-slate-100 shadow-inner">
                          <span className="block font-black text-slate-800 text-[8.5px]">١٠٠%</span>
                          <span>معدل القبول</span>
                        </div>
                        <div className="p-1 rounded bg-slate-50 border border-slate-100 shadow-inner">
                          <span className="block font-black text-slate-800 text-[8.5px]">5.0 ★</span>
                          <span>التقييم الفردي</span>
                        </div>
                      </footer>
                    </motion.div>
                  )}

                  {/* SCREEN 3: ACTIVE EXECUTION PANEL */}
                  {performerAppStep === "active" && (
                    <motion.div
                      key="performer-active"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col justify-between h-[435px] space-y-2"
                    >
                      {/* HEADER */}
                      <header className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                        <span className="px-2 py-0.5 text-[8.5px] font-extrabold text-[#a37a28] bg-[#d4a64d]/10 border border-[#d4a64d]/20 rounded-full">
                          {umrahStatus === "accepted" && "مستعد بالميقات"}
                          {umrahStatus === "tawaf" && "طواف الركن"}
                          {umrahStatus === "sai" && "سعي النسك"}
                          {umrahStatus === "halq" && "التحلل النهائي"}
                          {umrahStatus === "completed" && "تم إتمام النسك"}
                        </span>
                        <div className="text-center">
                          <span className="text-[11px] font-black text-slate-800">تنفيذ نية العمرة</span>
                        </div>
                        <button
                          onClick={() => {
                            if (confirm("هل تريد إلغاء الرحلة؟")) {
                              setUmrahStatus("idle");
                            }
                          }}
                          className="text-[9px] text-rose-500 font-extrabold hover:text-rose-700 transition-colors"
                        >
                          إلغاء
                        </button>
                      </header>

                      <div className="flex-1 overflow-y-auto pr-0.5 space-y-2 scrollbar-none">
                        
                        {/* Target Info */}
                        <div className="rounded-xl bg-slate-50 border border-slate-150 p-2.5 text-right shadow-inner">
                          <span className="text-[8px] text-slate-500 font-bold">تؤدي العمرة الآن نيابة عن:</span>
                          <h4 className="text-[10px] font-extrabold text-[#a37a28] mt-0.5">{worshipperName} ({relationship})</h4>
                          <p className="text-[8px] text-slate-400 mt-1 font-medium">العميل المرسل: {clientName}</p>
                        </div>

                        {/* Custom prayers from client (PARCHMENT CARD - LIGHT IVORY) */}
                        <div className="rounded-xl bg-[#faf7f0] border border-[#d4a64d]/30 p-2.5 text-right shadow-sm">
                          <div className="flex items-center gap-1.5 text-[#a37a28] mb-1.5 border-b border-[#d4a64d]/10 pb-1">
                            <BookOpen className="w-3 h-3" />
                            <span className="text-[9px] font-bold">الأدعية الموصى بقراءتها بالنسك</span>
                          </div>
                          {recommendedPrayers ? (
                            <p className="text-[8.5px] leading-relaxed text-slate-700 select-text italic font-medium">
                              "{recommendedPrayers}"
                            </p>
                          ) : (
                            <p className="text-[8.5px] text-slate-400 italic">
                              (لم يرفق العميل أدعية مخصصة، يرجى الدعاء له بالصلاح والمغفرة)
                            </p>
                          )}
                        </div>

                        {/* Interactive Step checklist */}
                        <div className="rounded-xl border border-slate-150 bg-white p-2.5 text-right space-y-1.5 shadow-sm">
                          <span className="text-[8.5px] font-bold text-slate-500 block mb-0.5">خطوات رحلة العمرة الحالية:</span>
                          
                          {[
                            { step: "accepted", label: "تأكيد الإحرام واستحضار النية بالميقات", idx: 0 },
                            { step: "tawaf", label: "أداء الطواف ٧ أشواط حول الكعبة", idx: 1 },
                            { step: "sai", label: "أداء السعي ٧ أشواط بين الصفا والمروة", idx: 2 },
                            { step: "halq", label: "التحلل النهائي (الحلق أو التقصير)", idx: 3 },
                            { step: "completed", label: "توثيق الفيديو وإرسال التقرير النهائي للعميل", idx: 4 },
                          ].map((item, idx) => {
                            const isCurrent = umrahStatus === item.step;
                            const isDone = performerStepIndex > item.idx;
                            
                            return (
                              <div
                                key={idx}
                                className={cn(
                                  "flex justify-between items-center p-2 rounded-lg border text-[9px] font-medium transition-all",
                                  isCurrent ? "border-[#a37a28] bg-[#d4a64d]/10 text-slate-900 font-extrabold shadow-sm" :
                                  isDone ? "border-slate-100 bg-slate-50/40 text-slate-400" : "border-slate-100 text-slate-400/80 opacity-60 bg-white"
                                )}
                              >
                                <span className={cn(
                                  "w-3.5 h-3.5 rounded-full border grid place-items-center text-[8px] font-bold",
                                  isDone ? "border-emerald-500 bg-emerald-50 text-emerald-600" :
                                  isCurrent ? "border-[#a37a28] text-[#a37a28] bg-white animate-pulse" : "border-slate-200 text-slate-300"
                                )}>
                                  {isDone ? <Check className="w-2.5 h-2.5" /> : idx + 1}
                                </span>
                                <span className="flex-1 mr-2">{item.label}</span>
                              </div>
                            );
                          })}
                        </div>

                      </div>

                      {/* GPS tracking simulation tag & NEXT STEP CONTROL BUTTON */}
                      <div className="border-t border-slate-100 pt-2 mt-auto space-y-2 bg-white">
                        <div className="flex justify-between items-center rounded-lg bg-[#d4a64d]/10 border border-[#d4a64d]/20 p-1.5" dir="rtl">
                          <span className="text-[8.5px] text-[#a37a28] font-bold">موقع الـ GPS يرسل حالياً إحداثيات المشاعر للعميل</span>
                          <span className="h-1.5 w-1.5 rounded-full bg-[#a37a28] animate-ping" />
                        </div>

                        <button
                          onClick={advancePerformerStep}
                          className="w-full py-1.5 px-3 bg-[#0b192c] hover:bg-[#1e293b] text-white font-extrabold rounded-lg text-[9.5px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>
                            {umrahStatus === "accepted" && "تأكيد الإحرام والانتقال للكعبة"}
                            {umrahStatus === "tawaf" && "تأكيد إنهاء الطواف وبدء السعي"}
                            {umrahStatus === "sai" && "تأكيد إنهاء السعي والتوجه للتحلل"}
                            {umrahStatus === "halq" && "تأكيد التحلل وتوثيق الكاميرا"}
                            {umrahStatus === "completed" && "إرسال التقرير النهائي وإغلاق الرحلة"}
                          </span>
                        </button>
                      </div>

                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Decorative Outer Rings */}
          <div className="pointer-events-none absolute inset-[-18%] -z-10 rounded-[50px] border border-slate-200/50 animate-pulse" />
        </div>

      </div>

    </div>
  );
}
