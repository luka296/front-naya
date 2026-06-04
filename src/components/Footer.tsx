"use client";

import { Sparkles, ArrowUp, Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative border-t border-line-gold bg-[rgba(3,7,18,0.96)] backdrop-blur-md pt-20 pb-28 md:pb-12 overflow-hidden">
      {/* Background radial gold glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-0 w-[500px] h-[150px] bg-[radial-gradient(circle_at_center,rgba(212,166,77,0.08),transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-[1180px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
        {/* Brand Information column */}
        <div className="lg:col-span-2 max-w-[360px]">
          <a href="#hero" onClick={scrollToTop} className="inline-flex items-center gap-2.5 font-bold text-white mb-6 cursor-pointer select-none">
            <span className="grid place-items-center w-9 h-9 border border-line-gold rounded-lg bg-[linear-gradient(145deg,rgba(212,166,77,0.22),rgba(255,255,255,0.02))] shadow-[inset_0_0_18px_rgba(212,166,77,0.16)] text-gold-soft">
              ن
            </span>
            <span className="text-xl tracking-wide font-extrabold">نية</span>
          </a>
          <p className="text-muted-gold text-sm leading-relaxed mb-6">
            منصة رقمية موثوقة للأعمال الخيرية والعمرة بالنيابة. نربط المسلمين حول العالم بخدمات موثقة من مكة المكرمة لتقديم أثر مستدام ومثبت بالكامل.
          </p>
          <div className="flex flex-col gap-3 text-sm text-muted-gold">
            <span className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-gold" />
              <span>support@niya.app</span>
            </span>
            <span className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-gold" />
              <span>+966 500 000 000</span>
            </span>
            <span className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-gold" />
              <span>مكة المكرمة، المملكة العربية السعودية</span>
            </span>
          </div>
        </div>

        {/* Platform Links */}
        <div>
          <h4 className="text-white font-bold text-sm mb-6 select-none">المنصة</h4>
          <ul className="flex flex-col gap-4 text-sm text-muted-gold font-medium">
            {["عن نية", "المميزات", "الخدمات الخيرية", "معايير الأمان", "طريقة العمل"].map((link, i) => (
              <li key={i}>
                <a href="#about" className="hover:text-white transition-colors select-none">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal & Help */}
        <div>
          <h4 className="text-white font-bold text-sm mb-6 select-none">المساعدة والنظام</h4>
          <ul className="flex flex-col gap-4 text-sm text-muted-gold font-medium">
            {["الشروط والأحكام", "سياسة الخصوصية", "الأسئلة الشائعة", "مركز الدعم", "اتصل بنا"].map((link, i) => (
              <li key={i}>
                <a href="#" className="hover:text-white transition-colors select-none">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* App download section */}
        <div>
          <h4 className="text-white font-bold text-sm mb-6 select-none">تحميل التطبيق</h4>
          <p className="text-muted-gold text-xs leading-relaxed mb-6">
            احصل على تجربة نية الكاملة وتابع تنفيذ خدماتك الخيرية لحظة بلحظة.
          </p>
          <div className="flex flex-col gap-3">
            <a
              href="#"
              className="flex items-center justify-center gap-2.5 h-[42px] px-4 border border-[rgba(212,166,77,0.3)] rounded-lg bg-[rgba(212,166,77,0.06)] hover:bg-white hover:text-[#030712] hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] text-white text-xs font-bold transition-all duration-300 select-none"
            >
              <span>تحميل متجر التطبيقات (iOS)</span>
            </a>
            <a
              href="#"
              className="flex items-center justify-center gap-2.5 h-[42px] px-4 border border-[rgba(212,166,77,0.3)] rounded-lg bg-[rgba(212,166,77,0.06)] hover:bg-white hover:text-[#030712] hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] text-white text-xs font-bold transition-all duration-300 select-none"
            >
              <span>تحميل جوجل بلاي (Android)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Footer bottom bar */}
      <div className="border-t border-[rgba(212,166,77,0.12)] pt-8 max-w-[1180px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-gold">
        <span className="select-none">© {new Date().getFullYear()} تطبيق نية (Niya App). جميع الحقوق محفوظة.</span>
        
        {/* Back to top button */}
        <a
          href="#hero"
          onClick={scrollToTop}
          className="flex items-center gap-2 px-3.5 py-2 border border-line-gold rounded-lg bg-[rgba(255,255,255,0.02)] font-semibold text-white hover:bg-white hover:text-[#030712] hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-300 select-none"
        >
          <ArrowUp className="w-4 h-4" />
          <span>العودة للأعلى</span>
        </a>
      </div>
    </footer>
  );
}
