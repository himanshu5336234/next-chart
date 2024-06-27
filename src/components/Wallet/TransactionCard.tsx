import { Box, Grid, Stack, useTheme } from "@mui/material";
import React from "react";
import CustomButton from "../Atoms/CustomButton/CustomButton";
import TextView from "../Atoms/TextView/TextView";

type Props = {
  type: string;
};

const TransactionCard: React.FC<Props> = ({ type }) => {
  const theme = useTheme();
  return (
    <Box sx={{ backgroundColor: theme.palette.grey[200], paddingInline: "24px", paddingBlock: "32px", borderRadius: "8px" }} maxWidth={"100%"} width={"460px"}>
      <Grid container direction={"column"} gap={"32px"}>
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          <TextView fontWeight="Bold" variant="Regular_24" text="BTC" />
          <Stack direction={"column"} alignItems={"flex-end"}>
            <TextView fontWeight="Regular" variant="Regular_12" text="Current Balance" color={theme.palette.grey[700]} />
            <TextView fontWeight="Medium" variant="Regular_14" text="989,989.98" />
          </Stack>
        </Grid>
        {(type == "withdraw" || type == "transfer") && (
          <Stack gap={"12px"}>
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
              <TextView fontWeight="Regular" variant="Regular_14" text="Source Exchange" color={theme.palette.grey[700]} />
              <TextView fontWeight="Medium" variant="Regular_14" text="Binance" />
            </Stack>
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
              <TextView fontWeight="Regular" variant="Regular_14" text="Source Account ID" color={theme.palette.grey[700]} />
              <TextView fontWeight="Medium" variant="Regular_14" text="213E311PK2" />
            </Stack>
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
              <TextView fontWeight="Regular" variant="Regular_14" text="Source Balance" color={theme.palette.grey[700]} />
              <TextView fontWeight="Medium" variant="Regular_14" text="193.14" />
            </Stack>
          </Stack>
        )}
        {(type == "deposit" || type == "transfer") && (
          <Stack gap={"12px"}>
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
              <TextView fontWeight="Regular" variant="Regular_14" text="Destination Exchange" color={theme.palette.grey[700]} />
              <TextView fontWeight="Medium" variant="Regular_14" text="Binance" />
            </Stack>
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
              <TextView fontWeight="Regular" variant="Regular_14" text="Destination Account ID" color={theme.palette.grey[700]} />
              <TextView fontWeight="Medium" variant="Regular_14" text="213E311PK2" />
            </Stack>
          </Stack>
        )}

        <CustomButton label="Confirm" />
      </Grid>
    </Box>
  );
};

export default TransactionCard;
