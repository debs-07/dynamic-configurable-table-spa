export const serializeTableFiltersToUrl = (filters, navigate) => {
  const params = new URLSearchParams();

  if (filters.length) params.set("filters", JSON.stringify(filters));
  navigate(`/?${params}`, { replace: true });
};

export const deserializeTableFiltersFromUrl = (location) => {
  const params = new URLSearchParams(location.search);

  const filters = params.get("filters");
  return filters ? JSON.parse(filters) : [];
};
