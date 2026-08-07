import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Chip } from ".";

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

const meta: Meta<typeof Chip> = {
  title: "Components/Chip",
  component: Chip,
  args: {
    children: "Option 1"
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
        code: `import { Chip } from "@lds/ui-v3";

// 기본
<Chip>Option 1</Chip>

// 선택 표시 (체크형)
<Chip checkable selected>선택됨</Chip>

// 삭제 가능
<Chip dismissible onDismiss={handleDismiss}>필터</Chip>

// 아이콘 포함
<Chip leadingIcon={<MyIcon />}>아이콘</Chip>`
      }
    }
  }
};

export const Basic: Story = {
  parameters: {
    ...withCode(
      `import { Chip } from "@lds/ui-v3";

export function Example() {
  return <Chip>Option 1</Chip>;
}`,
      "Basic chip."
    )
  }
};

export const SelectedCheck: Story = {
  args: {
    checkable: true,
    selected: true
  },
  parameters: {
    ...withCode(
      `import { Chip } from "@lds/ui-v3";

export function Example() {
  return (
    <Chip checkable selected>
      Option 1
    </Chip>
  );
}`,
      "Check-type chip."
    )
  }
};

export const Dismissible: Story = {
  args: {
    dismissible: true
  },
  parameters: {
    ...withCode(
      `import { Chip } from "@lds/ui-v3";

export function Example() {
  return <Chip dismissible>Option 1</Chip>;
}`,
      "Dismissible chip."
    )
  }
};
