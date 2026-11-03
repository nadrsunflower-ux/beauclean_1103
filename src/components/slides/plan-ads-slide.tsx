"use client";

import { SlideFrame } from "@/components/deck/slide-frame";
import { AdPlanBody, BoostedReelFigure } from "@/components/deck/ad-plan";
import { plan3 } from "@/data/plan";

export function PlanAdsSlide() {
  return (
    <SlideFrame
      sectionNo="02"
      section="기존 현황 분석 및 운영 계획"
      title={`${plan3.no}. ${plan3.title}`}
      subtitle="11월 유입 증대 → 12월부터 META 광고로 자사몰 · 스마트스토어 유입 확대"
    >
      <div className="grid h-full grid-cols-[236px_1fr] items-center gap-7">
        <BoostedReelFigure />
        <AdPlanBody />
      </div>
    </SlideFrame>
  );
}
