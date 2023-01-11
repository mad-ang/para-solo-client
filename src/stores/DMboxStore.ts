import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export const DMSlice = createSlice(
{
  name: "dm",
  initialState: {
    withWho: "",
  },
  reducers: {
    Setkey: (state, action: PayloadAction<string>) => {
      state.withWho = action.payload;
    }
  },
});

export const {
  Setkey,
} = DMSlice.actions;

export default DMSlice.reducer;
