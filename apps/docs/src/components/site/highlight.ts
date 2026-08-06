const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const KEYWORDS = /\b(import|from|export|const|let|return|function|async|await|new|type|default|typeof|as)\b/g;

/**
 * 시안 코드블록과 동일한 토큰 클래스(tk-kw/tk-str/tk-cm/tk-tag/tk-attr)를 쓰는
 * 간단한 TSX 문법 하이라이터.
 */
export const highlightCode = (code: string): string => {
  const parts = code.split(/(\/\/[^\n]*|"[^"\n]*"|'[^'\n]*'|`[^`]*`)/g);
  return parts
    .map((part, index) => {
      if (index % 2 === 1) {
        const cls = part.startsWith("//") ? "tk-cm" : "tk-str";
        return `<span class="${cls}">${escapeHtml(part)}</span>`;
      }
      let html = escapeHtml(part);
      html = html.replace(/&lt;(\/?)([A-Z][A-Za-z0-9]*)/g, '&lt;$1<span class="tk-tag">$2</span>');
      html = html.replace(KEYWORDS, '<span class="tk-kw">$1</span>');
      html = html.replace(/([a-zA-Z][A-Za-z0-9]*)=(?!=|&gt;)/g, '<span class="tk-attr">$1</span>=');
      return html;
    })
    .join("");
};
