// Import from NPM
// -------------------------------------
import React from "react";
import localforage from "localforage";
import { Router, Route, hashHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import Loadable from "react-loadable";
import WebFont from "webfontloader";
import "semantic-ui-css/semantic.min.css";
import "./../config/configPanel/overrule.css";

// Import from Config
// -------------------------------------
import {
    Store,
    persistStore,
    persistStoreConfig
} from "./../state/storage/app.store";
import { getAppConfig } from "./../config/client.config";
import { AppConfig } from "./../config/app.config";

// Import Helpers
// -------------------------------------
import { Loading } from "./../globals/Loading.react";

const LoadableAuthenticationContainer = Loadable({
    loader: () =>
        import(
            "./../state/authentication/AuthenticationContainer.react" /* webpackChunkName: "authentication" */
        ),
    loading: Loading
});
const LoadableWelcome = Loadable({
    loader: () =>
        import(
            "./simulation/WelcomeContainer.react" /* webpackChunkName: "welcome" */
        ),
    loading: Loading
});
const LoadableSimulation = Loadable({
    loader: () =>
        import(
            "./simulation/SimulationContainer.react" /* webpackChunkName: "welcome" */
        ),
    loading: Loading
});
const LoadableSurvey = Loadable({
    loader: () =>
        import(
            "./simulation/SurveyContainer.react" /* webpackChunkName: "welcome" */
        ),
    loading: Loading
});
const LoadableResult = Loadable({
    loader: () =>
        import(
            "./simulation/ResultContainer.react" /* webpackChunkName: "welcome" */
        ),
    loading: Loading
});
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rehydrated: false
        };
        this.requireLogin = this.requireLogin.bind(this);
        this.alreadyLoggedIn = this.alreadyLoggedIn.bind(this);
        this.manageStore = window.manageStore = this.manageStore.bind(this);
        this.manageStore();
        WebFont.load(getAppConfig().fonts);
    }

    manageStore = purge => {
        if (purge === "purge") {
            persistStore(Store, persistStoreConfig).purge();
            localforage.removeItem("tokenHash");
        } else {
            persistStore(Store, persistStoreConfig, () => {
                let existing_user = window.localStorage.getItem(
                    "reduxPersist:auth"
                );
                if (existing_user) {
                    localforage.setItem("reduxPersist:auth", existing_user);
                }
                this.setState({ rehydrated: true });
            });
        }
    };

    requireLogin(nextState, replace, callback) {
        const unauthRoot = getAppConfig().auth.routes.unauthenticatedRoot;
        const auth = Store.getState().auth;
        if (!auth.isUserLoggedIn) {
            replace(unauthRoot);
        }
        callback();
    }

    alreadyLoggedIn(nextState, replace, callback) {
        const authRoot = AppConfig.auth.routes.authenticatedRoot;
        const auth = Store.getState().auth;
        if (auth.isUserLoggedIn) {
            replace(authRoot);
        }
        callback();
    }

    render() {
        let noOverflow = {
            // overflow: "hidden auto",
            height: "100vh"
        };
        let appStyle = {
            ...getAppConfig().appStyle,
            position: "relative",
            height: "100%",
            background: "inherit"
        };

        let returnValue = (
            <div style={noOverflow}>
                <div style={appStyle}>
                    <Router history={syncHistoryWithStore(hashHistory, Store)}>
                        <Route
                            path="/register"
                            component={LoadableAuthenticationContainer}
                            onEnter={this.alreadyLoggedIn}
                        />
                        <Route
                            path="/logout"
                            component={LoadableAuthenticationContainer}
                            onEnter={this.requireLogin}
                        />
                        <Route
                            path="/login"
                            component={LoadableAuthenticationContainer}
                            onEnter={this.alreadyLoggedIn}
                        />
                        <Route
                            path="/"
                            component={LoadableWelcome}
                            onEnter={this.requireLogin}
                        />
                        <Route
                            path="/simulation/:id"
                            component={LoadableSimulation}
                            onEnter={this.requireLogin}
                        />
                        <Route
                            path="/simulation_questions/:id"
                            component={LoadableSurvey}
                            onEnter={this.requireLogin}
                        />
                        <Route
                            path="/result"
                            component={LoadableResult}
                            onEnter={this.requireLogin}
                        />
                    </Router>
                </div>
            </div>
        );
        if (!this.state.rehydrated) {
            returnValue = <Loading />;
        }
        return returnValue;
    }
}

export default App;
