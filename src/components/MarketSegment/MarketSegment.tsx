"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Box, Tabs, useTheme } from "@mui/material";
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
  const theme = useTheme();
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
    <Box
      sx={{ overflow: "auto", width: "100%", bgcolor: "background.secondary" }}
    >
      <Tabs
        sx={{
          height: "100%",
          ".MuiTabScrollButton-root:hover": {
            backgroundColor: "background.secondary",
          },
          ".MuiTabScrollButton-root": {
            height: "100%",
            width: { sx: "20px", xs: "6px" },
            ".MuiSvgIcon-root: hover": { color: theme.palette.text.primary },
            ".MuiTabs-flexContainer ": {
              gap: "10px",
            },
          },
          display: "flex",
          alignItems: "center",
          gap: { sm: 1, xs: 0.5 },
        }}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
      >
        <Box
          gap={2}
          display={"flex"}
          width={"100%"}
          alignItems={"center"}
          p={1}
        >
          <Box>
            <SymbolWrapper symbolText variant={"Regular_16"} symbol={symbol} />
          </Box>

          <Box>
            <MarketStreamData
              symbol={symbol}
              type={"ticker"}
              variant={"Regular_18"}
            />
          </Box>
          <Box>
            <TextView color={"text.tertiary"} component={"p"}>24h Change</TextView>
            <TextView component={"p"}>
              <MarketStreamData
                color={"error.main"}
                symbol={symbol}
                type={"high"}
              />
              {" / "}
              <MarketStreamData
                color={theme.palette.success.main}
                symbol={symbol}
                type={"low"}
              />
            </TextView>
          </Box>
          <Box>
            <TextView color={"text.tertiary"}  component={"p"}>Mark</TextView>
            <MarketStreamData symbol={symbol} type={"markPrice"} />
          </Box>
          <Box>
            <TextView color={"text.tertiary"}  component={"p"}>Index</TextView>
            <TextView component={"p"}>61,084</TextView>
          </Box>
          <Box>
            <TextView  color={"text.tertiary"}  component={"p"}>24h Volume</TextView>
            <MarketStreamData symbol={symbol} type={"volumn"} />
          </Box>
          <Box>
            <TextView color={"text.tertiary"}  component={"p"}>Funding Rate</TextView>
            <TextView component={"p"} >
              <MarketStreamData color="warning.main" symbol={symbol} type={"per"} />% in 03:44:29
            </TextView>
          </Box>
        </Box>
      </Tabs>
    </Box>
  );
};

export default MarketSegment;
