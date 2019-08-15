// Import from NPM
// -------------------------------------
import React from "react";
import { connect } from "react-redux";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.min.css";

// Import Actions and Helpers
// -------------------------------------
import AnalyticsAction from "./redux/Analytics.action.react";
import { Loading } from "globals/Loading.react";

// Import from Config
// -------------------------------------

// Import Components
// -------------------------------------
import UserList from "./pages/UserList.react";

/**
 * The AnalyticsContainer is the top level component connected to the redux store.
 */
export class UserListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: [],
            fetchComplete: false
        };
    }

    componentDidMount() {
        if(this.props.params.simulation_id === undefined){
            this.props.actions.getUserList().then(data => {
                this.setState({ userList: data, fetchComplete: true });
            });
        } else{
            this.props.actions.getUserListOfSimulation(this.props.params.simulation_id).then(data => {
                this.setState({ userList: data, fetchComplete: true });
            });
        }
        
    }

    render() {
        if (!this.state.fetchComplete) return <Loading />;
        else
            return (
                <UserList
                    {...this.props}
                    userList={this.state.userList}
                    key={`list-${Math.random()}`}
                />
            );
    }
}

const mapStateToProps = /* istanbul ignore next - redux function */ state => {
    return {
        auth: state.auth
    };
};

const mapDispatchToProps = /* istanbul ignore next - redux function */ dispatch => {
    return {
        actions: {
            getUserList: () => {
                return dispatch(AnalyticsAction.getUserList());
            },
            getUserListOfSimulation: (id) => {
                return dispatch(AnalyticsAction.getUserListOfSimulation(id))
            }
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserListContainer);
