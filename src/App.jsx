import { useDispatch, useSelector } from "react-redux";
import { TableContainer } from "./components/Table/TableContainer";
import { useEffect } from "react";
import {
  serializeTableFiltersToUrl,
  deserializeTableFiltersFromUrl,
} from "./utils/urlUtils";
import { useLocation, useNavigate } from "react-router-dom";
import { setFilters } from "./redux/tableFilterSlice";

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
