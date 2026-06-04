"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Sparkles, Boxes, Route, Info, TrendingUp, ShieldCheck, Box, Droplet, TreePalm,
  Bell, Users, CreditCard, FileCheck2, AlertCircle, EyeOff, FileX2, Globe2, Timer,
  BellRing, Languages, Activity, Heart, ArrowUpRight, LockKeyhole, Handshake,
  Eye, Headphones, ArrowUp, ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Header } from "@/components/Header";
import { MobileDock } from "@/components/MobileDock";
import { Footer } from "@/components/Footer";

/* ─── Particle interface ─── */
interface Particle {
  id: number;
  x: string;
  delay: number;
  duration: number;
  scale: number;
}

/* ─── Section label decorator ─── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-gold font-bold text-xs tracking-widest mb-4 inline-flex items-center gap-2 relative before:content-[''] before:w-8 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:to-gold after:content-[''] after:w-8 after:h-[1px] after:bg-gradient-to-l after:from-transparent after:to-gold">
      {children}
    </p>
  );
}

/* ─── Animated section heading ─── */
function SectionHeading({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, type: "spring", stiffness: 90 }}
      className={cn("text-gold-soft text-4xl md:text-5xl font-extrabold leading-tight", className)}
    >
      {children}
    </motion.h2>
  );
}

/* ─── Glass card ─── */
function GlassCard({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, delay, ease: "easeOut" }}
      whileHover={{ y: -6, scale: 1.02 }}
      className={cn(
        "relative p-6 rounded-2xl border border-[rgba(212,166,77,0.18)] bg-[rgba(11,19,41,0.65)] backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.55)] overflow-hidden group transition-all duration-300 hover:border-[rgba(212,166,77,0.42)]",
        className
      )}
    >
      {/* Inner top-glow */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(212,166,77,0.5)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      {children}
    </motion.div>
  );
}

/* ─── Stat counter card ─── */
function StatCard({ strong, span, delay = 0 }: { strong: string; span: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, type: "spring", stiffness: 110 }}
      className="relative flex flex-col items-center justify-center p-6 rounded-2xl border border-[rgba(212,166,77,0.2)] bg-[rgba(11,19,41,0.7)] backdrop-blur-xl text-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,166,77,0.06),transparent_70%)]" />
      <strong className="relative block text-gold-soft text-4xl font-extrabold leading-tight drop-shadow-[0_0_24px_rgba(212,166,77,0.5)]">
        {strong}
      </strong>
      <span className="relative text-muted-gold text-sm mt-2">{span}</span>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════ */
export default function Page() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: undefined });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -60]);

  /* Generate particles */
  useEffect(() => {
    const generated: Particle[] = Array.from({ length: 34 }).map((_, i) => ({
      id: i,
      x: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: 6 + Math.random() * 7,
      scale: 0.5 + Math.random() * 1.1,
    }));
    setParticles(generated);
    setTimeout(() => setIsLoaded(true), 200);
  }, []);

  /* Smooth scroll helper */
  const scrollTo = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const el = document.getElementById(href.replace("#", ""));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div ref={containerRef} className="relative min-h-screen bg-bg overflow-x-hidden">

      {/* ──────────────────────────────────────
          AMBIENT BACKGROUND GLOWS — premium dark layout
      ────────────────────────────────────── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Royal blue radial glow top-right */}
        <div className="absolute top-[5%] -right-48 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(34,86,246,0.18),transparent_70%)] blur-3xl opacity-80" />

        {/* Deep gold radial glow top-left */}
        <div className="absolute -top-48 -left-48 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(212,166,77,0.14),transparent_70%)] blur-3xl opacity-80" />
        
        {/* Soft indigo radial glow bottom-left */}
        <div className="absolute bottom-[10%] -left-48 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.12),transparent_70%)] blur-3xl opacity-70" />

        {/* Soft gold radial glow bottom-right */}
        <div className="absolute bottom-[20%] -right-48 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(212,166,77,0.08),transparent_70%)] blur-3xl opacity-60" />
        
        {/* Subtle center background light for texture */}
        <div className="absolute top-[35%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(212,166,77,0.04),transparent_75%)] blur-3xl" />

        {/* Gradient vignette over grid */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(3,7,18,0.3)] via-transparent to-[rgba(3,7,18,0.95)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(3,7,18,0.3)] via-transparent to-[rgba(3,7,18,0.3)]" />
      </div>

      {/* Global gold particle layer */}
      <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden" aria-hidden="true">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute bottom-[-20px] w-[3px] h-[3px] rounded-full bg-gold-soft opacity-0 shadow-[0_0_16px_rgba(241,207,130,0.8)]"
            style={{
              left: p.x,
              animation: `riseParticle ${p.duration}s linear ${p.delay}s infinite`,
              transform: `scale(${p.scale})`,
            }}
          />
        ))}
      </div>

      {/* Header & Mobile Dock */}
      <Header />
      <MobileDock />

      {/* ══════════════════════════════════════
          MAIN CONTENT — layered above 3D scene
      ══════════════════════════════════════ */}
      <div className="relative z-10">

        {/* ═══════════════════
            1. HERO SECTION
        ═══════════════════ */}
        <section
          id="hero"
          className="relative min-h-screen flex flex-col justify-end pt-[120px] pb-20 overflow-hidden"
        >
          <motion.div
            style={{ opacity: heroOpacity, y: heroY }}
            className="w-full max-w-[1180px] mx-auto px-6 z-10"
          >
            {/* Pill badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(212,166,77,0.35)] bg-[rgba(212,166,77,0.08)] backdrop-blur-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span className="text-gold text-xs font-bold tracking-widest">عمرة بنية وأجر دائم</span>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.65fr] items-end gap-12">
              {/* Copy */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="mb-6"
                >
                  <Image
                    src="/assets/naya-logo.png"
                    alt="شعار نية"
                    width={150}
                    height={180}
                    priority
                    style={{ height: "auto" }}
                    className="object-contain drop-shadow-[0_8px_30px_rgba(212,166,77,0.45)]"
                  />
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.2 }}
                  className="text-gold-soft text-[clamp(4rem,12vw,8rem)] font-extrabold leading-none drop-shadow-[0_0_48px_rgba(212,166,77,0.45)] mb-4"
                >
                  نية
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.35 }}
                  className="max-w-[620px] text-[#efe8da] text-lg md:text-xl font-normal leading-[1.85] mb-8"
                >
                  منصة رقمية للأعمال الخيرية والعمرة بالنيابة تربط المسلمين حول العالم بخدمات
                  موثوقة وموثقة من مكة، بتجربة تجمع بين الثقة والتقنية والأثر الحقيقي.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <a
                    href="#services"
                    onClick={(e) => scrollTo(e, "#services")}
                    className="flex items-center justify-center gap-2 min-h-12 px-6 rounded-xl font-bold text-[#130f08] bg-gradient-to-r from-[#d2a14a] via-[#f0cc7c] to-[#9d6e2a] shadow-[0_14px_48px_rgba(212,166,77,0.35)] hover:-translate-y-1 hover:from-white hover:to-white hover:text-[#030712] hover:shadow-[0_20px_60px_rgba(255,255,255,0.7)] transition-all duration-300"
                  >
                    <Boxes className="w-5 h-5" />
                    <span>استكشف الخدمات</span>
                  </a>
                  <a
                    href="#steps"
                    onClick={(e) => scrollTo(e, "#steps")}
                    className="flex items-center justify-center gap-2 min-h-12 px-6 border border-[rgba(255,255,255,0.18)] rounded-xl font-bold text-white bg-[rgba(255,255,255,0.055)] backdrop-blur-sm hover:-translate-y-1 hover:border-white hover:bg-white hover:text-[#030712] hover:shadow-[0_10px_30px_rgba(255,255,255,0.4)] transition-all duration-300"
                  >
                    <Route className="w-5 h-5" />
                    <span>كيف تعمل؟</span>
                  </a>
                </motion.div>
              </div>

              {/* Phone mockup */}
              <motion.div
                initial={{ opacity: 0, scale: 0.88, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 80 }}
                className="relative justify-self-center w-[min(300px,72vw)] hidden lg:block"
              >
                <div className="relative z-10 animate-float">
                  <Image
                    src="/assets/app-phone.webp"
                    alt="واجهة تطبيق نية"
                    width={300}
                    height={600}
                    priority
                    className="w-full h-auto rounded-[32px] shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-[rgba(212,166,77,0.25)]"
                  />
                  {/* Glow behind phone */}
                  <div className="absolute inset-[-20%] bg-[radial-gradient(ellipse,rgba(212,166,77,0.18),transparent_70%)] blur-xl -z-10" />
                </div>
                <div className="absolute inset-[5%_-10%] z-[1] border border-[rgba(212,166,77,0.28)] rounded-full animate-rotate-slow" />
                <div className="absolute inset-[18%_-4%] z-[1] border border-dashed border-[rgba(241,207,130,0.18)] rounded-full animate-rotate-slow-reverse" />
              </motion.div>
            </div>

            {/* Stats strip */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7 }}
              className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {[
                { strong: "2B+", span: "مسلم حول العالم" },
                { strong: "30M+", span: "معتمر مستهدف سنوياً" },
                { strong: "$7T+", span: "حجم الاقتصاد الإسلامي" },
              ].map((stat, i) => (
                <StatCard key={i} strong={stat.strong} span={stat.span} delay={0.7 + i * 0.12} />
              ))}
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-muted-gold/60"
          >
            <span className="text-xs tracking-widest font-medium">مرر للأسفل</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </section>

        {/* ═══════════════════
            2. SERVICES SECTION
        ═══════════════════ */}
        <section id="services" className="py-28 px-6 md:px-12 max-w-[1180px] mx-auto scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <SectionLabel>توفر المنصة</SectionLabel>
            <SectionHeading>كل خدمة بنية واضحة وتوثيق كامل</SectionHeading>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Box, title: "العمرة بالنيابة", desc: "تؤدى العمرة عنك أو عن من تحب عبر مزودين موثوقين داخل المشاعر المقدسة." },
              { icon: Droplet, title: "توزيع الماء", desc: "سقيا الماء في أقدس البقاع مع متابعة لحظية وإثبات تنفيذ موثق." },
              { icon: TreePalm, title: "توزيع التمر", desc: "توزيع التمر على ضيوف الرحمن بخطوات بسيطة وشفافة." },
              { icon: ShieldCheck, title: "توثيق رقمي", desc: "تقارير رقمية وصور وتحديثات تثبت كل مرحلة من مراحل التنفيذ." },
            ].map((srv, i) => {
              const Icon = srv.icon;
              return (
                <GlassCard key={i} delay={i * 0.1}>
                  <div className="flex items-center justify-center w-14 h-14 rounded-2xl border border-[rgba(212,166,77,0.25)] bg-[rgba(212,166,77,0.08)] mb-5 group-hover:bg-[rgba(212,166,77,0.15)] transition-colors">
                    <Icon className="w-7 h-7 text-gold-soft drop-shadow-[0_0_12px_rgba(212,166,77,0.4)]" />
                  </div>
                  <h3 className="text-xl font-bold text-text-gold mb-2 group-hover:text-gold-soft transition-colors">{srv.title}</h3>
                  <p className="text-muted-gold text-sm leading-relaxed">{srv.desc}</p>
                </GlassCard>
              );
            })}
          </div>
        </section>

        {/* ═══════════════════
            3. ABOUT SECTION
        ═══════════════════ */}
        <section id="about" className="py-28 px-6 md:px-12 relative scroll-mt-24">
          <div className="max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] items-center gap-16">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85 }}
              className="flex items-center justify-center"
            >
              <div className="relative flex items-center justify-center p-10">
                <Image
                  src="/assets/naya-logo.png"
                  alt="شعار نية الذهبي"
                  width={220}
                  height={264}
                  style={{ height: "auto" }}
                  className="object-contain drop-shadow-[0_0_50px_rgba(212,166,77,0.4)]"
                />
                <div className="absolute inset-0 border border-[rgba(212,166,77,0.2)] rounded-full animate-rotate-slow" />
                <div className="absolute inset-[12%] border border-dashed border-[rgba(212,166,77,0.12)] rounded-full animate-rotate-slow-reverse" />
                <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(212,166,77,0.08),transparent_70%)]" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85 }}
            >
              <SectionLabel>من هو تطبيق نية؟</SectionLabel>
              <SectionHeading className="mb-5">نحوّل النية إلى أثر حقيقي موثق</SectionHeading>
              <p className="text-muted-gold leading-[1.85] mb-8 text-base md:text-lg">
                نية هي منصة تقنية تمكّن المسلمين من أداء أعمال خير وعبادات عن أنفسهم أو عن
                غيرهم بسهولة وشفافية من أي مكان في العالم.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: Bell, text: "متابعة مباشرة للحالة" },
                  { icon: Users, text: "شبكة مزودين موثوقين" },
                  { icon: CreditCard, text: "دفع إلكتروني آمن ومتعدد" },
                  { icon: FileCheck2, text: "تقارير رقمية موثقة" },
                ].map((feat, i) => {
                  const Icon = feat.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="flex items-center gap-3.5 p-4 rounded-xl border border-[rgba(212,166,77,0.18)] bg-[rgba(11,19,41,0.55)] hover:border-[rgba(212,166,77,0.42)] hover:bg-[rgba(11,19,41,0.72)] transition-all duration-300"
                    >
                      <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[rgba(212,166,77,0.1)] border border-[rgba(212,166,77,0.2)] grid place-items-center">
                        <Icon className="w-5 h-5 text-gold-soft" />
                      </div>
                      <span className="text-text-gold font-semibold text-sm">{feat.text}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════
            4. MARKET OPPORTUNITY (Redesigned from deck slide 07)
        ═══════════════════ */}
        <section id="problem" className="py-28 px-6 md:px-12 scroll-mt-24 relative overflow-hidden">
          {/* Background accent */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(212,166,77,0.25)] to-transparent" />

          <div className="max-w-[1180px] mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-[800px] mx-auto mb-20"
            >
              <SectionLabel>فرصة سوقية ضخمة وغير مستغلة</SectionLabel>
              <SectionHeading className="mb-5">
                سوق موجود .. لكن <span className="text-gold">غير منظم</span>
              </SectionHeading>
              <p className="text-muted-gold leading-[1.85] text-base md:text-lg">
                ملايين المسلمين يرغبون في أداء العمرة بالنيابة والتبرع بسهولة وثقة،
                لكن السوق الحالي مشتت، غير احترافي، ويعتمد على طرق تقليدية.
              </p>
            </motion.div>

            {/* ── Market Size + Current Reality ── */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 mb-16">

              {/* Market Size Block */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative p-8 rounded-3xl border border-[rgba(212,166,77,0.2)] bg-[rgba(11,19,41,0.65)] backdrop-blur-xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,166,77,0.06),transparent_60%)]" />
                <h3 className="relative text-gold font-bold text-sm tracking-widest mb-8">حجم السوق</h3>
                <div className="relative grid grid-cols-3 gap-6">
                  {[
                    { icon: Users, num: "2B+", label: "مسلم حول العالم", sub: "سوق عالمي ضخم ونمو مستمر" },
                    { icon: Box, num: "30M+", label: "معتمر مستهدف سنوياً", sub: "بحلول 2030 (رؤية السعودية 2030)" },
                    { icon: TrendingUp, num: "$7T+", label: "حجم الاقتصاد الإسلامي", sub: "حول العالم ينمو سنوياً" },
                  ].map((s, i) => {
                    const Icon = s.icon;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 + i * 0.12 }}
                        className="text-center"
                      >
                        <div className="mx-auto w-12 h-12 rounded-xl border border-[rgba(212,166,77,0.3)] bg-[rgba(212,166,77,0.08)] grid place-items-center mb-4">
                          <Icon className="w-6 h-6 text-gold-soft" />
                        </div>
                        <div className="text-3xl md:text-4xl font-extrabold text-gold-soft drop-shadow-[0_0_20px_rgba(212,166,77,0.5)] mb-1">{s.num}</div>
                        <div className="text-text-gold text-sm font-bold mb-1">{s.label}</div>
                        <div className="text-muted-gold/70 text-xs leading-relaxed">{s.sub}</div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Current Market Reality Block */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative p-8 rounded-3xl border border-[rgba(212,166,77,0.2)] bg-[rgba(11,19,41,0.65)] backdrop-blur-xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(212,166,77,0.05),transparent_60%)]" />
                <h3 className="relative text-gold font-bold text-sm tracking-widest mb-6">واقع السوق اليوم</h3>
                <div className="relative flex flex-col gap-4">
                  {[
                    { icon: AlertCircle, text: "يعتمد على واتساب وتحويلات بنكية بدون تجربة منظمة" },
                    { icon: FileX2, text: "لا يوجد توثيق أو متابعة موثوقة للأعمال والعبادات المنفذة" },
                    { icon: EyeOff, text: "غياب الشفافية والضمان الحقيقي للمتبرع والمستفيد" },
                    { icon: Globe2, text: "لا توجد منصة عالمية تجمع كل الخدمات في مكان واحد" },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                        className="flex items-start gap-4 p-4 rounded-xl border border-[rgba(212,166,77,0.15)] bg-[rgba(11,19,41,0.4)] hover:border-[rgba(212,166,77,0.42)] hover:bg-[rgba(11,19,41,0.68)] transition-all duration-300"
                      >
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[rgba(212,166,77,0.1)] border border-[rgba(212,166,77,0.2)] grid place-items-center mt-0.5">
                          <Icon className="w-5 h-5 text-gold-soft" />
                        </div>
                        <span className="text-muted-gold text-sm leading-relaxed">{item.text}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* ── Gap vs Solution ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {/* The Gap */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative p-8 rounded-3xl border border-[rgba(255,100,100,0.15)] bg-[rgba(11,19,41,0.65)] backdrop-blur-xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,100,100,0.03),transparent_60%)]" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl border border-[rgba(255,180,100,0.25)] bg-[rgba(255,180,100,0.08)] grid place-items-center">
                      <AlertCircle className="w-6 h-6 text-[#ffb464]" />
                    </div>
                    <h3 className="text-[#ffb464] text-2xl font-extrabold">الفجوة</h3>
                  </div>
                  <p className="text-muted-gold text-base leading-[1.85]">
                    سوق ضخم بمليارات الدولارات بدون منصة موثوقة وحديثة تجمعه.
                  </p>
                </div>
              </motion.div>

              {/* The Solution */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.12 }}
                className="relative p-8 rounded-3xl border border-[rgba(212,166,77,0.25)] bg-[rgba(11,19,41,0.65)] backdrop-blur-xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,166,77,0.05),transparent_60%)]" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl overflow-hidden grid place-items-center">
                      <Image src="/assets/naya-logo.png" alt="نية" width={40} height={48} style={{ height: "auto" }} className="object-contain" />
                    </div>
                    <h3 className="text-gold-soft text-2xl font-extrabold">الحل</h3>
                  </div>
                  <p className="text-muted-gold text-base leading-[1.85]">
                    منصة رقمية موثوقة وحديثة تنظم السوق وتربط المسلمين بخدمات روحانية موثقة في تجربة استثنائية.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* ── Closing Quote ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative text-center py-10 px-6"
            >
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(212,166,77,0.2)] to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(212,166,77,0.2)] to-transparent" />
              <p className="text-gold-soft text-xl md:text-2xl font-bold leading-relaxed max-w-[700px] mx-auto">
                <span className="text-gold text-3xl font-extrabold ml-2">&ldquo;</span>
                لسنا نخلق احتياجاً جديداً .. نحن ننظم احتياجاً موجوداً منذ عقود
                <span className="text-gold text-3xl font-extrabold mr-2">&rdquo;</span>
              </p>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════
            5. SOLUTION SECTION
        ═══════════════════ */}
        <section className="py-28 px-6 md:px-12">
          <div className="max-w-[1180px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16 max-w-[780px] mx-auto"
            >
              <SectionLabel>الحل</SectionLabel>
              <SectionHeading className="mb-5">تجربة رقمية موثوقة للأعمال بالنيابة</SectionHeading>
              <p className="text-muted-gold text-base md:text-lg">
                منصة متكاملة تجمع بين التقنية والثقة لتنفيذ العبادات والأعمال الخيرية بكل سهولة وشفافية.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { icon: Timer, title: "طلب خلال دقائق", desc: "تجربة سهلة وسريعة لاختيار الخدمة وتحديد تفاصيل المستفيد." },
                { icon: ShieldCheck, title: "تنفيذ موثق", desc: "مزودون معتمدون وشبكة تنفيذ موثوقة داخل المملكة." },
                { icon: BellRing, title: "إشعارات لحظية", desc: "متابعة مباشرة لحالة الطلب أولاً بأول." },
                { icon: Languages, title: "تجربة عالمية", desc: "خدمات بعدة لغات للمسلمين حول العالم." },
              ].map((sol, i) => {
                const Icon = sol.icon;
                return (
                  <GlassCard key={i} delay={i * 0.1}>
                    <div className="flex items-center justify-center w-14 h-14 rounded-2xl border border-[rgba(212,166,77,0.25)] bg-[rgba(212,166,77,0.08)] mb-5 group-hover:bg-[rgba(212,166,77,0.15)] transition-colors">
                      <Icon className="w-7 h-7 text-gold-soft drop-shadow-[0_0_12px_rgba(212,166,77,0.4)]" />
                    </div>
                    <h3 className="text-xl font-bold text-text-gold mb-2 group-hover:text-gold-soft transition-colors">{sol.title}</h3>
                    <p className="text-muted-gold text-sm leading-relaxed">{sol.desc}</p>
                  </GlassCard>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════
            6. HOW IT WORKS / STEPS
        ═══════════════════ */}
        <section id="steps" className="py-28 px-6 md:px-12 max-w-[1180px] mx-auto scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 max-w-[780px] mx-auto"
          >
            <SectionLabel>طريقة العمل</SectionLabel>
            <SectionHeading>ست خطوات تربط نيتك بأثر موثق من مكة</SectionHeading>
          </motion.div>

          {/* Timeline connector */}
          <div className="relative">
            {/* Horizontal line on desktop */}
            <div className="hidden lg:block absolute top-[52px] left-[8.33%] right-[8.33%] h-[1px] bg-gradient-to-r from-transparent via-[rgba(212,166,77,0.35)] to-transparent" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5">
              {[
                { num: "01", icon: Boxes, title: "اختيار الخدمة", desc: "اختر نوع الخدمة التي تريدها بسهولة." },
                { num: "02", icon: ShieldCheck, title: "بيانات المستفيد", desc: "أدخل بياناتك وبيانات المستفيد بدقة." },
                { num: "03", icon: CreditCard, title: "الدفع الإلكتروني", desc: "ادفع بأمان عبر وسائل متعددة ومشفرة." },
                { num: "04", icon: Box, title: "تنفيذ الطلب", desc: "ينفذ طلبك مزود موثوق داخل المشاعر المقدسة." },
                { num: "05", icon: Bell, title: "التوثيق والمتابعة", desc: "تصلك تحديثات مباشرة في كل خطوة." },
                { num: "06", icon: FileCheck2, title: "تقرير الإتمام", desc: "تحصل على تقرير رقمي موثق بالصور والتفاصيل." },
              ].map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.article
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    whileHover={{ y: -6 }}
                    className="group relative p-5 rounded-2xl border border-[rgba(212,166,77,0.18)] bg-[rgba(11,19,41,0.65)] backdrop-blur-xl text-center flex flex-col items-center hover:border-[rgba(212,166,77,0.42)] transition-all duration-300"
                  >
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(212,166,77,0.4)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="grid place-items-center w-[52px] h-[52px] mb-4 border border-[rgba(212,166,77,0.35)] rounded-full bg-[rgba(212,166,77,0.1)] text-gold-soft font-extrabold text-base select-none shadow-[0_0_20px_rgba(212,166,77,0.12)]">
                      {step.num}
                    </span>
                    <Icon className="w-7 h-7 mb-3 text-gold-soft" />
                    <h3 className="text-base font-bold text-text-gold mb-2 group-hover:text-gold-soft transition-colors">{step.title}</h3>
                    <p className="text-muted-gold text-xs leading-relaxed">{step.desc}</p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════
            7. ECOSYSTEM SECTION
        ═══════════════════ */}
        <section className="py-28 px-6 md:px-12 relative overflow-hidden">
          <div className="relative z-10 max-w-[1180px] mx-auto flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12 max-w-[780px]"
            >
              <SectionLabel>منظومة الخير داخل نية</SectionLabel>
              <SectionHeading className="mb-5">أكثر من مجرد عمرة بالنيابة</SectionHeading>
              <p className="text-muted-gold text-base md:text-lg">
                منصة خير متكاملة تعتني بالأعمال والعبادات وتوثق الأثر في تجربة واحدة.
              </p>
            </motion.div>

            {/* Desktop orbit */}
            <div className="relative w-full flex justify-center mt-8 min-h-[660px] md:min-h-[620px]">
              <div className="hidden md:block relative w-[580px] h-[580px] border border-[rgba(212,166,77,0.22)] rounded-full animate-breathe">
                <div className="absolute inset-[12%] border border-dashed border-[rgba(212,166,77,0.18)] rounded-full animate-rotate-slow" />
                <div className="absolute inset-[25%] border border-dashed border-[rgba(212,166,77,0.18)] rounded-full animate-rotate-slow-reverse" />

                {/* Center niya badge */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 grid place-items-center w-[165px] h-[165px] border border-[rgba(241,207,130,0.5)] rounded-full bg-[rgba(11,19,41,0.92)] text-white text-3xl font-extrabold shadow-[0_0_50px_rgba(212,166,77,0.25),inset_0_0_40px_rgba(212,166,77,0.1)]">
                  نية
                </div>

                {[
                  { icon: Box, text: "عمرة بالنيابة", pos: "top-[-22px] left-1/2 -translate-x-1/2" },
                  { icon: Droplet, text: "توزيع ماء", pos: "top-[42%] -left-[34px]" },
                  { icon: TreePalm, text: "توزيع تمر", pos: "top-[42%] -right-[34px]" },
                  { icon: Heart, text: "هدايا خيرية", pos: "bottom-[20px] right-[16%]" },
                  { icon: Activity, text: "صدقات موسمية", pos: "bottom-[20px] left-[16%]" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                      whileHover={{ scale: 1.08 }}
                      className={cn(
                        "absolute z-20 grid place-items-center w-[128px] min-h-[128px] p-3 border border-[rgba(212,166,77,0.3)] rounded-2xl bg-[rgba(11,19,41,0.88)] backdrop-blur-xl text-center shadow-[0_20px_80px_rgba(0,0,0,0.5)] cursor-default transition-all duration-300 hover:border-[rgba(212,166,77,0.6)]",
                        item.pos
                      )}
                    >
                      <Icon className="w-8 h-8 mb-2 text-gold-soft" />
                      <span className="text-sm font-semibold text-text-gold">{item.text}</span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Mobile list */}
              <div className="md:hidden flex flex-col gap-3.5 w-full max-w-[400px]">
                <div className="grid place-items-center w-[110px] h-[110px] mx-auto mb-6 border border-[rgba(241,207,130,0.45)] rounded-full bg-[rgba(11,19,41,0.92)] text-white text-2xl font-extrabold shadow-[0_0_40px_rgba(212,166,77,0.25)]">
                  نية
                </div>
                {[
                  { icon: Box, text: "عمرة بالنيابة" },
                  { icon: Droplet, text: "توزيع ماء" },
                  { icon: TreePalm, text: "توزيع تمر" },
                  { icon: Heart, text: "هدايا خيرية" },
                  { icon: Activity, text: "صدقات موسمية" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                      className="flex items-center gap-4 p-4 border border-[rgba(212,166,77,0.2)] rounded-xl bg-[rgba(11,19,41,0.88)] shadow-md"
                    >
                      <Icon className="w-7 h-7 text-gold-soft flex-shrink-0" />
                      <span className="text-base font-bold text-text-gold">{item.text}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════
            8. BUSINESS MODEL
        ═══════════════════ */}
        <section className="py-28 px-6 md:px-12 max-w-[1180px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 max-w-[780px] mx-auto"
          >
            <SectionLabel>نموذج العمل</SectionLabel>
            <SectionHeading>نموذج مستدام يحقق أثراً عظيماً</SectionHeading>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: CreditCard, title: "رسوم الخدمة", desc: "نسبة ثابتة على كل طلب خدمة." },
              { icon: Sparkles, title: "اشتراكات وباقات", desc: "باقات شهرية وسنوية للأفراد والمؤسسات." },
              { icon: ArrowUpRight, title: "القيمة المضافة", desc: "توثيق مميز وتقارير وإهداءات رقمية." },
              { icon: Globe2, title: "الانتشار العالمي", desc: "التوسع في أسواق جديدة بخدمات محلية وتجارب رقمية." },
            ].map((biz, i) => {
              const Icon = biz.icon;
              return (
                <GlassCard key={i} delay={i * 0.1}>
                  <div className="flex items-center justify-center w-14 h-14 rounded-2xl border border-[rgba(212,166,77,0.25)] bg-[rgba(212,166,77,0.08)] mb-5 group-hover:bg-[rgba(212,166,77,0.15)] transition-colors">
                    <Icon className="w-7 h-7 text-gold-soft" />
                  </div>
                  <h3 className="text-xl font-bold text-text-gold mb-2 group-hover:text-gold-soft transition-colors">{biz.title}</h3>
                  <p className="text-muted-gold text-sm leading-relaxed">{biz.desc}</p>
                </GlassCard>
              );
            })}
          </div>
        </section>

        {/* ═══════════════════
            9. TRUST & SECURITY
        ═══════════════════ */}
        <section id="trust" className="py-28 px-6 md:px-12 scroll-mt-24">
          <div className="max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] items-center gap-16">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85 }}
            >
              <SectionLabel>ثقتك مسؤوليتنا</SectionLabel>
              <SectionHeading className="mb-5">الأمان والشفافية أولاً</SectionHeading>
              <p className="text-muted-gold leading-[1.85] text-base md:text-lg">
                نبني الثقة من خلال أعلى معايير الأمان والشفافية في كل خطوة، لأن أمانة العمل
                هي أمانة بين يدي الله أولاً.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: ShieldCheck, title: "حماية البيانات", desc: "تشفير متقدم وحماية متعددة المستويات." },
                { icon: FileCheck2, title: "توثيق موثوق", desc: "سجل رقمي لكل خدمة يمكن الرجوع إليه." },
                { icon: LockKeyhole, title: "دفع آمن", desc: "بوابات دفع مرخصة عالمياً." },
                { icon: Handshake, title: "شركاء معتمدون", desc: "تعاون فقط مع جهات موثوقة ومعتمدة." },
                { icon: Eye, title: "شفافية كاملة", desc: "عرض واضح للتكلفة ومراحل التنفيذ." },
                { icon: Headphones, title: "دعم على مدار الساعة", desc: "فريق متخصص للرد على استفساراتك." },
              ].map((card, i) => {
                const Icon = card.icon;
                return (
                  <GlassCard key={i} delay={i * 0.08}>
                    <Icon className="w-8 h-8 mb-3 text-gold-soft" />
                    <h3 className="text-base font-bold text-text-gold mb-1 group-hover:text-gold-soft transition-colors">{card.title}</h3>
                    <p className="text-muted-gold text-xs leading-relaxed">{card.desc}</p>
                  </GlassCard>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════
            10. CTA SECTION
        ═══════════════════ */}
        <section id="cta" className="relative py-40 px-6 flex items-center justify-center text-center overflow-hidden">
          {/* Big radial glow in background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(212,166,77,0.08),transparent)] pointer-events-none" />
          {/* Top separator line */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(212,166,77,0.3)] to-transparent" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(212,166,77,0.35)] bg-[rgba(212,166,77,0.08)] backdrop-blur-sm mb-8"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span className="text-gold text-xs font-bold tracking-widest">الخير يبدأ بنية</span>
            </motion.div>

            <h2 className="text-gold-soft text-4xl md:text-5xl lg:text-6xl font-extrabold max-w-[760px] leading-tight mx-auto mb-10 drop-shadow-[0_0_40px_rgba(212,166,77,0.25)]">
              نقرّب الخير للمسلمين حول العالم بشكل حديث وشفاف
            </h2>

            <a
              href="#hero"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="inline-flex items-center gap-2 min-h-14 px-8 rounded-xl font-bold text-[#130f08] bg-gradient-to-r from-[#d2a14a] via-[#f0cc7c] to-[#9d6e2a] shadow-[0_14px_48px_rgba(212,166,77,0.4)] hover:-translate-y-1 hover:from-white hover:to-white hover:text-[#030712] hover:shadow-[0_22px_64px_rgba(255,255,255,0.7)] transition-all duration-300 text-lg"
            >
              <ArrowUp className="w-5 h-5" />
              <span>العودة للبداية</span>
            </a>
          </motion.div>
        </section>

        <Footer />
      </div>

      {/* Particle keyframe */}
      <style jsx global>{`
        @keyframes riseParticle {
          0% { opacity: 0; transform: translateY(0) scale(1); }
          16%, 78% { opacity: 0.55; }
          100% { opacity: 0; transform: translateY(-100vh) scale(1); }
        }
      `}</style>
    </div>
  );
}
