// Import from NPM
// -------------------------------------
import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { autoRehydrate, persistStore } from "redux-persist";
import localforage from "localforage";
import { composeWithDevTools } from "redux-devtools-extension";

// Import Store Setup
// -------------------------------------
import fakeLocalStorage from "./FakeLocalStorage";
import { Request } from "../communication/Request";
import { RootReducer } from "./root.reducer";

//-------------------------------------------------------------------------------------
// Proxy to figure out if we're in an incompatible environment for localForage
// since redux-persist doesn't play nice when localForage fails to start
//-------------------------------------------------------------------------------------
let enableLocalForage = true;
try {
    localStorage.setItem("__u", "u");
} catch (e) {
    enableLocalForage = false;
}
//-------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------
// Create your app's store
//-------------------------------------------------------------------------------------
const Store = composeWithDevTools(
    applyMiddleware(thunkMiddleware.withExtraArgument(Request)),
    autoRehydrate()
    // ... add additional middleware here (router, etc.)
)(createStore)(RootReducer);
//-------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------
// Persist the states of the whitelisted data trees in localForage if available,
// else in fakeLocalStorage
//-------------------------------------------------------------------------------------
const persistStoreConfig = {
    whitelist: ["license", "auth", "simParams", "questions","opsRecords"],
    storage: enableLocalForage ? localforage : fakeLocalStorage
};
//-------------------------------------------------------------------------------------

export { Store, persistStoreConfig, persistStore };
