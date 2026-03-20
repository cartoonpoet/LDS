import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Toast, ToastContainer } from ".";

/**
 * **Toast** — 알림 토스트 메시지
 *
 * ### 사용법
 * ```tsx
 * import { Toast, ToastContainer } from "@lds/ui-v3";
 *
 * // 1-row
 * <Toast title="Toast Title" intent="info" onClose={() => {}} />
 *
 * // 2-row + progress
 * <Toast
 *   title="Toast Title"
 *   time="11 mins ago"
 *   description="상세 설명 텍스트"
 *   showProgress
 *   progress={67}
 *   intent="info"
 *   onClose={() => {}}
 * />
 *
 * // Container로 위치 지정
 * <ToastContainer position="top-right">
 *   <Toast title="알림" intent="success" />
 * </ToastContainer>
 * ```
 */
const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
  decorators: [
    (Story) => (
      <div className={lightThemeClass} style={{ padding: 24, backgroundColor: "#f2f4f6" }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    intent: {
      control: "select",
      options: ["info", "success", "warning", "error"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

/** 1줄 (제목만) */
export const OneRow: Story = {
  args: {
    title: "Toast Title",
    intent: "info",
    duration: 0,
  },
  render: (args) => <Toast {...args} onClose={() => alert("close")} />,
};

/** 2줄 (제목 + 설명) */
export const TwoRow: Story = {
  args: {
    title: "Toast Title",
    time: "11 mins ago",
    description:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
    intent: "info",
    duration: 0,
  },
  render: (args) => <Toast {...args} onClose={() => alert("close")} />,
};

/** 1줄 + 프로그레스 바 */
export const OneRowWithProgress: Story = {
  args: {
    title: "Toast Title",
    intent: "info",
    showProgress: true,
    progress: 67,
    duration: 0,
  },
  render: (args) => <Toast {...args} onClose={() => alert("close")} />,
};

/** 2줄 + 프로그레스 바 */
export const TwoRowWithProgress: Story = {
  args: {
    title: "Toast Title",
    time: "11 mins ago",
    description:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
    intent: "info",
    showProgress: true,
    progress: 67,
    duration: 0,
  },
  render: (args) => <Toast {...args} onClose={() => alert("close")} />,
};

/** Intent 비교 */
export const Intents: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Toast title="Info Toast" intent="info" duration={0} onClose={() => {}} />
      <Toast title="Success Toast" intent="success" duration={0} onClose={() => {}} />
      <Toast title="Warning Toast" intent="warning" duration={0} onClose={() => {}} />
      <Toast title="Error Toast" intent="error" duration={0} onClose={() => {}} />
    </div>
  ),
};

/** 인터랙티브 — 추가/삭제 */
export const Interactive: Story = {
  render: () => {
    const [toasts, setToasts] = useState<
      { id: number; title: string; intent: "info" | "success" | "warning" | "error" }[]
    >([]);

    let nextId = 0;
    const add = (intent: "info" | "success" | "warning" | "error") => {
      const id = Date.now();
      setToasts((prev) => [
        ...prev,
        { id, title: `${intent.charAt(0).toUpperCase() + intent.slice(1)} Toast`, intent },
      ]);
    };
    const remove = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id));

    return (
      <div>
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <button type="button" onClick={() => add("info")}>Info</button>
          <button type="button" onClick={() => add("success")}>Success</button>
          <button type="button" onClick={() => add("warning")}>Warning</button>
          <button type="button" onClick={() => add("error")}>Error</button>
        </div>
        <ToastContainer position="top-right">
          {toasts.map((t) => (
            <Toast
              key={t.id}
              title={t.title}
              intent={t.intent}
              duration={5000}
              onClose={() => remove(t.id)}
            />
          ))}
        </ToastContainer>
      </div>
    );
  },
};
