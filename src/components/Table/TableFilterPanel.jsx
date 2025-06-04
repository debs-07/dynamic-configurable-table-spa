import { Box, Button, Divider, Grid, Typography } from "@mui/material";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FilterInput } from "../FilterInput";
import { DateFilterInput } from "../DateFilterInput";
import { MultiSelectFilter } from "../MultiSelectFilter";
import { setFilters } from "@/redux/tableFilterSlice";

const initColFilters = (tableColumns) =>
  tableColumns.map(({ type, field }) => {
    let condition = null;
    if (type === "string" || type === "number" || type === "date")
      condition = "equals";
    return { field, condition, value: null };
  });

export const TableFilterPanel = () => {
  const dispatch = useDispatch();
  const tableColumns = useSelector((state) => state?.tableColumns);
  const cachedTableFilters = useSelector((state) => state?.tableFilters);

  const [filterState, setFilterState] = useState(
    cachedTableFilters.length
      ? cachedTableFilters
      : initColFilters(tableColumns)
  );

  const handleFilterInputChange = (field, value, type) => {
    setFilterState((prevFilter) =>
      prevFilter.map((f) =>
        f.field === field ? { ...f, [type]: value } : { ...f }
      )
    );
  };

  const clearColumnFilter = (field) => {
    setFilterState((prevFilter) =>
      prevFilter.map((f) =>
        f.field === field
          ? { ...f, condition: "equals", value: null }
          : { ...f }
      )
    );
  };

  const handleResetFilter = () => setFilterState(initColFilters(tableColumns));
  const handleApplyFilters = () => dispatch(setFilters(filterState));

  const filterPanelHeader = () => (
    <Box sx={{ margin: "2% 0%" }}>
      <Typography>Filters</Typography>
      <Divider />
    </Box>
  );

  const filterPanelFooter = () => (
    <>
      <Divider />
      <Grid
        container
        justifyContent="space-between"
        sx={{ paddingTop: "2%" }}
      >
        <Button
          size="small"
          variant="outlined"
          onClick={handleResetFilter}
          sx={{ textTransform: "none" }}
        >
          Reset All
        </Button>
        <Button
          size="small"
          variant="contained"
          onClick={handleApplyFilters}
          sx={{ textTransform: "none" }}
        >
          Apply
        </Button>
      </Grid>
    </>
  );

  const filterPanelContent = () => (
    <Grid
      container
      flexDirection="column"
      spacing={2}
      sx={{
        maxHeight: "300px",
        display: "flow",
        overflow: "auto",
        " &::-webkit-scrollbar": {
          width: 0,
          height: 0,
        },
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {tableColumns?.map(({ field, headerName, type, options }) => {
        const { value: filteredVal, condition: filteredCond } =
          filterState.find((f) => f.field === field);
        return (
          <Box
            key={field}
            sx={{ marginBottom: "2%" }}
          >
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body2">{headerName}</Typography>
              <Button
                size="small"
                onClick={() => clearColumnFilter(field)}
                sx={{
                  padding: 0,
                  textTransform: "none",
                  justifyContent: "flex-end",
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                Reset
              </Button>
            </Grid>
            <Grid
              container
              flexDirection="column"
            >
              {(type === "string" || type === "number") && (
                <FilterInput
                  type={type}
                  field={field}
                  value={filteredVal}
                  condition={filteredCond}
                  onFilterChange={handleFilterInputChange}
                />
              )}
              {type === "date" && (
                <DateFilterInput
                  field={field}
                  value={filteredVal}
                  condition={filteredCond}
                  onFilterChange={handleFilterInputChange}
                />
              )}
              {type === "options" && (
                <MultiSelectFilter
                  field={field}
                  options={options}
                  value={filteredVal}
                  onFilterChange={handleFilterInputChange}
                />
              )}
            </Grid>
          </Box>
        );
      })}
    </Grid>
  );

  return (
    <Grid
      container
      flexDirection="column"
      boxShadow={3}
      sx={{
        width: "100%",
        minWidth: "20vw",
        bgcolor: "background.paper",
        padding: "8px",
      }}
    >
      {filterPanelHeader()}
      {filterPanelContent()}
      {filterPanelFooter()}
    </Grid>
  );
};
