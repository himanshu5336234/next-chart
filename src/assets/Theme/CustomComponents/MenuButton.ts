
export const MuiButton:any = {
  styleOverrides: {
    root: {
      width: "100%",
      fontSize: "14px",
      borderRadius: "6px",
      padding: "8px 24px",
      textTransform: "capitalize",
      boxShadow: "0px 0px 24px 0px rgba(168, 239, 156, 0.4)",
      "&:hover": {
        color: "white",
      },
      "&.Mui-disabled": {
        color: "#1F1F24",
        backgroundColor: "#ffffff5e",
      },
    },
  },
  variants: [
    {
      props: { variant: "primary" },
      style: {
        color: "black",
        background: "linear-gradient(85.85deg, #D4F938 23.09%, #32D875 108.69%)",
        "&:hover": { color: "black", backgroundColor: "#fff" },
      },
    },
  ],
};
