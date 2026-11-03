"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";
import { fadeUp } from "@/components/deck/motion";

const cardIn = (rotate: number, delay: number): Variants => ({
  enter: { opacity: 0, y: 70, rotate: 0, scale: 0.9 },
  center: {
    opacity: 1,
    y: 0,
    rotate,
    scale: 1,
    transition: { type: "spring", stiffness: 110, damping: 17, delay },
  },
});

const chipIn = (delay: number): Variants => ({
  enter: { opacity: 0, y: 10 },
  center: { opacity: 1, y: 0, transition: { duration: 0.45, delay } },
});

const AGENDA = ["기존 현황 분석", "운영 계획", "요약 정리", "검토 사항"];

export function CoverSlide() {
  return (
    <div className="relative h-full overflow-hidden bg-navy-deep text-white">
      {/* 배경 */}
      <div aria-hidden className="absolute -right-56 -top-64 size-[720px] rounded-full bg-cobalt/50 blur-[130px]" />
      <div aria-hidden className="absolute -bottom-72 left-[28%] size-[560px] rounded-full bg-[#3b74e0]/25 blur-[120px]" />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:48px_48px]"
      />

      <motion.div variants={fadeUp} className="absolute left-16 top-14 flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-lg bg-white text-[13px] font-black tracking-tight text-navy-deep">
          GL
        </span>
        <span className="text-[15px] font-bold tracking-[0.22em] text-white/90">GL AI STUDIO</span>
      </motion.div>

      <div className="absolute left-16 top-[160px] w-[600px]">
        <motion.p variants={fadeUp} className="text-[13px] font-semibold tracking-[0.24em] text-sky/90">
          INSTAGRAM OPERATION PLAN
        </motion.p>
        <motion.h1 variants={fadeUp} className="mt-5 text-[66px] font-extrabold leading-[1.12] tracking-[-0.045em]">
          <span className="text-sky">뷰클린</span>
          <br />
          인스타그램
          <br />
          운영 기획안
        </motion.h1>
        <motion.p variants={fadeUp} className="mt-6 text-[17px] leading-relaxed text-white/75">
          기존 현황 분석부터 11~12월 운영 계획과 검토 사항까지 정리했습니다.
        </motion.p>
      </div>

      <motion.ol variants={fadeUp} className="absolute bottom-[76px] left-16 flex gap-2">
        {AGENDA.map((item, i) => (
          <li
            key={item}
            className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[12.5px] text-white/85"
          >
            <b className="tabular-nums text-sky">0{i + 1}</b>
            {item}
          </li>
        ))}
      </motion.ol>
      <motion.p variants={fadeUp} className="absolute bottom-9 left-16 text-[12px] tracking-[0.08em] text-white/50">
        2026. 11 · BEAUCLEAN × GL AI STUDIO
      </motion.p>

      {/* 오른쪽: 11월에 올릴 두 축(캐러셀 카드뉴스 · 절레동화) 미리보기 */}
      <div className="absolute right-[70px] top-[86px] h-[560px] w-[500px]">
        <motion.div
          variants={cardIn(-9, 0.35)}
          className="absolute left-0 top-[92px] w-[222px] overflow-hidden rounded-2xl shadow-[0_24px_50px_rgba(0,0,0,0.45)] ring-1 ring-white/15"
        >
          <Image
            src="/plan/women-01.png"
            alt="여성용 위생팬티 캐러셀 카드뉴스 첫 장"
            width={1080}
            height={1350}
            sizes="340px"
            className="block h-auto w-full"
          />
        </motion.div>
        <motion.div
          variants={cardIn(9, 0.45)}
          className="absolute right-0 top-[92px] w-[222px] overflow-hidden rounded-2xl shadow-[0_24px_50px_rgba(0,0,0,0.45)] ring-1 ring-white/15"
        >
          <Image
            src="/plan/men-01.png"
            alt="남성용 위생팬티 캐러셀 카드뉴스 첫 장"
            width={1080}
            height={1350}
            sizes="340px"
            className="block h-auto w-full"
          />
        </motion.div>
        <motion.div
          variants={cardIn(0, 0.58)}
          className="absolute left-[132px] top-0 z-10 w-[236px] overflow-hidden rounded-[22px] shadow-[0_30px_60px_rgba(0,0,0,0.55)] ring-2 ring-white/25"
        >
          <div className="relative aspect-[66/100]">
            <Image
              src="/plan/jeolle-1.png"
              alt="절레동화 선녀와 나무꾼 1화 장면"
              fill
              sizes="360px"
              className="object-cover object-top"
            />
          </div>
        </motion.div>
        <motion.span
          variants={chipIn(0.9)}
          className="absolute left-2 top-[436px] rounded-full bg-white px-3.5 py-1.5 text-[12.5px] font-bold text-navy shadow-lg"
        >
          제품군 캐러셀 카드뉴스
        </motion.span>
        <motion.span
          variants={chipIn(1.0)}
          className="absolute right-2 top-[436px] rounded-full bg-sky px-3.5 py-1.5 text-[12.5px] font-bold text-navy-deep shadow-lg"
        >
          ‘절레동화’ 시리즈
        </motion.span>
      </div>
    </div>
  );
}
