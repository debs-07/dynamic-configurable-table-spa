import { useRef, useState } from "react";
import { Box, Button, ClickAwayListener, Grid, Popper } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";

import { TableFilterPanel } from "./TableFilterPanel";
import { TableColumnVisibilityManager } from "./TableColumnVisibilityManager";

export const TableToolbar = () => {
  const filterButtonRef = useRef(null);
  const columnButtonRef = useRef(null);

  const [popper, setPopper] = useState(0);

  const handleTogglePanel = (key) => setPopper((p) => (p === key ? 0 : key));

  const handleClickAway = () => {
    if (filterButtonRef.current || columnButtonRef.current) return;
    setPopper(0);
  };

  return (
    <Grid
      size={12}
      container
      justifyContent="flex-end"
      spacing={1}
      sx={{
        padding: "0.5% 0%",
      }}
    >
      <ClickAwayListener onClickAway={handleClickAway}>
        <Box>
          <Button
            ref={filterButtonRef}
            startIcon={<TuneIcon />}
            sx={{ textTransform: "none" }}
            onClick={() => handleTogglePanel(1)}
            variant={popper === 1 ? "contained" : "outlined"}
          >
            Filters
          </Button>
          <Popper
            open={popper === 1}
            placement="bottom-start"
            anchorEl={filterButtonRef.current}
          >
            <TableFilterPanel />
          </Popper>
        </Box>
      </ClickAwayListener>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Box>
          <Button
            ref={columnButtonRef}
            sx={{ textTransform: "none" }}
            startIcon={<ViewColumnIcon />}
            onClick={() => handleTogglePanel(2)}
            variant={popper === 2 ? "contained" : "outlined"}
          >
            Manage Columns
          </Button>
          <Popper
            open={popper === 2}
            placement="bottom-start"
            anchorEl={columnButtonRef.current}
          >
            <TableColumnVisibilityManager />
          </Popper>
        </Box>
      </ClickAwayListener>
    </Grid>
  );
};
