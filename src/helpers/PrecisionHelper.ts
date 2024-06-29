
export const convertToPrecisionValueInContractAssetUnit = (
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