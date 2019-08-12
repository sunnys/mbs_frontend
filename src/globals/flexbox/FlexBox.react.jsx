import React from 'react';
import PropTypes from 'prop-types';

export default class FlexBox extends React.Component {
    static propTypes = {
        vertical: PropTypes.string,
        horzontal: PropTypes.string,
        templateWrap: PropTypes.bool
    };

    static defaultProps = {
        templateWrap: false
    };

    render() {
        let defaultValues = {
            display: 'flex',
            height: this.props.height || '100%',
            width: 'calc(100% + 1px)',
            alignItems: this.props.vertical || 'center',
            justifyContent: this.props.horzontal || 'center',
            backgroundColor: this.props.background || 'inherit',
            flexDirection: this.props.direction || 'row',
            position: "relative"
        };

        let containerStyle = {
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            overflow: "hidden"
        };
        let scrollerStyle = {
            position: "absolute",
            top: "0",
            left: "0",
            bottom: "0",
            overflow: "hidden",
            overflowY: "scroll"
        };

        if (this.props.templateWrap) {
            return (
                <div style={defaultValues}>
                    <div style={containerStyle}>
                        <div style={scrollerStyle}>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div style={defaultValues}>
                    {this.props.children}
                </div>
            );
        }


    }
}
