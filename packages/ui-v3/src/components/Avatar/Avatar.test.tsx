import { describe, it, expect } from "vitest";
import { render, screen } from "../../test/utils";
import { Avatar, AvatarGroup } from ".";

describe("Avatar", () => {
  it("renders photo from src", () => {
    render(<Avatar src="https://example.com/photo.jpg" alt="User" />);
    const img = screen.getByAltText("User");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://example.com/photo.jpg");
  });

  it("renders initials", () => {
    render(<Avatar initials="JH" />);
    expect(screen.getByText("JH")).toBeInTheDocument();
  });

  it("renders system icon as fallback", () => {
    const { container } = render(<Avatar />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders status dot when status is provided", () => {
    const { container } = render(<Avatar initials="A" status="online" />);
    // Status dot is a span inside the avatar
    const dots = container.querySelectorAll("span");
    expect(dots.length).toBeGreaterThan(0);
  });

  it("renders custom icon when system and icon provided", () => {
    render(<Avatar system icon={<span data-testid="custom-icon" />} />);
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });
});

describe("AvatarGroup", () => {
  it("renders multiple avatars", () => {
    render(
      <AvatarGroup>
        <Avatar initials="A" />
        <Avatar initials="B" />
        <Avatar initials="C" />
      </AvatarGroup>,
    );
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
    expect(screen.getByText("C")).toBeInTheDocument();
  });
});
