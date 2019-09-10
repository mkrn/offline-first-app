import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/table/lib/css/table.css";

import { Toaster, Intent } from "@blueprintjs/core";

import { createStore, applyMiddleware, compose, Store } from "redux";
import reducer from "./reducers";

const { createOffline } = require("@redux-offline/redux-offline");
const config = require("@redux-offline/redux-offline/lib/defaults");

let store: Store;

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const toaster = Toaster.create();

const { middleware, enhanceReducer, enhanceStore } = createOffline({
  ...config,
  discard: (error: any, action: any, retries: number) => {
    const { response, status } = error;
    // Server is unreachable, should try again later
    if (!response || !status) return false;
    // There was an error, should trigger Rollback action and discard the request
    toaster.show({ message: response.message, intent: Intent.DANGER });
    if (status > 200) return true;
  },
  persistCallback: () => {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById("root")
    );
  }
});

store = createStore(
  enhanceReducer(reducer),
  {},
  composeEnhancers(enhanceStore, applyMiddleware(middleware))
);

serviceWorker.register();
