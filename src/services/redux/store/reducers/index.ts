import { combineReducers } from "@reduxjs/toolkit";

import tradableSymbolList from "../Slices/tradableSymbolListSlice";


const rootReducer = combineReducers({
  tradableSymbolList,
});

export default rootReducer;
