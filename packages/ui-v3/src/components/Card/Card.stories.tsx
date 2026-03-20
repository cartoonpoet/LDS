import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardHeader, CardBody, CardFooter } from ".";
import { Button } from "../Button";
import { lightThemeClass } from "@lds/tokens";

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
    bordered: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof Card>;

/* ─── Card Header ─── */
export const HeaderOnly: Story = {
  args: {
    header: "헤더",
    title: "카드 타이틀",
    children: <p style={{ margin: 0 }}>카드 본문 텍스트</p>,
  },
};

/* ─── Card Header + Footer ─── */
export const HeaderAndFooter: Story = {
  args: {
    header: "헤더",
    title: "카드 타이틀",
    children: <p style={{ margin: 0 }}>카드 본문 텍스트</p>,
    footer: "푸터",
  },
};

/* ─── Card Bordered ─── */
export const Bordered: Story = {
  args: {
    header: "특징",
    title: "카드 타이틀",
    bordered: true,
    children: <p style={{ margin: 0 }}>카드 본문 텍스트</p>,
  },
};

/* ─── With Header Actions ─── */
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

/* ─── Body Only (no header/footer) ─── */
export const BodyOnly: Story = {
  args: {
    title: "카드 타이틀",
    children: <p style={{ margin: 0 }}>카드 본문 텍스트</p>,
  },
};

/* ─── Compound Pattern ─── */
export const CompoundPattern: Story = {
  render: () => (
    <div
      className={`${lightThemeClass}`}
      style={{ display: "flex", flexDirection: "column", gap: 16 }}
    >
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
    </div>
  ),
};

/* ─── Multiple Cards ─── */
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
