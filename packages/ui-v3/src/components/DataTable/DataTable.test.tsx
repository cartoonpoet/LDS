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
});
