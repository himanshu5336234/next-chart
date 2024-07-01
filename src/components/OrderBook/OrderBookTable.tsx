import { convertToPrecisionValueInContractAssetUnit } from "@/helpers/PrecisionHelper";
import { Box } from "@mui/material";
import React, { memo } from "react";
import LastTradedPrice from "../MarketSegment/LastTradedPrice";
import OrderBookRowWrapper from "./OrderBookRowWrapper";
const OrderBookTable = ({
  asksOrBids,
  orderBook,
  symbol,
  height,
}: {
  asksOrBids: string;
  orderBook: any;
  symbol: string;
  height: number;
}) => {
  return (
    <Box height={"100%"} width={"100%"} overflow={"hidden"}>
      {(asksOrBids === "ALL" || asksOrBids === "ASKS") && (
        <OrderBookRowWrapper
          symbol={symbol}
          orders={orderBook}
          height={
            asksOrBids === "ALL"
              ? convertToPrecisionValueInContractAssetUnit(
                  String(height / 2 - 17),
                  1
                )
              : height
          }
          orderType={"asks"}
        />
      )}
      <Box
        sx={{
          py:0.5,
          height: "35px",
          textAlign: "left",
        }}
      >
        <LastTradedPrice symbol={symbol} variant={"Regular_18"} />
      </Box>
      {(asksOrBids === "ALL" || asksOrBids === "BIDS") && (
        <OrderBookRowWrapper
          orders={orderBook}
          height={
            asksOrBids === "ALL"
              ? convertToPrecisionValueInContractAssetUnit(
                  String(height / 2 - 17),
                  1
                )
              : height
          }
          orderType={"bids"}
          symbol={symbol}
        />
      )}
    </Box>
  );
};

export default memo(OrderBookTable);
