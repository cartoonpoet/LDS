# @lds/tokens

LDS 디자인 토큰 패키지입니다.

## Current direction

이 패키지는 React + vanilla-extract 기반의 토큰 시스템을 제공합니다.

핵심 방향:
- foundation scale과 semantic role 분리
- `createThemeContract` 기반 theme contract 유지
- light theme부터 우선 정리
- runtime override 지원

## Planned internal structure

```text
src/
  foundation/
  semantic/
  contracts/
  themes/
  runtime/
  index.ts
```

## Notes

자세한 리팩터링 계획은 아래 문서를 참고합니다.

- `../../designs/notes/token-refactor-plan.md`
