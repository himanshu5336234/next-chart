import React from "react";
import { Typography } from "@mui/material";
// import PropTypes from "prop-types";
import { variantNumber, ChipStyle } from "./ChipStyles";
import TextView from "../TextView/TextView";
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
        <TextView
          
          component={"span"}
          style={variantNumber}
          color={parseFloat(value) >= 0 ? "success.main" : "error.main"}
        >
          {parseFloat(value) >= 0 ? "+" : ""}
          {value}
          {"%"}
        </TextView>
      );
    } else if (variant === "success") {
      return (
        <TextView
          variant="Medium_12"
          color={"success.main"}
          component={"span"}
          style={ChipStyle}
        >
          {value}
        </TextView>
      );
    } else if (variant === "error") {
      return (
        <TextView

          variant="Medium_12"
          color={"error.main"}
          component={"span"}
          style={ChipStyle}
        >
          {value}
        </TextView>
      );
    } else if (variant === "pending") {
      return (
        <TextView

          variant="Medium_12"
          color={"warning.main"}
          component={"span"}
          style={ChipStyle}
        >
          {value}
        </TextView>
      );
    } else if (variant === "default") {
      return (
        <TextView
          component={"span"}
          variant="Medium_12"
          style={ChipStyle}
        >
          {value}
        </TextView>
      );
    }
  };
  return <>{ReturnChipBasedOnVariant(variant)}</>;
};
