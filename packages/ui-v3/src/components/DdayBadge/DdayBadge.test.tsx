import { describe, it, expect } from "vitest";
import { render, screen } from "../../test/utils";
import { DdayBadge } from ".";

const TODAY = "2026-09-12";

describe("DdayBadge", () => {
  it.each([
    ["2026-09-12", "D-DAY"],
    ["2026-09-15", "D-3"],
    ["2026-09-19", "D-7"],
    ["2026-10-12", "D-30"],
    ["2026-09-10", "D+2 경과"],
  ])("date=%s renders %s", (date, label) => {
    render(<DdayBadge date={date} today={TODAY} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it("levels produce distinct classNames (dday/danger/warning/neutral/overdue)", () => {
    const dates = ["2026-09-12", "2026-09-14", "2026-09-18", "2026-10-12", "2026-09-01"];
    const classes = dates.map((date) => {
      const { container, unmount } = render(<DdayBadge date={date} today={TODAY} />);
      const cls = (container.firstChild as HTMLElement).className;
      unmount();
      return cls;
    });
    expect(new Set(classes).size).toBe(dates.length);
  });

  it("boundary: 3일은 danger, 4일은 warning, 7일은 warning, 8일은 neutral", () => {
    const cls = (date: string) => {
      const { container, unmount } = render(<DdayBadge date={date} today={TODAY} />);
      const c = (container.firstChild as HTMLElement).className;
      unmount();
      return c;
    };
    expect(cls("2026-09-15")).toBe(cls("2026-09-13"));
    expect(cls("2026-09-15")).not.toBe(cls("2026-09-16"));
    expect(cls("2026-09-16")).toBe(cls("2026-09-19"));
    expect(cls("2026-09-19")).not.toBe(cls("2026-09-20"));
  });

  it("accepts Date objects and time-of-day is ignored (calendar-day diff)", () => {
    render(
      <DdayBadge date={new Date(2026, 8, 15, 23, 59)} today={new Date(2026, 8, 12, 0, 1)} />
    );
    expect(screen.getByText("D-3")).toBeInTheDocument();
  });

  it("renders as span, merges className, forwards attributes", () => {
    render(<DdayBadge date="2026-09-15" today={TODAY} className="extra" data-testid="dday" />);
    const el = screen.getByTestId("dday");
    expect(el.nodeName).toBe("SPAN");
    expect(el.className).toContain("extra");
  });
});
