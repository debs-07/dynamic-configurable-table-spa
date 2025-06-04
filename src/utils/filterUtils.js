const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const filterData = (tableRows, columnDefinitions, activeFilters) => {
  return tableRows?.filter((row) => {
    return activeFilters.every((filter) => {
      const { condition, field, value: filterValue } = filter;

      if (!filterValue) return true;

      const columnDefinition = columnDefinitions.find(
        (col) => col.field === field
      );
      const cellValue = row[field];

      switch (columnDefinition.type) {
        case "string": {
          const cellStr = String(cellValue)?.toLowerCase();
          const filterStr = String(filterValue)?.toLowerCase();

          if (condition === "equals") return cellStr === filterStr;
          if (condition === "contains") return cellStr.includes(filterStr);

          break;
        }

        case "number":
          {
            const cellNum = Number(cellValue);
            const filterNum = Number(filterValue);

            if (condition === "equals") return cellNum === filterNum;
            if (condition === "greater than") return cellNum > filterNum;
            if (condition === "less than") return cellNum < filterNum;
          }

          break;

        case "date":
          {
            const cellDate = new Date(cellValue);
            const filterDate = new Date(filterValue);

            if (condition === "equals")
              return formatDate(cellDate) === formatDate(filterDate);
            if (condition === "before") return cellDate < filterDate;
            if (condition === "after") return cellDate > filterDate;
          }
          break;

        case "options":
          return filterValue.includes(cellValue);
      }

      return true;
    });
  });
};
