import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";
import { themeVars } from "@lds/tokens";

const layoutProperties = defineProperties({
  conditions: {
    mobile: {},
    tablet: {
      "@media": "screen and (min-width: 768px)"
    },
    desktop: {
      "@media": "screen and (min-width: 1280px)"
    }
  },
  defaultCondition: "mobile",
  responsiveArray: ["mobile", "tablet", "desktop"],
  properties: {
    display: ["none", "block", "inline-flex", "flex", "grid"],
    alignItems: ["stretch", "center"],
    justifyContent: ["flex-start", "center", "space-between"],
    width: ["100%"],
    gap: themeVars.spacing
  }
});

export const sprinkles = createSprinkles(layoutProperties);
