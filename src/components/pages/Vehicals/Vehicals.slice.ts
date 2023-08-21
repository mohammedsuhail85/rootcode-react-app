import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { VehicleData } from "./interface";

interface cartItem extends VehicleData {
  bidAmount: number;
}

// Type slice state
interface VehicleState {
  allVehicals: VehicleData[];
  loading: boolean;
  selectedVehicle: VehicleData | null;
  openDrawer: boolean;
  cart: cartItem[];
  message: string;
}

// initial state
const initialState: VehicleState = {
  allVehicals: [],
  loading: false,
  selectedVehicle: null,
  openDrawer: false,
  cart: [],
  message: "",
};

export const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {
    setVehicals: (state, action: PayloadAction<VehicleData[]>) => {
      state.allVehicals = action.payload;
    },
    setVehicalsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setOpenDrawer: (state, action: PayloadAction<boolean>) => {
      state.openDrawer = action.payload;
    },
    setSelectedVehicle: (state, action: PayloadAction<VehicleData | null>) => {
      state.selectedVehicle = action.payload;
    },
    addToCart: (state, action: PayloadAction<cartItem>) => {
      state.cart.push(action.payload);
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
  },
});

// Exporting actions
export const {
  setVehicals,
  setVehicalsLoading,
  setSelectedVehicle,
  setOpenDrawer,
  addToCart,
  setMessage,
} = vehicleSlice.actions;

// Exporting reducers
export default vehicleSlice.reducer;
