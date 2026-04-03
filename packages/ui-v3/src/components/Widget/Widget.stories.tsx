import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import {
  Widget,
  StatCell,
  StatGrid,
  QuickMenuItem,
  ScheduleItem,
} from ".";

/**
 * **Widget** — 대시보드 위젯 컴포넌트 모음
 */
const meta: Meta<typeof Widget> = {
  title: "Components/Widget",
  component: Widget,
  decorators: [
    (Story) => (
      <div
        className={lightThemeClass}
        style={{ padding: 24, backgroundColor: "#f2f4f6", maxWidth: 640 }}
      >
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Widget>;

export const TemplateCode: Story = {
  name: "Template Code",
  render: () => (
    <Widget title="라이선스 현황">
      <StatGrid>
        <StatCell label="전체" value={120} valueColor="heading" />
        <StatCell label="사용중" value={98} valueColor="primary" active />
        <StatCell label="만료 예정" value={15} valueColor="warning" />
        <StatCell label="만료" value={7} valueColor="danger" />
      </StatGrid>
    </Widget>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Widget, StatCell, StatGrid, QuickMenuItem, ScheduleItem } from "@lds/ui-v3";

// 통계 위젯
<Widget title="라이선스 현황">
  <StatGrid>
    <StatCell label="전체" value={120} valueColor="heading" />
    <StatCell label="사용중" value={98} valueColor="primary" active />
    <StatCell label="만료 예정" value={15} valueColor="warning" />
    <StatCell label="만료" value={7} valueColor="danger" />
  </StatGrid>
</Widget>

// 접기/펼치기 + 뱃지
<Widget title="공지사항" badge={3} collapsible>
  <p>내용</p>
</Widget>

// 퀵 메뉴
<Widget title="퀵 메뉴">
  <div style={{ display: "flex", gap: 8 }}>
    <QuickMenuItem icon={<FileIcon />} label="계약" />
    <QuickMenuItem icon={<FileIcon />} label="소송" />
  </div>
</Widget>

// 일정 리스트
<Widget title="최근 일정" badge={6} collapsible>
  <ScheduleItem date="2025.03.21" title="계약 검토 회의" body="A사 라이선스 계약 검토" />
</Widget>

// Flush (테이블 스타일, 패딩 제거)
<Widget title="최근 문서" badge={12} flush>
  {/* 테이블 컨텐츠 */}
</Widget>
`,
      },
    },
  },
};

/** 통계 위젯 */
export const Statistics: Story = {
  render: () => (
    <Widget title="라이선스 현황">
      <StatGrid>
        <StatCell label="전체" value={120} valueColor="heading" />
        <StatCell label="사용중" value={98} valueColor="primary" active />
        <StatCell label="만료 예정" value={15} valueColor="warning" />
        <StatCell label="만료" value={7} valueColor="danger" />
      </StatGrid>
    </Widget>
  ),
};

/** 접기/펼치기 위젯 */
export const Collapsible: Story = {
  render: () => (
    <Widget title="공지사항" badge={3} collapsible>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <p style={{ fontSize: 14, margin: 0 }}>시스템 점검 안내 (3/25)</p>
        <p style={{ fontSize: 14, margin: 0 }}>신규 기능 업데이트</p>
        <p style={{ fontSize: 14, margin: 0 }}>보안 패치 적용 완료</p>
      </div>
    </Widget>
  ),
};

/** 퀵 메뉴 */
export const QuickMenu: Story = {
  name: "Quick Menu",
  render: () => {
    const FileIcon = () => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M9 1H4.5C3.67 1 3 1.67 3 2.5v11c0 .83.67 1.5 1.5 1.5h7c.83 0 1.5-.67 1.5-1.5V5L9 1z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
    return (
      <Widget title="퀵 메뉴">
        <div style={{ display: "flex", gap: 8 }}>
          <QuickMenuItem icon={<FileIcon />} label="계약" active />
          <QuickMenuItem icon={<FileIcon />} label="소송" />
          <QuickMenuItem icon={<FileIcon />} label="프로젝트" />
          <QuickMenuItem icon={<FileIcon />} label="자문" />
        </div>
      </Widget>
    );
  },
};

/** 일정 리스트 */
export const Schedule: Story = {
  name: "Latest Schedule",
  render: () => (
    <Widget title="최근 일정" badge={6} collapsible>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <ScheduleItem
          date="2025.03.21"
          title="계약 검토 회의"
          body="A사 라이선스 계약 검토 및 조건 협의"
        />
        <ScheduleItem
          date="2025.03.22"
          title="소송 준비"
          body="B건 관련 준비서면 작성"
        />
        <ScheduleItem
          date="2025.03.25"
          title="시스템 점검"
          body="분기별 정기 점검 및 백업"
        />
      </div>
    </Widget>
  ),
};

/** 빈 위젯 (flush body) */
export const FlushBody: Story = {
  name: "Flush (Table Style)",
  render: () => (
    <Widget title="최근 문서" badge={12} flush>
      <div>
        <div style={{ display: "flex", alignItems: "center", height: 38, backgroundColor: "#f1f4f9", padding: "0 20px", borderBottom: "1px solid #cfd5e1" }}>
          <span style={{ flex: 1, fontSize: 13, fontWeight: 700, color: "#11152a", letterSpacing: 1 }}>번호</span>
          <span style={{ flex: 3, fontSize: 13, fontWeight: 700, color: "#11152a", letterSpacing: 1 }}>제목</span>
          <span style={{ flex: 1, fontSize: 13, fontWeight: 700, color: "#11152a", letterSpacing: 1 }}>날짜</span>
        </div>
        {[1, 2, 3].map((n) => (
          <div key={n} style={{ display: "flex", alignItems: "center", height: 58, padding: "0 20px", borderBottom: "1px solid #cfd5e1" }}>
            <span style={{ flex: 1, fontSize: 13, color: "#11152a" }}>{n}</span>
            <span style={{ flex: 3, fontSize: 13, fontWeight: 600, color: "#11152a" }}>문서 제목 예시 {n}</span>
            <span style={{ flex: 1, fontSize: 13, color: "#82868b" }}>2025.03.{20 + n}</span>
          </div>
        ))}
      </div>
    </Widget>
  ),
};

/** StatCell 색상 비교 */
export const StatColors: Story = {
  name: "Stat Cell Colors",
  render: () => (
    <StatGrid>
      <StatCell label="Primary" value={120} valueColor="primary" />
      <StatCell label="Heading" value={98} valueColor="heading" />
      <StatCell label="Success" value={45} valueColor="success" />
      <StatCell label="Danger" value={7} valueColor="danger" />
      <StatCell label="Warning" value={15} valueColor="warning" />
    </StatGrid>
  ),
};
