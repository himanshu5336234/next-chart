import { REQUEST_TYPE } from "../Base";

export const GET_SYMBOLS = {
  url: "/fapi/v1/exchangeInfo",
  reqType: REQUEST_TYPE.GET,
};

export const GET_KLINES = {
  url: "/fapi/v1/continuousKlines?&contractType=PERPETUAL&pair={0}&interval={1}&startTime={2}&endTime={3}&limit={4}",
  reqType: REQUEST_TYPE.GET,
};
export const AUTH_LOGIN = {
  url: "/v1/user/login",
  reqType: REQUEST_TYPE.POST,
};
export const GET_ORDER_BOOK = {
  url: "/fapi/v1/depth?symbol={0}&limit={1}",
  reqType: REQUEST_TYPE.GET
};