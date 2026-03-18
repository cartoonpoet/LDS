import { style, styleVariants } from "@vanilla-extract/css";
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
        columnGap: themeVars.spacing.x3
      },
      expanded: {
        gridTemplateColumns: "minmax(0, 1fr)",
        rowGap: themeVars.spacing.x2
      }
    }
  },
  defaultVariants: {
    type: "info",
    size: "medium",
    layout: "default"
  }
});

const contentAreaBase = style({
  minWidth: 0
});

export const contentArea = styleVariants({
  default: [contentAreaBase],
  expanded: [
    contentAreaBase,
    {
      display: "grid",
      rowGap: themeVars.spacing.x2
    }
  ]
});

const bodyRowBase = style({
  display: "grid",
  gridTemplateColumns: "16px minmax(0, 1fr)",
  columnGap: themeVars.spacing.x2,
  alignItems: "flex-start",
  minWidth: 0
});

export const bodyRow = styleVariants({
  medium: [
    bodyRowBase,
    {
      minHeight: "20px"
    }
  ],
  small: [
    bodyRowBase,
    {
      minHeight: "16px"
    }
  ]
});

export const iconWrap = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "16px",
    height: "16px",
    flexShrink: 0,
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
    },
    size: {
      medium: {
        marginTop: "1px"
      },
      small: {
        marginTop: 0
      }
    }
  },
  defaultVariants: {
    type: "info",
    size: "medium"
  }
});

const bodyBase = style({
  minWidth: 0
});

export const body = styleVariants({
  default: [bodyBase],
  expanded: [
    bodyBase,
    {
      paddingRight: themeVars.spacing.x1
    }
  ]
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
        alignItems: "flex-start",
        justifySelf: "end",
        gap: themeVars.spacing.x2
      },
      expanded: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: themeVars.spacing.x3,
        minHeight: "24px"
      }
    },
    hasButtons: {
      true: {},
      false: {}
    },
    hasTextButton: {
      true: {},
      false: {}
    },
    hasCloseButton: {
      true: {},
      false: {}
    }
  },
  compoundVariants: [
    {
      variants: {
        layout: "default",
        hasButtons: false,
        hasTextButton: false,
        hasCloseButton: true
      },
      style: {
        alignItems: "center"
      }
    },
    {
      variants: {
        layout: "expanded",
        hasButtons: false,
        hasTextButton: false,
        hasCloseButton: true
      },
      style: {
        justifyContent: "flex-end"
      }
    },
    {
      variants: {
        layout: "expanded",
        hasButtons: false,
        hasTextButton: true,
        hasCloseButton: false
      },
      style: {
        justifyContent: "flex-start"
      }
    }
  ],
  defaultVariants: {
    layout: "default",
    hasButtons: false,
    hasTextButton: false,
    hasCloseButton: false
  }
});

const actionGroupBase = style({
  display: "inline-flex",
  alignItems: "center",
  gap: themeVars.spacing.x2,
  flexWrap: "wrap",
  minWidth: 0
});

export const actionGroup = styleVariants({
  default: [
    actionGroupBase,
    {
      justifyContent: "flex-end"
    }
  ],
  expanded: [
    actionGroupBase,
    {
      flex: 1,
      justifyContent: "flex-start"
    }
  ]
});

const interactiveReset = {
  border: 0,
  fontFamily: themeVars.font.family,
  cursor: "pointer",
  selectors: {
    "&:focus-visible": {
      outline: "none",
      boxShadow: themeVars.shadow.focus
    }
  }
} as const;

export const actionButton = recipe({
  base: {
    ...interactiveReset,
    minWidth: "42px",
    height: "24px",
    padding: `0 ${themeVars.spacing.x2}`,
    borderRadius: themeVars.radius.sm,
    fontSize: themeVars.font.sizeSm,
    fontWeight: themeVars.font.weightBold,
    lineHeight: 1,
    transition: "background-color 120ms ease, box-shadow 120ms ease, transform 80ms ease",
    selectors: {
      ...interactiveReset.selectors,
      "&:hover": {
        boxShadow: themeVars.shadow.raised
      },
      "&:active": {
        transform: "translateY(1px)",
        boxShadow: "none"
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
  ...interactiveReset,
  background: "transparent",
  color: semanticColorRoles.alert.action.primary.background,
  padding: 0,
  fontSize: themeVars.font.sizeSm,
  fontWeight: themeVars.font.weightBold,
  lineHeight: "20px",
  textDecoration: "none",
  selectors: {
    ...interactiveReset.selectors,
    "&:hover": {
      textDecoration: "underline"
    }
  }
});

export const closeButton = recipe({
  base: {
    ...interactiveReset,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "20px",
    height: "20px",
    borderRadius: themeVars.radius.sm,
    background: "transparent",
    color: semanticColorRoles.text.heading,
    padding: 0,
    fontSize: "14px",
    lineHeight: 1,
    flexShrink: 0,
    selectors: {
      ...interactiveReset.selectors,
      "&:hover": {
        backgroundColor: semanticColorRoles.surface.subtle
      }
    }
  },
  variants: {
    layout: {
      default: {
        marginTop: "2px"
      },
      expanded: {
        marginTop: "2px"
      }
    }
  },
  defaultVariants: {
    layout: "default"
  }
});
