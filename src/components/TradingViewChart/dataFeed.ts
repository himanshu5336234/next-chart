import { getSymbolList } from "@/services/api-service/Apis";
let time = 0;
import {
  configurationData,
  createGetChartCandle,
  pricescale,
  tvIntervals,
} from "./helpers";
import chartWS from "./streaming";
const { subscribeOnStream, unsubscribeFromStream } = chartWS();
const getChartCandle = createGetChartCandle();

const dataFeed = {
  onReady: (
    callback: (arg0: {
      supports_marks: boolean;
      supports_timescale_marks: boolean;
      supports_time: boolean;
      supported_resolutions: string[];
    }) => void
  ) => {
    const allSymbols = JSON.parse(
      (window as any).localStorage.getItem("symbolList")
    );
    if (allSymbols && allSymbols.length > 0) {
      setTimeout(() => {
        callback(configurationData);
      }, 0);
    } else {
      time = 500;
      getSymbolList().then(({ data }: any) => {
        localStorage.setItem("symbolList", JSON.stringify(data.symbols));
      });
      setTimeout(() => {
        callback(configurationData);
      }, time);
    }
  },

  resolveSymbol: async (
    symbolName: string,
    onSymbolResolvedCallback: (arg0: {
      name: any;
      description: string;
      ticker: any;
      exchange: string;
      listed_exchange: string;
      type: string;
      timezone: string;
      session: string;
      minmov: number;
      pricescale: number;
      has_intraday: boolean;
      has_daily: boolean;
      has_weekly_and_monthly: boolean;
      currency_code: string;
    }) => void,
    onResolveErrorCallback: (arg0: string) => void,
    _extension: any
  ) => {
    const comp = symbolName.split(":");
    symbolName = (comp.length > 1 ? comp[1] : symbolName).toUpperCase();
    if (symbolName) {
      setTimeout(() => {
        onSymbolResolvedCallback({
          name: symbolName,
          description: symbolName.replace("USDT", "") + " / " + "USDT",
          ticker: symbolName,
          exchange: "X-change",
          listed_exchange: "X-change",
          type: "crypto",
          timezone: "UTC",
          session: "24x7",
          minmov: 1,
          pricescale: pricescale(symbolName),
          has_intraday: true,
          has_daily: true,
          has_weekly_and_monthly: true,
          currency_code: "USDT",
        });
      }, time);
      return;
    }
    onResolveErrorCallback("not Found");
  },

  getBars: (
    symbolInfo: any,
    resolution: string | number,
    periodParams: { from: any; to: any },
    onHistoryCallback: (
      arg0: {
        time: any;
        open: number;
        high: number;
        low: number;
        close: number;
        volume: number;
      }[],
      arg1: { noData: boolean }
    ) => void,
    onErrorCallback: (arg0: string) => void
  ) => {
    let { from, to } = periodParams;
    const interval = tvIntervals[resolution];
    if (!interval) onErrorCallback("Invalid Interval");
    from *= 1000;
    to *= 1000;
    getChartCandle(from, to, symbolInfo, interval)
      .then((res) => {
        if (res.length === 0) {
          onHistoryCallback([], { noData: true });
        } else {
          // Sort data by timestamp
          const sortedData = res.sort((a, b) => a.time - b.time);
          // console.log(sortedData);
          onHistoryCallback(sortedData, { noData: false });
        }
      })
      .catch(() => onErrorCallback(`Error in 'getKlines' func`));
  },

  subscribeBars: (
    symbolInfo: { full_name: any },
    resolution: any,
    onRealtimeCallback: (arg0: {
      time: any;
      close: number;
      open: number;
      high: number;
      low: number;
      volume: number;
      closeTime: any;
      openTime: any;
    }) => void,
    subscriberUID: string,
    onResetCacheNeededCallback: any
  ) => {
    subscribeOnStream(
      symbolInfo,
      resolution,
      onRealtimeCallback,
      subscriberUID,
      onResetCacheNeededCallback
    );
  },

  unsubscribeBars: (subscriberUID: string) => {
    console.log(subscriberUID, "subscriberUID");
    unsubscribeFromStream(subscriberUID);
  },
};

export default dataFeed;
