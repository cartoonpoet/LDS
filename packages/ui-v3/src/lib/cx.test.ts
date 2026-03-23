import { describe, it, expect } from "vitest";
import { cx } from "./cx";

describe("cx", () => {
  it("joins multiple class names", () => {
    expect(cx("a", "b", "c")).toBe("a b c");
  });

  it("filters out falsy values", () => {
    expect(cx("a", false, null, undefined, "b")).toBe("a b");
  });

  it("returns empty string when all values are falsy", () => {
    expect(cx(false, null, undefined)).toBe("");
  });

  it("returns empty string when called with no arguments", () => {
    expect(cx()).toBe("");
  });

  it("handles single class name", () => {
    expect(cx("only")).toBe("only");
  });
});
