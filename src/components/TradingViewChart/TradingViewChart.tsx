'use client'

import { getSymbolList } from "@/services/api-service/Apis";
import React, { useEffect, useRef } from "react";

import dataFeed from "./dataFeed";
import { widgetContainer } from "./helpers";
export const TradingViewChart = ({ symbolList,symbol="BTCUSDT" }: { ID: number; symbol: string,symbolList:any[] }) => {
  const chartContainerRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const resolution = JSON.parse((window as any).localStorage.getItem("user_pc_resolution_chart_density"))?.resolution ?? 60;
    localStorage.setItem("symbolList",JSON.stringify(symbolList))
    const TradingViewWidget = new (window as any).TradingView.widget({
      locale: (window as any).navigator.language.split("-")[0] || "en-IN",
      ...widgetContainer,
      container: chartContainerRef.current,
      interval: resolution,
      datafeed: dataFeed,
      symbol: symbol?.toUpperCase(),
      client_id: "density.exchange" 
    });

    TradingViewWidget.onChartReady(() => {
      // TradingViewWidget.subscribe("onAutoSaveNeeded", () => {
      //   TradingViewWidget.saveChartToServer(
      //     () => console.log("Saved"),
      //     () => console.log("failed to save"),
      //     {
      //       defaultChartName: "unnamed",
      //     }
      //   );
      // });
      TradingViewWidget.chart();
    });
  }, [symbol,symbolList]);

  return (
    <>
      <div style={{ height: "100%" }} ref={chartContainerRef}></div>
    </>
  );
};
