import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass, defaultSpacingTokens, defaultRadiusTokens, defaultShadowTokens } from "@lds/tokens";
import { SectionTitle, SpacingBar, RadiusSwatch, ShadowSwatch } from "./docHelpers";

/**
 * ## Layout
 *
 * spacing(`defaultSpacingTokens`) / radius(`defaultRadiusTokens`) / shadow(`defaultShadowTokens`) 토큰을
 * 실제 모양(막대 길이 / 둥근 모서리 박스 / 그림자 박스)으로 확인할 수 있습니다.
 */
const meta: Meta = {
  title: "Tokens/Layout",
  decorators: [
    (Story) => (
      <div className={lightThemeClass} style={{ padding: 24, backgroundColor: "#ffffff" }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Spacing: Story = {
  render: () => (
    <div>
      <SectionTitle>Spacing</SectionTitle>
      {Object.entries(defaultSpacingTokens).map(([key, value]) => (
        <SpacingBar key={key} name={key} value={value} />
      ))}
    </div>
  ),
};

export const Radius: Story = {
  render: () => (
    <div>
      <SectionTitle>Radius</SectionTitle>
      <div style={{ display: "flex" }}>
        {Object.entries(defaultRadiusTokens).map(([key, value]) => (
          <RadiusSwatch key={key} name={key} value={value} />
        ))}
      </div>
    </div>
  ),
};

export const Shadow: Story = {
  render: () => (
    <div>
      <SectionTitle>Shadow</SectionTitle>
      <div style={{ display: "flex" }}>
        {Object.entries(defaultShadowTokens).map(([key, value]) => (
          <ShadowSwatch key={key} name={key} value={value} />
        ))}
      </div>
    </div>
  ),
};
