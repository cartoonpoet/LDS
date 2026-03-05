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
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "LDS 칩 컴포넌트입니다. basic/check/file/link 타입을 제공하고 dismissible 상호작용을 지원합니다."
      }
    }
  },
  args: {
    children: "Option 1"
  },
  decorators: [
    Story => (
      <div className={lightThemeClass} style={{ padding: "24px", background: "#f4f6fb" }}>
        <Story />
      </div>
    )
  ]
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  parameters: {
    ...withCode(
      `import { Chip } from "@lds/ui-v3";

export function Example() {
  return <Chip kind="basic">Option 1</Chip>;
}`,
      "Basic option chip."
    )
  }
};

export const Check: Story = {
  args: {
    kind: "check",
    selected: true
  },
  parameters: {
    ...withCode(
      `import { Chip } from "@lds/ui-v3";

export function Example() {
  return (
    <Chip kind="check" selected>
      Option 1
    </Chip>
  );
}`,
      "Check-type chip from the Zeplin sheet."
    )
  }
};

export const File: Story = {
  args: {
    kind: "file",
    leadingIcon: "□",
    children: "Document_file_name.pdf",
    metaText: "검토중",
    dismissible: true
  },
  parameters: {
    ...withCode(
      `import { Chip } from "@lds/ui-v3";

export function Example() {
  return (
    <Chip
      kind="file"
      leadingIcon="□"
      metaText="검토중"
      dismissible
    >
      Document_file_name.pdf
    </Chip>
  );
}`,
      "Document file chip."
    )
  }
};

export const Link: Story = {
  args: {
    kind: "link",
    leadingIcon: "↗",
    children: "Linked document name",
    metaText: "외부 링크"
  },
  parameters: {
    ...withCode(
      `import { Chip } from "@lds/ui-v3";

export function Example() {
  return (
    <Chip
      kind="link"
      leadingIcon="↗"
      metaText="외부 링크"
    >
      Linked document name
    </Chip>
  );
}`,
      "Linked document chip."
    )
  }
};

export const Dismissible: Story = {
  args: {
    kind: "basic",
    dismissible: true
  },
  parameters: {
    ...withCode(
      `import { Chip } from "@lds/ui-v3";

export function Example() {
  return (
    <Chip kind="basic" dismissible>
      Option 1
    </Chip>
  );
}`,
      "Dismissible basic chip."
    )
  }
};
