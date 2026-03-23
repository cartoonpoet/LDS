import { describe, it, expect, vi } from "vitest";
import { renderWithUser, screen } from "../../test/utils";
import { Widget, StatCell, StatGrid, QuickMenuItem, ScheduleItem } from ".";

describe("Widget", () => {
  it("renders title", () => {
    renderWithUser(<Widget title="My Widget">content</Widget>);
    expect(screen.getByText("My Widget")).toBeInTheDocument();
  });

  it("renders children", () => {
    renderWithUser(<Widget>body content</Widget>);
    expect(screen.getByText("body content")).toBeInTheDocument();
  });

  it("renders badge", () => {
    renderWithUser(<Widget title="W" badge={<span>3</span>}>body</Widget>);
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("toggles collapse on button click", async () => {
    const onCollapsedChange = vi.fn();
    const { user } = renderWithUser(
      <Widget title="W" collapsible collapsed={false} onCollapsedChange={onCollapsedChange}>
        body
      </Widget>,
    );
    await user.click(screen.getByLabelText("접기"));
    expect(onCollapsedChange).toHaveBeenCalledWith(true);
  });

  it("shows expand label when collapsed", () => {
    renderWithUser(
      <Widget title="W" collapsible collapsed>
        body
      </Widget>,
    );
    expect(screen.getByLabelText("펼치기")).toBeInTheDocument();
  });
});

describe("StatCell", () => {
  it("renders label and value", () => {
    renderWithUser(<StatCell label="Total" value="100" />);
    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
  });
});

describe("StatGrid", () => {
  it("renders children", () => {
    renderWithUser(
      <StatGrid>
        <StatCell label="A" value="1" />
      </StatGrid>,
    );
    expect(screen.getByText("A")).toBeInTheDocument();
  });
});

describe("QuickMenuItem", () => {
  it("renders icon and label", () => {
    renderWithUser(<QuickMenuItem icon={<span>IC</span>} label="Menu" />);
    expect(screen.getByText("IC")).toBeInTheDocument();
    expect(screen.getByText("Menu")).toBeInTheDocument();
  });
});

describe("ScheduleItem", () => {
  it("renders date and title", () => {
    renderWithUser(<ScheduleItem date="2025-03-15" title="Meeting" />);
    expect(screen.getByText("2025-03-15")).toBeInTheDocument();
    expect(screen.getByText("Meeting")).toBeInTheDocument();
  });

  it("renders body when provided", () => {
    renderWithUser(<ScheduleItem date="2025-03-15" title="M" body="Details here" />);
    expect(screen.getByText("Details here")).toBeInTheDocument();
  });
});
