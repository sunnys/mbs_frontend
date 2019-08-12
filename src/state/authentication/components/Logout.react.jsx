// Import from NPM
// -------------------------------------
import React from "react";
import { Loader, Button } from "semantic-ui-react";
import { hashHistory } from "react-router";

// Import from Config
// -------------------------------------
import { getAppConfig } from "config/client.config";

export default class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: !this.props.button
        };
    }

    static defaultProps = {
        button: false
    };

    componentDidMount() {
        if (!this.props.button) {
            this.handleLogout();
        }
    }

    handleLogout = () => {
        this.props.actions.logout().then(response => {
            if (this.props.auth.status === "error") {
                this.setState({ isFetching: false, errorRaised: true });
            } else {
                const unauthRoot = getAppConfig().auth.routes
                    .unauthenticatedRoot;
                hashHistory.push({
                    pathname: unauthRoot,
                    query: this.props.location.query
                });
            }
        });
    };

    render() {
        return (
            <div>
                {this.state.isFetching ? (
                    <Loader size="massive" active />
                ) : this.props.button ? (
                    <Button inverted color="red" onClick={this.handleLogout}>
                        Logout
                    </Button>
                ) : null}
            </div>
        );
    }
}
