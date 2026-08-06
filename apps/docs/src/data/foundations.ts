export type FoundationEntry = {
  slug: string;
  name: string;
  token: string;
  desc: string;
  paras: readonly [string, string];
  showcaseTitle: string;
  showcaseHtml: string;
};

/** 사이드바/허브 순서 (Color는 전용 페이지) */
export const FOUNDATION_NAV = [
  { slug: "color", name: "Color" },
  { slug: "typography", name: "Typography" },
  { slug: "spacing", name: "Spacing" },
  { slug: "radius", name: "Radius" },
  { slug: "shadow", name: "Shadow" },
  { slug: "theming", name: "Theming" }
] as const;

/** 데이터 주도 상세 5종 (Color 제외) */
export const FOUNDATIONS: FoundationEntry[] = [
  {
    slug: "typography",
    name: "Typography",
    token: "$font.textStyles",
    desc: "폰트 패밀리부터 자간까지, 글자의 모든 값이 스케일로 정의돼요.",
    paras: [
      "fontFamilyTokens · fontSizeScale · lineHeightScale · fontWeightScale · letterSpacingScale 다섯 스케일이 글자의 원자 값을 정의해요.",
      "자주 쓰는 조합은 textStyles로 묶어 제공해요. 화면에서는 스타일 이름 하나만 고르면 돼요."
    ],
    showcaseTitle: "Text Styles",
    showcaseHtml: `<div class="type-scale"><div class="row"><span class="nm">Display</span><span class="sample" style="font-size:40px">계약 현황</span><span class="mt">40 / 800</span></div><div class="row"><span class="nm">Heading</span><span class="sample" style="font-size:28px">계약 현황</span><span class="mt">28 / 800</span></div><div class="row"><span class="nm">Title</span><span class="sample" style="font-size:20px">계약 현황</span><span class="mt">20 / 700</span></div><div class="row"><span class="nm">Body</span><span class="sample" style="font-size:15px;font-weight:500">계약 현황을 확인해 보세요.</span><span class="mt">15 / 500</span></div><div class="row"><span class="nm">Caption</span><span class="sample" style="font-size:12px;font-weight:600;color:#626F86">캡션과 라벨</span><span class="mt">12 / 600</span></div></div>`
  },
  {
    slug: "spacing",
    name: "Spacing",
    token: "spacing.x4",
    desc: "themeVars.spacing.x1~x6 — 4px에서 24px까지의 간격 스케일이에요.",
    paras: [
      "모든 간격은 spacingScale에서 나와요. x1(4px)부터 x6(24px)까지 여섯 단계만 사용해요.",
      "관련 있는 것은 가깝게, 다른 것은 멀게 — 간격 자체가 정보 구조예요."
    ],
    showcaseTitle: "Spacing Scale",
    showcaseHtml: `<div class="fd-spacing-scale"><div class="row"><span class="nm">x1 · 4</span><i style="width:16px"></i></div><div class="row"><span class="nm">x2 · 8</span><i style="width:32px"></i></div><div class="row"><span class="nm">x3 · 12</span><i style="width:48px"></i></div><div class="row"><span class="nm">x4 · 16</span><i style="width:64px"></i></div><div class="row"><span class="nm">x5 · 20</span><i style="width:80px"></i></div><div class="row"><span class="nm">x6 · 24</span><i style="width:96px"></i></div></div>`
  },
  {
    slug: "radius",
    name: "Radius",
    token: "radius.md",
    desc: "defaultRadiusTokens — sm · md · lg 세 단계, 4 · 6 · 8px이에요.",
    paras: [
      "입력과 버튼은 sm(4px), 카드류는 md(6px), 큰 패널은 lg(8px)를 사용해요.",
      "같은 층위의 요소는 같은 라운드를 지켜요. 임의의 라운드 값은 쓰지 않아요."
    ],
    showcaseTitle: "Radius Tokens",
    showcaseHtml: `<div class="fd-radius-row"><div class="chip-r" style="border-radius:4px">sm · 4px</div><div class="chip-r" style="border-radius:6px">md · 6px</div><div class="chip-r" style="border-radius:8px">lg · 8px</div></div>`
  },
  {
    slug: "shadow",
    name: "Shadow",
    token: "shadow.raised",
    desc: "defaultShadowTokens — 떠 있음(raised)과 포커스(focus)를 구분해요.",
    paras: [
      "raised는 카드·팝오버처럼 떠 있는 표면의 그림자, focus는 키보드 포커스를 알리는 링이에요.",
      "그림자는 장식이 아니라 상태예요. 토큰 밖의 그림자는 만들지 않아요."
    ],
    showcaseTitle: "Shadow Tokens",
    showcaseHtml: `<div class="fd-elev-row"><div class="lv e2">raised</div><div class="lv" style="box-shadow:0 0 0 3px #DFE8FF;border-color:#2151EC;color:#2151EC">focus</div></div>`
  },
  {
    slug: "theming",
    name: "Theming",
    token: "createLdsThemeVars",
    desc: "토큰 한 벌로 브랜드를 갈아입는 런타임 테마 시스템이에요.",
    paras: [
      "lightThemeClass가 기본 테마를 깔고, createLdsThemeVars가 브랜드 컬러를 런타임에 덮어써요.",
      "Law.ai 기본 블루 외에 Green · Purple · Orange · Scourt Blue 프리셋을 제공해요."
    ],
    showcaseTitle: "Brand Presets",
    showcaseHtml: `<div class="fd-state-row"><span class="st" style="background:#2151EC;color:#fff">Law.ai 기본</span><span class="st" style="background:#1FA45B;color:#fff">Green</span><span class="st" style="background:#7B5CE6;color:#fff">Purple</span><span class="st" style="background:#F07A23;color:#fff">Orange</span><span class="st" style="background:#1B4B9E;color:#fff">Scourt Blue</span></div><div class="codeblock"><span class="tk-fn">createLdsThemeVars</span>({ <span class="tk-attr">accent</span>: <span class="tk-str">"#1FA45B"</span> })</div>`
  }
];

export const findFoundation = (slug: string) => FOUNDATIONS.find(entry => entry.slug === slug);
