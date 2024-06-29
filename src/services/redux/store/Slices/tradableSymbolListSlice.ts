import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
const initialState= {
  marketStreamData:{}
};
const tradableCoinsListSlice = createSlice({
  name: "marketStreamData",
  initialState,
  reducers: {
    setMarketStreamDataList(state:any, action: any) {
   const {payload} =action
       state.marketStreamData ={...state.marketStreamData,...payload}
    },
  },
});

export const { setMarketStreamDataList } = tradableCoinsListSlice.actions;
export default tradableCoinsListSlice.reducer;
