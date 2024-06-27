import { combineReducers } from "@reduxjs/toolkit";

import BinanceStreamData from "./Middleware/PublicStream.r";
const appReducer = combineReducers({
  BinanceStreamData,
});
const rootReducer = (state: any, action: any) => {
  if (action.type === "DESTROY_SESSION") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
