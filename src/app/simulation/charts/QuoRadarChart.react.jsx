// Import from NPM
// -------------------------------------

import React, { PureComponent } from "react";
import PropTypes from "prop-types";

// Import from Config
// -------------------------------------
import { getAppConfig } from "config/client.config";

import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Tooltip
} from "recharts";

export default class QuoRadarChart extends PureComponent {
    static propTypes = {
        width: PropTypes.number,
        height: PropTypes.number,
        data: PropTypes.array.isRequired,
        color: PropTypes.string
    };
    static defaultProps = {
        width: 700,
        height: 700,
        color: "#fe3456"
    };
    render() {
        return (
            <RadarChart
                cx={"50%"}
                cy={"50%"}
                outerRadius={this.props.width / 3.25}
                width={this.props.width}
                height={this.props.height}
                data={this.props.data}
            >
                <PolarGrid />
                <PolarAngleAxis dataKey="competency" />
                <PolarRadiusAxis domain={[0,100]} />
                <Radar
                    name="Competency Score"
                    dataKey="actual"
                    stroke={getAppConfig().colors.secondary}
                    fill={"#82ca9d"}
                    fillOpacity={0.8}
                />
                <Tooltip />
            </RadarChart>
        );
    }
}
