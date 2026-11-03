"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";
import { SlideFrame } from "@/components/deck/slide-frame";
import { Block, Lines } from "@/components/deck/primitives";
import { Lightbox } from "@/components/deck/lightbox";
import { EASE } from "@/components/deck/motion";
import { plan2 } from "@/data/plan";
import { coverSrc, fmt, krDate, recentReelStats, recentReels } from "@/data/report2026";

/** 절레동화 장면. 원본 아래쪽의 '사진 프레임' 표시는 비율(66:100)로 잘라 보이지 않게 한다. */
const FRAMES = [
  { src: "/plan/jeolle-1.png", width: 436, height: 756, title: "선녀와 나무꾼 1화", alt: "절레동화 선녀와 나무꾼 1화 장면" },
  { src: "/plan/jeolle-2.png", width: 392, height: 702, title: "선녀와 나무꾼 2화", alt: "절레동화 선녀와 나무꾼 2화 장면" },
  { src: "/plan/jeolle-3.png", width: 388, height: 704, title: "제품이 등장하는 장면", alt: "산신령·선녀·나무꾼이 뷰클린 제품을 든 절레동화 장면" },
];

const frameIn = (i: number): Variants => ({
  enter: { opacity: 0, y: 40, scale: 0.94 },
  center: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE, delay: 0.35 + i * 0.12 } },
});

export function PlanReelsSlide() {
  const likes = recentReels.map((r) => r.likes);
  return (
    <SlideFrame
      sectionNo="02"
      section="기존 현황 분석 및 운영 계획"
      title={`${plan2.no}. ${plan2.title}`}
      subtitle="11월 · 뷰클린 전용 전래동화 컨셉 시리즈 ‘절레동화’ 6편"
    >
      <div className="grid h-full grid-cols-[1fr_600px] gap-8">
        <div className="flex flex-col justify-center gap-7">
          <Block tone="status" label="현황">
            <p className="text-[13.5px] leading-relaxed text-steel">
              최근 릴스 {recentReels.length}편({krDate(recentReels[recentReels.length - 1].date)}~
              {krDate(recentReels[0].date)}) 평균 조회수{" "}
              <b className="font-bold text-ink">{fmt(Math.round(recentReelStats.avgViews))}회</b>, 좋아요{" "}
              <b className="font-bold text-ink">
                {Math.min(...likes)}~{Math.max(...likes)}개
              </b>
            </p>
            <div className="flex gap-2">
              {[...recentReels].reverse().map((r) => (
                <div key={r.no} className="flex w-[60px] flex-col items-center gap-1">
                  <span className="relative h-[80px] w-[60px] overflow-hidden rounded-md ring-1 ring-black/5">
                    <Image src={coverSrc(r.no)} alt={`${r.title} 표지`} fill sizes="120px" className="object-cover" />
                  </span>
                  <span className="text-[11.5px] font-bold tabular-nums text-navy">{fmt(r.views)}</span>
                </div>
              ))}
            </div>
          </Block>

          <Block tone="plan" label="계획">
            <p className="text-[18.5px] font-bold leading-[1.45] tracking-[-0.02em] text-navy">
              <Lines lines={plan2.plan} />
            </p>
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-paper px-3 py-1.5 text-[13px] font-bold text-navy ring-1 ring-hair">
              <span className="rounded-full bg-cobalt px-2 py-0.5 text-[11px] text-white">11월</span>
              ‘절레동화’ 6편 업로드
            </span>
          </Block>

          <Block tone="effect" label="기대 효과">
            <p className="text-[16px] font-semibold leading-[1.55] tracking-[-0.015em] text-ink">{plan2.effect}</p>
          </Block>
        </div>

        <div className="flex flex-col justify-center">
          <div className="grid grid-cols-3 gap-4">
            {FRAMES.map((f, i) => (
              <motion.figure key={f.src} variants={frameIn(i)} className="flex flex-col">
                <Lightbox
                  src={f.src}
                  alt={f.alt}
                  width={f.width}
                  height={f.height}
                  caption={`절레동화 · ${f.title}`}
                  className="rounded-[18px] shadow-[0_16px_34px_rgba(19,27,46,0.22)] ring-1 ring-black/10"
                >
                  <span className="relative block aspect-[66/100]">
                    <Image src={f.src} alt={f.alt} fill sizes="360px" quality={90} className="object-cover object-top" />
                  </span>
                </Lightbox>
                <figcaption className="mt-2.5 text-center">
                  <span className="block text-[11px] font-bold text-cobalt">절레동화</span>
                  <span className="block text-[13.5px] font-bold text-navy">{f.title}</span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}
