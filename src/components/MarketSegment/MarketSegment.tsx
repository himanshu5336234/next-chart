"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Grid } from "@mui/material";
import TextView from "../Atoms/TextView/TextView";
import NewWebSocketClient from "@/helpers/WebSocketModule";
import { BASE_URL } from "@/services/api-service/Base";
import { useAppDispatch } from "@/services/redux/hooks";
import { setMarketStreamDataList } from "@/services/redux/store/Slices/tradableSymbolListSlice";
import MarketStreamData from "./MarketStreamData";
import { SymbolWrapper } from "../Atoms/SymbolWrapper/SymbolWrapper";
type Props = {
  symbol: string;
};
const obj = {
  method: "SUBSCRIBE",
  id: 2,
};

const MarketSegment = ({ symbol }: Props) => {
  const [isConnected, setIsConnected] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const webSocketService = NewWebSocketClient.getInstance(
      BASE_URL()?.binanceWsBase
    );
    if (isConnected) {
      webSocketService.sendMessage(
        JSON.stringify({
          ...obj,
          params: [
            `${symbol.toLowerCase()}@ticker`,
            `${symbol.toLowerCase()}@markPrice`,
          ],
        })
      );
      webSocketService.addListener("WebSocketMessage", (message: string) => {
        const { data } = JSON.parse(message);

        if (data) {
          const bData: any = {};
          switch (data.e) {
            case "markPriceUpdate":
              bData[`${data.s.toLowerCase()}@markPrice`] = data.p;
              break;
            case "24hrTicker":
              bData[`${data.s.toLowerCase()}@per`] = data.P;
              bData[`${data.s.toLowerCase()}@ticker`] = data.c;
              bData[`${data.s.toLowerCase()}@low`] = data.l;
              bData[`${data.s.toLowerCase()}@high`] = data.h;
              bData[`${data.s.toLowerCase()}@volumn`] = data.q;
              break;
            default:
              break;
          }
          if (Object.keys(bData).length > 0) {
            dispatch(setMarketStreamDataList(bData));
          }
        }
      });
    } else {
      webSocketService.addListener("open", () => {
        setIsConnected(true);
      });
    }


  }, [symbol, isConnected]);

  return (
    <Grid gap={1} bgcolor="background.secondary" container alignItems={"center"} p={1}>
      <Grid item md={2}>
        <SymbolWrapper symbolText variant={"Regular_16"} symbol={symbol} />
      </Grid>
      <Grid item md={1.5}>
        <MarketStreamData
          symbol={symbol}
          type={"ticker"}
          variant={"Regular_18"}
        />
      </Grid>
      <Grid item xs={6} md={1.5}>
        <TextView component={"p"}>24h Change</TextView>
        <TextView component={"p"}>
          <MarketStreamData symbol={symbol} type={"high"} />/
          <MarketStreamData symbol={symbol} type={"low"} />
        </TextView>
      </Grid>
      <Grid item xs={6} md={1.2}>
        <TextView component={"p"}>Mark</TextView>
        <MarketStreamData symbol={symbol} type={"markPrice"} />
      </Grid>
      <Grid item xs={6} md={1.2}>
        <TextView component={"p"}>Index</TextView>
        <TextView component={"p"}>61,084</TextView>
      </Grid>
      <Grid item xs={6} md={1.5}>
        <TextView component={"p"}>24h Volume</TextView>
        <MarketStreamData symbol={symbol} type={"volumn"} />
      </Grid>
      <Grid item xs={6} md={2}>
        <TextView component={"p"}>Funding Rate</TextView>
        <TextView component={"p"} color="warning">
          <MarketStreamData symbol={symbol} type={"per"} /> in 03:44:29
        </TextView>
      </Grid>
    </Grid>
  );
};

export default MarketSegment;
