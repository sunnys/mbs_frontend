import _ from "lodash";
import { AppConfig } from "./../../../config/app.config";

/*
 * Actions
 */
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SESSION = "SESSION";
export const FORGOTPASSW = "FORGOTPASSW";
export const OMNIAUTHLOGIN = "OMNIAUTHLOGIN";
export const UPDATE_CONFIG = "UPDATE_CONFIG";
export const GET_LICENSE = "GET_LICENSE";
export const ACCEPT_COOKIES = "ACCEPT_COOKIES";

/*
 * Action Creators
 */

function _login(status, err, data) {
    return {
        type: LOGIN,
        status,
        err,
        data
    };
}

function _logout(status, err, data) {
    return {
        type: LOGOUT,
        status,
        err,
        data
    };
}

function _session(status, err, data) {
    return {
        type: SESSION,
        status,
        err,
        data
    };
}

function _omniauthLogin(status, err, data) {
    return {
        type: OMNIAUTHLOGIN,
        status,
        err,
        data
    };
}
function _updateConfig(status, err, data) {
    return {
        type: UPDATE_CONFIG,
        status,
        err,
        data
    };
}
function _getLicense(status, err, data) {
    return {
        type: GET_LICENSE,
        status,
        err,
        data
    };
}

export const preprocessLoginDetails = (firstField, passwordField) => {
    let processedFirstField = _.chain(firstField)
        .trim()
        .toLower()
        .value();
    const processedPasswordField = _.chain(passwordField)
        .split(" ")
        .join("")
        .value();

    return {
        processedFirstField,
        processedPasswordField
    };
};

export const validateLoginDetails = (firstField, firstFieldType) => {
    let errorMessage = null;
    if (
        firstFieldType &&
        firstFieldType === "email" &&
        !_.includes(firstField, "@")
    ) {
        errorMessage =
            "Email is invalid format, please check the email you have entered.";
    }
    return errorMessage;
};

// function login(firstField, password, apiURL) {
//     return (dispatch, getState, Request) => {
//         // let formData = new FormData();
//         let loginDetails = preprocessLoginDetails(firstField, password);
//         const validateLoginDetail = validateLoginDetails(firstField, "email");
//         if (!validateLoginDetail) {
//             // formData.append("email", loginDetails.processedFirstField);
//             // formData.append("password", loginDetails.processedPasswordField);
//             const loginPath = AppConfig.endpoints.emailSignInPath;
//             var postData = {
//                 email: loginDetails.processedFirstField,
//                 password: loginDetails.processedPasswordField
//               };

//             let axiosConfig = {
//                 headers: {
//                     'Content-Type': 'application/json;charset=UTF-8'
//                 }
//             };
//             let url = "http://localhost:3000" + loginPath;
//             // return Request.fetch(
//             //     loginPath,
//             //     {
//             //         method: "POST",
//             //         body: formData
//             //     },
//             //     apiURL
//             // )
//             return axios.post(url, postData, axiosConfig)
//                 .then(response => {
//                     return response;
//                 })
//                 .then(userData => {
//                     return dispatch(
//                         _login("success", null, {
//                             id: userData.data.id,
//                             email: userData.data.email//,
//                             // uid: userData.data.uid,
//                             // provider: userData.data.provider,
//                             // username: userData.data.username,
//                             // first_name: userData.data.first_name,
//                             // last_name: userData.data.last_name,
//                             // admin: userData.data.admin,
//                             // system_generated: userData.data.system_generated,
//                             // total_online_time: userData.data.total_online_time,
//                             // total_first_online_time:
//                             //     userData.data.total_first_online_time,
//                             // user_active: userData.data.user_active,
//                             // role_select: userData.data.role_select,
//                             // isUserLoggedIn: userData.data.isUserLoggedIn,
//                             // license: userData.data.license,
//                             // client: {
//                             //     id: userData.data.client.id,
//                             //     name: userData.data.client.name,
//                             //     appConfiguration:
//                             //         userData.data.client.app_configuration
//                             // }
//                         })
//                     );
//                 })
//                 .catch(err => {
//                     dispatch(_login("error", err, null));
//                     return Promise.reject(err);
//                 });
//         } else {
//             return Promise.resolve({
//                 status: 500,
//                 errors: [validateLoginDetail]
//             });
//         }
//     };
// }

function register(name, email, password, confirm) {
    return (dispatch, getState, Request) => {
        const emailRegistrationPath = AppConfig.endpoints.emailRegistrationPath;
        let formData = new FormData();
        let hasError = false;
        let errorText = "";
        if (hasError) {
            return Promise.reject(
                dispatch(
                    _login(
                        "error",
                        {
                            response: {
                                status: "error",
                                err: {
                                    errors: {
                                        full_messages: [errorText]
                                    }
                                }
                            }
                        },
                        null
                    )
                )
            );
        } else {
            formData.append(
                "email",
                _.chain(email)
                    .trim()
                    .toLower()
                    .value()
            );
            formData.append("password", password);
            formData.append("password_confirmation", password);
            return Request.fetch(emailRegistrationPath, {
                method: "POST",
                body: formData
            })
                .then(response => {
                    return response.json();
                })

                .then(userData => {
                    userData = userData.data;
                    return dispatch(
                        _login("success", null, {
                            id: userData.id,
                            email: userData.email,
                            uid: userData.uid,
                            provider: userData.provider
                        })
                    );
                })
                .catch(err => {
                    return dispatch(_login("error", err, null));
                });
        }
    };
}

function login(firstField, password, apiURL) {
    return (dispatch, getState, Request) => {
        let formData = new FormData();
        let loginDetails = preprocessLoginDetails(firstField, password);
        const validateLoginDetail = validateLoginDetails(firstField, "email");
        if (!validateLoginDetail) {
            formData.append("email", loginDetails.processedFirstField);
            formData.append("password", loginDetails.processedPasswordField);
            const loginPath = AppConfig.endpoints.emailSignInPath;
            return Request.fetch(
                loginPath,
                {
                    method: "POST",
                    body: formData
                },
                apiURL
            )
                .then(response => {
                    return response.json();
                })
                .then(userData => {
                    return dispatch(
                        _login("success", null, {
                            id: userData.data.id,
                            email: userData.data.email,
                            uid: userData.data.uid,
                            provider: userData.data.provider
                            // username: userData.data.username,
                            // first_name: userData.data.first_name,
                            // last_name: userData.data.last_name,
                            // admin: userData.data.admin,
                            // system_generated: userData.data.system_generated,
                            // total_online_time: userData.data.total_online_time,
                            // total_first_online_time:
                            //     userData.data.total_first_online_time,
                            // user_active: userData.data.user_active,
                            // role_select: userData.data.role_select,
                            // isUserLoggedIn: userData.data.isUserLoggedIn,
                            // license: userData.data.license,
                            // client: {
                            //     id: userData.data.client.id,
                            //     name: userData.data.client.name,
                            //     appConfiguration:
                            //         userData.data.client.app_configuration
                            // }
                        })
                    );
                })
                .catch(err => {
                    dispatch(_login("error", err, null));
                    return Promise.reject(err);
                });
        } else {
            return Promise.resolve({
                status: 500,
                errors: [validateLoginDetail]
            });
        }
    };
}

function bypassLogin() {
    return (dispatch, getState, Request) => {
        const loginPath = AppConfig.endpoints.emailSignInPathBypass;
        let formData = new FormData();
        return Request.fetch(loginPath, {
            method: "POST",
            body: formData,
            credentials: "include"
        })
            .then(response => {
                return response.json();
            })
            .then(userData => {
                return dispatch(
                    _login("success", null, {
                        id: userData.data.id,
                        email: userData.data.email,
                        uid: userData.data.uid,
                        provider: userData.data.provider,
                        username: userData.data.username,
                        first_name: userData.data.first_name,
                        last_name: userData.data.last_name,
                        admin: userData.data.admin,
                        system_generated: userData.data.system_generated,
                        total_online_time: userData.data.total_online_time,
                        total_first_online_time:
                            userData.data.total_first_online_time,
                        user_active: userData.data.user_active,
                        role_select: userData.data.role_select,
                        isUserLoggedIn: userData.data.isUserLoggedIn,
                        client: {
                            name: userData.data.client.name,
                            appConfiguration:
                                userData.data.client.app_configuration
                        }
                    })
                );
            })
            .catch(err => {
                dispatch(_login("error", err, null));
                return Promise.reject(err);
            });
    };
}

function forgotPassword(email) {
    return (dispatch, getState, Request) => {
        let formData = new FormData();
        email = _.chain(email)
            .trim()
            .toLower()
            .value();
        formData.append("email", email);
        formData.append("redirect_url", "/login");
        const passwChangePath = AppConfig.endpoints.emailForgotPasswPath;
        return Request.fetch(passwChangePath, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: formData
        })
            .then(response => {
                return response.json();
            })
            .catch(err => {
                return Promise.reject(err);
            });
    };
}

function logout() {
    return (dispatch, getState, Request) => {
        dispatch(_logout("fetching"));
        const logoutPath = AppConfig.endpoints.signOutPath;
        return Request.fetch(logoutPath, {
            method: "POST",
            body: ""
        })
            .then(() => {
                Request.resetToken();
            })
            .then(() => {
                return dispatch(_logout("success"));
            })
            .catch(err => {
                // If some errors still log him out of application
                Request.resetToken();
                return dispatch(_logout("error", err));
            });
    };
}

function session() {
    return (dispatch, getState, Request) => {
        return Promise.resolve(dispatch(_session()));
    };
}

function omniAuthLogin(userDetail) {
    return (dispatch, getState, Request) => {
        const accessToken = userDetail["access_token"];
        Request.setToken(
            accessToken["access-token"],
            accessToken.client,
            accessToken.expiry,
            accessToken["token-type"],
            accessToken.uid
        );
        return Promise.resolve(
            dispatch(
                _omniauthLogin(
                    "success",
                    null,
                    _.omit(userDetail, "access-token")
                )
            )
        );
    };
}

function updateConfig(configHash) {
    return (dispatch, getState, Request) => {
        const updateConfigPath = AppConfig.endpoints.updateConfigPath.replace(
            ":id",
            getState().auth.user.client.id
        );
        return Promise.resolve(
            dispatch(
                _updateConfig("success", null, {
                    partConfig: configHash
                })
            )
        ).then(() => {
            return Request.fetch(updateConfigPath, {
                method: "PATCH",
                body: JSON.stringify({
                    client: {
                        name: getState().auth.user.client.name,
                        app_configuration: configHash
                    }
                })
            })
                .then(response => {
                    return response.json();
                })
                .then(resp => {})
                .catch(err => {
                    console.log(err);
                });
        });
    };
}

function getLicense() {
    return (dispatch, getState, Request) => {
        const getLicensePath = AppConfig.endpoints.getLicensePath.replace(
            ":id",
            getState().auth.user.license.id
        );

        return Request.fetch(getLicensePath)
            .then(response => {
                return response.json();
            })
            .then(data => {
                return Promise.resolve(
                    dispatch(
                        _getLicense("success", null, {
                            license: data
                        })
                    )
                );
            })
            .catch(err => {
                console.log(err);
            });
    };
}
class AuthenticationAction {
    static login = login;
    static register = register;
    static logout = logout;
    static session = session;
    static forgotPassword = forgotPassword;
    static omniAuthLogin = omniAuthLogin;
    static bypassLogin = bypassLogin;
    static updateConfig = updateConfig;
    static getLicense = getLicense;
}

export { AuthenticationAction };
