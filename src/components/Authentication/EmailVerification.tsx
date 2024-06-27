import { Grid, useTheme } from "@mui/material";
import React, { useState } from "react";

import TextView from "@/components/Atoms/TextView/TextView";
import BasicTextFields from "@/components/Atoms/CustomInput/BasicTextFields";
import CustomButton from "@/components/Atoms/CustomButton/CustomButton";
import { consumeOTP } from "@/services/api-service/Apis";
function validate(otp: string) {
  // Check if the input is empty
  if (!otp) {
    return "Otp cannot be empty.";
  }
  if (otp.length !== 6) {
    return "Invalid otp ";
  }
}
const EmailVerification = ({ email, change, flowId }: any) => {
  const [formValue, setformValue] = useState({ otp: "", error: "", isLoading: false });
  const theme = useTheme();
  const handleSubmitOtp = () => {
    debugger
    const error = validate(formValue.otp);

    if (error) {
      setformValue((prev) => ({ ...prev, error }));
    } else {
      consumeOTP({ email, flowId, emailOTP: formValue.otp })
        .then((response: any) => {
          console.log(response);
          //   change((pre:any)=>({...pre,url:"otp"}))
        })
        .catch(() => { });  // change((pre:any)=>({...pre,url:"authenticator"}))
    }

  };
  return (
    <Grid xs={12} gap={5} alignContent={"flex-start"} item container height={"70%"}>
      <Grid item xs={12}>
        <TextView variant="Regular_28" fontWeight="Medium">
          OTP Verification
        </TextView>
        <TextView variant="Regular_14" component={"p"} color={theme.palette.grey[700]}>
          We've sent you a verification code to your email:
        </TextView>
      </Grid>{" "}
      <Grid item xs={12}>
        <BasicTextFields errorText={formValue.error} label={"Enter OTP"} inputType={"otp"} value={formValue.otp} onChange={(event: any) => {
          setformValue((prev) => ({ ...prev, otp: event }))
        }} />
      </Grid>{" "}
      <Grid item container gap={1} xs={12}>
        <Grid item xs={12}>
          <CustomButton label="Continue" onClick={handleSubmitOtp} />
        </Grid>
        <Grid item xs={12}>
          <TextView variant="Regular_14" color={theme.palette.grey[700]}>
            Did't receive the code?
          </TextView>
          <TextView style={{ mx: 2 }} variant="Regular_14" color={theme.palette.primary.main}>
            Resend OTP
          </TextView>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EmailVerification;
