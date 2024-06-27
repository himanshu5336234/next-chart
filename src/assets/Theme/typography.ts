function pxToRem(value: number) {
  return `${value / 16}rem`;
}

export const FONT_FAMILY = {
  text: {
    Regular: "text-Regular",
    Medium: "text-Medium",
    SemiBold: "text-SemiBold",
    Bold: "text-Bold",
  },
  number: {
    Regular: "number-Regular",
    Medium: "number-Medium",
    SemiBold: "number-SemiBold",
    Bold: "number-Bold",
  },
};

export const typography = {
  fontFamily: "Text-Medium",
  Regular_12: {
    fontSize: pxToRem(12),
  },
  Medium_12: {
    fontWeight: 500,
    fontSize: pxToRem(12),
  },
  Regular_14: {
    fontSize: pxToRem(14),
  },
  Regular_16: {
    fontSize: pxToRem(16),
  },
  Regular_18: {
    fontSize: pxToRem(18),
  },
  Regular_20: {
    fontSize: pxToRem(20),
  },
  Regular_22: {
    fontSize: pxToRem(22),
  },
  Regular_24: {
    fontSize: pxToRem(24),
  },
  Regular_28: {
    fontSize: pxToRem(28),
  },
  Regular_32: {
    fontSize: pxToRem(32),
  },
  SemiBold_32: {
    fontWeight: 600,
    fontSize: pxToRem(32),
  },
};
