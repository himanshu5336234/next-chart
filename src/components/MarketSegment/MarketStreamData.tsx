"use client";
import { setDecimalPrecision } from "@/helpers/PrecisionHelper";
import { getSymbolDetails } from "@/helpers/Symboldetails";
import { useAppSelector } from "@/services/redux/hooks";
import React, { memo } from "react";
import TextView from "../Atoms/TextView/TextView";

interface PositionLtpProps {
  symbol: string;
  type: string;
  variant?: string;
}
const MarketStreamData: React.FC<PositionLtpProps> = ({
  symbol,
  type,
  variant,
}) => {
  const snapltp = useAppSelector(
    (state: any) =>
      state.marketStreamData.marketStreamData?.[
        `${symbol?.toLowerCase()}@${type}`
      ]
  );

  return (
    <TextView variant={variant} textType={"number"} fontWeight={"Medium"}>
      {setDecimalPrecision(String(snapltp),getSymbolDetails(symbol)?.pricePrecision) || "--"}
    </TextView>
  );
};

export default (MarketStreamData);
