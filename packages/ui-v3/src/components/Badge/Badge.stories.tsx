import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Badge } from ".";

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

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  args: {
    children: "Label",
    variant: "filled",
    tone: "primary"
  },
  decorators: [
    Story => (
      <div className={lightThemeClass} style={{ padding: "24px", background: "#f4f6fb" }}>
        <Story />
      </div>
    )
  ],
  tags: ["autodocs"]
};

export default meta;

type Story = StoryObj<typeof meta>;

export const TemplateCode: Story = {
  name: "Template Code",
  parameters: {
    docs: {
      source: {
        code: `import { Badge } from "@lds/ui-v3";

// 기본 (filled / primary)
<Badge>Label</Badge>

// 변형
<Badge variant="outline">Outline</Badge>
<Badge variant="muted" tone="neutral">Muted</Badge>

// 아이콘 + 닫기 버튼
<Badge leadingIcon={<MyIcon />}>아이콘</Badge>
<Badge dismissible onDismiss={handleDismiss}>닫기 가능</Badge>

// 아이콘 전용
<Badge iconOnly leadingIcon={<MyIcon />} aria-label="알림" />`
      }
    }
  }
};

export const Filled: Story = {
  parameters: {
    ...withCode(
      `import { Badge } from "@lds/ui-v3";

export function Example() {
  return <Badge>Label</Badge>;
}`,
      "Filled badge like the Zeplin basic label."
    )
  }
};

export const Outline: Story = {
  args: {
    variant: "outline"
  },
  parameters: {
    ...withCode(
      `import { Badge } from "@lds/ui-v3";

export function Example() {
  return <Badge variant="outline">Label</Badge>;
}`,
      "Outline badge."
    )
  }
};

export const Muted: Story = {
  args: {
    variant: "muted",
    tone: "neutral"
  },
  parameters: {
    ...withCode(
      `import { Badge } from "@lds/ui-v3";

export function Example() {
  return (
    <Badge variant="muted" tone="neutral">
      Label
    </Badge>
  );
}`,
      "Muted badge for low-emphasis state."
    )
  }
};

export const WithIcon: Story = {
  args: {
    leadingIcon: "✦"
  },
  parameters: {
    ...withCode(
      `import { Badge } from "@lds/ui-v3";

export function Example() {
  return <Badge leadingIcon="✦">Label</Badge>;
}`,
      "Badge with leading icon."
    )
  }
};

export const Dismissible: Story = {
  args: {
    variant: "outline",
    dismissible: true
  },
  parameters: {
    ...withCode(
      `import { Badge } from "@lds/ui-v3";

export function Example() {
  return (
    <Badge variant="outline" dismissible>
      Label
    </Badge>
  );
}`,
      "Dismissible badge chip."
    )
  }
};

export const IconOnly: Story = {
  args: {
    iconOnly: true,
    leadingIcon: "A",
    "aria-label": "Alphabet badge"
  },
  parameters: {
    ...withCode(
      `import { Badge } from "@lds/ui-v3";

export function Example() {
  return <Badge iconOnly leadingIcon="A" aria-label="Alphabet badge" />;
}`,
      "Compact icon-only badge."
    )
  }
};
