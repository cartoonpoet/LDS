import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Button } from "../Button";
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
    title: "Notice",
    children: "This is a base alert message."
  },
  decorators: [
    Story => (
      <div className={lightThemeClass} style={{ padding: "24px", width: "480px", background: "#f4f6fb" }}>
        <Story />
      </div>
    )
  ]
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Info: Story = {
  parameters: {
    ...withCode(
      `import { Alert } from "@lds/ui-v3";

export function Example() {
  return <Alert title="Notice">This is a base alert message.</Alert>;
}`,
      "Informational alert."
    )
  }
};

export const Warning: Story = {
  args: {
    tone: "warning",
    title: "Review Required",
    children: "This contract needs another review before approval."
  },
  parameters: {
    ...withCode(
      `import { Alert } from "@lds/ui-v3";

export function Example() {
  return (
    <Alert tone="warning" title="Review Required">
      This contract needs another review before approval.
    </Alert>
  );
}`,
      "Warning alert."
    )
  }
};

export const WithAction: Story = {
  args: {
    title: "Pending Approval",
    children: "The document is waiting for final approval.",
    action: <Button size="sm">Approve</Button>
  },
  parameters: {
    ...withCode(
      `import { Alert, Button } from "@lds/ui-v3";

export function Example() {
  return (
    <Alert
      title="Pending Approval"
      action={<Button size="sm">Approve</Button>}
    >
      The document is waiting for final approval.
    </Alert>
  );
}`,
      "Alert with action."
    )
  }
};

export const Dismissible: Story = {
  args: {
    dismissible: true,
    tone: "neutral",
    title: "Saved",
    children: "Draft saved successfully."
  },
  parameters: {
    ...withCode(
      `import { Alert } from "@lds/ui-v3";

export function Example() {
  return (
    <Alert dismissible title="Saved" tone="neutral">
      Draft saved successfully.
    </Alert>
  );
}`,
      "Dismissible alert."
    )
  }
};
