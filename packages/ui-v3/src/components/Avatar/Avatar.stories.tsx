import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Avatar, AvatarGroup } from ".";

/**
 * **Avatar** — 사용자 프로필 아바타
 *
 * ### 사용법
 * ```tsx
 * import { Avatar, AvatarGroup } from "@lds/ui-v3";
 *
 * <Avatar src="/photo.jpg" status="online" />
 * <Avatar system />
 * <Avatar initials="PI" color="success" />
 *
 * <AvatarGroup>
 *   <Avatar src="/a.jpg" size="sm" />
 *   <Avatar src="/b.jpg" size="sm" />
 * </AvatarGroup>
 * ```
 */
const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
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
type Story = StoryObj<typeof Avatar>;

const PHOTO = "https://placehold.co/80x80/2151ec/ffffff?text=U";

/** Photo 아바타 */
export const Photo: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <Avatar src={PHOTO} size="sm" />
      <Avatar src={PHOTO} size="md" />
      <Avatar src={PHOTO} size="lg" />
    </div>
  ),
};

/** System 아바타 */
export const System: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <Avatar system size="sm" />
      <Avatar system size="md" />
      <Avatar system size="lg" />
    </div>
  ),
};

/** Label (이니셜) 아바타 */
export const Label: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <Avatar initials="PI" color="success" />
      <Avatar initials="AB" color="primary" />
      <Avatar initials="CD" color="danger" />
      <Avatar initials="EF" color="warning" />
      <Avatar initials="GH" color="info" />
      <Avatar initials="IJ" color="secondary" />
    </div>
  ),
};

/** 상태 표시 */
export const StatusDots: Story = {
  name: "Status",
  render: () => (
    <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
      <Avatar src={PHOTO} status="online" />
      <Avatar src={PHOTO} status="away" />
      <Avatar src={PHOTO} status="busy" />
      <Avatar system status="online" />
      <Avatar initials="PI" color="success" status="online" />
      <Avatar initials="PI" color="success" status="away" />
    </div>
  ),
};

/** 아바타 그룹 */
export const Group: Story = {
  name: "Avatar Group",
  render: () => (
    <AvatarGroup>
      <Avatar src={PHOTO} size="sm" />
      <Avatar initials="AB" size="sm" color="success" />
      <Avatar initials="CD" size="sm" color="info" />
      <Avatar initials="EF" size="sm" color="danger" />
      <Avatar initials="GH" size="sm" color="secondary" />
    </AvatarGroup>
  ),
};

/** 사이즈 비교 (sm / md / lg) */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <Avatar initials="S" size="sm" color="primary" />
      <Avatar initials="M" size="md" color="primary" />
      <Avatar initials="L" size="lg" color="primary" />
    </div>
  ),
};
