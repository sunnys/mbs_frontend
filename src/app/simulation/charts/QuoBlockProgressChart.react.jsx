import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

export default class QuoBlockProgressChart extends PureComponent {
    static propTypes = {
        maxBlocks: PropTypes.number,
        complete: PropTypes.number,
        color: PropTypes.string
    };
    static defaultProps = {
        maxBlocks: 20,
        complete: 10,
        color: "#8884d8"
    };
    render() {
        let blockStyle = {
            width: "0.9em",
            height: "0.9em",
            display: "inline-block",
            marginRight: "0.1em"
        };
        let blankBlock = {
            ...blockStyle,
            background: "#ccc"
        };
        let activeBlock = {
            ...blockStyle,
            background: this.props.color
        };
        return (
            <div style={{ display: "inline-block" }}>
                {_.times(this.props.complete, n => {
                    return (
                        <div key={"complete-deck-" + n} style={activeBlock} />
                    );
                })}
                {_.times(this.props.maxBlocks - this.props.complete, n => {
                    return (
                        <div key={"incomplete-deck-" + n} style={blankBlock} />
                    );
                })}
            </div>
        );
    }
}
