import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { setTableColumns } from "./tableColumnsSlice";
import { setTableRows } from "./tableRowsSlice";

export const tableDataApi = createApi({
  reducerPath: "tableDataApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (build) => ({
    getInitialTableColumns: build.query({
      query: () => "columns.json",
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        const cachedLayout = sessionStorage.getItem("tableColumns");

        // Only refetch layout if no cache
        if (!cachedLayout) {
          const { data } = await queryFulfilled;

          const columnsList = data?.map(
            ({ key, displayName, visible, type, options, editable }) => ({
              field: key,
              headerName: displayName,
              visible,
              type,
              options,
              editable,
            })
          );

          dispatch(setTableColumns(columnsList));
        }
      },
    }),
    getTableRows: build.query({
      query: () => "data.json",
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;

        dispatch(setTableRows(data));
      },
    }),
  }),
});

export const { useGetInitialTableColumnsQuery, useGetTableRowsQuery } =
  tableDataApi;
