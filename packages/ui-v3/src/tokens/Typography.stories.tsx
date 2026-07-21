import type { Meta, StoryObj } from "@storybook/react";
import {
  lightThemeClass,
  semanticColorRoles,
  fontSizeScale,
  fontWeightScale,
  lineHeightScale,
  letterSpacingScale,
  textStyles,
} from "@lds/tokens";
import { SectionTitle, ScaleTable, TextStyleSection } from "./docHelpers";

/* ─── Foundation Scale 데이터 ─── */

const toRows = (scale: Record<string, string>) =>
  Object.entries(scale).map(([key, value]) => ({ key, value }));

const fontSizeRows = toRows(fontSizeScale);
const fontWeightRows = toRows(fontWeightScale);
const lineHeightRows = toRows(lineHeightScale);
const letterSpacingRows = toRows(letterSpacingScale);

/* ─── Meta ─── */

/**
 * ## Typography
 *
 * LDS는 기본 UI 폰트로 **Pretendard**를 사용하고, 문서 뷰어·메일 컨텍스트에서는 **Malgun Gothic**을 사용합니다.
 * `textStyles`에 정의된 14개 카테고리(display, heading, appTitle, appLabel, appBody, bodyParagraph, input,
 * placeholder, label, button, menu, table, viewer, mail)를 실제 스타일이 적용된 텍스트로 확인할 수 있습니다.
 */
const meta: Meta = {
  title: "Tokens/Typography",
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

export const Overview: Story = {
  render: () => (
    <div>
      <p style={{ fontSize: 13, color: semanticColorRoles.text.tertiary, marginBottom: 24 }}>
        기본 UI 폰트: <strong>Pretendard</strong> · 뷰어/메일 전용: <strong>Malgun Gothic</strong>
      </p>
      <SectionTitle>Foundation Scale</SectionTitle>
      <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
        <ScaleTable title="fontSize" rows={fontSizeRows} />
        <ScaleTable title="fontWeight" rows={fontWeightRows} />
        <ScaleTable title="lineHeight" rows={lineHeightRows} />
        <ScaleTable title="letterSpacing" rows={letterSpacingRows} />
      </div>
    </div>
  ),
};

export const Display: Story = {
  render: () => <TextStyleSection title="Display" styles={textStyles.display} />,
};

export const Heading: Story = {
  render: () => <TextStyleSection title="Heading" styles={textStyles.heading} />,
};

export const AppTitle: Story = {
  render: () => <TextStyleSection title="App Title" styles={textStyles.appTitle} />,
};

export const AppLabel: Story = {
  render: () => <TextStyleSection title="App Label" styles={textStyles.appLabel} />,
};

export const AppBody: Story = {
  render: () => <TextStyleSection title="App Body" styles={textStyles.appBody} />,
};

export const BodyParagraph: Story = {
  render: () => <TextStyleSection title="Body Paragraph" styles={textStyles.bodyParagraph} />,
};

export const Input: Story = {
  render: () => <TextStyleSection title="Input" styles={textStyles.input} />,
};

export const Placeholder: Story = {
  render: () => <TextStyleSection title="Placeholder" styles={textStyles.placeholder} />,
};

export const Label: Story = {
  render: () => <TextStyleSection title="Label" styles={textStyles.label} />,
};

export const Button: Story = {
  render: () => <TextStyleSection title="Button" styles={textStyles.button} />,
};

export const Menu: Story = {
  render: () => <TextStyleSection title="Menu" styles={textStyles.menu} />,
};

export const Table: Story = {
  render: () => <TextStyleSection title="Table" styles={textStyles.table} />,
};

export const Viewer: Story = {
  render: () => <TextStyleSection title="Viewer" styles={textStyles.viewer} />,
};

export const Mail: Story = {
  render: () => <TextStyleSection title="Mail" styles={textStyles.mail} />,
};
