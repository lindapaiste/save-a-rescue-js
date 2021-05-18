import React from "react";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./services/store";
import { AppRouter } from "./services/routing/AppRouter";
import { CallCanonical } from "./services/seo/useCanonical";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <CallCanonical />
          <AppRouter />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
