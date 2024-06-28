// Makes requests to CryptoCompare API

import { getKlines } from "@/services/api-service/Apis";


export const widgetContainer = {
  auto_save_delay: 1,
  load_last_chart: true,
  autosize: true,
  allow_symbol_change: true,
  theme: "dark",
  timezone: "Asia/Kolkata",
  library_path: "/chart/charting_library.js",
  custom_css_url: "css/style.css",
  custom_font_family: '"Text-Medium", sans-serif',
  disabled_features: [
    "context_menus",
    "use_localstorage_for_settings",
    "header_saveload",
    "header_symbol_search",
    "symbol_search_hot_key",
  ],
  enabled_features: [
    // "study_templates",
    "hide_left_toolbar_by_default",
    "header_chart_type",
    "show_symbol_logos",
    "hide_right_toolbar",
  ],
  toolbar_bg: "#101019",
  loading_screen: {
    backgroundColor: "#101019",
    foregroundColor: "#101019",
  },
  overrides: {
    "paneProperties.backgroundType": "solid",
    "paneProperties.background": "#101019",
    "paneProperties.textColor": "#ffffff",
    "paneProperties.vertGridProperties.color": "#222225",
    "paneProperties.horzGridProperties.color": "#222225",
    "paneProperties.crossHairProperties.color": "#A9A9A9",
    "mainSeriesProperties.candleStyle.borderUpColor": "#29B57E",
    "mainSeriesProperties.candleStyle.borderDownColor": "#F46151",
    "mainSeriesProperties.candleStyle.borderColor": "#29B57E",
    "mainSeriesProperties.candleStyle.upColor": "#29B57E",
    "mainSeriesProperties.candleStyle.downColor": "#F46151",
    "mainSeriesProperties.candleStyle.wickColor": "#29B57E",
    "mainSeriesProperties.candleStyle.wickUpColor": "#29B57E",
    "mainSeriesProperties.candleStyle.wickDownColor": "#F46151",
    "scalesProperties.textColor": "white",
    "scalesProperties.backgroundColor": "#171717",
    "symbolWatermarkProperties.color": "rgba(0, 0, 0, 0.00)",
    "symbolWatermarkProperties.visibility": false,
  },
};
export const configurationData = {
  supports_marks: false,
  supports_timescale_marks: false,
  supports_time: true,
  supported_resolutions: [
    "1",
    "3",
    "5",
    "15",
    "30",
    "60",
    "120",
    "240",
    "360",
    "480",
    "720",
    "1D",
    "3D",
    "1W",
    "1M",
  ],
};
export const tvIntervals: any = {
  "1s": "1s",
  1: "1m",
  3: "3m",
  5: "5m",
  15: "15m",
  30: "30m",
  60: "1h",
  120: "2h",
  240: "4h",
  360: "6h",
  480: "8h",
  720: "12h",
  D: "1d",
  "1D": "1d",
  "3D": "3d",
  W: "1w",
  "1W": "1w",
  M: "1M",
  "1M": "1M",
};
export const pricescale = (symbol: string) => {
  const allSymbols = JSON.parse(
    (window as any).localStorage.getItem("symbolList")
  );
  const symbolPrecisionData = allSymbols.find(
    (data: { symbol: string }) =>
      data.symbol.toLowerCase() === symbol.toLowerCase()
  );
  symbolPrecisionData.pricePrecision;
  return Math.pow(10, symbolPrecisionData);
};


export const createGetChartCandle = () => {
  let lastStartTime: any = null;

  return async (
    from: number,
    to: number,
    symbolInfo: { name: string },
    interval: string
  ) => {
    let totalKlines: any[] = [];
    const kLinesLimit = 1500;

    if (lastStartTime && from === lastStartTime) {
      return [];
    }
    lastStartTime = from;

    try {
      let {data} = await getKlines(symbolInfo.name, interval, from, to, kLinesLimit);
      totalKlines = [...totalKlines, ...data];
      while (data.length === kLinesLimit) {
    
        from = data[data.length - 1][0] + 1; // Update `from` to avoid fetching the same data
        data = await getKlines(symbolInfo.name, interval, from, to, kLinesLimit);
        totalKlines = [...totalKlines, ...data];
      }

      const historyCBArray = totalKlines.map((kline) => ({
        time: kline[0],
        open: Number(kline[1]),
        high: Number(kline[2]),
        low: Number(kline[3]),
        close: Number(kline[4]),
        volume: Number(kline[5]),
      }));

      return historyCBArray;
    } catch (err) {
      console.error("Error in getting klines", err);
      throw new Error("Error in getting klines");
    }
  };
};


export const generateSubscriptionParamFromUID = (subscriberUID: string) => {
  const id = subscriberUID.split("_#_");
  localStorage.setItem(
    "user_pc_resolution_chart_density",
    JSON.stringify({ resolution: id[2] })
  );
  return `${id[0].toLowerCase()}@kline_${tvIntervals[id[2]]}`;
};

export const helperOnMessage = (
  msg: string,
  paramStr: any,
  onRealtimeCallback: Function
) => {
  const { stream, data } = JSON.parse(msg);
  try {
    if (stream === paramStr && data.k) {
      const { o, h, l, v, c, T, t } = data.k;
      const lastSocketData = {
        time: t,
        close: Number(c),
        open: Number(o),
        high: Number(h),
        low: Number(l),
        volume: Number(v),
        closeTime: T,
        openTime: t,
      };
      onRealtimeCallback(lastSocketData);
    }
  } catch (e) {
    console.error(e);
  }
};
