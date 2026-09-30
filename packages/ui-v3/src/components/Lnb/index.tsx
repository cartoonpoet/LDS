import { useId } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";
import { useControllableState } from "../../lib/useControllableState";
import { Icon } from "../Icon";
import * as s from "./Lnb.css";

/* ─── Types ─── */
export interface LnbSubItem {
  /** 고유 식별 값 */
  value: string;
  /** 메뉴 텍스트 */
  label: string;
  /** 지정 시 `<a>`로 렌더 */
  href?: string;
}

export interface LnbItem {
  /** 고유 식별 값 */
  value: string;
  /** 메뉴 텍스트 */
  label: string;
  /** 18px 아이콘 */
  icon?: ReactNode;
  /** 지정 시 `<a>`로 렌더 (하위 메뉴가 없을 때만) */
  href?: string;
  /** 하위 메뉴 — 있으면 그룹 토글 버튼이 된다 */
  children?: LnbSubItem[];
}

export interface LnbProps extends Omit<HTMLAttributes<HTMLElement>, "onSelect"> {
  /** 메뉴 목록 */
  items: LnbItem[];
  /** 현재 페이지 값 (1depth 또는 2depth) */
  value?: string;
  /** 메뉴 선택 핸들러 — 라우팅은 서비스가 연결 */
  onSelect?: (value: string) => void;
  /** 펼쳐진 그룹 값 (controlled, 한 번에 하나) */
  openValue?: string | null;
  /** 펼쳐진 그룹 초기값 — 생략 시 현재 페이지가 속한 그룹 */
  defaultOpenValue?: string | null;
  /** 그룹 펼침 변경 핸들러 */
  onOpenChange?: (value: string | null) => void;
  /** 접힘 (controlled) */
  collapsed?: boolean;
  /** 접힘 초기값 */
  defaultCollapsed?: boolean;
  /** 접힘 변경 핸들러 */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** 펼쳤을 때 로고 */
  logo?: ReactNode;
  /** 접혔을 때 로고 (심볼) — 생략 시 숨김 */
  collapsedLogo?: ReactNode;
}

const findGroupOf = (items: LnbItem[], value?: string) =>
  items.find((item) => item.children?.some((child) => child.value === value))?.value ?? null;

/* ─── Component ─── */
export function Lnb({
  items,
  value,
  onSelect,
  openValue: openValueProp,
  defaultOpenValue,
  onOpenChange,
  collapsed: collapsedProp,
  defaultCollapsed = false,
  onCollapsedChange,
  logo,
  collapsedLogo,
  className,
  "aria-label": ariaLabel = "메뉴",
  ...rest
}: LnbProps) {
  const baseId = useId();
  const [collapsed, setCollapsed] = useControllableState({
    value: collapsedProp,
    defaultValue: defaultCollapsed,
    onChange: onCollapsedChange,
  });
  const [openValue, setOpenValue] = useControllableState<string | null>({
    value: openValueProp,
    defaultValue: () => (defaultOpenValue !== undefined ? defaultOpenValue : findGroupOf(items, value)),
    onChange: onOpenChange,
  });

  const handleGroupClick = (item: LnbItem) => {
    if (collapsed) {
      setCollapsed(false);
      setOpenValue(item.value);
      return;
    }
    setOpenValue(openValue === item.value ? null : item.value);
  };

  return (
    <nav className={cx(s.root({ collapsed }), className)} aria-label={ariaLabel} {...rest}>
      <div className={s.header({ collapsed })}>
        {(collapsed ? collapsedLogo : logo) && (
          <div className={s.logo}>{collapsed ? collapsedLogo : logo}</div>
        )}
        <button
          type="button"
          className={s.toggle}
          aria-label={collapsed ? "메뉴 펼치기" : "메뉴 접기"}
          aria-expanded={!collapsed}
          onClick={() => setCollapsed(!collapsed)}
        >
          <Icon name="tab" size="sm" className={collapsed ? s.toggleIconFlipped : undefined} aria-hidden />
        </button>
      </div>

      <ul className={s.list({ collapsed })}>
        {items.map((item) => {
          const hasChildren = !!item.children?.length;
          const isCurrent = item.value === value;
          const isActive = isCurrent || !!item.children?.some((child) => child.value === value);
          const isOpen = hasChildren && !collapsed && openValue === item.value;
          const subId = `${baseId}-${item.value}`;
          const itemClass = s.item({ active: isActive, collapsed });
          const content = (
            <>
              {item.icon && <span className={s.icon} aria-hidden>{item.icon}</span>}
              {!collapsed && <span className={s.label}>{item.label}</span>}
              {!collapsed && hasChildren && (
                <span className={s.chevron({ open: isOpen })} aria-hidden>
                  <Icon name="chevronRight" size="sm" />
                </span>
              )}
            </>
          );
          const collapsedProps = collapsed ? { "aria-label": item.label, title: item.label } : {};

          return (
            <li key={item.value}>
              {hasChildren ? (
                <button
                  type="button"
                  className={itemClass}
                  aria-expanded={isOpen}
                  aria-controls={isOpen ? subId : undefined}
                  onClick={() => handleGroupClick(item)}
                  {...collapsedProps}
                >
                  {content}
                </button>
              ) : item.href ? (
                <a
                  href={item.href}
                  className={itemClass}
                  aria-current={isCurrent ? "page" : undefined}
                  onClick={() => onSelect?.(item.value)}
                  {...collapsedProps}
                >
                  {content}
                </a>
              ) : (
                <button
                  type="button"
                  className={itemClass}
                  aria-current={isCurrent ? "page" : undefined}
                  onClick={() => onSelect?.(item.value)}
                  {...collapsedProps}
                >
                  {content}
                </button>
              )}

              {isOpen && (
                <ul id={subId} className={s.subList}>
                  {item.children!.map((child) => {
                    const isChildCurrent = child.value === value;
                    const childClass = s.subItem({ active: isChildCurrent });
                    const childContent = (
                      <>
                        <span className={s.bullet} aria-hidden />
                        <span className={s.label}>{child.label}</span>
                      </>
                    );
                    return (
                      <li key={child.value}>
                        {child.href ? (
                          <a
                            href={child.href}
                            className={childClass}
                            aria-current={isChildCurrent ? "page" : undefined}
                            onClick={() => onSelect?.(child.value)}
                          >
                            {childContent}
                          </a>
                        ) : (
                          <button
                            type="button"
                            className={childClass}
                            aria-current={isChildCurrent ? "page" : undefined}
                            onClick={() => onSelect?.(child.value)}
                          >
                            {childContent}
                          </button>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
