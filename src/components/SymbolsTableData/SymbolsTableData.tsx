import React, { memo, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getTickerPrice } from "@/services/api-service/Apis";
import { Box, Grid, useTheme } from "@mui/material";
import { AutoSizer, List } from "react-virtualized";
import TextView from "../Atoms/TextView/TextView";
import BasicSearchField from "../Atoms/CustomInput/BasicSearchField";

const SymbolsTableData = () => {
  const theme =useTheme()
  const router = useRouter();
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortCriteria, setSortCriteria] = useState("symbol");
  const [sortOrder, setSortOrder] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTickerPrice();
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const handleRowClick = (symbol: any) => {
    router.push({
      pathname: "/",
      query: { symbol },
    });
  };

  const rowRenderer = ({ index, key,style }) => {
    const row:any= filteredData[index];
    return (
      <Box sx={style} key={key} onClick={() => handleRowClick(row.symbol)}>
        <Grid container gap={1} p={1}>
          <Grid xs={4} item>
            <TextView>{row.symbol}</TextView>
          </Grid>
          <Grid item xs={2}>
            <TextView textType="number">{parseFloat(row.lastPrice).toFixed(2)}</TextView>
          </Grid>
          <Grid item xs={2}>
            <TextView
            textType="number"
              style={{
                color: parseFloat(row.priceChangePercent) > 0 ? theme.palette.success.main :theme.palette.error.main
              }}
            >
              {parseFloat(row.priceChangePercent).toFixed(2)}%
            </TextView>
          </Grid>
          <Grid item xs={2}>
            <TextView textType="number">{parseFloat(row.quoteVolume).toFixed(2)}</TextView>
          </Grid>
        </Grid>
      </Box>
    );
  };

  const filteredData = data.filter(row =>
    row.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  )
  .sort((a, b) => {
    if (sortCriteria === "symbol") {
      return sortOrder? a.symbol.localeCompare(b.symbol) : b.symbol.localeCompare(a.symbol);
    }
    if (sortCriteria === "lastPrice") {
      return sortOrder? a.lastPrice - b.lastPrice : b.lastPrice - a.lastPrice;
    }
    if (sortCriteria === "priceChangePercent") {
      return sortOrder? a.priceChangePercent - b.priceChangePercent : b.priceChangePercent - a.priceChangePercent;
    }
    if (sortCriteria === "quoteVolume") {
      return sortOrder? a.quoteVolume - b.quoteVolume : b.quoteVolume - a.quoteVolume;
    }
    return 0;
  });
  return (
    <Box sx={{p:1,backgroundColor:"background.default"}}>
      <BasicSearchField
        placeholder="Search"
        autoFocus={true}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Grid container gap={1} mt={3} p={1}>
        <Grid xs={4} item>
          <TextView onClick={()=>{
            setSortCriteria("symbol");
            setSortOrder(!sortOrder)

          }}>Trading Pairs</TextView>
        </Grid>
        <Grid item xs={2}>
          <TextView onClick={()=>{
            setSortCriteria("lastPrice");
            setSortOrder(!sortOrder)

          }}>Price</TextView>
        </Grid>
        <Grid item xs={2}>
          <TextView onClick={()=>{
            setSortCriteria("priceChangePercent");
            setSortOrder(!sortOrder)

          }}>24H %</TextView>
        </Grid>
        <Grid item xs={2}>
          <TextView  onClick={()=>{
            setSortCriteria("quoteVolume");
            setSortOrder(!sortOrder)

          }}>Volume</TextView>
        </Grid>
      </Grid>

      <AutoSizer disableHeight>
        {({ width }) => (
          <List
            height={600}
            rowCount={filteredData.length}
            rowHeight={40}
            rowRenderer={rowRenderer}
            width={width}
          />
        )}
      </AutoSizer>
    </Box>
  );
};

export default memo(SymbolsTableData);
