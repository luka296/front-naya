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
  gold: "bg-[#d4a64d14] text-[#ead2ac] border-[#d4a64d33]",
  teal: "bg-teal-500/10 text-[#5eead4] border-teal-500/20",
  blue: "bg-blue-500/10 text-[#93c5fd] border-blue-500/20",
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
  } = data;

  return (
    <section id="dashboard" className="relative px-6 py-12 md:px-12 md:h-screen md:min-h-0 md:py-0 flex flex-col justify-center overflow-hidden">
      <div className="mx-auto max-w-[1240px]">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-[820px] text-center"
        >
          <p className="mb-4 inline-flex items-center gap-2 text-xs font-bold text-[#d4a64d]">
            <span className="h-px w-8 bg-[#d4a64d]" />
            نموذج العرض الاستثماري
            <span className="h-px w-8 bg-[#d4a64d]" />
          </p>
          <h2 className="text-4xl font-extrabold leading-tight text-white md:text-5xl">
            لوحة توقعات النمو في السنة الأولى
          </h2>
          <p className="mx-auto mt-5 max-w-[680px] text-base leading-8 text-slate-300 md:text-lg">
            تقديرات الأثر ونمو المستخدمين وحجم المعاملات المستهدف لعرضه على المستثمرين للمرحلة التأسيسية.
          </p>
        </motion.div>

        {/* Dashboard Window */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="overflow-hidden rounded-[28px] border border-[#d4a64d25] bg-[#040814] text-white shadow-[0_42px_120px_rgba(0,0,0,0.7)]"
          dir="ltr"
        >
          {/* Header Bar */}
          <div className="bg-[#0b1329] px-4 py-4 text-white md:px-6 border-b border-[#d4a64d1c]">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3" dir="rtl">
                <span className="grid h-10 w-10 place-items-center rounded-lg border border-[#d4a64d55] bg-[#d4a64d1f] text-lg font-extrabold text-[#f2d58e]">
                  ن
                </span>
                <div>
                  <h3 className="text-base font-extrabold">Niya Investor OS</h3>
                  <p className="text-xs text-slate-400">Forecast / Growth / GMV Projection / Year 1</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2" dir="rtl">
                {["نموذج التنبؤ", "السنة الأولى"].map((item, index) => (
                  <span
                    key={item}
                    className={cn(
                      "rounded-lg px-3 py-2 text-xs font-bold",
                      index === 0 ? "bg-white text-[#030712]" : "bg-white/[0.06] text-slate-300"
                    )}
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3" dir="rtl">
                <button
                  className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/[0.06] text-white"
                  aria-label="تنبيهات لوحة البيانات"
                >
                  <Bell className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-[#d4a64d] text-xs font-extrabold text-slate-950">
                    N
                  </span>
                  <div>
                    <p className="text-xs font-bold">Niya Pitch</p>
                    <p className="text-[10px] text-slate-400">Investor view</p>
                  </div>
                </div>
              </div>
            </div>

            {/* KPI Cards Top Grid */}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4" dir="rtl">
              {dashboardKpis.slice(0, 4).map((kpi, index) => (
                <div
                  key={kpi.label}
                  className="rounded-lg border border-[#d4a64d1c] bg-[#0b1329]/80 p-4 shadow-[0_12px_32px_rgba(0,0,0,0.3)]"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="text-xs font-bold text-slate-300">{kpi.label}</span>
                    <span className="rounded-full bg-emerald-400/10 px-2 py-1 text-[10px] font-bold text-emerald-200">
                      {kpi.trend}
                    </span>
                  </div>
                  <AnimatedCounter
                    value={kpi.value}
                    duration={2.4}
                    className="text-3xl font-extrabold text-white"
                  />
                  <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${70 + index * 7}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.3, delay: 0.2 + index * 0.08 }}
                      className="h-full rounded-full bg-gradient-to-l from-[#ead2ac] to-[#14b8a6]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Dashboard Panels */}
          <div className="grid gap-5 bg-[#030712] p-4 md:p-6 grid-cols-1">
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
                          className="text-2xl font-extrabold text-white"
                        />
                        <p className="mt-2 text-xs font-bold leading-5 text-slate-400">{kpi.label}</p>
                      </div>
                      <span
                        className={cn(
                          "rounded-full border px-2 py-1 text-[10px] font-extrabold",
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
                      <CartesianGrid stroke="#1e293b" vertical={false} />
                      <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: "#94a3b8", fontSize: 11 }}
                        tickFormatter={(value) => compactNumber(Number(value))}
                      />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#0b1329", borderColor: "rgba(212,166,77,0.2)", borderRadius: "8px", color: "#fff" }}
                        cursor={{ fill: "rgba(212,166,77,0.08)" }}
                        formatter={(value) => [`${Number(value).toLocaleString()} مستخدم`, "المستخدمون"]}
                        labelFormatter={(label) => `شهر ${label}`}
                      />
                      <Bar dataKey="users" radius={[8, 8, 0, 0]} fill="#d4a64d" />
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
                        contentStyle={{ backgroundColor: "#0b1329", borderColor: "rgba(212,166,77,0.2)", borderRadius: "8px", color: "#fff" }}
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
                      <CartesianGrid stroke="#1e293b" vertical={false} />
                      <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: "#94a3b8", fontSize: 11 }}
                        tickFormatter={(value) => compactNumber(Number(value))}
                      />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#0b1329", borderColor: "rgba(212,166,77,0.2)", borderRadius: "8px", color: "#fff" }}
                        formatter={(value) => [`${Number(value).toLocaleString()} عملية`, "العمليات"]}
                        labelFormatter={(label) => `شهر ${label}`}
                      />
                      <Line
                        type="monotone"
                        dataKey="actions"
                        stroke="#14b8a6"
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
                          <span className="text-sm font-bold text-slate-300">{metric.label}</span>
                          <AnimatedCounter
                            value={metric.value}
                            duration={1.8}
                            className="text-sm font-extrabold text-white"
                          />
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${metric.percentage}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.35, delay: 0.1 + index * 0.08 }}
                            className="h-full rounded-full bg-gradient-to-l from-[#ead2ac] to-[#14b8a6]"
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
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-gold/20 transition-all">
                        <span className="mt-2 w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <h5 className="text-xs font-extrabold text-white">{act.title}</h5>
                            <span className="text-[10px] text-slate-500 font-medium">{act.time}</span>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">{act.detail}</p>
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
                          <span className="text-slate-300">{reg.region}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-slate-500 font-medium">{reg.detail}</span>
                            <span className="text-gold">{reg.value}</span>
                          </div>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: reg.value }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: idx * 0.08 }}
                            className="h-full rounded-full bg-gradient-to-l from-[#ead2ac] to-[#14b8a6]"
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
          <div className="flex flex-col gap-3 border-t border-[#d4a64d1c] bg-[#0b1329] px-5 py-4 text-sm text-slate-400 md:flex-row md:items-center md:justify-between" dir="rtl">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-gold" />
              <span className="font-bold">توقعات مبنية على أبحاث السوق ورؤية السعودية 2030 لقطاع الحج والعمرة.</span>
            </div>
            <span>آخر تحديث: نموذج العرض الاستثماري للمرحلة التأسيسية</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
