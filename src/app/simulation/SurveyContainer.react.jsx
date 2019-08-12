// Import from NPM
// -------------------------------------
import React from "react";
import { connect } from "react-redux";
import "semantic-ui-css/semantic.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

// Import Actions and Helpers
// -------------------------------------
import QuestionManagerAction from "./redux/QuestionManager.action.react";

// Import from Config
// -------------------------------------
import { interviews } from "./components/seeds";

// Import Components
// -------------------------------------
import Surveyor from "./pages/Surveyor.react";
import FlexBox from "globals/flexbox/FlexBox.react";

export class SurveyContainer extends React.Component {
    render() {
        return (
            <FlexBox>
                <div
                    className="isRelative"
                    style={{ height: "700px", width: "100%" }}
                >
                    <ToastContainer />
                    <Surveyor
                        {...this.props}
                        interview={interviews[this.props.params.id]}
                    />
                </div>
            </FlexBox>
        );
    }
}

const mapStateToProps = /* istanbul ignore next - redux function */ state => {
    return {
        auth: state.auth,
        questions: state.questions
    };
};

const mapDispatchToProps = /* istanbul ignore next - redux function */ dispatch => {
    return {
        actions: {
            saveAnswers: answers => {
                return dispatch(QuestionManagerAction.saveAnswers(answers));
            }
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SurveyContainer);
