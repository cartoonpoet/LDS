import { fireEvent, render, screen } from "@testing-library/react";
import { Chip } from ".";

describe("Chip", () => {
  it("renders content", () => {
    render(<Chip kind="basic">Option 1</Chip>);
    expect(screen.getByText("Option 1")).toBeInTheDocument();
  });

  it("renders meta text for file chip", () => {
    render(
      <Chip kind="file" metaText="검토중">
        Document_file_name.pdf
      </Chip>
    );

    expect(screen.getByText("검토중")).toBeInTheDocument();
  });

  it("calls onDismiss when dismiss button is clicked", () => {
    const onDismiss = vi.fn();
    render(
      <Chip dismissible onDismiss={onDismiss}>
        Option 1
      </Chip>
    );

    fireEvent.click(screen.getByRole("button", { name: "Remove chip" }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});
