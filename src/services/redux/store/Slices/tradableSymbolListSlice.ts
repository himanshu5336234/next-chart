import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TradableCoinsListState {
  tradablesymbolList: any[];
}

const initialState: TradableCoinsListState = {
  tradablesymbolList: [],
};

const tradableCoinsListSlice = createSlice({
  name: "tradableCoinsList",
  initialState,
  reducers: {
    setTradableSymbolListSuccess(state, action: PayloadAction<any>) {
      return { tradablesymbolList: action.payload };
    },
    setTradableSymbolListFail(state) {
      // Handle failure if needed
    },
  },
});

export const { setTradableSymbolListSuccess, setTradableSymbolListFail } =
  tradableCoinsListSlice.actions;

export const getTradableCoinList = createAsyncThunk<any, string, { rejectValue: string }>(
  "tradableCoinsList/getTradableCoinList",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const res = {}
    //   await topXTradableSymbolListApi();
      const tradablesymbolList = res.data && res.data.symbols;
      dispatch(setTradableSymbolListSuccess(tradablesymbolList));
      return res.data;
    } catch (error) {
      // Assuming error.response.data contains the error message
      return rejectWithValue(error.response.data);
    }
  }
);

export default tradableCoinsListSlice.reducer;
