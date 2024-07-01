import { Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { FONT_FAMILY } from "@/assets/Theme/typography";

interface TextViewProp {
  id?: string;
  text?: string;
  textType?: keyof typeof FONT_FAMILY;
  fontWeight?: keyof typeof FONT_FAMILY["text"];
  component?: any;
  variant?: any;
  color?: string;
  onClick?:any;
  style?: any;
  children?: ReactNode;
  textAlign?: "inherit" | "left" | "center" | "right" | "justify";
}

const TextView: React.FC<TextViewProp> = ({
  id,
  text,
  textType = "text",
  fontWeight = "Regular",
  component,
  variant = "Medium_12",
  color = "text.primary",
  onClick,
  style,
  children,
  textAlign,
}) => {
  return (
    <Typography
      textAlign={textAlign}
      id={id}
      sx={{
        ...style,
        fontFamily: FONT_FAMILY[textType]?.[fontWeight],
      }}
      color={color}
      onClick={onClick}
      variant={variant}
      component={component}
    >
      {text}
      {children}
    </Typography>
  );
};

export default TextView;
