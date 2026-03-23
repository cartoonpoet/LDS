import { useState, useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Skeleton } from ".";

/**
 * ## Skeleton
 *
 * 콘텐츠가 로딩 중일 때 자리를 표시하는 플레이스홀더 컴포넌트입니다.
 *
 * ### Variants
 * - `rect` — 사각형 (카드, 이미지 영역)
 * - `circle` — 원형 (아바타)
 * - `text` — 텍스트 줄 (lines prop으로 줄 수 지정, 마지막 줄 60% 너비)
 *
 * ### Template Code
 * ```tsx
 * import { Skeleton } from "@lds/ui-v3";
 *
 * // 사각형
 * <Skeleton width={200} height={120} />
 *
 * // 원형 아바타
 * <Skeleton variant="circle" width={40} height={40} />
 *
 * // 텍스트 3줄
 * <Skeleton variant="text" lines={3} />
 *
 * // Skeleton.Content — 로딩 ↔ 콘텐츠 자동 전환
 * <Skeleton.Content
 *   loading={isLoading}
 *   fallback={<Skeleton variant="text" lines={3} />}
 * >
 *   <p>{data.content}</p>
 * </Skeleton.Content>
 * ```
 */
const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  decorators: [
    (Story) => (
      <div className={lightThemeClass} style={{ padding: 24, backgroundColor: "#f2f4f6" }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["rect", "circle", "text"] },
    width: { control: "text" },
    height: { control: "text" },
    lines: { control: { type: "range", min: 1, max: 10 } },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: { width: 200, height: 16 },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <section>
        <h4 style={{ margin: "0 0 8px", fontSize: 13, color: "#626f86" }}>Rect</h4>
        <Skeleton width={240} height={120} />
      </section>
      <section>
        <h4 style={{ margin: "0 0 8px", fontSize: 13, color: "#626f86" }}>Circle</h4>
        <div style={{ display: "flex", gap: 12 }}>
          <Skeleton variant="circle" width={24} height={24} />
          <Skeleton variant="circle" width={38} height={38} />
          <Skeleton variant="circle" width={48} height={48} />
        </div>
      </section>
      <section>
        <h4 style={{ margin: "0 0 8px", fontSize: 13, color: "#626f86" }}>Text</h4>
        <Skeleton variant="text" lines={4} width={320} />
      </section>
    </div>
  ),
};

/** 카드 형태의 스켈레톤 조합 예시 */
export const CardExample: Story = {
  render: () => (
    <div
      style={{
        width: 320,
        padding: 16,
        backgroundColor: "#fff",
        borderRadius: 8,
        border: "1px solid #eeeff2",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <Skeleton width="100%" height={160} />
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Skeleton variant="circle" width={38} height={38} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
          <Skeleton width="60%" height={14} />
          <Skeleton width="40%" height={12} />
        </div>
      </div>
      <Skeleton variant="text" lines={3} />
    </div>
  ),
};

/** 리스트 아이템 스켈레톤 조합 예시 */
export const ListExample: Story = {
  render: () => (
    <div
      style={{
        width: 400,
        backgroundColor: "#fff",
        borderRadius: 8,
        border: "1px solid #eeeff2",
        overflow: "hidden",
      }}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            padding: "12px 16px",
            borderBottom: i < 4 ? "1px solid #eeeff2" : undefined,
          }}
        >
          <Skeleton variant="circle" width={32} height={32} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
            <Skeleton width="50%" height={14} />
            <Skeleton width="30%" height={12} />
          </div>
          <Skeleton width={60} height={24} />
        </div>
      ))}
    </div>
  ),
};

/**
 * `Skeleton.Content`를 사용한 로딩 ↔ 콘텐츠 자동 전환 데모.
 * 버튼을 눌러 2초간 로딩 후 콘텐츠가 fade-in으로 나타납니다.
 */
export const ContentToggle: StoryObj = {
  render: () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => setLoading(false), 2000);
      return () => clearTimeout(timer);
    }, []);

    const reload = () => {
      setLoading(true);
      setTimeout(() => setLoading(false), 2000);
    };

    const cardFallback = (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Skeleton width="100%" height={160} />
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Skeleton variant="circle" width={38} height={38} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
            <Skeleton width="60%" height={14} />
            <Skeleton width="40%" height={12} />
          </div>
        </div>
        <Skeleton variant="text" lines={3} />
      </div>
    );

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 360 }}>
        <button
          onClick={reload}
          style={{
            alignSelf: "flex-start",
            padding: "6px 16px",
            fontSize: 13,
            borderRadius: 6,
            border: "1px solid #cfd5e1",
            backgroundColor: "#fff",
            cursor: "pointer",
          }}
        >
          다시 로딩
        </button>
        <div
          style={{
            padding: 16,
            backgroundColor: "#fff",
            borderRadius: 8,
            border: "1px solid #eeeff2",
          }}
        >
          <Skeleton.Content loading={loading} fallback={cardFallback}>
            <img
              src="https://placehold.co/328x160/e2e8f0/64748b?text=Card+Image"
              alt=""
              style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 4 }}
            />
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 12 }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  backgroundColor: "#2151ec",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                JH
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#11152a" }}>홍길동</div>
                <div style={{ fontSize: 12, color: "#626f86" }}>2026-03-23</div>
              </div>
            </div>
            <p style={{ fontSize: 14, color: "#4c5469", marginTop: 12, lineHeight: 1.6 }}>
              Skeleton.Content 컴포넌트를 사용하면 loading 상태에 따라
              스켈레톤 UI와 실제 콘텐츠를 자동으로 전환할 수 있습니다.
              fade-in 트랜지션이 적용되어 자연스럽게 전환됩니다.
            </p>
          </Skeleton.Content>
        </div>
      </div>
    );
  },
};
