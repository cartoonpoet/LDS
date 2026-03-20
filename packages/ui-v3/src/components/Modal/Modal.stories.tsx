import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from ".";
import { Button } from "../Button";
import { lightThemeClass } from "@lds/tokens";

/**
 * ## Modal
 *
 * 표준 모달 다이얼로그. Header/Body/Footer 영역으로 구분되며,
 * 간편 API와 Compound 패턴 두 가지 방식으로 사용할 수 있습니다.
 *
 * ### Import
 * ```tsx
 * import { Modal, ModalHeader, ModalBody, ModalFooter } from "@lds/ui-v3";
 * ```
 *
 * ### Props (Modal)
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `open` | `boolean` | - | 모달 표시 여부 |
 * | `onClose` | `() => void` | - | 닫기 핸들러 |
 * | `size` | `"small" \| "medium" \| "large" \| "xlarge"` | `"medium"` | 모달 너비 |
 * | `title` | `ReactNode` | - | 헤더 타이틀 (간편 API) |
 * | `footer` | `ReactNode` | - | 푸터 콘텐츠 (간편 API) |
 * | `disableBackdropClose` | `boolean` | `false` | backdrop 클릭 닫기 비활성 |
 * | `disableEscapeClose` | `boolean` | `false` | Escape 키 닫기 비활성 |
 *
 * ### Template Code
 * ```tsx
 * // 간편 API
 * <Modal open={isOpen} onClose={close} size="medium" title="모달 제목"
 *   footer={<><Button variant="outline" color="secondary">취소</Button><Button>저장</Button></>}
 * >
 *   <p>모달 본문</p>
 * </Modal>
 *
 * // Compound 패턴
 * <Modal open={isOpen} onClose={close} size="xlarge">
 *   <ModalHeader>커스텀 헤더</ModalHeader>
 *   <ModalBody><p>본문</p></ModalBody>
 *   <ModalFooter><Button>확인</Button></ModalFooter>
 * </Modal>
 * ```
 */
const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  decorators: [
    (Story) => (
      <div className={lightThemeClass} style={{ padding: 24, minHeight: 200 }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    open: { description: "모달 표시 여부" },
    size: { description: "모달 너비 프리셋" },
    title: { description: "헤더 타이틀 (간편 API)" },
    footer: { description: "푸터 콘텐츠 (간편 API)" },
  },
};
export default meta;
type Story = StoryObj<typeof Modal>;

/** Small (508px) */
export const Small: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Small 모달 열기</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          size="small"
          title="검토 요청자 수정"
          footer={
            <>
              <Button variant="outline" color="secondary" onClick={() => setOpen(false)}>취소</Button>
              <Button onClick={() => setOpen(false)}>저장</Button>
            </>
          }
        >
          <p style={{ margin: 0 }}>검토 요청자를 수정할 수 있습니다.</p>
        </Modal>
      </>
    );
  },
};

/** Medium (808px) */
export const Medium: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Medium 모달 열기</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          size="medium"
          title="참조 수신자 수정"
          footer={
            <>
              <Button variant="outline" color="secondary" onClick={() => setOpen(false)}>취소</Button>
              <Button onClick={() => setOpen(false)}>저장</Button>
            </>
          }
        >
          <p style={{ margin: 0 }}>참조 수신자를 수정하는 모달입니다.</p>
        </Modal>
      </>
    );
  },
};

/** Large (1024px) */
export const Large: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Large 모달 열기</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          size="large"
          title="Modal title"
          footer={
            <>
              <button
                type="button"
                style={{ background: "none", border: "none", color: "#2151ec", cursor: "pointer", fontSize: 14 }}
              >
                초기화 하기
              </button>
              <Button onClick={() => setOpen(false)}>Accept</Button>
            </>
          }
        >
          <p style={{ margin: 0 }}>Modal Content</p>
        </Modal>
      </>
    );
  },
};

/** XLarge (1280px) */
export const XLarge: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>XLarge 모달 열기</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          size="xlarge"
          title="Modal title"
          footer={
            <>
              <button
                type="button"
                style={{ background: "none", border: "none", color: "#2151ec", cursor: "pointer", fontSize: 14 }}
              >
                초기화 하기
              </button>
              <Button onClick={() => setOpen(false)}>Accept</Button>
            </>
          }
        >
          <p style={{ margin: 0 }}>Modal Content</p>
        </Modal>
      </>
    );
  },
};

/** Compound 패턴 */
export const CompoundPattern: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Compound 모달 열기</Button>
        <Modal open={open} onClose={() => setOpen(false)} size="large">
          <ModalHeader actions={<Button size="small" onClick={() => setOpen(false)}>액션</Button>}>
            커스텀 헤더
          </ModalHeader>
          <ModalBody>
            <p style={{ margin: 0 }}>
              ModalHeader, ModalBody, ModalFooter를 직접 조합하여 자유로운 레이아웃을 구성할 수 있습니다.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" color="secondary" onClick={() => setOpen(false)}>취소</Button>
            <Button onClick={() => setOpen(false)}>확인</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

/** 스크롤 가능한 긴 콘텐츠 */
export const ScrollableContent: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>긴 콘텐츠 모달 열기</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          size="medium"
          title="긴 콘텐츠"
          footer={<Button onClick={() => setOpen(false)}>닫기</Button>}
        >
          {Array.from({ length: 20 }, (_, i) => (
            <p key={i} style={{ margin: "0 0 12px" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ({i + 1})
            </p>
          ))}
        </Modal>
      </>
    );
  },
};
