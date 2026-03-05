import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Input } from ".";

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

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "LDS 입력 필드 컴포넌트입니다. 상태(success/error), helper text, prefix/suffix를 지원합니다."
      }
    }
  },
  args: {
    label: "Label",
    placeholder: "Enter text"
  },
  decorators: [
    Story => (
      <div className={lightThemeClass} style={{ padding: "24px", width: "320px", background: "#f4f6fb" }}>
        <Story />
      </div>
    )
  ]
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    ...withCode(
      `import { Input } from "@lds/ui-v3";

export function Example() {
  return <Input label="Label" placeholder="Enter text" />;
}`,
      "Default input field."
    )
  }
};

export const Success: Story = {
  args: {
    status: "success",
    helperText: "Looks good.",
    value: "Approved title"
  },
  parameters: {
    ...withCode(
      `import { Input } from "@lds/ui-v3";

export function Example() {
  return (
    <Input
      label="Document Title"
      value="Approved title"
      status="success"
      helperText="Looks good."
    />
  );
}`,
      "Success state input."
    )
  }
};

export const Error: Story = {
  args: {
    status: "error",
    helperText: "This field is required."
  },
  parameters: {
    ...withCode(
      `import { Input } from "@lds/ui-v3";

export function Example() {
  return (
    <Input
      label="Document Title"
      status="error"
      helperText="This field is required."
    />
  );
}`,
      "Error state input."
    )
  }
};

export const WithPrefix: Story = {
  args: {
    label: "Amount",
    prefix: "₩",
    placeholder: "0"
  },
  parameters: {
    ...withCode(
      `import { Input } from "@lds/ui-v3";

export function Example() {
  return <Input label="Amount" prefix="₩" placeholder="0" />;
}`,
      "Input with prefix adornment."
    )
  }
};

export const WithSuffix: Story = {
  args: {
    label: "Reference",
    suffix: ".pdf",
    placeholder: "contract"
  },
  parameters: {
    ...withCode(
      `import { Input } from "@lds/ui-v3";

export function Example() {
  return <Input label="Reference" placeholder="contract" suffix=".pdf" />;
}`,
      "Input with suffix adornment."
    )
  }
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: "Read only"
  },
  parameters: {
    ...withCode(
      `import { Input } from "@lds/ui-v3";

export function Example() {
  return <Input label="Label" value="Read only" disabled />;
}`,
      "Disabled input state."
    )
  }
};

export const UsageTemplate: Story = {
  name: "Usage Template",
  args: {
    label: "Document Title",
    placeholder: "Enter a title"
  },
  parameters: {
    ...withCode(
      `import { Input } from "@lds/ui-v3";

export function Example() {
  return <Input label="Document Title" placeholder="Enter a title" />;
}`,
      "Base input template."
    )
  }
};
