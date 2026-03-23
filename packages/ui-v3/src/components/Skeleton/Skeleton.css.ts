import { style, keyframes } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { grayPalette, themeVars } from "@lds/tokens";

const shimmer = keyframes({
  "0%": { backgroundPosition: "-200% 0" },
  "100%": { backgroundPosition: "200% 0" },
});

export const root = recipe({
  base: {
    display: "block",
    backgroundColor: grayPalette[200],
    backgroundImage: `linear-gradient(90deg, ${grayPalette[200]} 25%, ${grayPalette[100]} 50%, ${grayPalette[200]} 75%)`,
    backgroundSize: "200% 100%",
    animation: `${shimmer} 1.5s ease-in-out infinite`,
  },
  variants: {
    variant: {
      rect: {
        borderRadius: themeVars.radius.sm,
      },
      circle: {
        borderRadius: "50%",
      },
      text: {
        borderRadius: themeVars.radius.sm,
        height: 14,
      },
    },
  },
  defaultVariants: { variant: "rect" },
});

export const textGroup = style({
  display: "flex",
  flexDirection: "column",
  gap: 10,
});

export const lastLine = style({
  width: "60%",
});

/* ─── Skeleton.Content ─── */

const fadeIn = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

export const contentWrapper = style({
  position: "relative",
});

export const contentVisible = style({
  animation: `${fadeIn} 0.3s ease-out`,
});

export const contentHidden = style({
  position: "absolute",
  width: 0,
  height: 0,
  overflow: "hidden",
  opacity: 0,
  pointerEvents: "none",
});
