import Head from "next/head";
import { Box, Grid } from "@mui/material";
import { TradingViewChart } from "@/components/TradingViewChart/TradingViewChart";
import SymbolsTableData from "@/components/SymbolsTableData/SymbolsTableData";
import OrderBookServer from "@/components/OrderBook/OrderBookServer";
import MarketSegment from "@/components/MarketSegment/MarketSegment";

export default function Home({ symbol,theme}: {theme:string; symbol: string }) {
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
          <SymbolsTableData />
        </Grid>
        <Grid item xs={6.9}>
          <Box style={{ height: "70vh" }}>
            <MarketSegment/>
            <TradingViewChart symbol={symbol} ID={0} themeMode={theme} />
          </Box>
        </Grid>
        <Grid  item xs={2.4}>
          <OrderBookServer symbol={symbol} />
        </Grid>
      </Grid>
    </>
  );
}
export async function getServerSideProps({ query: {theme="light",  symbol="btcusdt" } }: any) {
  try {
    return { props: { symbol,theme } };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { props: { data: null, error: "Failed to fetch data" } };
  }
}
