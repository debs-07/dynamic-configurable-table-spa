import { createSlice } from "@reduxjs/toolkit";

const tableRowsSlice = createSlice({
  name: "tableRows",
  initialState: [],
  reducers: {
    setTableRows: (_state, action) => action.payload,
    updateTableRow: (state, action) => {
      const updatedRow = action.payload;

      const index = state.findIndex((row) => row.id === updatedRow.id);
      if (index !== -1) state[index] = updatedRow;
    },
  },
});

export const { setTableRows, updateTableRow } = tableRowsSlice.actions;
export const tableRowsReducer = tableRowsSlice.reducer;
