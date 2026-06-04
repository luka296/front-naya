import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-arabic",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "نية | منصة رقمية للأعمال الخيرية والعمرة بالنيابة",
  description: "نية: منصة رقمية موثوقة للأعمال الخيرية والعمرة بالنيابة، تربط المسلمين حول العالم بخدمات موثقة من مكة.",
  keywords: ["نية", "عمرة بالنيابة", "صدقة", "سقيا ماء", "توزيع تمر", "منصة نية", "عمل خيري", "مكة المكرمة"],
  authors: [{ name: "Niya Platform" }],
  robots: "index, follow",
  openGraph: {
    title: "نية | منصة رقمية للأعمال الخيرية والعمرة بالنيابة",
    description: "تطبيق نية يربطك بخدمات موثوقة وموثقة من مكة المكرمة كالعمرة بالنيابة وسقيا الماء وتوزيع التمور.",
    url: "https://niya.app",
    siteName: "Niya",
    locale: "ar_SA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${ibmPlexArabic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-arabic bg-bg text-text-gold select-none">
        {/* Ambient Film Grain Overlay */}
        <div className="grain" aria-hidden="true" />
        
        {children}
      </body>
    </html>
  );
}
