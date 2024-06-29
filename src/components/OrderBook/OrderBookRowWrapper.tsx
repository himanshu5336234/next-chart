import NewWebSocketClient from "@/helpers/WebSocketModule";
import { BASE_URL } from "@/services/api-service/Base";
import { Box } from "@mui/material";
import React, { memo, useCallback, useEffect, useState } from "react";
import OrderBookRow from "./OrderBookRow";
const binanceWsBaseUrl = BASE_URL()?.binanceWsBase;
const OrderBookRowWrapper = ({
  orders,
  height,
  orderType,
  symbol,
}: {
  orders: any;
  height: number;
  orderType: string;
  symbol: string;
}) => {

  const [originalOrders,setOriginalOrder]=useState([])
  useEffect(()=>{
    const bidsAndAsksOrders:any = orderType === "bids"? [...orders[orderType]] : [...orders[orderType]].reverse();
    setOriginalOrder(bidsAndAsksOrders)
  },[orders])
  useEffect(() => {
    const webSocketService = NewWebSocketClient.getInstance(binanceWsBaseUrl);
    if (symbol) {
      webSocketService.addListener("WebSocketMessage", handlemessageEvent);
    } else {
      webSocketService.removeListener("WebSocketMessage", handlemessageEvent);
    }

  }, [symbol]);

  const handlemessageEvent = (message: string) => {
   const {stream,data} =JSON.parse(message)
   console.log(data.s);
   if(data.e ==="depthUpdate"){

   }
  };
 
  const showOrdersRows = useCallback(
    (payload: any, orderType: string) => {
      if (payload.length > 0) {
        const orders =
          orderType === "bids"
            ? payload.slice(0, height / 25)
            : payload.slice(payload.length - height / 25);
        const maxOrder =
          orderType === "bids" ? orders[orders.length - 1][2] : orders[0][2];
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
      {showOrdersRows(originalOrders, orderType)}
    </Box>
  );
};

export default memo(OrderBookRowWrapper);
