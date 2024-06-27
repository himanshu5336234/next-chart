import { Grid, useTheme } from "@mui/material";
import React, { useState } from "react";
import TextView from "@/components/Atoms/TextView/TextView";
import BasicTextFields from "@/components/Atoms/CustomInput/BasicTextFields";
import CustomButton from "@/components/Atoms/CustomButton/CustomButton";
import { createOTP } from "@/services/api-service/Apis";
function validateEmail(email: string) {
  // Check if the input is empty
  if (!email) {
    return "Email cannot be empty.";
  }

  // Regular expression for validating an email
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Test the email against the regular expression
  if (!regex.test(email)) {
    return "Invalid email format.";
  }
}
const SignIn = ({ change }: any) => {
  const [formValue, setformValue] = useState({ email: "", error: "", isLoading: false });
  const theme = useTheme();
  const handleSubmitEmail = () => {
    const error = validateEmail(formValue.email);
    if (error) {
      setformValue((prev) => ({ ...prev, error }));
    } else {
      createOTP(formValue.email)
        .then((response: any) => {
          console.log(response);
          //   change((pre:any)=>({...pre,url:"otp"}))
        })
        .catch(() => {});
    }
  };
  return (
    <Grid xs={12} gap={5} alignContent={"flex-start"} item container height={"70%"}>
      <Grid item xs={12}>
        <TextView variant="Regular_28" fontWeight="Medium">
          Get Started
        </TextView>
        <TextView variant="Regular_14" component={"p"} color={theme.palette.grey[700]}>
          Log in or sign up by entering your email.
        </TextView>
      </Grid>{" "}
      <Grid item xs={12}>
        <BasicTextFields
          autoFocus={true}
          value={formValue.email}
          onChange={(event: { target: { value: any } }) => {
            setformValue((prev) => ({ ...prev,error:"", email: event.target.value }));
          }}
          Error={formValue.error.length > 0}
          errorText={formValue.error}
          label={"Enter Email Address"}
          placeholder={"johndoe@email.com"}
        />
      </Grid>{" "}
      <Grid item xs={12}>
        <CustomButton isDisabled={formValue.isLoading} isLoading={formValue.isLoading} label="Continue" onClick={handleSubmitEmail} />
      </Grid>
    </Grid>
  );
};

export default SignIn;
