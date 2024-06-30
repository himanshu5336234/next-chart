import { Box } from "@mui/material";
import React, { memo, createRef, useEffect } from "react";
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
          height={asksOrBids === "ALL" ? height / 2 - 18 : height}
          orderType={"asks"}
        />
      )}
      <Box
        sx={{
          height: "35px",
          textAlign: "left",
        }}
      >
        <LastTradedPrice symbol={symbol} variant={"Regular_18"} />
      </Box>
      {(asksOrBids === "ALL" || asksOrBids === "BIDS") && (
        <OrderBookRowWrapper
          orders={orderBook}
          height={asksOrBids === "ALL" ? height / 2 - 18 : height}
          orderType={"bids"}
          symbol={symbol}
        />
      )}
    </Box>
  );
};

export default memo(OrderBookTable);
