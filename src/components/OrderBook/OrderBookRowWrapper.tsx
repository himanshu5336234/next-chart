import { convertToPrecisionValueInContractAssetUnit } from "@/helpers/PrecisionHelper";
import NewWebSocketClient from "@/helpers/WebSocketModule";
import { addTotalSums, findAndDelete } from "@/pages/api/orderbook";
import { BASE_URL } from "@/services/api-service/Base";
import { useAppDispatch } from "@/services/redux/hooks";
import { setMarketStreamDataList } from "@/services/redux/store/Slices/tradableSymbolListSlice";
import { Box } from "@mui/material";
import React, { memo, useCallback, useEffect, useState } from "react";
import OrderBookRow from "./OrderBookRow";
const binanceWsBaseUrl = BASE_URL()?.binanceWsBase;
const OrderBookRowWrapper = ({
  orders,
  height = 200,
  orderType,
  symbol,
}: {
  orders: any;
  height: number;
  orderType: string;
  symbol: string;
}) => {
  const dispatch = useAppDispatch();
  const [originalOrders, setOriginalOrder] = useState([]);
  useEffect(() => {
    if (orders?.asks?.length > 0) {
      const bidsAndAsksOrders: any =
        orderType === "bids"
          ? [...orders[orderType]]
          : [...orders[orderType]].reverse();
      setOriginalOrder(bidsAndAsksOrders);
    }
  }, [orders]);
  useEffect(() => {
    const webSocketService = NewWebSocketClient.getInstance(binanceWsBaseUrl);
    if (symbol) {
      webSocketService.addListener("WebSocketMessage", handlemessageEvent);
    } else {
      webSocketService.removeListener("WebSocketMessage", handlemessageEvent);
    }
  }, [symbol]);

  const handlemessageEvent = (message: string) => {
    const { data } = JSON.parse(message);
    const bData: any = {};
    if (
      data &&
      data.e === "depthUpdate" &&
      data?.s.toLowerCase() === symbol.toLowerCase()
    ) {
      const bidsAndAsksUpdatedOrder: any = orderType === "bids" ? [...data["b"]] : [...data["a"]];
      const asks = addTotalSums(
        findAndDelete(
          originalOrders,
          bidsAndAsksUpdatedOrder,
          orderType.toUpperCase()
        )
      );
      const bidsAndAsksOrders: any = orderType === "bids" ? asks : asks.reverse();
      bData[`${data.s.toLowerCase()}@${orderType}`] = bidsAndAsksOrders[0][0];

      setOriginalOrder(bidsAndAsksOrders);
      if (Object.keys(bData).length > 0) {
        dispatch(setMarketStreamDataList(bData));
      }
    }
  };

  const showOrdersRows = useCallback(
    (payload: any, orderType: string, height: number) => {
      if (payload.length > 0) {
        const orders =
          orderType === "bids"
            ? payload.slice(
                0,
                Number(
                  convertToPrecisionValueInContractAssetUnit(
                    String(height / 25),
                    2
                  )
                )
              )
            : payload.slice(
                payload.length -
                  Number(
                    convertToPrecisionValueInContractAssetUnit(
                      String(height / 25),
                      2
                    )
                  )
              );
        const maxOrder =
          orders.length > 0 && orderType === "bids"
            ? orders[orders.length - 1][2]
            : orders[0][2];
        return orders.map((items: any, index: number) => {
          return (
            <Box key={index}>
              <OrderBookRow
                symbol={symbol}
                items={items}
                Max={maxOrder}
                rowType={orderType}
              />
            </Box>
          );
        });
      }
    },
    [originalOrders, orderType, height]
  );

  return (
    <Box
      display={"flex"}
      flexDirection="column"
      overflow={"hidden"}
      height={height}
    >
      {showOrdersRows(originalOrders, orderType, height)}
    </Box>
  );
};

export default memo(OrderBookRowWrapper);
