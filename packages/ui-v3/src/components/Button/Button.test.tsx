import { describe, it, expect, vi } from "vitest";
import { renderWithUser, screen } from "../../test/utils";
import { Button } from ".";

describe("Button", () => {
  it("renders children text", () => {
    renderWithUser(<Button>확인</Button>);
    expect(screen.getByRole("button", { name: "확인" })).toBeInTheDocument();
  });

  it("has type='button' by default", () => {
    renderWithUser(<Button>Click</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    const { user } = renderWithUser(<Button onClick={onClick}>Click</Button>);
    await user.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("is disabled when disabled prop is true", () => {
    renderWithUser(<Button disabled>Click</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    const { user } = renderWithUser(<Button disabled onClick={onClick}>Click</Button>);
    await user.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders iconLeft and iconRight slots", () => {
    renderWithUser(
      <Button
        iconLeft={<span data-testid="left-icon" />}
        iconRight={<span data-testid="right-icon" />}
      >
        Text
      </Button>,
    );
    expect(screen.getByTestId("left-icon")).toBeInTheDocument();
    expect(screen.getByTestId("right-icon")).toBeInTheDocument();
  });

  it("merges custom className", () => {
    renderWithUser(<Button className="custom">Click</Button>);
    expect(screen.getByRole("button")).toHaveClass("custom");
  });

  it("forwards native HTML attributes", () => {
    renderWithUser(<Button data-testid="my-btn" aria-label="save">Save</Button>);
    expect(screen.getByTestId("my-btn")).toHaveAttribute("aria-label", "save");
  });
});
