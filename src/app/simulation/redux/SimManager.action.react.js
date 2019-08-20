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

const endSim = (simulationId) => {
    return (dispatch, getState, Request) => {
        let questions = getState().questions;
        let simParams = getState().simParams;

        let max_ownership = 10;
        let max_passion_for_excellence = 10;
        let max_high_performance = 11;
        let max_meritocracy = 9;
        let max_team_spirit = 11;
        let max_problem_solving = 14;
        let max_decision_making = 16;
        let max_balanced_approach = 11;
        let max_time_management = 11;

        let earned_ownership = 0;
        _.each(questions, question => {
            if (question.value !== undefined && question.value.ownership !== undefined)
                earned_ownership = earned_ownership + question.value.ownership;
        });
        let earned_passion_for_excellence = 0;
        _.each(questions, question => {
            if (question.value !== undefined && question.value.passion_for_excellence !== undefined)
                earned_passion_for_excellence = earned_passion_for_excellence + question.value.passion_for_excellence;
        });
        let earned_high_performance = 0;
        _.each(questions, question => {
            if (question.value !== undefined && question.value.high_performance !== undefined)
                earned_high_performance = earned_high_performance + question.value.high_performance;
        });

        let earned_meritocracy = 0;
        _.each(questions, question => {
            if (question.value !== undefined && question.value.meritocracy !== undefined)
                earned_meritocracy = earned_meritocracy + question.value.meritocracy;
        });
        let earned_team_spirit = 0;
        _.each(questions, question => {
            if (question.value !== undefined && question.value.team_spirit !== undefined)
                earned_team_spirit = earned_team_spirit + question.value.team_spirit;
        });


        let earned_problem_solving = 0;
        _.each(questions, question => {
            if (question.competencies !== undefined && question.competencies.problem_solving !== undefined)
                earned_problem_solving = earned_problem_solving + question.competencies.problem_solving;
        });

        let earned_decision_making = 0;
        _.each(questions, question => {
            if (question.competencies !== undefined && question.competencies.decision_making !== undefined)
                earned_decision_making = earned_decision_making + question.competencies.decision_making;
        });
        let earned_balanced_approach = 0;
        _.each(questions, question => {
            if (question.competencies !== undefined && question.competencies.balanced_approach !== undefined)
                earned_balanced_approach = earned_balanced_approach + question.competencies.balanced_approach;
        });
        let earned_time_management = 0;
        _.each(questions, question => {
            if (question.competencies !== undefined && question.competencies.time_management !== undefined)
                earned_time_management = earned_time_management + question.competencies.time_management;
        });

        let ownership = Math.round((earned_ownership/max_ownership)*100);
        let passion_for_excellence = Math.round((earned_passion_for_excellence/max_passion_for_excellence)*100);
        let high_performance = Math.round((earned_high_performance/max_high_performance)*100);
        let meritocracy = Math.round((earned_meritocracy/max_meritocracy)*100);
        let team_spirit = Math.round((earned_team_spirit/max_team_spirit)*100);

        let problemSolving = Math.round((earned_problem_solving/max_problem_solving)*100);
        let decisionMaking = Math.round((earned_decision_making/max_decision_making)*100);
        let balanced = Math.round((earned_balanced_approach/max_balanced_approach)*100);
        let timeManagement = Math.round((earned_time_management/max_time_management)*100);
        // // Creativity Calculations
        // //==================================
        // let creativeScore = 0;
        // _.each(questions, question => {
        //     if (question.score !== undefined)
        //         creativeScore = creativeScore + question.score;
        // });
        // let creative = Math.round(creativeScore * 3.33);

        // // Time Management Calculations
        // //==================================
        // let timeManagement = Math.round(
        //     100 * Math.max(0, 1 - simParams.trackers.overtimeCounter / 26)
        // );

        // // Balance Calculations
        // //==================================
        // let balanced = Math.round((simParams.blp + simParams.blt) / 2);

        // // Cost Consciousness Calculations
        // //==================================
        // let costScore = 0;

        // // Decision Making Calculations
        // //==================================
        // let decisionMaking = Math.min(
        //     100,
        //     80
        // );

        // // Resourceful Calculations
        // //==================================
        // let resourceful = 50;

        // let problemSolving = Math.min(100, 50)

        // // Aggregation Calculations
        // //==================================
        // let analytical = Math.round(
        //     0.6 * problemSolving + 0.4 * decisionMaking
        // );
        // let frugal = Math.round(0.5 * costScore + 0.5 * resourceful);
        // let methodical = Math.round(0.5 * timeManagement + 0.5 * balanced);

        return Promise.resolve(
            dispatch(
                _setSimParams(
                    "Ending Sim",
                    {
                        competencyMap: {
                            timeManagement: timeManagement,
                            balanced: balanced,
                            decisionMaking: decisionMaking,
                            problemSolving: problemSolving,
                            ownership: ownership,
                            passionForExcellence: passion_for_excellence,
                            highPerformance: high_performance,
                            meritocracy: meritocracy,
                            teamSpirit: team_spirit
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
                let body = { user_id: userId, simulation_id: simulationId, user_data: data };
                return Request.fetch(getAppConfig().endpoints.simulationResultPath, {
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

const avg = array => {
    return _.sum(array) / array.length;
};

// const stdev = array => {
//     return Math.sqrt(
//         _.sum(_.map(array, i => Math.pow(i - avg(array), 2))) / array.length
//     );
// };
