import { describe, it, expect, vi } from "vitest";
import { renderWithUser, screen } from "../../test/utils";
import { CalendarPopover } from ".";

describe("CalendarPopover", () => {
  it("renders trigger children", () => {
    renderWithUser(
      <CalendarPopover title="Event" fields={[]}>
        <button>Open</button>
      </CalendarPopover>,
    );
    expect(screen.getByText("Open")).toBeInTheDocument();
  });

  it("shows popover when open is true", () => {
    renderWithUser(
      <CalendarPopover title="Event Title" fields={[]} open>
        <button>Open</button>
      </CalendarPopover>,
    );
    expect(screen.getByText("Event Title")).toBeInTheDocument();
  });

  it("renders fields in popover", () => {
    renderWithUser(
      <CalendarPopover
        title="Event"
        fields={[{ label: "Location", value: "Room A" }]}
        open
      >
        <button>Open</button>
      </CalendarPopover>,
    );
    expect(screen.getByText("Location")).toBeInTheDocument();
    expect(screen.getByText("Room A")).toBeInTheDocument();
  });

  it("renders primary and secondary buttons", () => {
    renderWithUser(
      <CalendarPopover
        title="Event"
        fields={[]}
        open
        primaryText="Confirm"
        secondaryText="Cancel"
        onPrimary={() => {}}
        onSecondary={() => {}}
      >
        <button>Open</button>
      </CalendarPopover>,
    );
    expect(screen.getByText("Confirm")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("calls onPrimary on primary button click", async () => {
    const onPrimary = vi.fn();
    const { user } = renderWithUser(
      <CalendarPopover
        title="Event"
        fields={[]}
        open
        primaryText="OK"
        onPrimary={onPrimary}
      >
        <button>Open</button>
      </CalendarPopover>,
    );
    await user.click(screen.getByText("OK"));
    expect(onPrimary).toHaveBeenCalledTimes(1);
  });
});
