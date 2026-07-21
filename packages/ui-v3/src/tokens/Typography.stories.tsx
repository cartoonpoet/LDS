import type { Meta, StoryObj } from "@storybook/react";
import {
  lightThemeClass,
  fontSizeScale,
  fontWeightScale,
  lineHeightScale,
  letterSpacingScale,
  textStyles,
} from "@lds/tokens";
import { SectionTitle, ScaleTable } from "./docHelpers";

/* ─── Foundation Scale 데이터 ─── */

const fontSizeRows = Object.entries(fontSizeScale).map(([key, value]) => ({ key, value }));
const fontWeightRows = Object.entries(fontWeightScale).map(([key, value]) => ({ key, value }));
const lineHeightRows = Object.entries(lineHeightScale).map(([key, value]) => ({ key, value }));
const letterSpacingRows = Object.entries(letterSpacingScale).map(([key, value]) => ({ key, value }));

/* ─── Meta ─── */

/**
 * ## Typography
 *
 * LDS는 기본 UI 폰트로 **Pretendard**를 사용하고, 문서 뷰어·메일 컨텍스트에서는 **Malgun Gothic**을 사용합니다.
 * `textStyles`에 정의된 13개 카테고리(display, heading, appTitle, appLabel, appBody, bodyParagraph, input,
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
      <p style={{ fontSize: 13, color: "#626f86", marginBottom: 24 }}>
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
