import {
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";

const filterConditionsMap = {
  string: ["equals", "contains"],
  number: ["equals", "greater than", "less than"],
};

export const FilterInput = ({
  type,
  value,
  condition,
  field,
  onFilterChange,
}) => {
  return (
    <Grid
      container
      flexDirection="row"
      spacing={2}
    >
      <Grid size={7}>
        <TextField
          fullWidth
          size="small"
          type={type}
          name={field}
          value={value ?? ""}
          variant="outlined"
          onChange={({ target: { value } }) =>
            onFilterChange(field, value, "value")
          }
          sx={{
            "& .MuiInputBase-input": {
              padding: "2% 3%",
            },
          }}
        />
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
          {filterConditionsMap[type].map((item) => (
            <MenuItem value={item}>{item}</MenuItem>
          ))}
        </Select>
      </Grid>
    </Grid>
  );
};
