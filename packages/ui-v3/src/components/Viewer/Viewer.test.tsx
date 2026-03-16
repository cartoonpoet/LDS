import { render, screen } from "@testing-library/react";
import { Viewer } from ".";

describe("Viewer", () => {
  it("renders title, description and body", () => {
    render(
      <Viewer description="문서 설명" title="문서 제목">
        <div>본문</div>
      </Viewer>
    );

    expect(screen.getByText("문서 제목")).toBeInTheDocument();
    expect(screen.getByText("문서 설명")).toBeInTheDocument();
    expect(screen.getByText("본문")).toBeInTheDocument();
  });
});
