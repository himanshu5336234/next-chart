"useclient"
import React, { useEffect, useRef } from "react";

import dataFeed from "./dataFeed";
import { widgetContainer } from "./helpers";
export const TradingViewChart = ({ ID, res }: { ID: number; res: string }) => {
  const chartContainerRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    const resolution =  60
    const TradingViewWidget = new (window as any).TradingView.widget({
      ...widgetContainer,
      container: chartContainerRef.current,
      interval: res ?? resolution,
      datafeed: dataFeed,
      symbol:  "BTCUSDT",
      client_id: "density.exchange" + { ID }
    });

      TradingViewWidget.onChartReady(() => {
        TradingViewWidget.subscribe("onAutoSaveNeeded", () => {
          TradingViewWidget.saveChartToServer(
            () => console.log("Saved"),
            () => console.log("failed to save"),
            {
              defaultChartName: "unnamed"
            }
          );
        });
        TradingViewWidget.chart();
      });
    
  }, [ ID, res]);

  return (
    <>
      <div style={{ height: "100%" }} ref={chartContainerRef} ></div>
    </>
  );
};
