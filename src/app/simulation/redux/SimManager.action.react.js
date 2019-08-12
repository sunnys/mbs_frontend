import _ from "lodash";
import { getAppConfig } from "config/client.config";

export const SET_SIM_PARAMS = "SET_SIM_PARAMS";

const _setSimParams = (status, data, err) => {
    return {
        type: SET_SIM_PARAMS,
        data,
        err,
        status
    };
};

const setLastLocation = location => {
    return (dispatch, getState, Request) => {
        return Promise.resolve(
            dispatch(
                _setSimParams(
                    "Setting Last Location",
                    {
                        lastLocation: location
                    },
                    null
                )
            )
        );
    };
};

const endSim = () => {
    return (dispatch, getState, Request) => {
        let questions = getState().questions;
        let simParams = getState().simParams;

        // Creativity Calculations
        //==================================
        let creativeScore = 0;
        _.each(questions, question => {
            if (question.score !== undefined)
                creativeScore = creativeScore + question.score;
        });
        let creative = Math.round(creativeScore * 3.33);

        // Time Management Calculations
        //==================================
        let timeManagement = Math.round(
            100 * Math.max(0, 1 - simParams.trackers.overtimeCounter / 26)
        );

        // Balance Calculations
        //==================================
        let balanced = Math.round((simParams.blp + simParams.blt) / 2);

        // Cost Consciousness Calculations
        //==================================
        let costScore = 0;

        // Decision Making Calculations
        //==================================
        let decisionMaking = Math.min(
            100,
            80
        );

        // Resourceful Calculations
        //==================================
        let resourceful = 50;

        let problemSolving = Math.min(100, 50)

        // Aggregation Calculations
        //==================================
        let analytical = Math.round(
            0.6 * problemSolving + 0.4 * decisionMaking
        );
        let frugal = Math.round(0.5 * costScore + 0.5 * resourceful);
        let methodical = Math.round(0.5 * timeManagement + 0.5 * balanced);

        return Promise.resolve(
            dispatch(
                _setSimParams(
                    "Ending Sim",
                    {
                        competencyMap: {
                            timeManagement: timeManagement,
                            balanced: balanced,
                            costManagement: costScore,
                            decisionMaking: decisionMaking,
                            problemSolving: problemSolving,
                            resourceful: resourceful,

                            creative: creative,
                            analytical: analytical,
                            frugal: frugal,
                            methodical: methodical,
                            overall: Math.round(
                                0.25 * creative +
                                    0.25 * analytical +
                                    0.25 * methodical +
                                    0.25 * frugal
                            )
                        },
                        simOver: true
                    },
                    null
                )
            )
        )
            .then(() => {
                simParams = getState().simParams;
                const userId = getState().auth.user.id;
                let data = {
                    questions: questions,
                    simParams: simParams
                };
                let body = { user_id: userId, user_data: data };
                return Request.fetch(getAppConfig().endpoints.userDataPath, {
                    method: "POST",
                    body: JSON.stringify(body)
                });
            })
            .catch(err => {
                dispatch(_setSimParams("error", err, null));
                return Promise.reject(err);
            });
    };
};

class SimManagerAction {
    static setLastLocation = setLastLocation;
    static endSim = endSim;
}

export default SimManagerAction;

// const avg = array => {
//     return _.sum(array) / array.length;
// };

// const stdev = array => {
//     return Math.sqrt(
//         _.sum(_.map(array, i => Math.pow(i - avg(array), 2))) / array.length
//     );
// };
