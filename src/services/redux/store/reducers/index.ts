import { combineReducers } from "@reduxjs/toolkit";

import marketStreamData from "../Slices/tradableSymbolListSlice";


const rootReducer = combineReducers({
  marketStreamData,
});

export default rootReducer;
