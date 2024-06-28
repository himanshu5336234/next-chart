import React, { useCallback, useState } from "react";
import { Box } from "@mui/material";
import AskOrbids from "./AskOrBids";
import TableHeadWrapperForAsksBids from "./TableHeadWrapperForAsksBids";
import OrderBookTable from "./OrderBookTable";
import TextView from "../Atoms/TextView/TextView";


const OrderBook = ({orderBook}) => {
  const [asksOrBids, setAsksOrBids] = useState("ALL");

  const handleTabsChange = useCallback(
    (newValue: string) => {
      setAsksOrBids(newValue);
    },
    [asksOrBids]
  );
  return (
    <Box height={"100%"} bgcolor="background.default" width={"100%"} p={2}>
      <TextView component={"p"} text={"Order Book"}  />
      <AskOrbids asksOrBids={asksOrBids} handleTabsChange={handleTabsChange} />
      <TableHeadWrapperForAsksBids />
     <OrderBookTable orderBook={orderBook} asksOrBids={asksOrBids} />
    </Box>
  );
};
export default OrderBook;
