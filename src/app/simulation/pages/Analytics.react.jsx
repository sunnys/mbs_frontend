import React, { PureComponent } from "react";
import _ from "lodash";
import { Segment, Divider, Grid, Label } from "semantic-ui-react";

// Import from Config
// -------------------------------------
import { getAppConfig } from "config/client.config";

import QuoRadialProgressChart from "../charts/QuoRadialProgressChart.react";
import QuoRadarChart from "../charts/QuoRadarChart.react";

export default class Analytics extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            score: this.props.competencyMap.overall,
            competencyMap: [
                {
                    competency: "Ownership",
                    actual: this.props.competencyMap.ownership,
                    fullMark: 100
                },
                {
                    competency: "Passion For Excellence",
                    actual: this.props.competencyMap.passionForExcellence,
                    fullMark: 100
                },
                {
                    competency: "High Performance",
                    actual: this.props.competencyMap.highPerformance,
                    fullMark: 100
                },
                {
                    competency: "Meritocracy",
                    actual: this.props.competencyMap.meritocracy,
                    fullMark: 100
                },
                {
                    competency: "Team Spirit",
                    actual: this.props.competencyMap.teamSpirit,
                    fullMark: 100
                }
            ],
            problemSolving: this.props.competencyMap.problemSolving,
            decisionMaking: this.props.competencyMap.decisionMaking,
            balanced: this.props.competencyMap.balanced,
            timeManagement: this.props.competencyMap.timeManagement,
            attributes: _.uniq(_.compact(_.flatten(_.map(this.props.questions, (question, index) => {
                if(question.attributes !== undefined){
                    return question.attributes
                }
            }))))
        };
    }

    render() {
        let pageStyle = {
            courseSection: {
                marginLeft: "25px",
                width: "720px",
                height: "555px"
            },
            aggregate: {
                base: {
                    width: "760px",
                    textAlign: "center",
                    padding: "0"
                },
                radial: {
                    width: "230px",
                    display: "inline-block"
                }
            }
        };
        let radialContainer = {
            textAlign: "center",
            lineHeight: "1.1"
        };
        console.log(this.props.questions)
        return (
            <Segment basic>
                <div
                    style={{
                        margin: "100px 5% 0 5%",
                        width: "90%",
                        textAlign: "center"
                    }}
                >
                    
                </div>
                <div style={{ margin: "40px 5% 20px 5%", width: "90%" }}>
                    <Divider />
                    <h1
                        style={{
                            margin: "-32px auto",
                            width: "300px",
                            background: "#f5f5f5",
                            textAlign: "center"
                        }}
                    >
                        COMPETENCY MAP
                    </h1>
                </div>
                <Segment basic style={pageStyle.aggregate.base}>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={9}>
                                <Segment basic style={{ marginLeft: "15px" }}>
                                    <QuoRadarChart
                                        width={380}
                                        height={380}
                                        data={this.state.competencyMap}
                                    />
                                </Segment>
                            </Grid.Column>
                            <Grid.Column width={7}>
                                <Segment
                                    basic
                                    style={{ paddingBottom: "21px" }}
                                >
                                    <Grid>
                                        <Grid.Row>
                                            <Grid.Column
                                                width={8}
                                                style={radialContainer}
                                            >
                                                <QuoRadialProgressChart
                                                    width={128}
                                                    height={100}
                                                    color={
                                                        getAppConfig().colors
                                                            .master
                                                    }
                                                    value={
                                                        this.state
                                                            .problemSolving
                                                    }
                                                />
                                                Problem Solving
                                            </Grid.Column>
                                            <Grid.Column
                                                width={8}
                                                style={radialContainer}
                                            >
                                                <QuoRadialProgressChart
                                                    width={128}
                                                    height={100}
                                                    color={
                                                        getAppConfig().colors
                                                            .master
                                                    }
                                                    value={
                                                        this.state
                                                            .decisionMaking
                                                    }
                                                />
                                                Decision Making
                                            </Grid.Column>
                                            <Grid.Column
                                                width={8}
                                                style={radialContainer}
                                            >
                                                <QuoRadialProgressChart
                                                    width={128}
                                                    height={100}
                                                    color={
                                                        getAppConfig().colors
                                                            .master
                                                    }
                                                    value={this.state.balanced}
                                                />
                                                Balanced Approach
                                            </Grid.Column>
                                            <Grid.Column
                                                width={8}
                                                style={radialContainer}
                                            >
                                                <QuoRadialProgressChart
                                                    width={128}
                                                    height={100}
                                                    color={
                                                        getAppConfig().colors
                                                            .master
                                                    }
                                                    value={
                                                        this.state
                                                            .timeManagement
                                                    }
                                                />
                                                Time Management
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
                <div style={{ margin: "20px 5% 40px 5%", width: "90%" }}>
                    <Divider />
                    <h1
                        style={{
                            margin: "-32px auto",
                            width: "300px",
                            background: "#f5f5f5",
                            textAlign: "center"
                        }}
                    >
                        KEY ATTRIBUTES
                    </h1>
                </div>
                <Segment basic style={{ textAlign: "center" }}>
                    {_.map(
                        this.state.attributes,
                        (question, index) => {
                            return (
                                <Label
                                    color="yellow"
                                    key={"profile-tag-" + index}
                                    size="big"
                                    style={{ marginBottom: "5px" }}
                                >
                                    {question}
                                </Label>
                            );
                        }
                    )}
                </Segment>
            </Segment>
        );
    }
}
