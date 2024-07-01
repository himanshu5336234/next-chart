import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Layouts } from "@/assets/Theme/layoutConfig";
import CustomModal from "./CustomModals/CustomModal";

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

type Props = {
    open:boolean,setOpen:any,workSpace:any[],setWorkSpace:any
};

const WorkSpaceForm = ({workSpace,setWorkSpace,open,setOpen}: Props) => {
const [allSymbols,setAllSymbols]=useState<any>([])
  const [checkedValues, setCheckedValues] = useState<any>([]);
  const [dropdownValue, setDropdownValue] = useState("btcusdt");
  const handleClose = () => setOpen(false);
useEffect(() => {
  if(typeof window !=="undefined"){
  const allSymbols = JSON.parse((window as any).localStorage.getItem("symbolList") ||"[]");
  setAllSymbols(allSymbols.map((item:any)=> item.symbol.toLowerCase()))

}
}, []);
  const handleChange = (event: { target: { name: any; checked: any } }) => {
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
      JSON.stringify([...workSpace.filter((item:any)=>item.name !==dropdownValue),
        { name: dropdownValue, component: checkedValues, layout: Layouts },
      ])
    );
    setWorkSpace([...workSpace.filter((item:any)=>item.name !==dropdownValue),
      { name: dropdownValue, component: checkedValues, layout: Layouts },
    ])
    handleClose();
  };

  const handleDropdownChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setDropdownValue(event.target.value);
  };

  return (
    <>
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
          <Box>
          <CustomCheckBox
            name="chart"
            label={"Chart"}
            disabled={false}
            checked={checkedValues.option1}
            onchange={handleChange}
          />
          </Box>
          <Box>
          <CustomCheckBox
            name={"orderBook"}
            label={"Order Book"}
            disabled={false}
            checked={checkedValues.option3}
            onchange={handleChange}
          />
          </Box>
          <Box>
            <CustomCheckBox
            name={"watchlist"}
            label={"Watch List"}
            disabled={false}
            checked={checkedValues.option3}
            onchange={handleChange}
          />
          </Box>
          <Dropdown
            value={dropdownValue}
            onChange={handleDropdownChange}
            options={allSymbols}
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
