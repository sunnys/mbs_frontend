import _ from "lodash";
import { REHYDRATE } from "redux-persist/constants";
import { SAVE_ANSWERS } from "./QuestionManager.action.react";

const initialParamsState = [];

const QuestionManagerReducer = (state = initialParamsState, action) => {
    let questions;
    switch (action.type) {
        /* istanbul ignore next - react-persist function */
        case REHYDRATE:
            questions = action.payload.questions;
            if (questions) {
                return [...state, ...questions];
            } else {
                return state;
            }
        case SAVE_ANSWERS:
            let responses = _.cloneDeep(state);
            _.each(action.data, question => {
                let existingResponse = _.find(responses, {
                    questionId: question.questionId
                });
                if (existingResponse !== undefined)
                    responses.splice(responses.indexOf(existingResponse), 1);
                responses.push(question);
            });
            return responses;
        default:
            return state;
    }
};

export { QuestionManagerReducer };
