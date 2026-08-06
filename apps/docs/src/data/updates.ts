export type ReleaseEntry = {
  version: string;
  date: string;
  tag: string;
  latest?: boolean;
  /** 항목은 <b> 강조를 포함한 HTML 문자열 */
  items: readonly string[];
};

/** 실제 릴리스/작업 이력 기준 체인지로그 */
export const RELEASES: ReleaseEntry[] = [
  {
    version: "v0.1.52",
    date: "2026. 08",
    tag: "Latest",
    latest: true,
    items: [
      "<b>Tokens · Layout</b> Spacing / Radius / Shadow 토큰 스토리를 추가했어요.",
      "<b>docHelpers</b> 토큰 문서를 만드는 헬퍼를 확장했어요."
    ]
  },
  {
    version: "v0.1.51",
    date: "2026. 07",
    tag: "Patch",
    items: [
      "<b>Tokens</b> 스토리북에 토큰 문서 섹션을 열었어요.",
      "<b>Storybook</b> 사이드바 그룹을 Guide / Tokens / Components 순서로 정렬했어요."
    ]
  },
  {
    version: "v0.1.8",
    date: "2026. 상반기",
    tag: "Minor",
    items: [
      "<b>Icon</b> 스토리북에 아이콘 갤러리와 사이즈 스토리를 추가했어요.",
      "<b>StepBar</b> 아이콘 레지스트리와 연동했어요."
    ]
  },
  {
    version: "Quality",
    date: "상시",
    tag: "Gate",
    items: [
      "전 컴포넌트 단위 테스트 <b>272개</b>가 배포 게이트로 동작해요.",
      "<b>Vercel</b> 배포 전 테스트 게이트를 통과해야 해요.",
      "Storybook <b>Template Code 스토리 38종</b>으로 사용 예시를 제공해요."
    ]
  }
];
