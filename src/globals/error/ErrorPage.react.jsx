import React from "react";
import PropTypes from "prop-types";
import QuoButton from "globals/semantic/QuoButton.react";
import { hashHistory } from "react-router";

export default class ErrorPage extends React.Component {
    static propTypes = {
        msg: PropTypes.string,
        logout: PropTypes.bool
    };

    static defaultProps = {
        msg: "Unknown Error",
        logout: false
    };

    render() {
        let pageStyle = {
            width: "100%",
            height: "calc(100vh - 84px)",
            textAlign: "center",
            background: "#ffffff"
        };

        let errorImgStyle = {
            width: "50%",
            marginTop: "100px"
        };

        let errorMsgStyle = {
            width: "80%",
            margin: "40px auto",
            fontSize: "2.5em",
            color: "#666666",
            lineHeight: "1.2"
        };

        return (
            <div style={pageStyle}>
                <img
                    src="assets/images/defaults/error.gif"
                    alt="Error Time"
                    style={errorImgStyle}
                />
                <div style={errorMsgStyle}>
                    Oops! Something went wrong. <br />
                    <strong>{this.props.msg}</strong>{" "}
                </div>
                <QuoButton
                    color="red"
                    size="massive"
                    onClick={
                        this.props.logout
                            ? () => hashHistory.push("logout")
                            : hashHistory.goBack
                    }
                >
                    Back
                </QuoButton>
            </div>
        );
    }
}
