import { Box, Chip, MenuItem, OutlinedInput, Select } from "@mui/material";

export const MultiSelectFilter = ({
  field,
  value,
  options,
  onFilterChange,
}) => {
  return (
    <Select
      multiple
      name={field}
      value={value ?? []}
      input={
        <OutlinedInput
          fullWidth
          size="small"
        />
      }
      sx={{
        "& .MuiInputBase-input": {
          padding: "2% 3%",
        },
      }}
      renderValue={(selected) => (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {selected.map((value) => (
            <Chip
              key={value}
              label={value}
            />
          ))}
        </Box>
      )}
      onChange={({ target: { value } }) => {
        onFilterChange(field, value, "value");
      }}
    >
      {options.map((option) => (
        <MenuItem
          key={option}
          value={option}
        >
          {option}
        </MenuItem>
      ))}
    </Select>
  );
};
