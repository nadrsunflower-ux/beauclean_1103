"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { SlideFrame } from "@/components/deck/slide-frame";
import { CountUp } from "@/components/deck/count-up";
import { Legend, Lines, StatTile, Swatch } from "@/components/deck/primitives";
import { fadeUp, growY, labelAfter } from "@/components/deck/motion";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  SOURCE_LABEL,
  TYPE_LABEL,
  allStats,
  avgPerMonth,
  busiestMonth,
  emptyMonths,
  krDate,
  longestGap,
  monthly,
  postStats,
  reelStats,
  shortDate,
} from "@/data/report2026";

const PLOT_H = 226; // 막대 영역 높이
const CAP_ROOM = 28; // 막대 위 값 라벨 자리
const MAX = Math.max(...monthly.map((m) => m.total));
const UNIT = (PLOT_H - CAP_ROOM) / MAX;
const GAP = 2; // 쌓인 막대 사이 표면 간격

/** 2026년 1~10월 월별 게시 수: 릴스(아래) + 일반 게시물(위) 누적 막대 */
function MonthlyChart() {
  return (
    <div>
      <div className="relative" style={{ height: PLOT_H }}>
        <div className="absolute inset-x-0 bottom-0 h-px bg-[#c3cbd7]" />
        <div className="absolute inset-0 flex">
          {monthly.map((m, i) => {
            const label = `${m.month}월 ${m.total}편: 릴스 ${m.reel}편, 일반 게시물 ${m.post}편`;
            return (
              <Tooltip key={m.month}>
                <TooltipTrigger asChild>
                  <div
                    tabIndex={0}
                    aria-label={label}
                    className="group relative flex h-full flex-1 flex-col items-center justify-end rounded-t-lg outline-none transition-colors hover:bg-ice/70 focus-visible:bg-ice/70"
                  >
                    {m.total > 0 ? (
                      <>
                        <motion.span
                          variants={labelAfter}
                          custom={i}
                          className="mb-1.5 text-[14px] font-bold tabular-nums text-navy"
                        >
                          {m.total}
                        </motion.span>
                        <motion.div
                          variants={growY}
                          custom={i}
                          style={{ originY: 1 }}
                          className="flex w-6 flex-col-reverse"
                          aria-hidden
                        >
                          {m.reel > 0 ? (
                            <div
                              className={cn("bg-reel", m.post === 0 && "rounded-t-[4px]")}
                              style={{ height: m.reel * UNIT }}
                            />
                          ) : null}
                          {m.post > 0 ? (
                            <div
                              className="rounded-t-[4px] bg-post"
                              style={{
                                height: m.post * UNIT - (m.reel > 0 ? GAP : 0),
                                marginBottom: m.reel > 0 ? GAP : 0,
                              }}
                            />
                          ) : null}
                        </motion.div>
                      </>
                    ) : (
                      <motion.span
                        variants={labelAfter}
                        custom={i}
                        className="mb-1.5 text-[14px] font-medium tabular-nums text-[#a5aebb]"
                      >
                        0
                      </motion.span>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={6} className="max-w-[300px] flex-col items-start gap-1 px-3.5 py-2.5">
                  <div className="flex items-baseline gap-2">
                    <b className="text-[15px]">{m.total}편</b>
                    <span className="opacity-70">2026년 {m.month}월</span>
                  </div>
                  <div className="flex gap-3 opacity-90">
                    <span className="inline-flex items-center gap-1.5">
                      <i className="h-0.5 w-3 rounded bg-reel" />
                      릴스 {m.reel}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <i className="h-0.5 w-3 rounded bg-post" />
                      일반 게시물 {m.post}
                    </span>
                  </div>
                  {m.items.length ? (
                    <ul className="mt-1 border-t border-white/15 pt-1.5">
                      {m.items.map((c) => (
                        <li key={c.no} className="opacity-85">
                          {shortDate(c.date)} · {TYPE_LABEL[c.type]} · {c.title}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="opacity-70">게시 없음</span>
                  )}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>
      <div className="flex pt-2">
        {monthly.map((m) => (
          <span key={m.month} className="flex-1 text-center text-[12.5px] font-medium text-steel">
            {m.month}월
          </span>
        ))}
      </div>
    </div>
  );
}

/** 차트와 같은 값의 표 (도표) */
function MonthTable() {
  const rows = [
    { key: "reel" as const, label: "릴스", values: monthly.map((m) => m.reel), sum: reelStats.count },
    { key: "post" as const, label: "일반 게시물", values: monthly.map((m) => m.post), sum: postStats.count },
  ];
  return (
    <Table className="mt-3 table-fixed text-[12px]">
      <TableHeader>
        <TableRow className="border-hair bg-paper hover:bg-paper">
          <TableHead className="h-7 w-[92px] pl-2 text-[11.5px] font-semibold text-steel">구분</TableHead>
          {monthly.map((m) => (
            <TableHead key={m.month} className="h-7 px-0 text-center text-[11.5px] font-semibold text-steel">
              {m.month}월
            </TableHead>
          ))}
          <TableHead className="h-7 w-[52px] px-0 text-center text-[11.5px] font-bold text-navy">합계</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r) => (
          <TableRow key={r.key} className="border-hair hover:bg-transparent">
            <TableCell className="py-1 pl-2 font-medium text-steel">
              <span className="inline-flex items-center gap-1.5">
                <Swatch type={r.key} className="size-2" />
                {r.label}
              </span>
            </TableCell>
            {r.values.map((v, i) => (
              <TableCell
                key={i}
                className={cn("px-0 py-1 text-center tabular-nums", v === 0 ? "text-[#b3bbc7]" : "font-semibold text-ink")}
              >
                {v}
              </TableCell>
            ))}
            <TableCell className="px-0 py-1 text-center font-bold tabular-nums text-navy">{r.sum}</TableCell>
          </TableRow>
        ))}
        <TableRow className="border-0 bg-paper hover:bg-paper">
          <TableCell className="py-1 pl-2 font-bold text-navy">합계</TableCell>
          {monthly.map((m) => (
            <TableCell
              key={m.month}
              className={cn("px-0 py-1 text-center tabular-nums", m.total === 0 ? "text-[#b3bbc7]" : "font-bold text-navy")}
            >
              {m.total}
            </TableCell>
          ))}
          <TableCell className="px-0 py-1 text-center font-extrabold tabular-nums text-navy">{allStats.count}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export function UploadCycleSlide() {
  const second = [...monthly].sort((a, b) => b.total - a.total)[1];
  return (
    <SlideFrame
      sectionNo="01"
      section="기존 현황 분석"
      title="업로드 주기"
      subtitle={`2026년 1~10월에 올린 ${allStats.count}편(릴스 ${reelStats.count} · 일반 게시물 ${postStats.count}) · 출처: ${SOURCE_LABEL}`}
    >
      <div className="grid h-full grid-cols-[1fr_350px] gap-6">
        <motion.div variants={fadeUp} className="flex flex-col rounded-2xl border border-hair px-5 pb-3 pt-4">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-[15px] font-bold text-navy">
              월별 게시 수 <span className="ml-1 text-[12px] font-medium text-steel">단위: 편 · 막대에 마우스를 올리면 게시물 목록</span>
            </h3>
            <Legend />
          </div>
          <MonthlyChart />
          <MonthTable />
        </motion.div>

        <div className="flex flex-col gap-2.5">
          <StatTile
            label="월 평균 업로드"
            value={<CountUp value={avgPerMonth} decimals={1} />}
            unit="편"
            sub={`10개월 동안 ${allStats.count}편 · ${busiestMonth.month}월(${busiestMonth.total}편)과 ${second.month}월(${second.total}편)에 몰림`}
          />
          <StatTile
            label="가장 긴 업로드 공백"
            value={<CountUp value={longestGap.days} />}
            unit="일"
            sub={`${krDate(longestGap.from)} → ${krDate(longestGap.to)} 사이 새 콘텐츠 없음`}
          />
          <StatTile
            label="업로드가 없었던 달"
            value={emptyMonths.map((m) => `${m}월`).join(" · ")}
          />
          <motion.div variants={fadeUp} className="flex flex-1 flex-col justify-center rounded-2xl bg-navy px-5 py-3.5 text-white">
            <p className="text-[12px] font-bold tracking-[0.04em] text-sky">핵심</p>
            <p className="mt-1 text-[15.5px] font-bold leading-snug">
              <Lines lines={["몰리는 달과 비는 달이 반복되어", "일정한 업로드 주기가 없습니다."]} />
            </p>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-white/75">
              <Lines lines={["3~6월은 일반 게시물만, 9~10월은 릴스만 올라와", "형식도 한쪽으로 쏠렸습니다."]} />
            </p>
          </motion.div>
        </div>
      </div>
    </SlideFrame>
  );
}
