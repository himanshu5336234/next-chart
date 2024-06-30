import { useAppSelector } from "@/services/redux/hooks";
import { Box } from "@mui/material";
import React, { memo, useMemo } from "react";
import TextView from "../Atoms/TextView/TextView";

function LastTradedPrice({ symbol, variant }: any) {
  const snapltp = useAppSelector(
    (state: any) =>
      state.marketStreamData.marketStreamData?.[
        `${symbol?.toLowerCase()}@ticker`
      ]
  );
  const snapbid = useAppSelector(
    (state: any) =>
      state.marketStreamData.marketStreamData?.[`${symbol?.toLowerCase()}@bids`]
  );
  const snapAsk = useAppSelector(
    (state: any) =>
      state.marketStreamData.marketStreamData?.[`${symbol?.toLowerCase()}@asks`]
  );
  const getLastPriceColor = useMemo(() => {
    if (Boolean(snapAsk) && Boolean(snapbid)) {
      if (Number(snapltp) <= Number(snapbid)) {
        return "success.main";
      } else if (Number(snapltp) >= Number(snapAsk)) {
        return "error";
      } else {
        return "text.primary";
      }
    } else {
      return "text.primary";
    }
  }, [snapltp, snapAsk, snapbid]);
  const getArrowBasedOnLastPrice = useMemo(() => {
    if (Boolean(snapbid) && Boolean(snapbid)) {
      if (Number(snapltp) <= Number(snapbid)) {
        return <>&#8593;</>;
      } else if (Number(snapltp) >= Number(snapAsk)) {
        return <>&#8595;</>;
      }
    }
  }, [snapltp, snapAsk, snapbid]);
  return (
    <Box>
      <TextView textType="number" fontWeight="Medium" color={getLastPriceColor} variant={variant}>
        {snapltp ?? "--"}
      </TextView>{"  "}
      <TextView variant={variant} color={getLastPriceColor}>
        {getArrowBasedOnLastPrice}
      </TextView>
    </Box>
  );
}

export default memo(LastTradedPrice);
