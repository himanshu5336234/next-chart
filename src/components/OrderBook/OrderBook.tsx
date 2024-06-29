import React, { createRef, useCallback, useEffect, useState } from "react";
import { Box } from "@mui/material";
import AskOrbids from "./AskOrBids";
import TableHeadWrapperForAsksBids from "./TableHeadWrapperForAsksBids";
import OrderBookTable from "./OrderBookTable";
import TextView from "../Atoms/TextView/TextView";

const OrderBook = ({
  orderBook,
  symbol,
}: {
  orderBook: any;
  symbol: string;
}) => {
  const [asksOrBids, setAsksOrBids] = useState("ALL");
  const [height, setHeight] = useState<any>(300);
  const ref = createRef<any>();
  const handleTabsChange = useCallback(
    (newValue: string) => {
      setAsksOrBids(newValue);
    },
    [asksOrBids]
  );
  useEffect(() => {
    setHeight(ref?.current.offsetHeight);
  }, []);
  return (
    <Box height={"100%"} bgcolor="background.secondary" width={"100%"} p={2}>
      <TextView component={"p"} text={"Order Book"} />
      <AskOrbids asksOrBids={asksOrBids} handleTabsChange={handleTabsChange} />
      <TableHeadWrapperForAsksBids />
      <Box height={"calc(100% - 70px)"}>
        <Box
          height={"100%"}
          sx={{

            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          ref={ref}
        >
          {
            <OrderBookTable
              height={height}
              symbol={symbol}
              orderBook={orderBook}
              asksOrBids={asksOrBids}
            />
          }
        </Box>
      </Box>
    </Box>
  );
};
export default OrderBook;
