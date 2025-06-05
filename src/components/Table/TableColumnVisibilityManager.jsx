import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Checkbox,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import List from "@mui/material/List";

import { toggleColumnVisibility } from "@/redux/tableColumnsSlice";

export const TableColumnVisibilityManager = () => {
  const dispatch = useDispatch();
  const tableColumns = useSelector((state) => state?.tableColumns);

  const handleToggleColumnVisibility = (field) =>
    dispatch(toggleColumnVisibility(field));

  return (
    <Box
      boxShadow={3}
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
      <List
        dense
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      >
        {tableColumns.map(({ field, headerName, visible }) => (
          <ListItem
            dense
            key={field}
            disablePadding
            onClick={() => handleToggleColumnVisibility(field)}
          >
            <ListItemButton
              dense
              sx={{ paddingTop: 0, paddingBottom: 0 }}
            >
              <ListItemIcon sx={{ minWidth: 0 }}>
                <Checkbox
                  edge="start"
                  checked={visible}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText primary={headerName} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
