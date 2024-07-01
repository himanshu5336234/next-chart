import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";

const CustomCheckBox = ({ varient = "primary", label, disabled, id, checked, onchange, name }: { name: string, varient?: string; label: any; id?: string; disabled: boolean; checked: boolean; onchange: any }) => {

  return (
    <>
      {varient === "primary" && (
        <FormControlLabel
          sx={{
            "& .MuiFormControlLabel-label": {
              fontSize: "12px",
              color: "text.regular"
            }
          }}
          control={
            <Checkbox
              name={name}
              sx={{
                "&.MuiSvgIcon-root": { fontSize: 16 },
                "&.Mui-checked": {
                  color: "text.main"
                }
              }}
              disabled={disabled}
              id={id}
              color={"primary"}
              checked={checked}
              onChange={onchange}
            />
          }
          label={label}
        />
      )}

    </>
  );
};

export default CustomCheckBox;
