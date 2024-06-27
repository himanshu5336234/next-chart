import React from "react";
import { Typography } from "@mui/material";
// import PropTypes from "prop-types";
import { variantNumber, ChipStyle} from "./ChipStyles";
interface ChipProps {
  value: string;
  variant: string;
}
// interface ReturnChipProps {
//   variant: string;
// }
export const Chip: React.FC<ChipProps> = ({ value, variant }) => {
  const ReturnChipBasedOnVariant = (variant: string) => {
    if (variant === "number") {
      return (
        <Typography  variant="labelLarge" component={"span"} textAlign={"end"} sx={variantNumber} color={parseFloat(value) >= 0 ? "success.main" : "error.main"}>
          {parseFloat(value) >= 0 ? "+" : ""}
          {value}
          {"%"}
        </Typography>
      );
    } else if (variant === "success") {
      return (
        <Typography backgroundColor="grey.300" variant="Medium_12" color={"success.main"} component={"span"} sx={ChipStyle}>
          {value}
        </Typography>
      );
    } else if (variant === "error") {
      return (
        <Typography backgroundColor="grey.300" variant="Medium_12" color={"error.main"} component={"span"} sx={ChipStyle}>
          {value}
        </Typography>
      );
    } else if (variant === "pending") {
      return (
        <Typography backgroundColor="grey.300" variant="Medium_12" color={"warning.main"} component={"span"} sx={ChipStyle}>
          {value}
        </Typography>
      );
    } else if (variant === "default") {
      return (
        <Typography
          component={"span"}
          variant="Medium_12"
          backgroundColor="grey.300"
          sx={ChipStyle}
        >
          {value}
        </Typography>
      );
    }
  };
  return <>{ReturnChipBasedOnVariant(variant)}</>;
};
