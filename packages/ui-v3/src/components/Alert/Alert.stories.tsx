import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Alert } from ".";

const withCode = (code: string, description: string) => ({
  docs: {
    description: {
      story: description
    },
    source: {
      code
    }
  }
});

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "LDS 행형 알림 컴포넌트입니다. A안 재구축 규칙에 맞춰 type / size / layout / action 축을 분리했습니다.\n\n현재 1차 기준점은 `Info + Medium + Default + xButton(true) + textButton(false) + button(false)` 조합이며, 나머지 축은 같은 구조에서 확장할 수 있도록 정리했습니다.\n\n기본 아이콘은 새로 정리한 `Icon` registry를 통해 연결되며, Alert type(`info`, `confirm`, `saveTemporarily`, `secret`)에 맞춰 source SVG를 semantic color 기반으로 렌더링합니다."
      }
    }
  },
  args: {
    type: "info",
    size: "medium",
    layout: "default",
    title: "중요!",
    children: "이것은 기본 알림입니다. 확인해주세요!",
    showCloseButton: true,
    button: false,
    textButton: false
  },
  decorators: [
    Story => (
      <div className={lightThemeClass} style={{ padding: "24px", width: "560px", background: "#f4f6fb" }}>
        <Story />
      </div>
    )
  ]
};

export default meta;

type Story = StoryObj<typeof meta>;

export const InfoMediumDefaultX: Story = {
  name: "Info / Medium / Default / X",
  parameters: {
    ...withCode(
      `import { Alert } from "@lds/ui-v3";

export function Example() {
  return (
    <Alert
      type="info"
      size="medium"
      layout="default"
      title="중요!"
      showCloseButton
    >
      이것은 기본 알림입니다. 확인해주세요!
    </Alert>
  );
}`,
      "사용자 CSS 기준 1차 타깃 조합입니다. 버튼 없이 닫기 버튼만 노출합니다."
    )
  }
};

export const SaveTemporarilySmall: Story = {
  args: {
    type: "saveTemporarily",
    size: "small",
    title: "임시저장",
    children: "지금 상태로 저장되었습니다.",
    showCloseButton: false
  },
  parameters: {
    ...withCode(
      `import { Alert } from "@lds/ui-v3";

export function Example() {
  return (
    <Alert type="saveTemporarily" size="small" title="임시저장">
      지금 상태로 저장되었습니다.
    </Alert>
  );
}`,
      "작은 크기의 저장 상태 알림 예시입니다."
    )
  }
};

export const AlertTypeIconMatrix: Story = {
  name: "Alert type icon matrix",
  render: () => (
    <div style={{ display: "grid", gap: "12px" }}>
      <Alert type="info" title="안내">기본 안내 아이콘 연결</Alert>
      <Alert type="confirm" title="확인">체크 아이콘 연결</Alert>
      <Alert type="saveTemporarily" title="임시저장">저장 아이콘 연결</Alert>
      <Alert type="secret" title="보안">잠금 아이콘 연결</Alert>
    </div>
  ),
  parameters: {
    ...withCode(
      `import { Alert } from "@lds/ui-v3";

export function Example() {
  return (
    <>
      <Alert type="info" title="안내">기본 안내 아이콘 연결</Alert>
      <Alert type="confirm" title="확인">체크 아이콘 연결</Alert>
      <Alert type="saveTemporarily" title="임시저장">저장 아이콘 연결</Alert>
      <Alert type="secret" title="보안">잠금 아이콘 연결</Alert>
    </>
  );
}`,
      "Alert type별 기본 SVG 아이콘 매핑을 빠르게 확인하는 문서용 matrix입니다."
    )
  }
};

export const ConfirmExpandedWithActions: Story = {
  args: {
    type: "confirm",
    layout: "expanded",
    title: "의견 검토 중",
    children: "검토 상태를 확인하고 필요한 조치를 진행해주세요.",
    button: true,
    action: {
      label: "승인"
    },
    secondaryAction: {
      label: "반려",
      tone: "warning"
    },
    showCloseButton: true
  },
  parameters: {
    ...withCode(
      `import { Alert } from "@lds/ui-v3";

export function Example() {
  return (
    <Alert
      type="confirm"
      layout="expanded"
      title="의견 검토 중"
      button
      action={{ label: "승인" }}
      secondaryAction={{ label: "반려", tone: "warning" }}
      showCloseButton
    >
      검토 상태를 확인하고 필요한 조치를 진행해주세요.
    </Alert>
  );
}`,
      "확장 레이아웃에서 CTA를 함께 배치하는 구조입니다."
    )
  }
};
