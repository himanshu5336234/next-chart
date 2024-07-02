"use client";
import TopWindowsTabs from "@/components/TopWindowTabs/TopWindowsTabs";
import React, { useCallback, useState } from "react";
import { Layouts } from "@/assets/Theme/layoutConfig";
import { Responsive, WidthProvider } from "react-grid-layout";
import Head from "next/head";
import { Box } from "@mui/system";
import { TradingViewChart } from "@/components/TradingViewChart/TradingViewChart";
import OrderBook from "@/components/OrderBook/OrderBook";
import SymbolsTableData from "@/components/SymbolsTableData/SymbolsTableData";
import CancelIcon from "@mui/icons-material/Cancel";

const ResponsiveGridLayout = WidthProvider(Responsive);

function Workspace() {
  const [currentWorkSpace, setCurrentWorkSpace] = useState<any>({
    theme: "light",
    name: "btcusdt",
    component: ["orderBook", "chart", "watchlist"],
    layout: Layouts,
  });

  const showComponent = useCallback(
    (currentWorkSpace: { name: string; theme: any }, item: any) => {
      switch (item) {
        case "watchlist":
          return <SymbolsTableData />;
        case "chart":
          return (
            <TradingViewChart
              symbol={currentWorkSpace?.name}
              ID={0}
              themeMode={currentWorkSpace?.theme || "light"}
            />
          );
        case "orderBook":
          return <OrderBook symbol={currentWorkSpace?.name || "btcusdt"} />;
        default:
          break;
      }
    },
    [currentWorkSpace]
  );
  const handleLayoutChange = (newLayout: any) => {
    setCurrentWorkSpace((prev: any) => ({
      ...prev,
      layout: newLayout,
    }));
  };
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

      <TopWindowsTabs setCurrentWorkSpace={setCurrentWorkSpace} />
      <ResponsiveGridLayout
        className="layout"
        autoSize
        isDraggable={true}
        isResizable={true}
        layouts={currentWorkSpace?.layout}
        onLayoutChange={(_layout, newLayout) => handleLayoutChange(newLayout)}
        rowHeight={10}
        draggableHandle=".grid-item__title"
        margin={[1, 2.1]}
        breakpoints={{ lg: 1440, md: 990, sm: 650, xs: 575 }}
        cols={{ lg: 14 * 10, md: 12 * 10, sm: 10 * 10, xs: 6 * 10 }}
      >
        {currentWorkSpace?.component.map((item: any) => (
          <Box
            key={item}
            bgcolor={"background.primary"}
            className={`grid-item`}
          >
            <Box
              sx={{
                position: "absolute",
                display: "flex",
                zIndex: 1000,
                height: "12px",
                right: 0,
                left: 9,
              }}
            >
              <Box
                sx={{ width: "98%", height: 20 }}
                className="grid-item__title "
              />
              <CancelIcon
                sx={{
                  color: "grey.500",
                  position: "absolute",
                  right: 0,
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              />
            </Box>

            <Box position={"relative"} className="grid-item__graph">
              {showComponent(currentWorkSpace, item)}
            </Box>
          </Box>
        ))}
      </ResponsiveGridLayout>
    </>
  );
}

export default Workspace;
