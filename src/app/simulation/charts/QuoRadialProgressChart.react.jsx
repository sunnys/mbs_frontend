import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { PieChart, Pie, Cell } from "recharts";

export default class QuoRadialProgressChart extends PureComponent {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    color: PropTypes.string,
    value: PropTypes.number.isRequired
  };
  static defaultProps = {
    width: 200,
    height: 200,
    color: "#8884d8"
  };
  render() {
    let data = [
      {
        name: isNaN(this.props.value)
          ? "-"
          : Math.round(this.props.value) + "%",
        value: isNaN(this.props.value) ? 0 : Math.round(this.props.value)
      },
      {
        name: "",
        value: isNaN(this.props.value)
          ? 100
          : 100 - Math.round(this.props.value)
      }
    ];
    return (
      <div
        style={{
          position: "relative",
          width: this.props.width,
          height: this.props.height
        }}
      >
        <PieChart width={this.props.width} height={this.props.height}>
          <Pie
            data={data}
            cx={"50%"}
            cy={"50%"}
            innerRadius={this.props.width / 2 - 40}
            outerRadius={this.props.width / 2 - 20}
            fill={this.props.color}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index === 0 ? this.props.color : "#cccccc"}
              />
            ))}
          </Pie>
        </PieChart>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#454545"
          }}
        >
          {data[0].name}
        </div>
      </div>
    );
  }
}
