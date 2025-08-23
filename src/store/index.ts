import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authReducer from "./slices/auth-slice";
import userReducer from "./slices/user-slice";
import meterReducer from "./slices/meter-slice";
import apartmentReducer from "./slices/apartment-slice";
import billReducer from "./slices/bill-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    meters: meterReducer,
    apartments: apartmentReducer,
    bills: billReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
