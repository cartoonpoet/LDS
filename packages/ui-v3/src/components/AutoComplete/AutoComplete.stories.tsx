import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AutoComplete } from ".";
import { lightThemeClass, themeVars } from "@lds/tokens";

const meta: Meta<typeof AutoComplete> = {
  title: "Components/AutoComplete",
  component: AutoComplete,
  decorators: [
    (Story) => (
      <div className={lightThemeClass} style={{ padding: 24, maxWidth: 400, backgroundColor: "#f2f4f6" }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    inputSize: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    disabled: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof AutoComplete>;

const userOptions = [
  { value: "jhson1", label: "손준호 (jhson1)" },
  { value: "kim01", label: "김민수 (kim01)" },
  { value: "park22", label: "박서연 (park22)" },
  { value: "lee33", label: "이정우 (lee33)" },
  { value: "choi44", label: "최유진 (choi44)" },
  { value: "jung55", label: "정하나 (jung55)" },
  { value: "kang66", label: "강도현 (kang66)" },
  { value: "yoon77", label: "윤서현 (yoon77)" },
];

export const TemplateCode: Story = {
  name: "Template Code",
  parameters: {
    docs: {
      source: {
        code: `const [value, setValue] = useState("");

const options = [
  { value: "jhson1", label: "손준호 (jhson1)" },
  { value: "kim01", label: "김민수 (kim01)" },
  { value: "park22", label: "박서연 (park22)" },
];

<AutoComplete
  options={options}
  value={value}
  onChange={(val) => setValue(val as string)}
  placeholder="이름 또는 ID로 검색"
/>`,
      },
    },
  },
  render: () => {
    const [value, setValue] = useState("");
    return (
      <AutoComplete
        options={userOptions}
        value={value}
        onChange={(val) => setValue(val as string)}
        placeholder="이름 또는 ID로 검색"
      />
    );
  },
};

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <AutoComplete
        options={userOptions}
        value={value}
        onChange={(val) => setValue(val as string)}
        placeholder="이름 또는 ID로 검색"
      />
    );
  },
};

export const WithInitialValue: Story = {
  render: () => {
    const [value, setValue] = useState("jhson1");
    return (
      <AutoComplete
        options={userOptions}
        value={value}
        onChange={(val) => setValue(val as string)}
        placeholder="이름 또는 ID로 검색"
      />
    );
  },
};

export const Small: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <AutoComplete
        options={userOptions}
        value={value}
        onChange={(val) => setValue(val as string)}
        placeholder="검색..."
        inputSize="small"
      />
    );
  },
};

export const Large: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <AutoComplete
        options={userOptions}
        value={value}
        onChange={(val) => setValue(val as string)}
        placeholder="검색..."
        inputSize="large"
      />
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <AutoComplete
      options={userOptions}
      value="jhson1"
      placeholder="검색..."
      disabled
    />
  ),
};

export const Multiple: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(["jhson1"]);
    return (
      <AutoComplete
        options={userOptions}
        multiple
        value={value}
        onChange={(val) => setValue(val as string[])}
        placeholder="이름 또는 ID로 검색"
      />
    );
  },
};

export const MultipleEmpty: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <AutoComplete
        options={userOptions}
        multiple
        value={value}
        onChange={(val) => setValue(val as string[])}
        placeholder="참조수신자(비밀) 선택"
      />
    );
  },
};

/* ─── 리치 옵션: 상대 계약자(회사) 검색 템플릿 ───
 * renderOption(행 커스텀) + footer(신규 등록) + showSelectedInList(선택 체크·토글) 조합 예시.
 * 검색 결과를 회사명·사업자번호·대표자·주소가 보이는 리치 행으로 렌더한다. */
interface CompanyItem {
  id: string;
  type: "company" | "individual";
  name: string;
  bizNo: string; // 미부여 시 "TEMP-..." 형태(개인)
  ceo: string;
  phone: string;
  address: string;
}

const companyData: CompanyItem[] = [
  { id: "c1", type: "company", name: "삼성전자(주)", bizNo: "124-81-00998", ceo: "한종희", phone: "02-2255-0114", address: "경기 수원시 영통구 삼성로 129" },
  { id: "c2", type: "company", name: "삼성물산(주)", bizNo: "101-81-25070", ceo: "오세철", phone: "02-2145-5114", address: "서울 강동구 상일로6길 26" },
  { id: "c3", type: "individual", name: "삼성기획", bizNo: "TEMP-912BC606", ceo: "김민수", phone: "010-3344-7788", address: "서울 서초구 서초대로 77길 17" },
];

const tint = (color: string, pct: number) => `color-mix(in srgb, ${color} ${pct}%, white)`;
const tag = (color: string) => ({ fontSize: 10, fontWeight: 800, padding: "1px 6px", borderRadius: 4, color, backgroundColor: tint(color, 14) });

function CompanyOptionRow({ company, selected }: { company: CompanyItem; selected: boolean }) {
  const isIndividual = company.type === "individual";
  const isTemp = company.bizNo.startsWith("TEMP-");
  const accent = isIndividual ? themeVars.color.accentInfo : themeVars.color.accentPrimary;
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 12px" }}>
      <div style={{ width: 32, height: 32, borderRadius: 8, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", color: accent, backgroundColor: tint(accent, 12) }}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {isIndividual ? (
            <>
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
            </>
          ) : (
            <path d="M3 21h18M5 21V7l7-4 7 4v14M9 9h.01M9 13h.01M9 17h.01M15 9h.01M15 13h.01M15 17h.01" />
          )}
        </svg>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700, color: themeVars.color.textHeading }}>
          {company.name}
          <span style={tag(accent)}>{isIndividual ? "개인" : "회사"}</span>
        </div>
        <div style={{ fontSize: 11.5, color: themeVars.color.textMuted, marginTop: 3, lineHeight: 1.55 }}>
          사업자 {isTemp ? <span style={tag(themeVars.color.accentWarning)}>임시번호 자동생성</span> : company.bizNo} · 대표 {company.ceo} · 전화 {company.phone}
          <br />주소 {company.address}
        </div>
      </div>
      {selected ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={themeVars.color.accentPrimary} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
          <path d="M20 6 9 17l-5-5" />
        </svg>
      ) : null}
    </div>
  );
}

export const CompanyRichSearch: Story = {
  name: "상대 계약자 검색 (리치 옵션)",
  parameters: {
    docs: {
      source: {
        code: `// renderOption + footer + showSelectedInList 조합
const [ids, setIds] = useState<string[]>([]);
const [query, setQuery] = useState("");
const results = companies.filter((c) =>
  !query || c.name.includes(query) || c.bizNo.includes(query) || c.ceo.includes(query),
);
const byId = new Map(companies.map((c) => [c.id, c]));
// 선택 ∪ 검색결과 — 선택값이 항상 옵션에 있어야 badge 라벨이 그려진다
const options = [
  ...ids.map((id) => byId.get(id)!),
  ...results.filter((r) => !ids.includes(r.id)),
].map((c) => ({ value: c.id, label: \`\${c.name} \${c.bizNo} \${c.ceo}\` }));

<AutoComplete
  multiple
  showSelectedInList
  options={options}
  value={ids}
  onInputChange={setQuery}
  onChange={(val) => setIds(val as string[])}
  renderOption={(opt, { selected }) => {
    const c = byId.get(opt.value);
    return c ? <CompanyOptionRow company={c} selected={selected} /> : opt.label;
  }}
  footer={<button onClick={openCreateModal}>+ 검색 결과에 없나요? 신규 등록</button>}
  placeholder="회사명·사업자번호·대표자로 검색"
/>`,
      },
    },
  },
  render: () => {
    const [ids, setIds] = useState<string[]>(["c1"]);
    const [query, setQuery] = useState("");
    const results = companyData.filter(
      (c) => !query || c.name.includes(query) || c.bizNo.includes(query) || c.ceo.includes(query),
    );
    const byId = new Map(companyData.map((c) => [c.id, c]));
    const options = [
      ...ids.map((id) => byId.get(id)).filter((c): c is CompanyItem => Boolean(c)),
      ...results.filter((r) => !ids.includes(r.id)),
    ].map((c) => ({ value: c.id, label: `${c.name} ${c.bizNo} ${c.ceo}` }));
    return (
      <AutoComplete
        multiple
        showSelectedInList
        options={options}
        value={ids}
        onInputChange={setQuery}
        onChange={(val) => setIds(val as string[])}
        renderOption={(opt, { selected }) => {
          const c = byId.get(opt.value);
          return c ? <CompanyOptionRow company={c} selected={selected} /> : opt.label;
        }}
        footer={
          <button
            type="button"
            style={{ display: "flex", alignItems: "center", gap: 6, width: "100%", padding: "11px 12px", border: "none", background: "none", cursor: "pointer", fontSize: 12.5, fontWeight: 700, color: themeVars.color.accentPrimary, textAlign: "left" }}
          >
            + 검색 결과에 없나요? 신규 등록
          </button>
        }
        placeholder="회사명·사업자번호·대표자로 검색"
        noResultText="검색 결과가 없습니다. 아래에서 신규 등록하세요."
      />
    );
  },
};
