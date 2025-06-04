import { configureStore } from "@reduxjs/toolkit";

import { tableColumnsReducer } from "@/redux/tableColumnsSlice";
import { tableRowsReducer } from "@/redux/tableRowsSlice";
import { tableDataApi } from "@/redux/tableDataApiSlice";
import { tableFilterReducer } from "./redux/tableFilterSlice";

export const store = configureStore({
  reducer: {
    tableColumns: tableColumnsReducer,
    tableRows: tableRowsReducer,
    tableFilters: tableFilterReducer,
    [tableDataApi.reducerPath]: tableDataApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tableDataApi.middleware),
});
