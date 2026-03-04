import { render, screen } from "@testing-library/react";
import { Select } from ".";

describe("Select", () => {
  it("renders options", () => {
    render(
      <Select
        label="Status"
        options={[
          { label: "Draft", value: "draft" },
          { label: "Approved", value: "approved" }
        ]}
      />
    );

    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Draft" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Approved" })).toBeInTheDocument();
  });
});
