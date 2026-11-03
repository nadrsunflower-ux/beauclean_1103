import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "45 920",
  display: "swap",
});

export const metadata: Metadata = {
  title: "뷰클린 인스타그램 운영 기획안 | GL AI STUDIO",
  description: "뷰클린 인스타그램 기존 현황 분석과 11~12월 운영 계획",
};

export const viewport: Viewport = {
  themeColor: "#0a1120",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${pretendard.variable} h-full antialiased`}>
      <body className="h-full overflow-hidden bg-stage">
        <TooltipProvider delayDuration={100}>{children}</TooltipProvider>
      </body>
    </html>
  );
}
