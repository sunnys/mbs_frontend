// Import from NPM
// -------------------------------------
import React from "react";
import _ from "lodash";
import { Grid, Input, Segment, Button } from "semantic-ui-react";
import { hashHistory } from "react-router";

// Import Actions and Helpers
// -------------------------------------
import InfoPane from "../components/InfoPane.react";
import TopBar from "../components/TopBar.react";
import HTMLSlider from "globals/carousel/HTMLSlider.react";
import FlexBox from "globals/flexbox/FlexBox.react";

export default class Surveyor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: this.props.interview.questions,
            answered: [],
            currentInput: ""
        };
    }

    handleSubmit = () => {
        let simulationId = this.props.params.id;
        let url = this.props.interview.link + "/" + simulationId
        this.props.actions
            .saveAnswers(this.state.answered)
            .then(() => hashHistory.push(url));
    };

    handleInputChange = e => this.setState({ currentInput: e.target.value });
    handleKeyDown = e => {
        if (e.keyCode === 9) e.preventDefault();
    };

    saveAnswer = (questionId, q, option, attributes, value, competencies) => {
        let answered = _.cloneDeep(this.state.answered);
        let thisAnswer = _.find(answered, { questionId: questionId });
        if (thisAnswer !== undefined)
            answered.splice(answered.indexOf(thisAnswer), 1);
            answered.push({
            questionId: questionId,
            question: q,
            response: option === undefined ? this.state.currentInput : option,
            value: value,
            competencies: competencies,
            attributes: attributes
        });
        if (!(this.state.currentInput === "" && option === undefined))
            this.setState({ answered: answered });
    };

    render() {
        let questionCards = _.map(this.state.questions, (elm, idx) => {
            console.log(elm.options !== undefined)
            return (
                <div
                    key={`question-${idx}`}
                    style={{
                        height: "400px",
                        width: "100%",
                        background: `url(${this.props.interview.background})`,
                        backgroundSize: "cover",
                        textAlign: "center",
                        position: "relative"
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            top: "20px",
                            left: "20px"
                        }}
                    >
                        
                    </div>
                    <FlexBox>
                        <div style={{ width: "90%" }}>
                            <h1>{elm.question}</h1>
                            <br />
                            {elm.options.length === 0 && (
                                <Input
                                    fluid
                                    size="massive"
                                    onFocus={this.handleInputChange}
                                    onChange={this.handleInputChange}
                                    onBlur={() =>
                                        this.saveAnswer(
                                            elm.questionId,
                                            elm.question
                                        )
                                    }
                                    onKeyDown={this.handleKeyDown}
                                />
                            )}
                            {elm.options !== undefined &&
                                _.map(elm.options, (option, idx2) => {
                                    console.log("Answered : ", this.state.answered);
                                    let thisAnswer = _.find(
                                        this.state.answered,
                                        {
                                            questionId: elm.questionId
                                        }
                                    );
                                    console.log("Response : ", thisAnswer)
                                    return (
                                        <Button
                                            key={`option-${idx}-${idx2}`}
                                            color={
                                                thisAnswer !== undefined &&
                                                thisAnswer.response ===
                                                    option.option
                                                    ? "brown"
                                                    : "grey"
                                            }
                                            content={option.option}
                                            onClick={() =>
                                                this.saveAnswer(
                                                    elm.questionId,
                                                    elm.question,
                                                    option.option,
                                                    option.attributes,
                                                    option.value,
                                                    option.competencies
                                                )
                                            }
                                            style={{ marginBottom: "5px" }}
                                        />
                                    );
                                })}
                        </div>
                    </FlexBox>
                </div>
            );
        });

        return (
            <div className="full-height" style={{ padding: "40px 40px" }}>
                <Segment basic>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={5}>
                                <InfoPane
                                    title={this.props.interview.title}
                                    content={this.props.interview.content}
                                    buttonText={this.props.interview.buttonText}
                                    handleSubmit={this.handleSubmit}
                                    disabled={
                                        this.state.answered.length !==
                                        this.props.interview.questions.length
                                    }
                                />
                            </Grid.Column>
                            <Grid.Column width={11}>
                                <TopBar
                                    image={
                                        "assets/images/configurable/interview.png"
                                    }
                                    presenter={this.props.interview.presenter}
                                    constraint={"Questions Answered"}
                                    maxConstraint={this.state.questions.length}
                                    cost={this.state.answered.length}
                                />
                                <div
                                    style={{
                                        height: "556px",
                                        overflow: "hidden",
                                        marginTop: "-64px",
                                        paddingTop: "56px",
                                        position: "relative",
                                        zIndex: "2"
                                    }}
                                >
                                    <div
                                        style={{
                                            height: "514px",
                                            overflow: "hidden"
                                        }}
                                    >
                                        <div style={{ padding: "30px 0" }}>
                                            <HTMLSlider
                                                sliderItems={questionCards}
                                                slidesToShow={1}
                                                autoPlay={false}
                                                dots={false}
                                                arrows={false}
                                                arrowBtns={true}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </div>
        );
    }
}
