import type { ComponentType } from "react";
import { CoverSlide } from "./cover-slide";
import { UploadCycleSlide } from "./upload-cycle-slide";
import { PostsViewsSlide, ReelsViewsSlide } from "./views-cards-slide";
import { PlanProductsSlide } from "./plan-products-slide";
import { PlanReelsSlide } from "./plan-reels-slide";
import { PlanAdsSlide } from "./plan-ads-slide";
import { SummarySlide } from "./summary-slide";
import { ReviewSlide } from "./review-slide";

export type SlideDef = { id: string; title: string; Component: ComponentType };

export const slides: SlideDef[] = [
  { id: "cover", title: "표지", Component: CoverSlide },
  { id: "upload-cycle", title: "기존 현황 분석 · 업로드 주기", Component: UploadCycleSlide },
  { id: "views-reels", title: "기존 현황 분석 · 조회수 ① 릴스", Component: ReelsViewsSlide },
  { id: "views-posts", title: "기존 현황 분석 · 조회수 ② 일반 게시물", Component: PostsViewsSlide },
  { id: "plan-products", title: "운영 계획 1 · 제품군 캐러셀 카드뉴스", Component: PlanProductsSlide },
  { id: "plan-reels", title: "운영 계획 2 · 절레동화 시리즈", Component: PlanReelsSlide },
  { id: "plan-ads", title: "운영 계획 3 · META 광고", Component: PlanAdsSlide },
  { id: "summary", title: "요약 정리", Component: SummarySlide },
  { id: "review", title: "검토 사항", Component: ReviewSlide },
];
