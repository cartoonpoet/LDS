import { describe, it, expect, vi } from "vitest";
import { renderWithUser, screen } from "../../test/utils";
import { Collapse, CollapseGroup } from ".";

describe("Collapse", () => {
  it("renders header text", () => {
    renderWithUser(<Collapse header="섹션 제목">Content</Collapse>);
    expect(screen.getByText("섹션 제목")).toBeInTheDocument();
  });

  it("is collapsed by default", () => {
    renderWithUser(<Collapse header="Title">Content</Collapse>);
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "false");
  });

  it("expands on header click (uncontrolled)", async () => {
    const { user } = renderWithUser(
      <Collapse header="Title">Content</Collapse>,
    );
    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true");
  });

  it("starts expanded with defaultExpanded", () => {
    renderWithUser(
      <Collapse header="Title" defaultExpanded>
        Content
      </Collapse>,
    );
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true");
  });

  it("calls onToggle when toggled", async () => {
    const onToggle = vi.fn();
    const { user } = renderWithUser(
      <Collapse header="Title" onToggle={onToggle}>
        Content
      </Collapse>,
    );
    await user.click(screen.getByRole("button"));
    expect(onToggle).toHaveBeenCalledWith(true);
    await user.click(screen.getByRole("button"));
    expect(onToggle).toHaveBeenCalledWith(false);
  });

  it("supports controlled expanded", () => {
    renderWithUser(
      <Collapse header="Title" expanded={true}>
        Content
      </Collapse>,
    );
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true");
  });

  it("renders action slot", () => {
    renderWithUser(
      <Collapse header="Title" action={<span data-testid="action">Action</span>}>
        Content
      </Collapse>,
    );
    expect(screen.getByTestId("action")).toBeInTheDocument();
  });

  it("renders children content", () => {
    renderWithUser(
      <Collapse header="Title" defaultExpanded>
        <p>Body text</p>
      </Collapse>,
    );
    expect(screen.getByText("Body text")).toBeInTheDocument();
  });

  it("renders chevron after headerText when togglePosition is right", () => {
    renderWithUser(
      <Collapse header="Title" togglePosition="right">Content</Collapse>,
    );
    const button = screen.getByRole("button");
    const children = Array.from(button.children);
    const headerTextIndex = children.findIndex((el) => el.textContent === "Title");
    const chevronIndex = children.findIndex((el) => el.querySelector("svg"));
    expect(headerTextIndex).toBeGreaterThanOrEqual(0);
    expect(chevronIndex).toBeGreaterThan(headerTextIndex);
  });
});

describe("CollapseGroup", () => {
  it("renders children", () => {
    renderWithUser(
      <CollapseGroup>
        <Collapse header="A">Content A</Collapse>
        <Collapse header="B">Content B</Collapse>
      </CollapseGroup>,
    );
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
  });
});
