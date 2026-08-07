import { describe, it, expect, vi } from "vitest";
import { renderWithUser, screen } from "../test/utils";
import { useControllableState } from "./useControllableState";

function Harness({
  value,
  defaultValue = false,
  onChange,
}: {
  value?: boolean;
  defaultValue?: boolean;
  onChange?: (v: boolean) => void;
}) {
  const [open, setOpen] = useControllableState({ value, defaultValue, onChange });
  return (
    <div>
      <span data-testid="state">{String(open)}</span>
      <button data-testid="toggle" onClick={() => setOpen(!open)}>
        toggle
      </button>
    </div>
  );
}

describe("useControllableState", () => {
  it("uses defaultValue in uncontrolled mode", () => {
    renderWithUser(<Harness defaultValue={true} />);
    expect(screen.getByTestId("state")).toHaveTextContent("true");
  });

  it("updates internal state and calls onChange in uncontrolled mode", async () => {
    const onChange = vi.fn();
    const { user } = renderWithUser(<Harness defaultValue={false} onChange={onChange} />);

    await user.click(screen.getByTestId("toggle"));

    expect(screen.getByTestId("state")).toHaveTextContent("true");
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("does not update internal state in controlled mode, only calls onChange", async () => {
    const onChange = vi.fn();
    const { user } = renderWithUser(<Harness value={false} onChange={onChange} />);

    await user.click(screen.getByTestId("toggle"));

    expect(screen.getByTestId("state")).toHaveTextContent("false");
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("reflects controlled value changes from parent", () => {
    const { rerender } = renderWithUser(<Harness value={false} />);
    expect(screen.getByTestId("state")).toHaveTextContent("false");

    rerender(<Harness value={true} />);
    expect(screen.getByTestId("state")).toHaveTextContent("true");
  });

  it("supports lazy defaultValue initializer", () => {
    const init = vi.fn(() => true);
    function LazyHarness() {
      const [v] = useControllableState<boolean>({ defaultValue: init });
      return <span data-testid="lazy">{String(v)}</span>;
    }
    renderWithUser(<LazyHarness />);
    expect(screen.getByTestId("lazy")).toHaveTextContent("true");
    expect(init).toHaveBeenCalled();
  });
});
