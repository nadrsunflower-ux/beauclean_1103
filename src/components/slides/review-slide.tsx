"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "motion/react";
import { Eye, Gift, Percent, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SlideFrame } from "@/components/deck/slide-frame";
import { AdPlanBody, BoostedReelFigure } from "@/components/deck/ad-plan";
import { Lines } from "@/components/deck/primitives";
import { fadeUp } from "@/components/deck/motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PRODUCT_LINES, REVIEWS, plan3 } from "@/data/plan";

function ReviewCard({
  no,
  title,
  ask,
  children,
  highlight = false,
}: {
  no: string;
  title: string;
  ask: ReactNode;
  children: ReactNode;
  highlight?: boolean;
}) {
  return (
    <motion.article
      variants={fadeUp}
      className={cn(
        "flex h-full flex-col rounded-2xl border bg-white p-5",
        highlight ? "border-navy shadow-[0_14px_34px_rgba(35,56,98,0.16)] ring-1 ring-navy" : "border-hair",
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-[34px] font-extrabold leading-none tracking-[-0.04em] text-cobalt tabular-nums">{no}</span>
        <span className="rounded-full bg-ice px-2.5 py-1 text-[11.5px] font-bold text-cobalt">검토 {Number(no)}</span>
      </div>
      <h3 className="mt-3 text-[18px] font-extrabold leading-snug tracking-[-0.02em] text-navy">{title}</h3>
      <p className="mt-2 text-[14px] font-medium leading-[1.6] text-ink">{ask}</p>
      <div className="mt-4 flex flex-1 flex-col">{children}</div>
    </motion.article>
  );
}

const dialogStagger: Variants = {
  enter: {},
  center: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};

/** 검토 사항 3: 광고 계획(운영 계획 3)을 다시 확인하고 닫는 버튼 */
function AdPlanDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" className="h-11 w-full gap-2 rounded-xl text-[14px] font-bold">
          <Eye className="size-4" />
          광고 계획 다시 보기
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[92vh] gap-5 overflow-y-auto p-6 sm:max-w-[min(1240px,94vw)]">
        <DialogHeader>
          <p className="text-[12px] font-bold text-cobalt">검토 사항 3 관련 · 운영 계획 3</p>
          <DialogTitle className="text-[22px] font-extrabold tracking-[-0.02em] text-navy">
            {plan3.no}. {plan3.title}
          </DialogTitle>
          <DialogDescription className="text-[14px]">
            12월 META 광고 집행과 마케팅비 증액 여부를 판단하실 수 있도록 해당 내용을 다시 보여 드립니다.
          </DialogDescription>
        </DialogHeader>
        <motion.div
          variants={dialogStagger}
          initial="enter"
          animate="center"
          className="grid items-start gap-6 md:grid-cols-[210px_1fr]"
        >
          <BoostedReelFigure variant="dialog" />
          <AdPlanBody variant="dialog" />
        </motion.div>
        <DialogFooter className="-mx-6 -mb-6 px-6">
          <DialogClose asChild>
            <Button variant="outline" size="lg" className="h-10 gap-1.5 px-5 text-[14px] font-semibold">
              <X className="size-4" />
              닫기
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function ReviewSlide() {
  const { cost } = plan3;
  return (
    <SlideFrame sectionNo="04" section="검토 사항" title="확인이 필요한 3가지" subtitle="아래 내용을 확인해주시면 11월 업로드와 12월 광고를 준비하겠습니다.">
      <div className="grid h-full grid-cols-3 gap-5">
        <ReviewCard no="01" title="캐러셀 카드뉴스 5종 제품군" ask={REVIEWS.first.ask}>
          <p className="text-[12px] font-bold text-steel">예정</p>
          <ol className="mt-2 space-y-1.5">
            {PRODUCT_LINES.map((name, i) => (
              <li key={name} className="flex items-center gap-2.5 rounded-lg bg-paper px-3 py-1.5 ring-1 ring-hair">
                <span className="grid size-5 place-items-center rounded-full bg-cobalt text-[11px] font-bold text-white">{i + 1}</span>
                <span className="text-[13.5px] font-bold text-navy">{name}</span>
              </li>
            ))}
          </ol>
          <p className="mt-auto pt-3 text-[12.5px] leading-relaxed text-steel">{REVIEWS.first.note}</p>
        </ReviewCard>

        <ReviewCard no="02" title="11~12월 이벤트 여부" ask={<Lines lines={REVIEWS.second.ask} />}>
          <div className="grid flex-1 grid-cols-2 gap-2.5">
            {[
              { icon: Percent, label: "할인" },
              { icon: Gift, label: "증정" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center justify-center gap-2.5 rounded-xl bg-paper py-5 ring-1 ring-hair">
                <span className="grid size-14 place-items-center rounded-full bg-ice text-cobalt">
                  <Icon className="size-6" />
                </span>
                <span className="text-[16px] font-bold text-navy">{label}</span>
              </div>
            ))}
          </div>
          <p data-oneline className="whitespace-nowrap pt-3 text-[12px] leading-relaxed tracking-[-0.035em] text-steel">
            {REVIEWS.second.note}
          </p>
        </ReviewCard>

        <ReviewCard no="03" title="12월 META 광고 · 마케팅비 증액" ask={<Lines lines={REVIEWS.third.ask} />} highlight>
          <div className="rounded-xl bg-[#fff1e5] px-4 py-3 ring-1 ring-[#f3c9a6]">
            <p className="text-[12px] font-semibold text-[#a8501a]">추가 마케팅 비용</p>
            <p className="mt-0.5 text-[26px] font-extrabold leading-tight tracking-[-0.03em] text-[#8a3f12]">
              월 약 {cost.total}만 원
            </p>
            <p className="text-[12.5px] text-[#8a3f12]/80">
              스튜디오 {cost.studio}만 원 + 집행비 {cost.media}만 원
            </p>
          </div>
          <p className="mt-3 text-[12.5px] leading-relaxed text-steel">
            <Lines lines={REVIEWS.third.suggestion} />
          </p>
          <div className="mt-auto pt-3">
            <AdPlanDialog />
          </div>
        </ReviewCard>
      </div>
    </SlideFrame>
  );
}
