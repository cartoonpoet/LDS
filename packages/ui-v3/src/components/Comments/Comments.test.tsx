import { fireEvent, render, screen } from "@testing-library/react";
import { Comments } from ".";

describe("Comments", () => {
  it("renders comment items", () => {
    render(<Comments items={[{ id: "1", author: "김연이", body: "검토 완료" }]} />);

    expect(screen.getByText("김연이")).toBeInTheDocument();
    expect(screen.getByText("검토 완료")).toBeInTheDocument();
  });

  it("submits normalized text and clears the composer", () => {
    const onSubmit = vi.fn();

    render(<Comments items={[]} onSubmit={onSubmit} />);

    const textarea = screen.getByPlaceholderText("검토 의견을 남겨주세요.");
    fireEvent.change(textarea, { target: { value: "  의견 남깁니다.  " } });
    fireEvent.click(screen.getByRole("button", { name: "등록" }));

    expect(onSubmit).toHaveBeenCalledWith("의견 남깁니다.");
    expect(screen.getByDisplayValue("")).toBeInTheDocument();
  });
});
