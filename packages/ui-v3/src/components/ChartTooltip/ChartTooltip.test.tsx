import { describe, it, expect } from "vitest";
import { renderWithUser, screen } from "../../test/utils";
import { ChartTooltip } from ".";

describe("ChartTooltip", () => {
  it("renders header and items", () => {
    renderWithUser(
      <ChartTooltip
        header="March"
        items={[
          { label: "Sales", value: "100", color: "#ff0000" },
          { label: "Profit", value: "50", color: "#00ff00" },
        ]}
      />,
    );
    expect(screen.getByText("March")).toBeInTheDocument();
    expect(screen.getByText("Sales")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("Profit")).toBeInTheDocument();
  });

  it("renders pie variant without header", () => {
    renderWithUser(
      <ChartTooltip
        variant="pie"
        items={[{ label: "Slice A", value: "60%" }]}
      />,
    );
    expect(screen.getByText("Slice A")).toBeInTheDocument();
    expect(screen.getByText("60%")).toBeInTheDocument();
  });
});
