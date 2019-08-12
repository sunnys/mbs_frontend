// Import from NPM
// -------------------------------------
import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

// Import Reducer Routes
// -------------------------------------
import { AuthenticationReducer } from "../authentication/redux/Authentication.reducer.react";
import { SimManagerReducer } from "app/simulation/redux/SimManager.reducer.react";
import { QuestionManagerReducer } from "app/simulation/redux/QuestionManager.reducer.react";

let RootReducer = combineReducers({
    auth: AuthenticationReducer,
    routing: routerReducer,
    simParams: SimManagerReducer,
    questions: QuestionManagerReducer
});

export { RootReducer };
