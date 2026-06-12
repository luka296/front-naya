"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { NIYAPhonesCarousel } from "@/components/NIYAPhonesCarousel";

const TrustRadarScene = dynamic(
  () => import("@/components/TrustRadarScene").then((mod) => mod.TrustRadarScene),
  { ssr: false }
);

import { NiyaImpactCarousel } from "@/components/NiyaImpactCarousel";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
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
import { MobileDock } from "@/components/MobileDock";
import { StatCard } from "@/components/StatCard";
import { UserJourneyStep } from "@/components/UserJourneyStep";
import MarketLeaderboardChart from "@/components/MarketLeaderboardChart";
import { useData } from "@/context/DataContext";
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
    <p className="mb-4 inline-flex items-center gap-2 text-xs font-bold text-[#a37a28]">
      <span className="h-px w-8 bg-[#a37a28]" />
      {children}
      <span className="h-px w-8 bg-[#a37a28]" />
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
      className={cn("text-4xl font-extrabold leading-tight text-navy md:text-5xl", className)}
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
  const { data } = useData();
  
  const {
    heroTitle,
    heroSubtitle,
    heroBadge,
    heroStats,
    serviceCards,
    marketProblems,
    solutionCards,
    journeySteps,
    simulationLabel,
    simulationHeading,
    simulationDesc,
    servicesLabel,
    servicesHeading,
    servicesDesc,
    problemLabel,
    problemHeading,
    problemDesc,
    problemRightHeading,
    problemRightDesc,
    solutionLabel,
    solutionHeading,
    solutionDesc,
    stepsLabel,
    stepsHeading,
    stepsDesc,
    trustLabel,
    trustHeading,
    trustDesc,
    trustBullets,
    businessModelLabel,
    businessModelHeading,
    businessModelCards,
  } = data;

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
      {/* Light warm-gray background styling */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[linear-gradient(120deg,rgba(20,184,166,0.02),transparent_40%),linear-gradient(250deg,rgba(212,166,77,0.04),transparent_40%),linear-gradient(180deg,#f8fafc_0%,#f1f5f9_50%,#f8fafc_100%)]" />
      <div className="fixed inset-0 z-0 pointer-events-none bg-[linear-gradient(90deg,rgba(0,0,0,0.012)_1px,transparent_1px),linear-gradient(180deg,rgba(0,0,0,0.012)_1px,transparent_1px)] bg-[size:96px_96px] opacity-80" />

      <MobileDock />

      <main className="relative z-10">
        <section id="hero" className="relative md:h-screen md:min-h-0 overflow-hidden px-6 py-12 md:px-12 flex flex-col justify-center">
          <Image
            src="/assets/hero-kaaba-clean.webp"
            alt="الكعبة المشرفة ليلا"
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(248,250,252,0.94),rgba(248,250,252,0.82),rgba(248,250,252,0.94)),linear-gradient(180deg,rgba(248,250,252,0.40),rgba(248,250,252,0.98))]" />

          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="relative mx-auto flex flex-col items-center text-center max-w-[960px] gap-6"
          >
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#a37a28]/20 bg-[#a37a28]/10 px-4 py-2 text-xs font-bold text-[#a37a28] backdrop-blur-sm"
              >
                <Sparkles className="h-4 w-4" />
                {heroBadge}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.72, delay: 0.1 }}
                className="mb-6 flex justify-center"
              >
                <Image
                  src="/assets/naya-logo.png"
                  alt="شعار نية"
                  width={132}
                  height={158}
                  priority
                  className="h-auto w-[118px] drop-shadow-[0_12px_36px_rgba(163,122,40,0.18)]"
                />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.82, delay: 0.18 }}
                className="text-[clamp(4.2rem,13vw,8.5rem)] font-extrabold leading-none text-navy drop-shadow-[0_4px_12px_rgba(163,122,40,0.08)]"
              >
                {heroTitle}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.78, delay: 0.28 }}
                className="mt-6 max-w-[750px] text-lg leading-[1.9] text-slate-650 md:text-xl mx-auto font-medium"
              >
                {heroSubtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.72, delay: 0.42 }}
                className="mt-8 flex flex-col gap-3 sm:flex-row justify-center"
              >
                <a
                  href="#simulation"
                  onClick={(event) => scrollTo(event, "#simulation")}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-gradient-to-l from-[#ead2ac] via-[#a37a28] to-[#785818] px-6 font-extrabold text-white shadow-[0_10px_30px_rgba(163,122,40,0.15)] transition duration-300 hover:-translate-y-1 hover:brightness-110"
                >
                  <Boxes className="h-5 w-5" />
                  تجربة المحاكاة التفاعلية
                </a>
                <a
                  href="#about"
                  onClick={(event) => scrollTo(event, "#about")}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-6 font-extrabold text-[#0b192c] shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-slate-50"
                >
                  <Users className="h-5 w-5" />
                  تعرّف على نية
                </a>
              </motion.div>

              {/* Stats cards centered below */}
              <div className="relative mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 w-full max-w-[840px] mx-auto">
                {heroStats.map((stat, index) => (
                  <StatCard
                    key={stat.label}
                    value={stat.value}
                    label={stat.label}
                    tone={index === 1 ? "navy" : index === 2 ? "black" : "gold"}
                    delay={0.08 * index}
                    compact
                    className="p-3"
                  />
                ))}
              </div>

            </div>
          </motion.div>
        </section>

        {/* Section 2: Interactive Simulation Section */}
        <section id="simulation" className="relative w-full max-w-[1240px] mx-auto px-6 md:px-12 scroll-mt-24 md:h-screen md:min-h-0 flex flex-col justify-center py-6 md:py-8 overflow-hidden border-b border-slate-100">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(163,122,40,0.015)_50%,transparent_100%)] pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="mx-auto mb-6 max-w-[780px] text-center"
          >
            <SectionLabel>{simulationLabel}</SectionLabel>
            <SectionHeading>{simulationHeading}</SectionHeading>
            <p className="mt-5 text-base leading-8 text-slate-650 md:text-lg font-medium">
              {simulationDesc}
            </p>
          </motion.div>

          <div className="relative w-full">
            <NIYAPhonesCarousel />
          </div>
        </section>

        <section id="services" className="relative w-full max-w-[1240px] mx-auto px-6 md:px-12 scroll-mt-24 md:h-screen md:min-h-0 flex flex-col justify-center py-6 md:py-8 overflow-hidden border-b border-slate-100">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="mx-auto mb-6 max-w-[780px] text-center"
          >
            <SectionLabel>{servicesLabel}</SectionLabel>
            <SectionHeading>{servicesHeading}</SectionHeading>
            <p className="mt-5 text-base leading-8 text-slate-650 md:text-lg font-medium">
              {servicesDesc}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {serviceCards.map((service, index) => {
              const Icon = iconFor(service.icon);
              return (
                <Card3D key={service.title} delay={index * 0.08} className="rounded-lg">
                  <div className="mb-5 grid h-14 w-14 place-items-center rounded-lg border border-[#d4a64d]/20 bg-[#d4a64d]/10 text-[#a37a28]">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-800 transition-colors group-hover:text-[#a37a28]">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-500 font-medium">{service.desc}</p>
                </Card3D>
              );
            })}
          </div>
        </section>

        <section id="about" className="relative w-full max-w-[1240px] mx-auto px-6 md:px-12 scroll-mt-24 md:h-screen md:min-h-0 flex flex-col justify-center py-6 md:py-8 overflow-hidden border-b border-slate-100">
          <NiyaImpactCarousel />
        </section>

        <section id="problem" className="relative w-full max-w-[1240px] mx-auto px-6 md:px-12 scroll-mt-24 md:h-screen md:min-h-0 flex flex-col justify-center py-6 md:py-8 overflow-hidden border-b border-slate-100">
          <div className="mx-auto mb-6 max-w-[820px] text-center">
            <SectionLabel>{problemLabel}</SectionLabel>
            <SectionHeading>
              {problemHeading}
            </SectionHeading>
            <p className="mt-5 text-base leading-8 text-slate-650 md:text-lg font-medium">
              {problemDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.12fr_0.88fr] items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <MarketLeaderboardChart />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="flex flex-col justify-center space-y-6 lg:mt-2"
            >
              <div>
                <h3 className="text-2xl font-extrabold text-slate-800 leading-tight">
                  {problemRightHeading}
                </h3>
                <p className="mt-4 text-sm leading-8 text-slate-550 font-medium">
                  {problemRightDesc}
                </p>
              </div>

              <div className="space-y-4 pr-2">
                {marketProblems.map((problem, index) => (
                  <motion.div
                    key={problem}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 + index * 0.06 }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#a37a28]" />
                    <p className="text-sm leading-7 text-slate-600 font-medium">{problem}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section id="solution" className="relative w-full max-w-[1240px] mx-auto px-6 md:px-12 md:h-screen md:min-h-0 flex flex-col justify-center py-6 md:py-8 overflow-hidden border-b border-slate-100">
          <div className="mx-auto mb-6 max-w-[780px] text-center">
            <SectionLabel>{solutionLabel}</SectionLabel>
            <SectionHeading>{solutionHeading}</SectionHeading>
            <p className="mt-5 text-base leading-8 text-slate-650 md:text-lg font-medium">
              {solutionDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {solutionCards.map((card, index) => {
              const Icon = iconFor(card.icon);
              return (
                <Card3D key={card.title} delay={index * 0.08} className="rounded-lg">
                  <div className="mb-5 grid h-14 w-14 place-items-center rounded-lg border border-[#d4a64d]/20 bg-[#d4a64d]/10 text-[#a37a28]">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-800">{card.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-500 font-medium">{card.desc}</p>
                </Card3D>
              );
            })}
          </div>
        </section>

        <section id="steps" className="relative w-full max-w-[1240px] mx-auto px-6 md:px-12 scroll-mt-24 md:h-screen md:min-h-0 flex flex-col justify-center py-6 md:py-8 overflow-hidden border-b border-slate-100">
          <div className="mx-auto mb-6 max-w-[820px] text-center">
            <SectionLabel>{stepsLabel}</SectionLabel>
            <SectionHeading>{stepsHeading}</SectionHeading>
            <p className="mt-5 text-base leading-8 text-slate-650 md:text-lg font-medium">
              {stepsDesc}
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

        <section id="trust" className="relative w-full max-w-[1240px] mx-auto px-6 md:px-12 scroll-mt-24 md:h-screen md:min-h-0 flex flex-col justify-center py-6 md:py-8 overflow-hidden border-b border-slate-100">
          <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="text-right lg:order-2"
              dir="rtl"
            >
              <SectionLabel>{trustLabel}</SectionLabel>
              <SectionHeading className="mb-4">{trustHeading}</SectionHeading>
              <p className="text-sm leading-[1.7] text-slate-500 mb-6 font-medium max-w-[620px]">
                {trustDesc}
              </p>

              {/* Grid of structured visual feature cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                {trustBullets.map((item, idx) => {
                  const trustIcons = [ShieldCheck, LockKeyhole, Globe2, FileCheck2, Eye];
                  const Icon = trustIcons[idx] || ShieldCheck;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.06 }}
                      className={cn(
                        "group flex flex-col gap-2 rounded-xl border border-slate-150 bg-white p-3.5 shadow-sm hover:border-[#d4a64d]/30 hover:shadow-[0_8px_24px_rgba(163,122,40,0.04)] transition-all duration-300",
                        idx === 4 && "sm:col-span-2"
                      )}
                    >
                      <div className="flex items-center gap-2.5 justify-start text-right">
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#d4a64d]/10 text-[#a37a28] group-hover:bg-[#a37a28] group-hover:text-white transition-all duration-300">
                          <Icon className="h-4.5 w-4.5" />
                        </span>
                        <h4 className="text-xs font-extrabold text-slate-800 transition-colors duration-300">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-[10px] leading-relaxed text-slate-500 font-medium">
                        {item.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Left Column: Abstract Trust Visual Showcase */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="relative lg:order-1 flex items-center justify-center"
            >
              <TrustRadarScene />
            </motion.div>
          </div>
        </section>

        <section id="business-model" className="relative w-full max-w-[1240px] mx-auto px-6 md:px-12 md:h-screen md:min-h-0 flex flex-col justify-center py-6 md:py-8 overflow-hidden border-b border-slate-100">
          <div className="mx-auto mb-6 max-w-[780px] text-center">
            <SectionLabel>{businessModelLabel}</SectionLabel>
            <SectionHeading>{businessModelHeading}</SectionHeading>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {businessModelCards.map((card, index) => {
              const Icon = iconFor(card.icon);
              return (
                <Card3D key={card.title} delay={index * 0.08} className="rounded-lg">
                  <Icon className="mb-5 h-8 w-8 text-[#a37a28]" />
                  <h3 className="text-xl font-extrabold text-slate-800">{card.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-500 font-medium">{card.desc}</p>
                </Card3D>
              );
            })}
          </div>
        </section>



      </main>

      <Footer />
    </div>
  );
}
