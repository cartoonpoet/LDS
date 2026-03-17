import { render, screen } from "@testing-library/react";
import { ApprovalLine } from ".";

describe("ApprovalLine", () => {
  it("renders approvers and statuses", () => {
    render(
      <ApprovalLine
        items={[
          { id: "1", order: 1, name: "김준호", status: "approved" },
          { id: "2", order: 2, name: "이연이", status: "current", comment: "검토 중" }
        ]}
      />
    );

    expect(screen.getByLabelText("결재선")).toBeInTheDocument();
    expect(screen.getByText("김준호")).toBeInTheDocument();
    expect(screen.getByText("승인")).toBeInTheDocument();
    expect(screen.getByText("검토 중")).toBeInTheDocument();
  });
});
