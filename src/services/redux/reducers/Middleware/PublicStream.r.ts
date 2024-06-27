
const initialState = {
  orderBook:{
    symbol: "",
    asks: [],
    bids: [],
  },
  binanceData: {},
  binanceMarketData: {},
  binance: {
    connecting: false,
    opened: false,
  },
  density: {
    connecting: false,
    opened: false,
  },
};

export default function (state = initialState, action: { type: string; payload: any }) {
  const { type, payload } = action;
  switch (type) {
    case "SET_DEPTH_UPDATE":
      return { ...state, depth: payload };
    case "SET_BINANCE_DATA":
      const binanceDataCopy: any = state.binanceData;
      binanceDataCopy[payload.symbol] = payload.data;
      return {
        ...state,
        binanceData: binanceDataCopy,
      };

    case "SET_BINANCE_MARKET_DATA":
      return {
        ...state,
        binanceMarketData: { ...state.binanceMarketData, ...payload },
      };
    case "BINANCE_WS_OPENED":
      return {
        ...state,
        binance: payload,
      };
    case "BINANCE_WS_CLOSED":
      return {
        ...state,
        binance: payload,
      };
    case "DENSITY_WS_OPENED":
      return {
        ...state,
        density: payload,
      };
    case "DENSITY_WS_CLOSED":
      return {
        ...state,
        density: payload,
      };
    case "SET_ASKS":
      return { ...state, orderBook:{...state.orderBook,asks:payload.a } };
    case "SET_BIDS":
      return { ...state, orderBook:{...state.orderBook,bids: payload.b } };


    default:
      return state;
  }
}
