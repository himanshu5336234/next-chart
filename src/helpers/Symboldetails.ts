export const getSymbolDetails = (symbol: string) => {
  const allSymbols = JSON.parse(
    (window as any).localStorage.getItem("symbolList")
  );
  return allSymbols.find(
    (data: { symbol: string }) =>
      data.symbol.toLowerCase() === symbol.toLowerCase()
  );
};

export const numFormatter = (num: number) => {
  if (num > 999 && num < 1000000) {
    return (num / 1000) + "K";
  } else if (num > 1000000) {
    return (num / 1000000) + "M";
  } else if (num < 900) {
    return num;
  }
};
const convertToPrecisionValueInContractAssetUnit = (
  value: string,
  Precision: number
) => {
  let numStr = value?.toString();
  if (numStr.startsWith(".")) {
    numStr = `0${numStr}`; // Add a leading zero
  }

  numStr = numStr?.replace(/-/g, "");
  // Find the index of the decimal point
  const decimalIndex = numStr?.indexOf(".");

  // If there is a decimal point, remove the portion before it
  if (decimalIndex !== -1) {
    return (numStr = numStr.substr(0, Precision + decimalIndex + 1));
  } else {
    return numStr;
  }
};
export const numberWithCommas = (x: string | number | undefined) => {
  if (x === undefined || isNaN(x)) return "--";
  const parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};
export const setDecimalPrecision = (value: string, precision: number) => {
  const res = convertToPrecisionValueInContractAssetUnit(value, precision);
  return value !== ("undefined" && "-")
    ? numberWithCommas(Number(res))
    : "--";
};
