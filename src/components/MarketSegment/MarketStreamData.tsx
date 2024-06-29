"use client";
import { useAppSelector } from "@/services/redux/hooks";
import React, { memo, useMemo } from "react";
import TextView from "../Atoms/TextView/TextView";

interface PositionLtpProps {
  symbol: string;
  type: string;
  variant: string;
  symbolPricePrecision: number;
}
const MarketStreamData: React.FC<PositionLtpProps> = ({
  symbol,
  type,
  variant,
  symbolPricePrecision,
}) => {
  const snapltp = useAppSelector(
    (state: any) =>
      state.marketStreamData.marketStreamData?.[
        `${symbol?.toLowerCase()}@${type}`
      ]
  );

  return (
    <TextView variant={variant} textType={"number"} fontWeight={"Medium"}>
      {snapltp ?? "--"}
      {/* {setDecimalPrecision(snapltp, symbolPricePrecision) || "--"} */}
    </TextView>
  );
};

export default memo(MarketStreamData);
