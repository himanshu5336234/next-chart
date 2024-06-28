import React from "react";
import { Box, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import TextView from "../Atoms/TextView/TextView";

interface OrderBookRowProps {

  Max: number;
  rowType: string;

  items: string[];
}
const OrderBookRow = ({  Max, rowType, items }: OrderBookRowProps) => {
  const theme =useTheme()
  return (
    <Box
      sx={{
        display: "flex",
        height: "25px",
        // gap: 1,
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative"
      }}
    >
      <TextView
        style={{ flex: 1 }}
        component={"h4"}
        textType={"number"}
        color={rowType === "bids" ? theme.palette.success.main :theme.palette.error.main}
        text={String(Number(items[0]))}
      />

      <TextView
        style={{ flex: 1 }}
        component={"h4"}
        textAlign={"center"}
        textType={"number"}
        text={String(items[1] * items[0])}
      />

      <TextView
        style={{ flex: 1 }}
        component={"h4"}
  textType={"number"}

        text={String(items[2] * items[0])}
      />

      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          left: "2px",
          right: "2px"
        }}
      >
        <Box
          sx={{
            float: "right",
            transitionProperty: "all",
            transitionDuration: ".3s",
            transitionTimingFunction: "cubic-bezier(.4,0,.2,1)",
            width: `${(items[2] / Max) * 100}%`,
            height: "100%",
            background:
              rowType === "bids"
                ? "linear-gradient(90deg, rgba(41, 181, 126, 0.18) -20%, rgba(41, 181, 126, 0) 113.33%)"
                : "linear-gradient(90deg, rgba(255, 101, 84, 0.18) -20%, rgba(255, 101, 84, 0) 113.33%)"
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
  items: PropTypes.any
};
export default OrderBookRow;
