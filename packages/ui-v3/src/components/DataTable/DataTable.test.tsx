import { describe, it, expect, vi } from "vitest";
import { renderWithUser, screen } from "../../test/utils";
import { DataTable } from ".";
import type { ColumnDef } from ".";

interface Row {
  id: string;
  name: string;
  age: number;
}

const data: Row[] = [
  { id: "1", name: "Alice", age: 30 },
  { id: "2", name: "Bob", age: 25 },
];

const columns: ColumnDef<Row, any>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "age", header: "Age" },
];

describe("DataTable", () => {
  it("renders table with headers", () => {
    renderWithUser(<DataTable data={data} columns={columns} />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
  });

  it("renders data rows", () => {
    renderWithUser(<DataTable data={data} columns={columns} />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });

  it("renders empty state when no data", () => {
    renderWithUser(<DataTable data={[]} columns={columns} />);
    expect(screen.getByText("데이터가 없습니다.")).toBeInTheDocument();
  });

  it("renders custom empty text", () => {
    renderWithUser(<DataTable data={[]} columns={columns} emptyText="No data" />);
    expect(screen.getByText("No data")).toBeInTheDocument();
  });

  it("renders checkboxes when selectable", () => {
    renderWithUser(<DataTable data={data} columns={columns} selectable />);
    expect(screen.getByLabelText("전체 선택")).toBeInTheDocument();
    expect(screen.getAllByLabelText("행 선택")).toHaveLength(2);
  });

  it("calls onRowClick on row click", async () => {
    const onRowClick = vi.fn();
    const { user } = renderWithUser(
      <DataTable data={data} columns={columns} onRowClick={onRowClick} />,
    );
    await user.click(screen.getByText("Alice"));
    expect(onRowClick).toHaveBeenCalledWith(expect.objectContaining({ name: "Alice" }));
  });

  it("marks clickable rows as focusable buttons for keyboard users", () => {
    renderWithUser(<DataTable data={data} columns={columns} onRowClick={vi.fn()} />);
    const rows = screen.getAllByRole("button");
    expect(rows).toHaveLength(2);
    expect(rows[0]).toHaveAttribute("tabIndex", "0");
  });

  it("does not make rows focusable when onRowClick is absent", () => {
    renderWithUser(<DataTable data={data} columns={columns} />);
    expect(screen.queryAllByRole("button")).toHaveLength(0);
  });

  it("opens a row with Enter", async () => {
    const onRowClick = vi.fn();
    const { user } = renderWithUser(
      <DataTable data={data} columns={columns} onRowClick={onRowClick} />,
    );
    screen.getAllByRole("button")[0].focus();
    await user.keyboard("{Enter}");
    expect(onRowClick).toHaveBeenCalledWith(expect.objectContaining({ name: "Alice" }));
  });

  it("opens a row with Space", async () => {
    const onRowClick = vi.fn();
    const { user } = renderWithUser(
      <DataTable data={data} columns={columns} onRowClick={onRowClick} />,
    );
    screen.getAllByRole("button")[1].focus();
    await user.keyboard(" ");
    expect(onRowClick).toHaveBeenCalledWith(expect.objectContaining({ name: "Bob" }));
  });

  it("체크박스에서 스페이스를 눌러도 행이 두 번 열리지 않는다", async () => {
    const onRowClick = vi.fn();
    const { user } = renderWithUser(
      <DataTable data={data} columns={columns} selectable onRowClick={onRowClick} />,
    );
    const [checkbox] = screen.getAllByLabelText("행 선택");
    checkbox.focus();
    await user.keyboard(" ");
    expect(onRowClick).not.toHaveBeenCalled();
  });
});
