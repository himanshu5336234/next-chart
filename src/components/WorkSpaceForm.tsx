import React, { useState } from "react";
import { Box } from "@mui/material";
import { Layouts } from "@/assets/Theme/layoutConfig";
import CustomModal from "./CustomModals/CustomModal";
import CustomButton from "./Atoms/CustomButton/CustomButton";
import Dropdown from "./Dropdown/DropDown";
import CustomCheckBox from "./Atoms/CheckBox/CustomCheckBox";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type Props = {};

const WorkSpaceForm = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [checkedValues, setCheckedValues] = useState<any>([]);
  const [dropdownValue, setDropdownValue] = useState("btcusdt");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event: { target: { name: any; checked: any } }) => {
    debugger;
    const value = event.target.name;
    setCheckedValues((prev: any[]) =>
      event.target.checked
        ? [...prev, value]
        : prev.filter((item) => item !== value)
    );
  };

  const handleSubmit = () => {
    localStorage.setItem(
      "workspace",
      JSON.stringify([
        { name: dropdownValue, component: checkedValues, layout: Layouts },
      ])
    );
    handleClose();
  };

  const handleDropdownChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setDropdownValue(event.target.value);
  };

  return (
    <>
      <CustomButton onClick={handleOpen}>Open Modal</CustomButton>
      <CustomModal
        isClose
        close={() => setOpen(false)}
        isPrimaryAction
        primaryAction={handleSubmit}
        primaryDisabled={checkedValues.length === 0}
        IsOpen={open}
        title="Draw your work space "
      >
        <Box sx={{ mt: 3 }}>
          <CustomCheckBox
            name="Chart"
            label={"Chart"}
            disabled={false}
            checked={checkedValues.option1}
            onchange={handleChange}
          />
          <CustomCheckBox
            name={"OrderBook"}
            label={"Order Book"}
            disabled={false}
            checked={checkedValues.option3}
            onchange={handleChange}
          />
          <Dropdown
            value={dropdownValue}
            onChange={handleDropdownChange}
            options={["btcusdt", "ethusdt"]}
            placeholder="Select Coins"
            varient={null}
            label={"Select Coins"}
          />
        </Box>
      </CustomModal>
    </>
  );
};

export default WorkSpaceForm;
