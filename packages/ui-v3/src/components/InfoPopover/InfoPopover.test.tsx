import { describe, it, expect, vi } from "vitest";
import { renderWithUser, screen } from "../../test/utils";
import { InfoPopover } from ".";

const steps = [
  { label: "Step 1" },
  { label: "Step 2" },
  { label: "Step 3" },
];

describe("InfoPopover", () => {
  it("renders trigger children", () => {
    renderWithUser(
      <InfoPopover title="Guide" steps={steps}>
        <button>Info</button>
      </InfoPopover>,
    );
    expect(screen.getByText("Info")).toBeInTheDocument();
  });

  it("shows popover when open is true", () => {
    renderWithUser(
      <InfoPopover title="Guide" steps={steps} open>
        <button>Info</button>
      </InfoPopover>,
    );
    expect(screen.getByText("Guide")).toBeInTheDocument();
    expect(screen.getByText("Step 1")).toBeInTheDocument();
    expect(screen.getByText("Step 3")).toBeInTheDocument();
  });

  it("toggles popover on trigger click", async () => {
    const onOpenChange = vi.fn();
    const { user } = renderWithUser(
      <InfoPopover title="Guide" steps={steps} onOpenChange={onOpenChange}>
        <button>Info</button>
      </InfoPopover>,
    );
    await user.click(screen.getByText("Info"));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });
});
