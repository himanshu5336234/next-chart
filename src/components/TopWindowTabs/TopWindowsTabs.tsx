import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Tabs, Tab, Box, useTheme, IconButton } from "@mui/material";
import { SymbolWrapper } from "../Atoms/SymbolWrapper/SymbolWrapper";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import TextView from "../Atoms/TextView/TextView";
import WorkSpaceForm from "../WorkSpaceForm";

function TopWindowsTabs({ setCurrentWorkSpace }: { setCurrentWorkSpace: any }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const [workSpace, setWorkSpace] = useState<any>([]);
  const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
    setValue(newValue);
  };

  const handleRowClick = (item: any) => {
    setCurrentWorkSpace(item);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const workSpace = JSON.parse(
        window.localStorage.getItem("workspace") || "[]"
      );
      if (workSpace.length > 0) {
        setCurrentWorkSpace(workSpace[0]);
        setWorkSpace(workSpace);
      }
    }
  }, []);
  const ShowUi:any = useCallback((workSpace:any) => {
  return  workSpace?.map((item: any, index: any) => (
      <Tab
        onClick={() => {
          handleRowClick(item);
        }}
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
            <SymbolWrapper symbol={item.name} symbolText />
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
    ));
  }, [workSpace]);
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
        {ShowUi(workSpace)}
      </Tabs>
      <TextView onClick={() => setOpen(true)}>+</TextView>
      {open && (
        <WorkSpaceForm setWorkSpace={setWorkSpace} workSpace={workSpace} open={open} setOpen={setOpen} />
      )}
    </Box>
  );
}

export default TopWindowsTabs;
