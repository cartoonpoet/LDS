import { useState, useCallback, useMemo } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";
import * as s from "./TreeView.css";

/* ═══════════════════════════════════════════
   Types
   ═══════════════════════════════════════════ */

export interface TreeNode {
  /** 고유 ID */
  id: string;
  /** 레벨 라벨 (예: "상위 마스터", "마스터", "하위") */
  label?: string;
  /** 라벨 색상 */
  labelColor?: "primary" | "secondary";
  /** 텍스트 컬럼들 (슬래시로 구분되어 표시) */
  columns: TreeNodeColumn[];
  /** 자식 노드 */
  children?: TreeNode[];
}

export interface TreeNodeColumn {
  /** 컬럼 텍스트 */
  text: string;
  /** 컬럼 타입 */
  type?: "code" | "title" | "date";
}

export type TreeViewSize = "medium" | "small";

/* ═══════════════════════════════════════════
   SVG Icons
   ═══════════════════════════════════════════ */

function ChevronIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.5 5.25L7 8.75L10.5 5.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   TreeView
   ═══════════════════════════════════════════ */

export interface TreeViewProps extends HTMLAttributes<HTMLDivElement> {
  /** 트리 데이터 */
  nodes: TreeNode[];
  /** 기본 사이즈 (부모 노드: medium, 리프 노드: small 자동 적용) */
  size?: TreeViewSize;
  /** 선택된 노드 ID */
  selectedId?: string;
  /** 노드 선택 콜백 */
  onNodeSelect?: (node: TreeNode) => void;
  /** 초기 펼침 노드 ID 목록 */
  defaultExpandedIds?: string[];
  /** 구분자 문자 */
  separator?: string;
}

/**
 * **TreeView**
 *
 * 계층 구조 데이터를 트리 형태로 표시하는 컴포넌트.
 *
 * - 기존 Collapse 패턴 참고한 펼침/접힘
 * - 레벨 뱃지로 노드 유형 표시
 * - 슬래시 구분 텍스트 컬럼
 * - 세로 연결선으로 계층 시각화
 *
 * ```tsx
 * const nodes: TreeNode[] = [
 *   {
 *     id: "1",
 *     label: "상위 마스터",
 *     labelColor: "primary",
 *     columns: [
 *       { text: "C20190301", type: "code" },
 *       { text: "법무관리시스템 구축 계약", type: "title" },
 *       { text: "2019-01-03", type: "date" },
 *     ],
 *     children: [
 *       {
 *         id: "1-1",
 *         label: "마스터",
 *         columns: [...],
 *         children: [
 *           { id: "1-1-1", label: "하위", columns: [...] },
 *         ],
 *       },
 *     ],
 *   },
 * ];
 *
 * <TreeView nodes={nodes} onNodeSelect={(node) => console.log(node.id)} />
 * ```
 */
export function TreeView({
  nodes,
  size = "medium",
  selectedId,
  onNodeSelect,
  defaultExpandedIds,
  separator = "/",
  className,
  ...rest
}: TreeViewProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    () => new Set(defaultExpandedIds ?? nodes.map((n) => n.id)),
  );

  const toggleExpand = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  return (
    <div className={cx(s.tree, className)} role="tree" {...rest}>
      {nodes.map((node, i) => (
        <TreeItem
          key={node.id}
          node={node}
          depth={0}
          parentTrails={[]}
          isLast={i === nodes.length - 1}
          size={size}
          selectedId={selectedId}
          onNodeSelect={onNodeSelect}
          expandedIds={expandedIds}
          onToggleExpand={toggleExpand}
          separator={separator}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   TreeItem (internal)
   ═══════════════════════════════════════════ */

interface TreeItemProps {
  node: TreeNode;
  depth: number;
  parentTrails: boolean[];
  isLast: boolean;
  size: TreeViewSize;
  selectedId?: string;
  onNodeSelect?: (node: TreeNode) => void;
  expandedIds: Set<string>;
  onToggleExpand: (id: string) => void;
  separator: string;
}

function TreeItem({
  node,
  depth,
  parentTrails,
  isLast,
  size: defaultSize,
  selectedId,
  onNodeSelect,
  expandedIds,
  onToggleExpand,
  separator,
}: TreeItemProps) {
  const hasChildren = !!(node.children && node.children.length > 0);
  const isExpanded = expandedIds.has(node.id);
  const isSelected = selectedId === node.id;

  /* 리프 노드는 자동으로 small */
  const itemSize = hasChildren ? defaultSize : "small";

  const handleClick = useCallback(() => {
    if (hasChildren) {
      onToggleExpand(node.id);
    }
    onNodeSelect?.(node);
  }, [hasChildren, node, onNodeSelect, onToggleExpand]);

  /* trail segments: 부모 깊이별 세로선 표시 여부 */
  const trails = useMemo(() => parentTrails, [parentTrails]);

  return (
    <div role="treeitem" aria-expanded={hasChildren ? isExpanded : undefined}>
      <div
        className={s.row({ size: itemSize, selected: isSelected })}
        onClick={handleClick}
      >
        {/* Trail zone (indent lines) */}
        {depth > 0 && (
          <div className={s.trailZone}>
            {trails.map((showLine, i) => (
              <div
                key={i}
                className={s.trailSegment({
                  hasLine: showLine,
                  isLast: false,
                })}
              />
            ))}
            <div
              className={s.trailSegment({
                hasLine: false,
                isLast,
              })}
            />
          </div>
        )}

        {/* Leading: caret + label */}
        <div className={s.leading}>
          <span
            className={s.caret({
              expanded: isExpanded,
              visible: hasChildren,
            })}
          >
            <ChevronIcon />
          </span>
          {node.label && (
            <span className={s.levelBadge({ color: node.labelColor ?? "primary" })}>
              {node.label}
            </span>
          )}
        </div>

        {/* Text zone: columns with separators */}
        <div className={s.textZone}>
          {node.columns.map((col, i) => (
            <span key={i} style={{ display: "contents" }}>
              {i > 0 && <span className={s.separator}>{separator}</span>}
              <span className={s.textSegment({ type: col.type ?? "code" })}>
                {col.text}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div className={s.children} role="group">
          {node.children!.map((child, i) => (
            <TreeItem
              key={child.id}
              node={child}
              depth={depth + 1}
              parentTrails={[...trails, !isLast]}
              isLast={i === node.children!.length - 1}
              size={defaultSize}
              selectedId={selectedId}
              onNodeSelect={onNodeSelect}
              expandedIds={expandedIds}
              onToggleExpand={onToggleExpand}
              separator={separator}
            />
          ))}
        </div>
      )}
    </div>
  );
}
