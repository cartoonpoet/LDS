import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Icon, iconRegistry } from ".";
import type { IconName } from "./types";

/**
 * ## Icon
 *
 * SVG 아이콘 컴포넌트. `iconRegistry`에 등록된 모든 아이콘을 `name` prop으로 사용합니다.
 *
 * ### Import
 * ```tsx
 * import { Icon } from "@lds/ui-v3";
 * ```
 *
 * ### Template Code
 * ```tsx
 * <Icon name="filePlus" />
 * <Icon name="feather" size="sm" />
 * ```
 */
const meta: Meta<typeof Icon> = {
  title: "Components/Icon",
  component: Icon,
  decorators: [
    (Story) => (
      <div className={lightThemeClass} style={{ padding: 24, backgroundColor: "#f2f4f6" }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "select",
      options: Object.keys(iconRegistry) as IconName[],
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },
  },
};
export default meta;
type Story = StoryObj<typeof Icon>;

/** 단일 아이콘 — Controls 패널에서 name/size 변경 가능 */
export const Single: Story = {
  args: {
    name: "filePlus",
    size: "md",
  },
};

/** 전체 아이콘 갤러리 */
export const Gallery: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
      {(Object.keys(iconRegistry) as IconName[]).map((name) => (
        <div
          key={name}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            width: 80,
          }}
        >
          <Icon name={name} size="md" />
          <span style={{ fontSize: 11, color: "#555", textAlign: "center", wordBreak: "break-all" }}>
            {name}
          </span>
        </div>
      ))}
    </div>
  ),
};

/** sm / md / lg 사이즈 비교 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <Icon name="feather" size={size} />
          <span style={{ fontSize: 12, color: "#555" }}>{size}</span>
        </div>
      ))}
    </div>
  ),
};
