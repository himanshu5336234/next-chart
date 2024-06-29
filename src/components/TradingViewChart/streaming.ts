import WebSocketClient from "@/helpers/WebSocketModule";
import { BASE_URL } from "@/services/api-service/Base/index";
import { generateSubscriptionParamFromUID, helperOnMessage } from "./helpers";

const chartWS = () => {
  let connectingLive = false;
  let webSocketService: any;

  const initializeWebSocket = (paramStr: string, onRealtimeCallback: any,subscribeUID:any) => {
    const obj = {
      method: "SUBSCRIBE",
      params: [paramStr ,`${subscribeUID.split("_#_")[0].toLowerCase()}@depth20`],
      id: 2,
    };
    if (!connectingLive) {
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
    subscribeOnStream: function (
      _symbolInfo: any,
      _resolution: any,
      onRealtimeCallback: any,
      subscribeUID: string,
      _onResetCacheNeededCallback: any
    ) {
      try {
        const paramStr = generateSubscriptionParamFromUID(subscribeUID);
        initializeWebSocket(paramStr, onRealtimeCallback,subscribeUID);
      } catch (e) {
        console.error(e, "Error in subscribeOnStream");
      }
    },

    unsubscribeFromStream: function (subscriberUID: string) {
      try {
        const paramStr = generateSubscriptionParamFromUID(subscriberUID);
        const obj: any = {
          method: "UNSUBSCRIBE",
          params: [paramStr ,`${subscriberUID.split("_#_")[0].toLowerCase()}@depth20`],
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
      } catch (e) {
        console.error(e, "Error in unsubscribeFromStream");
      }
    },
  };
};

export default chartWS;
