import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Avatar } from "../Avatar";
import { Icon } from "../Icon";
import { Input } from "../Input";
import { Gnb } from ".";

/**
 * ## Gnb
 *
 * 서비스 최상단 글로벌 내비게이션 바입니다(높이 62px). 왼쪽(`start`)·오른쪽(`end`) 슬롯에
 * 아이콘 버튼 · 구분선 · 검색 · 프로필을 조합합니다.
 *
 * ### Import
 * ```tsx
 * import { Gnb } from "@lawkit/ui";
 * ```
 *
 * ### Parts
 * | Part | Element | Props | Description |
 * |------|---------|-------|-------------|
 * | `Gnb.IconButton` | `<button>` | `icon`, `label` | 20px 아이콘 버튼 (label은 aria-label·title) |
 * | `Gnb.Divider` | `<span>` | - | 세로 구분선 |
 * | `Gnb.Profile` | `<div>`/`<button>` | `name`, `description`, `avatar`, `compact` | 사용자 영역 — onClick 시 버튼 |
 */
const meta: Meta<typeof Gnb> = {
  title: "Components/Gnb",
  component: Gnb,
  decorators: [(Story) => <div className={lightThemeClass} style={{ padding: 24, background: "#f2f4f6" }}><Story /></div>],
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof Gnb>;

const search = (
  <div style={{ width: 400, maxWidth: "100%" }}>
    <Input placeholder="검색어를 입력해 주세요" leftIcon={<Icon name="search" size="sm" />} />
  </div>
);

export const TemplateCode: Story = {
  name: "Template Code",
  parameters: {
    docs: {
      source: {
        code: `import { Gnb, Input, Avatar, Icon } from "@lawkit/ui";

// Desktop — 왼쪽: 도움말·일정 | 검색 / 오른쪽: 설정·프로필
<Gnb
  start={
    <>
      <Gnb.IconButton icon={<Icon name="helpCircle" />} label="도움말" />
      <Gnb.IconButton icon={<Icon name="calendar" />} label="일정" />
      <Gnb.Divider />
      <Input placeholder="검색어를 입력해 주세요" leftIcon={<Icon name="search" size="sm" />} />
    </>
  }
  end={
    <>
      <Gnb.IconButton icon={<Icon name="settings" />} label="설정" />
      <Gnb.Profile
        name="이법무 변호사님"
        description="휴맥스홀딩스"
        avatar={<Avatar src="/me.jpg" />}
        onClick={openProfileMenu}
      />
    </>
  }
/>

// Mobile — 메뉴 버튼 + 아이콘 + 아바타만
<Gnb
  start={<Gnb.IconButton icon={<Icon name="menu" />} label="메뉴 열기" onClick={openDrawer} />}
  end={
    <>
      <Gnb.IconButton icon={<Icon name="search" />} label="검색" />
      <Gnb.IconButton icon={<Icon name="settings" />} label="설정" />
      <Gnb.Profile compact name="이법무 변호사님" avatar={<Avatar src="/me.jpg" status="online" />} />
    </>
  }
/>`,
      },
    },
  },
  render: () => (
    <Gnb
      start={
        <>
          <Gnb.IconButton icon={<Icon name="helpCircle" />} label="도움말" />
          <Gnb.IconButton icon={<Icon name="calendar" />} label="일정" />
          <Gnb.Divider />
          {search}
        </>
      }
      end={
        <>
          <Gnb.IconButton icon={<Icon name="settings" />} label="설정" />
          <Gnb.Profile name="이법무 변호사님" description="휴맥스홀딩스" avatar={<Avatar system />} />
        </>
      }
    />
  ),
};

export const Desktop: Story = {
  name: "Desktop",
  render: () => (
    <Gnb
      start={
        <>
          <Gnb.IconButton icon={<Icon name="helpCircle" />} label="도움말" />
          <Gnb.IconButton icon={<Icon name="calendar" />} label="일정" />
          <Gnb.Divider />
          {search}
        </>
      }
      end={
        <>
          <Gnb.IconButton icon={<Icon name="bell" />} label="알림" />
          <Gnb.IconButton icon={<Icon name="settings" />} label="설정" />
          <Gnb.Profile
            name="이법무 변호사님"
            description="휴맥스홀딩스"
            avatar={<Avatar system />}
            onClick={() => {}}
          />
        </>
      }
    />
  ),
};

export const Mobile: Story = {
  name: "Mobile",
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
  render: () => (
    <Gnb
      start={<Gnb.IconButton icon={<Icon name="menu" />} label="메뉴 열기" />}
      end={
        <>
          <Gnb.IconButton icon={<Icon name="search" />} label="검색" />
          <Gnb.IconButton icon={<Icon name="settings" />} label="설정" />
          <Gnb.Profile compact name="이법무 변호사님" avatar={<Avatar system status="online" />} />
        </>
      }
    />
  ),
};
