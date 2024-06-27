import React from "react";
import { Box } from "@mui/material";
import { getCurrencyUrl } from "@/helpers/CurrencyLogo.js";
import TextView from "../TextView/TextView";
interface SymbolWrapperProps {
  symbol: string;
  symbolText?: string;
}

export const SymbolWrapper: React.FC<SymbolWrapperProps> = ({ symbol, symbolText }) => {
  return (
    <Box sx={WrapperCard}>
      {<Box component={"img"} onError={(event) => (event.target.style.display = "none")} src={getCurrencyUrl(symbol.toUpperCase().replace("USDT", "").toLowerCase())} alt="symbolLogo" sx={ImageStyles} />}
      <Box sx={SymbolStyles}>
    
        {symbolText && (
        <TextView variant={"Regular_12"} component={"p"}>
        {symbol.toUpperCase().replace("USDT", "")}
      </TextView>
        )}
      </Box>
    </Box>
  );
};

 const WrapperCard = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 1
  };
   const ImageStyles = {
    height: "15px",
    width: "15px",
    borderRadius: "50%",
    backgroundColor: "white"
  };
   const SymbolStyles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  };
  