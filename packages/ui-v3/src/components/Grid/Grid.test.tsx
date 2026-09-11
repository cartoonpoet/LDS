import { describe, it, expect } from "vitest";
import { render, screen } from "../../test/utils";
import { themeVars } from "@lds/tokens";
import { Grid } from ".";

describe("Grid", () => {
  it("renders children in a div", () => {
    const { container } = render(<Grid><span>a</span><span>b</span></Grid>);
    expect(screen.getByText("a")).toBeInTheDocument();
    expect(container.firstChild?.nodeName).toBe("DIV");
  });

  it("applies columns as repeat template", () => {
    const { container } = render(<Grid columns={3}>x</Grid>);
    expect((container.firstChild as HTMLElement).style.gridTemplateColumns).toBe(
      "repeat(3, minmax(0, 1fr))"
    );
  });

  it("defaults to 1 column", () => {
    const { container } = render(<Grid>x</Grid>);
    expect((container.firstChild as HTMLElement).style.gridTemplateColumns).toBe(
      "repeat(1, minmax(0, 1fr))"
    );
  });

  it("applies gap token", () => {
    const { container } = render(<Grid gap="x3">x</Grid>);
    expect((container.firstChild as HTMLElement).style.gap).toBe(themeVars.spacing.x3);
  });

  it("rowGap/columnGap override gap", () => {
    const { container } = render(<Grid gap="x2" rowGap="x5" columnGap="x1">x</Grid>);
    const el = container.firstChild as HTMLElement;
    expect(el.style.rowGap).toBe(themeVars.spacing.x5);
    expect(el.style.columnGap).toBe(themeVars.spacing.x1);
  });

  it("merges custom className and style", () => {
    const { container } = render(
      <Grid columns={2} className="extra" style={{ width: "300px" }}>x</Grid>
    );
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("extra");
    expect(el.style.width).toBe("300px");
  });

  it("forwards data-testid", () => {
    render(<Grid data-testid="grid">x</Grid>);
    expect(screen.getByTestId("grid")).toBeInTheDocument();
  });
});
