import { configureStore } from "@reduxjs/toolkit";
import vehicalsReducer from "..//components/pages/Vehicals/Vehicals.slice";

export const store = configureStore({
  reducer: {
    vehicals: vehicalsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
