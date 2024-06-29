import React, { memo } from "react";
import { useAppSelector } from "../../../frontend-BL/redux/hooks";
import { Colors } from "../../../Provider/Colorsfont";
import Typography from "../../UI/atoms/Typography";
import { FONT_FAMILY, TEXT_VARIENT } from "../../UI/types/enums/enums";

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
  const snapltp = 0
//    useAppSelector((state) => state.BinanceStreamData.binanceMarketData?.[`${symbol?.toLowerCase()}@${type}`]);

  return (
    <Typography
      variant={ variant || TEXT_VARIENT.caption1}
      fontStyle={FONT_FAMILY.numberMedium}
      color={color}
    >
      {newSetDecimalPrecision(snapltp, symbolPricePrecision) || "--"}
    </Typography>
  );
};

export default memo(PositionLtp);
