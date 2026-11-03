"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, Link2, Megaphone, ShoppingBag, Target, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { plan3 } from "@/data/plan";
import { fadeUp } from "./motion";
import { Lines, Tag } from "./primitives";

/** IMG_1992.jpg — 조회수가 높았던 릴스 화면 (원본 보고서 29번 '피부과 수건 소개', 약 4.4만 회) */
export function BoostedReelFigure({ className }: { className?: string }) {
  return (
    <motion.figure variants={fadeUp} className={cn("flex flex-col items-center", className)}>
      <div className="rounded-[26px] bg-ink p-[7px] shadow-[0_18px_40px_rgba(19,27,46,0.28)]">
        <div className="relative overflow-hidden rounded-[20px]">
          <Image
            src="/plan/boosted-reel.jpg"
            alt="조회수 약 4.4만 회를 기록한 뷰클린 릴스 화면"
            width={378}
            height={667}
            sizes="330px"
            className="block h-auto w-[218px]"
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

function Cell({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={fadeUp} className={cn("flex flex-col gap-3.5 rounded-2xl border border-hair bg-white p-5", className)}>
      {children}
    </motion.div>
  );
}

function Body({ children }: { children: ReactNode }) {
  return <p className="text-[14px] leading-[1.6] text-steel">{children}</p>;
}

/** 운영 계획 3의 본문: 현황 · 계획 · 기대 효과 · 제안 사항 */
export function AdPlanBody() {
  return (
    <div className="flex flex-col gap-3.5">
      <motion.div variants={fadeUp} className="flex items-center gap-3 rounded-2xl bg-paper px-5 py-4 ring-1 ring-hair">
        <Tag tone="status">현황</Tag>
        <p className="text-[15px] font-semibold text-ink">
          {plan3.statusBefore}{" "}
          <span className="mx-0.5 inline-flex items-center gap-1 rounded-md bg-ice px-1.5 py-0.5 font-bold text-cobalt ring-1 ring-cobalt/20">
            <Megaphone className="size-3.5" />[{plan3.statusTag}]
          </span>
          {plan3.statusAfter}
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-3.5">
        {/* 계획 */}
        <Cell>
          <Tag tone="plan">계획</Tag>
          <div className="flex items-stretch gap-2">
            <div className="flex flex-1 flex-col justify-center rounded-xl border border-hair bg-paper px-3 py-2.5">
              <span className="text-[11px] font-bold text-cobalt">11월</span>
              <span className="text-[16px] font-extrabold text-navy">유입 증대</span>
            </div>
            <ArrowRight className="size-4 shrink-0 self-center text-steel" />
            <div className="flex flex-[1.45] flex-col justify-center rounded-xl bg-navy px-3 py-2.5 text-white">
              <span className="text-[11px] font-bold text-sky">12월부터</span>
              <span className="text-[16px] font-extrabold">META 광고</span>
              <span className="text-[11px] text-white/75">자사몰 · 스마트스토어 유입 확대</span>
            </div>
          </div>
          <Body>
            <Lines lines={plan3.plan} />
          </Body>
        </Cell>

        {/* 기대 효과 */}
        <Cell>
          <Tag tone="effect">기대 효과</Tag>
          <div className="flex items-stretch gap-1.5">
            {[
              { icon: Users, top: "팔로워 외", bottom: "알고리즘 노출" },
              { icon: Link2, top: "스마트스토어", bottom: "· 자사몰 링크" },
              { icon: ShoppingBag, top: "구입", bottom: "유도" },
            ].map((step, i, arr) => (
              <div key={step.top} className="flex flex-1 items-center gap-1.5">
                <div className="flex flex-1 items-center gap-2 rounded-xl border border-hair bg-paper px-2.5 py-2.5">
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
          <Body>
            <Lines lines={plan3.effect} />
          </Body>
        </Cell>

        {/* 제안 사항: 전체 폭, 그림은 왼쪽 · 문장은 오른쪽 */}
        <Cell className="col-span-2">
          <Tag tone="suggest">제안 사항</Tag>
          <div className="grid grid-cols-2 items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="rounded-lg bg-navy px-2.5 py-2 text-[12.5px] font-bold text-white">12월 한 달</span>
              <div className="flex flex-1 items-center gap-1.5 rounded-xl border border-dashed border-cobalt/40 bg-ice/60 px-2.5 py-2">
                <Target className="size-4 shrink-0 text-cobalt" />
                <span className="rounded-md bg-white px-1.5 py-0.5 text-[12px] font-bold text-navy ring-1 ring-hair">
                  타겟 A
                </span>
                <span className="rounded-md bg-white px-1.5 py-0.5 text-[12px] font-bold text-navy ring-1 ring-hair">
                  타겟 B
                </span>
                <span className="text-[11.5px] font-semibold text-cobalt">2개 이상</span>
              </div>
              <ArrowRight className="size-3.5 shrink-0 text-steel" />
              <span className="text-[12.5px] font-bold leading-tight text-navy">
                유입 전환
                <br />
                비교
              </span>
            </div>
            <Body>
              <Lines lines={plan3.suggestion} />
            </Body>
          </div>
        </Cell>
      </div>
    </div>
  );
}
