import React, { useEffect, useState } from "react";
import { Tabs, Tab, Box, useTheme, IconButton } from "@mui/material";
import { SymbolWrapper } from "../Atoms/SymbolWrapper/SymbolWrapper";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import TextView from "../Atoms/TextView/TextView";

function TopWindowsTabs() {
  const [value, setValue] = useState(0);
  const [symbols, setSymbols] = useState([]);
  const theme = useTheme();
  const router = useRouter();
  const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
    setValue(newValue);
  };

  const handleRowClick = (symbol: any) => {
    router.push({
      pathname: "/",
      query: { symbol: symbol.toLowerCase() },
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const allSymbols = JSON.parse(
        window.localStorage.getItem("symbolList") || "[]"
      );
      if (allSymbols.length > 0) {
        setSymbols(allSymbols.slice(0, 10));
      }
    }
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        boxShadow: "none",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
     
        textColor="inherit"
        sx={{
          color: theme.palette.text.primary,
          minHeight: 35,
          px: 1,
          "& .MuiTabs-flexContainer": {
            display: "flex",
            alignItems: "center",
          },
          "& .MuiTab-root": {
            textTransform: "none",
            minHeight: 0,
            padding: "6px 12px",
            "&.Mui-selected": {
              boxShadow: `0px 0px 6px ${theme.palette.grey[600]}`,
              backgroundColor: theme.palette.grey[500],
              color: theme.palette.text.primary,
            },
          },
        }}
      >
        {symbols.map((item: any, index) => (
  
            <Tab
              onClick={() => {handleRowClick(item.symbol)}}
              key={index}
              label={
                <div
                  style={{
                    display: "flex",
                    minWidth: 160,
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <SymbolWrapper symbol={item.symbol} symbolText />
                  <CloseIcon
                    sx={{
                      fontSize: 14,
                      color: theme.palette.grey[800],
                      marginLeft: "8px",
                    }}
                  />
                </div>
              }
            />
          
        ))}
      </Tabs>
    </Box>
  );
}

export default TopWindowsTabs;
