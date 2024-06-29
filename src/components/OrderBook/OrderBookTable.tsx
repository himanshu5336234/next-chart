import { Box } from "@mui/material";
import React, { memo, createRef, useEffect } from "react";

import OrderBookRowWrapper from "./OrderBookRowWrapper";

const OrderBookTable = ({
  asksOrBids,
  orderBook,
  symbol,
  height
}: {
  asksOrBids: string;
  orderBook: any;
  symbol: string;
  height:number
}) => {

console.log(height);
  return (

      <Box height={"100%"} width={"100%"} overflow={"hidden"}>
        {(asksOrBids === "ALL" || asksOrBids === "ASKS") && (
          <OrderBookRowWrapper
            symbol={symbol}
            orders={orderBook}
            height={asksOrBids === "ALL" ? height / 2 - 17.5 : height}
            orderType={"asks"}
          />
        )}
        <Box
          sx={{
            height: "35px",
            textAlign: "left",
          }}
        >
        </Box>
        {(asksOrBids === "ALL" || asksOrBids === "BIDS") && (
          <OrderBookRowWrapper
            orders={orderBook}
            height={asksOrBids === "ALL" ? height / 2 - 17.5 : height }
            orderType={"bids"}
            symbol={symbol}
          />
        )}
      </Box>

  );
};

export default memo(OrderBookTable);
