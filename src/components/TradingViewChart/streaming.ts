import WebSocketClient from "@/helpers/WebSocketModule";
import { BASE_URL } from "@/services/api-service/Base/index";

const tvIntervals: any = {
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
  onRealtimeCallback: (arg0: {
    time: any;
    close: number;
    open: number;
    high: number;
    low: number;
    volume: number;
    closeTime: any;
    openTime: any;
  }) => void
) {
  const sData = JSON.parse(msg);
  try {
    if (sData.stream === paramStr && sData.data.k) {
      console.log(sData, "sDatasDatasData");
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
  const paramStr: string = `${id[0].toLowerCase()}@kline_${tvIntervals[id[2]]}`;
  return paramStr;
};

const chartWS = () => {
  let connectingLive = false;
  let webSocketService: any;

  const initializeWebSocket = (paramStr: string, onRealtimeCallback: any) => {
    const obj = {
      method: "SUBSCRIBE",
      params: [paramStr],
      id: 2,
    };
    if (!webSocketService) {
      const binanceWsBaseUrl = BASE_URL()?.binanceWsBase;
      webSocketService = WebSocketClient.getInstance(binanceWsBaseUrl);

      webSocketService.addListener("open", () => {
        connectingLive = true;
        webSocketService.sendMessage(JSON.stringify(obj));
      });
    } else {
      webSocketService.sendMessage(JSON.stringify(obj));
    }

    webSocketService.addListener("WebSocketMessage", (message: string) => {
      helperOnMessage(message, paramStr, onRealtimeCallback);
    });
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
        const paramStr = generateSubscriptionParamFromUID(subscribeUID);
        initializeWebSocket(paramStr, onRealtimeCallback);
      } catch (e) {
        console.error(e, "Error in subscribeOnStream");
      }
    },

    unsubscribeFromStream: function (subscriberUID: string) {
      try {
        const paramStr = generateSubscriptionParamFromUID(subscriberUID);
        const obj: any = {
          method: "UNSUBSCRIBE",
          params: [paramStr],
          id: 2,
        };
        if (!webSocketService) {
          const binanceWsBaseUrl = BASE_URL()?.binanceWsBase;
          webSocketService = WebSocketClient.getInstance(binanceWsBaseUrl);

          webSocketService.addListener("open", () => {
            connectingLive = true;
            webSocketService.sendMessage(JSON.stringify(obj));
          });
        } else {
          alert("")
          webSocketService.sendMessage(JSON.stringify(obj));
        }
      } catch (e) {
        console.error(e, "Error in unsubscribeFromStream");
      }
    },
  };
};

export default chartWS;
