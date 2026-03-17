import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars } from "@lds/tokens";

const mediumContainer = {
  minHeight: "48px",
  padding: "13px 15px"
} as const;

const smallContainer = {
  minHeight: "40px",
  padding: "9px 11px"
} as const;

const infoColors = {
  backgroundColor: semanticColorRoles.alert.info.background,
  borderColor: semanticColorRoles.alert.info.border,
  color: semanticColorRoles.alert.info.text
} as const;

const neutralColors = {
  backgroundColor: semanticColorRoles.alert.neutral.background,
  borderColor: semanticColorRoles.alert.neutral.border,
  color: semanticColorRoles.alert.neutral.text
} as const;

export const alertRoot = recipe({
  base: {
    display: "grid",
    width: "100%",
    border: "1px solid transparent",
    borderRadius: themeVars.radius.sm,
    fontFamily: themeVars.font.family,
    boxSizing: "border-box"
  },
  variants: {
    type: {
      info: infoColors,
      confirm: neutralColors,
      saveTemporarily: neutralColors,
      secret: neutralColors
    },
    size: {
      medium: mediumContainer,
      small: smallContainer
    },
    layout: {
      default: {
        gridTemplateColumns: "minmax(0, 1fr) auto",
        alignItems: "flex-start",
        gap: "8px"
      },
      expanded: {
        gap: themeVars.spacing.x3
      }
    },
    hasActions: {
      true: {},
      false: {}
    }
  },
  compoundVariants: [
    {
      variants: {
        layout: "expanded",
        hasActions: true
      },
      style: {
        gridTemplateColumns: "1fr",
        alignItems: "stretch"
      }
    },
    {
      variants: {
        layout: "expanded",
        hasActions: false
      },
      style: {
        gridTemplateColumns: "1fr"
      }
    }
  ],
  defaultVariants: {
    type: "info",
    size: "medium",
    layout: "default",
    hasActions: false
  }
});

export const content = recipe({
  base: {
    minWidth: 0
  },
  variants: {
    layout: {
      default: {
        display: "grid",
        gridTemplateColumns: "16px minmax(0, 1fr)",
        alignItems: "flex-start",
        columnGap: "8px"
      },
      expanded: {
        display: "grid",
        rowGap: themeVars.spacing.x2
      }
    }
  },
  defaultVariants: {
    layout: "default"
  }
});

export const leadingRow = style({
  display: "contents"
});

export const iconWrap = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "16px",
    height: "16px",
    flexShrink: 0,
    marginTop: "1px",
    fontSize: "12px",
    lineHeight: 1
  },
  variants: {
    type: {
      info: {
        color: semanticColorRoles.alert.info.icon
      },
      confirm: {
        color: semanticColorRoles.alert.neutral.icon
      },
      saveTemporarily: {
        color: semanticColorRoles.alert.neutral.icon
      },
      secret: {
        color: semanticColorRoles.alert.neutral.icon
      }
    }
  },
  defaultVariants: {
    type: "info"
  }
});

export const body = style({
  minWidth: 0
});

export const title = recipe({
  base: {
    margin: 0,
    color: semanticColorRoles.text.heading,
    fontWeight: themeVars.font.weightBold,
    wordBreak: "keep-all"
  },
  variants: {
    size: {
      medium: {
        fontSize: themeVars.font.sizeSm,
        lineHeight: "20px"
      },
      small: {
        fontSize: themeVars.font.sizeSm,
        lineHeight: "16px"
      }
    }
  },
  defaultVariants: {
    size: "medium"
  }
});

export const description = recipe({
  base: {
    color: semanticColorRoles.text.secondary,
    wordBreak: "keep-all"
  },
  variants: {
    size: {
      medium: {
        fontSize: themeVars.font.sizeSm,
        lineHeight: "20px"
      },
      small: {
        fontSize: themeVars.font.sizeSm,
        lineHeight: "16px"
      }
    },
    hasTitle: {
      true: {
        marginTop: "2px"
      },
      false: {
        marginTop: 0
      }
    }
  },
  defaultVariants: {
    size: "medium",
    hasTitle: false
  }
});

export const actionArea = recipe({
  base: {
    minWidth: 0
  },
  variants: {
    layout: {
      default: {
        display: "inline-flex",
        alignItems: "center",
        justifySelf: "end",
        alignSelf: "flex-start",
        gap: themeVars.spacing.x2
      },
      expanded: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: themeVars.spacing.x3,
        marginTop: themeVars.spacing.x2
      }
    }
  },
  defaultVariants: {
    layout: "default"
  }
});

export const buttonGroup = style({
  display: "inline-flex",
  alignItems: "center",
  gap: themeVars.spacing.x2,
  flexWrap: "wrap"
});

export const actionButton = recipe({
  base: {
    minWidth: "42px",
    height: "24px",
    padding: `0 ${themeVars.spacing.x2}`,
    border: 0,
    borderRadius: themeVars.radius.sm,
    fontFamily: themeVars.font.family,
    fontSize: themeVars.font.sizeSm,
    fontWeight: themeVars.font.weightBold,
    lineHeight: 1,
    cursor: "pointer",
    transition: "background-color 120ms ease, box-shadow 120ms ease, transform 80ms ease",
    selectors: {
      "&:hover": {
        boxShadow: themeVars.shadow.raised
      },
      "&:active": {
        transform: "translateY(1px)",
        boxShadow: "none"
      },
      "&:focus-visible": {
        outline: "none",
        boxShadow: themeVars.shadow.focus
      }
    }
  },
  variants: {
    tone: {
      primary: {
        backgroundColor: semanticColorRoles.alert.action.primary.background,
        color: semanticColorRoles.alert.action.primary.text,
        selectors: {
          "&:hover": {
            backgroundColor: semanticColorRoles.alert.action.primary.hover,
            boxShadow: themeVars.shadow.raised
          },
          "&:active": {
            backgroundColor: semanticColorRoles.alert.action.primary.active,
            transform: "translateY(1px)",
            boxShadow: "none"
          }
        }
      },
      warning: {
        backgroundColor: semanticColorRoles.alert.action.warning.background,
        color: semanticColorRoles.alert.action.warning.text,
        selectors: {
          "&:hover": {
            backgroundColor: semanticColorRoles.alert.action.warning.hover,
            boxShadow: themeVars.shadow.raised
          },
          "&:active": {
            backgroundColor: semanticColorRoles.alert.action.warning.active,
            transform: "translateY(1px)",
            boxShadow: "none"
          }
        }
      }
    }
  },
  defaultVariants: {
    tone: "primary"
  }
});

export const textButton = style({
  border: 0,
  background: "transparent",
  color: semanticColorRoles.alert.action.primary.background,
  padding: 0,
  cursor: "pointer",
  fontFamily: themeVars.font.family,
  fontSize: themeVars.font.sizeSm,
  fontWeight: themeVars.font.weightBold,
  lineHeight: "20px"
});

export const closeButton = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "20px",
    height: "20px",
    border: 0,
    borderRadius: themeVars.radius.sm,
    background: "transparent",
    color: semanticColorRoles.text.heading,
    cursor: "pointer",
    padding: 0,
    fontSize: "14px",
    lineHeight: 1,
    selectors: {
      "&:hover": {
        backgroundColor: semanticColorRoles.surface.subtle
      },
      "&:focus-visible": {
        outline: "none",
        boxShadow: themeVars.shadow.focus
      }
    }
  },
  variants: {
    layout: {
      default: {
        alignSelf: "flex-start",
        justifySelf: "end"
      },
      expanded: {}
    }
  },
  defaultVariants: {
    layout: "default"
  }
});
