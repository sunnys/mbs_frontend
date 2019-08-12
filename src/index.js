// Import from NPM
// -------------------------------------
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

// Import App Configuration and Setup
// -------------------------------------
import { Store } from "state/storage/app.store";
import * as serviceWorker from './serviceWorker';
import "./index.css";

// Import App
// -------------------------------------
import App from "app/App";

ReactDOM.render(
    <Provider store={Store} key="provider">
        <App />
    </Provider>,
    document.getElementById("root")
);
serviceWorker.unregister();
// ServiceWorker.unregister();