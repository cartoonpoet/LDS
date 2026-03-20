import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardHeader, CardBody, CardFooter } from ".";
import { Button } from "../Button";
import { lightThemeClass } from "@lds/tokens";

/**
 * ## Card
 *
 * 콘텐츠를 그룹화하는 카드 컨테이너. Header/Body/Footer 영역으로 구분되며,
 * 간편 API와 Compound 패턴 두 가지 방식으로 사용할 수 있습니다.
 *
 * ### Import
 * ```tsx
 * // 간편 API
 * import { Card } from "@lds/ui-v3";
 *
 * // Compound 패턴 (자유 레이아웃)
 * import { Card, CardHeader, CardBody, CardFooter } from "@lds/ui-v3";
 * ```
 *
 * ### Props (Card)
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `header` | `ReactNode` | - | 헤더 텍스트. 설정 시 divider 포함 상단 영역 표시 |
 * | `headerActions` | `ReactNode` | - | 헤더 우측 액션 영역 (버튼 등) |
 * | `title` | `ReactNode` | - | 본문 제목 (18px medium) |
 * | `footer` | `ReactNode` | - | 푸터. 설정 시 divider 포함 하단 영역 표시 |
 * | `bordered` | `boolean` | `false` | 명시적 1px border 표시 |
 * | `children` | `ReactNode` | - | 본문 콘텐츠 |
 * | `className` | `string` | - | 추가 CSS 클래스 |
 * | `...rest` | `HTMLAttributes<HTMLDivElement>` | - | 네이티브 div 속성 전달 |
 *
 * ### Sub-components (Compound 패턴)
 * | Component | Props | Description |
 * |-----------|-------|-------------|
 * | `CardHeader` | `children`, `actions?`, `className?` | 헤더 영역 (divider 포함) |
 * | `CardBody` | `children`, `className?` | 본문 영역 |
 * | `CardFooter` | `children`, `className?` | 푸터 영역 (divider 포함) |
 *
 * ### Template Code
 * ```tsx
 * // 간편 API — 헤더만
 * <Card header="헤더" title="카드 타이틀">
 *   <p>카드 본문 텍스트</p>
 * </Card>
 *
 * // 간편 API — 헤더 + 푸터
 * <Card header="헤더" title="카드 타이틀" footer="푸터">
 *   <p>카드 본문 텍스트</p>
 * </Card>
 *
 * // Bordered 변형 + 헤더 액션
 * <Card
 *   header="결재선"
 *   bordered
 *   headerActions={
 *     <div style={{ display: "flex", gap: 8 }}>
 *       <Button variant="outline" color="secondary" size="small">결재의견 추가</Button>
 *       <Button size="small">결재하기</Button>
 *     </div>
 *   }
 * >
 *   <p>결재선 콘텐츠</p>
 * </Card>
 *
 * // Compound 패턴 — 자유 레이아웃
 * <Card bordered>
 *   <CardHeader actions={<Button size="small">액션</Button>}>
 *     커스텀 헤더
 *   </CardHeader>
 *   <CardBody>
 *     <p>본문 콘텐츠</p>
 *   </CardBody>
 *   <CardFooter>커스텀 푸터</CardFooter>
 * </Card>
 *
 * // Body만 (헤더/푸터 없음)
 * <Card>
 *   <p>심플 카드</p>
 * </Card>
 * ```
 */
const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  decorators: [
    (Story) => (
      <div className={lightThemeClass} style={{ padding: 24, backgroundColor: "#f2f4f6" }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    bordered: { description: "명시적 1px border 표시" },
    header: { description: "헤더 텍스트. 설정 시 상단 영역 + divider 표시" },
    headerActions: { description: "헤더 우측 액션 영역 (버튼 등)" },
    title: { description: "본문 제목 (18px medium)" },
    footer: { description: "푸터. 설정 시 하단 영역 + divider 표시" },
    children: { description: "본문 콘텐츠" },
  },
};
export default meta;
type Story = StoryObj<typeof Card>;

/** 헤더만 있는 카드 */
export const HeaderOnly: Story = {
  args: {
    header: "헤더",
    title: "카드 타이틀",
    children: <p style={{ margin: 0 }}>카드 본문 텍스트</p>,
  },
};

/** 헤더 + 푸터 */
export const HeaderAndFooter: Story = {
  args: {
    header: "헤더",
    title: "카드 타이틀",
    children: <p style={{ margin: 0 }}>카드 본문 텍스트</p>,
    footer: "푸터",
  },
};

/** Bordered 변형 */
export const Bordered: Story = {
  args: {
    header: "특징",
    title: "카드 타이틀",
    bordered: true,
    children: <p style={{ margin: 0 }}>카드 본문 텍스트</p>,
  },
};

/** 헤더 액션 포함 */
export const WithHeaderActions: Story = {
  args: {
    header: "결재선",
    bordered: true,
    headerActions: (
      <div style={{ display: "flex", gap: 8 }}>
        <Button variant="outline" color="secondary" size="small">결재의견 추가</Button>
        <Button variant="outline" color="secondary" size="small">결재자 추가</Button>
        <Button size="small">결재하기</Button>
      </div>
    ),
    children: <p style={{ margin: 0 }}>결재선 콘텐츠가 여기에 들어갑니다.</p>,
  },
};

/** Body만 (헤더/푸터 없음) */
export const BodyOnly: Story = {
  args: {
    title: "카드 타이틀",
    children: <p style={{ margin: 0 }}>카드 본문 텍스트</p>,
  },
};

/** Compound 패턴으로 자유 레이아웃 구성 */
export const CompoundPattern: Story = {
  render: () => (
    <Card bordered>
      <CardHeader actions={<Button size="small">액션</Button>}>
        커스텀 헤더
      </CardHeader>
      <CardBody>
        <p style={{ margin: 0 }}>
          CardHeader, CardBody, CardFooter를 직접 조합하여 자유로운 레이아웃을 구성할 수 있습니다.
        </p>
      </CardBody>
      <CardFooter>커스텀 푸터</CardFooter>
    </Card>
  ),
};

/** 여러 카드를 그리드로 배치 */
export const MultipleCards: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      <Card header="기본 정보" bordered>
        <p style={{ margin: 0 }}>기본 정보 내용입니다.</p>
      </Card>
      <Card header="상세 정보" bordered>
        <p style={{ margin: 0 }}>상세 정보 내용입니다.</p>
      </Card>
      <Card header="첨부 파일" bordered>
        <p style={{ margin: 0 }}>첨부 파일 영역입니다.</p>
      </Card>
      <Card header="비고" bordered>
        <p style={{ margin: 0 }}>비고 내용입니다.</p>
      </Card>
    </div>
  ),
};
