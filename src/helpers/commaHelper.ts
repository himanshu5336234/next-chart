export const numberWithCommas = (x: string | number | undefined) => {
  if (x === undefined || isNaN(x)) return "--";
  const parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

export const numFormatter = (num: number, precision: number | undefined) => {
  if (num > 999 && num < 1000000) {
    return (num / 1000).toFixed(precision) + "K";
  } else if (num > 1000000) {
    return (num / 1000000).toFixed(precision) + "M";
  } else if (num < 900) {
    return num.toFixed(precision);
  }
};
