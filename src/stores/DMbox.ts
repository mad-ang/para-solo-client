import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export const DMSlice = createSlice(
{
  name: "dm",
  initialState: {
    listORroom: true, // true: list, false: room
    withWho: "",
  },
  reducers: {
    SetTruelistORroom: (state) => {
      state.listORroom = true
    },
    SetFalselistORroom: (state) => {
      state.listORroom = false
    },
    Setkey: (state, action: PayloadAction<string>) => {
      state.withWho = action.payload;
    }
  },
});

export const {
  SetTruelistORroom,
  SetFalselistORroom,
  Setkey,
} = DMSlice.actions;

export default DMSlice.reducer;
