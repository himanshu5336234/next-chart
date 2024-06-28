import { Box } from "@mui/material";
import React, { memo, useCallback } from "react";
import OrderBookRow from "./OrderBookRow";

const OrderBookRowWrapper = ({
  orders,
  height,
  orderType,
}: {
  orders: any;
  height: number;
  orderType: string;
}) => {
  const bidsAndAsksOrders =
    orderType === "bids"
      ? [...orders[orderType]]
      : [...orders[orderType]].reverse();
  const showOrdersRows = useCallback(
    (payload: any, orderType: string) => {
      if (payload.length > 0) {
        const orders =
          orderType === "bids"
            ? payload.slice(0, height / 25)
            : payload.slice(payload.length - height / 25);
        const maxOrder = orderType === "bids" ? orders[orders.length - 1][2] : orders[0][2];
        return orders.map((items: any, index: number) => {
          return (
            <Box key={index}>
              <OrderBookRow items={items} Max={maxOrder} rowType={orderType} />
            </Box>
          );
        });
      }
    },
    [height]
  );

  return (
    <Box
      display={"flex"}
      flexDirection="column"
      overflow={"hidden"}
      height={height}
    >
      {showOrdersRows(bidsAndAsksOrders, orderType)}
    </Box>
  );
};

export default memo(OrderBookRowWrapper);
