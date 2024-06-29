import Head from "next/head";
import { Box, Grid } from "@mui/material";
import { TradingViewChart } from "@/components/TradingViewChart/TradingViewChart";
import { getOrderBook, getSymbolList } from "@/services/api-service/Apis";
import OrderBook from "@/components/OrderBook/OrderBook";
import SymbolsTableData from "@/components/SymbolsTableData/SymbolsTableData";
import OrderBookServer from "@/components/OrderBook/OrderBookServer";

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
          src="/chart/charting_library.js"
          defer
        ></script>
      </Head>
      <Grid container gap={1}>
      <Grid item xs={2.5}>
          <SymbolsTableData/>

        </Grid>
        <Grid item xs={6.9}>
          <Box style={{ height: "70vh" }}>
            <TradingViewChart  symbol={symbol} ID={0} />
          </Box>
        </Grid>
        <Grid item xs={2.4}>

          <OrderBookServer symbol={symbol}/>
        </Grid>
      
      </Grid>
    </>
  );
}
export async function getServerSideProps({ query: { symbol } }: any) {
  try {

    return { props: {  symbol } };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { props: { data: null, error: "Failed to fetch data" } };
  }
}
