// Import from NPM
// -------------------------------------
import React from "react";
import { Icon } from "semantic-ui-react";

export default class InterestIcon extends React.Component {
    render() {
        let interestIconStyle = {
            width: "64px",
            float: "right",
            top: "50px",
            color: "#ffffff",
            lineHeight: "1",
            position: "relative",
            textAlign: "center"
        };
        return (
            <div style={interestIconStyle}>
                <Icon
                    name={
                        this.props.interest < this.props.interestLevels[0]
                            ? "frown outline"
                            : this.props.interest < this.props.interestLevels[1]
                            ? "meh outline"
                            : "smile outline"
                    }
                    size="big"
                    color={
                        this.props.interest < this.props.interestLevels[0]
                            ? "red"
                            : this.props.interest < this.props.interestLevels[1]
                            ? "yellow"
                            : "green"
                    }
                    circular
                    inverted
                    style={{ marginBottom: "5px" }}
                />
                <br />
                {this.props.name}
            </div>
        );
    }
}
