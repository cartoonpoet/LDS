import { recipe } from "@vanilla-extract/recipes";
import { style } from "@vanilla-extract/css";
import { semanticColorRoles, themeVars } from "@lds/tokens";

export const root = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    gap: themeVars.spacing.x4,
    width: "100%",
    minWidth: 0,
    padding: themeVars.spacing.x5,
    borderRadius: themeVars.radius.lg,
    border: `1px solid ${semanticColorRoles.border.default}`,
    backgroundColor: semanticColorRoles.surface.canvas,
    boxSizing: "border-box"
  },
  variants: {
    variant: {
      timeline: {
        backgroundColor: semanticColorRoles.surface.canvas
      },
      chat: {
        backgroundColor: semanticColorRoles.surface.subtle
      },
      "bottom-sheet": {
        maxWidth: 720,
        maxHeight: "80vh",
        borderTopLeftRadius: themeVars.radius.lg,
        borderTopRightRadius: themeVars.radius.lg,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        boxShadow: themeVars.shadow.raised,
        backgroundColor: semanticColorRoles.surface.canvas
      }
    }
  },
  defaultVariants: {
    variant: "timeline"
  }
});

export const header = style({
  display: "flex",
  flexDirection: "column",
  gap: themeVars.spacing.x1
});

export const title = style({
  fontSize: themeVars.font.sizeLg,
  fontWeight: themeVars.font.weightBold,
  color: semanticColorRoles.text.heading
});

export const description = style({
  fontSize: themeVars.font.sizeSm,
  color: semanticColorRoles.text.secondary
});

export const list = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    gap: themeVars.spacing.x3,
    minWidth: 0
  },
  variants: {
    variant: {
      timeline: {
        position: "relative"
      },
      chat: {},
      "bottom-sheet": {
        overflowY: "auto",
        paddingRight: themeVars.spacing.x1
      }
    }
  },
  defaultVariants: {
    variant: "timeline"
  }
});

export const empty = style({
  padding: `${themeVars.spacing.x6} 0`,
  textAlign: "center",
  color: semanticColorRoles.text.tertiary,
  fontSize: themeVars.font.sizeSm
});

export const item = recipe({
  base: {
    display: "flex",
    gap: themeVars.spacing.x3,
    alignItems: "flex-start",
    minWidth: 0
  },
  variants: {
    variant: {
      timeline: {
        position: "relative",
        paddingLeft: themeVars.spacing.x2
      },
      chat: {},
      "bottom-sheet": {}
    },
    tone: {
      default: {},
      accent: {},
      muted: { opacity: 0.8 }
    },
    mine: {
      true: { justifyContent: "flex-end" },
      false: {}
    }
  },
  compoundVariants: [
    {
      variants: { variant: "timeline", mine: true },
      style: { justifyContent: "flex-start" }
    }
  ],
  defaultVariants: {
    variant: "timeline",
    tone: "default",
    mine: false
  }
});

export const timelineRail = style({
  position: "absolute",
  top: 0,
  bottom: `calc(${themeVars.spacing.x2} * -1)`,
  left: 7,
  width: 2,
  backgroundColor: semanticColorRoles.border.subtle
});

export const timelineDot = recipe({
  base: {
    position: "relative",
    zIndex: 1,
    width: 16,
    height: 16,
    marginTop: themeVars.spacing.x2,
    borderRadius: "50%",
    border: `2px solid ${semanticColorRoles.surface.canvas}`,
    flexShrink: 0
  },
  variants: {
    tone: {
      default: { backgroundColor: semanticColorRoles.action.secondary.default },
      accent: { backgroundColor: semanticColorRoles.action.primary.default },
      muted: { backgroundColor: semanticColorRoles.border.default }
    }
  },
  defaultVariants: {
    tone: "default"
  }
});

export const avatar = recipe({
  base: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    fontSize: themeVars.font.sizeSm,
    fontWeight: themeVars.font.weightBold,
    overflow: "hidden"
  },
  variants: {
    tone: {
      default: {
        backgroundColor: semanticColorRoles.surface.raised,
        color: semanticColorRoles.text.primary
      },
      accent: {
        backgroundColor: semanticColorRoles.action.primary.subtle,
        color: semanticColorRoles.action.primary.default
      },
      muted: {
        backgroundColor: semanticColorRoles.surface.subtle,
        color: semanticColorRoles.text.secondary
      }
    }
  },
  defaultVariants: {
    tone: "default"
  }
});

export const itemBody = style({
  display: "flex",
  flexDirection: "column",
  gap: themeVars.spacing.x2,
  minWidth: 0,
  flex: 1
});

export const metaRow = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    gap: themeVars.spacing.x2,
    flexWrap: "wrap"
  },
  variants: {
    mine: {
      true: { justifyContent: "flex-end" },
      false: {}
    }
  },
  defaultVariants: {
    mine: false
  }
});

export const author = style({
  fontSize: themeVars.font.sizeSm,
  fontWeight: themeVars.font.weightBold,
  color: semanticColorRoles.text.primary
});

export const timestamp = style({
  fontSize: themeVars.font.sizeSm,
  color: semanticColorRoles.text.tertiary
});

export const itemMeta = style({
  fontSize: themeVars.font.sizeSm,
  color: semanticColorRoles.text.secondary
});

export const bubble = recipe({
  base: {
    minWidth: 0,
    padding: themeVars.spacing.x3,
    borderRadius: themeVars.radius.md,
    fontSize: themeVars.font.sizeSm,
    lineHeight: 1.5,
    whiteSpace: "pre-wrap",
    wordBreak: "break-word"
  },
  variants: {
    variant: {
      timeline: {
        border: `1px solid ${semanticColorRoles.border.default}`,
        backgroundColor: semanticColorRoles.surface.canvas,
        color: semanticColorRoles.text.primary
      },
      chat: {
        border: `1px solid ${semanticColorRoles.border.default}`,
        backgroundColor: semanticColorRoles.surface.canvas,
        color: semanticColorRoles.text.primary,
        maxWidth: "80%"
      },
      "bottom-sheet": {
        border: `1px solid ${semanticColorRoles.border.default}`,
        backgroundColor: semanticColorRoles.surface.raised,
        color: semanticColorRoles.text.primary
      }
    },
    tone: {
      default: {},
      accent: {
        borderColor: semanticColorRoles.action.primary.default,
        backgroundColor: semanticColorRoles.action.primary.subtle
      },
      muted: {
        backgroundColor: semanticColorRoles.surface.subtle,
        color: semanticColorRoles.text.secondary
      }
    },
    mine: {
      true: {
        backgroundColor: semanticColorRoles.action.primary.default,
        borderColor: semanticColorRoles.action.primary.default,
        color: semanticColorRoles.text.inverse,
        marginLeft: "auto"
      },
      false: {}
    }
  },
  compoundVariants: [
    {
      variants: { variant: "timeline", mine: true },
      style: {
        marginLeft: 0,
        backgroundColor: semanticColorRoles.action.primary.subtle,
        color: semanticColorRoles.action.primary.default
      }
    },
    {
      variants: { variant: "bottom-sheet", mine: true },
      style: {
        backgroundColor: semanticColorRoles.action.primary.default,
        color: semanticColorRoles.text.inverse
      }
    }
  ],
  defaultVariants: {
    variant: "timeline",
    tone: "default",
    mine: false
  }
});

export const attachments = style({
  display: "flex",
  flexWrap: "wrap",
  gap: themeVars.spacing.x2
});

export const attachment = style({
  display: "inline-flex",
  alignItems: "center",
  gap: themeVars.spacing.x1,
  padding: `${themeVars.spacing.x1} ${themeVars.spacing.x2}`,
  borderRadius: themeVars.radius.sm,
  backgroundColor: semanticColorRoles.surface.subtle,
  color: semanticColorRoles.text.secondary,
  fontSize: themeVars.font.sizeSm
});

export const composer = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    gap: themeVars.spacing.x3,
    paddingTop: themeVars.spacing.x3,
    borderTop: `1px solid ${semanticColorRoles.border.default}`
  },
  variants: {
    variant: {
      timeline: {},
      chat: {},
      "bottom-sheet": {
        position: "sticky",
        bottom: 0,
        marginLeft: `calc(${themeVars.spacing.x5} * -1)`,
        marginRight: `calc(${themeVars.spacing.x5} * -1)`,
        marginBottom: `calc(${themeVars.spacing.x5} * -1)`,
        padding: themeVars.spacing.x5,
        backgroundColor: semanticColorRoles.surface.canvas
      }
    }
  },
  defaultVariants: {
    variant: "timeline"
  }
});

export const composerLabel = style({
  fontSize: themeVars.font.sizeSm,
  fontWeight: themeVars.font.weightMedium,
  color: semanticColorRoles.text.primary
});

export const textarea = style({
  width: "100%",
  minHeight: 96,
  padding: themeVars.spacing.x3,
  borderRadius: themeVars.radius.md,
  border: `1px solid ${semanticColorRoles.border.default}`,
  backgroundColor: semanticColorRoles.surface.canvas,
  color: semanticColorRoles.text.primary,
  resize: "vertical",
  boxSizing: "border-box",
  font: "inherit",
  selectors: {
    '&:focus': {
      outline: `2px solid ${semanticColorRoles.border.focus}`,
      outlineOffset: 2
    }
  }
});

export const composerFooter = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: themeVars.spacing.x3,
  flexWrap: "wrap"
});

export const helperText = style({
  fontSize: themeVars.font.sizeSm,
  color: semanticColorRoles.text.tertiary
});

export const composerActions = style({
  display: "flex",
  justifyContent: "flex-end",
  gap: themeVars.spacing.x2
});
