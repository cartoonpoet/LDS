import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from ".";
import { lightThemeClass } from "@lds/tokens";

/**
 * ## Alert
 *
 * 사용자에게 중요한 정보를 전달하는 인라인 알림 컴포넌트.
 *
 * ### Import
 * ```tsx
 * import { Alert } from "@lds/ui-v3";
 * ```
 *
 * ### Props
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `type` | `"info" \| "confirm" \| "secret" \| "saveTemporarily"` | `"info"` | 알림 유형 (배경색/아이콘 결정) |
 * | `size` | `"small" \| "medium"` | `"medium"` | 크기 |
 * | `children` | `ReactNode` | **필수** | 알림 본문 텍스트 |
 * | `title` | `string` | - | 제목 (expanded layout) |
 * | `icon` | `ReactNode` | 타입별 기본 아이콘 | 커스텀 아이콘 |
 * | `closable` | `boolean` | `false` | 닫기 버튼 표시 |
 * | `onClose` | `MouseEventHandler` | - | 닫기 클릭 핸들러 |
 * | `textButton` | `{ label: string; onClick?: MouseEventHandler }` | - | 텍스트 링크 버튼 |
 * | `actions` | `AlertAction[]` | - | 액션 버튼 목록 (승인/반려 등) |
 * | `className` | `string` | - | 추가 CSS 클래스 |
 */
const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  decorators: [(Story) => <div className={lightThemeClass}><Story /></div>],
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["info", "confirm", "secret", "saveTemporarily"],
      description: "알림 유형. 배경색과 기본 아이콘을 결정합니다.",
    },
    size: {
      control: "select",
      options: ["small", "medium"],
      description: "알림 크기. small은 패딩과 폰트가 작아집니다.",
    },
    children: { description: "알림 본문 텍스트 (필수)" },
    title: { description: "제목. 설정 시 제목+본문 2단 레이아웃" },
    closable: { description: "닫기(X) 버튼 표시 여부" },
    className: { description: "추가 CSS 클래스" },
  },
};
export default meta;
type Story = StoryObj<typeof Alert>;

export const TemplateCode: Story = {
  name: "Template Code",
  args: {
    type: "info",
    children: "중요! 이것은 기본 알림입니다. 확인해주세요!",
    closable: true,
  },
  parameters: {
    docs: {
      source: {
        code: `import { Alert } from "@lds/ui-v3";

// 기본 사용
<Alert type="info" closable onClose={() => {}}>
  중요! 이것은 기본 알림입니다. 확인해주세요!
</Alert>

// 제목 + 본문 (Expanded)
<Alert type="info" title="알림 제목" closable>
  이것은 확장된 알림입니다. 제목과 본문이 분리됩니다.
</Alert>

// 텍스트 버튼 포함
<Alert type="info" textButton={{ label: "자세히 보기", onClick: handleClick }}>
  알림 메시지
</Alert>

// 액션 버튼 포함 (승인/반려)
<Alert type="confirm" title="의견 검토 중" actions={[
  { label: "승인", intent: "primary", onClick: handleApprove },
  { label: "반려", intent: "warning", onClick: handleReject },
]}>
  의견 검토 중 (검토자 : 김팀장)
</Alert>

// 작은 사이즈
<Alert type="info" size="small">
  작은 사이즈 알림입니다.
</Alert>
`,
      },
    },
  },
};

export const Info: Story = {
  args: {
    type: "info",
    children: "중요! 이것은 기본 알림입니다. 확인해주세요!",
    closable: true,
  },
};

export const Confirm: Story = {
  args: {
    type: "confirm",
    children: "의견 검토 중 (검토자 : 김팀장 / 검토상태 : 확인 중)",
    closable: true,
  },
};

export const Secret: Story = {
  args: {
    type: "secret",
    children: "비밀 문서입니다. 열람 권한을 확인하세요.",
    closable: true,
  },
};

export const SaveTemporarily: Story = {
  args: {
    type: "saveTemporarily",
    children: "임시 저장된 문서가 있습니다.",
    closable: true,
  },
};

export const Expanded: Story = {
  args: {
    type: "info",
    title: "알림 제목",
    children: "이것은 확장된 알림입니다. 제목과 본문이 분리됩니다.",
    closable: true,
  },
};

export const Small: Story = {
  args: {
    type: "info",
    size: "small",
    children: "작은 사이즈 알림입니다.",
    closable: true,
  },
};

export const WithTextButton: Story = {
  args: {
    type: "info",
    children: "중요! 이것은 기본 알림입니다. 확인해주세요!",
    textButton: { label: "자세히 보기", onClick: () => alert("clicked") },
  },
};

export const WithActionButtons: Story = {
  args: {
    type: "confirm",
    title: "의견 검토 중",
    children: "의견 검토 중 (검토자 : 강팀장, 권팀장, 김팀장, 문팀장, 박팀장)",
    actions: [
      { label: "승인", intent: "primary", onClick: () => alert("승인") },
      { label: "반려", intent: "warning", onClick: () => alert("반려") },
    ],
  },
};

export const NoDismiss: Story = {
  args: {
    type: "info",
    children: "닫기 버튼이 없는 알림입니다.",
    closable: false,
  },
};
