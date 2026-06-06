"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  AlertCircle,
  ArrowUp,
  BadgeCheck,
  BellRing,
  Boxes,
  CheckCircle2,
  ClipboardCheck,
  CreditCard,
  Droplets,
  Eye,
  FileCheck2,
  Globe2,
  Handshake,
  Landmark,
  LockKeyhole,
  ReceiptText,
  Route,
  ShieldCheck,
  Sparkles,
  Timer,
  TrendingUp,
  TreePalm,
  Users,
  Utensils,
} from "lucide-react";
import { Card3D } from "@/components/Card3D";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { InvestorDashboard } from "@/components/InvestorDashboard";
import { MobileDock } from "@/components/MobileDock";
import { NIYAPhoneMockup } from "@/components/NIYAPhoneMockup";
import { StatCard } from "@/components/StatCard";
import { TrustFeatureCard } from "@/components/TrustFeatureCard";
import { UserJourneyStep } from "@/components/UserJourneyStep";
import {
  businessModelCards,
  heroStats,
  journeySteps,
  marketProblems,
  marketStats,
  serviceCards,
  solutionCards,
  trustFeatures,
} from "@/data/dashboardStats";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  approval: CheckCircle2,
  bell: BellRing,
  choose: Boxes,
  dates: TreePalm,
  form: ClipboardCheck,
  globe: Globe2,
  growth: TrendingUp,
  lock: LockKeyhole,
  meal: Utensils,
  partner: Handshake,
  payment: CreditCard,
  privacy: Eye,
  proof: FileCheck2,
  report: ReceiptText,
  shield: ShieldCheck,
  spark: Sparkles,
  timer: Timer,
  tracking: Activity,
  umrah: Landmark,
  users: Users,
  verified: BadgeCheck,
  water: Droplets,
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 inline-flex items-center gap-2 text-xs font-bold text-[#d4a64d]">
      <span className="h-px w-8 bg-[#d4a64d]" />
      {children}
      <span className="h-px w-8 bg-[#d4a64d]" />
    </p>
  );
}

function SectionHeading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className={cn("text-4xl font-extrabold leading-tight text-white md:text-5xl", className)}
    >
      {children}
    </motion.h2>
  );
}

function iconFor(iconKey: string) {
  return iconMap[iconKey] ?? Sparkles;
}

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.18], [0, -52]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0.18]);

  const scrollTo = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    const target = document.getElementById(href.replace("#", ""));
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-x-hidden bg-bg">
      <div className="fixed inset-0 z-0 pointer-events-none bg-[linear-gradient(120deg,rgba(20,184,166,0.08),transparent_28%),linear-gradient(250deg,rgba(212,166,77,0.10),transparent_35%),linear-gradient(180deg,#030712_0%,#07101c_52%,#030712_100%)]" />
      <div className="fixed inset-0 z-0 pointer-events-none bg-[linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:96px_96px] opacity-40" />

      <Header />
      <MobileDock />

      <main className="relative z-10">
        <section id="hero" className="relative min-h-[92svh] overflow-hidden px-6 pb-20 pt-28 md:px-12 md:pt-32">
          <Image
            src="/assets/hero-kaaba-clean.webp"
            alt="الكعبة المشرفة ليلا"
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 object-cover opacity-28"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,7,18,0.96),rgba(3,7,18,0.78),rgba(3,7,18,0.95)),linear-gradient(180deg,rgba(3,7,18,0.50),rgba(3,7,18,0.98))]" />

          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="relative mx-auto grid max-w-[1240px] items-center gap-12 lg:grid-cols-[minmax(0,1fr)_440px]"
          >
            <div className="max-w-[720px]">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#d4a64d55] bg-[#d4a64d14] px-4 py-2 text-xs font-bold text-[#f2d58e] backdrop-blur"
              >
                <Sparkles className="h-4 w-4" />
                عمرة وصدقات موسمية بتوثيق رقمي
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.72, delay: 0.1 }}
                className="mb-6"
              >
                <Image
                  src="/assets/naya-logo.png"
                  alt="شعار نية"
                  width={132}
                  height={158}
                  priority
                  className="h-auto w-[118px] drop-shadow-[0_12px_36px_rgba(212,166,77,0.45)]"
                />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.82, delay: 0.18 }}
                className="text-[clamp(4rem,13vw,8.5rem)] font-extrabold leading-none text-white drop-shadow-[0_0_48px_rgba(212,166,77,0.32)]"
              >
                نية
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.78, delay: 0.28 }}
                className="mt-6 max-w-[650px] text-lg leading-[1.9] text-slate-200 md:text-xl"
              >
                منصة رقمية تربط المسلمين حول العالم بخدمات العمرة بالنيابة وتوزيع الماء والتمر وإفطار الصائم، مع متابعة مباشرة وإثبات تنفيذ موثق من شركاء ميدانيين.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.72, delay: 0.42 }}
                className="mt-8 flex flex-col gap-3 sm:flex-row"
              >
                <a
                  href="#services"
                  onClick={(event) => scrollTo(event, "#services")}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-gradient-to-l from-[#ead2ac] via-[#d4a64d] to-[#8e6d3e] px-6 font-extrabold text-[#111827] shadow-[0_18px_54px_rgba(212,166,77,0.30)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(212,166,77,0.42)]"
                >
                  <Boxes className="h-5 w-5" />
                  استكشف الخدمات
                </a>
                <a
                  href="#dashboard"
                  onClick={(event) => scrollTo(event, "#dashboard")}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.06] px-6 font-extrabold text-white backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#111827]"
                >
                  <Route className="h-5 w-5" />
                  شاهد لوحة الأثر
                </a>
              </motion.div>
            </div>

            <NIYAPhoneMockup />
          </motion.div>

          <div className="relative mx-auto mt-14 grid max-w-[1240px] grid-cols-1 gap-4 md:grid-cols-3">
            {heroStats.map((stat, index) => (
              <StatCard
                key={stat.label}
                value={stat.value}
                label={stat.label}
                description={stat.description}
                icon={index === 0 ? Users : index === 1 ? ShieldCheck : TrendingUp}
                tone={index === 1 ? "teal" : index === 2 ? "blue" : "gold"}
                delay={0.08 * index}
              />
            ))}
          </div>
        </section>

        <section id="services" className="mx-auto max-w-[1240px] px-6 py-28 md:px-12 scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="mx-auto mb-14 max-w-[780px] text-center"
          >
            <SectionLabel>خدمات نية</SectionLabel>
            <SectionHeading>كل عمل صالح داخل تجربة واحدة موثوقة</SectionHeading>
            <p className="mt-5 text-base leading-8 text-slate-300 md:text-lg">
              الواجهة تعكس خدمات `NIYA_App` الحقيقية: طلب، دفع، تنفيذ، متابعة، ثم تقرير موثق يمكن الرجوع إليه.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {serviceCards.map((service, index) => {
              const Icon = iconFor(service.icon);
              return (
                <Card3D key={service.title} delay={index * 0.08} className="rounded-lg">
                  <div className="mb-5 grid h-14 w-14 place-items-center rounded-lg border border-[#d4a64d33] bg-[#d4a64d14] text-[#f2d58e]">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-extrabold text-white transition-colors group-hover:text-[#f2d58e]">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{service.desc}</p>
                </Card3D>
              );
            })}
          </div>
        </section>

        <section id="about" className="relative overflow-hidden px-6 py-28 md:px-12 scroll-mt-24">
          <div className="mx-auto grid max-w-[1240px] items-center gap-14 lg:grid-cols-[0.88fr_1.12fr]">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative overflow-hidden rounded-lg border border-[#d4a64d24] bg-[#080d16]/80 shadow-[0_24px_80px_rgba(0,0,0,0.34)]"
            >
              <Image
                src="/assets/trust-kaaba.png"
                alt="المسجد الحرام"
                width={620}
                height={720}
                className="h-[520px] w-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,18,0.12),rgba(3,7,18,0.86))]" />
              <div className="absolute bottom-0 p-6">
                <Image
                  src="/assets/naya-logo.png"
                  alt="نية"
                  width={78}
                  height={94}
                  className="mb-4 h-auto w-16"
                />
                <h3 className="text-2xl font-extrabold text-white">نية تربط التقنية بالأمانة</h3>
                <p className="mt-3 max-w-[420px] text-sm leading-7 text-slate-300">
                  تجربة مصممة لتجعل كل طلب واضحا من أول لحظة وحتى إثبات الإتمام.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <SectionLabel>من هو تطبيق نية؟</SectionLabel>
              <SectionHeading className="mb-5">نحوّل النية إلى أثر حقيقي موثق</SectionHeading>
              <p className="max-w-[680px] text-base leading-[1.9] text-slate-300 md:text-lg">
                نية ليست صفحة عرض فقط، بل تجربة تطبيق قابلة للاستخدام: سجل طلبات، حملات موسمية، مدفوعات، تتبع حالة، وتقارير تنفيذ تربط المستخدم بالشريك الميداني بثقة.
              </p>
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  { icon: BellRing, text: "متابعة مباشرة للحالة" },
                  { icon: Users, text: "شبكة مزودين موثوقين" },
                  { icon: CreditCard, text: "دفع إلكتروني آمن" },
                  { icon: FileCheck2, text: "تقارير رقمية موثقة" },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.text}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: index * 0.08 }}
                      className="flex items-center gap-3 rounded-lg border border-[#d4a64d24] bg-white/[0.055] p-4"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#d4a64d14] text-[#f2d58e]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="font-bold text-white">{item.text}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        <section id="problem" className="mx-auto max-w-[1240px] px-6 py-28 md:px-12 scroll-mt-24">
          <div className="mx-auto mb-14 max-w-[820px] text-center">
            <SectionLabel>فرصة سوقية ضخمة وغير مستغلة</SectionLabel>
            <SectionHeading>
              سوق موجود، لكن يحتاج منصة تنظمه بثقة وبيانات
            </SectionHeading>
            <p className="mt-5 text-base leading-8 text-slate-300 md:text-lg">
              ملايين المسلمين يريدون أداء العمرة بالنيابة والصدقات الموسمية، لكن الرحلة الحالية غالبا متفرقة وغير قابلة للقياس.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-lg border border-[#d4a64d24] bg-[#07101a]/80 p-6 shadow-[0_22px_70px_rgba(0,0,0,0.26)]"
            >
              <h3 className="mb-6 text-sm font-bold text-[#d4a64d]">حجم السوق</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {marketStats.map((stat, index) => {
                  const Icon = iconFor(stat.icon);
                  return (
                    <StatCard
                      key={stat.label}
                      value={stat.value}
                      label={stat.label}
                      description={stat.sub}
                      icon={Icon}
                      compact
                      tone={index === 1 ? "teal" : index === 2 ? "blue" : "gold"}
                      delay={0.08 * index}
                      className="bg-white/[0.045]"
                    />
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="rounded-lg border border-[#d4a64d24] bg-[#07101a]/80 p-6 shadow-[0_22px_70px_rgba(0,0,0,0.26)]"
            >
              <h3 className="mb-6 text-sm font-bold text-[#d4a64d]">واقع السوق اليوم</h3>
              <div className="space-y-3">
                {marketProblems.map((problem, index) => (
                  <motion.div
                    key={problem}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.1 + index * 0.07 }}
                    className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.045] p-4"
                  >
                    <AlertCircle className="mt-1 h-5 w-5 shrink-0 text-[#f2b66d]" />
                    <p className="text-sm leading-7 text-slate-300">{problem}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="mx-auto max-w-[1240px] px-6 py-28 md:px-12">
          <div className="mx-auto mb-14 max-w-[780px] text-center">
            <SectionLabel>الحل</SectionLabel>
            <SectionHeading>تجربة رقمية موثوقة للأعمال بالنيابة</SectionHeading>
            <p className="mt-5 text-base leading-8 text-slate-300 md:text-lg">
              نية تجمع الطلب والتنفيذ والتوثيق داخل نظام واضح للمستخدم والشريك والإدارة.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {solutionCards.map((card, index) => {
              const Icon = iconFor(card.icon);
              return (
                <Card3D key={card.title} delay={index * 0.08} className="rounded-lg">
                  <div className="mb-5 grid h-14 w-14 place-items-center rounded-lg border border-[#14b8a633] bg-[#14b8a614] text-teal-200">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-extrabold text-white">{card.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{card.desc}</p>
                </Card3D>
              );
            })}
          </div>
        </section>

        <section id="steps" className="mx-auto max-w-[1240px] px-6 py-28 md:px-12 scroll-mt-24">
          <div className="mx-auto mb-14 max-w-[820px] text-center">
            <SectionLabel>رحلة المستخدم</SectionLabel>
            <SectionHeading>من النية إلى أثر موثق في ست خطوات</SectionHeading>
            <p className="mt-5 text-base leading-8 text-slate-300 md:text-lg">
              الرحلة مصممة كمسار واضح: المستخدم يعرف ماذا حدث، ومن نفذ، ومتى اكتمل الطلب.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-6">
            {journeySteps.map((step, index) => {
              const Icon = iconFor(step.icon);
              return (
                <UserJourneyStep
                  key={step.title}
                  num={step.num}
                  title={step.title}
                  desc={step.desc}
                  icon={Icon}
                  delay={index * 0.07}
                  isLast={index === journeySteps.length - 1}
                />
              );
            })}
          </div>
        </section>

        <section id="trust" className="px-6 py-28 md:px-12 scroll-mt-24">
          <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[0.82fr_1.18fr]">
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="lg:sticky lg:top-28 lg:h-fit"
            >
              <SectionLabel>الأمان والشفافية</SectionLabel>
              <SectionHeading className="mb-5">بنية ثقة تليق بالعبادات والأمانات</SectionHeading>
              <p className="text-base leading-[1.9] text-slate-300 md:text-lg">
                كل خدمة تحتاج أكثر من واجهة جميلة: نية تضيف مراجعة الشركاء، حماية الدفع، تتبع التنفيذ، وتقارير شفافة قابلة للعرض في لوحة البيانات.
              </p>
              <div className="mt-7 rounded-lg border border-[#d4a64d24] bg-[#d4a64d10] p-5">
                <div className="mb-3 flex items-center gap-3 text-[#f2d58e]">
                  <ShieldCheck className="h-6 w-6" />
                  <span className="font-extrabold">Verified Execution Layer</span>
                </div>
                <p className="text-sm leading-7 text-slate-300">
                  طبقة تشغيل تربط طلب المستخدم بالشريك والتقرير النهائي، وهي ما يجعل لوحة البيانات في آخر الصفحة قابلة للتصديق والعرض.
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {trustFeatures.map((feature, index) => {
                const Icon = iconFor(feature.icon);
                return (
                  <TrustFeatureCard
                    key={feature.title}
                    title={feature.title}
                    desc={feature.desc}
                    badge={feature.badge}
                    icon={Icon}
                    delay={index * 0.06}
                  />
                );
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1240px] px-6 py-28 md:px-12">
          <div className="mx-auto mb-14 max-w-[780px] text-center">
            <SectionLabel>نموذج العمل</SectionLabel>
            <SectionHeading>نموذج مستدام يحقق أثرا قابلا للقياس</SectionHeading>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {businessModelCards.map((card, index) => {
              const Icon = iconFor(card.icon);
              return (
                <Card3D key={card.title} delay={index * 0.08} className="rounded-lg">
                  <Icon className="mb-5 h-8 w-8 text-[#f2d58e]" />
                  <h3 className="text-xl font-extrabold text-white">{card.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{card.desc}</p>
                </Card3D>
              );
            })}
          </div>
        </section>

        <section id="cta" className="relative overflow-hidden px-6 py-28 text-center md:px-12 scroll-mt-24">
          <div className="mx-auto max-w-[860px]">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="rounded-lg border border-[#d4a64d33] bg-[linear-gradient(135deg,rgba(212,166,77,0.14),rgba(20,184,166,0.09)),rgba(7,16,26,0.82)] p-8 shadow-[0_24px_90px_rgba(0,0,0,0.34)] md:p-12"
            >
              <SectionLabel>الخير يبدأ بنية</SectionLabel>
              <h2 className="mx-auto max-w-[720px] text-4xl font-extrabold leading-tight text-white md:text-5xl">
                صفحة عرض تقود مباشرة إلى تجربة تطبيق ولوحة بيانات قابلة للاستخدام
              </h2>
              <p className="mx-auto mt-5 max-w-[620px] text-base leading-8 text-slate-300">
                آخر قسم يعرض البيانات التي يحتاجها المشروع: نمو، طلبات، خدمات، ثقة، شركاء، ونشاط تشغيل يومي.
              </p>
              <a
                href="#dashboard"
                onClick={(event) => scrollTo(event, "#dashboard")}
                className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 font-extrabold text-slate-950 transition duration-300 hover:-translate-y-1 hover:bg-[#f2d58e]"
              >
                <ArrowUp className="h-5 w-5 rotate-[-45deg]" />
                انتقل إلى لوحة المشروع
              </a>
            </motion.div>
          </div>
        </section>

        <InvestorDashboard />
      </main>

      <Footer />
    </div>
  );
}
