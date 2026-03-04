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

  it("renders placeholder and helper text", () => {
    render(
      <Select
        helperText="상태를 선택하세요."
        label="Status"
        options={[
          { label: "Draft", value: "draft" },
          { label: "Approved", value: "approved" }
        ]}
        placeholder="Select status"
      />
    );

    expect(screen.getByText("Select status")).toBeInTheDocument();
    expect(screen.getByText("상태를 선택하세요.")).toBeInTheDocument();
  });

  it("renders option groups", () => {
    render(
      <Select
        label="Status"
        options={[
          {
            label: "Open",
            options: [{ label: "Draft", value: "draft" }]
          },
          {
            label: "Closed",
            options: [{ label: "Approved", value: "approved" }]
          }
        ]}
      />
    );

    expect(screen.getByRole("group", { name: "Open" })).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "Closed" })).toBeInTheDocument();
  });
});
