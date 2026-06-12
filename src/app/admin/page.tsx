"use client";

import React, { useState } from "react";
import { useData } from "@/context/DataContext";
import Link from "next/link";
import {
  Save,
  RotateCcw,
  Layout,
  TrendingUp,
  Activity,
  ArrowRight,
  PieChart,
  HelpCircle,
  CheckCircle,
  FileText,
  Sliders,
  List
} from "lucide-react";

type TabType = "general" | "sections" | "hero-stats" | "kpis" | "charts" | "activities";

const AVAILABLE_ICONS = [
  { value: "bell", label: "جرس (Bell)" },
  { value: "users", label: "مستخدمين (Users)" },
  { value: "payment", label: "بطاقة دفع (Payment)" },
  { value: "proof", label: "تقرير موثق (Proof)" },
  { value: "shield", label: "درع أمان (Shield)" },
  { value: "timer", label: "عداد وقت (Timer)" },
  { value: "globe", label: "كرة أرضية (Globe)" },
  { value: "umrah", label: "مبنى إسلامي (Umrah)" },
  { value: "water", label: "قطرة ماء (Water)" },
  { value: "dates", label: "نخلة/تمر (Dates)" },
  { value: "spark", label: "لمعان (Spark)" },
  { value: "report", label: "مستند/تقرير (Report)" }
];

export default function AdminPage() {
  const { data, updateData, resetData } = useData();
  const [activeTab, setActiveTab] = useState<TabType>("general");
  const [successMsg, setSuccessMsg] = useState("");

  // Local form states to handle edits before saving
  const [heroTitle, setHeroTitle] = useState(data.heroTitle);
  const [heroSubtitle, setHeroSubtitle] = useState(data.heroSubtitle);
  const [heroBadge, setHeroBadge] = useState(data.heroBadge);
  const [aboutTitle, setAboutTitle] = useState(data.aboutTitle);
  const [aboutDesc, setAboutDesc] = useState(data.aboutDesc);

  // New fields
  const [simulationLabel, setSimulationLabel] = useState(data.simulationLabel);
  const [simulationHeading, setSimulationHeading] = useState(data.simulationHeading);
  const [simulationDesc, setSimulationDesc] = useState(data.simulationDesc);

  const [servicesLabel, setServicesLabel] = useState(data.servicesLabel);
  const [servicesHeading, setServicesHeading] = useState(data.servicesHeading);
  const [servicesDesc, setServicesDesc] = useState(data.servicesDesc);

  const [aboutLabel, setAboutLabel] = useState(data.aboutLabel);
  const [aboutBullets, setAboutBullets] = useState([...data.aboutBullets]);

  const [problemLabel, setProblemLabel] = useState(data.problemLabel);
  const [problemHeading, setProblemHeading] = useState(data.problemHeading);
  const [problemDesc, setProblemDesc] = useState(data.problemDesc);
  const [problemRightHeading, setProblemRightHeading] = useState(data.problemRightHeading);
  const [problemRightDesc, setProblemRightDesc] = useState(data.problemRightDesc);

  const [solutionLabel, setSolutionLabel] = useState(data.solutionLabel);
  const [solutionHeading, setSolutionHeading] = useState(data.solutionHeading);
  const [solutionDesc, setSolutionDesc] = useState(data.solutionDesc);

  const [stepsLabel, setStepsLabel] = useState(data.stepsLabel);
  const [stepsHeading, setStepsHeading] = useState(data.stepsHeading);
  const [stepsDesc, setStepsDesc] = useState(data.stepsDesc);

  const [trustLabel, setTrustLabel] = useState(data.trustLabel);
  const [trustHeading, setTrustHeading] = useState(data.trustHeading);
  const [trustDesc, setTrustDesc] = useState(data.trustDesc);
  const [trustBullets, setTrustBullets] = useState([...data.trustBullets]);

  const [businessModelLabel, setBusinessModelLabel] = useState(data.businessModelLabel);
  const [businessModelHeading, setBusinessModelHeading] = useState(data.businessModelHeading);

  const [investorLabel, setInvestorLabel] = useState(data.investorLabel);
  const [investorHeading, setInvestorHeading] = useState(data.investorHeading);
  const [investorDesc, setInvestorDesc] = useState(data.investorDesc);

  const [heroStats, setHeroStats] = useState([...data.heroStats]);
  const [dashboardKpis, setDashboardKpis] = useState([...data.dashboardKpis]);
  const [serviceDistribution, setServiceDistribution] = useState([...data.serviceDistribution]);
  const [platformActivities, setPlatformActivities] = useState([...data.platformActivities]);

  const showNotification = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3500);
  };

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    updateData("heroTitle", heroTitle);
    updateData("heroSubtitle", heroSubtitle);
    updateData("heroBadge", heroBadge);
    updateData("aboutTitle", aboutTitle);
    updateData("aboutDesc", aboutDesc);
    showNotification("تم حفظ النصوص العامة بنجاح!");
  };

  const handleSaveSections = (e: React.FormEvent) => {
    e.preventDefault();
    updateData("simulationLabel", simulationLabel);
    updateData("simulationHeading", simulationHeading);
    updateData("simulationDesc", simulationDesc);

    updateData("servicesLabel", servicesLabel);
    updateData("servicesHeading", servicesHeading);
    updateData("servicesDesc", servicesDesc);

    updateData("aboutLabel", aboutLabel);
    updateData("aboutBullets", aboutBullets);

    updateData("problemLabel", problemLabel);
    updateData("problemHeading", problemHeading);
    updateData("problemDesc", problemDesc);
    updateData("problemRightHeading", problemRightHeading);
    updateData("problemRightDesc", problemRightDesc);

    updateData("solutionLabel", solutionLabel);
    updateData("solutionHeading", solutionHeading);
    updateData("solutionDesc", solutionDesc);

    updateData("stepsLabel", stepsLabel);
    updateData("stepsHeading", stepsHeading);
    updateData("stepsDesc", stepsDesc);

    updateData("trustLabel", trustLabel);
    updateData("trustHeading", trustHeading);
    updateData("trustDesc", trustDesc);
    updateData("trustBullets", trustBullets);

    updateData("businessModelLabel", businessModelLabel);
    updateData("businessModelHeading", businessModelHeading);

    updateData("investorLabel", investorLabel);
    updateData("investorHeading", investorHeading);
    updateData("investorDesc", investorDesc);

    showNotification("تم حفظ المقاطع المضافة بنجاح!");
  };

  const handleSaveHeroStats = (e: React.FormEvent) => {
    e.preventDefault();
    updateData("heroStats", heroStats);
    showNotification("تم حفظ إحصائيات الهيرو بنجاح!");
  };

  const handleSaveKpis = (e: React.FormEvent) => {
    e.preventDefault();
    updateData("dashboardKpis", dashboardKpis);
    showNotification("تم حفظ مؤشرات الأداء بنجاح!");
  };

  const handleSaveCharts = (e: React.FormEvent) => {
    e.preventDefault();
    updateData("serviceDistribution", serviceDistribution);
    showNotification("تم حفظ بيانات المخطط البياني بنجاح!");
  };

  const handleSaveActivities = (e: React.FormEvent) => {
    e.preventDefault();
    updateData("platformActivities", platformActivities);
    showNotification("تم حفظ سجل النشاط التشغيلي بنجاح!");
  };

  const handleReset = () => {
    if (confirm("هل أنت متأكد من رغبتك في استعادة البيانات الأصلية وإلغاء جميع التعديلات؟")) {
      resetData();
      // Reload states from defaults
      window.location.reload();
    }
  };

  const updateHeroStatField = (index: number, field: string, value: string) => {
    const updated = [...heroStats];
    updated[index] = { ...updated[index], [field]: value };
    setHeroStats(updated);
  };

  const updateKpiField = (index: number, field: string, value: string) => {
    const updated = [...dashboardKpis];
    updated[index] = { ...updated[index], [field]: value };
    setDashboardKpis(updated);
  };

  const updateServiceDistField = (index: number, field: string, value: any) => {
    const updated = [...serviceDistribution];
    updated[index] = { ...updated[index], [field]: value };
    setServiceDistribution(updated);
  };

  const updateActivityField = (index: number, field: string, value: string) => {
    const updated = [...platformActivities];
    updated[index] = { ...updated[index], [field]: value };
    setPlatformActivities(updated);
  };

  const updateAboutBulletText = (index: number, value: string) => {
    const updated = [...aboutBullets];
    updated[index] = { ...updated[index], text: value };
    setAboutBullets(updated);
  };

  const updateAboutBulletIcon = (index: number, value: string) => {
    const updated = [...aboutBullets];
    updated[index] = { ...updated[index], icon: value };
    setAboutBullets(updated);
  };

  const updateTrustBulletField = (index: number, field: "title" | "desc", value: string) => {
    const updated = [...trustBullets];
    updated[index] = { ...updated[index], [field]: value };
    setTrustBullets(updated);
  };

  return (
    <div className="relative min-h-screen bg-[linear-gradient(180deg,#030712_0%,#07101c_52%,#030712_100%)] text-white font-arabic p-6 md:p-12 overflow-x-hidden">
      {/* Background decorations */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[linear-gradient(120deg,rgba(20,184,166,0.04),transparent_35%),linear-gradient(250deg,rgba(212,166,77,0.06),transparent_40%)]" />
      <div className="fixed inset-0 z-0 pointer-events-none bg-[linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative z-10 max-w-[1200px] mx-auto space-y-8">
        
        {/* Header bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#d4a64d2e] pb-6">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-xl border border-[#d4a64d55] bg-[#d4a64d1f] text-2xl font-black text-[#f2d58e] shadow-[0_0_20px_rgba(212,166,77,0.2)] animate-pulse">
              ن
            </span>
            <div>
              <h1 className="text-2xl font-extrabold text-white">لوحة تحكم منصة نية</h1>
              <p className="text-xs text-slate-400 mt-1">إدارة محتوى الموقع ومؤشرات الأثر التفاعلية مباشرة</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold border border-red-500/20 bg-red-500/10 rounded-lg text-red-300 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              إعادة الضبط
            </button>
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold border border-white/15 bg-white/[0.05] rounded-lg text-slate-200 hover:bg-white hover:text-slate-900 transition-all"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              الموقع الرئيسي
            </Link>
          </div>
        </div>

        {/* Action success alert */}
        {successMsg && (
          <div className="flex items-center gap-2 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 shadow-[0_4px_20px_rgba(16,185,129,0.15)] animate-float">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-bold">{successMsg}</span>
          </div>
        )}

        {/* Tab Selection */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 border-b border-white/5 pb-4">
          {[
            { id: "general", label: "نصوص الواجهة", icon: Layout },
            { id: "sections", label: "مقاطع المحتوى", icon: Sliders },
            { id: "hero-stats", label: "إحصائيات الهيرو", icon: FileText },
            { id: "kpis", label: "مؤشرات المستثمر", icon: TrendingUp },
            { id: "charts", label: "الرسومات البيانية", icon: PieChart },
            { id: "activities", label: "النشاط التشغيلي", icon: Activity },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                  isActive
                    ? "border-[#d4a64d] bg-[#d4a64d1f] text-[#f2d58e] shadow-[0_0_15px_rgba(212,166,77,0.1)]"
                    : "border-white/5 bg-white/[0.02] text-slate-400 hover:text-white hover:border-white/10"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Edit forms wrapper */}
        <div className="rounded-2xl border border-[#d4a64d24] bg-[#050914] p-6 md:p-8 shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
          
          {/* TAB 1: General texts */}
          {activeTab === "general" && (
            <form onSubmit={handleSaveGeneral} className="space-y-6">
              <h3 className="text-lg font-bold text-[#f2d58e] border-b border-white/5 pb-3">إعدادات النصوص الأساسية للموقع</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400">شعار / عنوان الواجهة (Hero Title)</label>
                  <input
                    type="text"
                    value={heroTitle}
                    onChange={(e) => setHeroTitle(e.target.value)}
                    className="w-full bg-[#0b1329] border border-white/10 rounded-lg px-4 py-2.5 text-sm font-bold text-white focus:border-[#d4a64d] focus:outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400">الشريط العلوي الترويجي (Hero Badge)</label>
                  <input
                    type="text"
                    value={heroBadge}
                    onChange={(e) => setHeroBadge(e.target.value)}
                    className="w-full bg-[#0b1329] border border-white/10 rounded-lg px-4 py-2.5 text-sm font-bold text-white focus:border-[#d4a64d] focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400">الوصف الرئيسي للمنصة (Hero Description)</label>
                <textarea
                  value={heroSubtitle}
                  onChange={(e) => setHeroSubtitle(e.target.value)}
                  rows={4}
                  className="w-full bg-[#0b1329] border border-white/10 rounded-lg px-4 py-2.5 text-sm leading-6 text-slate-200 focus:border-[#d4a64d] focus:outline-none transition-all"
                />
              </div>

              <div className="border-t border-white/5 pt-6 space-y-6">
                <h4 className="text-md font-bold text-[#f2d58e]">قسم التعريف بالمنصة (About Section)</h4>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400">عنوان قسم من نحن</label>
                  <input
                    type="text"
                    value={aboutTitle}
                    onChange={(e) => setAboutTitle(e.target.value)}
                    className="w-full bg-[#0b1329] border border-white/10 rounded-lg px-4 py-2.5 text-sm font-bold text-white focus:border-[#d4a64d] focus:outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400">وصف قسم من نحن</label>
                  <textarea
                    value={aboutDesc}
                    onChange={(e) => setAboutDesc(e.target.value)}
                    rows={4}
                    className="w-full bg-[#0b1329] border border-white/10 rounded-lg px-4 py-2.5 text-sm leading-6 text-slate-200 focus:border-[#d4a64d] focus:outline-none transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 font-bold text-slate-900 bg-gradient-to-l from-[#ead2ac] to-[#d4a64d] rounded-lg shadow-lg hover:shadow-[#d4a64d2d] transition-all duration-300 cursor-pointer"
              >
                <Save className="w-5 h-5" />
                حفظ التغييرات
              </button>
            </form>
          )}

          {/* TAB 2: Sections Detail */}
          {activeTab === "sections" && (
            <form onSubmit={handleSaveSections} className="space-y-12">
              <h3 className="text-lg font-bold text-[#f2d58e] border-b border-white/5 pb-3">إدارة مقاطع المحتوى والترجمة والكلمات</h3>

              {/* 1. Simulation */}
              <div className="p-5 rounded-xl border border-white/5 bg-[#0b1329] space-y-4">
                <h4 className="text-sm font-bold text-[#d4a64d]">1. قسم المحاكاة التفاعلية (Simulation Section)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-slate-400">الملصق الصغير (Label)</label>
                    <input
                      type="text"
                      value={simulationLabel}
                      onChange={(e) => setSimulationLabel(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 text-sm text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-slate-400">العنوان الرئيسي (Heading)</label>
                    <input
                      type="text"
                      value={simulationHeading}
                      onChange={(e) => setSimulationHeading(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 text-sm text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-slate-400">الشرح الوصفي (Description)</label>
                  <textarea
                    value={simulationDesc}
                    onChange={(e) => setSimulationDesc(e.target.value)}
                    rows={2}
                    className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 text-sm text-slate-200"
                  />
                </div>
              </div>

              {/* 2. Services */}
              <div className="p-5 rounded-xl border border-white/5 bg-[#0b1329] space-y-4">
                <h4 className="text-sm font-bold text-[#d4a64d]">2. قسم خدمات المنصة (Services Section)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-slate-400">الملصق الصغير (Label)</label>
                    <input
                      type="text"
                      value={servicesLabel}
                      onChange={(e) => setServicesLabel(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 text-sm text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-slate-400">العنوان الرئيسي (Heading)</label>
                    <input
                      type="text"
                      value={servicesHeading}
                      onChange={(e) => setServicesHeading(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 text-sm text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-slate-400">الشرح الوصفي (Description)</label>
                  <textarea
                    value={servicesDesc}
                    onChange={(e) => setServicesDesc(e.target.value)}
                    rows={2}
                    className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 text-sm text-slate-200"
                  />
                </div>
              </div>

              {/* 3. About Bullets */}
              <div className="p-5 rounded-xl border border-white/5 bg-[#0b1329] space-y-4">
                <h4 className="text-sm font-bold text-[#d4a64d]">3. قسم التعريف والميزات (About Section)</h4>
                <div className="space-y-2">
                  <label className="text-xs text-slate-400">الملصق الصغير (Label)</label>
                  <input
                    type="text"
                    value={aboutLabel}
                    onChange={(e) => setAboutLabel(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 text-sm text-white"
                  />
                </div>

                <div className="space-y-3 pt-3 border-t border-white/5">
                  <span className="text-xs font-bold text-slate-300 block">الميزات المرافقة (4 ميزات):</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {aboutBullets.map((bullet, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-black/20 border border-white/5 space-y-3">
                        <span className="text-[10px] text-gold font-bold">الميزة {idx + 1}</span>
                        <div className="grid grid-cols-1 sm:grid-cols-[1.5fr_1fr] gap-2">
                          <input
                            type="text"
                            value={bullet.text}
                            onChange={(e) => updateAboutBulletText(idx, e.target.value)}
                            className="bg-black/40 border border-white/10 rounded px-2.5 py-1 text-xs text-white"
                            placeholder="النص المرافق"
                          />
                          <select
                            value={bullet.icon}
                            onChange={(e) => updateAboutBulletIcon(idx, e.target.value)}
                            className="bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-slate-200"
                          >
                            {AVAILABLE_ICONS.map((ico) => (
                              <option key={ico.value} value={ico.value}>
                                {ico.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 4. Problem */}
              <div className="p-5 rounded-xl border border-white/5 bg-[#0b1329] space-y-4">
                <h4 className="text-sm font-bold text-[#d4a64d]">4. قسم التحديات والفرصة السوقية (Problem Section)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-slate-400">الملصق الصغير (Label)</label>
                    <input
                      type="text"
                      value={problemLabel}
                      onChange={(e) => setProblemLabel(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 text-sm text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-slate-400">العنوان الرئيسي (Heading)</label>
                    <input
                      type="text"
                      value={problemHeading}
                      onChange={(e) => setProblemHeading(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 text-sm text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-slate-400">شرح فجوة السوق (Description)</label>
                  <textarea
                    value={problemDesc}
                    onChange={(e) => setProblemDesc(e.target.value)}
                    rows={2}
                    className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 text-sm text-slate-200"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/5">
                  <div className="space-y-2">
                    <label className="text-xs text-slate-400">عنوان العمود الجانبي الأيمن</label>
                    <input
                      type="text"
                      value={problemRightHeading}
                      onChange={(e) => setProblemRightHeading(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 text-sm text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-slate-400">وصف العمود الجانبي الأيمن</label>
                    <textarea
                      value={problemRightDesc}
                      onChange={(e) => setProblemRightDesc(e.target.value)}
                      rows={3}
                      className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 text-sm text-slate-200"
                    />
                  </div>
                </div>
              </div>

              {/* 5. Solution */}
              <div className="p-5 rounded-xl border border-white/5 bg-[#0b1329] space-y-4">
                <h4 className="text-sm font-bold text-[#d4a64d]">5. قسم الحل والتحول الرقمي (Solution Section)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-slate-400">الملصق الصغير (Label)</label>
                    <input
                      type="text"
                      value={solutionLabel}
                      onChange={(e) => setSolutionLabel(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 text-sm text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-slate-400">العنوان الرئيسي (Heading)</label>
                    <input
                      type="text"
                      value={solutionHeading}
                      onChange={(e) => setSolutionHeading(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 text-sm text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-slate-400">شرح الحل (Description)</label>
                  <textarea
                    value={solutionDesc}
                    onChange={(e) => setSolutionDesc(e.target.value)}
                    rows={2}
                    className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 text-sm text-slate-200"
                  />
                </div>
              </div>

              {/* 6. Steps */}
              <div className="p-5 rounded-xl border border-white/5 bg-[#0b1329] space-y-4">
                <h4 className="text-sm font-bold text-[#d4a64d]">6. قسم رحلة المستخدم (Journey Steps Section)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-slate-400">الملصق الصغير (Label)</label>
                    <input
                      type="text"
                      value={stepsLabel}
                      onChange={(e) => setStepsLabel(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 text-sm text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-slate-400">العنوان الرئيسي (Heading)</label>
                    <input
                      type="text"
                      value={stepsHeading}
                      onChange={(e) => setStepsHeading(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 text-sm text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-slate-400">شرح رحلة الخطوات (Description)</label>
                  <textarea
                    value={stepsDesc}
                    onChange={(e) => setStepsDesc(e.target.value)}
                    rows={2}
                    className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 text-sm text-slate-200"
                  />
                </div>
              </div>

              {/* 7. Trust */}
              <div className="p-5 rounded-xl border border-white/5 bg-[#0b1329] space-y-4">
                <h4 className="text-sm font-bold text-[#d4a64d]">7. قسم الأمان والتتبع الجغرافي (Trust Section)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-slate-400">الملصق الصغير (Label)</label>
                    <input
                      type="text"
                      value={trustLabel}
                      onChange={(e) => setTrustLabel(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 text-sm text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-slate-400">العنوان الرئيسي (Heading)</label>
                    <input
                      type="text"
                      value={trustHeading}
                      onChange={(e) => setTrustHeading(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 text-sm text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-slate-400">شرح الأمان (Description)</label>
                  <textarea
                    value={trustDesc}
                    onChange={(e) => setTrustDesc(e.target.value)}
                    rows={2}
                    className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 text-sm text-slate-200"
                  />
                </div>

                <div className="space-y-3 pt-3 border-t border-white/5">
                  <span className="text-xs font-bold text-slate-300 block">قائمة التوضيحات (5 بنود):</span>
                  <div className="space-y-2">
                    {trustBullets.map((bullet, idx) => (
                      <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-2 p-3 rounded bg-black/20 border border-white/5">
                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-400">عنوان البند {idx + 1}</label>
                          <input
                            type="text"
                            value={bullet.title}
                            onChange={(e) => updateTrustBulletField(idx, "title", e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded px-2.5 py-1 text-xs text-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-400">شرح البند {idx + 1}</label>
                          <input
                            type="text"
                            value={bullet.desc}
                            onChange={(e) => updateTrustBulletField(idx, "desc", e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded px-2.5 py-1 text-xs text-white"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 8. Business Model */}
              <div className="p-5 rounded-xl border border-white/5 bg-[#0b1329] space-y-4">
                <h4 className="text-sm font-bold text-[#d4a64d]">8. قسم نموذج العمل والأثر المستدام (Business Model Section)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-slate-400">الملصق الصغير (Label)</label>
                    <input
                      type="text"
                      value={businessModelLabel}
                      onChange={(e) => setBusinessModelLabel(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 text-sm text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-slate-400">العنوان الرئيسي (Heading)</label>
                    <input
                      type="text"
                      value={businessModelHeading}
                      onChange={(e) => setBusinessModelHeading(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 text-sm text-white"
                    />
                  </div>
                </div>
              </div>

              {/* 9. Investor Dashboard */}
              <div className="p-5 rounded-xl border border-white/5 bg-[#0b1329] space-y-4">
                <h4 className="text-sm font-bold text-[#d4a64d]">9. مقطع عرض المستثمر النموذجي (Investor Dashboard Section)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-slate-400">الملصق الصغير (Label)</label>
                    <input
                      type="text"
                      value={investorLabel}
                      onChange={(e) => setInvestorLabel(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 text-sm text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-slate-400">العنوان الرئيسي (Heading)</label>
                    <input
                      type="text"
                      value={investorHeading}
                      onChange={(e) => setInvestorHeading(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 text-sm text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-slate-400">الشرح الوصفي (Description)</label>
                  <textarea
                    value={investorDesc}
                    onChange={(e) => setInvestorDesc(e.target.value)}
                    rows={2}
                    className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 text-sm text-slate-200"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 font-bold text-slate-900 bg-gradient-to-l from-[#ead2ac] to-[#d4a64d] rounded-lg shadow-lg hover:shadow-[#d4a64d2d] transition-all duration-300 cursor-pointer"
              >
                <Save className="w-5 h-5" />
                حفظ التغييرات للمقاطع
              </button>
            </form>
          )}

          {/* TAB 3: Hero Stats */}
          {activeTab === "hero-stats" && (
            <form onSubmit={handleSaveHeroStats} className="space-y-6">
              <h3 className="text-lg font-bold text-[#f2d58e] border-b border-white/5 pb-3">إحصائيات واجهة البداية (3 بطاقات)</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {heroStats.map((stat, idx) => (
                  <div key={idx} className="p-5 rounded-xl border border-white/5 bg-[#0b1329] space-y-4">
                    <h4 className="text-xs font-bold text-gold">البطاقة {idx + 1}</h4>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 block">القيمة الرقمية (Value)</label>
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => updateHeroStatField(idx, "value", e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-1.5 text-xs text-white focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 block">الوصف القصير (Label)</label>
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => updateHeroStatField(idx, "label", e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-1.5 text-xs text-white focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 block">الشرح المطول (Description)</label>
                      <textarea
                        value={stat.description}
                        onChange={(e) => updateHeroStatField(idx, "description", e.target.value)}
                        rows={2}
                        className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-1.5 text-xs text-slate-200 focus:border-gold focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 font-bold text-slate-900 bg-gradient-to-l from-[#ead2ac] to-[#d4a64d] rounded-lg shadow-lg hover:shadow-[#d4a64d2d] transition-all duration-300 cursor-pointer"
              >
                <Save className="w-5 h-5" />
                حفظ الإحصائيات
              </button>
            </form>
          )}

          {/* TAB 4: Investor KPIs */}
          {activeTab === "kpis" && (
            <form onSubmit={handleSaveKpis} className="space-y-6">
              <h3 className="text-lg font-bold text-[#f2d58e] border-b border-white/5 pb-3">مؤشرات الأداء التنبؤية (لوحة العرض الاستثماري)</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {dashboardKpis.map((kpi, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-white/5 bg-[#0b1329] space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-[#d4a64d] bg-[#d4a64d14] px-2 py-0.5 rounded">مؤشر {idx + 1}</span>
                      <span className="text-[10px] text-slate-500">Tone: {kpi.tone}</span>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400">الاسم / العنوان</label>
                      <input
                        type="text"
                        value={kpi.label}
                        onChange={(e) => updateKpiField(idx, "label", e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-md px-2 py-1 text-xs text-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400">القيمة</label>
                        <input
                          type="text"
                          value={kpi.value}
                          onChange={(e) => updateKpiField(idx, "value", e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-md px-2 py-1 text-xs text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400">نسبة النمو</label>
                        <input
                          type="text"
                          value={kpi.trend}
                          onChange={(e) => updateKpiField(idx, "trend", e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-md px-2 py-1 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 font-bold text-slate-900 bg-gradient-to-l from-[#ead2ac] to-[#d4a64d] rounded-lg shadow-lg hover:shadow-[#d4a64d2d] transition-all duration-300 cursor-pointer"
              >
                <Save className="w-5 h-5" />
                حفظ مؤشرات الأداء
              </button>
            </form>
          )}

          {/* TAB 5: Service Distribution Chart */}
          {activeTab === "charts" && (
            <form onSubmit={handleSaveCharts} className="space-y-6">
              <h3 className="text-lg font-bold text-[#f2d58e] border-b border-white/5 pb-3">مخطط توزيع الخدمات الدائري (Donut Chart)</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {serviceDistribution.map((dist, idx) => (
                  <div key={idx} className="p-5 rounded-xl border border-white/5 bg-[#0b1329] space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: dist.color }} />
                      <span className="text-xs font-bold text-white">{dist.name}</span>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 block">اسم الخدمة</label>
                      <input
                        type="text"
                        value={dist.name}
                        onChange={(e) => updateServiceDistField(idx, "name", e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-1.5 text-xs text-white focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 block">النسبة المئوية (%)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={dist.value}
                        onChange={(e) => updateServiceDistField(idx, "value", parseInt(e.target.value) || 0)}
                        className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-1.5 text-xs text-white focus:border-gold focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-lg border border-teal-500/20 bg-teal-500/5 p-4 flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <p className="text-xs text-teal-200/80 leading-relaxed">
                  تأكد من أن مجموع نسب الخدمات الأربع يساوي <strong>100%</strong> لضمان ظهور الرسم البياني الدائري بشكل دقيق ومتناسق في لوحة أداء المستثمر.
                </p>
              </div>

              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 font-bold text-slate-900 bg-gradient-to-l from-[#ead2ac] to-[#d4a64d] rounded-lg shadow-lg hover:shadow-[#d4a64d2d] transition-all duration-300 cursor-pointer"
              >
                <Save className="w-5 h-5" />
                حفظ بيانات المخطط
              </button>
            </form>
          )}

          {/* TAB 6: Live Activity Feed */}
          {activeTab === "activities" && (
            <form onSubmit={handleSaveActivities} className="space-y-6">
              <h3 className="text-lg font-bold text-[#f2d58e] border-b border-white/5 pb-3">سجل النشاط التشغيلي المباشر (الأثر والتنفيذ الميداني)</h3>
              
              <div className="space-y-4">
                {platformActivities.map((act, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-white/5 bg-[#0b1329] grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400">عنوان العملية</label>
                      <input
                        type="text"
                        value={act.title}
                        onChange={(e) => updateActivityField(idx, "title", e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400">التفاصيل الميدانية</label>
                      <input
                        type="text"
                        value={act.detail}
                        onChange={(e) => updateActivityField(idx, "detail", e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400">الوقت المنقضي</label>
                      <input
                        type="text"
                        value={act.time}
                        onChange={(e) => updateActivityField(idx, "time", e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 font-bold text-slate-900 bg-gradient-to-l from-[#ead2ac] to-[#d4a64d] rounded-lg shadow-lg hover:shadow-[#d4a64d2d] transition-all duration-300 cursor-pointer"
              >
                <Save className="w-5 h-5" />
                حفظ سجل النشاطات
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}
