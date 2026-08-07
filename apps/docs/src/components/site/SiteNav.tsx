"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SearchDialog } from "./SearchDialog";

const MENU = [
  { key: "get-started", href: "/get-started", label: "Get Started", primary: true, hideSm: false },
  { key: "foundations", href: "/foundations", label: "Foundations", primary: false, hideSm: false },
  { key: "components", href: "/components", label: "Components", primary: false, hideSm: false },
  { key: "patterns", href: "/patterns", label: "Patterns", primary: false, hideSm: true },
  { key: "develop", href: "/develop", label: "Develop", primary: false, hideSm: true },
  { key: "updates", href: "/updates", label: "Updates", primary: false, hideSm: true }
] as const;

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

const LogoMark = () => <span className="nav-logo-mark">L</span>;

export const SiteNav = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const activeKey = navKeyFor(pathname);
  const [isDark, setIsDark] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const showToast = (message: string) => {
    setToast(message);
    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  };

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
              <button className="topbar-icon-btn" aria-label="다크 모드" onClick={() => showToast("곧 만나볼 수 있어요")}>
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                  <path
                    d="M14.5 10.5A6.5 6.5 0 0 1 6.5 2.5a6.5 6.5 0 1 0 8 8Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button className="topbar-icon-btn" aria-label="검색" onClick={() => setSearchOpen(true)}>
                <SearchIcon />
              </button>
            </div>
          </div>
        </header>
      )}
      <SearchDialog open={searchOpen} onOpen={() => setSearchOpen(true)} onClose={() => setSearchOpen(false)} />
      <div className={`prep-toast${toast ? " show" : ""}`}>
        <span className="ic">✦</span>
        <span>{toast ?? ""}</span>
      </div>
    </>
  );
};
