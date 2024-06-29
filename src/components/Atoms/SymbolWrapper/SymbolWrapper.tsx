import React from "react";
import { Box } from "@mui/material";

import TextView from "../TextView/TextView";
import { getCurrencyUrl } from "@/helpers/CurrencyLogo";
interface SymbolWrapperProps {
  symbol: string;
  variant?:string;
  symbolText?: boolean;
}

export const SymbolWrapper: React.FC<SymbolWrapperProps> = ({
  symbol,
  symbolText,
  variant="Rwgular_12"
}) => {
  return (
    <Box sx={WrapperCard}>
      {
        <Box
          component={"img"}
          onError={(event:any) => (event.target.style.display = "none")}
          src={getCurrencyUrl(
            symbol.toUpperCase().replace("USDT", "").toLowerCase()
          )}
          alt="symbolLogo"
          sx={ImageStyles}
        />
      }
      <Box sx={SymbolStyles}>
        {symbolText && (
          <TextView fontWeight={"Medium"} variant={variant} component={"p"}>
            {symbol.toUpperCase().replace(("USDT"||"USDC"), "")}
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
  gap: 1,
};
const ImageStyles = {
  height: "18px",
  width: "18px",
  borderRadius: "50%",
  backgroundColor: "white",
};
const SymbolStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};
