import { describe, it, expect, vi } from "vitest";
import { renderWithUser, screen } from "../../test/utils";
import { Input, InputGroup, MultiSelect } from ".";

describe("Input", () => {
  it("renders a text input", () => {
    renderWithUser(<Input placeholder="입력하세요" />);
    expect(screen.getByPlaceholderText("입력하세요")).toBeInTheDocument();
  });

  it("is disabled when disabled prop is true", () => {
    renderWithUser(<Input disabled placeholder="disabled" />);
    expect(screen.getByPlaceholderText("disabled")).toBeDisabled();
  });

  it("is disabled when state is 'disabled'", () => {
    renderWithUser(<Input state="disabled" placeholder="disabled" />);
    expect(screen.getByPlaceholderText("disabled")).toBeDisabled();
  });

  it("renders leftIcon and rightIcon", () => {
    renderWithUser(
      <Input
        leftIcon={<span data-testid="left" />}
        rightIcon={<span data-testid="right" />}
      />,
    );
    expect(screen.getByTestId("left")).toBeInTheDocument();
    expect(screen.getByTestId("right")).toBeInTheDocument();
  });

  it("renders suffix", () => {
    renderWithUser(<Input suffix={<span data-testid="suffix">원</span>} />);
    expect(screen.getByTestId("suffix")).toBeInTheDocument();
  });

  it("accepts user input", async () => {
    const { user } = renderWithUser(<Input placeholder="type" />);
    const input = screen.getByPlaceholderText("type");
    await user.type(input, "hello");
    expect(input).toHaveValue("hello");
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLInputElement | null };
    renderWithUser(<Input ref={ref} placeholder="ref" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});

describe("InputGroup", () => {
  it("renders label", () => {
    renderWithUser(
      <InputGroup label="이메일">
        <Input />
      </InputGroup>,
    );
    expect(screen.getByText("이메일")).toBeInTheDocument();
  });

  it("renders required dot when required", () => {
    const { container } = renderWithUser(
      <InputGroup label="이름" required>
        <Input />
      </InputGroup>,
    );
    // Required dot is a span with specific class
    expect(container.querySelector("span")).toBeInTheDocument();
  });

  it("renders helper text", () => {
    renderWithUser(
      <InputGroup helperText="올바른 형식을 입력하세요">
        <Input />
      </InputGroup>,
    );
    expect(screen.getByText("올바른 형식을 입력하세요")).toBeInTheDocument();
  });

  it("renders caption", () => {
    renderWithUser(
      <InputGroup label="Password" caption="(선택)">
        <Input />
      </InputGroup>,
    );
    expect(screen.getByText("(선택)")).toBeInTheDocument();
  });
});

describe("MultiSelect", () => {
  const items = [
    { key: "1", label: "Alice" },
    { key: "2", label: "Bob" },
  ];

  it("renders selected item badges", () => {
    renderWithUser(<MultiSelect value={items} />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });

  it("calls onRemove when badge remove button is clicked", async () => {
    const onRemove = vi.fn();
    const { user } = renderWithUser(
      <MultiSelect value={items} onRemove={onRemove} />,
    );
    await user.click(screen.getByLabelText("Alice 제거"));
    expect(onRemove).toHaveBeenCalledWith("1");
  });

  it("shows placeholder when value is empty", () => {
    renderWithUser(<MultiSelect value={[]} placeholder="검색..." />);
    expect(screen.getByPlaceholderText("검색...")).toBeInTheDocument();
  });

  it("hides placeholder when value has items", () => {
    renderWithUser(<MultiSelect value={items} placeholder="검색..." />);
    expect(screen.queryByPlaceholderText("검색...")).not.toBeInTheDocument();
  });

  it("does not show remove buttons when disabled", () => {
    renderWithUser(<MultiSelect value={items} onRemove={vi.fn()} disabled />);
    expect(screen.queryByLabelText("Alice 제거")).not.toBeInTheDocument();
  });

  it("fires onInputChange when typing", async () => {
    const onInputChange = vi.fn();
    const { user } = renderWithUser(
      <MultiSelect value={[]} placeholder="검색..." onInputChange={onInputChange} />,
    );
    await user.type(screen.getByPlaceholderText("검색..."), "test");
    expect(onInputChange).toHaveBeenCalled();
  });
});
