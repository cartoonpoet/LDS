import { describe, it, expect, vi } from "vitest";
import { renderWithUser, screen } from "../../test/utils";
import { FileUploadArea, FileThumbnail, FileItem, FileAttachBadge } from ".";

describe("FileUploadArea", () => {
  it("renders upload area with attach button", () => {
    renderWithUser(<FileUploadArea />);
    expect(screen.getByText("파일 첨부")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    renderWithUser(<FileUploadArea description="최대 10MB" />);
    expect(screen.getByText("최대 10MB")).toBeInTheDocument();
  });

  it("renders children in attached list", () => {
    renderWithUser(
      <FileUploadArea>
        <span>child-content</span>
      </FileUploadArea>,
    );
    expect(screen.getByText("child-content")).toBeInTheDocument();
  });

  it("renders 'AI 파일 분석' header in default (ai) variant", () => {
    renderWithUser(<FileUploadArea />);
    expect(screen.getByText("AI 파일 분석")).toBeInTheDocument();
  });

  describe("variant='basic'", () => {
    it("renders attach button and description", () => {
      renderWithUser(
        <FileUploadArea variant="basic" description="가능한 워드(.docx) 권장" />,
      );
      expect(screen.getByText("파일 첨부")).toBeInTheDocument();
      expect(screen.getByText("가능한 워드(.docx) 권장")).toBeInTheDocument();
    });

    it("does not render the 'AI 파일 분석' header", () => {
      renderWithUser(<FileUploadArea variant="basic" />);
      expect(screen.queryByText("AI 파일 분석")).not.toBeInTheDocument();
    });

    it("renders children in attached list", () => {
      renderWithUser(
        <FileUploadArea variant="basic">
          <span>basic-child</span>
        </FileUploadArea>,
      );
      expect(screen.getByText("basic-child")).toBeInTheDocument();
    });
  });
});

describe("FileThumbnail", () => {
  it("renders image", () => {
    renderWithUser(<FileThumbnail src="/test.png" filename="test.png" />);
    expect(screen.getByRole("img")).toHaveAttribute("src", "/test.png");
  });

  it("renders download button when onDownload provided", () => {
    renderWithUser(
      <FileThumbnail src="/test.png" onDownload={() => {}} />,
    );
    expect(screen.getByLabelText("다운로드")).toBeInTheDocument();
  });

  it("renders expand button when onExpand provided", () => {
    renderWithUser(
      <FileThumbnail src="/test.png" onExpand={() => {}} />,
    );
    expect(screen.getByLabelText("확대")).toBeInTheDocument();
  });
});

describe("FileItem", () => {
  it("renders filename", () => {
    renderWithUser(<FileItem filename="document.pdf" />);
    expect(screen.getByText("document.pdf")).toBeInTheDocument();
  });

  it("renders file metadata", () => {
    renderWithUser(<FileItem filename="doc.pdf" fileMeta="2.5MB" />);
    expect(screen.getByText("2.5MB")).toBeInTheDocument();
  });

  it("calls onDelete when delete button clicked", async () => {
    const onDelete = vi.fn();
    const { user } = renderWithUser(
      <FileItem filename="doc.pdf" onDelete={onDelete} />,
    );
    await user.click(screen.getByLabelText("삭제"));
    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});

describe("FileAttachBadge", () => {
  it("renders filename", () => {
    renderWithUser(<FileAttachBadge filename="report.xlsx" />);
    expect(screen.getByText("report.xlsx")).toBeInTheDocument();
  });

  it("calls onRemove when remove button clicked", async () => {
    const onRemove = vi.fn();
    const { user } = renderWithUser(
      <FileAttachBadge filename="report.xlsx" onRemove={onRemove} />,
    );
    await user.click(screen.getByLabelText("제거"));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });
});
