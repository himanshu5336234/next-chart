import Head from "next/head";
import { Box, Grid } from "@mui/material";
import { TradingViewChart } from "@/components/TradingViewChart/TradingViewChart";
import { getOrderBook, getSymbolList } from "@/services/api-service/Apis";
import OrderBook from "@/components/OrderBook/OrderBook";

export default function Home({
  orderBook,
  symbols,
  symbol,
}: {
  orderBook: any;
  symbols: any;
  symbol: string;
}) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <script
          type="text/javascript"
          src="chart/charting_library.js"
          defer
        ></script>
      </Head>
      <Grid container>
        <Grid item xs={9}>
          <Box style={{ height: "70vh" }}>
            <TradingViewChart symbolList={symbols} symbol={symbol} ID={0} />
          </Box>
        </Grid>

        <Grid item xs={3}>
          <OrderBook orderBook={orderBook}/>
        </Grid>
      </Grid>
    </>
  );
}
export async function getServerSideProps({ query: { symbol } }: any) {
  try {
    const [orderBookResponse, symbolListResponse] = await Promise.all([
      getOrderBook(symbol),
      getSymbolList(),
    ]);

    // Assuming the response from getOrderBook has a property named `orderBook`
    const { data: orderBook } = orderBookResponse;
    const {
      data: { symbols },
    } = symbolListResponse;
    const asks = addTotalSums(findAndDelete(orderBook.asks, orderBook.asks, "ASKS"));
    const bids = addTotalSums(findAndDelete(orderBook.bids, orderBook.bids, "BIDS"));
    return { props: { orderBook: { ...orderBook,asks,bids }, symbols, symbol } };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { props: { data: null, error: "Failed to fetch data" } };
  }
}
function findAndDelete(currentLevels: any, orders:  any, type: string) {
  if (currentLevels) {
    const index =
      type === "BIDS"
        ? currentLevels.findIndex((item: any[]) => Number(item[0]) <= Number(orders[orders.length - 1][0]))
        : currentLevels.findIndex((item: any[]) => Number(item[0]) >= Number(orders[orders.length - 1][0]));
    return orders.concat(currentLevels.slice(index + 1));
  }
}
function addTotalSums(orders: any[]) {
  let sum = 0;
  return orders.map((item) => {
    sum += Number(item[1]);
    item[2] = sum;
    return item;
  });
}