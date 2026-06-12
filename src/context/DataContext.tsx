"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import * as defaults from "@/data/dashboardStats";

// Leaderboard default datasets
const defaultDatasets = [
  {
    id: "economy",
    name: "حجم الاقتصاد الإسلامي",
    nameEn: "Islamic Economy Size",
    color: "#0b192c",
    glowColor: "rgba(11, 25, 44, 0.4)",
    points: [0.0, 0.05, 0.12, 0.22, 0.32, 0.42, 0.48, 0.54, 0.58, 0.62, 0.65, 0.68, 0.70],
    metric: "7.0T$",
    metricLabel: "إجمالي الإنتاج",
  },
  {
    id: "pilgrims",
    name: "المعتمرون المستهدفون",
    nameEn: "Target Pilgrims",
    color: "#1e293b",
    glowColor: "rgba(30, 41, 59, 0.4)",
    points: [0.0, 0.03, 0.08, 0.15, 0.25, 0.31, 0.34, 0.37, 0.39, 0.41, 0.43, 0.44, 0.45],
    metric: "30M+",
    metricLabel: "سنوياً بحلول 2030",
  },
  {
    id: "muslims",
    name: "المسلمون حول العالم",
    nameEn: "Muslims Worldwide",
    color: "#ead2ac",
    glowColor: "rgba(234, 210, 172, 0.4)",
    points: [0.0, 0.02, 0.06, 0.11, 0.18, 0.23, 0.27, 0.29, 0.31, 0.32, 0.33, 0.34, 0.35],
    metric: "2.0B+",
    metricLabel: "قاعدة سوقية ضخمة",
  },
  {
    id: "niya",
    name: "حصة منصة نية المستهدفة",
    nameEn: "Niya Target Users",
    color: "#c59b27",
    glowColor: "rgba(197, 155, 39, 0.4)",
    points: [0.0, 0.01, 0.03, 0.05, 0.08, 0.11, 0.14, 0.16, 0.17, 0.18, 0.19, 0.20, 0.20],
    metric: "1.5M",
    metricLabel: "مستخدم نشط مستهدف",
  },
];

export interface DataState {
  heroTitle: string;
  heroSubtitle: string;
  heroBadge: string;
  heroStats: any[];
  aboutTitle: string;
  aboutDesc: string;
  serviceCards: any[];
  marketStats: any[];
  marketProblems: string[];
  solutionCards: any[];
  journeySteps: any[];
  trustFeatures: any[];
  businessModelCards: any[];
  dashboardKpis: any[];
  monthlyUserGrowth: any[];
  serviceDistribution: any[];
  impactGrowth: any[];
  dashboardProgress: any[];
  platformActivities: any[];
  regionalCards: any[];
  leaderboardDatasets: any[];
  
  // Dynamic section titles and lists
  simulationLabel: string;
  simulationHeading: string;
  simulationDesc: string;
  
  servicesLabel: string;
  servicesHeading: string;
  servicesDesc: string;
  
  aboutLabel: string;
  aboutBullets: any[];
  
  problemLabel: string;
  problemHeading: string;
  problemDesc: string;
  problemRightHeading: string;
  problemRightDesc: string;
  
  solutionLabel: string;
  solutionHeading: string;
  solutionDesc: string;
  
  stepsLabel: string;
  stepsHeading: string;
  stepsDesc: string;
  
  trustLabel: string;
  trustHeading: string;
  trustDesc: string;
  trustBullets: any[];
  
  businessModelLabel: string;
  businessModelHeading: string;
  
  investorLabel: string;
  investorHeading: string;
  investorDesc: string;
}

const defaultState: DataState = {
  heroTitle: "نية",
  heroSubtitle: "منصة رقمية تربط المسلمين حول العالم بخدمات العمرة بالنيابة وتوزيع الماء والتمر وإفطار الصائم، مع متابعة مباشرة وإثبات تنفيذ موثق من شركاء ميدانيين.",
  heroBadge: "عمرة وصدقات موسمية بتوثيق رقمي",
  heroStats: [...defaults.heroStats],
  aboutTitle: "نحوّل النية إلى أثر حقيقي موثق",
  aboutDesc: "نية ليست صفحة عرض فقط، بل تجربة تطبيق قابلة للاستخدام: سجل طلبات، حملات موسمية، مدفوعات، تتبع حالة، وتقارير تنفيذ تربط المستخدم بالشريك الميداني بثقة.",
  serviceCards: [...defaults.serviceCards],
  marketStats: [...defaults.marketStats],
  marketProblems: [...defaults.marketProblems],
  solutionCards: [...defaults.solutionCards],
  journeySteps: [...defaults.journeySteps],
  trustFeatures: [...defaults.trustFeatures],
  businessModelCards: [...defaults.businessModelCards],
  dashboardKpis: [...defaults.dashboardKpis],
  monthlyUserGrowth: [...defaults.monthlyUserGrowth],
  serviceDistribution: [...defaults.serviceDistribution],
  impactGrowth: [...defaults.impactGrowth],
  dashboardProgress: [...defaults.dashboardProgress],
  platformActivities: [...defaults.platformActivities],
  regionalCards: [...defaults.regionalCards],
  leaderboardDatasets: defaultDatasets,
  
  // Section Defaults
  simulationLabel: "المحاكاة التفاعلية",
  simulationHeading: "تتبع مباشر وتكامل لحظي لرحلة النسك",
  simulationDesc: "شاهد كيف تتم مزامنة البيانات بين تطبيق العميل طالب الخدمة وتطبيق مؤدي العمرة في المشاعر المقدسة لحظة بلحظة مع التتبع الجغرافي GPS.",
  
  servicesLabel: "خدمات نية",
  servicesHeading: "كل عمل صالح داخل تجربة واحدة موثوقة",
  servicesDesc: "الواجهة تعكس خدمات NIYA_App الحقيقية: طلب، دفع، تنفيذ، متابعة، ثم تقرير موثق يمكن الرجوع إليه.",
  
  aboutLabel: "من هو تطبيق نية؟",
  aboutBullets: [
    { icon: "bell", text: "متابعة مباشرة للحالة" },
    { icon: "users", text: "شبكة مزودين موثوقين" },
    { icon: "payment", text: "دفع إلكتروني آمن" },
    { icon: "proof", text: "تقارير رقمية موثقة" },
  ],
  
  problemLabel: "فرصة سوقية ضخمة وغير مستغلة",
  problemHeading: "سوق موجود، لكن يحتاج منصة تنظمه بثقة وفرص السوق",
  problemDesc: "ملايين المسلمين يريدون أداء العمرة بالنيابة والصدقات الموسمية، لكن الرحلة الحالية غالبا متفرقة وغير قابلة للقياس.",
  problemRightHeading: "واقع السوق اليوم: فجوة الثقة والبيانات",
  problemRightDesc: "رغم الحجم الضخم للسوق والطلب المتزايد عالمياً، إلا أن الرحلة الحالية تعاني من تشتت كبير وغياب للشفافية. الاعتماد المستمر على الطرق التقليدية واليدوية يصعب عمليات التوثيق والمتابعة للمستفيدين والجهات المانحة على حد سواء. منصة نية تسد هذه الفجوة بتقديم منصة تقنية متكاملة.",
  
  solutionLabel: "الحل",
  solutionHeading: "تجربة رقمية موثوقة للأعمال بالنيابة",
  solutionDesc: "نية تجمع الطلب والتنفيذ والتوثيق داخل نظام واضح للمستخدم والشريك والإدارة.",
  
  stepsLabel: "رحلة المستخدم",
  stepsHeading: "من النية إلى أثر موثق في ست خطوات",
  stepsDesc: "الرحلة مصممة كمسار واضح: المستخدم يعرف ماذا حدث، ومن نفذ، ومتى اكتمل الطلب.",
  
  trustLabel: "الأمان والشفافية",
  trustHeading: "بنية ثقة تليق بالعبادات والأمانات",
  trustDesc: "كل خدمة تحتاج أكثر من واجهة جميلة: نية تضيف نظام تتبع جغرافي متطور وتحقق صارم يربطك بالمشاعر المقدسة لحظة بلحظة.",
  trustBullets: [
    { title: "شركاء موثقون ميدانياً", desc: "اعتماد مسبق للشركاء ومراجعة شاملة ومستقلة لتقارير التنفيذ قبل إظهارها." },
    { title: "بوابة مدفوعات آمنة", desc: "عملية دفع مشفرة بالكامل تضمن سلامة وسجل طلبات واضح لكل معاملة." },
    { title: "تتبع جغرافي GPS", desc: "رصد مباشر ونشط لتتّبع حالة تنفيذ المعتمرين في المشاعر المقدسة بالخرائط والإحداثيات." },
    { title: "تقارير رقمية شفافة", desc: "توثيق شامل تشمل الصور، التحديثات وتفاصيل الأثر الميداني للطلبات." },
    { title: "خصوصية بيانات صارمة", desc: "حماية كاملة لبيانات المستفيدين والحد من مشاركتها ميدانياً للحفاظ على الخصوصية." }
  ],
  
  businessModelLabel: "نموذج العمل",
  businessModelHeading: "نموذج مستدام يحقق أثرا قابلا للقياس",
  
  investorLabel: "نموذج العرض الاستثماري",
  investorHeading: "لوحة توقعات النمو في السنة الأولى",
  investorDesc: "تقديرات الأثر ونمو المستخدمين وحجم المعاملات المستهدف لعرضه على المستثمرين للمرحلة التأسيسية.",
};

interface DataContextType {
  data: DataState;
  updateData: (key: keyof DataState, value: any) => void;
  resetData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<DataState>(defaultState);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load from local storage
    try {
      const saved = localStorage.getItem("niya_dynamic_data");
      if (saved) {
        // Merge saved data with default state to handle newly added fields
        const parsed = JSON.parse(saved);
        setData({
          ...defaultState,
          ...parsed
        });
      }
    } catch (e) {
      console.error("Failed to load local storage data:", e);
    }
    setIsLoaded(true);
  }, []);

  const updateData = (key: keyof DataState, value: any) => {
    setData((prev) => {
      const updated = { ...prev, [key]: value };
      try {
        localStorage.setItem("niya_dynamic_data", JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save data to local storage:", e);
      }
      return updated;
    });
  };

  const resetData = () => {
    setData(defaultState);
    try {
      localStorage.removeItem("niya_dynamic_data");
    } catch (e) {
      console.error("Failed to clear local storage:", e);
    }
  };

  return (
    <DataContext.Provider value={{ data, updateData, resetData }}>
      {isLoaded ? children : <div className="min-h-screen bg-bg flex items-center justify-center text-white">جاري التحميل...</div>}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
