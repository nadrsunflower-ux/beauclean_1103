# 뷰클린 인스타그램 운영 기획안 (GL AI STUDIO)

16:9 슬라이드 9장으로 된 제안서 웹사이트. Next.js 16 · Tailwind CSS 4 · shadcn/ui(Radix) · Framer Motion(`motion` 패키지, `motion/react`).

## 실행

```bash
cd "AI STUDIO/beauclean/proposal-deck"
npm run build && npm run start   # 발표용(프로덕션) → http://localhost:3456
npm run dev                      # 수정하면서 보기 → http://localhost:3456
```

## 조작

| 키 | 동작 |
|---|---|
| → · PageDown · Space | 다음 장 |
| ← · PageUp · Shift+Space | 이전 장 |
| Home / End | 처음 / 마지막 장 |
| F | 전체 화면 |

주소 끝 `#번호`로 특정 장을 바로 연다(예: `http://localhost:3456/#10`). 아래 점을 누르거나 터치 화면에서 좌우로 밀어도 넘어간다.

## 슬라이드

| # | 내용 | 파일 |
|---|---|---|
| 1 | 표지 | `src/components/slides/cover-slide.tsx` |
| 2 | 기존 현황 분석 · 업로드 주기 (월별 게시 수 막대 + 표) | `upload-cycle-slide.tsx` |
| 3·4 | 조회수 ① 릴스 8편 · ② 일반 게시물 8편 (표지 + 조회수·좋아요·댓글) | `views-cards-slide.tsx` |
| 5 | 운영 계획 1 · 제품군 캐러셀 카드뉴스 (여성용.png · 남성용.png) | `plan-products-slide.tsx` |
| 6 | 운영 계획 2 · 절레동화 (절레동화1~3.png) | `plan-reels-slide.tsx` |
| 7 | 운영 계획 3 · META 광고 (IMG_1992.jpg) | `plan-ads-slide.tsx` + `src/components/deck/ad-plan.tsx` |
| 8 | 요약 정리 (11월 · 12월) | `summary-slide.tsx` |
| 9 | 검토 사항 2가지 (캐러셀 제품군 · 11~12월 이벤트) | `review-slide.tsx` |

## 고칠 곳

- 기획안 문구: `src/data/plan.ts` (사용자 원문 그대로). 배열로 적힌 문구는 배열 한 칸이 화면의 한 줄(지정 줄바꿈)
- 2026년 콘텐츠 수치: `src/data/report2026.ts` (출처 `../report/뷰클린_2026년_콘텐츠_현황.pdf`, 합계·중앙값 등은 코드에서 계산)
- 이미지: `public/plan/` (report 폴더 원본의 사본), `public/covers/` (현황 보고서의 표지 16장)
- 색: `src/app/globals.css` 의 `@theme` (뷰클린 남색 #233862 · 블루 #0B4CA3, 데이터 색 릴스 #0D7F5F · 일반 게시물 #C9853A)

슬라이드는 1280×720 캔버스에 그리고 화면 크기에 맞춰 통째로 확대·축소한다(`src/components/deck/deck.tsx`).
