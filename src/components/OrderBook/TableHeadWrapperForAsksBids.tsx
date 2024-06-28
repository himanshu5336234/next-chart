import React from "react";
import { Grid } from "@mui/material";
import TextView from "../Atoms/TextView/TextView";
const TableHeadWrapperForAsksBids = () => {
  return (
    <Grid mb={1} container direction="row" justifyContent="space-evenly" alignItems="center">
      <Grid item xs={4}>
        <TextView
          style={{
            flex: 1,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}

          component={"h6"}

        >
          {"PRICE"}
        </TextView>
      </Grid>

      <Grid item xs={4}>
        <TextView
          style={{
            flex: 1,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
 
          component={"h4"}
    
        >
          {`SIZE (USDT)`}
        </TextView>
      </Grid>
      <Grid item xs={4}>
        <TextView
          style={{
            flex: 1,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}

  
        >
          {`SUM (USDT)`}
        </TextView>
      </Grid>
    </Grid>
  );
};
export default React.memo(TableHeadWrapperForAsksBids);
