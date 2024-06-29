export const MuiTabs = {
  styleOverrides: {
    root: ({ theme }: { theme: any }) => ({
      display: "flex",
      fontSize: "12px",
      alignItems: "center",
      "& .MuiTabs-indicator": {
        // borderBottom: `1px solid ${theme.palette}`,
        // backgroundColor: `${theme.palette.neutral.black}`,
      },
    }),
  },
};
