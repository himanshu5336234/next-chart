import React from "react";
import TextField from "@mui/material/TextField";
import { Grid, useTheme } from "@mui/material";
import TextView from "../TextView/TextView";
import OTPInput from "react-otp-input";

export default function BasicTextFields(props: any) {
const theme =useTheme()
  const { styles, className,inputType, autoFocus, onFocus, errorText, variant, label, type, Error, disabled, placeholder, children, onBlur, disabledTextInPrimary } = props || {};

  const CustomOnFocusHandler = (event: { target: { addEventListener: (arg0: string, arg1: (e: any) => void, arg2: { passive: boolean }) => void } }) => {
    if (onFocus) {
      onFocus(event);
    } else {
      event.target.addEventListener(
        "wheel",
        function (e: { preventDefault: () => void }) {
          e.preventDefault();
        },
        { passive: false }
      );
    }
  };
  return (
    <Grid container gap={1}>
      <Grid item xs={12}>
        {label && <TextView variant="Regular_12">{label}</TextView>}
      </Grid>
      <Grid item xs={12}>
        {inputType !=="otp"?
        <TextField
          {...props}
          className={className}
          placeholder={placeholder}
          sx={[
            {
              backgroundColor: "background.default",

              width: "100%",
              borderRadius: 1,
              border: "1px solid",
              borderColor: [Error ? theme.palette.error.main : "#29292E"],
              ".MuiInputBase-input": {
                p: " 10px 16px",
                fontSize: "14px"
              },
              ".MuiInputBase-input:focus-visible":{
                borderRadius: 1,
                border: "1px solid var(--Electric-Green-Primary, rgba(235, 255, 37, 1))"
              },
              "& .MuiOutlinedInput-root": {
                "& > fieldset": { borderWidth: "0px" }
              }
            },
            disabledTextInPrimary && {
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "white"
              }
            },
           
            {
              width: "100%",
              "&.MuiFormHelperText-root.Mui-error": { borderColor: theme.palette.error.main }
            },
            styles ?? {}
          ]}
          errorText={errorText}
          onFocus={CustomOnFocusHandler}
          onBlur={onBlur}
          disabled={disabled }
          label={""}
          autoFocus={autoFocus}
          type={type ?? "text"}
          variant={variant ?? "outlined"}
          InputLabelProps={{ shrink: true }}
          autoComplete="off"
        />:
        <OTPInput
        {...props}
        shouldAutoFocus={true}
        numInputs={6}
        renderSeparator={<span></span>}
        renderInput={(props) => <input style={{border:"red"}} id={"otp"} {...props} />}
      />}
        {children}
      </Grid>
      <Grid item xs={12}>
        {errorText && (
          <TextView variant="Regular_12" style={{ color:theme.palette.error.main, textTransform: "capitalize" }}>
            {errorText}
          </TextView>
        )}
      </Grid>
    </Grid>
  );
}
