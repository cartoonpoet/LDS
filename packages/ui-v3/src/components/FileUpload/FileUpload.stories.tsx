import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import {
  FileUploadArea,
  FileThumbnail,
  FileItem,
  FileAttachBadge,
} from ".";

/**
 * **FileUpload** — 파일 업로드 관련 컴포넌트 모음
 */
const meta: Meta<typeof FileUploadArea> = {
  title: "Components/FileUpload",
  component: FileUploadArea,
  decorators: [
    (Story) => (
      <div
        className={lightThemeClass}
        style={{ padding: 24, backgroundColor: "#f2f4f6" }}
      >
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FileUploadArea>;

export const TemplateCode: Story = {
  name: "Template Code",
  render: () => {
    const [files, setFiles] = useState([
      { name: "계약서_v3.docx", size: "2.4 MB" },
    ]);
    return (
      <FileUploadArea
        onFilesAdded={(newFiles) =>
          setFiles((prev) => [
            ...prev,
            ...newFiles.map((f) => ({ name: f.name, size: `${(f.size / 1024 / 1024).toFixed(1)} MB` })),
          ])
        }
      >
        {files.map((f) => (
          <FileItem
            key={f.name}
            filename={f.name}
            fileMeta={f.size}
            onDelete={() => setFiles((prev) => prev.filter((x) => x.name !== f.name))}
          />
        ))}
      </FileUploadArea>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `import { useState } from "react";
import {
  FileUploadArea,
  FileThumbnail,
  FileItem,
  FileAttachBadge,
} from "@lds/ui-v3";

// 파일 업로드 영역 + 파일 목록
const [files, setFiles] = useState([]);

<FileUploadArea
  onFilesAdded={(newFiles) =>
    setFiles((prev) => [...prev, ...newFiles.map((f) => ({ name: f.name, size: f.size }))])
  }
>
  {files.map((f) => (
    <FileItem
      key={f.name}
      filename={f.name}
      fileMeta={\`\${(f.size / 1024 / 1024).toFixed(1)} MB\`}
      onDelete={() => setFiles((prev) => prev.filter((x) => x.name !== f.name))}
    />
  ))}
</FileUploadArea>

// 이미지 썸네일
<FileThumbnail
  src="/img.jpg"
  filename="photo.jpg"
  size="large"
  layout="horizontal"
  onDownload={() => {}}
  onExpand={() => {}}
/>

// 파일 첨부 배지
<FileAttachBadge filename="report.pdf" onRemove={() => {}} />
`,
      },
    },
  },
};

/** 기본 업로드 영역 (비어있음) */
export const Default: Story = {
  render: () => <FileUploadArea onFilesAdded={(f) => alert(`${f.length}개 파일 추가`)} />,
};

/** 파일 첨부 완료 상태 */
export const WithFiles: Story = {
  name: "With Attached Files",
  render: () => {
    const [files, setFiles] = useState([
      { name: "계약서_v3.docx", size: "2.4 MB" },
      { name: "첨부자료.pdf", size: "1.1 MB" },
    ]);
    return (
      <FileUploadArea
        onFilesAdded={(newFiles) =>
          setFiles((prev) => [
            ...prev,
            ...newFiles.map((f) => ({ name: f.name, size: `${(f.size / 1024 / 1024).toFixed(1)} MB` })),
          ])
        }
      >
        {files.map((f) => (
          <FileItem
            key={f.name}
            filename={f.name}
            fileMeta={f.size}
            onDelete={() => setFiles((prev) => prev.filter((x) => x.name !== f.name))}
          />
        ))}
      </FileUploadArea>
    );
  },
};

/** 이미지 썸네일 — 사이즈 비교 */
export const Thumbnails: Story = {
  name: "Thumbnail Sizes",
  render: () => {
    const placeholder = "https://placehold.co/300x200/e2e8f0/64748b?text=Preview";
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Horizontal</p>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <FileThumbnail src={placeholder} filename="large.jpg" layout="horizontal" size="large" onDownload={() => {}} onExpand={() => {}} />
            <FileThumbnail src={placeholder} filename="medium.jpg" layout="horizontal" size="medium" onDownload={() => {}} onExpand={() => {}} />
            <FileThumbnail src={placeholder} filename="small.jpg" layout="horizontal" size="small" onDownload={() => {}} />
          </div>
        </div>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Vertical</p>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <FileThumbnail src="https://placehold.co/200x300/e2e8f0/64748b?text=V" filename="vertical_m.jpg" layout="vertical" size="medium" onDownload={() => {}} onExpand={() => {}} />
            <FileThumbnail src="https://placehold.co/200x300/e2e8f0/64748b?text=V" filename="vertical_s.jpg" layout="vertical" size="small" />
          </div>
        </div>
      </div>
    );
  },
};

/** FileItem — 상태 비교 */
export const FileItems: Story = {
  name: "File Item States",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 400 }}>
      <FileItem filename="보고서_최종.docx" fileMeta="2.4 MB" onDelete={() => {}} />
      <FileItem filename="계약서_수정본.pdf" fileMeta="1.1 MB" active onDelete={() => {}} />
      <FileItem filename="참고자료.xlsx" fileMeta="856 KB" />
    </div>
  ),
};

/** FileAttachBadge — 인라인 배지 */
export const Badges: Story = {
  name: "Attach Badges",
  render: () => {
    const [files, setFiles] = useState([
      "report_2024.pdf",
      "계약서.docx",
      "회의록_0315.hwp",
      "첨부이미지.png",
    ]);
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {files.map((f) => (
          <FileAttachBadge
            key={f}
            filename={f}
            onRemove={() => setFiles((prev) => prev.filter((x) => x !== f))}
          />
        ))}
      </div>
    );
  },
};
