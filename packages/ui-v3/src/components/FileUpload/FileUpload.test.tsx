import { fireEvent, render, screen } from "@testing-library/react";
import { FileUpload } from ".";

describe("FileUpload", () => {
  it("renders default files and removes them", () => {
    render(<FileUpload defaultValue={[{ id: "1", name: "contract.pdf", size: 1024 }]} />);

    expect(screen.getByText("contract.pdf")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "삭제" }));
    expect(screen.queryByText("contract.pdf")).not.toBeInTheDocument();
  });
});
