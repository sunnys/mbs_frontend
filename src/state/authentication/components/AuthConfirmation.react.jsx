// Import from NPM
// -------------------------------------
import React from "react";
import { Button } from "semantic-ui-react";
import { hashHistory } from "react-router";
export default class AuthConfirmation extends React.Component {
    logout = () => {
        this.props.actions.logout();
        this.props.setLoggedOut();
    };
    cancel = () => {
        hashHistory.goBack();
    };
    render() {
        const style = {
            padding: "30px",
            background: "#fff",
            width: "80%",
            margin: "10%",
            textAlign: "center"
        };
        return (
            <div style={style}>
                Are you sure you want to log out?
                <br />
                <br />
                <Button content="Log Out" onClick={this.logout} />
                <br />
                or
                <br />
                <a style={{ cursor: "pointer" }} onClick={this.cancel}>
                    Cancel
                </a>
            </div>
        );
    }
}
