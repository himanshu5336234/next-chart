import { Box } from "@mui/material";
import React, { memo, useRef } from "react";

import OrderBookRowWrapper from "./OrderBookRowWrapper";

const OrderBookTable = ({
  asksOrBids,
  orderBook,
  symbol
}: {
  asksOrBids: string;
  orderBook: any;
  symbol:string
}) => {
  const ref = useRef(null);
  const ref2 = ref?.current?.offsetHeight ?? 300;

  return (
    <Box
      sx={{
        height: "calc(100% - 70px)",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box height={"100%"} width={"100%"} overflow={"hidden"} ref={ref}>
        {(asksOrBids === "ALL" || asksOrBids === "ASKS") && (
          <OrderBookRowWrapper
          symbol={symbol}
          
            orders={orderBook}
            height={asksOrBids === "ALL" ? ref2 / 2 - 17.5 : ref2 - 35}
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
            height={asksOrBids === "ALL" ? ref2 / 2 - 17.5 : ref2 - 35}
            orderType={"bids"} symbol={symbol}          />
        )}
      </Box>
    </Box>
  );
};
export default memo(OrderBookTable);
