"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { SearchEntry, SearchEntryType } from "../../data/search-index";
import { SEARCH_INDEX } from "../../data/search-index";
import { searchEntries } from "../../lib/search";

const GROUP_ORDER: readonly SearchEntryType[] = ["component", "foundation", "pattern", "page"];

const GROUP_LABELS: Record<SearchEntryType, string> = {
  component: "Components",
  foundation: "Foundations",
  pattern: "Patterns",
  page: "Pages"
};

const optionId = (index: number) => `site-search-option-${index}`;

type SearchDialogProps = {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const SearchDialog = ({ open, onOpen, onClose }: SearchDialogProps) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Cmd+K / Ctrl+K 토글 + (열려 있을 때) ESC 닫기 — 포커스 위치와 무관하게 동작
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (open) {
          onClose();
        } else {
          onOpen();
        }
        return;
      }
      if (event.key === "Escape" && open) {
        event.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onOpen, onClose]);

  // 열릴 때: 입력 초기화 + 자동 포커스 + body 스크롤 잠금
  useEffect(() => {
    if (!open) {
      return;
    }
    setQuery("");
    setActiveIndex(0);
    inputRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const results = searchEntries(query, SEARCH_INDEX);
  const groups = GROUP_ORDER.map(type => ({
    type,
    items: results.filter(entry => entry.type === type)
  })).filter(group => group.items.length > 0);
  const flatResults = groups.flatMap(group => group.items);
  const activeEntry = flatResults[activeIndex] as SearchEntry | undefined;

  const goTo = (entry: SearchEntry) => {
    onClose();
    router.push(entry.href);
  };

  const moveActive = (delta: number) => {
    if (flatResults.length === 0) {
      return;
    }
    const next = (activeIndex + delta + flatResults.length) % flatResults.length;
    setActiveIndex(next);
    document.getElementById(optionId(next))?.scrollIntoView({ block: "nearest" });
  };

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      moveActive(1);
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      moveActive(-1);
      return;
    }
    if (event.key === "Enter" && activeEntry) {
      event.preventDefault();
      goTo(activeEntry);
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
    }
  };

  let flatIndex = -1;

  return (
    <div
      className={`site-search-overlay${open ? " open" : ""}`}
      aria-hidden={!open}
      onMouseDown={event => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="site-search-dialog" role="dialog" aria-modal="true" aria-label="문서 검색">
        <div className="site-search-field">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="4.6" stroke="currentColor" strokeWidth="1.7" />
            <path d="M10.6 10.6L14 14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            placeholder="컴포넌트, 파운데이션, 패턴 검색"
            aria-label="검색어 입력"
            role="combobox"
            aria-expanded={flatResults.length > 0}
            aria-controls="site-search-listbox"
            aria-activedescendant={activeEntry ? optionId(activeIndex) : undefined}
            autoComplete="off"
            spellCheck={false}
            onChange={event => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={onInputKeyDown}
          />
          <kbd className="site-search-kbd">ESC</kbd>
        </div>
        {flatResults.length > 0 ? (
          <div className="site-search-results" id="site-search-listbox" role="listbox" aria-label="검색 결과">
            {groups.map(group => (
              <div key={group.type} className="site-search-group">
                <div className="site-search-group-label" aria-hidden="true">
                  {GROUP_LABELS[group.type]}
                </div>
                {group.items.map(entry => {
                  flatIndex += 1;
                  const index = flatIndex;
                  return (
                    <div
                      key={entry.href + entry.title}
                      id={optionId(index)}
                      className={`site-search-option${index === activeIndex ? " is-active" : ""}`}
                      role="option"
                      aria-selected={index === activeIndex}
                      onMouseEnter={() => setActiveIndex(index)}
                      onMouseDown={event => event.preventDefault()}
                      onClick={() => goTo(entry)}
                    >
                      <span className="site-search-option-title">{entry.title}</span>
                      <span className="site-search-option-desc">{entry.desc}</span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        ) : (
          <div className="site-search-empty">
            “{query.trim()}”에 맞는 결과가 없어요. 다른 키워드로 검색해 보세요.
          </div>
        )}
        <div className="site-search-footer" aria-hidden="true">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> 이동
          </span>
          <span>
            <kbd>Enter</kbd> 열기
          </span>
          <span>
            <kbd>ESC</kbd> 닫기
          </span>
        </div>
      </div>
    </div>
  );
};
