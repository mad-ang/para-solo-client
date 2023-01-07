import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChairState {
  chairId: null | string;
  occupied: boolean;
}

const initialState: ChairState = {
  chairId: null,
  occupied: false,
};

export const chairSlice = createSlice({
  name: "chair",
  initialState,
  reducers: {
    setChairId: (state, action: PayloadAction<string>) => {
      state.chairId = action.payload;
    },

    setOccupied: (state, action: PayloadAction<boolean>) => {
      state.occupied = action.payload;
    },
  },
});

export const { setChairId, setOccupied } = chairSlice.actions;
export default chairSlice.reducer;
