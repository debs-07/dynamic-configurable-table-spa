import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { Grid, useMediaQuery, useTheme } from "@mui/material";

import {
  useGetInitialTableColumnsQuery,
  useGetTableRowsQuery,
} from "@/redux/tableDataApiSlice";
import { TableToolbar } from "./TableToolbar";
import { filterData } from "@/utils/filterUtils";
import { updateTableRow } from "@/redux/tableRowsSlice";

const getDataGridColumns = (tableColumns, isSmallScreen) =>
  tableColumns
    .filter(({ visible }) => visible)
    .map(({ field, headerName, editable, type, options }, index) => {
      const columnProps = {
        headerAlign: "center",
        align: "center",
        field,
        editable,
        headerName,
        valueOptions: options,
        type: type === "options" ? "singleSelect" : type,
        ...(type === "date" && {
          valueGetter: (value) => value && new Date(value),
        }),
      };
      return isSmallScreen
        ? { ...columnProps, width: 150 }
        : { ...columnProps, ...(index === 0 ? { width: 150 } : { flex: 1 }) };
    });

export const TableContainer = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const dispatch = useDispatch();

  const tableColumns = useSelector((state) => state?.tableColumns);
  const tableRows = useSelector((state) => state?.tableRows);
  const activeFilters = useSelector((state) => state?.tableFilters);

  const { isLoading: colsLoading } = useGetInitialTableColumnsQuery(undefined);
  const { isLoading: rowsLoading } = useGetTableRowsQuery(undefined);

  const filteredRows = useMemo(
    () => filterData(tableRows, tableColumns, activeFilters),
    [tableRows, tableColumns, activeFilters]
  );

  const dataGridColumnsConfig = useMemo(
    () => getDataGridColumns(tableColumns, isSmallScreen),
    [tableColumns, isSmallScreen]
  );

  const processRowUpdate = (updatedRow) =>
    new Promise((resolve) => {
      dispatch(updateTableRow(updatedRow));
      resolve(updatedRow);
    });

  return (
    <Grid
      container
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        width: "100vw",
        minHeight: "100vh",
        overflowX: "hidden",
        bgcolor: "background.default",
        padding: "1%",
      }}
    >
      <TableToolbar />
      <DataGrid
        editMode="cell"
        rows={filteredRows}
        columns={dataGridColumnsConfig}
        loading={colsLoading || rowsLoading}
        processRowUpdate={processRowUpdate}
        disableColumnMenu={true}
        pageSizeOptions={[10, 20]}
        sx={{ width: "100%" }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
      />
    </Grid>
  );
};
