// store/configureStore.ts
import { configureStore } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import rootReducer from "./reducers";

const makeStore = () => configureStore({
  reducer: (state:any, action:any) => {
    if (action.type === HYDRATE) {
      return  {
        ...state, // use previous state
        ...action.payload, // apply delta from hydration
      };
    } else {
      return rootReducer(state, action);
    }
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export const wrapper = createWrapper(makeStore);

export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];
