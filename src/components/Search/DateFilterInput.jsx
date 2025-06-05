import { Grid, MenuItem, OutlinedInput, Select } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export const DateFilterInput = ({
  field,
  value,
  condition,
  onFilterChange,
}) => {
  return (
    <Grid
      spacing={2}
      container
      flexDirection="row"
    >
      <Grid size={7}>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale="en-gb"
        >
          <DatePicker
            slotProps={{
              textField: {
                size: "small",
                sx: {
                  "& .MuiPickersInputBase-sectionsContainer": {
                    padding: "0px",
                  },
                  "& .MuiPickersInputBase-root": {
                    padding: "0% 3%",
                  },
                },
              },
            }}
            value={value ? dayjs(value) : null}
            name={field}
            onChange={(value) => onFilterChange(field, value?.$d, "value")}
            format="DD/MM/YYYY"
          />
        </LocalizationProvider>
      </Grid>
      <Grid size={5}>
        <Select
          value={condition}
          onChange={({ target: { value } }) =>
            onFilterChange(field, value, "condition")
          }
          fullWidth
          input={<OutlinedInput size="small" />}
          sx={{
            height: "100%",
            "& .MuiInputBase-input": {
              padding: "1% 3%",
            },
          }}
        >
          {["equals", "before", "after"].map((item) => (
            <MenuItem value={item}>{item}</MenuItem>
          ))}
        </Select>
      </Grid>
    </Grid>
  );
};
