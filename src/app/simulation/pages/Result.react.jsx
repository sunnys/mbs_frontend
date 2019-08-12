// Import from NPM
// -------------------------------------
import React from "react";
import {
    Grid,
    Segment,
    Modal,
    Button,
    Image
} from "semantic-ui-react";

// Import Actions and Helpers
// -------------------------------------
import { resultText } from "../components/seeds";
import { simParams } from "../components/logic";

import InfoPane from "../components/InfoPane.react";
import TopBar from "../components/TopBar.react";

export default class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coeff: Object.assign({}, this.props.simParams, simParams),
            finalValuation: 0,
            modalOpen: false
        };
    }

    componentDidMount() {
        let finalValuation = 1;
        this.setState({ finalValuation });
    }

    handleSubmit = () => {
        this.setState({ modalOpen: true });
    };

    modalClose = () => this.setState({ modalOpen: false });

    render() {
        return (
            <div className="full-height" style={{ padding: "20px 40px" }}>
                <Segment basic>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <InfoPane
                                    key={`infopane-${this.state.monthId}`}
                                    title={resultText.title}
                                    buttonText={resultText.buttonText}
                                    handleSubmit={this.handleSubmit}
                                    content={resultText.content}
                                />
                            </Grid.Column>
                            <Grid.Column width={12}>
                                <TopBar
                                    constraint={`Acquistion valuation of Rs. ${Math.max(
                                        parseInt(
                                            this.state.finalValuation / 100000,
                                            0
                                        ) / 100,
                                        0.25
                                    )} crores`}
                                    image={
                                        "/assets/images/configurable/money.png"
                                    }
                                    presenter={
                                        "/assets/images/configurable/characters/mentor.png"
                                    }
                                    marginTop={"40px"}
                                />
                                <Segment
                                    inverted
                                    style={{
                                        textAlign: "center",
                                        fontSize: "2em",
                                        position: "relative",
                                        zIndex: "2"
                                    }}
                                >
                                    You made{" "}
                                    {parseInt(
                                        (Math.max(
                                            this.state.finalValuation,
                                            2500000
                                        ) *
                                            (100 -
                                                this.props.simParams
                                                    .dilution)) /
                                            10000000,
                                        0
                                    ) / 100}{" "}
                                    crores!
                                </Segment>
                                <Segment raised style={{ padding: "15px" }}>
                                    
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
                <Modal basic open={this.state.modalOpen}>
                    <Modal.Content>
                        <Image
                            src="/assets/images/configurable/certificate.jpg"
                            fluid
                        />
                        <div
                            style={{
                                position: "absolute",
                                top: "36%",
                                left: "60%",
                                width: "40%",
                                textAlign: "center",
                                lineHeight: "1.2",
                                fontSize: "2.5em",
                                color: "#000000",
                                transform: "translateX(-50%)"
                            }}
                        >
                            {
                                
                            }
                        </div>
                    </Modal.Content>
                    <Modal.Actions style={{ textAlign: "center" }}>
                        <Button
                            primary
                            content="Close"
                            onClick={this.modalClose}
                        />
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}
