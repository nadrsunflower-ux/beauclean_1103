"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { SlideFrame } from "@/components/deck/slide-frame";
import { Block } from "@/components/deck/primitives";
import { Lightbox } from "@/components/deck/lightbox";
import { fadeUp } from "@/components/deck/motion";
import { PRODUCT_LINES, plan1 } from "@/data/plan";
import { coverSrc, posts } from "@/data/report2026";

const CAROUSELS = [
  { src: "/plan/women-carousel.png", width: 2116, height: 966, line1: "여성용", line2: "위생팬티", alt: "여성용 위생팬티 캐러셀 카드뉴스 11장" },
  { src: "/plan/men-carousel.png", width: 2112, height: 942, line1: "남성용", line2: "위생팬티", alt: "남성용 위생팬티 캐러셀 카드뉴스 11장" },
];

export function PlanProductsSlide() {
  return (
    <SlideFrame
      sectionNo="02"
      section="기존 현황 분석 및 운영 계획"
      title={`${plan1.no}. ${plan1.title}`}
      subtitle="11월 · 제품군별 소개와 상세를 담은 캐러셀 카드뉴스 5종"
      aside={
        <div className="rounded-full border border-hair bg-paper px-3.5 py-1.5 text-[12.5px] text-steel">
          카드뉴스 이미지를 누르면 크게 볼 수 있습니다
        </div>
      }
    >
      <div className="grid h-full grid-cols-[1fr_500px] gap-8">
        <div className="flex flex-col justify-center gap-6">
          <Block tone="status" label="현황">
            <p className="text-[13.5px] leading-relaxed text-steel">
              2026년 일반 게시물 {posts.length}편 — 정기구독 안내, 카카오 톡딜, 후기 콘테스트, 네일엑스포 안내 등
            </p>
            <div className="flex gap-1.5">
              {posts.map((p) => (
                <span key={p.no} className="relative h-[72px] w-[54px] overflow-hidden rounded-md ring-1 ring-black/5">
                  <Image src={coverSrc(p.no)} alt={`${p.title} 표지`} fill sizes="110px" className="object-cover" />
                </span>
              ))}
            </div>
          </Block>

          <Block tone="plan" label="계획">
            <p className="text-[18px] font-bold leading-[1.45] tracking-[-0.02em] text-navy">{plan1.plan}</p>
            <div className="rounded-xl bg-paper px-3.5 py-3 ring-1 ring-hair">
              <p className="text-[12px] font-semibold text-steel">11월 업로드 예정 5종</p>
              <ol className="mt-2 flex flex-wrap gap-1.5">
                {PRODUCT_LINES.map((name, i) => (
                  <li
                    key={name}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[13px] font-bold text-navy ring-1 ring-hair"
                  >
                    <span className="grid size-[18px] place-items-center rounded-full bg-cobalt text-[10.5px] font-bold text-white">
                      {i + 1}
                    </span>
                    {name}
                  </li>
                ))}
              </ol>
            </div>
          </Block>

          <Block tone="effect" label="기대 효과">
            <p className="text-[16.5px] font-semibold leading-[1.55] tracking-[-0.015em] text-ink">{plan1.effect}</p>
          </Block>
        </div>

        <div className="flex flex-col justify-center gap-3">
          {CAROUSELS.map((c) => (
            <motion.div key={c.src} variants={fadeUp}>
              <Lightbox src={c.src} alt={c.alt} width={c.width} height={c.height} caption={c.alt} className="rounded-xl ring-1 ring-hair">
                <Image
                  src={c.src}
                  alt={c.alt}
                  width={c.width}
                  height={c.height}
                  sizes="800px"
                  quality={90}
                  className="block h-auto w-full"
                />
                {/* 이미지 오른쪽 아래 빈 칸(12번째 자리)에 이름표 */}
                <span className="pointer-events-none absolute bottom-[7%] right-[2.2%] flex w-[14.5%] flex-col items-center rounded-lg bg-navy px-1 py-2 text-center text-white shadow-md">
                  <span className="text-[12.5px] font-extrabold leading-tight">{c.line1}</span>
                  <span className="text-[12.5px] font-extrabold leading-tight">{c.line2}</span>
                  <span className="mt-1 rounded-full bg-white/15 px-1.5 text-[10px] font-semibold">카드 11장</span>
                </span>
              </Lightbox>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}
