// Name of the component
export const MuiToggleButton:any = {
  styleOverrides: {
    // Name of the slot
    root: {
      outlineWidth: "none",
      color: "white",
      outlineStyle: "none",
    },
  },
  variants: [
    /* <--- New Design System Variant---> */
    {
      props: { variant: "chip" },
      style: ({ theme }: { theme: any }) => ({
        paddingX: 4,
        paddingY: 2,
        color: theme.palette.grey[700],
        backgroundColor: "transparent",

        "&.Mui-selected": {
          color: theme.palette.primary.main,
          backgroundColor: "#282F0F",
        },
        "&:hover": {
          color: theme.palette.primary.main,
          backgroundColor: "transparent",
        },
      }),
    },
    /* <--- New Design System Variant ---> */
  ],
};
