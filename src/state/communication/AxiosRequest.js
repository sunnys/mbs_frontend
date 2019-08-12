// Import from NPM
// -------------------------------------
import axios from "axios";
import _ from "lodash";
import localforage from "localforage";
import SimpleCrypto from "simple-crypto-js";
import { hashHistory } from "react-router";
// Import App Configuration and Setup
// -------------------------------------
import { getAppConfig } from "./../../config/client.config";

// Import App Actions and Reduxers
// -------------------------------------
import { Store } from "./../../state/storage/app.store";
import { LOGOUT } from "../authentication/redux/Authentication.action.react";
class AxiosRequest {
    static assetHelpers = {
        fileSystem: null,
        zip: null
    };
    // static _setUpAssetHelpers(fileSystem, zip) {
    // 	return new Promise((resolve, reject) => {
    // 		if (fileSystem) {
    // 			this.fileSystem = fileSystem;
    // 		}
    // 		if (zip) {
    // 			this.zip = zip;
    // 		}
    // 		if (!this.zip) {
    // 			this.zip = window.zip ? window.zip : null;
    // 		}
    // 		if (fileSystem) {
    // 			this.fileSystem = fileSystem;
    // 		}
    // 		if (!this.fileSystem) {
    // 			resolve();
    // 			// this.fileSystem = window.requestFileSystem
    // 			// 	? window.requestFileSystem(
    // 			// 			window.LocalFileSystem.PERSISTENT,
    // 			// 			0,
    // 			// 			fs => {
    // 			// 				this.fileSystem = fs;
    // 			// 				resolve();
    // 			// 			},
    // 			// 			reject
    // 			// 	  )
    // 			// 	: null;
    // 		} else {
    // 			console.error('The filesystem cannot be connected.');
    // 			reject('The filesystem cannot be connected.');
    // 		}
    // 	});
    // }
    static setDefaults() {
        axios.defaults.baseURL = getAppConfig().apiUrls.apiUrl;
        axios.defaults.timeout = 120000; // This is optimal for all API requests
        axios.defaults.maxRedirects = 5;
        axios.defaults.transformRequest = [
            function(data, headers) {
                // If the POST|PUT|PATCH call data is not stringified, the stringyfy them. If it is formdata, send it as it is.
                if (data) {
                    let formData = data;
                    let isStringified = _.isString(formData);
                    // If data is not strigified and not of type formdata, then stringify before sending.
                    let isFormData =
                        formData.toString().indexOf("FormData") > -1;
                    if (data && !isStringified && !isFormData) {
                        data = JSON.stringify(data);
                    }
                    // If you sending data in body, the header has to be type application/json
                    if (isStringified && !isFormData) {
                        headers.post["Content-Type"] = "application/json";
                        headers.patch["Content-Type"] = "application/json";
                    }
                }
                return data;
            }
        ];
        return Promise.resolve(0);
    }
    // This is to handle refresh or app close conditions, where headers of axios are reseted.
    static checkAndSetTokenForRequest() {
        // Check whether axios headers contains access token, if present then that what we wanted to do.
        if (!axios.defaults.headers.common["access-token"]) {
            return this.getTokenHeadersFromLocalStore().then(tokenHash => {
                return this.setTokenForNextRequestFromLocalStore(tokenHash);
            });
        } else {
            // Token already Present
            return Promise.resolve(0);
        }
    }

    static fetch(path, data, domain = this.apiUrl) {
        let methodData = _.merge({}, data, { url: path });
        // Fetch JS backward Compatibility
        if (data && data.body) {
            methodData.data = methodData.body;
        }
        // Fetch JS backward Compatibility
        if (data && data.credentials && data.credentials === "include") {
            methodData.withCredentials = true;
        }
        return (
            Promise.all([this.setDefaults(), this.checkAndSetTokenForRequest()])
                .then(responses => {
                    return this.checkForExpiry(path)
                        .then(response => {
                            return axios
                                .request(methodData)
                                .then(response => {
                                    const headers = response.headers;
                                    this.setTokenHeadersForNextRequest(
                                        headers["access-token"],
                                        headers["client"],
                                        headers["expiry"],
                                        headers["uid"],
                                        headers["token-type"]
                                    );
                                    return {
                                        json: function() {
                                            return Promise.resolve(
                                                response.data
                                            );
                                        },
                                        blob: function() {
                                            return Promise.resolve(
                                                response.data
                                            );
                                        },
                                        ok: true
                                    };
                                })
                                .catch(error => {
                                    return this.errorCatching(error);
                                });
                        })
                        .catch(error => {
                            if (error.response) {
                                return Promise.reject(error);
                            } else {
                                // handle expired tokens
                                this.logoutAndResetToken();
                            }
                        });
                })
                // This will always be resoled so no need of catch handling.
                .catch(error => {
                    if (error.response) {
                        return Promise.reject(error);
                    } else {
                        console.log(error);
                    }
                })
        );
    }

    static setTokenHeadersForNextRequest(
        token,
        client,
        expiry,
        uid,
        tokenType = "Bearer"
    ) {
        if (token && client && expiry && uid && tokenType) {
            const tokenHash = {
                "access-token": token,
                "token-type": tokenType,
                expiry: expiry,
                client: client,
                uid: uid
            };
            axios.defaults.headers.common = {
                ...axios.defaults.headers.common,
                ...tokenHash
            };
            this.setTokenHeadersInLocalStore(tokenHash);
            Promise.resolve(axios.defaults.headers.common);
        } /*else {
			let error = new Error('Could not fetch headers from the request');
			Promise.reject(error);
		}*/
    }

    static setTokenForNextRequestFromLocalStore(tokenHash) {
        if (
            tokenHash["access-token"] &&
            tokenHash["token-type"] &&
            tokenHash["expiry"] &&
            tokenHash["client"] &&
            tokenHash["uid"]
        ) {
            return Promise.resolve(
                (axios.defaults.headers.common = {
                    ...axios.defaults.headers.common,
                    ...tokenHash
                })
            );
        } else {
            return Promise.resolve("No Token Set");
        }
    }

    static setTokenHeadersInLocalStore(tokenHash) {
        const stringyfiedTokenHashEncoded = JSON.stringify(tokenHash);
        const simpleCrypto = new SimpleCrypto(getAppConfig().secretKey);
        const encryptedValue = simpleCrypto.encrypt(
            stringyfiedTokenHashEncoded
        );
        localforage.setItem("tokenHash", encryptedValue);
    }

    static getTokenHeadersFromLocalStore() {
        return localforage
            .getItem("tokenHash")
            .then(stringyfiedTokenHashEncoded => {
                if (stringyfiedTokenHashEncoded) {
                    const simpleCrypto = new SimpleCrypto(
                        getAppConfig().secretKey
                    );
                    const decryptedValue = simpleCrypto.decrypt(
                        stringyfiedTokenHashEncoded
                    );
                    const tokenValue = JSON.parse(decryptedValue);
                    return tokenValue;
                } else {
                    // If LocalStore Doesn't have any token hash(generally in initial app start), retrun blank hash.
                    return {};
                }
            });
    }
    // Backward compatibility
    static getToken() {
        return this.getTokenHeadersFromLocalStore();
    }
    static resolveURL(url, domain = undefined) {
        let baseURL = null;
        // To handle case of if url or file access protocol, make the base url as blank.
        if (
            _.startsWith(url, "http://") ||
            _.startsWith(url, "https://") ||
            _.startsWith(url, "file://")
        ) {
            baseURL = "";
        } else {
            if (
                (domain && _.startsWith(domain, "http://")) ||
                _.startsWith(domain, "https://")
            ) {
                baseURL = domain;
            } else {
                baseURL = getAppConfig().apiUrls.apiUrl;
            }
        }
        axios.defaults.baseURL = baseURL;
        return Promise.resolve(url);
    }

    static resetToken() {
        return localforage.removeItem("tokenHash", null).then(() => {
            axios.defaults.headers.common = {
                Accept: "application/json, text/plain, */*"
            };
            return 0;
        });
    }

    static checkForExpiry(url) {
        const configUrl = getAppConfig().endpoints;
        if (
            url === configUrl.emailSignInPath ||
            url === configUrl.emailForgotPasswPath ||
            url === configUrl.wsFedLogin ||
            url === configUrl.omniauthGoogle ||
            url === configUrl.omniauthfacebook ||
            url === configUrl.ticket ||
            url === configUrl.emailSignInPathBypass ||
            url === configUrl.emailRegistrationPath ||
            url === configUrl.logContactPath ||
            url === configUrl.simulationResultPath
        ) {
            return Promise.resolve(0);
        } else {
            let expiry = axios.defaults.headers.common.expiry;
            const timestamp = _.now() / 1000;
            if (expiry) {
                if (timestamp < _.parseInt(expiry)) return Promise.resolve(0);
                else return Promise.reject(0);
            } else {
                return this.getTokenHeadersFromLocalStore().then(tokenHash => {
                    if (tokenHash.expiry) {
                        const timestamp = _.now() / 1000;
                        if (timestamp < _.parseInt(expiry))
                            return Promise.resolve(0);
                        else return Promise.reject(0);
                    } else {
                        return Promise.reject(0);
                    }
                });
            }
        }
    }

    static logoutAndResetToken() {
        const logoutPath = getAppConfig().endpoints.signOutPath;
        return axios
            .request(logoutPath, {
                method: "POST",
                body: ""
            })
            .then(() => {
                return this.resetToken().then(() => {
                    return Promise.resolve(
                        Store.dispatch({ type: LOGOUT, status: "success" })
                    ).then(() => {
                        const loginPath = getAppConfig().auth.routes.login;
                        hashHistory.push({
                            pathname: loginPath,
                            query: {
                                message: ["You need to sign in to continue"],
                                messageType: 2
                            }
                        });
                    });
                });
            })
            .catch(() => {
                return this.resetToken().then(() => {
                    return Promise.resolve(
                        Store.dispatch({ type: LOGOUT, status: "success" })
                    ).then(() => {
                        const loginPath = getAppConfig().auth.routes.login;
                        hashHistory.push({
                            pathname: loginPath,
                            query: {
                                message: ["You need to sign in to continue"],
                                messageType: 2
                            }
                        });
                    });
                });
            });
    }
    static getFetchAsseyOptions() {
        let options = {
            ...axios.defaults,
            ...{ responseType: "blob", Accept: "application/octet-stream" }
        };
        return Promise.resolve(options);
    }

    static errorCatching(error) {
        // console.log(error.response);
        // console.log(error.request);
        // console.log(error.message);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
            // console.log(error.config);
            const config = getAppConfig();
            const serverBase = config.apiUrls.apiUrl;
            const serevrLoginPath =
                serverBase + config.endpoints.emailSignInPath;
            const serevrLogoutPath = serverBase + config.endpoints.signOutPath;
            const isServerLoginRequest = error.config.url === serevrLoginPath;
            const isServerLogoutRequest = error.config.url === serevrLogoutPath;
            let exceptionError = new Error(error.response.statusText);
            exceptionError.response = error.response.data;
            exceptionError.errors = error.response.data.errors;
            if (error.response.status === 401) {
                if (!(isServerLoginRequest || isServerLogoutRequest)) {
                    return this.logoutAndResetToken().then(() => {
                        return Promise.reject(exceptionError);
                    });
                } else {
                    return Promise.reject(exceptionError);
                }
            } else {
                return Promise.reject(exceptionError);
            }
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            // console.log(error.request);
            let exceptionError = new Error("Server Not Responded");
            exceptionError.response = "Server Not Responded";
            exceptionError.errors = [
                "The Request failed. Please make sure you are connected to Internet"
            ];
            return Promise.reject(exceptionError);
        } else {
            // Something happened in setting up the request that triggered an Error
            let exceptionError = new Error(error.message);
            exceptionError.response = error.message;
            exceptionError.errors = [error.message];
            return Promise.reject(exceptionError);
        }
        // console.log(error.config);
    }

    static fetchFile(path, data) {
        return Promise.all([this.setDefaults(), this.getFetchAsseyOptions()])
            .then(responses => {
                let methodData = _.merge({}, data, { url: path });
                if (data && data.body) {
                    methodData.data = methodData.body;
                }
                let options = { ...responses[1], ...methodData };
                return axios
                    .request(options)
                    .then(response => {
                        const headers = response.headers;
                        this.setTokenHeadersForNextRequest(
                            headers["access-token"],
                            headers["client"],
                            headers["expiry"],
                            headers["uid"],
                            headers["token-type"]
                        );
                        return response.data;
                    })
                    .catch(error => {
                        return this.errorCatching(error);
                    });
            })
            .catch(error => {
                // console.log(error)
                // console.log(error.response)
                if (error.response) {
                    return Promise.reject(error);
                } else {
                    // console.log(error)
                    // console.log(error.message)
                    let exceptionError = new Error(error.message);
                    exceptionError.response = error.message;
                    exceptionError.errors = [error.message];
                    return Promise.reject(exceptionError);
                }
            });
    }
}
window.AxiosRequest = AxiosRequest;
window.axios = axios;
window.localforage = localforage;
export { AxiosRequest };
