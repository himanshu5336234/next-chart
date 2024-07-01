import React, { useState } from "react";
import { Select, Box, useTheme, InputLabel, MenuItem } from "@mui/material";
import { SymbolWrapper } from "../Atoms/SymbolWrapper/SymbolWrapper";
import BasicSearchField from "../Atoms/CustomInput/BasicSearchField";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
type Props = {varient:string|null; options: any[]; placeholder: string; onChange: any; label: string; value: number | string };
const Dropdown = ({varient="primary", label, value, onChange, options, placeholder }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const theme = useTheme();

  const handleSearchChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setSearchTerm(event.target.value);
  };

  const filteredCoins = options?.filter((item: any) => item.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Box sx={{ minWidth: 200, display: "flex", flexDirection: "column", gap: 1 }}>
      <InputLabel sx={{ color: "#fff", fontSize: "12px" }}>{label}</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        IconComponent={() => (
          <KeyboardArrowDownIcon sx={{color:theme.palette.grey[700]}} />
        )}
        sx={{
          height: "40px",px:1,
          background:varient ==="primary"?theme.palette.grey[100] :theme.palette.grey[200],
          width: "100%",
          borderRadius: 1,
          border: "1px solid #29292E",
          ".MuiOutlinedInput-notchedOutline": {
            borderColor: "#0E0E0F"
          },

          ".MuiSvgIcon-root": {
            color: theme.palette.grey[800]
          },
          ".MuiInputLabel-root": {
            color: "#fff"
          },
          "&:focus-visible": {
            outline: "0px solid #29292E" // Custom outline style
          }
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              py: varient ==="primary"?0 :0,
              px:2,
              pb:3,
              borderStyle: "solid",
              borderColor: "#29292E",
              borderWidth: "1px",
              borderTopWidth: "0px",
              backgroundImage: "none",
              backgroundColor: varient ==="primary"?theme.palette.grey[100] :theme.palette.grey[200],
            }
          }
        }}
      >
        <Box mb={2}>
          <BasicSearchField  placeholder={placeholder} onchange={handleSearchChange} />
        </Box>
        {filteredCoins?.map((coin: boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.Key | null | undefined) => (
          <MenuItem sx={{ p: 1 }} variant={"Regular_14"} fontWeight={"Medium"} value={coin} key={coin} >
          <SymbolWrapper symbol={coin} symbolText={coin} />
           </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default Dropdown;
