# Icon asset strategy

## Source review
- 원본은 `designs/assets/icons-source/icons/<size>) icon/*.svg` 구조로 들어왔고, 폴더명에 크기와 공백/괄호가 포함되어 있습니다.
- 파일명은 케밥/스페이스/파스칼/오탈자가 혼재되어 있어 코드 import 경로로 직접 쓰기에는 유지보수성이 낮습니다.
- 일부 아이콘은 stroke 기반이 아니라 `fill="black"` 단일 path 위주라, 컴포넌트화 시 `currentColor`로 치환하면 LDS semantic color와 자연스럽게 연결됩니다.

## LDS 배치 전략
1. **원본 보존**: `designs/assets/icons-source`는 공급받은 원형 그대로 유지합니다.
2. **코드 소비 계층 분리**: 실제 제품 코드에서는 `packages/ui-v3/src/components/Icon`만 사용합니다.
3. **명명 규칙 통일**: 외부 파일명과 무관하게 LDS 내부 API는 도메인 중심 camelCase 이름(`info`, `confirm`, `saveTemporarily`, `secret`, `close`)을 사용합니다.
4. **점진적 확장**: 새 아이콘이 필요해질 때마다 source에서 검증 → `Icon/icons.tsx`에 등록 → `IconName` union 확장 순서로 추가합니다.
5. **색상 토큰 연동**: SVG 내부 색은 `currentColor`를 사용하고, 실제 색상은 각 컴포넌트의 vanilla-extract 스타일이 담당합니다.

## 1차 선별 아이콘
- `info` ← `designs/assets/icons-source/icons/34) icon/info.svg`
- `confirm` ← `designs/assets/icons-source/icons/34) icon/check-circle.svg`
- `saveTemporarily` ← `designs/assets/icons-source/icons/34) icon/save.svg`
- `secret` ← `designs/assets/icons-source/icons/34) icon/lock-solid.svg`
- `close` ← `designs/assets/icons-source/icons/34) icon/x.svg`

## Why this shape
- Alert가 즉시 필요하므로 전체 아이콘 파이프라인 자동화보다 **작은 수동 registry**가 현재 비용 대비 가장 읽기 쉽습니다.
- 이후 Button, Tabs, Input suffix 등으로 확대할 때도 같은 `Icon` 컴포넌트 API를 재사용할 수 있습니다.
