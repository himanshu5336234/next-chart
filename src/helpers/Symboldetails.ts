import { numberWithCommas } from "./commaHelper";
import { convertToPrecisionValueInContractAssetUnit } from "./PrecisionHelper";

export const getSymbolDetails = (symbol: string) => {
  const allSymbols = JSON.parse((window as any).localStorage.getItem("symbolList") ||"[]");
  return allSymbols&& allSymbols.find(
    (data: { symbol: string }) =>
      data.symbol.toLowerCase() === symbol.toLowerCase()
  );
};

export const setDecimalPrecision = (value: string, precision: number) => {
  const res = convertToPrecisionValueInContractAssetUnit(value, precision);
  return value !== ("undefined" && "-")
    ? numberWithCommas(Number(res))
    : "--";
};
