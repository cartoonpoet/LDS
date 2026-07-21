import { semanticColorRoles, grayPalette } from "@lds/tokens";

export type Swatch = { label: string; color: string; value: string };

export type TextStyleValue = {
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing: string;
};

export type BrandPresetInput = {
  color?: { accentPrimary?: string; accentPrimaryHover?: string; accentPrimaryActive?: string };
};

export function SectionTitle({ children }: { children: string }) {
  return (
    <h3 style={{ fontSize: 16, fontWeight: 700, color: semanticColorRoles.text.heading, margin: "32px 0 16px" }}>
      {children}
    </h3>
  );
}

export function ColorSwatchRow({ name, swatches }: { name: string; swatches: Swatch[] }) {
  return (
    <div style={{ display: "flex", marginBottom: 20 }}>
      <div style={{ width: 220, fontSize: 13, fontFamily: "monospace", color: semanticColorRoles.text.heading, paddingTop: 8 }}>
        {name}
      </div>
      <div style={{ display: "flex", flex: 1, gap: 1 }}>
        {swatches.map((s) => (
          <div key={s.label} style={{ flex: 1 }}>
            <div style={{ height: 48, backgroundColor: s.color, border: `1px solid ${grayPalette[200]}` }} />
            <div style={{ fontSize: 11, color: semanticColorRoles.text.tertiary, padding: "4px 0", textAlign: "center" }}>
              <div>{s.label}</div>
              <div style={{ fontFamily: "monospace" }}>{s.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PaletteStrip({ name, steps }: { name: string; steps: { key: string; value: string }[] }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 13, fontFamily: "monospace", color: semanticColorRoles.text.heading, marginBottom: 4 }}>{name}</div>
      <div style={{ display: "flex", gap: 1 }}>
        {steps.map((s) => (
          <div key={s.key} style={{ flex: 1 }}>
            <div style={{ height: 40, backgroundColor: s.value, border: `1px solid ${grayPalette[200]}` }} />
            <div style={{ fontSize: 10, color: semanticColorRoles.text.tertiary, textAlign: "center", padding: "4px 0" }}>
              <div>{s.key}</div>
              <div style={{ fontFamily: "monospace" }}>{s.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PresetRow({
  name,
  preset,
  fallback,
}: {
  name: string;
  preset: BrandPresetInput;
  fallback: { accentPrimary: string; accentPrimaryHover: string; accentPrimaryActive: string };
}) {
  const primary = preset.color?.accentPrimary ?? fallback.accentPrimary;
  const hover = preset.color?.accentPrimaryHover ?? fallback.accentPrimaryHover;
  const active = preset.color?.accentPrimaryActive ?? fallback.accentPrimaryActive;
  const states = [
    { label: "default", color: primary },
    { label: "hover", color: hover },
    { label: "active", color: active },
  ];
  return (
    <div style={{ display: "flex", alignItems: "flex-start", marginBottom: 16 }}>
      <div style={{ width: 160, fontSize: 14, color: semanticColorRoles.text.heading, paddingTop: 8 }}>{name}</div>
      <div style={{ display: "flex", gap: 1 }}>
        {states.map((s) => (
          <div key={s.label} style={{ width: 100 }}>
            <div style={{ height: 40, backgroundColor: s.color, border: `1px solid ${grayPalette[200]}` }} />
            <div style={{ fontSize: 11, color: semanticColorRoles.text.tertiary, textAlign: "center", padding: "4px 0" }}>
              <div>{s.label}</div>
              <div style={{ fontFamily: "monospace" }}>{s.color}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ScaleTable({ title, rows }: { title: string; rows: { key: string; value: string }[] }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h4 style={{ fontSize: 13, fontWeight: 700, color: semanticColorRoles.text.heading, margin: "0 0 8px" }}>{title}</h4>
      <table style={{ borderCollapse: "collapse", fontSize: 12, color: grayPalette[800] }}>
        <tbody>
          {rows.map((r) => (
            <tr key={r.key}>
              <td style={{ padding: "2px 12px 2px 0", fontFamily: "monospace" }}>{r.key}</td>
              <td style={{ padding: "2px 0", fontFamily: "monospace" }}>{r.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TextSpecimenRow({ name, value }: { name: string; value: TextStyleValue }) {
  return (
    <div style={{ display: "flex", alignItems: "center", borderBottom: `1px solid ${grayPalette[200]}`, padding: "12px 0" }}>
      <div style={{ width: 220, flexShrink: 0 }}>
        <div style={{ fontSize: 13, fontFamily: "monospace", color: semanticColorRoles.text.heading }}>{name}</div>
        <div style={{ fontSize: 11, color: semanticColorRoles.text.tertiary }}>
          {value.fontSize} · {value.fontWeight} · lh {value.lineHeight} · ls {value.letterSpacing}
        </div>
      </div>
      <div
        style={{
          fontFamily: value.fontFamily,
          fontSize: value.fontSize,
          fontWeight: value.fontWeight,
          lineHeight: value.lineHeight,
          letterSpacing: value.letterSpacing,
          color: semanticColorRoles.text.heading,
        }}
      >
        Law Design System 컴포넌트 라이브러리
      </div>
    </div>
  );
}

export function TextStyleSection({ title, styles }: { title: string; styles: Record<string, TextStyleValue> }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <SectionTitle>{title}</SectionTitle>
      {Object.entries(styles).map(([key, value]) => (
        <TextSpecimenRow key={key} name={key} value={value} />
      ))}
    </div>
  );
}

export function SpacingBar({ name, value }: { name: string; value: string }) {
  const px = parseFloat(value);
  const barWidth = px * 4;
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
      <div style={{ width: 60, fontSize: 13, fontFamily: "monospace", color: semanticColorRoles.text.heading }}>
        {name}
      </div>
      <div
        data-testid="spacing-bar"
        style={{ height: 16, width: barWidth, backgroundColor: semanticColorRoles.action.primary.default }}
      />
      <div style={{ marginLeft: 12, fontSize: 12, fontFamily: "monospace", color: semanticColorRoles.text.tertiary }}>
        {value}
      </div>
    </div>
  );
}

export function RadiusSwatch({ name, value }: { name: string; value: string }) {
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", marginRight: 24 }}>
      <div
        data-testid="radius-swatch"
        style={{ width: 48, height: 48, borderRadius: value, backgroundColor: semanticColorRoles.action.primary.default }}
      />
      <div style={{ fontSize: 12, color: semanticColorRoles.text.heading, marginTop: 8, fontFamily: "monospace" }}>
        {name}
      </div>
      <div style={{ fontSize: 11, color: semanticColorRoles.text.tertiary, fontFamily: "monospace" }}>{value}</div>
    </div>
  );
}

export function ShadowSwatch({ name, value }: { name: string; value: string }) {
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", marginRight: 32, padding: 16 }}>
      <div
        data-testid="shadow-swatch"
        style={{ width: 64, height: 64, backgroundColor: semanticColorRoles.surface.canvas, boxShadow: value }}
      />
      <div style={{ fontSize: 12, color: semanticColorRoles.text.heading, marginTop: 16, fontFamily: "monospace" }}>
        {name}
      </div>
      <div
        style={{
          fontSize: 10,
          color: semanticColorRoles.text.tertiary,
          fontFamily: "monospace",
          textAlign: "center",
          maxWidth: 160,
        }}
      >
        {value}
      </div>
    </div>
  );
}
