# LDS — Law Design System

법무 도메인 서비스(Law.ai 등)를 위한 React 컴포넌트 라이브러리 모노레포입니다.

📖 자세한 내용은 **[Wiki](https://github.com/cartoonpoet/LDS/wiki)** 참고 (아키텍처, 디자인 토큰, 컴포넌트 목록, 코드 컨벤션, 테스트 가이드).

## Stack

- **v3** (React 18.2 대상), styling: `vanilla-extract`
- 패키지 매니저: **pnpm** (workspaces) + **Turborepo**
- 문서화: **Storybook** (`apps/storybook`) — Vercel 자동 배포
- 테스트: **Vitest** + `@testing-library/react`

## 구조

- `apps/storybook`: 컴포넌트 문서 + 시각 리뷰
- `apps/docs`: `ui-v3`를 실제로 붙여서 쓰는 로컬 플레이그라운드
- `packages/ui-v3`: 퍼블리시 대상 React 컴포넌트 라이브러리 (npm: `@lawkit/ui`)
- `packages/tokens`: 테마 컨트랙트 + 시맨틱 토큰 (`@lds/tokens`)
- `packages/eslint-config`, `packages/typescript-config`: 공유 설정
- `designs`: Figma/Zeplin 드롭존
- `docs/superpowers`: 기능별 설계 문서(specs) / 구현 계획(plans) 아카이브

## 시작하기

```bash
pnpm install
pnpm storybook   # Storybook만 실행 (http://localhost:6006)
pnpm dev         # 전체 워크스페이스 dev (turbo)
pnpm test        # 전체 워크스페이스 테스트 (turbo)
```

자세한 명령어는 [Wiki: Getting Started](https://github.com/cartoonpoet/LDS/wiki/Getting-Started) 참고.
