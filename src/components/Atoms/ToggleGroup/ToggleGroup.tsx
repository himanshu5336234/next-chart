import React from "react";

import { styled } from "@mui/material/styles";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme, styles }) => ({
  display: "flex",
  width: "100%",
  gap: 16,
  "& .MuiToggleButtonGroup-grouped": {
    textTransform: "none",
    padding: "8px 16px",
    border:"none",
    "&:not(:last-of-type)": {
      // borderRadius: styles.borderRadius || "0px",
      borderRadius: styles && styles.borderRadius ? styles.borderRadius : "8px",

    },
    "&:not(:first-of-type)": {
      borderRadius: styles && styles.borderRadius ? styles.borderRadius : "8px",


      marginLeft: 0,

    },
    ...styles
  }
}));
import ToggleButton from "@mui/material/ToggleButton";
const ToggleGroup = ({ id, values, value, handleChange, variant, includesCustom, handleCustomClick, disabled, styles }) => {
  const ReturnComponentBasedOnVarient = (id, variant) => {

    return (
      <StyledToggleButtonGroup id={id} value={value} disabled={disabled} exclusive styles={styles} onChange={handleChange}>
        {values.map(({ name, value, id }, index) => {
          if (includesCustom && value === "custom") {
            return (
              <ToggleButton key={index} value={value} onClick={handleCustomClick} id={id}>
                {name}
              </ToggleButton>
            );
          } else {
            return (
              <ToggleButton key={index} variant={variant ?? "chip"} value={value} id={id}>
                {name}
              </ToggleButton>
            );
          }
        })}
      </StyledToggleButtonGroup>
    );

  };
  return <>{ReturnComponentBasedOnVarient(id, variant)}</>;
};

export default ToggleGroup;
