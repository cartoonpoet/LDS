import type { Meta, StoryObj } from "@storybook/react";
import {
  lightThemeClass,
  semanticColorRoles,
  grayPalette,
  bluePalette,
  greenPalette,
  redPalette,
  yellowPalette,
  cyanPalette,
  darkPalette,
  opacityPalette,
  defaultColorTokens,
} from "@lds/tokens";
import { SectionTitle, ColorSwatchRow, PaletteStrip, PresetRow, type Swatch } from "./docHelpers";
import { brandPresets } from "../components/Theming.stories";

/* ─── Semantic Colors 데이터 ─── */
/* value 라벨은 라이트 테마 기본값(defaultColorTokens) 기준 하드코딩 */

const surfaceRows: { name: string; swatches: Swatch[] }[] = [
  { name: "surface.page", swatches: [{ label: "base", color: semanticColorRoles.surface.page, value: "#f2f4f6" }] },
  { name: "surface.canvas", swatches: [{ label: "base", color: semanticColorRoles.surface.canvas, value: "#ffffff" }] },
  { name: "surface.subtle", swatches: [{ label: "base", color: semanticColorRoles.surface.subtle, value: "#f1f4f9" }] },
  { name: "surface.raised", swatches: [{ label: "base", color: semanticColorRoles.surface.raised, value: "#eeeff2" }] },
  { name: "surface.disabled", swatches: [{ label: "base", color: semanticColorRoles.surface.disabled, value: "#eeeff2" }] },
  { name: "surface.tableHeader", swatches: [{ label: "gray.100", color: semanticColorRoles.surface.tableHeader, value: "#f1f4f9" }] },
  { name: "surface.backdrop", swatches: [{ label: "base", color: semanticColorRoles.surface.backdrop, value: "rgba(0, 0, 0, 0.2)" }] },
];

const textRows: { name: string; swatches: Swatch[] }[] = [
  { name: "text.primary", swatches: [{ label: "base", color: semanticColorRoles.text.primary, value: "#000000" }] },
  { name: "text.heading", swatches: [{ label: "base", color: semanticColorRoles.text.heading, value: "#11152a" }] },
  { name: "text.secondary", swatches: [{ label: "base", color: semanticColorRoles.text.secondary, value: "#000000" }] },
  { name: "text.tertiary", swatches: [{ label: "base", color: semanticColorRoles.text.tertiary, value: "#626f86" }] },
  { name: "text.disabled", swatches: [{ label: "base", color: semanticColorRoles.text.disabled, value: "#d1d1d1" }] },
  { name: "text.inverse", swatches: [{ label: "base", color: semanticColorRoles.text.inverse, value: "#ffffff" }] },
  { name: "text.placeholder", swatches: [{ label: "base", color: semanticColorRoles.text.placeholder, value: "#626f86" }] },
];

const borderRows: { name: string; swatches: Swatch[] }[] = [
  { name: "border.subtle", swatches: [{ label: "base", color: semanticColorRoles.border.subtle, value: "#cfd5e1" }] },
  { name: "border.default", swatches: [{ label: "base", color: semanticColorRoles.border.default, value: "#cfd5e1" }] },
  { name: "border.strong", swatches: [{ label: "base", color: semanticColorRoles.border.strong, value: "#9ea7b8" }] },
  { name: "border.focus", swatches: [{ label: "base", color: semanticColorRoles.border.focus, value: "#2151ec" }] },
  { name: "border.input", swatches: [{ label: "gray.500", color: semanticColorRoles.border.input, value: "#9ea7b8" }] },
  { name: "border.primary", swatches: [{ label: "base", color: semanticColorRoles.border.primary, value: "#2151ec" }] },
  { name: "border.secondary", swatches: [{ label: "base", color: semanticColorRoles.border.secondary, value: "#82868b" }] },
  { name: "border.success", swatches: [{ label: "base", color: semanticColorRoles.border.success, value: "#28c76f" }] },
  { name: "border.danger", swatches: [{ label: "base", color: semanticColorRoles.border.danger, value: "#ea5455" }] },
  { name: "border.warning", swatches: [{ label: "base", color: semanticColorRoles.border.warning, value: "#f0af23" }] },
  { name: "border.info", swatches: [{ label: "base", color: semanticColorRoles.border.info, value: "#00cfe8" }] },
  { name: "border.dark", swatches: [{ label: "base", color: semanticColorRoles.border.dark, value: "#4b4b4b" }] },
];

const actionRows: { name: string; swatches: Swatch[] }[] = [
  {
    name: "action.primary",
    swatches: [
      { label: "default", color: semanticColorRoles.action.primary.default, value: "#2151ec" },
      { label: "hover", color: semanticColorRoles.action.primary.hover, value: "#2151ec" },
      { label: "active", color: semanticColorRoles.action.primary.active, value: "#1739a5" },
      { label: "subtle", color: semanticColorRoles.action.primary.subtle, value: "rgba(33, 81, 236, 0.12)" },
      { label: "subtleActive", color: semanticColorRoles.action.primary.subtleActive, value: "rgba(23, 57, 165, 0.12)" },
    ],
  },
  {
    name: "action.secondary",
    swatches: [
      { label: "default", color: semanticColorRoles.action.secondary.default, value: "#82868b" },
      { label: "hover", color: semanticColorRoles.action.secondary.hover, value: "#82868b" },
      { label: "active", color: semanticColorRoles.action.secondary.active, value: "#75797e" },
      { label: "subtle", color: semanticColorRoles.action.secondary.subtle, value: "rgba(130, 134, 139, 0.12)" },
    ],
  },
];

const statusRows: { name: string; swatches: Swatch[] }[] = [
  {
    name: "status.success",
    swatches: [
      { label: "text", color: semanticColorRoles.status.success.text, value: "#006d38" },
      { label: "fill", color: semanticColorRoles.status.success.fill, value: "rgba(39, 194, 129, 0.12)" },
      { label: "border", color: semanticColorRoles.status.success.border, value: "#28c76f" },
    ],
  },
  {
    name: "status.danger",
    swatches: [
      { label: "text", color: semanticColorRoles.status.danger.text, value: "#b12a30" },
      { label: "fill", color: semanticColorRoles.status.danger.fill, value: "rgba(234, 59, 59, 0.12)" },
      { label: "border", color: semanticColorRoles.status.danger.border, value: "#ea5455" },
    ],
  },
  {
    name: "status.warning",
    swatches: [
      { label: "text", color: semanticColorRoles.status.warning.text, value: "#7d5800" },
      { label: "fill", color: semanticColorRoles.status.warning.fill, value: "rgba(240, 175, 35, 0.12)" },
      { label: "border", color: semanticColorRoles.status.warning.border, value: "#f0af23" },
    ],
  },
  {
    name: "status.info",
    swatches: [
      { label: "text", color: semanticColorRoles.status.info.text, value: "#006876" },
      { label: "fill", color: semanticColorRoles.status.info.fill, value: "rgba(0, 207, 232, 0.12)" },
      { label: "border", color: semanticColorRoles.status.info.border, value: "#00cfe8" },
    ],
  },
  {
    name: "status.dark",
    swatches: [
      { label: "text", color: semanticColorRoles.status.dark.text, value: "#343434" },
      { label: "fill", color: semanticColorRoles.status.dark.fill, value: "rgba(76, 84, 105, 0.12)" },
      { label: "border", color: semanticColorRoles.status.dark.border, value: "#4c5469" },
    ],
  },
];

const grayPaletteSteps = Object.entries(grayPalette).map(([key, value]) => ({ key, value }));
const bluePaletteSteps = Object.entries(bluePalette).map(([key, value]) => ({ key, value }));
const greenPaletteSteps = Object.entries(greenPalette).map(([key, value]) => ({ key, value }));
const redPaletteSteps = Object.entries(redPalette).map(([key, value]) => ({ key, value }));
const yellowPaletteSteps = Object.entries(yellowPalette).map(([key, value]) => ({ key, value }));
const cyanPaletteSteps = Object.entries(cyanPalette).map(([key, value]) => ({ key, value }));
const darkPaletteSteps = Object.entries(darkPalette).map(([key, value]) => ({ key, value }));
const opacityPaletteSteps = Object.entries(opacityPalette).map(([key, value]) => ({ key, value }));

/* ─── Meta ─── */

/**
 * ## Colors
 *
 * LDS 컬러 토큰 문서입니다. **Semantic Colors**는 컴포넌트가 공통으로 참조하는 의미 기반 역할(surface/text/border/action/status)이고,
 * **Primitive Colors**는 그 밑단의 원시 팔레트입니다.
 */
const meta: Meta = {
  title: "Tokens/Colors",
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

export const SemanticColors: Story = {
  render: () => (
    <div>
      <SectionTitle>Surface</SectionTitle>
      {surfaceRows.map((r) => (
        <ColorSwatchRow key={r.name} name={r.name} swatches={r.swatches} />
      ))}
      <SectionTitle>Text</SectionTitle>
      {textRows.map((r) => (
        <ColorSwatchRow key={r.name} name={r.name} swatches={r.swatches} />
      ))}
      <SectionTitle>Border</SectionTitle>
      {borderRows.map((r) => (
        <ColorSwatchRow key={r.name} name={r.name} swatches={r.swatches} />
      ))}
      <SectionTitle>Action</SectionTitle>
      {actionRows.map((r) => (
        <ColorSwatchRow key={r.name} name={r.name} swatches={r.swatches} />
      ))}
      <SectionTitle>Status</SectionTitle>
      {statusRows.map((r) => (
        <ColorSwatchRow key={r.name} name={r.name} swatches={r.swatches} />
      ))}
    </div>
  ),
};

export const PrimitiveColors: Story = {
  render: () => (
    <div>
      <PaletteStrip name="grayPalette" steps={grayPaletteSteps} />
      <PaletteStrip name="bluePalette" steps={bluePaletteSteps} />
      <PaletteStrip name="greenPalette" steps={greenPaletteSteps} />
      <PaletteStrip name="redPalette" steps={redPaletteSteps} />
      <PaletteStrip name="yellowPalette" steps={yellowPaletteSteps} />
      <PaletteStrip name="cyanPalette" steps={cyanPaletteSteps} />
      <PaletteStrip name="darkPalette" steps={darkPaletteSteps} />
      <PaletteStrip name="opacityPalette" steps={opacityPaletteSteps} />
    </div>
  ),
};

export const Presets: Story = {
  render: () => (
    <div>
      <p style={{ fontSize: 13, color: "#626f86", marginBottom: 16 }}>
        컴포넌트에 실제 적용된 예시는 <code>Guide/Theming → BrandComparison</code>에서 확인하세요.
      </p>
      {Object.entries(brandPresets).map(([name, preset]) => (
        <PresetRow key={name} name={name} preset={preset} fallback={defaultColorTokens} />
      ))}
    </div>
  ),
};
