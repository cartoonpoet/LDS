import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * 입력 필드 border 회귀 테스트.
 *
 * 배경: Dropdown 만 grayPalette[200](#eeeff2), 나머지 입력계는 grayPalette[400](#cfd5e1) 을 쓰고 있어
 * 디자인(#9ea7b8)과 어긋나 있었다. 원인은 입력계에 공통 베이스가 없어 각 컴포넌트가
 * 팔레트를 직접 골라 쓴 것. 이 테스트는 그 상태로 되돌아가는 것을 막는다.
 *
 * jsdom 은 CSS 변수를 계산하지 못해 렌더 결과의 border-color 를 단언할 수 없으므로,
 * 각 *.css.ts 가 공통 토큰을 참조하는지를 소스에서 검증한다.
 */

const FIELD_BORDER_TOKEN = "semanticColorRoles.field.border";

/** 필드 테두리를 선언하는 곳 — [파일, 그 파일 안에서 기대되는 선언 수] */
const FIELD_BORDER_DECLARATIONS: ReadonlyArray<readonly [string, number]> = [
  ["Dropdown/Dropdown.css.ts", 2], // trigger + multi-check 체크박스
  ["Input/Input.css.ts", 2], // inputWrapper + multiWrapper(MultiSelect)
  ["Textarea/Textarea.css.ts", 1],
  ["AutoComplete/AutoComplete.css.ts", 1],
  ["TagSelect/TagSelect.css.ts", 2], // trigger + optionCheck
];

const read = (relative: string) =>
  readFileSync(join(__dirname, relative), "utf8");

const countOccurrences = (haystack: string, needle: string) =>
  haystack.split(needle).length - 1;

describe("입력 필드 border 토큰", () => {
  it.each(FIELD_BORDER_DECLARATIONS)(
    "%s 는 field.border 를 %i 곳에서 쓴다",
    (file, expected) => {
      expect(countOccurrences(read(file), FIELD_BORDER_TOKEN)).toBe(expected);
    }
  );

  it("어떤 입력 필드도 border 에 grayPalette 를 직접 쓰지 않는다", () => {
    const offenders = FIELD_BORDER_DECLARATIONS.flatMap(([file]) =>
      read(file)
        .split("\n")
        .map((line, i) => ({ file, line: line.trim(), no: i + 1 }))
        .filter(
          ({ line }) =>
            /(^|\s)border(Color)?:/.test(line) && line.includes("grayPalette[")
        )
        .map(({ file: f, line, no }) => `${f}:${no}  ${line}`)
    );

    expect(offenders).toEqual([]);
  });

  it("Checkbox 컴포넌트와 드롭다운·태그 내부 체크박스의 테두리 색이 같은 토큰을 가리킨다", () => {
    // Checkbox 는 boxShadow inset 으로 테두리를 그리므로 별도 확인이 필요하다.
    const checkbox = read("Checkbox/Checkbox.css.ts");
    const checkboxRing = checkbox
      .split("\n")
      .find((line) => line.includes("inset 0 0 0 1.5px"));

    expect(checkboxRing).toBeDefined();
    // field.border 와 Checkbox ring 이 동일 리터럴(grayPalette[500] = #9ea7b8)로 수렴하는지
    expect(checkboxRing).toContain("grayPalette[500]");

    for (const file of ["Dropdown/Dropdown.css.ts", "TagSelect/TagSelect.css.ts"]) {
      expect(read(file)).toContain(`1.5px solid \${${FIELD_BORDER_TOKEN}}`);
    }
  });
});
