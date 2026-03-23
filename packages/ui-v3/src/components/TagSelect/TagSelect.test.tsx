import { describe, it, expect, vi } from "vitest";
import { fireEvent } from "@testing-library/react";
import { renderWithUser, screen } from "../../test/utils";
import { TagSelect } from ".";

const options = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
];

describe("TagSelect", () => {
  it("renders input with placeholder", () => {
    renderWithUser(
      <TagSelect options={options} value={[]} onChange={() => {}} placeholder="검색" />,
    );
    expect(screen.getByPlaceholderText("검색")).toBeInTheDocument();
  });

  it("opens dropdown on input focus", () => {
    renderWithUser(
      <TagSelect options={options} value={[]} onChange={() => {}} />,
    );
    fireEvent.focus(screen.getByRole("textbox"));
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Vue")).toBeInTheDocument();
  });

  it("calls onChange when option is clicked", () => {
    const onChange = vi.fn();
    renderWithUser(
      <TagSelect options={options} value={[]} onChange={onChange} />,
    );
    fireEvent.focus(screen.getByRole("textbox"));
    fireEvent.click(screen.getByText("Vue"));
    expect(onChange).toHaveBeenCalledWith(["vue"]);
  });

  it("renders selected tags", () => {
    renderWithUser(
      <TagSelect options={options} value={["react", "angular"]} onChange={() => {}} />,
    );
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Angular")).toBeInTheDocument();
  });

  it("removes tag on remove button click", async () => {
    const onChange = vi.fn();
    const { user } = renderWithUser(
      <TagSelect options={options} value={["react", "vue"]} onChange={onChange} />,
    );
    await user.click(screen.getByLabelText("React 제거"));
    expect(onChange).toHaveBeenCalledWith(["vue"]);
  });

  it("filters options by search input", async () => {
    const { user } = renderWithUser(
      <TagSelect options={options} value={[]} onChange={() => {}} />,
    );
    const input = screen.getByRole("textbox");
    await user.type(input, "Rea");
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.queryByText("Vue")).not.toBeInTheDocument();
  });
});
