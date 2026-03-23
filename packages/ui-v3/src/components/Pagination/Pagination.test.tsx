import { describe, it, expect, vi } from "vitest";
import { renderWithUser, screen } from "../../test/utils";
import { Pagination, PaginationCount } from ".";

describe("Pagination", () => {
  it("renders page buttons", () => {
    renderWithUser(<Pagination page={1} totalPages={5} onPageChange={() => {}} />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("marks current page with aria-current", () => {
    renderWithUser(<Pagination page={3} totalPages={5} onPageChange={() => {}} />);
    expect(screen.getByText("3")).toHaveAttribute("aria-current", "page");
  });

  it("calls onPageChange on page click", async () => {
    const onPageChange = vi.fn();
    const { user } = renderWithUser(
      <Pagination page={1} totalPages={5} onPageChange={onPageChange} />,
    );
    await user.click(screen.getByText("3"));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("disables prev button on first page", () => {
    renderWithUser(<Pagination page={1} totalPages={5} onPageChange={() => {}} />);
    expect(screen.getByLabelText("이전 페이지")).toBeDisabled();
  });

  it("disables next button on last page", () => {
    renderWithUser(<Pagination page={5} totalPages={5} onPageChange={() => {}} />);
    expect(screen.getByLabelText("다음 페이지")).toBeDisabled();
  });

  it("navigates with prev/next buttons", async () => {
    const onPageChange = vi.fn();
    const { user } = renderWithUser(
      <Pagination page={3} totalPages={5} onPageChange={onPageChange} />,
    );
    await user.click(screen.getByLabelText("이전 페이지"));
    expect(onPageChange).toHaveBeenCalledWith(2);
    await user.click(screen.getByLabelText("다음 페이지"));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });
});

describe("PaginationCount", () => {
  it("renders total count", () => {
    renderWithUser(<PaginationCount totalCount={150} />);
    expect(screen.getByText(/150/)).toBeInTheDocument();
  });
});
