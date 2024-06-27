import WebSocketClient from "@/helpers/WebSocketModule";
import { BASE_URL } from "@/services/api-service/Base/index";

const tvIntervals:any = {
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

function helperOnMessage(
  msg: string,
  paramStr: any,
  onRealtimeCallback: (arg0: { time: any; close: number; open: number; high: number; low: number; volume: number; closeTime: any; openTime: any; }) => void
) {
  const sData = JSON.parse(msg);
  try {
    if (sData.stream === paramStr && sData.data.k) {
      const { o, h, l, v, c, T, t } = sData.data.k;

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
}

const generateSubscriptionParamFromUID = function (subscriberUID: string) {
  const id = subscriberUID.split("_#_");
  localStorage.setItem(
    "user_pc_resolution_chart_density",
    JSON.stringify({ resolution: id[2] })
  );
  const paramStr = `${id[0].toLowerCase()}@kline_${tvIntervals[id[2]]}`;
  return paramStr;
};

const chartWS = () => {
  const streams:any = {};
  let connectingLive = false;
  let webSocketService:any;

  const initializeWebSocket = () => {
    if (!webSocketService) {
      const binanceWsBaseUrl = BASE_URL()?.binanceWsBase;
      webSocketService = WebSocketClient.getInstance(binanceWsBaseUrl);
      webSocketService.addListener("open", () => {
        connectingLive = true;
        Object.values(streams).forEach(({ paramStr }:any) => {
          const obj = {
            method: "SUBSCRIBE",
            params: [paramStr],
            id: 2,
          };
          webSocketService.sendMessage(JSON.stringify(obj));
        });
      });
      webSocketService.addListener("WebSocketMessage", (message: string) => {
        Object.values(streams).forEach(({ paramStr, listener }:any) => {
          helperOnMessage(message, paramStr, listener);
        });
      });
    }
  };

  return {
    tvIntervals,

    subscribeOnStream: function (
      _symbolInfo: any,
      _resolution: any,
      onRealtimeCallback: any,
      subscribeUID: string,
      _onResetCacheNeededCallback: any,
      _lastDailyBar: any
    ) {
      try {
        initializeWebSocket();
        const paramStr = generateSubscriptionParamFromUID(subscribeUID);
        const obj = {
          method: "SUBSCRIBE",
          params: [paramStr],
          id: 2,
        };

        if (connectingLive) {
          webSocketService.sendMessage(JSON.stringify(obj));
        }

        streams[subscribeUID] = {
          paramStr,
          listener: onRealtimeCallback,
        };
      } catch (e) {
        console.error(e, "Error in subscribeOnStream");
      }
    },

    unsubscribeFromStream: function (subscriberUID: string) {
      try {
        const paramStr = generateSubscriptionParamFromUID(subscriberUID);
        const obj = {
          method: "UNSUBSCRIBE",
          params: [paramStr],
          id: 1,
        };

        if (connectingLive) {
          webSocketService.sendMessage(JSON.stringify(obj));
        }

        delete streams[subscriberUID];
      } catch (e) {
        console.error(e, "Error in unsubscribeFromStream");
      }
    },
  };
};

export default chartWS;
