import React, { useState, useEffect, useRef, useCallback } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Collapse, IconButton, Box, CircularProgress, Typography } from "@mui/material";
import NoTableDataIcon from "@/assets/images/NoTableDataIcon.svg";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import TextView from "../Atoms/TextView/TextView";
export interface ColumnDataType {
  field: string;
  headerName: string;
  renderCell?: (value: any, row: any) => React.ReactNode;
}

export interface RowDataType {
  id: number;
  [key: string]: any;
  details?: React.ReactNode;
}

interface CustomTableProps {
  fetchData: (page: number, filters?: FiltersType) => Promise<RowDataType[]>;
  columns: ColumnDataType[];
  expandable?: boolean;
  height?: string | number;
  filters?: FiltersType;
}
interface FiltersType {
  [key: string]: any;
}
const CustomTable = ({ fetchData, columns, expandable = false, height = "30vh", filters }: CustomTableProps) => {
  const [data, setData] = useState<RowDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const newData = await fetchData(page, filters);
      setData((prevData) => [...prevData, ...newData]);
      setLoading(false);
    };

    loadData();
  }, [page, fetchData, filters]);

  const lastElementRef = useCallback((node: HTMLTableRowElement | null) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      // TODO: check if all data already rendered i.e HasMore() and set page 
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  const handleExpandClick = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxHeight: height,
        overflow: "auto",
        backgroundColor: "transparent",
        backgroundImage: "none",
        borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px",
        borderColor: "border.primary",
        borderWidth: "1px",
        borderStyle: "solid"
      }}
    >
      <Table
        stickyHeader
        sx={{
          "& .MuiTableCell-head": {
            backgroundColor: "grey.200",
            color: "text.tertiary"
          },
          "& .MuiTableCell-root": {
            borderBottomWidth: "1px",
            borderBottomStyle: "solid",
            borderBottomColor: "border.primary",
            padding: "12px 16px",
            color: "text.white"
          },
          "& .MuiIconButton-root": {
            color: "grey.700"
          },
          "& .MuiCollapse-root": {
            backgroundColor: "grey.200",
            padding: "24px 32px"
          }
        }}
      >
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.field}>{column.headerName}</TableCell>
            ))}
            {expandable && <TableCell />}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <React.Fragment key={row.id}>
              <TableRow ref={index === data.length - 1 ? lastElementRef : null}>
                {columns.map((column) => (
                  <TableCell key={column.field}>{column.renderCell ? column.renderCell(row[column.field], row) : row[column.field]}</TableCell>
                ))}
                {expandable && (
                  <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => handleExpandClick(index)}>
                      {expandedRow === index ? <KeyboardArrowUp fontSize="medium" /> : <KeyboardArrowDown fontSize="medium" />}
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
              {expandable && expandedRow === index && (
                <TableRow>
                  <TableCell sx={{ padding: "0 !important" }} colSpan={columns.length + 1}>
                    <Collapse in={expandedRow === index} timeout="auto" unmountOnExit>
                      {row.details}
                    </Collapse>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
          {loading && (
            <TableRow>
              <TableCell colSpan={columns.length + (expandable ? 1 : 0)} align="center">
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                  <CircularProgress color="primary" />
                </Box>
              </TableCell>
            </TableRow>
          )}
          {data.length === 0 && !loading && (
            <TableRow>
              <TableCell colSpan={columns.length + (expandable ? 1 : 0)} align="center">

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1,
                marginBlock: 5,
              }}
              >
              <img src={NoTableDataIcon} alt="No Data" style={{marginBottom: 10}} />
              <TextView variant="Regular_18" color="text.secondary">
                No orders so far
              </TextView>
            </Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
