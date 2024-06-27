// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { getWatchList } from "../../../../frontend-api-service/Api/User/User";
// import { setFavouriteSymbolFromLocalStorage } from "../../actions/User/SetFavouriteSymbol.ac";

// interface InternetConnectionState {
//   isOnline: boolean;
// }

// interface internalState {
//   selectedSymbol: string;
//   selectedSide: string;
//   internet: InternetConnectionState;
//   watchlistID: string;
//   favouriteSymbols: any[];
// }

// const initialState: internalState = {
//   selectedSymbol: "",
//   selectedSide: "BUY",
//   internet: {
//     isOnline: true,
//   },
//   watchlistID: "",
//   favouriteSymbols: [],
// };

// const internalSlice = createSlice({
//   name: "internal",
//   initialState,
//   reducers: {
//     setSelectedSymbolSuccess(state, action: PayloadAction<string>) {
//       state.selectedSymbol = action.payload;
//     },
//     setSelectedSideSuccess(state, action: PayloadAction<string>) {
//       state.selectedSide = action.payload;
//     },
//     setInternetOnline(state) {
//       state.internet.isOnline = true;
//     },
//     setInternetOffline(state) {
//       state.internet.isOnline = false;
//     },
//     setFavouriteSymbolaction(state, action: PayloadAction<string[]>) {
//       state.favouriteSymbols = [...new Set([...state.favouriteSymbols, ...action.payload])];
//     },
//     removeFavouriteSymbolaction(state, action: PayloadAction<string>) {
//       state.favouriteSymbols = state.favouriteSymbols.filter((symbol) => symbol !== action.payload);
//     },
//     getUserWatchlist(
//       state,
//       action: PayloadAction<{ watchlistID: string; watchListArr: string[] }>
//     ) {
//       state.watchlistID = action.payload.watchlistID;
//       state.favouriteSymbols = action.payload.watchListArr;
//     },
//   },
// });

// export const {
//   setSelectedSymbolSuccess,
//   setSelectedSideSuccess,
//   setInternetOnline,
//   setInternetOffline,
//   setFavouriteSymbolaction,
//   removeFavouriteSymbolaction,
//   getUserWatchlist,
// } = internalSlice.actions;

// export const getUserWatchList = createAsyncThunk(
//   "internal/getUserWatchList",
//   async (_, { dispatch }) => {
//     try {
//       const response = await getWatchList();
//       const watchListArr = response?.data[0]?.watchlist;
//       const watchlistID = response?.data[0]?.watchlistID;
//       dispatch(setFavouriteSymbolFromLocalStorage(watchListArr, watchlistID));
//       dispatch(getUserWatchlist({ watchListArr, watchlistID }));
//     } catch (error) {
//       console.error("Error fetching watchlist:", error);
//     }
//   }
// );

// export default internalSlice.reducer;
