export const MuiCheckbox = {
  styleOverrides: {
    root: {
      fontSize: 16,
      // color:"#8B8B97",
      padding: "0px 16px !important",
      "&:hover": {
        backgroundColor: "transparent",
      },
      ".MuiSvgIcon-root": {
        borderRadius: "6px",
        padding: 1,

      },
    },
    colorPrimary: {
      "&.Mui-checked": {
        color: "#EBFF25",
      },
    },
  },
};
