import React from "react";
import { Typography, Box, Modal } from "@mui/material";
import { BUTTONWRAPPER, CONTIANER } from "./Style";
import CustomButton from "../Atoms/CustomButton/CustomButton";
import TextView from "../Atoms/TextView/TextView";
const CustomModal = ({
  IsOpen,
  ContainerSx,
  isSecondaryAction,
  TitleSx,
  isPrimaryAction,
  isClose,
  close,
  primaryName,
  primaryAction,
  secondaryName,
  isDisabled,
  isloading,
  secondaryAction,
  title,
  subtitle,
  titleIllustration,
  children,
  primaryDisabled,
  primaryButtonSX,
  secondaryButtonSX,
}: // paddingSX
any) => {
  return (
    <Modal open={IsOpen} onClose={close}>
      <Box sx={[{ ...CONTIANER, ...ContainerSx }]}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {isClose === true && (
            <Box sx={{ alignSelf: "flex-end" }}>
              <Box
                onClick={close}
                sx={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "4px",
                  display: "flex",
                  cursor: "pointer",
                }}
              >
                <Typography sx={{ m: " auto", fontSize: "16.82px" }}>
                  &#x2715;
                </Typography>
              </Box>
            </Box>
          )}
          <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {titleIllustration}
            <TextView component={"h1"} variant="SemiBold_32" style={TitleSx}>
              {title}
            </TextView>
          </Box>
          <TextView
            component={"p"}
            variant={"Regular_16"}
            color={"text.tertiary"}
          >
            {subtitle}
          </TextView>
        </Box>
        {children}
        {(isPrimaryAction || isSecondaryAction) && (
          <>
            {/* <CustomDivider /> */}
            <Box maxWidth="md" sx={BUTTONWRAPPER}>
              {isSecondaryAction && (
                <CustomButton
                  id={"secondary-btn-confirm"}
                  variant={"secondary"}
                  style={secondaryButtonSX}
                  onClick={secondaryAction}
                  label={secondaryName}
                />
              )}

              {/* {isPrimaryAction && !loading && ( */}
              {isPrimaryAction && (
                <CustomButton
                  id={"primary-btn"}
                  variant={"primary"}
                  isDisabled={primaryDisabled || isDisabled}
                  isloading={isloading}
                  style={primaryButtonSX}
                  onClick={primaryAction}
                  label={primaryName}
                  loadingTextDisable={true}
                />
              )}
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default CustomModal;
