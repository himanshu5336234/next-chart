import { Grid } from "@mui/material";
import React from "react";
import TextView from "../Atoms/TextView/TextView";
import { useTheme } from "@mui/material/styles";
import ChevronRightSharpIcon from "@mui/icons-material/ChevronRightSharp";

type Props = {
  header: string;
};

const WalletStatusHeader: React.FC<Props> = ({ header }) => {
  const theme = useTheme();
  return (
    <Grid container alignItems={"center"}>
      <TextView fontWeight="Regular" variant="Regular_16" text="Wallet" color={theme.palette.grey[700]} />
      <ChevronRightSharpIcon fontSize="small" sx={{ color: theme.palette.grey[700] }} />
      <TextView fontWeight="Regular" variant="Regular_16" text={header} color={theme.palette.grey[900]} />
    </Grid>
  );
};

export default WalletStatusHeader;
