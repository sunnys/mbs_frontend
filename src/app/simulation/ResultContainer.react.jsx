// Import from NPM
// -------------------------------------
import React from "react";
import { connect } from "react-redux";
import "semantic-ui-css/semantic.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

// Import Actions and Helpers
// -------------------------------------
// import OpsManagerAction from "./redux/OpsManager.action.react";
import SimManagerAction from "./redux/SimManager.action.react";

// Import from Config
// -------------------------------------

// Import Components
// -------------------------------------
import Result from "./pages/Result.react";
import FlexBox from "globals/flexbox/FlexBox.react";

export class ResultContainer extends React.Component {
    componentDidMount() {
        console.log("Simulation Id: ", this.props.params.id);
        this.props.actions.endSim(this.props.params.id);
        // if (_.startsWith(this.props.simParams.lastLocation, "operations"))
        //     this.props.actions.setLastLocation("result").then(() => {
        //         if (!this.props.simParams.simOver) this.props.actions.endSim();
        //     });
    }
    render() {
        return (
            <FlexBox>
                <div
                    className="isRelative"
                    style={{ height: "700px", width: "100%" }}
                >
                    <ToastContainer />
                    <Result {...this.props} />
                </div>
            </FlexBox>
        );
    }
}

const mapStateToProps = /* istanbul ignore next - redux function */ state => {
    return {
        auth: state.auth,
        simParams: state.simParams,
        opsRecords: state.opsRecords,
        questions: state.questions
    };
};

const mapDispatchToProps = /* istanbul ignore next - redux function */ dispatch => {
    return {
        actions: {
            setLastLocation: location => {
                return dispatch(SimManagerAction.setLastLocation(location));
            },
            endSim: (simulationId) => {
                return dispatch(SimManagerAction.endSim(simulationId));
            }
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResultContainer);
