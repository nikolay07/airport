import "./index.scss";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./store";
import SearchFlightsPage from "./flightBoard/components/SearchFlightsPage/SearchFlightsPage";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <SearchFlightsPage />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
