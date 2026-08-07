import { createRef } from "react";
import { describe, it, expect, vi } from "vitest";
import { renderWithUser, render, screen } from "../../test/utils";
import { Textarea } from ".";

describe("Textarea", () => {
  it("renders a textarea with placeholder", () => {
    render(<Textarea placeholder="내용을 입력하세요" />);
    expect(screen.getByPlaceholderText("내용을 입력하세요")).toBeInTheDocument();
  });

  it("forwards rows attribute", () => {
    render(<Textarea rows={6} />);
    expect(screen.getByRole("textbox")).toHaveAttribute("rows", "6");
  });

  it("forwards ref to the textarea element", () => {
    const ref = createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it("calls onChange while typing", async () => {
    const onChange = vi.fn();
    const { user } = renderWithUser(<Textarea onChange={onChange} />);
    await user.type(screen.getByRole("textbox"), "안녕");
    expect(onChange).toHaveBeenCalled();
    expect(screen.getByRole("textbox")).toHaveValue("안녕");
  });

  it("is disabled when disabled prop is set", () => {
    render(<Textarea disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("is disabled when state is disabled", () => {
    render(<Textarea state="disabled" />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("shows character count with maxLength when showCount", async () => {
    const { user } = renderWithUser(<Textarea maxLength={100} showCount />);
    expect(screen.getByText("0/100")).toBeInTheDocument();
    await user.type(screen.getByRole("textbox"), "hello");
    expect(screen.getByText("5/100")).toBeInTheDocument();
  });

  it("counts controlled value when showCount", () => {
    render(<Textarea value="계약서 초안" maxLength={50} showCount onChange={() => {}} />);
    expect(screen.getByText("6/50")).toBeInTheDocument();
  });

  it("enforces maxLength on typing", async () => {
    const { user } = renderWithUser(<Textarea maxLength={3} showCount />);
    await user.type(screen.getByRole("textbox"), "12345");
    expect(screen.getByRole("textbox")).toHaveValue("123");
    expect(screen.getByText("3/3")).toBeInTheDocument();
  });
});
