# Zeplin Token Audit (Phase 1)

## Scope

초기 정리는 아래 보드를 기준으로 한다.

1. Theme Colors
2. Text Style
3. Color States
4. Bootstrap Colors

## Phase 1 decisions

### Color
- grayscale / brand / status 계열 base palette를 foundation으로 먼저 정의한다
- 현재 구현에 바로 쓰는 alias는 유지하되, 내부 기준은 palette 기반으로 옮긴다
- semantic role은 아래 축으로 나눈다
  - surface
  - text
  - border
  - action
  - status

### Typography
- 현재 `sizeSm / sizeMd / sizeLg`만 있던 구조에서,
  foundation scale + semantic text style 개념을 추가한다
- 컴포넌트 API는 유지하고, docs 및 다음 컴포넌트 정리 단계에서 semantic text style을 점진적으로 소비한다

### State
- success / danger / warning / info 상태에 대해
  text / fill / border 역할을 semantic token으로 정의한다

## Next
- Button / Input / Select가 semantic role 기준으로 어디까지 치환 가능한지 점검
- 이후 Badge / Alert / Tabs 순으로 semantic token 확장
