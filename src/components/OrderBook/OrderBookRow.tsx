import React, { useMemo } from "react";
import { Box, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import TextView from "../Atoms/TextView/TextView";
import { getSymbolDetails, setDecimalPrecision } from "@/helpers/Symboldetails";

interface OrderBookRowProps {
  Max: number;
  rowType: string;
  symbol: string;
  items: string[];
}
const OrderBookRow = ({ Max, rowType, items, symbol }: OrderBookRowProps) => {
  const theme = useTheme();
  const pricescale = useMemo(() => {
    return getSymbolDetails(symbol);
  }, [symbol]);

  return (
    <Box
      sx={{
        display: "flex",
        height: "25px",
        // gap: 1,
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      <TextView
        style={{ flex: 1 }}
        fontWeight={"Medium"}
        textType={"number"}
        color={
          rowType === "bids"
            ? theme.palette.success.main
            : theme.palette.error.main
        }
        text={setDecimalPrecision(
          String(Number(items[0])),
          pricescale.pricePrecision
        )}
      />

      <TextView
        style={{ flex: 1 }}
        textAlign={"center"}
        textType={"number"}
        fontWeight={"Medium"}
        text={setDecimalPrecision(
          String(Number(items[1]) * Number(items[0])),
          pricescale.pricePrecision
        )}
      />

      <TextView
        style={{ flex: 1 }}
        fontWeight={"Medium"}
        textType={"number"}
        text={setDecimalPrecision(
          String(Number(items[2]) * Number(items[0])),
          pricescale.pricePrecision
        )}
      />

      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          left: "2px",
          right: "2px",
        }}
      >
        <Box
          sx={{
            float: "right",
            transitionProperty: "all",
            transitionDuration: ".3s",
            transitionTimingFunction: "cubic-bezier(.4,0,.2,1)",
            width: `${(Number(items[2]) / Max) * 100}%`,
            height: "100%",
            background:
              rowType === "bids"
                ? "linear-gradient(90deg, rgba(41, 181, 126, 0.18) -20%, rgba(41, 181, 126, 0) 113.33%)"
                : "linear-gradient(90deg, rgba(255, 101, 84, 0.18) -20%, rgba(255, 101, 84, 0) 113.33%)",
          }}
        ></Box>
      </Box>
    </Box>
  );
};
OrderBookRow.propTypes = {
  setDecimalPrecision: PropTypes.func,
  Max: PropTypes.number,
  rowType: PropTypes.string,
  symbolQuantityPrecision: PropTypes.number,
  symbolPricePrecision: PropTypes.number,
  items: PropTypes.any,
};
export default OrderBookRow;
