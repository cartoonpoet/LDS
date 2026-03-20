import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { CalendarPopover } from ".";

/**
 * **CalendarPopover** — 캘린더 일정 상세 카드 팝오버
 *
 * ### 사용법
 * ```tsx
 * import { CalendarPopover } from "@lds/ui-v3";
 *
 * // 계약 검토 (Basic)
 * <CalendarPopover
 *   badge="계약검토"
 *   title="휴맥스이브이 법무시스템 Law.ai 공급 계약"
 *   fields={[
 *     { label: "관리번호", value: "C20221108-0001" },
 *     { label: "상대계약자", value: "휴맥스이브이" },
 *     { label: "요청자", value: "박영업" },
 *     { label: "법무팀 담당자", value: "이법무" },
 *     { label: "수정일", value: "2023-06-13" },
 *   ]}
 *   primaryText="일정 수정"
 *   secondaryText="사건 바로가기"
 *   placement="right"
 * >
 *   <button>6/15</button>
 * </CalendarPopover>
 * ```
 */
const meta: Meta<typeof CalendarPopover> = {
  title: "Components/CalendarPopover",
  component: CalendarPopover,
  decorators: [
    (Story) => (
      <div
        className={lightThemeClass}
        style={{
          padding: 120,
          backgroundColor: "#f2f4f6",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 500,
        }}
      >
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    placement: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof CalendarPopover>;

const CalendarCell = ({ children }: { children: string }) => (
  <div
    style={{
      width: 36,
      height: 36,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 4,
      backgroundColor: "#2151EC",
      color: "#fff",
      fontSize: 13,
      fontWeight: 500,
      cursor: "pointer",
    }}
  >
    {children}
  </div>
);

const Badge = ({
  children,
  variant = "outline",
}: {
  children: string;
  variant?: "fill" | "outline" | "subtle";
}) => {
  const styles: Record<string, React.CSSProperties> = {
    fill: {
      backgroundColor: "#2151EC",
      color: "#fff",
      borderRadius: 4,
      padding: "2px 8px",
      fontSize: 13,
      fontWeight: 500,
    },
    outline: {
      backgroundColor: "rgba(33,81,236,0.12)",
      color: "#2151EC",
      borderRadius: 17,
      padding: "2px 8px",
      fontSize: 13,
      fontWeight: 500,
    },
    subtle: {
      backgroundColor: "rgba(158,167,184,0.12)",
      color: "#000",
      borderRadius: 4,
      padding: "2px 8px",
      fontSize: 13,
      fontWeight: 500,
    },
  };
  return <span style={styles[variant]}>{children}</span>;
};

/** 계약 검토 (Basic) */
export const ContractBasic: Story = {
  args: {
    badge: "계약검토",
    title: "휴맥스이브이 법무시스템 Law.ai 공급 계약",
    placement: "right",
    primaryText: "일정 수정",
    secondaryText: "사건 바로가기",
    fields: [
      { label: "관리번호", value: "C20221108-0001" },
      { label: "상대계약자", value: "휴맥스이브이" },
      { label: "요청자", value: "박영업" },
      { label: "법무팀 담당자", value: "이법무" },
      { label: "수정일", value: "2023-06-13" },
      { label: "계약 검토기한", value: "2023-06-27" },
      { label: "검토 요청일", value: "2023-06-13" },
    ],
  },
  render: (args) => (
    <CalendarPopover
      {...args}
      badges={
        <>
          <Badge variant="fill">D-2</Badge>
          <Badge variant="outline">요청자 검토 중</Badge>
          <Badge variant="subtle">개발/공급계약</Badge>
        </>
      }
    >
      <CalendarCell>15</CalendarCell>
    </CalendarPopover>
  ),
};

/** 소송 기일 (Litigation) */
export const Litigation: Story = {
  args: {
    badge: "기일",
    title: "변론 기일",
    placement: "right",
    primaryText: "일정 수정",
    secondaryText: "사건 바로가기",
    fields: [
      { label: "사건번호", value: "서울중앙지방법원2020가합546991" },
      { label: "사건명", value: "[전자] 계약금 등 반환" },
      { label: "요청자", value: "박영업" },
      { label: "원고", value: "법무팀" },
      { label: "피고", value: "휴맥스홀딩스 외 3명" },
      { label: "법무팀 담당자", value: "김관욱" },
    ],
  },
  render: (args) => (
    <CalendarPopover
      {...args}
      badges={<Badge variant="subtle">민사소송</Badge>}
      details={
        <div style={{ padding: "12px 20px", display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontSize: 15, fontWeight: 500, color: "#11152a" }}>
              2023년 6월 19일
            </span>
            <span style={{ fontSize: 15, fontWeight: 500, color: "#11152a" }}>10:30</span>
          </div>
          <div style={{ fontSize: 13, color: "#4C5469" }}>
            서울중앙지방법원 민사법정 동관565호(1번법정출입구이용)
          </div>
        </div>
      }
    >
      <CalendarCell>19</CalendarCell>
    </CalendarPopover>
  ),
};
