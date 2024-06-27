import { Box, colors, TextField, useTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

const BasicSearchField = (props: any) => {
  return (
    <Box sx={{ backgroundColor: "background.default", display: "flex", alignItems: "center", px: 1, width: "100%", borderRadius: 1, border: "1px solid", borderColor: "#29292E" }}>
      <SearchIcon sx={{ fontSize: 20, color: "rgba(68, 68, 77, 1)" }} />
      <TextField {...props} sx={style} onFocus={CustomOnFocusHandler} type={"search"} variant={"outlined"} InputLabelProps={{ shrink: true }} autoComplete="off" />
    </Box>
  );
};

export default BasicSearchField;

const style = {
  ".MuiInputBase-input": {
    p: " 8px 16px",
    fontSize: "14px",
    color:"#8B8B97"
  },

  "& .MuiOutlinedInput-root": {
    "& > fieldset": { borderWidth: "0px" }
  }
};
const CustomOnFocusHandler = (event: { target: { addEventListener: (arg0: string, arg1: (e: any) => void, arg2: { passive: boolean }) => void } }) => {
  event.target.addEventListener(
    "wheel",
    function (e: { preventDefault: () => void }) {
      e.preventDefault();
    },
    { passive: false }
  );
};
