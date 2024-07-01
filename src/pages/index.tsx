import Head from "next/head";
import { Box } from "@mui/material";
import { TradingViewChart } from "@/components/TradingViewChart/TradingViewChart";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Layouts } from "@/assets/Theme/layoutConfig";

import OrderBook from "@/components/OrderBook/OrderBook";
import SymbolsTableData from "@/components/SymbolsTableData/SymbolsTableData";
const ResponsiveGridLayout = WidthProvider(Responsive);
export default function Home({
  symbol,
  theme,
}: {
  theme: string;
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


      <ResponsiveGridLayout
        className="layout"
        layouts={Layouts}
        isDraggable={true}
        isResizable={true}
        autoSize
        rowHeight={10}
        draggableHandle=".grid-item__title"
        margin={[1, 2.1]}
        breakpoints={{ lg: 1440, md: 990, sm: 650, xs: 575 }}
        cols={{ lg: 14 * 10, md: 12 * 10, sm: 10 * 10, xs: 6 * 10 }}
      >
        <Box
          key={"chart"}
          bgcolor={"background.primary"}
          className={`grid-item`}
        >
          <Box position={"relative"} className="grid-item__graph">

            <TradingViewChart symbol={symbol} ID={0} themeMode={theme} />
          </Box>
        </Box>
        <Box
          key={"orderBook"}
          bgcolor={"background.primary"}
          className={`grid-item`}
        >

          <OrderBook symbol={symbol} />
        </Box>
        <Box
          key={"watchlist"}
          bgcolor={"background.primary"}
          className={`grid-item`}
        >

          <SymbolsTableData  />
        </Box>


      </ResponsiveGridLayout>
    </>

  );
}
export async function getServerSideProps({
  query: { theme = "light", symbol = "btcusdt" },
}: any) {
  try {
    return { props: { symbol, theme } };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { props: { data: null, error: "Failed to fetch data" } };
  }
}
