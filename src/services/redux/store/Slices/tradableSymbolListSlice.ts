import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";

interface TradableCoinsListState {
  tradablesymbolList: any;
}

const initialState: TradableCoinsListState = {
  tradablesymbolList: [],
};

const tradableCoinsListSlice = createSlice({
  name: "tradableCoinsList",
  initialState,
  reducers: {
    setTradableSymbolListSuccess(state:any, action: any) {
      return { tradablesymbolList: action.payload };
    },
  },
});

export const { setTradableSymbolListSuccess } =
  tradableCoinsListSlice.actions;

export const getTradableCoinList = createAsyncThunk<any, string, { rejectValue: string }>(
  "tradableCoinsList/getTradableCoinList",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const res:any = {}
    //   await topXTradableSymbolListApi();
      const tradablesymbolList = res.data && res.data.symbols;
      dispatch(setTradableSymbolListSuccess(tradablesymbolList));
      return res.data;
    } catch (error:any) {
      // Assuming error.response.data contains the error message
      return rejectWithValue(error.response.data);
    }
  }
);

export default tradableCoinsListSlice.reducer;
