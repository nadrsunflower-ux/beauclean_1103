"use client";

import type { ComponentType, ReactNode } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { CalendarHeart, Clapperboard, LayoutGrid, Megaphone } from "lucide-react";
import { cn } from "@/lib/utils";
import { SlideFrame } from "@/components/deck/slide-frame";
import { fadeUp, growX, labelAfter } from "@/components/deck/motion";
import { Badge } from "@/components/ui/badge";
import { PRODUCT_LINES, SUMMARY } from "@/data/plan";
import { avgPerMonth, busiestMonth, fmt } from "@/data/report2026";

function Item({
  icon: Icon,
  tag,
  children,
}: {
  icon: ComponentType<{ className?: string }>;
  tag?: "예정" | "선택";
  children: ReactNode;
}) {
  return (
    <li className="flex gap-3">
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-ice text-cobalt">
        <Icon className="size-[18px]" />
      </span>
      <div className="min-w-0 flex-1 pt-0.5">
        {tag ? (
          <Badge
            variant={tag === "예정" ? "secondary" : "outline"}
            className={cn(
              "mb-1 h-5 px-2 text-[11px] font-bold",
              tag === "예정" ? "bg-ice text-cobalt" : "border-dashed border-steel/50 text-steel",
            )}
          >
            {tag}
          </Badge>
        ) : null}
        {children}
      </div>
    </li>
  );
}

const PREVIEWS = [
  { src: "/plan/women-01.png", alt: "여성용 위생팬티 캐러셀 카드뉴스 첫 장" },
  { src: "/plan/men-01.png", alt: "남성용 위생팬티 캐러셀 카드뉴스 첫 장" },
  { src: "/plan/jeolle-1.png", alt: "절레동화 선녀와 나무꾼 1화 장면" },
  { src: "/plan/jeolle-2.png", alt: "절레동화 선녀와 나무꾼 2화 장면" },
];

const nov = SUMMARY.nov.carousel.count + SUMMARY.nov.fairytale.count; // 캐러셀 6 + 절레동화 6 = 12편
const dec = SUMMARY.dec[0].count; // 8편

const GROUPS = [
  {
    title: "2026년 실적",
    plan: false,
    bars: [
      { label: "1~10월 월평균", value: avgPerMonth },
      { label: `${busiestMonth.month}월 (가장 많이 올린 달)`, value: busiestMonth.total },
    ],
  },
  {
    title: "11~12월 계획",
    plan: true,
    bars: [
      { label: "11월", value: nov },
      { label: "12월", value: dec },
    ],
  },
];
const BAR_MAX = Math.max(...GROUPS.flatMap((g) => g.bars.map((b) => b.value)));

/** 월 업로드 수: 실적(회색) vs 계획(코발트). 막대 끝에 값을 바로 적는다. */
function UploadCompare() {
  return (
    <motion.div variants={fadeUp} className="flex h-full flex-col rounded-2xl border border-hair px-5 py-4">
      <div className="flex items-center justify-between">
        <h3 className="text-[15px] font-bold text-navy">월 업로드 수</h3>
        <div className="flex items-center gap-3 text-[11.5px] font-medium text-steel">
          <span className="inline-flex items-center gap-1.5">
            <i className="size-2.5 rounded-[3px] bg-actual" />
            실적
          </span>
          <span className="inline-flex items-center gap-1.5">
            <i className="size-2.5 rounded-[3px] bg-cobalt" />
            계획
          </span>
        </div>
      </div>
      <div className="mt-2 flex flex-1 flex-col justify-evenly">
        {GROUPS.map((g, gi) => (
          <div key={g.title} className={cn("flex flex-col gap-5", gi > 0 && "border-t border-hair pt-6")}>
            <p className={cn("text-[12px] font-bold tracking-[0.02em]", g.plan ? "text-cobalt" : "text-steel")}>
              {g.title}
            </p>
            {g.bars.map((b, i) => {
              const order = gi * 2 + i + 2;
              return (
                <div key={b.label}>
                  <p className={cn("mb-2 text-[13.5px] font-semibold", g.plan ? "text-navy" : "text-steel")}>
                    {b.label}
                  </p>
                  <div className="flex items-center gap-2.5">
                    <div className="relative h-5 flex-1">
                      <motion.span
                        variants={growX}
                        custom={order}
                        style={{ originX: 0, width: `${(b.value / BAR_MAX) * 100}%` }}
                        className={cn("absolute inset-y-0 left-0 rounded-r-[4px]", g.plan ? "bg-cobalt" : "bg-actual")}
                      />
                    </div>
                    <motion.span
                      variants={labelAfter}
                      custom={order}
                      className={cn(
                        "w-[52px] text-right text-[18px] font-extrabold tabular-nums",
                        g.plan ? "text-navy" : "text-steel",
                      )}
                    >
                      {fmt(b.value, Number.isInteger(b.value) ? 0 : 1)}편
                    </motion.span>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function SummarySlide() {
  return (
    <SlideFrame sectionNo="03" section="요약 정리" title="11~12월 운영 계획" subtitle="달마다 올릴 콘텐츠와 광고 일정">
      <div className="grid h-full grid-cols-[1fr_1fr_320px] gap-5">
        {/* 11월 */}
        <motion.section variants={fadeUp} className="flex flex-col overflow-hidden rounded-2xl border border-hair">
          <header className="flex items-end justify-between bg-navy px-5 py-4 text-white">
            <div>
              <p className="text-[11px] font-bold tracking-[0.14em] text-sky">NOVEMBER</p>
              <p className="text-[30px] font-extrabold leading-none tracking-[-0.03em]">11월</p>
            </div>
            <p className="text-right text-[12px] text-white/70">
              업로드
              <span className="ml-1 text-[26px] font-extrabold leading-none text-white">{nov}</span>편
            </p>
          </header>
          <ul className="flex flex-col gap-5 px-5 py-5">
            <Item icon={LayoutGrid}>
              <p className="text-[15px] font-bold leading-snug text-ink">{SUMMARY.nov.carousel.text}</p>
              <ol className="mt-2.5 flex flex-wrap gap-1.5">
                {PRODUCT_LINES.map((name, i) => (
                  <li
                    key={name}
                    className="inline-flex items-center gap-1 rounded-full bg-paper px-2 py-0.5 text-[12px] font-semibold text-navy ring-1 ring-hair"
                  >
                    <b className="text-cobalt">{i + 1}</b>
                    {name}
                  </li>
                ))}
              </ol>
            </Item>
            <Item icon={Clapperboard}>
              <p className="text-[15px] font-bold leading-snug text-ink">{SUMMARY.nov.fairytale.text}</p>
              <p className="mt-1 text-[12.5px] text-steel">전래동화 컨셉의 시리즈 콘텐츠로 계정 유입 활성화</p>
            </Item>
          </ul>
          <div className="mt-auto border-t border-hair px-5 pb-5 pt-3.5">
            <p className="text-[11.5px] font-semibold text-steel">미리보기 · 캐러셀 카드뉴스 / 절레동화</p>
            <div className="mt-2 grid grid-cols-4 gap-2.5">
              {PREVIEWS.map((p) => (
                <span key={p.src} className="relative aspect-[3/4] overflow-hidden rounded-lg ring-1 ring-black/5">
                  <Image src={p.src} alt={p.alt} fill sizes="170px" className="object-cover object-top" />
                </span>
              ))}
            </div>
          </div>
        </motion.section>

        {/* 12월 */}
        <motion.section variants={fadeUp} className="flex flex-col overflow-hidden rounded-2xl border border-hair">
          <header className="flex items-end justify-between bg-cobalt px-5 py-4 text-white">
            <div>
              <p className="text-[11px] font-bold tracking-[0.14em] text-white/70">DECEMBER</p>
              <p className="text-[30px] font-extrabold leading-none tracking-[-0.03em]">12월</p>
            </div>
            <p className="text-right text-[12px] text-white/75">
              업로드
              <span className="ml-1 text-[26px] font-extrabold leading-none text-white">{dec}</span>편
              <span className="ml-1 font-bold text-white">+ META 광고</span>
            </p>
          </header>
          <ul className="flex flex-1 flex-col justify-evenly divide-y divide-hair px-5 py-2 [&>li]:py-5">
            <Item icon={Clapperboard} tag={SUMMARY.dec[0].tag}>
              <p className="text-[15px] font-bold leading-snug text-ink">{SUMMARY.dec[0].text}</p>
            </Item>
            <Item icon={Megaphone} tag={SUMMARY.dec[1].tag}>
              <p data-oneline className="whitespace-nowrap text-[15px] font-bold leading-snug tracking-[-0.01em] text-ink">
                {SUMMARY.dec[1].text}
              </p>
            </Item>
            <Item icon={CalendarHeart} tag={SUMMARY.dec[2].tag}>
              <p className="text-[15px] font-bold leading-snug text-ink">{SUMMARY.dec[2].text}</p>
            </Item>
          </ul>
        </motion.section>

        <UploadCompare />
      </div>
    </SlideFrame>
  );
}
