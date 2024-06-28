import { Format } from "@/helpers/CurrencyLogo";
import { GET_KLINES,GET_ORDER_BOOK, GET_SYMBOLS } from "../Urls";
import axiosWithApiServer from "../Utils/axiosHelpers/axiosWithApiServer";

export const getSymbolList = () => {
  const url = Format(GET_SYMBOLS.url);
  return axiosWithApiServer({
    url,
    method: GET_SYMBOLS.reqType,
  });
};
export const getKlines = (
  symbol: string,
  interval: string,
  startTime: any,
  endTime: any,
  limit: any
) => {
  const url = Format(GET_KLINES.url,symbol,interval,startTime,endTime,limit);
  return axiosWithApiServer({
    url,
    method: GET_KLINES.reqType,
  });
};

export const getOrderBook = (payload:string) => {
  const url = Format(GET_ORDER_BOOK.url, payload, "1000");
  return axiosWithApiServer({
    url,
    method: GET_ORDER_BOOK.reqType
  });
};