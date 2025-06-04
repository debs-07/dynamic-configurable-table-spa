# Dynamic Configurable Table SPA

A Single Page Application (SPA) built with ReactJS, Redux, and Material-UI, featuring a **dynamic, configurable data table** driven by JSON configuration files. The table supports **column visibility toggling, multi-condition filtering, shareable views via URL, and in-place cell editing**, with a responsive UI.

---

## Setup Instructions

- **Clone the Repository**: `git clone https://github.com/debs-07/dynamic-configurable-table-spa.git `
- **Navigate to the Project Directory**: `cd dynamic-table `
- **Install Dependencies**: `pnpm install `
- **Run the Development Server**: `pnpm dev ` The app will be available at `http://localhost:5173`

---

## Usage Guide

- **Column Configuration**: The table structure is defined by `columns.json`, specifying column properties like `displayName`, `key`, `type`, and `visible`.
- **Data Source**: Table data is loaded from `data.json` and rendered dynamically.
- **Column Visibility**: Toggle column visibility via the "**Manage Columns**" button, with preferences stored in `sessionStorage`.
- **Filtering**: Use the "**Filters**" panel to apply multi-condition filters (e.g., `equals`, `contains`, `greater than`) on columns. Filters update in real-time and can be reset.
- **Shareable Views**: Active filters and column visibility are serialized to the URL for sharing. Opening a shared link restores the view.
- **Editable Cells**: Edit cells in-place (text for strings/numbers, date pickers for dates, dropdowns for options). Changes persist in Redux state during the session.
- **Responsive Design**: The UI adapts to different screen sizes using Material-UI's responsive components.

---

## Implementation Approach

- **Tech Stack**: ReactJS for UI, Redux Toolkit for state management, Material-UI for components, and Vite for fast development and build.
- **State Management**: Redux slices manage table columns (`tableColumnsSlice`), rows (`tableRowsSlice`), and filters (`tableFilterSlice`). RTK Query fetches JSON data (`tableDataApiSlice`).
- **Dynamic Rendering**: The `DataGrid` from `@mui/x-data-grid` renders the table based on JSON configs. Columns are filtered and mapped dynamically (`getDataGridColumns`).
- **Filtering**: A custom `filterData` utility applies filters based on column types and conditions. Filters are stored in Redux and serialized to the URL (`urlUtils`).
- **Column Visibility**: Toggled via `TableColumnVisibilityManager`, with state persisted in `sessionStorage`.
- **Responsive UI**: Material-UI's `useMediaQuery` adjusts column widths for small screens.
- **Editable Cells**: `DataGrid` supports in-place editing, with updates dispatched to Redux (`updateTableRow`).
- **Shareable State**: URL serialization/deserialization (`serializeTableFiltersToUrl`, `deserializeTableFiltersFromUrl`) enables view sharing.

---

## Extra Features

- **Real-Time Filtering**: Filters update the table instantly without requiring manual submission.
- **Custom Filter Inputs**: Specialized inputs for each column type (e.g., `DateFilterInput` for dates, `MultiSelectFilter` for options).
- **Smooth UX**: Click-away listeners close filter/column panels, and buttons toggle between outlined and contained states for clarity.
- **Error Handling**: Graceful handling of empty or invalid JSON data via Redux Toolkit Query.

---

## Project Structure

- `src/App.jsx`: Main app component, handling URL serialization and filter initialization.
- `src/components/Table/`: Core table components (`TableContainer`, `TableToolbar`, `TableFilterPanel`, `TableColumnVisibilityManager`).
- `src/components/Inputs/`: Filter input components (`FilterInput`, `DateFilterInput`, `MultiSelectFilter`).
- `src/redux/`: Redux slices and API (`tableColumnsSlice`, `tableRowsSlice`, `tableFilterSlice`, `tableDataApiSlice`).
- `src/utils/`: Utilities for filtering (`filterData`) and URL handling (`urlUtils`).
- `columns.json` & `data.json`: JSON configs for columns and data.
