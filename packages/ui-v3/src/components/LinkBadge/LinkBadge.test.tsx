import { describe, it, expect } from "vitest";
import { render, screen } from "../../test/utils";
import { LinkBadge } from ".";

describe("LinkBadge", () => {
  it("renders an anchor with href and content", () => {
    render(<LinkBadge href="/contracts/C2026-01">C2026-01</LinkBadge>);
    const link = screen.getByRole("link", { name: "C2026-01" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/contracts/C2026-01");
  });

  it("opens in a new tab with rel guard when external", () => {
    render(
      <LinkBadge href="https://example.com" external>
        외부 문서
      </LinkBadge>
    );
    const link = screen.getByRole("link", { name: /외부 문서/ });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders leading icon content", () => {
    render(
      <LinkBadge href="#" leadingIcon={<span data-testid="lead" />}>
        Label
      </LinkBadge>
    );
    expect(screen.getByTestId("lead")).toBeInTheDocument();
  });
});
