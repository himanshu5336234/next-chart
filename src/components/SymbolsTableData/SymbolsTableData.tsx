import React, { memo, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { getTickerPrice } from "@/services/api-service/Apis";
import { Box, Grid, useTheme } from "@mui/material";
import { AutoSizer, List } from "react-virtualized";
import TextView from "../Atoms/TextView/TextView";
import BasicSearchField from "../Atoms/CustomInput/BasicSearchField";
import { setMarketStreamDataList } from "@/services/redux/store/Slices/tradableSymbolListSlice";
import { useAppDispatch } from "@/services/redux/hooks";
import { SymbolWrapper } from "../Atoms/SymbolWrapper/SymbolWrapper";
import { getSymbolDetails, setDecimalPrecision } from "@/helpers/Symboldetails";
import ToggleGroup from "../Atoms/ToggleGroup/ToggleGroup";
import { numFormatter } from "@/helpers/commaHelper";

const SymbolsTableData = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [data, setData] = useState({ usdt: [], usdc: [] });
  const [searchQuery, setSearchQuery] = useState("");
  const [sortCriteria, setSortCriteria] = useState("symbol");
  const [sortOrder, setSortOrder] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const bData: any = {};
      try {
        const response = await getTickerPrice();
        setData({
          usdt: response.data.filter((item: any) =>
            item.symbol.toUpperCase().includes("USDT")
          ),
          usdc: response.data.filter((item: any) =>
            item.symbol.toUpperCase().includes("USDT")
          ),
        });
        response.data.forEach((element: any) => {
          console.log(element);
          bData[`${element.symbol.toLowerCase()}@per`] =
            element.priceChangePercent;
          bData[`${element.symbol.toLowerCase()}@ticker`] = element.lastPrice;
          bData[`${element.symbol.toLowerCase()}@low`] = element.lowPrice;
          bData[`${element.symbol.toLowerCase()}@high`] = element.highPrice;
          bData[`${element.symbol.toLowerCase()}@volumn`] = element.volume;
        });
        if (Object.keys(bData).length > 0) {
          dispatch(setMarketStreamDataList(bData));
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const handleRowClick = (symbol: any) => {
    router.push({
      pathname: "/",
      query: { symbol: symbol.toLowerCase() },
    });
  };

  const rowRenderer = ({ index, key, style }: any) => {
    const row: any = filteredData[index];
    return (
      <Box
        sx={{
          ...style,
          cursor: "pointer",
          ":hover": { backgroundColor: "background.tertiary", borderRadius: 1 },
        }}
        key={key}
        onClick={() => handleRowClick(row.symbol)}
      >
        <Grid container justifyContent={"space-between"} alignItems={"center"} gap={1} p={1}>
          <Grid xs={4} item>
            <SymbolWrapper
              symbolText
              variant={"Regular_12"}
              symbol={row.symbol}
            />
          </Grid>
          <Grid item xs={2}>
            <TextView fontWeight={"Medium"} textType="number">
              {setDecimalPrecision(
                String(row.lastPrice),
                getSymbolDetails(row.symbol)?.pricePrecision
              ) || "--"}
            </TextView>
          </Grid>
          <Grid item xs={2}>
            <TextView
              fontWeight={"Medium"}
              textType="number"
              style={{
                color:
                  parseFloat(row.priceChangePercent) > 0
                    ? theme.palette.success.main
                    : theme.palette.error.main,
              }}
            >
              {parseFloat(row.priceChangePercent).toFixed(2)}%
            </TextView>
          </Grid>
          <Grid item xs={2}>
            <TextView fontWeight={"Medium"} textType="number">
              {" "}
              {numFormatter(
                (row.quoteVolume),
                getSymbolDetails(row.symbol)?.pricePrecision
              ) || "--"}
            </TextView>
          </Grid>
        </Grid>
      </Box>
    );
  };

  const filteredData = data.usdt
    .filter((row: any) =>
      row.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a: any, b: any) => {
      if (sortCriteria === "symbol") {
        return sortOrder
          ? a.symbol.localeCompare(b.symbol)
          : b.symbol.localeCompare(a.symbol);
      }
      if (sortCriteria === "lastPrice") {
        return sortOrder
          ? a.lastPrice - b.lastPrice
          : b.lastPrice - a.lastPrice;
      }
      if (sortCriteria === "priceChangePercent") {
        return sortOrder
          ? a.priceChangePercent - b.priceChangePercent
          : b.priceChangePercent - a.priceChangePercent;
      }
      if (sortCriteria === "quoteVolume") {
        return sortOrder
          ? a.quoteVolume - b.quoteVolume
          : b.quoteVolume - a.quoteVolume;
      }
      return 0;
    });
  return (
    <Grid container gap={2} sx={{ p: 1, bgcolor: "background.secondary" }}>
      <Grid item xs={12}>
        <BasicSearchField
          placeholder="Search"
          autoFocus={true}
          value={searchQuery}
          onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
            setSearchQuery(e.target.value)
          }
        />
      </Grid>
      <Grid item xs={12}>
        <ToggleGroup
          value={"USDT"}
          values={[
            { name: "usdt", value: "USDT" },
            { name: "usdc", value: "USCD" },
          ]}
        />
      </Grid>

      <Grid item container justifyContent={"space-between"} gap={1} px={1} xs={12}>
        <Grid xs={4} item>
          <TextView
            fontWeight={"Medium"}
            onClick={() => {
              setSortCriteria("symbol");
              setSortOrder(!sortOrder);
            }}
          >
            Trading Pairs
          </TextView>
        </Grid>
        <Grid item xs={2}>
          <TextView
            onClick={() => {
              setSortCriteria("lastPrice");
              setSortOrder(!sortOrder);
            }}
          >
            Price
          </TextView>
        </Grid>
        <Grid item xs={2}>
          <TextView
            fontWeight={"Medium"}
            onClick={() => {
              setSortCriteria("priceChangePercent");
              setSortOrder(!sortOrder);
            }}
          >
            24H %
          </TextView>
        </Grid>
        <Grid item xs={2}>
          <TextView
            fontWeight={"Medium"}
            onClick={() => {
              setSortCriteria("quoteVolume");
              setSortOrder(!sortOrder);
            }}
          >
            Volume
          </TextView>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <AutoSizer disableHeight>
          {({ width }) => (
            <List
              height={600}
              rowCount={filteredData.length}
              rowHeight={35}
              rowRenderer={rowRenderer}
              width={width}
            />
          )}
        </AutoSizer>
      </Grid>
    </Grid>
  );
};

export default memo(SymbolsTableData);
