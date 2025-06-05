import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import {
  serializeTableFiltersToUrl,
  deserializeTableFiltersFromUrl,
} from "./utils/urlUtils";
import { setFilters } from "./redux/tableFilterSlice";
import { TableContainer } from "./components/Table/TableContainer";

export const App = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const activeTableFilters = useSelector((state) => state.tableFilters);

  useEffect(() => {
    serializeTableFiltersToUrl(activeTableFilters, navigate);
  }, [activeTableFilters, navigate]);

  useEffect(() => {
    const initialFiltersFromUrl = deserializeTableFiltersFromUrl(location);
    dispatch(setFilters(initialFiltersFromUrl));
  }, []);

  return <TableContainer />;
};
