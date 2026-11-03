"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { pad2 } from "@/data/report2026";
import { useDeck } from "./deck-context";
import { fadeUp } from "./motion";

type SlideFrameProps = {
  sectionNo: string;
  section: string;
  title: ReactNode;
  subtitle?: ReactNode;
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
};

/** 1280×720 캔버스 공통 틀: 섹션 표시 · 제목 · 본문(1168×약 480) · 꼬리말 */
export function SlideFrame({ sectionNo, section, title, subtitle, aside, children, className }: SlideFrameProps) {
  const { index, total } = useDeck();
  return (
    <div className="flex h-full flex-col bg-white px-14 pb-6 pt-10 text-ink">
      <header className="flex items-end justify-between gap-8">
        <div className="min-w-0">
          <motion.p variants={fadeUp} className="flex items-center gap-2 text-[13px] font-semibold text-cobalt">
            <span className="rounded-md bg-ice px-2 py-[3px] text-[12px] font-bold tabular-nums">{sectionNo}</span>
            {section}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-2.5 text-[34px] font-extrabold leading-[1.2] tracking-[-0.03em] text-navy"
          >
            {title}
          </motion.h2>
          {subtitle ? (
            <motion.p variants={fadeUp} className="mt-1.5 text-[15px] text-steel">
              {subtitle}
            </motion.p>
          ) : null}
        </div>
        {aside ? (
          <motion.div variants={fadeUp} className="shrink-0 pb-1">
            {aside}
          </motion.div>
        ) : null}
      </header>
      <div data-slide-body className={cn("relative mt-6 min-h-0 flex-1", className)}>{children}</div>
      <footer className="mt-4 flex items-center justify-between border-t border-hair pt-3 text-[11px] text-steel">
        <span>
          <b className="font-bold tracking-[0.06em] text-navy">GL AI STUDIO</b>
          <span className="mx-1.5 text-hair">|</span>뷰클린 인스타그램 운영 기획안
        </span>
        <span className="tabular-nums">
          {pad2(index + 1)} / {pad2(total)}
        </span>
      </footer>
    </div>
  );
}
