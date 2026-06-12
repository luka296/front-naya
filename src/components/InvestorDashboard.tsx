"use client";

import { motion } from "framer-motion";
import {
  Activity,
  BarChart3,
  Bell,
  LineChart,
  PieChart,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { ChartCard } from "@/components/ChartCard";
import { DashboardCard } from "@/components/DashboardCard";
import { useData } from "@/context/DataContext";
import { cn } from "@/lib/utils";

const compactNumber = (value: number) => {
  if (value >= 1_000_000) return `${value / 1_000_000}M`;
  if (value >= 1_000) return `${Math.round(value / 1_000)}K`;
  return value.toString();
};

const toneClasses = {
  gold: "bg-[#d4a64d]/10 text-[#a37a28] border-gold/15",
  teal: "bg-[#0b192c]/5 text-[#0b192c] border-[#0b192c]/10",
  blue: "bg-[#1e293b]/5 text-[#1e293b] border-[#1e293b]/10",
};

export function InvestorDashboard() {
  const { data } = useData();
  const {
    dashboardKpis,
    dashboardProgress,
    impactGrowth,
    monthlyUserGrowth,
    serviceDistribution,
    platformActivities,
    regionalCards,
    investorLabel,
    investorHeading,
    investorDesc,
  } = data;

  return (
    <div className="w-full">
      {/* Dashboard Window */}
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.75, ease: "easeOut" }}
        className="overflow-hidden rounded-[28px] border border-slate-200 bg-white text-slate-800 shadow-[0_20px_60px_rgba(15,23,42,0.05)]"
        dir="ltr"
      >
          {/* Header Bar */}
          <div className="bg-slate-50 px-4 py-4 text-slate-800 md:px-6 border-b border-slate-150">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3" dir="rtl">
                <span className="grid h-10 w-10 place-items-center rounded-lg border border-[#d4a64d]/30 bg-[#d4a64d]/10 text-lg font-extrabold text-[#a37a28]">
                  ن
                </span>
                <div>
                  <h3 className="text-base font-extrabold text-slate-800">Niya Investor OS</h3>
                  <p className="text-xs text-slate-500">Forecast / Growth / GMV Projection / Year 1</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2" dir="rtl">
                {["نموذج التنبؤ", "السنة الأولى"].map((item, index) => (
                  <span
                    key={item}
                    className={cn(
                      "rounded-lg px-3 py-2 text-xs font-bold shadow-sm",
                      index === 0 ? "bg-slate-800 text-white" : "bg-slate-200/60 text-slate-600"
                    )}
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3" dir="rtl">
                <button
                  className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm"
                  aria-label="تنبيهات لوحة البيانات"
                >
                  <Bell className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-[#a37a28] text-xs font-extrabold text-white">
                    N
                  </span>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Niya Pitch</p>
                    <p className="text-[10px] text-slate-500">Investor view</p>
                  </div>
                </div>
              </div>
            </div>

            {/* KPI Cards Top Grid */}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4" dir="rtl">
              {dashboardKpis.slice(0, 4).map((kpi, index) => (
                <div
                  key={kpi.label}
                  className="rounded-lg border border-slate-150 bg-white p-4 shadow-sm"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="text-xs font-bold text-slate-500">{kpi.label}</span>
                    <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600">
                      {kpi.trend}
                    </span>
                  </div>
                  <AnimatedCounter
                    value={kpi.value}
                    duration={2.4}
                    className="text-3xl font-extrabold text-slate-800"
                  />
                  <div className="mt-3 h-1 overflow-hidden rounded-full bg-slate-100">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${70 + index * 7}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.3, delay: 0.2 + index * 0.08 }}
                      className="h-full rounded-full bg-gradient-to-l from-[#a37a28] to-[#0b192c]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Dashboard Panels */}
          <div className="grid gap-5 bg-slate-50/50 p-4 md:p-6 grid-cols-1">
            <main className="min-w-0 space-y-5" dir="rtl">
              {/* Secondary KPIs */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {dashboardKpis.slice(4, 8).map((kpi, index) => (
                  <DashboardCard key={kpi.label} className="p-4" delay={index * 0.04}>
                    <div className="flex items-start justify-between gap-3" dir="rtl">
                      <div>
                        <AnimatedCounter
                          value={kpi.value}
                          duration={2}
                          className="text-2xl font-extrabold text-slate-800"
                        />
                        <p className="mt-2 text-xs font-bold leading-5 text-slate-500">{kpi.label}</p>
                      </div>
                      <span
                        className={cn(
                          "rounded-full border px-2 py-1 text-[10px] font-extrabold shadow-sm",
                          toneClasses[kpi.tone as keyof typeof toneClasses]
                        )}
                      >
                        {kpi.trend}
                      </span>
                    </div>
                  </DashboardCard>
                ))}
              </div>

              {/* Main Forecast Charts Row */}
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <ChartCard title="نمو المستخدمين المتوقع" eyebrow="السنة الأولى" icon={BarChart3}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyUserGrowth} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                      <CartesianGrid stroke="#f1f5f9" vertical={false} />
                      <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 11 }} />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: "#64748b", fontSize: 11 }}
                        tickFormatter={(value) => compactNumber(Number(value))}
                      />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#fff", borderColor: "#e2e8f0", borderRadius: "8px", color: "#0f172a", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                        cursor={{ fill: "rgba(163,122,40,0.04)" }}
                        formatter={(value) => [`${Number(value).toLocaleString()} مستخدم`, "المستخدمون"]}
                        labelFormatter={(label) => `شهر ${label}`}
                      />
                      <Bar dataKey="users" radius={[8, 8, 0, 0]} fill="#a37a28" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="مزيج الخدمات المتوقع" eyebrow="حجم الطلب" icon={PieChart} delay={0.08}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={serviceDistribution}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={54}
                        outerRadius={82}
                        paddingAngle={4}
                        stroke="none"
                      >
                        {serviceDistribution.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: "#fff", borderColor: "#e2e8f0", borderRadius: "8px", color: "#0f172a", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                        formatter={(value, name) => [`${value}%`, name]} 
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </ChartCard>
              </div>

              {/* Cumulative Growth row */}
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.25fr_0.75fr]">
                <ChartCard title="نمو الأثر التراكمي" eyebrow="الخدمات والطلبات المنفذة" icon={LineChart} delay={0.12}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={impactGrowth} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
                      <CartesianGrid stroke="#f1f5f9" vertical={false} />
                      <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 11 }} />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: "#64748b", fontSize: 11 }}
                        tickFormatter={(value) => compactNumber(Number(value))}
                      />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#fff", borderColor: "#e2e8f0", borderRadius: "8px", color: "#0f172a", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                        formatter={(value) => [`${Number(value).toLocaleString()} عملية`, "العمليات"]}
                        labelFormatter={(label) => `شهر ${label}`}
                      />
                      <Line
                        type="monotone"
                        dataKey="actions"
                        stroke="#0b192c"
                        strokeWidth={3}
                        dot={{ r: 3, strokeWidth: 2, fill: "#fff" }}
                        activeDot={{ r: 5 }}
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </ChartCard>

                <DashboardCard title="توقعات الجودة والرضا" eyebrow="صحة التنفيذ" icon={ShieldCheck} delay={0.16}>
                  <div className="space-y-5" dir="rtl">
                    {dashboardProgress.map((metric, index) => (
                      <div key={metric.label}>
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <span className="text-sm font-bold text-slate-500">{metric.label}</span>
                          <AnimatedCounter
                            value={metric.value}
                            duration={1.8}
                            className="text-sm font-extrabold text-slate-800"
                          />
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${metric.percentage}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.35, delay: 0.1 + index * 0.08 }}
                            className="h-full rounded-full bg-gradient-to-l from-[#a37a28] to-[#0b192c]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </DashboardCard>
              </div>

              {/* Live Activities and Regional Distribution row */}
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <DashboardCard title="نشاط المنصة المباشر" eyebrow="تتبع التنفيذ والتحقق" icon={Activity} delay={0.2}>
                  <div className="space-y-4 max-h-[220px] overflow-y-auto pr-2 scrollbar-none" dir="rtl">
                    {platformActivities && platformActivities.map((act, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-white border border-slate-100 hover:border-gold/25 transition-all shadow-sm">
                        <span className="mt-2 w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <h5 className="text-xs font-extrabold text-slate-850">{act.title}</h5>
                            <span className="text-[10px] text-slate-400 font-medium">{act.time}</span>
                          </div>
                          <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">{act.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </DashboardCard>

                <DashboardCard title="التوزيع الجغرافي للمستهدفين" eyebrow="حسب المنطقة ونسبة الطلب" icon={TrendingUp} delay={0.24}>
                  <div className="space-y-4" dir="rtl">
                    {regionalCards && regionalCards.map((reg, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                          <span className="text-slate-500">{reg.region}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-slate-400 font-medium">{reg.detail}</span>
                            <span className="text-gold">{reg.value}</span>
                          </div>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: reg.value }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: idx * 0.08 }}
                            className="h-full rounded-full bg-gradient-to-l from-[#a37a28] to-[#0b192c]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </DashboardCard>
              </div>
            </main>
          </div>

          {/* Footer Bar */}
          <div className="flex flex-col gap-3 border-t border-slate-150 bg-slate-50 px-5 py-4 text-sm text-slate-550 md:flex-row md:items-center md:justify-between" dir="rtl">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[#a37a28]" />
              <span className="font-bold">توقعات مبنية على أبحاث السوق ورؤية السعودية 2030 لقطاع الحج والعمرة.</span>
            </div>
            <span>آخر تحديث: نموذج العرض الاستثماري للمرحلة التأسيسية</span>
          </div>
      </motion.div>
    </div>
  );
}
