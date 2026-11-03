"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { SlideFrame } from "@/components/deck/slide-frame";
import { CountUp } from "@/components/deck/count-up";
import { Em, StatTile, Swatch } from "@/components/deck/primitives";
import { fadeUp } from "@/components/deck/motion";
import {
  COLLECTED_LABEL,
  TYPE_LABEL,
  coverSrc,
  fmt,
  krDate,
  pad2,
  postStats,
  posts,
  recentReelStats,
  recentReels,
  reelStats,
  reels,
  shortDate,
  zeroLikePosts,
  type ContentItem,
  type ContentType,
} from "@/data/report2026";

function CoverCard({ item }: { item: ContentItem }) {
  return (
    <motion.article variants={fadeUp} className="flex min-w-0 flex-col">
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${item.title} 인스타그램 원본 보기`}
        className="group relative block aspect-[3/4] overflow-hidden rounded-xl bg-paper ring-1 ring-black/5 outline-none focus-visible:ring-2 focus-visible:ring-cobalt"
      >
        <Image
          src={coverSrc(item.no)}
          alt={`${item.title} 표지`}
          fill
          sizes="280px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute left-1.5 top-1.5 rounded-md bg-ink/65 px-1.5 py-0.5 text-[10.5px] font-semibold tabular-nums text-white backdrop-blur-sm">
          {shortDate(item.date)}
        </span>
      </a>
      <div className="mt-2 flex items-center gap-1.5 text-[10.5px] font-semibold tabular-nums text-steel">
        <Swatch type={item.type} className="size-2" />
        No.{pad2(item.no)}
      </div>
      <h3 className="mt-0.5 line-clamp-2 min-h-[36px] text-[13px] font-bold leading-[1.38] tracking-[-0.015em] text-ink">
        {item.title}
      </h3>
      <dl className="mt-2 grid grid-cols-2 gap-x-2 border-t border-hair pt-2">
        <div className="col-span-2">
          <dt className="text-[10.5px] font-medium text-steel">조회수</dt>
          <dd className="text-[21px] font-extrabold leading-tight tracking-[-0.02em] tabular-nums text-navy">
            {fmt(item.views)}
          </dd>
        </div>
        <div className="mt-1">
          <dt className="text-[10.5px] font-medium text-steel">좋아요</dt>
          <dd className="text-[14px] font-bold tabular-nums text-ink">{item.likes}</dd>
        </div>
        <div className="mt-1">
          <dt className="text-[10.5px] font-medium text-steel">댓글</dt>
          <dd className="text-[14px] font-bold tabular-nums text-ink">{item.comments}</dd>
        </div>
      </dl>
    </motion.article>
  );
}

function ViewsCardsSlide({ type }: { type: ContentType }) {
  const items = type === "reel" ? reels : posts;
  const stats = type === "reel" ? reelStats : postStats;
  const label = TYPE_LABEL[type];
  const first = items[items.length - 1].date;
  const last = items[0].date;

  const tiles =
    type === "reel"
      ? [
          {
            label: `릴스 ${stats.count}편 조회수 합계`,
            value: <CountUp value={stats.views} />,
            unit: "회",
            sub: (
              <>
                중앙값 {fmt(Math.round(stats.medianViews))}회 · <Em>평균 {fmt(Math.round(stats.avgViews))}회</Em>
              </>
            ),
          },
          {
            label: `최근 릴스 ${recentReels.length}편 평균 조회수`,
            value: <CountUp value={Math.round(recentReelStats.avgViews)} />,
            unit: "회",
            sub: `${krDate(recentReels[recentReels.length - 1].date)} ~ ${krDate(recentReels[0].date)} · 최고 ${fmt(recentReelStats.top.views)}회(${recentReelStats.top.title})`,
          },
          {
            label: "좋아요 · 댓글 합계",
            value: `${stats.likes} · ${stats.comments}`,
            unit: "개",
            sub: (
              <Em>
                1편당 평균 좋아요 {(stats.likes / stats.count).toFixed(1)}개 · 댓글 {(stats.comments / stats.count).toFixed(1)}개
              </Em>
            ),
          },
        ]
      : [
          {
            label: `일반 게시물 ${stats.count}편 조회수 합계`,
            value: <CountUp value={stats.views} />,
            unit: "회",
            sub: (
              <>
                중앙값 {fmt(Math.round(stats.medianViews))}회 · <Em>평균 {fmt(Math.round(stats.avgViews))}회</Em>
              </>
            ),
          },
          {
            label: "일반 게시물 조회수 최고",
            value: <CountUp value={stats.top.views} />,
            unit: "회",
            sub: `${stats.top.title} (${krDate(stats.top.date)})`,
          },
          {
            label: "좋아요 0개",
            value: zeroLikePosts.length,
            unit: "편",
            sub: `${krDate(zeroLikePosts[zeroLikePosts.length - 1].date)}~${krDate(zeroLikePosts[0].date).replace(/^\d+월 /, "")}에 올린 ${zeroLikePosts.length}편 모두 좋아요 0개`,
          },
        ];

  return (
    <SlideFrame
      sectionNo="01"
      section="기존 현황 분석"
      title={`조회수 ${type === "reel" ? "①" : "②"} ${label} ${items.length}편`}
      subtitle={`2026년 ${krDate(first)} ~ ${krDate(last)} 게시 · 최신순 · 조회수는 본인 계정 전체 인사이트 기준(${COLLECTED_LABEL} 수집)`}
      aside={
        <div className="flex items-center gap-2 rounded-full border border-hair bg-paper px-3.5 py-1.5 text-[12.5px] text-steel">
          <Swatch type={type} />
          표지를 누르면 인스타그램 원본으로 이동
        </div>
      }
    >
      <div className="flex h-full flex-col gap-4">
        <div className="grid grid-cols-8 gap-3">
          {items.map((item) => (
            <CoverCard key={item.no} item={item} />
          ))}
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-3 gap-3">
          {tiles.map((t) => (
            <StatTile key={t.label} label={t.label} value={t.value} unit={t.unit} sub={t.sub} />
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}

export function ReelsViewsSlide() {
  return <ViewsCardsSlide type="reel" />;
}

export function PostsViewsSlide() {
  return <ViewsCardsSlide type="post" />;
}
