import React from "react";
import { styled } from "@mui/material/styles";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";

const ToggleGroup = ({
  id,
  values,
  value,
  handleChange,
  variant = "chip",
  includesCustom,
  handleCustomClick,
  disabled,
  styles,
}: any) => {
  const ReturnComponentBasedOnVarient = (id: any, variant: any) => {
    return (
      <StyledToggleButtonGroup
        id={id}
        value={value}
        disabled={disabled}
        exclusive
        style={styles}
        onChange={handleChange}
      >
        {values.map(({ name, value, id }: any, index: any) => {
          if (includesCustom && value === "custom") {
            return (
              <ToggleButton
                key={index}
                value={value}
                onClick={handleCustomClick}
                id={id}
              >
                {name}
              </ToggleButton>
            );
          } else {
            return (
              <ToggleButton key={index} variant={variant} value={value} id={id}>
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

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(
  ({ theme, styles }: any) => ({
    display: "flex",
    width: "100%",
    gap: 16,
    "& .MuiToggleButtonGroup-grouped": {
      textTransform:"capitalize",
      padding: "2px 12px",
      border: "none",
      "&:not(:last-of-type)": {
        borderRadius:
          styles && styles.borderRadius ? styles.borderRadius : "4px",
      },
      "&:not(:first-of-type)": {
        borderRadius:
          styles && styles.borderRadius ? styles.borderRadius : "4px",
          marginLeft: 0,
      },
      ...styles,
    },
  })
);

export default ToggleGroup;
