import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import counterReducer from "@/redux/features/counterSlice";
import { userApi } from "./services/userApi";
import walletSlice from "./features/walletSlice";
import filterSlice from "./features/filterSlice";
import filterAnalyticsSlice from "./features/filterAnalyticsSlice";
import { useGetWalletQuery, walletApi } from "./services/walletApi";

export const store = configureStore({
  reducer: {
    counterReducer,
    [userApi.reducerPath]: userApi.reducer,
    [walletApi.reducerPath]: walletApi.reducer,
    wallet: walletSlice,
    filter: filterSlice,
    filterAnalytics: filterAnalyticsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    //getDefaultMiddleware().concat([userApi.middleware]),
    getDefaultMiddleware().concat([walletApi.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
