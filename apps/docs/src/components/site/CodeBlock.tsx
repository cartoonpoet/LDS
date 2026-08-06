"use client";

import { useRef, useState } from "react";
import { highlightCode } from "./highlight";

/** 문법 하이라이트 + 복사 버튼이 달린 다크 코드블록 */
export const CodeBlock = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard 권한이 없으면 조용히 무시
    }
  };

  return (
    <div className="codeblock has-copy" data-enhanced="1">
      <button className={`code-copy${copied ? " copied" : ""}`} onClick={copy} aria-label="코드 복사">
        {copied ? "복사됨" : "복사"}
      </button>
      <span style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: highlightCode(code) }} />
    </div>
  );
};
