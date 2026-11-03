"use client";

import { Fragment, type ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { ContentType } from "@/data/report2026";
import { fadeUp } from "./motion";

/** 지정한 위치에서만 줄을 바꾼다. data-lines 는 검사 스크립트가 실제 줄 수와 비교하는 값. */
export function Lines({ lines }: { lines: readonly string[] }) {
  return (
    <span data-lines={lines.length}>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {i > 0 ? <br /> : null}
          {line}
        </Fragment>
      ))}
    </span>
  );
}

/** 강조 처리: 진하게 + 브랜드 블루 + 옅은 바탕 */
export function Em({ children }: { children: ReactNode }) {
  return (
    <mark className="rounded-[5px] bg-ice px-1.5 py-0.5 text-[13.5px] font-extrabold text-cobalt">{children}</mark>
  );
}

/** 데이터 정체성 표시(릴스/일반 게시물). 글자는 색을 입지 않고, 옆의 사각형만 색을 가진다. */
export function Swatch({ type, className }: { type: ContentType; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("inline-block size-2.5 shrink-0 rounded-[3px]", type === "reel" ? "bg-reel" : "bg-post", className)}
    />
  );
}

export function Legend({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-4 text-[12.5px] font-medium text-steel", className)}>
      <span className="inline-flex items-center gap-1.5">
        <Swatch type="reel" />
        릴스
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Swatch type="post" />
        일반 게시물
      </span>
    </div>
  );
}

const TAG_TONES = {
  status: "bg-[#eef0f4] text-steel",
  plan: "bg-cobalt text-white",
  effect: "bg-ice text-cobalt",
  review: "bg-[#fff1e5] text-[#a8501a]",
  suggest: "bg-navy text-white",
} as const;

export type TagTone = keyof typeof TAG_TONES;

export function Tag({ tone, children, className }: { tone: TagTone; children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-6 shrink-0 items-center self-start rounded-full px-2.5 text-[12px] font-bold tracking-[-0.01em]",
        TAG_TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** 현황 · 계획 · 기대 효과 같은 블록 하나 */
export function Block({
  tone,
  label,
  children,
  className,
}: {
  tone: TagTone;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={fadeUp} className={cn("flex flex-col gap-2.5", className)}>
      <Tag tone={tone}>{label}</Tag>
      {children}
    </motion.div>
  );
}

export function StatTile({
  label,
  value,
  unit,
  sub,
  className,
  dark = false,
}: {
  label: ReactNode;
  value: ReactNode;
  unit?: string;
  sub?: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className={cn(
        "rounded-2xl border px-5 py-3.5",
        dark ? "border-navy bg-navy text-white" : "border-hair bg-white",
        className,
      )}
    >
      <div className={cn("text-[13px] font-semibold", dark ? "text-white/70" : "text-steel")}>{label}</div>
      <div className={cn("mt-1.5 flex items-baseline gap-1", dark ? "text-white" : "text-navy")}>
        <span className="text-[30px] font-extrabold leading-none tracking-[-0.03em]">{value}</span>
        {unit ? <span className={cn("text-[15px] font-bold", dark ? "text-white/70" : "text-steel")}>{unit}</span> : null}
      </div>
      {sub ? (
        <div className={cn("mt-1.5 text-[12.5px] leading-snug", dark ? "text-white/75" : "text-steel")}>{sub}</div>
      ) : null}
    </motion.div>
  );
}
