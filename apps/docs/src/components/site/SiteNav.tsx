"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SearchDialog } from "./SearchDialog";

const MENU = [
  { key: "get-started", href: "/get-started", label: "Get Started", primary: true, hideSm: false },
  { key: "foundations", href: "/foundations", label: "Foundations", primary: false, hideSm: false },
  { key: "components", href: "/components", label: "Components", primary: false, hideSm: false },
  { key: "patterns", href: "/patterns", label: "Patterns", primary: false, hideSm: true },
  { key: "develop", href: "/develop", label: "Develop", primary: false, hideSm: true },
  { key: "updates", href: "/updates", label: "Updates", primary: false, hideSm: true }
] as const;

type Theme = "light" | "dark";

const navKeyFor = (pathname: string) => {
  const found = MENU.find(item => pathname === item.href || pathname.startsWith(`${item.href}/`));
  return found?.key ?? null;
};

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="7" cy="7" r="4.6" stroke="currentColor" strokeWidth="1.7" />
    <path d="M10.6 10.6L14 14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

const MoonIcon = () => (
  <svg className="theme-icon icon-moon" width="17" height="17" viewBox="0 0 17 17" fill="none">
    <path
      d="M14.5 10.5A6.5 6.5 0 0 1 6.5 2.5a6.5 6.5 0 1 0 8 8Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

const SunIcon = () => (
  <svg className="theme-icon icon-sun" width="17" height="17" viewBox="0 0 17 17" fill="none">
    <circle cx="8.5" cy="8.5" r="3.5" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M8.5 1.3v1.9M8.5 13.8v1.9M1.3 8.5h1.9M13.8 8.5h1.9M3.4 3.4l1.35 1.35M12.25 12.25l1.35 1.35M13.6 3.4l-1.35 1.35M4.75 12.25L3.4 13.6"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const LogoMark = () => <span className="nav-logo-mark">L</span>;

export const SiteNav = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const activeKey = navKeyFor(pathname);
  const [isDark, setIsDark] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    // head 인라인 스크립트가 페인트 전에 세팅한 data-theme과 동기화
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  }, []);

  useEffect(() => {
    if (!isHome) {
      return;
    }
    const onScroll = () => {
      const darkZone = document.getElementById("darkZone");
      if (!darkZone) {
        return;
      }
      setIsDark(window.scrollY + 56 >= darkZone.offsetTop);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isHome]);

  const toggleTheme = () => {
    const next: Theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("lds-theme", next);
    } catch {
      // localStorage 접근 불가 시에도 토글 자체는 동작
    }
    setTheme(next);
  };

  // 아이콘은 둘 다 렌더하고 CSS(html[data-theme])가 표시를 전환한다 — SSR/하이드레이션 플래시 방지.
  // theme 상태는 aria-label 동기화 용도로만 남긴다.
  const themeLabel = theme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환";
  const themeIcon = (
    <>
      <SunIcon />
      <MoonIcon />
    </>
  );

  return (
    <>
      {isHome ? (
        <nav className={`nav${isDark ? " is-dark" : ""}`}>
          <Link className="nav-logo" href="/">
            <LogoMark />
            <span className="nav-logo-text">LDS</span>
          </Link>
          {MENU.map(item => (
            <Link
              key={item.key}
              className={`nav-link${item.primary ? " primary" : ""}${item.hideSm ? " hide-sm" : ""}`}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
          <button className="nav-search" aria-label={themeLabel} onClick={toggleTheme}>
            {themeIcon}
          </button>
          <button className="nav-search" aria-label="검색" onClick={() => setSearchOpen(true)}>
            <SearchIcon />
          </button>
        </nav>
      ) : (
        <header className="topbar">
          <div className="topbar-inner">
            <Link className="topbar-logo" href="/">
              <LogoMark />
              <span className="nav-logo-text">LDS</span>
            </Link>
            <nav className="topbar-menu">
              {MENU.map(item => (
                <Link
                  key={item.key}
                  className={`${activeKey === item.key ? "active" : ""}${item.hideSm ? " hide-sm" : ""}`.trim() || undefined}
                  href={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="topbar-actions">
              <button className="topbar-icon-btn" aria-label={themeLabel} onClick={toggleTheme}>
                {themeIcon}
              </button>
              <button className="topbar-icon-btn" aria-label="검색" onClick={() => setSearchOpen(true)}>
                <SearchIcon />
              </button>
            </div>
          </div>
        </header>
      )}
      <SearchDialog open={searchOpen} onOpen={() => setSearchOpen(true)} onClose={() => setSearchOpen(false)} />
    </>
  );
};
