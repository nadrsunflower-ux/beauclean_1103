import type { Variants } from "motion/react";

/** 모든 슬라이드가 같은 이징을 쓴다. */
export const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * 슬라이드 전환. 자식 요소는 같은 이름(enter → center)의 variants 를 물려받아
 * staggerChildren 순서대로 올라온다.
 */
export const slideVariants: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 56 }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: EASE, staggerChildren: 0.05, delayChildren: 0.06 },
  },
  exit: (dir: number) => ({ opacity: 0, x: dir * -56, transition: { duration: 0.2, ease: "easeIn" } }),
};

export const fadeUp: Variants = {
  enter: { opacity: 0, y: 16 },
  center: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export const fadeIn: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

export const popIn: Variants = {
  enter: { opacity: 0, scale: 0.94, y: 14 },
  center: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 240, damping: 24 } },
};

/** 세로 막대: 기준선에서 자란다 (style={{ originY: 1 }} 와 함께). custom = 순번 */
export const growY: Variants = {
  enter: { scaleY: 0 },
  center: (i: number = 0) => ({
    scaleY: 1,
    transition: { delay: 0.25 + i * 0.05, duration: 0.6, ease: EASE },
  }),
};

/** 가로 막대: 왼쪽 기준선에서 자란다 (style={{ originX: 0 }} 와 함께). custom = 순번 */
export const growX: Variants = {
  enter: { scaleX: 0 },
  center: (i: number = 0) => ({
    scaleX: 1,
    transition: { delay: 0.2 + i * 0.035, duration: 0.6, ease: EASE },
  }),
};

/** 막대가 다 자란 뒤 나타나는 값 라벨. custom = 순번 */
export const labelAfter: Variants = {
  enter: { opacity: 0, y: 4 },
  center: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.55 + i * 0.05, duration: 0.35, ease: EASE },
  }),
};
