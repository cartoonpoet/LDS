import { describe, it, expect } from "vitest";
import { renderWithUser, screen } from "../test/utils";
import {
  SectionTitle,
  ColorSwatchRow,
  PaletteStrip,
  PresetRow,
  ScaleTable,
  TextSpecimenRow,
  TextStyleSection,
  SpacingBar,
  RadiusSwatch,
  ShadowSwatch,
} from "./docHelpers";

describe("SectionTitle", () => {
  it("renders the given text as a heading", () => {
    renderWithUser(<SectionTitle>Surface</SectionTitle>);
    expect(screen.getByRole("heading", { name: "Surface" })).toBeInTheDocument();
  });
});

describe("ColorSwatchRow", () => {
  it("renders the token name and every swatch's label and value", () => {
    renderWithUser(
      <ColorSwatchRow
        name="action.primary"
        swatches={[
          { label: "default", color: "#2151ec", value: "#2151ec" },
          { label: "hover", color: "#2151ec", value: "#2151ec" },
        ]}
      />
    );
    expect(screen.getByText("action.primary")).toBeInTheDocument();
    expect(screen.getByText("default")).toBeInTheDocument();
    expect(screen.getByText("hover")).toBeInTheDocument();
    expect(screen.getAllByText("#2151ec")).toHaveLength(2);
  });
});

describe("PaletteStrip", () => {
  it("renders one column per step with its key and value", () => {
    renderWithUser(
      <PaletteStrip
        name="grayPalette"
        steps={[
          { key: "0", value: "#ffffff" },
          { key: "50", value: "#f2f4f6" },
        ]}
      />
    );
    expect(screen.getByText("grayPalette")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.getByText("#ffffff")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();
    expect(screen.getByText("#f2f4f6")).toBeInTheDocument();
  });
});

describe("PresetRow", () => {
  const fallback = {
    accentPrimary: "#2151ec",
    accentPrimaryHover: "#2151ec",
    accentPrimaryActive: "#1739a5",
  };

  it("uses the preset's own colors when provided", () => {
    renderWithUser(
      <PresetRow
        name="Green Brand"
        preset={{ color: { accentPrimary: "#16a34a", accentPrimaryHover: "#15803d", accentPrimaryActive: "#166534" } }}
        fallback={fallback}
      />
    );
    expect(screen.getByText("Green Brand")).toBeInTheDocument();
    expect(screen.getByText("#16a34a")).toBeInTheDocument();
    expect(screen.getByText("#15803d")).toBeInTheDocument();
    expect(screen.getByText("#166534")).toBeInTheDocument();
  });

  it("falls back to the default colors when the preset has no override", () => {
    renderWithUser(<PresetRow name="Law.ai (기본)" preset={{}} fallback={fallback} />);
    expect(screen.getByText("Law.ai (기본)")).toBeInTheDocument();
    expect(screen.getAllByText("#2151ec")).toHaveLength(2);
    expect(screen.getByText("#1739a5")).toBeInTheDocument();
  });
});

describe("ScaleTable", () => {
  it("renders the title and every row's key/value", () => {
    renderWithUser(
      <ScaleTable
        title="fontSize"
        rows={[
          { key: "12", value: "12px" },
          { key: "14", value: "14px" },
        ]}
      />
    );
    expect(screen.getByText("fontSize")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText("12px")).toBeInTheDocument();
  });
});

describe("TextSpecimenRow", () => {
  it("renders the style name, its meta info, and applies the style to the sample text", () => {
    renderWithUser(
      <TextSpecimenRow
        name="h1"
        value={{
          fontFamily: '"Pretendard", sans-serif',
          fontSize: "28px",
          fontWeight: "700",
          lineHeight: "1.21",
          letterSpacing: "normal",
        }}
      />
    );
    expect(screen.getByText("h1")).toBeInTheDocument();
    expect(screen.getByText("28px · 700 · lh 1.21 · ls normal")).toBeInTheDocument();
    const sample = screen.getByText("Law Design System 컴포넌트 라이브러리");
    expect(sample).toHaveStyle({ fontSize: "28px", fontWeight: "700" });
  });
});

describe("TextStyleSection", () => {
  it("renders one specimen row per style key", () => {
    renderWithUser(
      <TextStyleSection
        title="Heading"
        styles={{
          h1: { fontFamily: "Pretendard", fontSize: "28px", fontWeight: "700", lineHeight: "1.21", letterSpacing: "normal" },
          h2: { fontFamily: "Pretendard", fontSize: "24px", fontWeight: "700", lineHeight: "1.21", letterSpacing: "normal" },
        }}
      />
    );
    expect(screen.getByRole("heading", { name: "Heading" })).toBeInTheDocument();
    expect(screen.getByText("h1")).toBeInTheDocument();
    expect(screen.getByText("h2")).toBeInTheDocument();
  });
});

describe("SpacingBar", () => {
  it("renders the name and value, and scales the bar width to 4x the px value", () => {
    renderWithUser(<SpacingBar name="x1" value="4px" />);
    expect(screen.getByText("x1")).toBeInTheDocument();
    expect(screen.getByText("4px")).toBeInTheDocument();
    expect(screen.getByTestId("spacing-bar")).toHaveStyle({ width: "16px" });
  });

  it("scales a larger value to a proportionally wider bar", () => {
    renderWithUser(<SpacingBar name="x6" value="24px" />);
    expect(screen.getByTestId("spacing-bar")).toHaveStyle({ width: "96px" });
  });
});

describe("RadiusSwatch", () => {
  it("renders the name, value, and applies the border-radius to the swatch", () => {
    renderWithUser(<RadiusSwatch name="sm" value="4px" />);
    expect(screen.getByText("sm")).toBeInTheDocument();
    expect(screen.getByText("4px")).toBeInTheDocument();
    expect(screen.getByTestId("radius-swatch")).toHaveStyle({ borderRadius: "4px" });
  });
});

describe("ShadowSwatch", () => {
  it("renders the name, value, and applies the box-shadow to the swatch", () => {
    renderWithUser(<ShadowSwatch name="raised" value="0 6px 16px rgba(17, 24, 39, 0.08)" />);
    expect(screen.getByText("raised")).toBeInTheDocument();
    expect(screen.getByText("0 6px 16px rgba(17, 24, 39, 0.08)")).toBeInTheDocument();
    expect(screen.getByTestId("shadow-swatch")).toHaveStyle({ boxShadow: "0 6px 16px rgba(17, 24, 39, 0.08)" });
  });
});
