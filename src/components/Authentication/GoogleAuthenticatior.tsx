import { Grid, useTheme } from "@mui/material";
import React from "react";
import CustomButton from "../Atoms/CustomButton/CustomButton";
import BasicTextFields from "../Atoms/CustomInput/BasicTextFields";
import CustomDivider from "../Atoms/Divider/CustomDivider";
import TextView from "../Atoms/TextView/TextView";

type Props = {};

const GoogleAuthenticatior = (props: Props) => {
  const theme = useTheme();
  return (
    <Grid xs={12} gap={4} alignContent={"flex-start"} item container height={"auto"} overflow="auto">
      <Grid item xs={12}>
        <TextView variant="Regular_28" fontWeight="Medium">
          Connect with Google Authenticator
        </TextView>
        <TextView variant="Regular_14" component={"p"} color={theme.palette.grey[700]}>
          Scan the QR code with your Google Authenticator app.
        </TextView>
      </Grid>{" "}
      <Grid item xs={12}>
        <TextView style={{ mb: 2 }} variant="Regular_14" component={"p"} color={theme.palette.grey[700]}>
          Or if you are having trouble scanning the QR code, you can enter the following key into your authenticator app:
        </TextView>
        <BasicTextFields />
      </Grid>{" "}
      <CustomDivider alignment={""} />
      <Grid item xs={12}>
        <TextView style={{ mb: 2 }} variant="Regular_14" component={"p"} color={theme.palette.grey[700]}>
          Enter the 6-digit code from your Google Authenticator app to complete the setup.
        </TextView>
        <BasicTextFields autoFocus={true} placeholder={"Enter authenticator code"} label={"Enter 6-digit code"} />
      </Grid>{" "}
      <Grid item xs={12}>
        <Grid item xs={12}>
          <CustomButton label="Continue" />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default GoogleAuthenticatior;
