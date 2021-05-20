import React from "react";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./services/store";
import { AppRouter } from "./services/routing/AppRouter";
import { CallCanonical } from "./services/seo/useCanonical";
import { AppMenu } from "./services/routing/Menu";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <AppMenu />
          <CallCanonical />
          <AppRouter />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
