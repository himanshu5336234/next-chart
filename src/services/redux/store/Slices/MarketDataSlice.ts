// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { get24hrPriceChange } from "../../../../frontend-api-service/Api";

// interface MarketAPIDataState {
//   symbolListSnapshots: any[];
//   tradableSymbolList: any[];
// }

// const initialState: MarketAPIDataState = {
//   symbolListSnapshots: [],
//   tradableSymbolList: [],
// };

// const marketAPIDataSlice = createSlice({
//   name: "marketAPIData",
//   initialState,
//   reducers: {
//     setMarketAPIDataListSuccess(state, action: PayloadAction<any[]>) {
//       // if(Array.isArray(action.payload)) {
//       //    state.symbolListSnapshots = action.payload
//       // }
//       return { symbolListSnapshots: action.payload };
//     },
//   },
// });

// export const { setMarketAPIDataListSuccess } = marketAPIDataSlice.actions;

// export const getMarketTickerSnapshot = createAsyncThunk<any, string, { rejectValue: string }>(
//   "marketAPIData/getMarketTickerSnapshot",
//   async (_, { dispatch, rejectWithValue }) => {
//     try {
//       const response = await get24hrPriceChange();
//       dispatch(setMarketAPIDataListSuccess(response.data));
//       return response.data;
//     } catch (error) {
//       // Assuming error.response.data contains the error message
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export default marketAPIDataSlice.reducer;
