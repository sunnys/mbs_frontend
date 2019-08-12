// Import from NPM
// -------------------------------------
import React from "react";
import { connect } from "react-redux";
import "semantic-ui-css/semantic.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

// Import Actions and Helpers
// -------------------------------------

// Import from Config
// -------------------------------------
import { Loading } from "globals/Loading.react";
import ErrorPage from "globals/error/ErrorPage.react";

// Import Components
// -------------------------------------
import Simulation from "./pages/Simulation.react";
import FlexBox from "globals/flexbox/FlexBox.react";

export class SimulationContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchCompleted: false,
            error: null,
            errorMsg: null
        };
    }

    componentDidMount() {
        this.setState({
            fetchCompleted: true,
            barred: true
        });
    }

    render() {
        if (!this.state.fetchCompleted) return <Loading />;
        else if (this.state.fetchCompleted) {
            return (
                <FlexBox>
                    <div
                        className="isRelative"
                        style={{ height: "700px", width: "100%" }}
                    >
                        <ToastContainer />
                        <Simulation {...this.props} />
                    </div>
                </FlexBox>
            );
        } else {
            return <ErrorPage msg={"Error code " + this.state.errorMsg} />;
        }
    }
}

const mapStateToProps = /* istanbul ignore next - redux function */ state => {
    return {
        auth: state.auth
    };
};

const mapDispatchToProps = /* istanbul ignore next - redux function */ dispatch => {
    return {
        actions: {}
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SimulationContainer);
