import { describe, it, expect, vi } from "vitest";
import { renderWithUser, render, screen } from "../../test/utils";
import { TableTree } from ".";
import type { TableTreeColumn, TableTreeRow } from ".";

const columns: TableTreeColumn[] = [
  { key: "code", header: "관리번호", width: 140 },
  { key: "title", header: "계약명" },
  { key: "date", header: "체결일", width: 120, align: "right" },
];

const rows: TableTreeRow[] = [
  {
    id: "1",
    cells: { code: "C2026-001", title: "모계약", date: "2026-01-03" },
    children: [
      {
        id: "1-1",
        cells: { code: "C2026-001-01", title: "하위계약 A", date: "2026-02-01" },
        children: [
          {
            id: "1-1-1",
            cells: { code: "C2026-001-01-01", title: "하위계약 A-1", date: "2026-03-01" },
          },
        ],
      },
    ],
  },
  {
    id: "2",
    cells: { code: "C2026-002", title: "단독계약", date: "2026-04-01" },
  },
];

describe("TableTree", () => {
  it("renders table semantics with column headers and root rows", () => {
    render(<TableTree columns={columns} rows={rows} />);
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "관리번호" })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "계약명" })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "체결일" })).toBeInTheDocument();
    expect(screen.getByText("모계약")).toBeInTheDocument();
    expect(screen.getByText("단독계약")).toBeInTheDocument();
  });

  it("does not render child rows until parent is expanded", () => {
    render(<TableTree columns={columns} rows={rows} />);
    expect(screen.queryByText("하위계약 A")).not.toBeInTheDocument();
  });

  it("expands and collapses children on toggle button click with aria-expanded", async () => {
    const { user } = renderWithUser(<TableTree columns={columns} rows={rows} />);
    const toggle = screen.getByRole("button", { name: "펼치기" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("하위계약 A")).toBeInTheDocument();
    // 손자 행은 자식이 접혀 있으므로 아직 미렌더
    expect(screen.queryByText("하위계약 A-1")).not.toBeInTheDocument();

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText("하위계약 A")).not.toBeInTheDocument();
  });

  it("expands rows listed in defaultExpandedIds initially", () => {
    render(<TableTree columns={columns} rows={rows} defaultExpandedIds={["1", "1-1"]} />);
    expect(screen.getByText("하위계약 A")).toBeInTheDocument();
    expect(screen.getByText("하위계약 A-1")).toBeInTheDocument();
  });

  it("supports controlled expandedIds with onExpandedChange", async () => {
    const onExpandedChange = vi.fn();
    const { user, rerender } = renderWithUser(
      <TableTree
        columns={columns}
        rows={rows}
        expandedIds={[]}
        onExpandedChange={onExpandedChange}
      />,
    );
    await user.click(screen.getByRole("button", { name: "펼치기" }));
    expect(onExpandedChange).toHaveBeenCalledWith(["1"]);
    // controlled — 상태를 반영하기 전까지는 자식이 렌더되지 않음
    expect(screen.queryByText("하위계약 A")).not.toBeInTheDocument();

    rerender(
      <TableTree
        columns={columns}
        rows={rows}
        expandedIds={["1"]}
        onExpandedChange={onExpandedChange}
      />,
    );
    expect(screen.getByText("하위계약 A")).toBeInTheDocument();
  });

  it("calls onRowClick with the clicked row", async () => {
    const onRowClick = vi.fn();
    const { user } = renderWithUser(
      <TableTree columns={columns} rows={rows} onRowClick={onRowClick} />,
    );
    await user.click(screen.getByText("단독계약"));
    expect(onRowClick).toHaveBeenCalledOnce();
    expect(onRowClick.mock.calls[0][0].id).toBe("2");
  });

  it("does not trigger onRowClick when the expand toggle is clicked", async () => {
    const onRowClick = vi.fn();
    const { user } = renderWithUser(
      <TableTree columns={columns} rows={rows} onRowClick={onRowClick} />,
    );
    await user.click(screen.getByRole("button", { name: "펼치기" }));
    expect(onRowClick).not.toHaveBeenCalled();
  });

  it("renders emptyText when rows is empty", () => {
    render(<TableTree columns={columns} rows={[]} emptyText="조회된 계약이 없습니다." />);
    expect(screen.getByText("조회된 계약이 없습니다.")).toBeInTheDocument();
  });

  it("indents nested rows in the first column", () => {
    render(<TableTree columns={columns} rows={rows} defaultExpandedIds={["1", "1-1"]} />);
    const childCell = screen.getByText("하위계약 A-1").closest("tr")!
      .querySelector("td div") as HTMLElement;
    // depth 2 × 기본 20px
    expect(childCell.style.paddingLeft).toBe("40px");
  });

  it("marks the selected row via selectedId", () => {
    render(<TableTree columns={columns} rows={rows} selectedId="2" />);
    const selectedRow = screen.getByText("단독계약").closest("tr")!;
    const otherRow = screen.getByText("모계약").closest("tr")!;
    expect(selectedRow).toHaveAttribute("data-selected", "true");
    expect(otherRow).not.toHaveAttribute("data-selected");
  });
});
