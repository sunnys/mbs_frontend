// Import from NPM
// -------------------------------------
import React from "react";
import { Grid, Button, Image, Segment } from "semantic-ui-react";
import { hashHistory } from "react-router";

// Import Actions and Helpers
// -------------------------------------
import { getAppConfig } from "config/client.config";
import { cutScenes } from "../components/seeds";

export default class Simulation extends React.Component {
    goNext = () => {
        hashHistory.push(cutScenes[this.props.params.id].link);
    };
    render() {
        return (
            <div className="full-height" style={{ padding: "20px 40px" }}>
                <Segment basic>
                    <Grid>
                        <Grid.Row>
                            <div style={{margin: "auto"}}>   
                                <Image
                                    src={
                                        getAppConfig().apiUrls.assetLib +
                                        "/images/configurable/logo.png"
                                    }
                                    size="medium"
                                />
                                <Segment raised inverted>
                                    <h1 style={{color:"#ffc900"}}>
                                        {cutScenes[this.props.params.id].title}
                                    </h1>
                                    <p dangerouslySetInnerHTML={{ __html: cutScenes[this.props.params.id].content }}/>
                                    <Button
                                        content={
                                            cutScenes[this.props.params.id]
                                                .buttonText
                                        }
                                        size="huge"
                                        fluid
                                        primary
                                        labelPosition="right"
                                        icon="right chevron"
                                        onClick={this.goNext}
                                    />
                                    <br/>
                                </Segment>
                            </div>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </div>
        );
    }
}
