import type { Meta, StoryObj } from "@storybook/react";
import { ListGroup, ListGroupItem, BottomSheet } from ".";
import { lightThemeClass } from "@lds/tokens";

/**
 * ## ListGroup
 *
 * 관련 항목을 세로로 나열하는 리스트 컨테이너.
 * Basic / Custom Content / With Badge / With Icon / Bottom Sheet(MO) 5가지 변형을 지원합니다.
 *
 * ### Import
 * ```tsx
 * import { ListGroup, ListGroupItem, BottomSheet } from "@lds/ui-v3";
 * ```
 *
 * ### Props (ListGroup)
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `variant` | `"default" \| "flush"` | `"default"` | default=항목 간 border, flush=border 없음 |
 * | `items` | `string[]` | - | 간편 API: 문자열 배열로 아이템 자동 생성 |
 * | `children` | `ReactNode` | - | ListGroupItem 직접 조합 |
 *
 * ### Props (ListGroupItem)
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `active` | `boolean` | `false` | 활성 상태 (파란 배경 + 흰 텍스트) |
 * | `danger` | `boolean` | `false` | 위험 항목 (빨간 텍스트) |
 * | `disabled` | `boolean` | `false` | 비활성 |
 * | `leading` | `ReactNode` | - | 좌측 아이콘/뱃지 영역 |
 * | `trailing` | `ReactNode` | - | 우측 시간/뱃지 영역 |
 * | `onClick` | `() => void` | - | 클릭 핸들러 |
 * | `children` | `ReactNode` | - | 항목 콘텐츠 |
 */
const meta: Meta<typeof ListGroup> = {
  title: "Components/ListGroup",
  component: ListGroup,
  decorators: [
    (Story) => (
      <div className={lightThemeClass} style={{ padding: 24, backgroundColor: "#f2f4f6" }}>
        <div style={{ maxWidth: 360 }}>
          <Story />
        </div>
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    variant: { description: "default=항목 간 border, flush=border 없음 (BottomSheet용)" },
    items: { description: "간편 API: 문자열 배열로 아이템 자동 생성" },
    children: { description: "ListGroupItem 직접 조합" },
  },
};
export default meta;
type Story = StoryObj<typeof ListGroup>;

export const TemplateCode: Story = {
  name: "Template Code",
  args: {
    items: ["전체", "계약심사", "입찰", "계약", "사후관리"],
  },
  parameters: {
    docs: {
      source: {
        code: `import { ListGroup, ListGroupItem, BottomSheet } from "@lds/ui-v3";

// Basic (간편 API)
<ListGroup items={["항목 1", "항목 2", "항목 3"]} />

// Basic (Compound 패턴)
<ListGroup>
  <ListGroupItem>항목 1</ListGroupItem>
  <ListGroupItem>항목 2</ListGroupItem>
</ListGroup>

// With Icon
<ListGroup>
  <ListGroupItem leading={<Icon />}>항목</ListGroupItem>
</ListGroup>

// Custom Content + active
<ListGroupItem active trailing={<span>3일 전</span>}>
  <strong>제목</strong>
  <p>내용</p>
</ListGroupItem>

// Bottom Sheet (MO)
<BottomSheet>
  <ListGroup variant="flush">
    <ListGroupItem leading={<span>🔏</span>}>인감 사용 신청</ListGroupItem>
    <ListGroupItem leading={<span>✕</span>} danger>계약 중단</ListGroupItem>
  </ListGroup>
</BottomSheet>
`,
      },
    },
  },
};

/* ─── Badge 아이콘 (20x20 원형) ─── */
const Badge = ({ color = "#7367f0" }: { color?: string }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 20,
      height: 20,
      borderRadius: "50%",
      backgroundColor: color,
      color: "#fff",
      fontSize: 10,
      fontWeight: 700,
      lineHeight: 1,
    }}
  >
    A
  </span>
);

/* ─── 아이콘 대용 (14x14) ─── */
const IconPlaceholder = ({ children = "📄" }: { children?: string }) => (
  <span style={{ fontSize: 14, lineHeight: 1 }}>{children}</span>
);

/** 0. Basic — 간편 API로 문자열 배열 전달 */
export const Basic: Story = {
  args: {
    items: ["전체", "계약심사", "입찰", "계약", "사후관리"],
  },
};

/** 1. Custom Content — 제목 + 내용 + 시간, active 상태 포함 */
export const CustomContent: Story = {
  render: () => (
    <ListGroup>
      <ListGroupItem
        active
        trailing={<span>3일 전</span>}
      >
        <div>
          <strong style={{ display: "block", marginBottom: 2 }}>합의체 검토요청</strong>
          <span style={{ opacity: 0.8 }}>합의체 검토 관련 내용이 여기에 표시됩니다.</span>
        </div>
      </ListGroupItem>
      <ListGroupItem trailing={<span>5일 전</span>}>
        <div>
          <strong style={{ display: "block", marginBottom: 2 }}>계약 변경 요청</strong>
          <span style={{ opacity: 0.7 }}>계약 내용 변경에 대한 안내입니다.</span>
        </div>
      </ListGroupItem>
      <ListGroupItem trailing={<span>1주 전</span>}>
        <div>
          <strong style={{ display: "block", marginBottom: 2 }}>입찰 공고</strong>
          <span style={{ opacity: 0.7 }}>신규 입찰 공고가 등록되었습니다.</span>
        </div>
      </ListGroupItem>
    </ListGroup>
  ),
};

/** 2. With Badge — 좌측 20x20 원형 뱃지 */
export const WithBadge: Story = {
  render: () => (
    <ListGroup>
      <ListGroupItem leading={<Badge color="#7367f0" />}>전체</ListGroupItem>
      <ListGroupItem leading={<Badge color="#28c76f" />}>계약심사</ListGroupItem>
      <ListGroupItem leading={<Badge color="#ff9f43" />}>입찰</ListGroupItem>
      <ListGroupItem leading={<Badge color="#00cfe8" />}>계약</ListGroupItem>
      <ListGroupItem leading={<Badge color="#ea5455" />}>사후관리</ListGroupItem>
    </ListGroup>
  ),
};

/** 3. With Icon — 좌측 14x14 아이콘 */
export const WithIcon: Story = {
  render: () => (
    <ListGroup>
      <ListGroupItem leading={<IconPlaceholder>📋</IconPlaceholder>}>전체</ListGroupItem>
      <ListGroupItem leading={<IconPlaceholder>🔍</IconPlaceholder>}>계약심사</ListGroupItem>
      <ListGroupItem leading={<IconPlaceholder>📢</IconPlaceholder>}>입찰</ListGroupItem>
      <ListGroupItem leading={<IconPlaceholder>📝</IconPlaceholder>}>계약</ListGroupItem>
      <ListGroupItem leading={<IconPlaceholder>📊</IconPlaceholder>}>사후관리</ListGroupItem>
    </ListGroup>
  ),
};

/** 4. Bottom Sheet (MO) — 드래그핸들 + flush 리스트 + danger 항목 */
export const BottomSheetMO: Story = {
  render: () => (
    <BottomSheet>
      <ListGroup variant="flush">
        <ListGroupItem leading={<IconPlaceholder>🔏</IconPlaceholder>} onClick={() => {}}>
          인감 사용 신청
        </ListGroupItem>
        <ListGroupItem leading={<IconPlaceholder>📋</IconPlaceholder>} onClick={() => {}}>
          첨부문서 확인
        </ListGroupItem>
        <ListGroupItem leading={<IconPlaceholder>💬</IconPlaceholder>} onClick={() => {}}>
          의견 작성
        </ListGroupItem>
        <ListGroupItem leading={<IconPlaceholder>✕</IconPlaceholder>} danger onClick={() => {}}>
          계약 중단
        </ListGroupItem>
      </ListGroup>
    </BottomSheet>
  ),
};

/** 5. All Sizes — default vs flush 비교 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h4 style={{ margin: "0 0 8px", fontSize: 14, color: "#666" }}>Default (42px, border)</h4>
        <ListGroup items={["항목 1", "항목 2", "항목 3"]} />
      </div>
      <div>
        <h4 style={{ margin: "0 0 8px", fontSize: 14, color: "#666" }}>Flush (52px, no border)</h4>
        <ListGroup variant="flush" items={["항목 1", "항목 2", "항목 3"]} />
      </div>
      <div>
        <h4 style={{ margin: "0 0 8px", fontSize: 14, color: "#666" }}>Clickable Items</h4>
        <ListGroup>
          <ListGroupItem onClick={() => {}}>클릭 가능 항목 1</ListGroupItem>
          <ListGroupItem onClick={() => {}}>클릭 가능 항목 2</ListGroupItem>
          <ListGroupItem onClick={() => {}} disabled>비활성 항목</ListGroupItem>
        </ListGroup>
      </div>
    </div>
  ),
};
