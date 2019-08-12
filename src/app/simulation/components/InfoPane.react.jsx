// Import from NPM
// -------------------------------------
import React from "react";
import { Segment, Button, Image, Icon } from "semantic-ui-react";
import Countdown from "react-countdown-now";
import { hashHistory } from "react-router";

const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
        return (
            <Icon.Group>
                <Icon name="clock" />
                <Icon corner name="exclamation" color="red" />
            </Icon.Group>
        );
    } else {
        return (
            <span>
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </span>
        );
    }
};

export default class InfoPane extends React.PureComponent {
    goNext = () => {
        if (this.props.link === undefined) this.props.handleSubmit();
        else hashHistory.push(this.props.link);
    };
    render() {
        return (
            <div>
                <Image src={"/assets/images/configurable/logo.png"} />
                {this.props.phaseTime !== undefined && (
                    <a href="/#/info">
                        <Image
                            src={"/assets/images/configurable/help.png"}
                            size="tiny"
                            style={{ marginTop: "-64px" }}
                        />
                    </a>
                )}
                <Segment raised inverted>
                    <h1 style={{ color: "#ff695e" }}>
                        {this.props.title}
                        {this.props.phaseTime !== undefined && (
                            <span style={{ color: "#ffc900", float: "right" }}>
                                <Countdown
                                    date={
                                        Date.now() +
                                        this.props.phaseTime * 60000
                                    }
                                    renderer={renderer}
                                    onComplete={this.props.addOvertime}
                                />
                            </span>
                        )}
                    </h1>
                    <p
                        dangerouslySetInnerHTML={{ __html: this.props.content }}
                    />
                    <br />
                    <Button
                        content={this.props.buttonText}
                        size="huge"
                        primary
                        fluid
                        labelPosition="right"
                        icon="right chevron"
                        onClick={this.goNext}
                        disabled={this.props.disabled}
                    />
                </Segment>
            </div>
        );
    }
}
