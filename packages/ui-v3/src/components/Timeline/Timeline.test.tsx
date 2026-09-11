import { describe, it, expect } from "vitest";
import { render, screen } from "../../test/utils";
import { Timeline } from ".";

const items = [
  { id: "1", date: "2026. 6. 12.", title: "소장 접수", status: "done" as const },
  { id: "2", date: "2026. 7. 30.", title: "답변서 제출", description: "피고 대리인 김앤장", status: "done" as const },
  { id: "3", date: "2026. 9. 15.", title: "1차 변론기일", status: "current" as const },
  { id: "4", title: "2차 변론기일", status: "upcoming" as const },
];

describe("Timeline", () => {
  it("renders an ordered list with one listitem per item", () => {
    render(<Timeline items={items} />);
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
  });

  it("renders title/date/description", () => {
    render(<Timeline items={items} />);
    expect(screen.getByText("소장 접수")).toBeInTheDocument();
    expect(screen.getByText("2026. 7. 30.")).toBeInTheDocument();
    expect(screen.getByText("피고 대리인 김앤장")).toBeInTheDocument();
  });

  it("statuses produce distinct dot classNames", () => {
    const { container } = render(<Timeline items={items} />);
    const dots = container.querySelectorAll("[data-timeline-dot]");
    expect(dots).toHaveLength(4);
    const classes = [dots[0].className, dots[2].className, dots[3].className];
    expect(new Set(classes).size).toBe(3);
  });

  it("last item has no connector", () => {
    const { container } = render(<Timeline items={items} />);
    const connectors = container.querySelectorAll("[data-timeline-connector]");
    expect(connectors).toHaveLength(items.length - 1);
  });

  it("renders ReactNode title (custom content)", () => {
    render(<Timeline items={[{ id: "1", title: <strong>커스텀</strong> }]} />);
    expect(screen.getByText("커스텀")).toBeInTheDocument();
  });

  it("merges custom className, forwards attributes", () => {
    render(<Timeline items={items} className="extra" data-testid="timeline" />);
    expect(screen.getByTestId("timeline").className).toContain("extra");
  });
});
