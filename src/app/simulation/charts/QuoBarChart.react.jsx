import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export default class QuoBarChart extends PureComponent {
    static propTypes = {
        width: PropTypes.number,
        height: PropTypes.number,
        data: PropTypes.array.isRequired,
        series: PropTypes.array.isRequired,
        skipXlabels: PropTypes.bool,
        customTooltip: PropTypes.func
    };
    static defaultProps = {
        width: 450,
        height: 200,
        skipXlabels: false,
        customTooltip: null
    };

    render() {
        return (
            <BarChart
                width={this.props.width}
                height={this.props.height}
                data={this.props.data}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="name"
                    label={{
                        value: _.startCase(this.props.series[0].dataKey),
                        position: "bottom"
                    }}
                    hide={this.props.skipXlabels}
                />
                <YAxis />
                {this.props.customTooltip !== null ? (
                    <Tooltip content={this.props.customTooltip} />
                ) : (
                    <Tooltip />
                )}

                {_.map(this.props.series, (ds, index) => {
                    return (
                        <Bar
                            dataKey={ds.dataKey}
                            fill={ds.fill}
                            key={"bar-" + index}
                        />
                    );
                })}
            </BarChart>
        );
    }
}
