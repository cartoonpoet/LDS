"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * 정적 마크업(get-started/develop/foundations 쇼케이스)의 .codeblock에
 * 복사 버튼을 주입한다. CodeBlock 컴포넌트가 그린 블록(data-enhanced)은 건너뛴다.
 */
export const CodeEnhancer = () => {
  const pathname = usePathname();

  useEffect(() => {
    document.querySelectorAll<HTMLElement>(".codeblock:not([data-enhanced])").forEach(block => {
      block.dataset.enhanced = "1";
      const code = block.innerText;
      const button = document.createElement("button");
      button.className = "code-copy";
      button.type = "button";
      button.setAttribute("aria-label", "코드 복사");
      button.textContent = "복사";
      button.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(code);
          button.textContent = "복사됨";
          button.classList.add("copied");
          setTimeout(() => {
            button.textContent = "복사";
            button.classList.remove("copied");
          }, 1600);
        } catch {
          // clipboard 권한이 없으면 조용히 무시
        }
      });
      block.appendChild(button);
    });
  }, [pathname]);

  return null;
};
