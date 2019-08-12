import { Store } from "./../state/storage/app.store";
import { AppConfig } from "./app.config";
import _ from "lodash";

export const getAppConfig = () => {
    const initalState = AppConfig;
    let storeState = {};
    if (
        Store.getState().auth.user &&
        Store.getState().auth.user.client &&
        Store.getState().auth.user.client.appConfiguration
    ) {
        storeState =
            Store.getState().auth.user.client.appConfiguration || {};
    }
    const result = _.merge(initalState, storeState);
    return result;
};
