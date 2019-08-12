import React from "react";
import { Button } from "semantic-ui-react";
import { connect } from "react-redux";

export class QuoButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hovered: false
        };
    }

    setHover = () => {
        this.setState({ hovered: true });
    };
    removeHover = () => {
        this.setState({ hovered: false });
    };

    render() {
        let buttonStyle;
        buttonStyle =
            this.props.auth.user === null ||
            this.props.auth.user.client.appConfiguration === undefined
                ? {
                      ...this.props.style
                  }
                : {
                      ...this.props.auth.user.client.appConfiguration
                          .buttonStyle,
                      ...this.props.style
                  };
        let { dispatch, ...passedProps } = this.props;
        return (
            <Button
                {...passedProps}
                onMouseEnter={this.props.disabled ? null : this.setHover}
                onMouseLeave={this.props.disabled ? null : this.removeHover}
                style={buttonStyle}
            >
                {this.props.children}
            </Button>
        );
    }
}

const mapStateToProps = /* istanbul ignore next - redux function*/ state => {
    return {
        auth: state.auth
    };
};

export default connect(mapStateToProps)(QuoButton);
