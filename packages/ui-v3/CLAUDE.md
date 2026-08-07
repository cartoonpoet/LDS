# @lawkit/ui 컴포넌트 레퍼런스

이 파일은 자동 생성됩니다. `pnpm --filter @lawkit/ui docs` 로 재생성하세요.

@lawkit/ui 컴포넌트 사용 시 아래 템플릿 코드를 참고하세요.
모든 컴포넌트는 `import { ComponentName } from "@lawkit/ui"` 로 사용합니다.

---

## Alert

```tsx
import { Alert } from "@lds/ui-v3";

// 기본 사용
<Alert type="info" closable onClose={() => {}}>
  중요! 이것은 기본 알림입니다. 확인해주세요!
</Alert>

// 제목 + 본문 (Expanded)
<Alert type="info" title="알림 제목" closable>
  이것은 확장된 알림입니다. 제목과 본문이 분리됩니다.
</Alert>

// 텍스트 버튼 포함
<Alert type="info" textButton={{ label: "자세히 보기", onClick: handleClick }}>
  알림 메시지
</Alert>

// 액션 버튼 포함 (승인/반려)
<Alert type="confirm" title="의견 검토 중" actions={[
  { label: "승인", intent: "primary", onClick: handleApprove },
  { label: "반려", intent: "warning", onClick: handleReject },
]}>
  의견 검토 중 (검토자 : 김팀장)
</Alert>

// 작은 사이즈
<Alert type="info" size="small">
  작은 사이즈 알림입니다.
</Alert>
```

## AutoComplete

```tsx
const [value, setValue] = useState("");

const options = [
  { value: "jhson1", label: "손준호 (jhson1)" },
  { value: "kim01", label: "김민수 (kim01)" },
  { value: "park22", label: "박서연 (park22)" },
];

<AutoComplete
  options={options}
  value={value}
  onChange={(val) => setValue(val)}
  placeholder="이름 또는 ID로 검색"
/>
```

## Avatar

```tsx
import { Avatar, AvatarGroup } from "@lds/ui-v3";

// Photo 아바타
<Avatar src="/photo.jpg" size="md" />

// System 아바타
<Avatar system />

// 이니셜 아바타
<Avatar initials="PI" color="success" />

// 상태 표시
<Avatar src="/photo.jpg" status="online" />

// 아바타 그룹
<AvatarGroup>
  <Avatar src="/a.jpg" size="sm" />
  <Avatar src="/b.jpg" size="sm" />
</AvatarGroup>
```

## Badge

```tsx
import { Badge } from "@lds/ui-v3";

// 기본 (filled / primary)
<Badge>Label</Badge>

// 변형
<Badge variant="outline">Outline</Badge>
<Badge variant="muted" tone="neutral">Muted</Badge>

// 아이콘 + 닫기 버튼
<Badge leadingIcon={<MyIcon />}>아이콘</Badge>
<Badge dismissible onDismiss={handleDismiss}>닫기 가능</Badge>

// 아이콘 전용
<Badge iconOnly leadingIcon={<MyIcon />} aria-label="알림" />
```

## Breadcrumb

```tsx
import { Breadcrumb } from "@lds/ui-v3";

// 기본 — 마지막 항목이 현재 페이지 (aria-current="page")
<Breadcrumb
  items={[
    { label: "홈", href: "/" },
    { label: "계약", href: "/contracts" },
    { label: "계약 상세" },
  ]}
/>

// 구분자 커스텀 (chevron 등)
<Breadcrumb items={items} separator=">" />

// 라우터 연동 (onClick)
<Breadcrumb
  items={[
    { label: "홈", href: "/", onClick: (e) => { e.preventDefault(); router.push("/"); } },
    { label: "현재 페이지" },
  ]}
/>

// 작은 사이즈
<Breadcrumb items={items} size="small" />
```

## Button

```tsx
import { Button } from "@lds/ui-v3";

// 기본 버튼
<Button>확인</Button>

// Outline 버튼
<Button variant="outline">취소</Button>

// 색상 변경
<Button color="danger">삭제</Button>
<Button variant="outline" color="secondary">보류</Button>

// 크기 변경
<Button size="small">작은 버튼</Button>
<Button size="large">큰 버튼</Button>

// 아이콘 포함
<Button iconLeft={<MyIcon />}>아이콘 버튼</Button>
<Button iconRight={<ArrowIcon />}>다음</Button>

// Pill 모양
<Button shape="round">라운드</Button>

// 비활성화
<Button disabled>비활성화</Button>

// 이벤트 핸들러
<Button onClick={handleSubmit}>제출</Button>
```

## ButtonGroup

```tsx
import { useState } from "react";
import { ButtonGroup } from "@lds/ui-v3";

const [value, setValue] = useState("left");

// 기본 Fill 스타일
<ButtonGroup
  items={[
    { value: "left", label: "Left" },
    { value: "center", label: "Center" },
    { value: "right", label: "Right" },
  ]}
  value={value}
  onChange={setValue}
/>

// Outline 스타일
<ButtonGroup items={items} value={value} onChange={setValue} variant="outline" />

// Small 사이즈 + 아이콘
<ButtonGroup
  items={[
    { value: "a", label: "옵션A", icon: <MyIcon /> },
    { value: "b", label: "옵션B", icon: <MyIcon /> },
  ]}
  value={value}
  onChange={setValue}
  size="small"
/>
```

## ButtonTab

```tsx
import { useState } from "react";
import { ButtonTab } from "@lds/ui-v3";

const [tab, setTab] = useState("tab1");

<ButtonTab
  items={[
    { value: "tab1", label: "Tab 1" },
    { value: "tab2", label: "Tab 2" },
    { value: "tab3", label: "Tab 3", disabled: true },
    { value: "tab4", label: "Tab 4" },
  ]}
  value={tab}
  onChange={setTab}
/>
```

## CalendarPopover

```tsx
import { CalendarPopover } from "@lds/ui-v3";

<CalendarPopover
  badge="계약검토"
  title="휴맥스이브이 법무시스템 Law.ai 공급 계약"
  fields={[
    { label: "관리번호", value: "C20221108-0001" },
    { label: "상대계약자", value: "휴맥스이브이" },
    { label: "요청자", value: "박영업" },
    { label: "법무팀 담당자", value: "이법무" },
    { label: "수정일", value: "2023-06-13" },
  ]}
  primaryText="일정 수정"
  secondaryText="사건 바로가기"
  placement="right"
>
  <button>6/15</button>
</CalendarPopover>
```

## Card

```tsx
import { Card, CardHeader, CardBody, CardFooter } from "@lds/ui-v3";

// 간편 API — 헤더만
<Card header="헤더" title="카드 타이틀">
  <p>카드 본문 텍스트</p>
</Card>

// 간편 API — 헤더 + 푸터
<Card header="헤더" title="카드 타이틀" footer="푸터">
  <p>카드 본문 텍스트</p>
</Card>

// Bordered 변형 + 헤더 액션
<Card
  header="결재선"
  bordered
  headerActions={
    <div style={{ display: "flex", gap: 8 }}>
      <Button variant="outline" color="secondary" size="small">결재의견 추가</Button>
      <Button size="small">결재하기</Button>
    </div>
  }
>
  <p>결재선 콘텐츠</p>
</Card>

// Compound 패턴 — 자유 레이아웃
<Card bordered>
  <CardHeader actions={<Button size="small">액션</Button>}>
    커스텀 헤더
  </CardHeader>
  <CardBody>
    <p>본문 콘텐츠</p>
  </CardBody>
  <CardFooter>커스텀 푸터</CardFooter>
</Card>

// Body만 (헤더/푸터 없음)
<Card>
  <p>심플 카드</p>
</Card>
```

## ChartTooltip

```tsx
import { ChartTooltip } from "@lds/ui-v3";

// Default (헤더 + 컬러 dot)
<ChartTooltip
  header="12/12"
  items={[{ label: "Label :", value: 90, color: "#2151EC" }]}
/>

// Pie (파란 배경)
<ChartTooltip
  variant="pie"
  items={[{ label: "Label :", value: 90 }]}
/>

// 여러 시리즈
<ChartTooltip
  header="2023-06-15"
  items={[
    { label: "계약건수 :", value: 120, color: "#2151EC" },
    { label: "소송건수 :", value: 45, color: "#F04438" },
    { label: "자문건수 :", value: 78, color: "#12B76A" },
  ]}
/>
```

## Checkbox

```tsx
import { useState } from "react";
import { Checkbox } from "@lds/ui-v3";

const [checked, setChecked] = useState(false);

<Checkbox label="동의합니다" checked={checked} onCheckedChange={setChecked} />
<Checkbox size="small" label="소형" />
<Checkbox size="large" label="대형" disabled />
```

## Chip

```tsx
import { Chip } from "@lds/ui-v3";

// 기본
<Chip>Option 1</Chip>

// 선택 표시 (체크형)
<Chip checkable selected>선택됨</Chip>

// 삭제 가능
<Chip dismissible onDismiss={handleDismiss}>필터</Chip>

// 아이콘 포함
<Chip leadingIcon={<MyIcon />}>아이콘</Chip>
```

## ChipsNavigation

```tsx
import { useState } from "react";
import { ChipsNavigation } from "@lds/ui-v3";

// 단일 선택
const [filter, setFilter] = useState<string | string[]>("");

<ChipsNavigation
  items={[
    { value: "opt1", label: "Option 1" },
    { value: "opt2", label: "Option 2" },
    { value: "opt3", label: "Option 3" },
  ]}
  value={filter}
  onChange={setFilter}
/>

// 다중 선택
const [filters, setFilters] = useState<string | string[]>([]);

<ChipsNavigation
  items={items}
  value={filters}
  onChange={setFilters}
  multiple
/>

// "All" 텍스트 커스텀
<ChipsNavigation
  items={items}
  value={filter}
  onChange={setFilter}
  allLabel="전체"
/>
```

## Collapse

```tsx
import { useState } from "react";
import { Collapse, CollapseGroup } from "@lds/ui-v3";

// 기본 (Uncontrolled)
<Collapse header="헤더">
  <p>접기/펼치기 콘텐츠</p>
</Collapse>

// Controlled
const [open, setOpen] = useState(false);
<Collapse header="헤더" expanded={open} onToggle={setOpen}>
  <p>콘텐츠</p>
</Collapse>

// 스타일 변형
<Collapse variant="shadow" header="Shadow">콘텐츠</Collapse>
<Collapse variant="border" header="Border">콘텐츠</Collapse>
<Collapse variant="margin" header="Margin">콘텐츠</Collapse>

// 그룹 (아코디언 배치)
<CollapseGroup variant="margin">
  <Collapse variant="margin" header="패널 1">내용 1</Collapse>
  <Collapse variant="margin" header="패널 2">내용 2</Collapse>
</CollapseGroup>
```

## DataTable

```tsx
import { useState } from "react";
import { DataTable } from "@lds/ui-v3";
import type { ColumnDef, SortingState, RowSelectionState } from "@tanstack/react-table";

// 1. 데이터 타입 정의
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

// 2. 컬럼 정의
const columns: ColumnDef<User>[] = [
  { accessorKey: "id", header: "번호", size: 80 },
  { accessorKey: "name", header: "이름" },
  { accessorKey: "email", header: "이메일" },
  { accessorKey: "role", header: "역할", size: 120 },
  { accessorKey: "status", header: "상태", size: 100 },
];

// 3. 기본 사용
<DataTable data={users} columns={columns} />

// 4. 정렬 + 선택 + bordered
function UserTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  return (
    <DataTable
      data={users}
      columns={columns}
      selectable
      bordered
      sorting={sorting}
      onSortingChange={setSorting}
      rowSelection={rowSelection}
      onRowSelectionChange={setRowSelection}
      getRowId={(row) => String(row.id)}
      onRowClick={(row) => console.log(row)}
      emptyText="조회된 데이터가 없습니다."
    />
  );
}
```

## DatePicker

```tsx
import { useState } from "react";
import { DatePicker, DateRangePicker } from "@lds/ui-v3";

function MyPage() {
  const [date, setDate] = useState<Date | null>(new Date());
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);

  return (
    <>
      {/* 단일 날짜 선택 */}
      <DatePicker value={date} onChange={setDate} />

      {/* 시간 포함 */}
      <DatePicker value={date} onChange={setDate} showTime />

      {/* 날짜 범위 선택 */}
      <DateRangePicker
        startDate={start}
        endDate={end}
        onChange={({ start, end }) => { setStart(start); setEnd(end); }}
      />
    </>
  );
}
```

## Dropdown

```tsx
import { useState } from "react";
import { Dropdown } from "@lds/ui-v3";

// 기본 단일 선택
<Dropdown
  options={[
    { value: "1y", label: "지난 1년" },
    { value: "3y", label: "지난 3년" },
  ]}
  placeholder="기간 선택"
  onChange={(val) => console.log(val)}
/>

// Multi Level (설명 포함)
<Dropdown
  options={[
    { value: "add", label: "결재자 추가", description: "문서에 결재자를 추가합니다." },
  ]}
/>

// Multi Check (다중 선택)
<Dropdown
  multiple
  panelHeader="부서 선택"
  options={[{ value: "sales", label: "영업팀" }, { value: "dev", label: "개발팀" }]}
  onChange={(values) => console.log(values)}
/>

// Controlled
const [value, setValue] = useState("1y");
<Dropdown options={options} value={value} onChange={setValue} />
```

## FileUpload

```tsx
import { useState } from "react";
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
```

## FloatingModal

```tsx
import { useState } from "react";
import { FloatingModal, Button } from "@lds/ui-v3";

function MyPage() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>플로팅 모달 열기</Button>

      {/* 우하단 고정, backdrop 없음 — 페이지 조작 가능 */}
      <FloatingModal
        open={open}
        onClose={() => setOpen(false)}
        title="파일 업로드"
        collapsible
        footer={<Button onClick={() => setOpen(false)}>완료</Button>}
      >
        <p>계약서_최종.pdf 업로드 중… (75%)</p>
      </FloatingModal>

      {/* 좌하단 + Escape 닫기 */}
      <FloatingModal
        open={open}
        onClose={() => setOpen(false)}
        title="메모"
        position="bottom-left"
        closeOnEscape
      >
        <p>작성 중인 메모</p>
      </FloatingModal>
    </>
  );
}
```

## FullScreenModal

```tsx
import { useState } from "react";
import { FullScreenModal, Button } from "@lds/ui-v3";

function MyPage() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>전체화면 모달 열기</Button>

      {/* 상단 고정 헤더 + 스크롤 바디 + 하단 푸터 */}
      <FullScreenModal
        open={open}
        onClose={() => setOpen(false)}
        title="계약서 편집"
        footer={
          <>
            <Button variant="outline" color="secondary" onClick={() => setOpen(false)}>취소</Button>
            <Button onClick={() => setOpen(false)}>저장</Button>
          </>
        }
      >
        <p>전체화면 본문 콘텐츠</p>
      </FullScreenModal>

      {/* Escape 닫기 비활성 */}
      <FullScreenModal
        open={open}
        onClose={() => setOpen(false)}
        title="문서 작성"
        disableEscapeClose
      >
        <p>작성 중 실수로 닫히지 않도록 Escape를 막습니다.</p>
      </FullScreenModal>
    </>
  );
}
```

## IconButtonGroup

```tsx
import { useState } from "react";
import { IconButtonGroup } from "@lds/ui-v3";

const [view, setView] = useState("card");

<IconButtonGroup
  items={[
    { value: "card", icon: <CardIcon />, "aria-label": "카드 보기" },
    { value: "grid", icon: <GridIcon />, "aria-label": "그리드 보기" },
    { value: "list", icon: <MenuIcon />, "aria-label": "리스트 보기" },
  ]}
  value={view}
  onChange={setView}
  variant="fill"
/>
```

## InfoPopover

```tsx
import { InfoPopover } from "@lds/ui-v3";

<InfoPopover
  title="법무검토 중 외 3개"
  steps={[
    { label: "법무 검토 중" },
    { label: "요청자 검토 중" },
    { label: "계약서 검토 완료" },
    { label: "체결 품의 중" },
  ]}
>
  <span>법무검토 중 외 3개</span>
</InfoPopover>
```

## Input

```tsx
import { useState } from "react";
import { Input, InputGroup, MultiSelect } from "@lds/ui-v3";
import type { MultiSelectItem } from "@lds/ui-v3";

// 기본
<Input placeholder="이메일 입력" />

// 사이즈
<Input placeholder="Small" inputSize="small" />
<Input placeholder="Medium" inputSize="medium" />
<Input placeholder="Large" inputSize="large" />

// 왼쪽 아이콘 + 접미사
<Input placeholder="검색" leftIcon={<SearchIcon />} suffix={<span>Option ▾</span>} />

// InputGroup (라벨 + 도움말 + 상태)
<InputGroup label="Email" required helperText="유효한 이메일을 입력하세요" state="default">
  <Input placeholder="email@example.com" />
</InputGroup>

// MultiSelect
const [items, setItems] = useState<MultiSelectItem[]>([
  { key: "1", label: "User Name1" },
]);
<MultiSelect
  value={items}
  onRemove={(key) => setItems((prev) => prev.filter((i) => i.key !== key))}
  placeholder="검색..."
/>
```

## LinkBadge

```tsx
import { LinkBadge } from "@lds/ui-v3";

// 기본 (outline / primary) — 계약번호 등 식별자 링크
<LinkBadge href="/contracts/C2026-01">C2026-01</LinkBadge>

// 새 탭으로 열기 (↗ 표시 + rel 가드 자동)
<LinkBadge href="https://example.com" external>외부 문서</LinkBadge>

// 변형
<LinkBadge href="#" variant="filled">Filled</LinkBadge>
<LinkBadge href="#" variant="muted" tone="neutral">Muted</LinkBadge>

// 아이콘 포함
<LinkBadge href="#" leadingIcon={<MyIcon />}>아이콘</LinkBadge>
```

## ListGroup

```tsx
import { ListGroup, ListGroupItem, BottomSheet } from "@lds/ui-v3";

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
```

## Mention

```tsx
import { Mention } from "@lds/ui-v3";

// 기본 멘션
<Mention name="나담당" />

// 문장 내 사용
<p>검토자: <Mention name="나담당" /> 님이 확인 중입니다.</p>

// 여러 멘션
<div style={{ display: "flex", gap: 8 }}>
  <Mention name="김철수" />
  <Mention name="이영희" />
</div>
```

## Modal

```tsx
import { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "@lds/ui-v3";

function MyPage() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>모달 열기</Button>

      {/* 간편 API */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        size="medium"
        title="모달 제목"
        footer={
          <>
            <Button variant="outline" color="secondary">취소</Button>
            <Button>저장</Button>
          </>
        }
      >
        <p>모달 본문</p>
      </Modal>

      {/* Compound 패턴 */}
      <Modal open={open} onClose={() => setOpen(false)} size="xlarge">
        <ModalHeader>커스텀 헤더</ModalHeader>
        <ModalBody><p>본문</p></ModalBody>
        <ModalFooter><Button>확인</Button></ModalFooter>
      </Modal>
    </>
  );
}
```

## NavigationTab

```tsx
import { useState } from "react";
import { NavigationTab } from "@lds/ui-v3";
import type { NavigationTabItem } from "@lds/ui-v3";

const [tab, setTab] = useState("overview");

// 아이콘 + 라벨
<NavigationTab
  items={[
    { value: "overview", label: "Overview", icon: <InfoIcon /> },
    { value: "details", label: "Details", icon: <DetailIcon /> },
    { value: "settings", label: "Settings", icon: <SettingsIcon /> },
  ]}
  value={tab}
  onChange={setTab}
/>

// 텍스트만
<NavigationTab
  items={[
    { value: "a", label: "Overview" },
    { value: "b", label: "Details" },
  ]}
  value={tab}
  onChange={setTab}
/>
```

## NumberInput

```tsx
import { useState } from "react";
import { NumberInput } from "@lds/ui-v3";

const [count, setCount] = useState(50);

// 기본
<NumberInput value={count} onChange={setCount} />

// 사이즈
<NumberInput size="small" value={count} onChange={setCount} />
<NumberInput size="large" value={count} onChange={setCount} />

// Min / Max / Step
<NumberInput value={count} onChange={setCount} min={0} max={100} step={5} />

// 비활성화
<NumberInput value={50} disabled />
```

## Pagination

```tsx
import { useState } from "react";
import { Pagination, PaginationCount } from "@lds/ui-v3";

function MyPage() {
  const [page, setPage] = useState(1);
  return (
    <>
      {/* Basic */}
      <Pagination page={page} totalPages={10} onPageChange={setPage} />

      {/* With Count */}
      <Pagination page={page} totalPages={100} onPageChange={setPage} totalCount={1144} />

      {/* Count only */}
      <PaginationCount totalCount={1144} />
    </>
  );
}
```

## Popover

```tsx
import { Popover } from "@lds/ui-v3";

// 기본 (간편 API)
<Popover
  title="Popover Title"
  content="This is a very beautiful popover, show some love."
  confirmText="Read More"
  cancelText="Skip"
  placement="right"
>
  <button>Click me</button>
</Popover>

// 커스텀 바디 (compound)
<Popover title="Custom" popoverBody={<MyCustomContent />} placement="bottom">
  <button>Click</button>
</Popover>
```

## Progress

```tsx
import { ProgressBar, StepBar } from "@lds/ui-v3";

// Basic
<ProgressBar value={75} />

// With value label
<ProgressBar value={75} showValue />

// Striped + animated
<ProgressBar value={60} striped animated />

// Multiple bars
<ProgressBar segments={[
  { value: 30, color: "primary", label: "30%" },
  { value: 45, color: "warning", label: "45%" },
  { value: 15, color: "danger", label: "15%" },
]} />

// StepBar
<StepBar steps={[
  { label: "임시 저장", status: "completed" },
  { label: "법무검토 중", status: "active" },
  { label: "계약 종료", status: "scheduled" },
]} />
```

## Radio

```tsx
import { useState } from "react";
import { Radio, RadioGroup } from "@lds/ui-v3";

const [selected, setSelected] = useState("a");

// Basic
<RadioGroup value={selected} onChange={setSelected}>
  <Radio value="a" label="Option A" />
  <Radio value="b" label="Option B" />
  <Radio value="c" label="Option C" />
</RadioGroup>

// Customized 변형 (테두리 스타일)
<RadioGroup variant="customized" value={selected} onChange={setSelected}>
  <Radio value="a" label="Option A" />
  <Radio value="b" label="Option B" />
</RadioGroup>

// 수직 정렬
<RadioGroup value={selected} onChange={setSelected} vertical>
  <Radio value="a" label="Option A" />
  <Radio value="b" label="Option B" />
</RadioGroup>

// 사이즈
<RadioGroup size="small" value={selected} onChange={setSelected}>
  <Radio value="a" label="Small A" />
  <Radio value="b" label="Small B" />
</RadioGroup>
```

## Skeleton

```tsx
import { Skeleton } from "@lds/ui-v3";

// 사각형
<Skeleton width={200} height={120} />

// 원형 아바타
<Skeleton variant="circle" width={40} height={40} />

// 텍스트 3줄
<Skeleton variant="text" lines={3} />

// Skeleton.Content — 로딩 ↔ 콘텐츠 자동 전환
<Skeleton.Content
  loading={isLoading}
  fallback={<Skeleton variant="text" lines={3} />}
>
  <p>{data.content}</p>
</Skeleton.Content>
```

## Slider

```tsx
import { useState } from "react";
import { Slider, RangeSlider } from "@lds/ui-v3";

const [value, setValue] = useState(50);
const [range, setRange] = useState<[number, number]>([25, 75]);

// 기본 슬라이더
<Slider value={value} onChange={setValue} />

// 틱 + 라벨 + 값 배지
<Slider value={value} onChange={setValue} showTicks showLabels showValue />

// Step 설정
<Slider value={value} onChange={setValue} step={10} showTicks showLabels showValue />

// 범위 슬라이더
<RangeSlider value={range} onChange={setRange} showTicks />

// 범위 슬라이더 + 라벨 + 값 배지
<RangeSlider value={range} onChange={setRange} showTicks showLabels showValue />

// 비활성화
<Slider value={50} disabled showTicks showLabels />
```

## Spinner

```tsx
import { Spinner } from "@lds/ui-v3";

// 기본
<Spinner />

// 크기 변경
<Spinner size="lg" />

// 라벨 포함
<Spinner size="lg" label="로딩 중..." />

// 흰색 (어두운 배경용)
<Spinner color="white" />
```

## Stack

```tsx
import { HStack, VStack } from "@lds/ui-v3";

// 기본 — gap만
<HStack gap="x2">
  <Button>취소</Button>
  <Button color="primary">확인</Button>
</HStack>

// 헤더 양끝 배치
<HStack gap="x3" justify="between" align="center">
  <h2>제목</h2>
  <Button>추가</Button>
</HStack>

// 폼 세로 쌓기
<VStack gap="x4">
  <Input label="이름" />
  <Input label="이메일" />
  <Button>제출</Button>
</VStack>
```

## SweetAlert

```tsx
import { useState } from "react";
import { SweetAlert, Button } from "@lds/ui-v3";

const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>삭제</Button>

<SweetAlert
  open={open}
  onClose={() => setOpen(false)}
  intent="warning"
  title="정말 삭제하시겠습니까?"
  confirmLabel="삭제"
  onConfirm={handleDelete}
  cancelLabel="취소"
  onCancel={() => setOpen(false)}
>
  <p>삭제된 데이터는 복구할 수 없습니다.</p>
</SweetAlert>

// Intent 종류: "warning" | "success" | "danger" | "info"
```

## Switch

```tsx
import { useState } from "react";
import { Switch } from "@lds/ui-v3";

const [on, setOn] = useState(false);

// 기본
<Switch label="알림 받기" checked={on} onCheckedChange={setOn} />

// Small
<Switch size="small" checked={on} onCheckedChange={setOn} />

// 라벨 없이
<Switch checked={on} onCheckedChange={setOn} />

// 비활성화
<Switch label="Disabled" disabled />
<Switch label="Disabled On" checked disabled />
```

## Tabs

```tsx
import { useState } from "react";
import { Tabs } from "@lds/ui-v3";
import type { TabItem } from "@lds/ui-v3";

const [tab, setTab] = useState("tab1");

// 기본 탭
<Tabs
  items={[
    { value: "tab1", label: "Tab 1" },
    { value: "tab2", label: "Tab 2" },
    { value: "tab3", label: "Tab 3" },
  ]}
  value={tab}
  onChange={setTab}
/>

// Badge 탭
<Tabs
  items={[
    { value: "tab1", label: "Tab 1", badge: 12 },
    { value: "tab2", label: "Tab 2", badge: 9 },
    { value: "tab3", label: "Tab 3", badge: 3 },
  ]}
  value={tab}
  onChange={setTab}
  size="medium"
/>

// Action 버튼 포함
<Tabs
  items={items}
  value={tab}
  onChange={setTab}
  action={{
    label: "Add Tab",
    icon: <PlusIcon />,
    onClick: handleAddTab,
  }}
/>
```

## TagSelect

```tsx
import { useState } from "react";
import { TagSelect } from "@lds/ui-v3";

const [value, setValue] = useState<string[]>([]);

<TagSelect
  options={[
    { value: "1", label: "Option A" },
    { value: "2", label: "Option B" },
    { value: "3", label: "Option C" },
  ]}
  value={value}
  onChange={setValue}
  placeholder="Placeholder"
/>
```

## Textarea

```tsx
import { Textarea, InputGroup } from "@lds/ui-v3";

// 기본
<Textarea placeholder="내용을 입력하세요" />

// 사이즈 / 줄 수
<Textarea textareaSize="small" rows={3} />
<Textarea textareaSize="large" rows={6} />

// 상태
<Textarea state="warning" defaultValue="필수 항목입니다" />
<Textarea state="disabled" placeholder="비활성화" />

// 리사이즈 잠금
<Textarea resize="none" />

// 글자수 표시
<Textarea maxLength={200} showCount placeholder="200자 이내로 입력" />

// InputGroup과 함께 (라벨 + 도움말)
<InputGroup label="비고" helperText="선택 입력 항목입니다">
  <Textarea placeholder="비고를 입력하세요" />
</InputGroup>
```

## Toast

```tsx
import { Toast, ToastContainer } from "@lds/ui-v3";

// 1-row
<Toast title="Toast Title" intent="info" onClose={() => {}} />

// 2-row + progress
<Toast
  title="Toast Title"
  time="11 mins ago"
  description="상세 설명 텍스트"
  showProgress
  progress={67}
  intent="info"
  onClose={() => {}}
/>

// 자동 닫기 (5초) + 호버 일시정지
<Toast
  title="5초 후 자동 닫기"
  intent="info"
  duration={5000}
  pauseOnHover
  onClose={() => {}}
/>

// Container로 위치 지정
<ToastContainer position="top-right">
  <Toast title="알림" intent="success" onClose={() => {}} />
</ToastContainer>

// Intent 종류: "info" | "success" | "warning" | "error"
```

## Tooltip

```tsx
import { Tooltip } from "@lds/ui-v3";

// 1-row (기본)
<Tooltip content="Tooltip right" placement="right">
  <button>Hover me</button>
</Tooltip>

// 2-row (제목 + 내용)
<Tooltip title="이법무(법무팀)" content={"bmlee3@humaxit.com\\n010-1234-5678"} placement="right">
  <span>이법무</span>
</Tooltip>
```

## TreeView

```tsx
import { TreeView } from "@lds/ui-v3";
import type { TreeNode } from "@lds/ui-v3";

const nodes: TreeNode[] = [
  {
    id: "root",
    label: "상위 마스터",
    labelColor: "primary",
    columns: [
      { text: "C20190301", type: "code" },
      { text: "계약 제목", type: "title" },
      { text: "2019-01-03", type: "date" },
    ],
    children: [
      {
        id: "child-1",
        label: "하위",
        labelColor: "secondary",
        columns: [
          { text: "C20190301-01", type: "code" },
          { text: "하위 계약 제목", type: "title" },
          { text: "2020-01-03", type: "date" },
        ],
      },
    ],
  },
];

// 기본
<TreeView nodes={nodes} defaultExpandedIds={["root"]} />

// 노드 선택
<TreeView
  nodes={nodes}
  defaultExpandedIds={["root"]}
  selectedId={selectedId}
  onNodeSelect={(node) => setSelectedId(node.id)}
/>
```

## Widget

```tsx
import { Widget, StatCell, StatGrid, QuickMenuItem, ScheduleItem } from "@lds/ui-v3";

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
```
