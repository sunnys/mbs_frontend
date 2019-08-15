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
                    competency: "Analytical",
                    actual: this.props.competencyMap.analytical,
                    fullMark: 100
                },
                {
                    competency: "Creative",
                    actual: this.props.competencyMap.creative,
                    fullMark: 100
                },
                {
                    competency: "Methodical",
                    actual: this.props.competencyMap.methodical,
                    fullMark: 100
                },
                {
                    competency: "Frugal",
                    actual: this.props.competencyMap.frugal,
                    fullMark: 100
                }
            ],
            problemSolving: this.props.competencyMap.problemSolving,
            decisionMaking: this.props.competencyMap.decisionMaking,
            balanced: this.props.competencyMap.balanced,
            timeManagement: this.props.competencyMap.timeManagement,
            costManagement: this.props.competencyMap.costManagement,
            resourceful: this.props.competencyMap.resourceful
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
                    <Segment>
                        <h2 style={{ margin: 0 }}>AGGREGATE SCORE:</h2>
                        <h1
                            style={{
                                margin: 0,
                                fontSize: "3.2em"
                            }}
                        >
                            {this.state.score}%
                        </h1>
                    </Segment>
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
                                                            .costManagement
                                                    }
                                                />
                                                Cost Management
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
                                                        this.state.resourceful
                                                    }
                                                />
                                                Resourcefulness
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
                        this.props.questionList.slice(
                            3,
                            this.props.questionList.length
                        ),
                        (question, index) => {
                            return (
                                <Label
                                    color="yellow"
                                    key={"profile-tag-" + index}
                                    size="big"
                                    style={{ marginBottom: "5px" }}
                                >
                                    {question.response}
                                </Label>
                            );
                        }
                    )}
                </Segment>
            </Segment>
        );
    }
}
