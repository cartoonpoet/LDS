import type { SearchEntry } from "../data/search-index";

/**
 * 검색 매칭 유틸 — 순수 함수만 모아둔다 (DOM/React 의존 금지).
 *
 * 케이스 (단위 테스트 대신 명세 주석):
 *  - toChoseong("버튼")            → "ㅂㅌ"
 *  - toChoseong("뱃지 배지")       → "ㅂㅈ ㅂㅈ"
 *  - isChoseongQuery("ㅂㅌ")       → true
 *  - isChoseongQuery("버튼")       → false (완성형 음절 포함)
 *  - isChoseongQuery("drawer")     → false
 *  - scoreEntry("button", Button)  → 100 (제목 접두)
 *  - scoreEntry("ㅂㅌ", Button)    → 초성 키워드("버튼") 매칭 > 0
 *  - scoreEntry("모달", Modal)     → 키워드("모달") 매칭 > 0
 *  - scoreEntry("xyz", Button)     → 0 (미매칭)
 */

/** 유니코드 한글 음절(가~힣)의 초성 19자 테이블 */
const CHOSEONG_TABLE = [
  "ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ",
  "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"
] as const;

const HANGUL_BASE = 0xac00; // "가"
const HANGUL_LAST = 0xd7a3; // "힣"
const SYLLABLES_PER_CHOSEONG = 588; // 중성 21 × 종성 28

/** 문자열의 한글 음절을 초성으로 치환한다. 한글이 아닌 문자는 그대로 둔다. */
export const toChoseong = (text: string): string => {
  let result = "";
  for (const char of text) {
    const code = char.charCodeAt(0);
    result +=
      code >= HANGUL_BASE && code <= HANGUL_LAST
        ? CHOSEONG_TABLE[Math.floor((code - HANGUL_BASE) / SYLLABLES_PER_CHOSEONG)]
        : char;
  }
  return result;
};

/** 쿼리가 초성으로만 이루어졌는지 (예: "ㅂㅌ") — 이때만 초성 매칭 모드로 전환 */
export const isChoseongQuery = (query: string): boolean => /^[ㄱ-ㅎ]+$/.test(query);

/**
 * 엔트리 매칭 점수. 0이면 미매칭.
 * 우선순위: 제목 접두(100) > 제목 포함(70) > 키워드 접두(50) > 키워드 포함(40) > 설명 포함(30)
 * 초성 모드에서는 제목/키워드/설명의 초성열에 같은 우선순위를 적용한다.
 */
export const scoreEntry = (rawQuery: string, entry: SearchEntry): number => {
  const query = rawQuery.trim().toLowerCase();
  if (!query) {
    return 0;
  }

  if (isChoseongQuery(query)) {
    const titleCho = toChoseong(entry.title.toLowerCase());
    if (titleCho.startsWith(query)) {
      return 100;
    }
    if (titleCho.includes(query)) {
      return 70;
    }
    if (entry.keywords.some(keyword => toChoseong(keyword).startsWith(query))) {
      return 50;
    }
    if (entry.keywords.some(keyword => toChoseong(keyword).includes(query))) {
      return 40;
    }
    if (toChoseong(entry.desc).includes(query)) {
      return 30;
    }
    return 0;
  }

  const title = entry.title.toLowerCase();
  if (title.startsWith(query)) {
    return 100;
  }
  if (title.includes(query)) {
    return 70;
  }
  const keywords = entry.keywords.map(keyword => keyword.toLowerCase());
  if (keywords.some(keyword => keyword.startsWith(query))) {
    return 50;
  }
  if (keywords.some(keyword => keyword.includes(query))) {
    return 40;
  }
  if (entry.desc.toLowerCase().includes(query)) {
    return 30;
  }
  return 0;
};

/**
 * 쿼리로 엔트리를 걸러 점수순으로 돌려준다.
 * 빈 쿼리면 전체를 원래 순서대로 돌려준다(다이얼로그의 기본 탐색 목록).
 */
export const searchEntries = (
  rawQuery: string,
  entries: readonly SearchEntry[],
  limit = 30
): SearchEntry[] => {
  const query = rawQuery.trim();
  if (!query) {
    return [...entries];
  }
  return entries
    .map(entry => ({ entry, score: scoreEntry(query, entry) }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title))
    .slice(0, limit)
    .map(item => item.entry);
};
