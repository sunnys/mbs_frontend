import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";

export default class QuoScatterChart extends PureComponent {
    static propTypes = {
        width: PropTypes.number,
        height: PropTypes.number,
        data: PropTypes.array.isRequired,
        series: PropTypes.array.isRequired,
        color: PropTypes.string,
        customTooltip: PropTypes.func
    };
    static defaultProps = {
        width: 450,
        height: 200,
        color: "#8884d8"
    };
    render() {
        return (
            <ScatterChart
                width={this.props.width}
                height={this.props.height}
                margin={{ top: 10, bottom: 25 }}
            >
                <CartesianGrid />
                <XAxis
                    label={{
                        value: this.props.series[0].name,
                        position: "bottom"
                    }}
                    type={this.props.series[0].type}
                    dataKey={this.props.series[0].dataKey}
                    name={this.props.series[0].name}
                    unit={this.props.series[0].unit}
                />
                <YAxis
                    label={{
                        value: this.props.series[1].name,
                        angle: -90,
                        position: "insideLeft"
                    }}
                    type={this.props.series[1].type}
                    dataKey={this.props.series[1].dataKey}
                    name={this.props.series[1].name}
                    unit={this.props.series[1].unit}
                />
                {this.props.customTooltip !== null ? (
                    <Tooltip content={this.props.customTooltip} />
                ) : (
                    <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                )}
                <Scatter
                    name="Scatter"
                    data={this.props.data}
                    fill={this.props.color}
                />
            </ScatterChart>
        );
    }
}
