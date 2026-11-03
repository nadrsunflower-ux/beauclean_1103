"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, Link2, Megaphone, ShoppingBag, Target, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { plan3 } from "@/data/plan";
import { fadeUp } from "./motion";
import { Lines, Tag } from "./primitives";

type Variant = "slide" | "dialog";

/** IMG_1992.jpg — 조회수가 높았던 릴스 화면 (원본 보고서 29번 '피부과 수건 소개', 약 4.4만 회) */
export function BoostedReelFigure({ variant = "slide", className }: { variant?: Variant; className?: string }) {
  return (
    <motion.figure variants={fadeUp} className={cn("flex flex-col items-center", className)}>
      <div className="rounded-[26px] bg-ink p-[7px] shadow-[0_18px_40px_rgba(19,27,46,0.28)]">
        <div className="relative overflow-hidden rounded-[20px]">
          <Image
            src="/plan/boosted-reel.jpg"
            alt="조회수 약 4.4만 회를 기록한 뷰클린 릴스 화면"
            width={378}
            height={667}
            sizes={variant === "slide" ? "330px" : "240px"}
            className={cn("block h-auto", variant === "slide" ? "w-[218px]" : "w-[200px]")}
          />
        </div>
      </div>
      <figcaption className="mt-3 text-center text-[12px] leading-snug text-steel">
        조회수 약 4.4만 회 릴스
        <br />
        <b className="font-semibold text-ink">‘피부과 수건 소개’</b> (2023.11.15)
      </figcaption>
    </motion.figure>
  );
}

function Cell({ children, variant }: { children: React.ReactNode; variant: Variant }) {
  return (
    <motion.div
      variants={fadeUp}
      className={cn(
        "flex flex-col rounded-2xl border border-hair bg-white",
        variant === "slide" ? "gap-3 p-4" : "gap-3 p-4",
      )}
    >
      {children}
    </motion.div>
  );
}

function Body({ children, variant }: { children: React.ReactNode; variant: Variant }) {
  return (
    <p className={cn("leading-[1.6] text-steel", variant === "slide" ? "text-[13px]" : "text-[14px]")}>{children}</p>
  );
}

/** 운영 계획 3의 본문: 현황 · 계획 · 기대 효과 · 검토 지점 · 제안 사항 (슬라이드와 검토 사항 다이얼로그가 같이 쓴다) */
export function AdPlanBody({ variant = "slide" }: { variant?: Variant }) {
  const { cost } = plan3;
  return (
    <div className="flex flex-col gap-3">
      <motion.div
        variants={fadeUp}
        className="flex items-center gap-3 rounded-2xl bg-paper px-4 py-3.5 ring-1 ring-hair"
      >
        <Tag tone="status">현황</Tag>
        <p className={cn("font-semibold text-ink", variant === "slide" ? "text-[15px]" : "text-[15px]")}>
          {plan3.statusBefore}{" "}
          <span className="mx-0.5 inline-flex items-center gap-1 rounded-md bg-ice px-1.5 py-0.5 font-bold text-cobalt ring-1 ring-cobalt/20">
            <Megaphone className="size-3.5" />[{plan3.statusTag}]
          </span>
          {plan3.statusAfter}
        </p>
      </motion.div>

      <div className={cn("grid gap-3", variant === "slide" ? "grid-cols-2" : "md:grid-cols-2")}>
        {/* 계획 */}
        <Cell variant={variant}>
          <Tag tone="plan">계획</Tag>
          <div className="flex items-stretch gap-2">
            <div className="flex flex-1 flex-col justify-center rounded-xl border border-hair bg-paper px-3 py-2">
              <span className="text-[11px] font-bold text-cobalt">11월</span>
              <span className="text-[15px] font-extrabold text-navy">유입 증대</span>
            </div>
            <ArrowRight className="size-4 shrink-0 self-center text-steel" />
            <div className="flex flex-[1.45] flex-col justify-center rounded-xl bg-navy px-3 py-2 text-white">
              <span className="text-[11px] font-bold text-sky">12월부터</span>
              <span className="text-[15px] font-extrabold">META 광고</span>
              <span className="text-[11px] text-white/75">자사몰 · 스마트스토어 유입 확대</span>
            </div>
          </div>
          <Body variant={variant}>
            <Lines lines={plan3.plan} />
          </Body>
        </Cell>

        {/* 기대 효과 */}
        <Cell variant={variant}>
          <Tag tone="effect">기대 효과</Tag>
          <div className="flex items-stretch gap-1.5">
            {[
              { icon: Users, top: "팔로워 외", bottom: "알고리즘 노출" },
              { icon: Link2, top: "스마트스토어", bottom: "· 자사몰 링크" },
              { icon: ShoppingBag, top: "구입", bottom: "유도" },
            ].map((step, i, arr) => (
              <div key={step.top} className="flex flex-1 items-center gap-1.5">
                <div className="flex flex-1 items-center gap-2 rounded-xl border border-hair bg-paper px-2.5 py-2">
                  <step.icon className="size-4 shrink-0 text-cobalt" />
                  <span className="text-[11.5px] font-bold leading-tight text-navy">
                    {step.top}
                    <br />
                    {step.bottom}
                  </span>
                </div>
                {i < arr.length - 1 ? <ArrowRight className="size-3.5 shrink-0 text-steel" /> : null}
              </div>
            ))}
          </div>
          <Body variant={variant}>
            <Lines lines={plan3.effect} />
          </Body>
        </Cell>

        {/* 검토 지점 */}
        <Cell variant={variant}>
          <Tag tone="review">검토 지점</Tag>
          <div className="flex items-stretch gap-2 text-center">
            <div className="flex flex-1 flex-col justify-center rounded-xl border border-hair bg-paper py-2">
              <span className="text-[11px] font-semibold text-steel">스튜디오</span>
              <span className="text-[16px] font-extrabold text-navy">{cost.studio}만 원</span>
            </div>
            <span className="self-center text-[18px] font-bold text-steel">+</span>
            <div className="flex flex-1 flex-col justify-center rounded-xl border border-hair bg-paper py-2">
              <span className="text-[11px] font-semibold text-steel">집행비</span>
              <span className="text-[16px] font-extrabold text-navy">{cost.media}만 원</span>
            </div>
            <span className="self-center text-[18px] font-bold text-steel">=</span>
            <div className="flex flex-[1.2] flex-col justify-center rounded-xl bg-[#fff1e5] py-2 ring-1 ring-[#f3c9a6]">
              <span className="text-[11px] font-semibold text-[#a8501a]">월 약</span>
              <span className="text-[18px] font-extrabold text-[#8a3f12]">{cost.total}만 원</span>
            </div>
          </div>
          <Body variant={variant}>{plan3.review}</Body>
        </Cell>

        {/* 제안 사항 */}
        <Cell variant={variant}>
          <Tag tone="suggest">제안 사항</Tag>
          <div className="flex items-center gap-2">
            <span className="rounded-lg bg-navy px-2.5 py-2 text-[12px] font-bold text-white">12월 한 달</span>
            <div className="flex flex-1 items-center gap-1.5 rounded-xl border border-dashed border-cobalt/40 bg-ice/60 px-2 py-1.5">
              <Target className="size-4 shrink-0 text-cobalt" />
              <span className="rounded-md bg-white px-1.5 py-0.5 text-[11.5px] font-bold text-navy ring-1 ring-hair">
                타겟 A
              </span>
              <span className="rounded-md bg-white px-1.5 py-0.5 text-[11.5px] font-bold text-navy ring-1 ring-hair">
                타겟 B
              </span>
              <span className="text-[11px] font-semibold text-cobalt">2개 이상</span>
            </div>
            <ArrowRight className="size-3.5 shrink-0 text-steel" />
            <span className="text-[12px] font-bold leading-tight text-navy">
              유입 전환
              <br />
              비교
            </span>
          </div>
          <Body variant={variant}>
            <Lines lines={plan3.suggestion} />
          </Body>
        </Cell>
      </div>
    </div>
  );
}
