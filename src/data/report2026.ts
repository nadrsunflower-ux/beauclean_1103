/**
 * 뷰클린 2026년 콘텐츠 현황 보고서(report/뷰클린_2026년_콘텐츠_현황.pdf)의 원자료.
 * 번호·제목·게시일·조회수·좋아요·댓글은 보고서와 같고, 합계·중앙값 등은 아래에서 계산한다.
 */

export type ContentType = "reel" | "post";

export interface ContentItem {
  no: number;
  type: ContentType;
  title: string;
  date: string; // YYYY-MM-DD
  views: number;
  likes: number;
  comments: number;
  url: string;
}

export const TYPE_LABEL: Record<ContentType, string> = {
  reel: "릴스",
  post: "일반 게시물",
};

export const SOURCE_LABEL = "뷰클린 2026년 콘텐츠 현황 보고서";
export const COLLECTED_LABEL = "2026년 11월 2일";

export const contents: ContentItem[] = [
  { no: 1, type: "reel", title: "다용도 일회용 헤어밴드", date: "2026-10-21", views: 221, likes: 0, comments: 1, url: "https://www.instagram.com/beaucleanskin/reel/Dev_8EsvIyX/" },
  { no: 2, type: "reel", title: "미용실 사업자용 에코살롱 타올", date: "2026-10-16", views: 1039, likes: 6, comments: 11, url: "https://www.instagram.com/beaucleanskin/reel/DejJGruPnrE/" },
  { no: 3, type: "reel", title: "일회용 파마보 소개", date: "2026-10-14", views: 1365, likes: 5, comments: 1, url: "https://www.instagram.com/beaucleanskin/reel/Ded_V3Whk6v/" },
  { no: 4, type: "reel", title: "매장 일회용품 선택 기준", date: "2026-10-08", views: 198, likes: 6, comments: 2, url: "https://www.instagram.com/beaucleanskin/reel/DeOg2Q_JdEk/" },
  { no: 5, type: "reel", title: "입원 준비용 일회용 속옷", date: "2026-10-01", views: 186, likes: 5, comments: 2, url: "https://www.instagram.com/beaucleanskin/reel/Dd8gMGIJ9kq/" },
  { no: 6, type: "reel", title: "수건 세탁을 줄이는 일회용 타월", date: "2026-09-23", views: 349, likes: 7, comments: 2, url: "https://www.instagram.com/beaucleanskin/reel/DdnBYGAu1fJ/" },
  { no: 7, type: "reel", title: "샵 운영자 일회용 타올 후기", date: "2026-07-07", views: 846, likes: 1, comments: 0, url: "https://www.instagram.com/beaucleanskin/reel/Daee494JVqP/" },
  { no: 8, type: "post", title: "일회용 타올 70×30 후기", date: "2026-07-03", views: 360, likes: 2, comments: 2, url: "https://www.instagram.com/beaucleanskin/p/DaUtQm_Ca66/" },
  { no: 9, type: "post", title: "타올 정기구독 안내 ①", date: "2026-06-30", views: 126, likes: 0, comments: 2, url: "https://www.instagram.com/beaucleanskin/p/DaM87DUprJH/" },
  { no: 10, type: "post", title: "타올 정기구독 안내 ②", date: "2026-06-30", views: 112, likes: 0, comments: 0, url: "https://www.instagram.com/beaucleanskin/p/DaM8uC8JCQk/" },
  { no: 11, type: "post", title: "여름 미용실 일회용 타올", date: "2026-06-29", views: 181, likes: 0, comments: 0, url: "https://www.instagram.com/beaucleanskin/p/DaKNlITiQMx/" },
  { no: 12, type: "post", title: "뷰클린 페이스타올", date: "2026-06-23", views: 131, likes: 0, comments: 0, url: "https://www.instagram.com/beaucleanskin/p/DZ7EbAoJG2D/" },
  { no: 13, type: "post", title: "생생 후기 콘테스트", date: "2026-05-11", views: 248, likes: 3, comments: 3, url: "https://www.instagram.com/beaucleanskin/p/DYLU06TH4wp/" },
  { no: 14, type: "post", title: "카카오 톡딜 오픈", date: "2026-04-08", views: 188, likes: 5, comments: 0, url: "https://www.instagram.com/beaucleanskin/p/DW21X3gCcyR/" },
  { no: 15, type: "post", title: "서울 네일엑스포 참가 안내", date: "2026-03-05", views: 655, likes: 7, comments: 0, url: "https://www.instagram.com/beaucleanskin/p/DVflxcrCSpL/" },
  { no: 16, type: "reel", title: "심쿵 라이프 페이스타올 소개", date: "2026-02-04", views: 4654, likes: 2, comments: 0, url: "https://www.instagram.com/beaucleanskin/reel/DUUDrzjjPkx/" },
];

export const coverSrc = (no: number) => `/covers/cover_${pad2(no)}.jpg`;

/* ------------------------------------------------------------------ 형식 */
export function pad2(n: number) {
  return String(n).padStart(2, "0");
}

/** 서버·클라이언트에서 같은 결과가 나오도록 직접 천 단위 쉼표를 넣는다. */
export function fmt(n: number, decimals = 0) {
  const fixed = n.toFixed(decimals);
  const [int, dec] = fixed.split(".");
  const withComma = int.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return dec ? `${withComma}.${dec}` : withComma;
}

export const monthOf = (iso: string) => Number(iso.slice(5, 7));
export const dayOf = (iso: string) => Number(iso.slice(8, 10));
/** "10.21" */
export const shortDate = (iso: string) => `${monthOf(iso)}.${dayOf(iso)}`;
/** "10월 21일" */
export const krDate = (iso: string) => `${monthOf(iso)}월 ${dayOf(iso)}일`;

/* ------------------------------------------------------------------ 계산 */
function median(values: number[]) {
  const s = [...values].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

export function summarize(items: ContentItem[]) {
  const views = items.reduce((a, c) => a + c.views, 0);
  return {
    count: items.length,
    views,
    likes: items.reduce((a, c) => a + c.likes, 0),
    comments: items.reduce((a, c) => a + c.comments, 0),
    avgViews: views / items.length,
    medianViews: median(items.map((c) => c.views)),
    top: items.reduce((best, c) => (c.views > best.views ? c : best)),
  };
}

const byDateDesc = (a: ContentItem, b: ContentItem) => b.date.localeCompare(a.date) || a.no - b.no;
const byDateAsc = (a: ContentItem, b: ContentItem) => a.date.localeCompare(b.date) || b.no - a.no;

export const reels = contents.filter((c) => c.type === "reel").sort(byDateDesc);
export const posts = contents.filter((c) => c.type === "post").sort(byDateDesc);

export const allStats = summarize(contents);
export const reelStats = summarize(reels);
export const postStats = summarize(posts);

/** 최근 릴스 6편 (9월 23일 ~ 10월 21일) */
export const recentReels = reels.slice(0, 6);
export const recentReelStats = summarize(recentReels);

/** 좋아요 0개 일반 게시물 */
export const zeroLikePosts = posts.filter((c) => c.likes === 0);

/* ------------------------------------------------------------------ 월별 */
export const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

export const monthly = MONTHS.map((month) => {
  const items = contents.filter((c) => monthOf(c.date) === month).sort(byDateAsc);
  const reel = items.filter((c) => c.type === "reel").length;
  const post = items.length - reel;
  return { month, reel, post, total: items.length, items };
});

export const avgPerMonth = contents.length / MONTHS.length; // 1.6
export const emptyMonths = monthly.filter((m) => m.total === 0).map((m) => m.month);
export const busiestMonth = monthly.reduce((best, m) => (m.total > best.total ? m : best));

export const longestGap = (() => {
  const dates = [...contents].sort(byDateAsc).map((c) => c.date);
  const DAY = 86_400_000;
  let best = { days: 0, from: dates[0], to: dates[0] };
  for (let i = 1; i < dates.length; i += 1) {
    const days = Math.round((Date.parse(`${dates[i]}T00:00:00Z`) - Date.parse(`${dates[i - 1]}T00:00:00Z`)) / DAY);
    if (days > best.days) best = { days, from: dates[i - 1], to: dates[i] };
  }
  return best;
})();
