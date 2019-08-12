import { REHYDRATE } from "redux-persist/constants";
import {
    SET_SIM_PARAMS,
} from "./SimManager.action.react";

const initialParamsState = {
    ai: 0,
    bi: 0,
    ii: 0,
    bc: 0,
    blp: 0,
    unused: [],
    valuation: 0,
    fundRaise: 0,
    dilution: 0,
    co: 0,
    sa: 0,
    cs: 0,
    fr: 0,
    cm: 0,
    blt: 0,
    team: [],
    productFixed: false,
    angelFixed: false,
    teamFixed: false,
    simOver: false,
    lastLocation: "#",
    trackers: {
        overtimeCounter: 0
    },
    competencyMap: {
        creative: 0,
        analytical: 0,
        frugal: 0,
        methodical: 0,
        problemSolving: 0,
        decisionMaking: 0,
        balanced: 0,
        timeManagement: 0,
        costManagement: 0,
        resourceful: 0,
        overall:0
    }
};

const SimManagerReducer = (state = initialParamsState, action) => {
    let simParams;
    switch (action.type) {
        /* istanbul ignore next - react-persist function */
        case REHYDRATE:
            simParams = action.payload.simParams;
            if (simParams) {
                return Object.assign({}, state, simParams);
            } else {
                return state;
            }
        case SET_SIM_PARAMS:
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
};

export { SimManagerReducer };
