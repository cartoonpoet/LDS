import { describe, it, expect, vi } from "vitest";
import { renderWithUser, screen } from "../../test/utils";
import { TreeView } from ".";

const nodes = [
  {
    id: "1",
    label: "상위",
    columns: [{ text: "Root Node" }],
    children: [
      { id: "1-1", columns: [{ text: "Child A" }] },
      { id: "1-2", columns: [{ text: "Child B" }] },
    ],
  },
  { id: "2", columns: [{ text: "Leaf Node" }] },
];

describe("TreeView", () => {
  it("renders tree with role", () => {
    renderWithUser(<TreeView nodes={nodes} />);
    expect(screen.getByRole("tree")).toBeInTheDocument();
  });

  it("renders root-level nodes", () => {
    renderWithUser(<TreeView nodes={nodes} />);
    expect(screen.getByText("Root Node")).toBeInTheDocument();
    expect(screen.getByText("Leaf Node")).toBeInTheDocument();
  });

  it("expands children by default and collapses on click", async () => {
    const { user } = renderWithUser(<TreeView nodes={nodes} />);
    // Children visible by default (all root nodes expanded)
    expect(screen.getByText("Child A")).toBeInTheDocument();
    const treeItem = screen.getByText("Root Node").closest('[role="treeitem"]')!;
    expect(treeItem).toHaveAttribute("aria-expanded", "true");
    // Click to collapse — 높이 애니메이션을 위해 콘텐츠는 DOM에 남고 aria-expanded만 바뀐다
    await user.click(screen.getByText("Root Node"));
    expect(treeItem).toHaveAttribute("aria-expanded", "false");
  });

  it("calls onNodeSelect on click", async () => {
    const onNodeSelect = vi.fn();
    const { user } = renderWithUser(
      <TreeView nodes={nodes} onNodeSelect={onNodeSelect} />,
    );
    await user.click(screen.getByText("Leaf Node"));
    expect(onNodeSelect).toHaveBeenCalledTimes(1);
    expect(onNodeSelect.mock.calls[0][0].id).toBe("2");
  });

  it("starts collapsed when defaultExpandedIds is empty", () => {
    renderWithUser(<TreeView nodes={nodes} defaultExpandedIds={[]} />);
    expect(screen.getByText("Root Node")).toBeInTheDocument();
    const treeItem = screen.getByText("Root Node").closest('[role="treeitem"]')!;
    expect(treeItem).toHaveAttribute("aria-expanded", "false");
  });
});
