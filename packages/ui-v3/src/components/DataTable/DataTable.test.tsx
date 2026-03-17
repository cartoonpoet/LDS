import { fireEvent, render, screen } from "@testing-library/react";
import { DataTable } from ".";

type CaseRow = {
  id: string;
  title: string;
  owner: string;
  amount: number;
};

const columns = [
  { key: "title", label: "안건명", accessor: "title" as const, sortable: true },
  { key: "owner", label: "담당자", accessor: "owner" as const },
  { key: "amount", label: "금액", accessor: "amount" as const, align: "right" as const, sortable: true }
];

const rows: CaseRow[] = [
  { id: "2", title: "계약 검토", owner: "김연이", amount: 30 },
  { id: "1", title: "소송 비용", owner: "박준호", amount: 10 }
];

describe("DataTable", () => {
  it("renders rows and headers", () => {
    render(<DataTable caption="법무 안건" columns={columns} rowKey="id" rows={rows} />);

    expect(screen.getByText("법무 안건")).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /안건명/i })).toBeInTheDocument();
    expect(screen.getByText("계약 검토")).toBeInTheDocument();
  });

  it("sorts rows when sortable header is clicked", () => {
    render(<DataTable columns={columns} rowKey="id" rows={rows} />);

    fireEvent.click(screen.getByRole("button", { name: /금액/i }));

    const renderedRows = screen.getAllByRole("row");
    expect(renderedRows[1]).toHaveTextContent("소송 비용");
    expect(renderedRows[2]).toHaveTextContent("계약 검토");
  });

  it("renders empty state when rows are absent", () => {
    render(<DataTable columns={columns} rows={[]} />);

    expect(screen.getByText("표시할 데이터가 없습니다.")).toBeInTheDocument();
  });
});
