import { createSlice } from "@reduxjs/toolkit";

const getCachedTableColumns = () => {
  const cachedColumns = sessionStorage.getItem("tableColumns");
  return cachedColumns ? JSON.parse(cachedColumns) : [];
};

const tableColumnsSlice = createSlice({
  name: "tableColumns",
  initialState: getCachedTableColumns(),
  reducers: {
    setTableColumns: (state, action) => {
      sessionStorage.setItem("tableColumns", JSON.stringify(action.payload));
      return action.payload;
    },
    toggleColumnVisibility: (state, action) => {
      const toggledField = action.payload;

      const newLayout = state.map((column) =>
        column.field === toggledField
          ? { ...column, visible: !column.visible }
          : column
      );

      sessionStorage.setItem("tableColumns", JSON.stringify(newLayout));
      return newLayout;
    },
  },
});

export const { setTableColumns, toggleColumnVisibility } =
  tableColumnsSlice.actions;
export const tableColumnsReducer = tableColumnsSlice.reducer;
