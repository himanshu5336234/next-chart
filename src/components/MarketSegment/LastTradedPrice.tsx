import React, { memo, useMemo } from "react";

import { Colors } from "../../../Provider/Colorsfont";
import Typography from "../../../components/UI/atoms/Typography";
import { FONT_FAMILY, TEXT_VARIENT } from "../../../components/UI/types/enums/enums";
import { useAppSelector } from "../../../frontend-BL/redux/hooks";
import { FlexRowCard } from "../../../components/UI/hocs/FlexComponents";

function LastTradedPrice({ symbol }) {
  const snapltp = useAppSelector(
    (state) => state.BinanceStreamData.binanceMarketData?.[`${symbol?.toLowerCase()}@ticker`]
  );
  const orderBook = useAppSelector((state) => state.BinanceStreamData.orderBook);
  const getLastPriceColor = useMemo(() => {
    if (Boolean(orderBook?.asks?.length > 0) && Boolean(orderBook?.bids?.length > 0)) {
      if (Number(snapltp) <= Number(orderBook?.bids[0][0])) {
        return Colors.Correct_BUY;
      } else if (Number(snapltp) >= Number(orderBook?.asks[0][0])) {
        return Colors.Incorrect_SELL
      } else {
        return "#fff";
      }
    } else {
      return "#fff";
    }
  }, [snapltp, orderBook]);
  const getArrowBasedOnLastPrice = useMemo(() => {
    if (Boolean(orderBook?.asks?.length > 0) && Boolean(orderBook?.bids?.length > 0)) {
      if (Number(snapltp) <= Number(orderBook?.bids[0][0])) {
        return <>&#8593;</>;
      } else if (Number(snapltp) >= Number(orderBook?.asks[0][0])) {
        return <>&#8595;</>;
      }
    }
  }, [snapltp, orderBook]);
  return (<FlexRowCard alignItems="center" gap={4}>

    <Typography
      textAlign={"right"}
      variant={TEXT_VARIENT.title2}
      fontStyle={FONT_FAMILY.numberBold}
      color={
        getLastPriceColor

      }
      accessibilityLabel="LTP"
    >
      {snapltp}
    </Typography>
    <Typography
      textAlign={"right"}
      variant={TEXT_VARIENT.title3}

      color={
        getLastPriceColor

      }
      accessibilityLabel="LTP"
    >
      {getArrowBasedOnLastPrice}
    </Typography>
  </FlexRowCard>
  );
}

export default memo(LastTradedPrice);
