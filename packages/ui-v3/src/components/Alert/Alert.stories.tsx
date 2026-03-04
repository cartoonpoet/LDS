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
  args: {
    title: "중요!",
    children: "이것은 기본 알림입니다. 확인해주세요!"
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

export const InlineInfo: Story = {
  parameters: {
    ...withCode(
      `import { Alert } from "@lds/ui-v3";

export function Example() {
  return (
    <Alert title="중요!">
      이것은 기본 알림입니다. 확인해주세요!
    </Alert>
  );
}`,
      "Thin inline info alert based on the Zeplin sheet."
    )
  }
};

export const NeutralRow: Story = {
  args: {
    tone: "neutral",
    icon: "✓",
    title: "임시저장"
  },
  parameters: {
    ...withCode(
      `import { Alert } from "@lds/ui-v3";

export function Example() {
  return <Alert tone="neutral" icon="✓" title="임시저장" />;
}`,
      "Neutral row alert."
    )
  }
};

export const WithButtons: Story = {
  args: {
    tone: "neutral",
    icon: "•",
    title: "의견 검토 중",
    children: "검토 상태를 확인해주세요.",
    primaryAction: {
      label: "승인"
    },
    secondaryAction: {
      label: "반려",
      tone: "warning"
    }
  },
  parameters: {
    ...withCode(
      `import { Alert } from "@lds/ui-v3";

export function Example() {
  return (
    <Alert
      tone="neutral"
      icon="•"
      title="의견 검토 중"
      primaryAction={{ label: "승인" }}
      secondaryAction={{ label: "반려", tone: "warning" }}
    >
      검토 상태를 확인해주세요.
    </Alert>
  );
}`,
      "Alert row with action buttons."
    )
  }
};

export const Dismissible: Story = {
  args: {
    dismissible: true
  },
  parameters: {
    ...withCode(
      `import { Alert } from "@lds/ui-v3";

export function Example() {
  return (
    <Alert dismissible title="중요!">
      이것은 기본 알림입니다. 확인해주세요!
    </Alert>
  );
}`,
      "Dismissible inline alert."
    )
  }
};
