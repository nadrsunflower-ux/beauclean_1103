"use client";

import { useEffect, useRef } from "react";
import { animate, useReducedMotion } from "motion/react";
import { fmt } from "@/data/report2026";
import { EASE } from "./motion";

type CountUpProps = {
  value: number;
  decimals?: number;
  delay?: number;
  duration?: number;
  className?: string;
};

/** 슬라이드가 열릴 때 0에서 목표값까지 올라가는 숫자. 서버 렌더와 동작 줄이기 설정에서는 최종값만 보인다. */
export function CountUp({ value, decimals = 0, delay = 0.3, duration = 1.1, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    el.style.fontVariantNumeric = "tabular-nums";
    el.textContent = fmt(0, decimals);
    const controls = animate(0, value, {
      delay,
      duration,
      ease: EASE,
      onUpdate: (v) => {
        el.textContent = fmt(v, decimals);
      },
      onComplete: () => {
        el.textContent = fmt(value, decimals);
        el.style.fontVariantNumeric = "";
      },
    });
    return () => controls.stop();
  }, [value, decimals, delay, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {fmt(value, decimals)}
    </span>
  );
}
