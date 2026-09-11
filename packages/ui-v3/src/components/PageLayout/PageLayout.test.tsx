import { describe, it, expect } from "vitest";
import { render, screen } from "../../test/utils";
import { PageLayout } from ".";

const renderFull = () =>
  render(
    <PageLayout data-testid="root">
      <PageLayout.Header>헤더</PageLayout.Header>
      <PageLayout.Nav data-testid="nav">내비</PageLayout.Nav>
      <PageLayout.Content>본문</PageLayout.Content>
      <PageLayout.Panel data-testid="panel">패널</PageLayout.Panel>
    </PageLayout>
  );

describe("PageLayout", () => {
  it("renders all slots with semantic elements", () => {
    renderFull();
    expect(screen.getByRole("banner")).toHaveTextContent("헤더");
    expect(screen.getByRole("navigation")).toHaveTextContent("내비");
    expect(screen.getByRole("main")).toHaveTextContent("본문");
    expect(screen.getByRole("complementary")).toHaveTextContent("패널");
  });

  it("root is a div", () => {
    renderFull();
    expect(screen.getByTestId("root").nodeName).toBe("DIV");
  });

  it("works with slots omitted (Header + Content only)", () => {
    render(
      <PageLayout>
        <PageLayout.Header>헤더</PageLayout.Header>
        <PageLayout.Content>본문</PageLayout.Content>
      </PageLayout>
    );
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
    expect(screen.queryByRole("complementary")).not.toBeInTheDocument();
  });

  it("Nav applies default width 240", () => {
    renderFull();
    expect(screen.getByTestId("nav").style.width).toBe("240px");
  });

  it("Nav collapsed switches to collapsedWidth", () => {
    render(
      <PageLayout>
        <PageLayout.Nav data-testid="nav" collapsed>내비</PageLayout.Nav>
        <PageLayout.Content>본문</PageLayout.Content>
      </PageLayout>
    );
    expect(screen.getByTestId("nav").style.width).toBe("64px");
  });

  it("Nav custom width and collapsedWidth", () => {
    const { rerender } = render(
      <PageLayout>
        <PageLayout.Nav data-testid="nav" width={280}>내비</PageLayout.Nav>
        <PageLayout.Content>본문</PageLayout.Content>
      </PageLayout>
    );
    expect(screen.getByTestId("nav").style.width).toBe("280px");
    rerender(
      <PageLayout>
        <PageLayout.Nav data-testid="nav" width={280} collapsed collapsedWidth={56}>내비</PageLayout.Nav>
        <PageLayout.Content>본문</PageLayout.Content>
      </PageLayout>
    );
    expect(screen.getByTestId("nav").style.width).toBe("56px");
  });

  it("Panel applies default width 320 and custom width", () => {
    renderFull();
    expect(screen.getByTestId("panel").style.width).toBe("320px");
    render(
      <PageLayout>
        <PageLayout.Content>본문</PageLayout.Content>
        <PageLayout.Panel data-testid="panel2" width={400}>패널</PageLayout.Panel>
      </PageLayout>
    );
    expect(screen.getByTestId("panel2").style.width).toBe("400px");
  });

  it("named exports match dot properties", async () => {
    const mod = await import(".");
    expect(mod.PageLayoutHeader).toBe(PageLayout.Header);
    expect(mod.PageLayoutNav).toBe(PageLayout.Nav);
    expect(mod.PageLayoutContent).toBe(PageLayout.Content);
    expect(mod.PageLayoutPanel).toBe(PageLayout.Panel);
  });

  it("merges custom className on root and slots", () => {
    render(
      <PageLayout data-testid="root" className="root-extra">
        <PageLayout.Content className="content-extra">본문</PageLayout.Content>
      </PageLayout>
    );
    expect(screen.getByTestId("root").className).toContain("root-extra");
    expect(screen.getByRole("main").className).toContain("content-extra");
  });
});
