import { Provider } from "react-redux";

import { App } from "./App";
import { store } from "./store";
import { BrowserRouter } from "react-router-dom";

export const Providers = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
};
