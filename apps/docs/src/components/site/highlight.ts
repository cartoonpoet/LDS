const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * 시안 코드블록과 동일한 토큰 클래스(tk-kw/tk-str/tk-cm/tk-tag/tk-attr)를 쓰는
 * 간단한 TSX 문법 하이라이터.
 *
 * 주의: 토큰 치환은 반드시 "단일 패스"여야 한다. 정규식을 순차 적용하면
 * 앞 단계가 삽입한 <span class="..."> 마크업의 class= 를 뒤 단계가 다시
 * 매칭해 HTML이 깨진다 (실제로 발생했던 버그).
 */
export const highlightCode = (code: string): string => {
  const parts = code.split(/(\/\/[^\n]*|"[^"\n]*"|'[^'\n]*'|`[^`]*`)/g);
  return parts
    .map((part, index) => {
      if (index % 2 === 1) {
        const cls = part.startsWith("//") ? "tk-cm" : "tk-str";
        return `<span class="${cls}">${escapeHtml(part)}</span>`;
      }
      // 이스케이프된 소스에 대해 태그/키워드/속성을 한 번의 스캔으로 치환한다.
      return escapeHtml(part).replace(
        /(&lt;\/?)([A-Z][A-Za-z0-9]*)|\b(import|from|export|const|let|return|function|async|await|new|type|default|typeof|as)\b|([A-Za-z][A-Za-z0-9]*)=(?!=|&gt;)/g,
        (match, ltPrefix, tag, keyword, attr) => {
          if (tag) {
            return `${ltPrefix}<span class="tk-tag">${tag}</span>`;
          }
          if (keyword) {
            return `<span class="tk-kw">${keyword}</span>`;
          }
          if (attr) {
            return `<span class="tk-attr">${attr}</span>=`;
          }
          return match;
        }
      );
    })
    .join("");
};
