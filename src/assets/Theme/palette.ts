import { colors } from "./palleteConstants";

export const LightPalette = {
  primary: {
    main: colors.primary,
    light: colors.primaryTint1,
    dark: colors.primaryShade4,
    contrastText: colors.black,
  },
  secondary: {
    main: colors.link,
  },
  error: {
    main: colors.incorrectSell,
  },
  warning: {
    main: colors.waiting,
  },
  info: {
    main: colors.link,
  },
  success: {
    main: colors.correctBuy,
  },
  background: {
    default: colors.black,
    
    paper: colors.greyLightMode5,
  },
  text: {
    primary: colors.black,
    secondary: colors.greyLightMode8,
  },
  grey: {
    100: colors.greyLightMode1,
    200: colors.greyLightMode2,
    300: colors.greyLightMode3,
    400: colors.greyLightMode4,
    500: colors.greyLightMode5,
    600: colors.greyLightMode6,
    700: colors.greyLightMode7,
    800: colors.greyLightMode8,
    900: colors.greyLightMode9,
    1000: colors.black,
  },
};

// Dark theme

export const darkPalette = {
  primary: {
    main: colors.primary,

    light: colors.primaryTint1,
    dark: colors.primaryShade4,
    contrastText: colors.black,
  },
  secondary: {
    main: colors.link,
  },
  error: {
    main: colors.incorrectSell,
  },
  warning: {
    main: colors.waiting,
  },
  info: {
    main: colors.link,
  },
  success: {
    main: colors.correctBuy,
  },
  background: {
    default: colors.black,
    paper: colors.greyDarkMode8,
    modal: colors.greyDarkMode2,
  },
  border: {
    primary: colors.greyDarkMode3,
  },
  text: {
    primary: colors.white,
    secondary: colors.greyDarkMode3,
    tertiary: colors.greyDarkMode7,
  },

  grey: {
    100: colors.greyDarkMode1,
    200: colors.greyDarkMode2,
    300: colors.greyDarkMode3,
    400: colors.greyDarkMode4,
    500: colors.greyDarkMode5,
    600: colors.greyDarkMode6,
    700: colors.greyDarkMode7,
    800: colors.greyDarkMode8,
    900: colors.greyDarkMode9,
    1000: colors.black,
  },
};
