import _ from "lodash";
import { getAppConfig } from "./../../config/client.config";
import {
    apiUrls
} from "./../../config/configPanel/config.endpoints";
import localforage from "localforage";
import { hashHistory } from "react-router";
import SimpleCrypto from "simple-crypto-js";

class FetchRequest {
    static apiUrl = apiUrls.apiUrl;
    static token = null;
    static tokenHash = {};
    static speed = null;

    static fetch(path, data, domain = this.apiUrl) {
        let url = "";
        if (path.indexOf("http://") !== -1 || path.indexOf("file://") !== -1) {
            url = path;
        } else {
            url = domain + path;
        }

        let headers = {};

        if (data && data.body.toString().indexOf("FormData") === -1)
            // headers = { "Content-Type": "application/json", mode: "no-cors" };
            headers = { "Content-Type": "application/json" };
        return this.getToken().then(tokenHash => {
            headers = { ...headers, ...tokenHash };
            let defaults = {
                headers: headers
            };

            let config = _.merge({}, data, defaults);
            return fetch(url, config)
                .then(response => {
                    if (response.status >= 200 && response.status < 300) {
                        const expiry = response.headers.get("expiry");
                        const client = response.headers.get("client");
                        const token = response.headers.get("access-token");
                        const tokenType = response.headers.get("token-type");
                        const uid = response.headers.get("uid");
                        this.setToken(token, client, expiry, tokenType, uid);
                        return response;
                    } else if (response.status >= 401) {
                        return response.json().then(err => {
                            const token = response.headers.get("access-token");
                            if (
                                !token &&
                                !_.includes(
                                    [
                                        getAppConfig().auth.routes
                                            .unauthenticatedRoot,
                                        getAppConfig().auth.routes.helpDesk
                                    ],
                                    hashHistory.getCurrentLocation().pathname
                                )
                            ) {
                                hashHistory.replace({
                                    pathname: getAppConfig().auth.routes.logout,
                                    query: {
                                        message: err.errors,
                                        messageType: 2
                                    }
                                });
                            } else {
                                let error = new Error(response.statusText);
                                error.response = response;
                                error.errors = err.errors;
                                throw error;
                            }
                        });
                    } else {
                        return response.json().then(err => {
                            let error = new Error(response.statusText);
                            error.response = response;
                            error.errors = err.errors;
                            throw error;
                        });
                    }
                })
                .catch(err => {
                    let error;
                    if (!err.errors) {
                        error = new Error("Server Not Responded");
                        error.response = "Server Not Responded";
                        error.errors = [
                            "The Request failed. Please make sure you are connected to Internet"
                        ];
                        // TODO: Uncomment or chnage it if we find a plugin which work across everything
                        // notify.show(error.errors[0], 'error')
                    } else {
                        error = err;
                    }
                    throw error;
                });
        });
    }

    static resetToken() {
        this.token = null;
        this.tokenHash = {};
        localforage.removeItem("tokenHash", null);
    }

    static setToken(
        token,
        client = null,
        expiry = null,
        tokenType = "Bearer",
        uid
    ) {
        if (token) {
            // if (!this.token) {
            this.token = token;
            this.tokenHash = {
                "access-token": `${this.token}`,
                "token-type": "Bearer",
                expiry: expiry,
                client: client,
                uid: uid
            };
            // const stringyfiedTokenHashEncoded = btoa(
            // JSON.stringify(this.tokenHash)
            // );
            const stringyfiedTokenHashEncoded = JSON.stringify(this.tokenHash);
            // localforage.setItem("tokenHash", stringyfiedTokenHashEncoded);
            let simpleCrypto = new SimpleCrypto(getAppConfig().secretKey);
            let encryptedValue = simpleCrypto.encrypt(stringyfiedTokenHashEncoded)
            localforage.setItem("tokenHash", encryptedValue);
            // }
        }
    }

    static getToken() {
        let tokenValue = null;
        if (this.token) {
            tokenValue = this.tokenHash;
            return Promise.resolve(tokenValue);
        } else {
            return localforage
                .getItem("tokenHash")
                .then(stringyfiedTokenHashEncoded => {
                    // tokenValue = JSON.parse(atob(stringyfiedTokenHashEncoded));
                    let simpleCrypto = new SimpleCrypto(getAppConfig().secretKey);
                    let decryptedValue = simpleCrypto.decrypt(stringyfiedTokenHashEncoded)
                    tokenValue = JSON.parse(decryptedValue);
                    return tokenValue;
                })
                .catch(err => {
                    return {};
                });
        }
    }

    static getSpeed() {
        let startTime, endTime, fileSize, url;
        startTime = new Date().getTime();
        // #TODO make url on rails side to send file, public assests cannot be fetched from other domain
        url = getAppConfig().apiUrls.apiUrl + "/api/v1/get_favicon";
        return fetch(url, {})
            .then(response => {
                endTime = new Date().getTime();
                if (response.ok) {
                    return response.blob().then(blob => {
                        fileSize = blob.size;
                        const speed =
                            fileSize *
                            8 /
                            ((endTime - startTime) / 1000) /
                            1024;
                        return speed;
                    });
                } else {
                    return Promise.resolve(0);
                }
            })
            .catch(err => {
                console.log("[getSpeed] could not load file get_favicon");
                return Promise.resolve(0);
            });
    }
}

export { FetchRequest };
