import React, {
  
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Box } from "@mui/material";
import AskOrbids from "./AskOrBids";
import TableHeadWrapperForAsksBids from "./TableHeadWrapperForAsksBids";
import OrderBookTable from "./OrderBookTable";
import TextView from "../Atoms/TextView/TextView";
import axios from "axios";

const OrderBook = ({ symbol="btcusdt" }: { symbol: string }) => {
  console.log(symbol);
  const [asksOrBids, setAsksOrBids] = useState("ALL");
  const [height, setHeight] = useState<any>(300);
  const ref = useRef<any>();
  const [orderBook, setOrderBook] = useState([]);
  const fetchOrderBook = async () => {
    try {
      const response = await axios.get(`/api/orderbook?symbol=${symbol.toLowerCase()}`);
      setOrderBook(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchOrderBook();
  }, [symbol]);
  const handleTabsChange = useCallback(
    (newValue: string) => {
      setAsksOrBids(newValue);
    },
    [asksOrBids]
  );
  useEffect(() => {
    setHeight(ref?.current.offsetHeight);
  }, [ref?.current]);
  return (
    <Box height={"100%"} bgcolor="background.secondary" width={"100%"} p={2}>
      <TextView component={"p"} fontWeight={"Medium"} text={"Order Book"} />
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
