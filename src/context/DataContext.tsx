"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import * as defaults from "@/data/dashboardStats";

// Leaderboard default datasets
const defaultDatasets = [
  {
    id: "economy",
    name: "حجم الاقتصاد الإسلامي",
    nameEn: "Islamic Economy Size",
    color: "#ec4899",
    glowColor: "rgba(236, 72, 153, 0.4)",
    points: [0.0, 0.05, 0.12, 0.22, 0.32, 0.42, 0.48, 0.54, 0.58, 0.62, 0.65, 0.68, 0.70],
    metric: "7.0T$",
    metricLabel: "إجمالي الإنتاج",
  },
  {
    id: "pilgrims",
    name: "المعتمرون المستهدفون",
    nameEn: "Target Pilgrims",
    color: "#06b6d4",
    glowColor: "rgba(6, 182, 212, 0.4)",
    points: [0.0, 0.03, 0.08, 0.15, 0.25, 0.31, 0.34, 0.37, 0.39, 0.41, 0.43, 0.44, 0.45],
    metric: "30M+",
    metricLabel: "سنوياً بحلول 2030",
  },
  {
    id: "muslims",
    name: "المسلمون حول العالم",
    nameEn: "Muslims Worldwide",
    color: "#a855f7",
    glowColor: "rgba(168, 85, 247, 0.4)",
    points: [0.0, 0.02, 0.06, 0.11, 0.18, 0.23, 0.27, 0.29, 0.31, 0.32, 0.33, 0.34, 0.35],
    metric: "2.0B+",
    metricLabel: "قاعدة سوقية ضخمة",
  },
  {
    id: "niya",
    name: "حصة منصة نية المستهدفة",
    nameEn: "Niya Target Users",
    color: "#eab308",
    glowColor: "rgba(234, 179, 8, 0.4)",
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
        setData(JSON.parse(saved));
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
