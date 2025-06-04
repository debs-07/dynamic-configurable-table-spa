import { createSlice } from "@reduxjs/toolkit";

const tableFilterSlice = createSlice({
  name: "tableFilters",
  initialState: [],
  reducers: {
    setFilters: (state, action) => action.payload,
  },
});

export const { setFilters } = tableFilterSlice.actions;
export const tableFilterReducer = tableFilterSlice.reducer;
