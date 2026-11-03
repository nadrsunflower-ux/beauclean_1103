"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Maximize, Minimize } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { slides } from "@/components/slides";
import { pad2 } from "@/data/report2026";
import { DeckContext } from "./deck-context";
import { slideVariants } from "./motion";

/** 슬라이드는 1280×720(16:9) 캔버스에 그리고, 화면 크기에 맞춰 통째로 확대·축소한다. */
const W = 1280;
const H = 720;

type FullscreenDoc = Document & { webkitFullscreenElement?: Element | null; webkitExitFullscreen?: () => void };
type FullscreenEl = HTMLElement & { webkitRequestFullscreen?: () => void };

export function Deck() {
  const total = slides.length;
  const [pos, setPos] = useState({ index: 0, dir: 0 });
  const [scale, setScale] = useState<number | null>(null);
  const [isFull, setIsFull] = useState(false);
  const [hashReady, setHashReady] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const swipeX = useRef<number | null>(null);

  const go = useCallback(
    (target: number) =>
      setPos((cur) => {
        const index = Math.max(0, Math.min(total - 1, target));
        return index === cur.index ? cur : { index, dir: index > cur.index ? 1 : -1 };
      }),
    [total],
  );
  const next = useCallback(() => setPos((cur) => (cur.index >= total - 1 ? cur : { index: cur.index + 1, dir: 1 })), [total]);
  const prev = useCallback(() => setPos((cur) => (cur.index <= 0 ? cur : { index: cur.index - 1, dir: -1 })), []);

  const toggleFullscreen = useCallback(() => {
    const doc = document as FullscreenDoc;
    const el = document.documentElement as FullscreenEl;
    if (document.fullscreenElement || doc.webkitFullscreenElement) {
      if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
      else doc.webkitExitFullscreen?.();
    } else if (el.requestFullscreen) {
      el.requestFullscreen().catch(() => {});
    } else {
      el.webkitRequestFullscreen?.();
    }
  }, []);

  // 주소의 #번호 ↔ 현재 슬라이드 (첫 진입은 방향 없이 바로 그 장으로)
  useEffect(() => {
    const read = () => Number.parseInt(window.location.hash.slice(1), 10);
    const raf = requestAnimationFrame(() => {
      const n = read();
      if (Number.isFinite(n) && n >= 1 && n <= total) setPos({ index: n - 1, dir: 0 });
      setHashReady(true);
    });
    const onHash = () => {
      const m = read();
      if (Number.isFinite(m)) go(m - 1);
    };
    window.addEventListener("hashchange", onHash);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("hashchange", onHash);
    };
  }, [go, total]);

  useEffect(() => {
    if (!hashReady) return; // 첫 진입 때 주소의 번호를 읽기 전에는 덮어쓰지 않는다
    const hash = `#${pos.index + 1}`;
    if (window.location.hash !== hash) window.history.replaceState(null, "", hash);
  }, [pos.index, hashReady]);

  // 키보드: 문서 전체에 건다(포커스 위치와 상관없이 동작)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return;
      if (document.querySelector('[data-slot="dialog-content"]')) return; // 다이얼로그가 열려 있으면 이동하지 않음
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      const onButton = !!t?.closest("button, a, [role='button']");
      switch (e.key) {
        case "ArrowRight":
        case "PageDown":
          e.preventDefault();
          next();
          break;
        case " ":
          if (onButton) return; // 버튼 위의 스페이스는 버튼 클릭
          e.preventDefault();
          if (e.shiftKey) prev();
          else next();
          break;
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          prev();
          break;
        case "Home":
          e.preventDefault();
          go(0);
          break;
        case "End":
          e.preventDefault();
          go(total - 1);
          break;
        case "f":
        case "F":
          toggleFullscreen();
          break;
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [go, next, prev, toggleFullscreen, total]);

  // 화면 맞춤
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const fit = () => {
      const { width, height } = el.getBoundingClientRect();
      const pad = document.fullscreenElement ? 8 : 24;
      setScale(Math.max(0.2, Math.min((width - pad * 2) / W, (height - pad * 2) / H)));
    };
    const ro = new ResizeObserver(fit); // observe 직후 한 번 호출된다
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const onChange = () => setIsFull(Boolean(document.fullscreenElement || (document as FullscreenDoc).webkitFullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    document.addEventListener("webkitfullscreenchange", onChange);
    return () => {
      document.removeEventListener("fullscreenchange", onChange);
      document.removeEventListener("webkitfullscreenchange", onChange);
    };
  }, []);

  const current = slides[pos.index];
  const Current = current.Component;

  return (
    <MotionConfig reducedMotion="user">
      <DeckContext.Provider value={{ index: pos.index, total, go }}>
        <main className="flex h-dvh w-full flex-col bg-stage text-white">
          <div
            ref={viewportRef}
            className="relative min-h-0 flex-1 touch-pan-y"
            onPointerDown={(e) => {
              if (e.pointerType !== "mouse") swipeX.current = e.clientX;
            }}
            onPointerUp={(e) => {
              if (swipeX.current === null) return;
              const dx = e.clientX - swipeX.current;
              swipeX.current = null;
              if (Math.abs(dx) > 60) (dx < 0 ? next : prev)();
            }}
          >
            <div
              className={cn(
                "absolute left-1/2 top-1/2 transition-opacity duration-300",
                scale === null || !hashReady ? "opacity-0" : "opacity-100",
              )}
              style={{ width: W, height: H, transform: `translate(-50%, -50%) scale(${scale ?? 1})` }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-[14px] bg-white text-ink shadow-[0_30px_90px_rgba(0,0,0,0.5)]">
                <AnimatePresence mode="wait" custom={pos.dir}>
                  <motion.section
                    key={current.id}
                    custom={pos.dir}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    aria-roledescription="slide"
                    aria-label={`${pos.index + 1} / ${total} ${current.title}`}
                    className="absolute inset-0"
                  >
                    <Current />
                  </motion.section>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <nav aria-label="슬라이드 이동" className="flex h-14 shrink-0 items-center justify-between gap-4 px-6">
            <p className="w-64 truncate text-[12px] text-white/55">{current.title}</p>
            <div className="flex items-center">
              {slides.map((s, i) => (
                <Tooltip key={s.id}>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={() => go(i)}
                      aria-label={`${i + 1}. ${s.title}`}
                      aria-current={i === pos.index ? "step" : undefined}
                      className="group grid h-8 place-items-center px-1.5 outline-none"
                    >
                      <span
                        className={cn(
                          "block h-1.5 rounded-full transition-all duration-300 group-focus-visible:ring-2 group-focus-visible:ring-sky",
                          i === pos.index ? "w-7 bg-white" : "w-1.5 bg-white/30 group-hover:bg-white/70",
                        )}
                      />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="border border-white/10">
                    {i + 1}. {s.title}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
            <div className="flex w-64 items-center justify-end gap-1">
              <span className="mr-2 text-[12px] tabular-nums text-white/60">
                {pad2(pos.index + 1)} / {pad2(total)}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={prev}
                disabled={pos.index === 0}
                aria-label="이전 슬라이드"
                className="text-white hover:bg-white/10 hover:text-white"
              >
                <ChevronLeft className="size-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={next}
                disabled={pos.index === total - 1}
                aria-label="다음 슬라이드"
                className="text-white hover:bg-white/10 hover:text-white"
              >
                <ChevronRight className="size-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFullscreen}
                aria-label={isFull ? "전체 화면 끝내기" : "전체 화면 (F)"}
                className="text-white hover:bg-white/10 hover:text-white"
              >
                {isFull ? <Minimize className="size-4" /> : <Maximize className="size-4" />}
              </Button>
            </div>
          </nav>
        </main>
      </DeckContext.Provider>
    </MotionConfig>
  );
}
