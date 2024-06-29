'use client'
import { Box } from "@mui/material";
import React, { useEffect, useRef } from "react";
import CustomDivider from "../Atoms/Divider/CustomDivider";
import MarketSegment from "../MarketSegment/MarketSegment";

import dataFeed from "./dataFeed";
import { widgetContainer } from "./helpers";
export const TradingViewChart = ({ themeMode, symbol = "BTCUSDT" }: { themeMode: string, ID: number; symbol: string }) => {
  const chartContainerRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const resolution = JSON.parse((window as any).localStorage.getItem("user_pc_resolution_chart_density"))?.resolution ?? 60;

    const TradingViewWidget = new (window as any).TradingView.widget({
      locale: (window as any).navigator.language.split("-")[0] || "en-IN",
      auto_save_delay: 1,
      load_last_chart: true,
      autosize: true,
      allow_symbol_change: true,
      theme: themeMode,
      timezone: 'Asia/Kolkata',
      library_path: 'chart/',
      custom_css_url: 'css/style.css',
      custom_font_family: '"Text-Medium", sans-serif',
      disabled_features: [
        'context_menus',
        'use_localstorage_for_settings',
        'header_saveload',
        'header_symbol_search',
        'symbol_search_hot_key',
      ],
      enabled_features: [
        'hide_left_toolbar_by_default',
        'header_chart_type',
        'show_symbol_logos',
        'hide_right_toolbar',
      ],
      toolbar_bg: themeMode === 'dark' ? '#0E0E0F' : '#FFFFFF',
      loading_screen: {
        backgroundColor: themeMode === 'dark' ? '#0E0E0F' : '#FFFFFF',
        foregroundColor: themeMode === 'dark' ? '#0E0E0F' : '#FFFFFF',
      },
      overrides: {
        'paneProperties.backgroundType': 'solid',
        'paneProperties.background': themeMode === 'dark' ? '#0E0E0F' : '#FFFFFF',
        'paneProperties.textColor': themeMode === 'dark' ? '#FFFFFF' : '#0E0E0F',
        'paneProperties.vertGridProperties.color': themeMode === 'dark' ? '#19191D' : '#E0E0E0',
        'paneProperties.horzGridProperties.color': themeMode === 'dark' ? '#19191D' : '#E0E0E0',
        'paneProperties.crossHairProperties.color': themeMode === 'dark' ? '#FFFFFF' : '#0E0E0F',
        'scalesProperties.textColor': themeMode === 'dark' ? 'white' : 'black',
        'scalesProperties.backgroundColor': themeMode === 'dark' ? '#0E0E0F' : '#FFFFFF',
        'mainSeriesProperties.candleStyle.borderUpColor': '#29B57E',
        'mainSeriesProperties.candleStyle.borderDownColor': '#FF6554',
        'mainSeriesProperties.candleStyle.borderColor': '#29B57E',
        'mainSeriesProperties.candleStyle.upColor': '#29B57E',
        'mainSeriesProperties.candleStyle.downColor': '#FF6554',
        'mainSeriesProperties.candleStyle.wickColor': '#29B57E',
        'mainSeriesProperties.candleStyle.wickUpColor': '#29B57E',
        'mainSeriesProperties.candleStyle.wickDownColor': '#FF6554',
        'symbolWatermarkProperties.color': 'rgba(0, 0, 0, 0.00)',
        'symbolWatermarkProperties.visibility': false,
      },

      container: chartContainerRef.current,
      interval: resolution,
      datafeed: dataFeed,
      symbol: symbol?.toUpperCase(),
      client_id: "density.exchange"
    });

    TradingViewWidget.onChartReady(() => {
      TradingViewWidget.chart();
    });
  }, [symbol]);

  return (
    <>
       <MarketSegment symbol={symbol}/>
       <CustomDivider alignment={""}/>
      <Box bgcolor="background.secondary"  style={{ height: "calc( 100% - 45px)" }} ref={chartContainerRef}></Box>
    </>
  );
};
