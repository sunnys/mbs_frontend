// Import from NPM
// -------------------------------------
import React from "react";
import _ from "lodash";
import { Progress, Image } from "semantic-ui-react";
import InterestIcon from "./InterestIcon.react";

export default class TopBar extends React.Component {
  render() {
    let topBarWrapper = {
      position: "relative",
      zIndex: "2",
      marginTop: "-35px"
    };
    let topImage = {
      display: "inline-block",
      height: "128px",
      zIndex: "9"
    };
    // let presenterImage = {
    //   position: "absolute",
    //   right: "10px",
    //   top: "5px",
    //   width: "20%"
    // };
    let progressSection = {
      position: "relative",
      top: this.props.cost === undefined ? "24px" : "-9px",
      width: "330px",
      display: "inline-block",
      zIndex: 3,
      color: "#42609c"
    };
    return (
      <div style={topBarWrapper}>
        {this.props.image !== undefined && (
          <Image src={this.props.image} style={topImage} />
        )}
        {this.props.constraint !== undefined && (
          <div style={progressSection}>
            <h1>
              {this.props.constraint}
              {this.props.cost !== undefined &&
                this.props.maxConstraint !== undefined && (
                  <span>
                    : {this.props.cost}/{this.props.maxConstraint}
                  </span>
                )}
            </h1>
            {this.props.cost !== undefined && (
              <Progress
                percent={parseInt(
                  (this.props.cost * 100) / this.props.maxConstraint,
                  0
                )}
                inverted
                indicating
                color="red"
                style={{
                  top: "5px"
                }}
              />
            )}
          </div>
        )}
        <div
          style={{
            position: "relative",
            top: "0px",
            width: "330px",
            display: "inline-block",
            zIndex: 3
          }}
        >
          {_.map(this.props.interestNames, (interest, idx) => {
            return (
              <InterestIcon
                key={`interest-icon-${idx}`}
                interest={
                  this.props.interests[
                    this.props.interestNames.length - idx - 1
                  ]
                }
                name={
                  this.props.interestNames[
                    this.props.interestNames.length - idx - 1
                  ]
                }
                interestLevels={this.props.interestLevels}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
