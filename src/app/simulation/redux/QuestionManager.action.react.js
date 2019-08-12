export const SAVE_ANSWERS = "SAVE_ANSWERS";

const _saveAnswer = (status, data, err) => {
    return {
        type: SAVE_ANSWERS,
        data,
        err,
        status
    };
};

const saveAnswers = answers => {
    return (dispatch, getState, Request) => {
        return Promise.resolve(
            dispatch(_saveAnswer("Saving Answers", answers, null))
        );
    };
};

class QuestionManagerAction {
    static saveAnswers = saveAnswers;
}

export default QuestionManagerAction;
