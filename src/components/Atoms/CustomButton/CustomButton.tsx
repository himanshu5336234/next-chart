import React from "react";
import { Box, Button } from "@mui/material";
import TextView from "../TextView/TextView";

const CustomButton = ({
  id,
  label,
  variant = "primary",
  onClick,
  type = "submit",
  style,
  isDisabled,
  isloading,
  loadingTextDisable,
  textVariant,
  fullWidth,
}: any) => {
  return (
    <Button
      id={id}
      variant={variant}
      onClick={onClick}
      type={type}
      sx={{ width: "100%", ...style }}
      disabled={isDisabled}
      fullWidth={fullWidth}
    >
      {isloading === true ? (
        <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
          {!loadingTextDisable && (
            <TextView
              color="#282F0F"
              fontWeight="SemiBold"
              variant={textVariant ?? "Regular_12"}
            >
              {"Please wait ..."}
            </TextView>
          )}
        </Box>
      ) : (
        <TextView
          color="#282F0F"
          fontWeight="SemiBold"
          variant={textVariant ?? "Regular_12"}
        >
          {label ?? "Confirm"}
        </TextView>
      )}
    </Button>
  );
};

export default CustomButton;
