import _ from "lodash";
import {
    LOGIN,
    LOGOUT,
    SESSION,
    OMNIAUTHLOGIN,
    UPDATE_CONFIG,
    GET_LICENSE,
    ACCEPT_COOKIES
} from "./Authentication.action.react";
// import {
//     ADD_DECK,
//     DELETE_DECKS
// } from "app/courseEditor/redux/FileEditor.action.react";
// import { DELETE_FOLDER } from "app/courseEditor/redux/FolderEditor.action.react";
// import {
//     ADD_LEARNERS,
//     DELETE_LEARNER
// } from "app/courseEditor/redux/LearnerManager.action.react";

import { REHYDRATE } from "redux-persist/constants";

const initialAuthState = {
    error: {},
    status: "",
    token: null,
    user: {
        license: {},
        client: {
            appConfiguration: {}
        }
    },
    isUserLoggedIn: false,
    sessions: []
};

const AuthenticationReducer = (state = initialAuthState, action) => {
    let newState;
    switch (action.type) {
        case REHYDRATE:
            let auth = action.payload.auth;
            if (auth) {
                return { ...state, ...auth };
            } else {
                return state;
            }
        case LOGIN:
            if (action.status === "authenticating") {
                return { ...state, status: action.status, error: {} };
            } else if (action.status === "success") {
                return {
                    ...state,
                    status: action.status,
                    user: {
                        ...action.data,
                        id: JSON.stringify(action.data.id)
                    },
                    isUserLoggedIn: true,
                    error: {}
                };
            } else if (action.status === "error")
                return { ...state, status: action.status, error: action.err };
            else {
                return state;
            }
        case LOGOUT:
            if (action.status === "authenticating") {
                return { ...state, status: action.status, error: {} };
            } else if (action.status === "success") {
                return {
                    ...state,
                    status: action.status,
                    user: null,
                    isUserLoggedIn: false,
                    error: {}
                };
            } else if (action.status === "error")
                return {
                    ...state,
                    status: action.status,
                    user: null,
                    isUserLoggedIn: false,
                    error: action.err
                };
            else {
                return state;
            }
        case SESSION:
            let sessions = [...state.sessions];
            let startTime = new Date().getTime();
            let sessionId = 0;
            const userId = JSON.stringify(state.user.id);
            if (sessions.length) {
                let lastSession = _.pullAt(sessions, sessions.length - 1);
                lastSession.isActive = false;
                lastSession.endTime = startTime;
                sessions.push(lastSession);
                sessionId = _.replace(lastSession.sessionId, userId, "");
            }
            let sessionData = {
                sessionId: userId + sessionId,
                userId: userId,
                startTime: startTime,
                isActive: true,
                endTime: undefined
            };
            sessions.push(sessionData);
            return { ...state, sessions: sessions };
        case OMNIAUTHLOGIN:
            if (action.status === "success") {
                return {
                    ...state,
                    status: action.status,
                    user: {
                        ...action.data,
                        id: JSON.stringify(action.data.id)
                    },
                    isUserLoggedIn: true,
                    error: {}
                };
            } else {
                return state;
            }
        case UPDATE_CONFIG:
            newState = _.cloneDeep(state);
            newState.user.client.appConfiguration = Object.assign(
                {},
                newState.user.client.appConfiguration,
                action.data.partConfig
            );
            return newState;
        case GET_LICENSE:
            newState = _.cloneDeep(state);
            newState.user.license = Object.assign(
                {},
                newState.user.license,
                action.data.license
            );
            return newState;
        // case DELETE_FOLDER:
        //     newState = _.cloneDeep(state);
        //     newState.user.license = Object.assign({}, newState.user.license, {
        //         usedSpace: Math.max(
        //             0,
        //             parseInt(
        //                 newState.user.license.usedSpace === null
        //                     ? 0
        //                     : newState.user.license.usedSpace,
        //                 0
        //             ) - action.data.size
        //         )
        //     });
        //     return newState;
        // case ADD_DECK:
        //     newState = _.cloneDeep(state);
        //     newState.user.license = Object.assign({}, newState.user.license, {
        //         usedSpace:
        //             parseInt(
        //                 newState.user.license.usedSpace === null
        //                     ? 0
        //                     : newState.user.license.usedSpace,
        //                 0
        //             ) + parseInt(action.data.size.split("k")[0], 0)
        //     });
        //     return newState;
        // case DELETE_DECKS:
        //     newState = _.cloneDeep(state);
        //     newState.user.license = Object.assign({}, newState.user.license, {
        //         usedSpace: Math.max(
        //             0,
        //             parseInt(
        //                 newState.user.license.usedSpace === null
        //                     ? 0
        //                     : newState.user.license.usedSpace,
        //                 0
        //             ) -
        //                 _.sum(
        //                     _.map(action.data.decks, deck => {
        //                         return parseInt(
        //                             deck.size === null
        //                                 ? 0
        //                                 : deck.size.split("k")[0],
        //                             0
        //                         );
        //                     })
        //                 )
        //         )
        //     });
        //     return newState;
        // case ADD_LEARNERS:
        //     newState = _.cloneDeep(state);
        //     newState.user.license = Object.assign({}, newState.user.license, {
        //         totalUsers:
        //             state.user.license === undefined ||
        //             state.user.license === null ||
        //             state.user.license.totalUsers === null ||
        //             state.user.license.totalUsers === undefined
        //                 ? 0
        //                 : state.user.license.totalUsers +
        //                   (action.data !== undefined &&
        //                   action.data !== null &&
        //                   action.data.learners !== undefined &&
        //                   action.data.learners !== null
        //                       ? action.data.learners.length
        //                       : 1)
        //     });
        //     return newState;
        // case DELETE_LEARNER:
        //     newState = _.cloneDeep(state);
        //     newState.user.license = Object.assign({}, newState.user.license, {
        //         totalUsers: Math.max(
        //             0,
        //             (state.user.license.totalUsers === null ||
        //             state.user.license.totalUsers === undefined
        //                 ? 0
        //                 : state.user.license.totalUsers) - 1
        //         )
        //     });
        //     return newState;
        case ACCEPT_COOKIES:
            if (action.status === "success") {
                return { ...state, ...action.data };
            } else {
                return state;
            }
        default:
            return state;
    }
};

export { AuthenticationReducer };
