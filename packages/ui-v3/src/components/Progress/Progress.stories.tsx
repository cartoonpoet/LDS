import type { Meta, StoryObj } from "@storybook/react";
import { ProgressBar, StepBar } from ".";
import { lightThemeClass } from "@lds/tokens";

/**
 * ## Progress
 *
 * 진행 상태를 표시하는 컴포넌트. ProgressBar (바 형태)와 StepBar (단계 형태)를 지원합니다.
 *
 * ### Import
 * ```tsx
 * import { ProgressBar, StepBar } from "@lds/ui-v3";
 * ```
 *
 * ### Props (ProgressBar)
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `value` | `number` | `0` | 진행률 (0-100) |
 * | `color` | `"primary" \| "success" \| "danger" \| "warning" \| "info"` | `"primary"` | 바 색상 |
 * | `striped` | `boolean` | `false` | 스트라이프 패턴 |
 * | `animated` | `boolean` | `false` | 스트라이프 애니메이션 |
 * | `showValue` | `boolean` | `false` | 값(%) 표시 |
 * | `segments` | `ProgressSegment[]` | - | 멀티 바 세그먼트 |
 *
 * ### Props (StepBar)
 * | Prop | Type | Description |
 * |------|------|-------------|
 * | `steps` | `StepItem[]` | 단계 목록 ({ label, status, icon? }) |
 *
 * ### Template Code
 * ```tsx
 * // Basic
 * <ProgressBar value={75} />
 *
 * // With value label
 * <ProgressBar value={75} showValue />
 *
 * // Striped + animated
 * <ProgressBar value={60} striped animated />
 *
 * // Multiple bars
 * <ProgressBar segments={[
 *   { value: 30, color: "primary", label: "30%" },
 *   { value: 45, color: "warning", label: "45%" },
 *   { value: 15, color: "danger", label: "15%" },
 * ]} />
 *
 * // StepBar
 * <StepBar steps={[
 *   { label: "임시 저장", status: "completed" },
 *   { label: "법무검토 중", status: "active" },
 *   { label: "계약 종료", status: "scheduled" },
 * ]} />
 * ```
 */
const meta: Meta<typeof ProgressBar> = {
  title: "Components/Progress",
  component: ProgressBar,
  decorators: [
    (Story) => (
      <div className={lightThemeClass} style={{ padding: 24, backgroundColor: "#f2f4f6", maxWidth: 600 }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof ProgressBar>;

/** 1) Default Progress — 값 표시 */
export const DefaultProgress: Story = {
  render: () => <ProgressBar value={75} showValue />,
};

/** 2) Progress Height — 기본 바 */
export const BasicBar: Story = {
  render: () => <ProgressBar value={60} />,
};

/** 3) Striped Progress */
export const StripedProgress: Story = {
  render: () => <ProgressBar value={65} striped />,
};

/** Striped + Animated */
export const StripedAnimated: Story = {
  render: () => <ProgressBar value={65} striped animated />,
};

/** 4) Multiple Bars */
export const MultipleBars: Story = {
  render: () => (
    <ProgressBar
      segments={[
        { value: 20, color: "primary", label: "20%" },
        { value: 35, color: "warning", label: "35%" },
        { value: 15, color: "danger", label: "15%" },
      ]}
    />
  ),
};

/** 5) 색상 변형 */
export const Colors: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <ProgressBar value={80} color="primary" showValue />
      <ProgressBar value={65} color="success" showValue />
      <ProgressBar value={50} color="warning" showValue />
      <ProgressBar value={35} color="danger" showValue />
      <ProgressBar value={20} color="info" showValue />
    </div>
  ),
};

/** 6) StepBar — 계약 체결 */
export const StepBarContractConcluded: Story = {
  render: () => (
    <StepBar
      steps={[
        { label: "사본 등록 완료", status: "completed" },
        { label: "계약 이행 중", status: "active" },
        { label: "계약 종료", status: "scheduled" },
      ]}
    />
  ),
};

/** 7) StepBar — 계약 검토 (긴 프로세스) */
export const StepBarReviewOfContracts: Story = {
  render: () => (
    <StepBar
      steps={[
        { label: "임시 저장", status: "completed" },
        { label: "법무검토 중 외 3개", status: "completed" },
        { label: "체결 품의 완료", status: "active" },
        { label: "전자서명 중", status: "scheduled" },
        { label: "사본 등록 완료", status: "scheduled" },
        { label: "계약 이행 중", status: "scheduled" },
        { label: "계약 종료", status: "scheduled" },
      ]}
    />
  ),
};
