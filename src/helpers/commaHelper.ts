import { setDecimalPrecision } from "./Symboldetails";
export const numberWithCommas = (x: string | number | undefined|any) => {
  if (x === undefined || isNaN(x)) return "--";
  const parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

export const numFormatter = (num: number, precision: number ) => {
  if (num > 999 && num < 1000000) {
    return  setDecimalPrecision(String(num / 1000),2) + "K";
  } else if (num > 1000000) {
    return setDecimalPrecision(String(num / 1000000),1) + "M";
  } else if (num < 900) {
    return setDecimalPrecision(String(num),1);
  }
};
