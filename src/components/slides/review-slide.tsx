"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { Gift, Percent } from "lucide-react";
import { SlideFrame } from "@/components/deck/slide-frame";
import { Lines } from "@/components/deck/primitives";
import { fadeUp } from "@/components/deck/motion";
import { PRODUCT_LINES, REVIEWS } from "@/data/plan";

function ReviewCard({ no, title, ask, children }: { no: string; title: string; ask: ReactNode; children: ReactNode }) {
  return (
    <motion.article variants={fadeUp} className="flex h-full flex-col rounded-2xl border border-hair bg-white p-6">
      <div className="flex items-center justify-between">
        <span className="text-[38px] font-extrabold leading-none tracking-[-0.04em] text-cobalt tabular-nums">{no}</span>
        <span className="rounded-full bg-ice px-2.5 py-1 text-[12px] font-bold text-cobalt">검토 {Number(no)}</span>
      </div>
      <h3 className="mt-3.5 text-[20px] font-extrabold leading-snug tracking-[-0.02em] text-navy">{title}</h3>
      <p className="mt-2 text-[15px] font-medium leading-[1.6] text-ink">{ask}</p>
      <div className="mt-5 flex flex-1 flex-col">{children}</div>
    </motion.article>
  );
}

export function ReviewSlide() {
  return (
    <SlideFrame
      sectionNo="04"
      section="검토 사항"
      title="확인이 필요한 2가지"
      subtitle="아래 내용을 확인해주시면 11월 업로드와 12월 광고를 준비하겠습니다."
    >
      <div className="grid h-full grid-cols-2 gap-6">
        <ReviewCard no="01" title="캐러셀 카드뉴스 5종 제품군" ask={REVIEWS.first.ask}>
          <p className="text-[12.5px] font-bold text-steel">예정</p>
          <ol className="mt-2 space-y-2">
            {PRODUCT_LINES.map((name, i) => (
              <li key={name} className="flex items-center gap-3 rounded-xl bg-paper px-4 py-2 ring-1 ring-hair">
                <span className="grid size-6 place-items-center rounded-full bg-cobalt text-[12px] font-bold text-white">{i + 1}</span>
                <span className="text-[15px] font-bold text-navy">{name}</span>
              </li>
            ))}
          </ol>
          <p className="mt-auto pt-4 text-[13px] leading-relaxed text-steel">{REVIEWS.first.note}</p>
        </ReviewCard>

        <ReviewCard no="02" title="11~12월 이벤트 여부" ask={<Lines lines={REVIEWS.second.ask} />}>
          <div className="grid flex-1 grid-cols-2 gap-3">
            {[
              { icon: Percent, label: "할인" },
              { icon: Gift, label: "증정" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center justify-center gap-3 rounded-xl bg-paper py-5 ring-1 ring-hair">
                <span className="grid size-16 place-items-center rounded-full bg-ice text-cobalt">
                  <Icon className="size-7" />
                </span>
                <span className="text-[17px] font-bold text-navy">{label}</span>
              </div>
            ))}
          </div>
          <p data-oneline className="whitespace-nowrap pt-4 text-[13px] leading-relaxed text-steel">
            {REVIEWS.second.note}
          </p>
        </ReviewCard>
      </div>
    </SlideFrame>
  );
}
