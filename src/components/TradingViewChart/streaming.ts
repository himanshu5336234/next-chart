import WebSocketClient from "@/helpers/WebSocketModule";
import { BASE_URL } from "@/services/api-service/Base/index";

const tvIntervals = {
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
  msg,
  paramStr,
  onRealtimeCallback
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

const generateSubscriptionParamFromUID = function (subscriberUID) {
  const id = subscriberUID.split("_#_");
  localStorage.setItem(
    "user_pc_resolution_chart_density",
    JSON.stringify({ resolution: id[2] })
  );
  const paramStr = `${id[0].toLowerCase()}@kline_${tvIntervals[id[2]]}`;
  return paramStr;
};

const chartWS = () => {
  const streams = {};
  let connectingLive = false;
  let webSocketService:any;

  const initializeWebSocket = () => {
    if (!webSocketService) {
      const binanceWsBaseUrl = BASE_URL()?.binanceWsBase;
      webSocketService = WebSocketClient.getInstance(binanceWsBaseUrl);
      webSocketService.addListener("open", () => {
        connectingLive = true;
        Object.values(streams).forEach(({ paramStr }) => {
          const obj = {
            method: "SUBSCRIBE",
            params: [paramStr],
            id: 2,
          };
          webSocketService.sendMessage(JSON.stringify(obj));
        });
      });
      webSocketService.addListener("WebSocketMessage", (message) => {
        Object.values(streams).forEach(({ paramStr, listener }) => {
          helperOnMessage(message, paramStr, listener);
        });
      });
    }
  };

  return {
    tvIntervals,

    subscribeOnStream: function (
      _symbolInfo,
      _resolution,
      onRealtimeCallback,
      subscribeUID,
      _onResetCacheNeededCallback,
      _lastDailyBar
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

    unsubscribeFromStream: function (subscriberUID) {
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
