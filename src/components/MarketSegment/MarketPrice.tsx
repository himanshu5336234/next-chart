import { setDecimalPrecision } from "@/helpers/PrecisionHelper";
import React, { memo } from "react";
import TextView from "../Atoms/TextView/TextView";
interface PositionLtpProps {
  symbol: string;
  type: string;
  variant: string;
  color:string
  symbolPricePrecision: number;
  newSetDecimalPrecision: Function;
}
const PositionLtp: React.FC<PositionLtpProps> = ({
  symbol,
  type,
  variant,
  newSetDecimalPrecision,
  symbolPricePrecision,
  color
}) => {
  const snapltp = "0"
//    useAppSelector((state) => state.BinanceStreamData.binanceMarketData?.[`${symbol?.toLowerCase()}@${type}`]);

  return (
    <TextView
    >
      {setDecimalPrecision(snapltp, symbolPricePrecision) || "--"}
    </TextView>
  );
};

export default memo(PositionLtp);
