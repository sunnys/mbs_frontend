// Import from NPM
// -------------------------------------
import React from "react";
import { Form, Message, Divider, Button } from "semantic-ui-react";
import _ from "lodash";

// Import from Config
// -------------------------------------
import { AppConfig } from "./../../../config/app.config";
// Import Components
// -------------------------------------

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            isFetching: false,
            errorRaised: false,
            errorMessages: []
        };
    }

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value });
    };

    handleSubmit = () => {
        const { email, password } = this.state;
        this.setState({ isFetching: true });
        this.props.actions
            .login(email, password, this.props.apiUrl)
            .then(response => {
                if (this.props.auth.status === "error") {
                    this.setState({
                        isFetching: false,
                        errorRaised: true,
                        errorMessages: response.err.errors
                    });
                } else {
                    this.props.setAuthenticated();
                }
            })
            .catch(error => {
                this.setState({
                    isFetching: false,
                    errorRaised: true,
                    errorMessages: error.errors
                });
            });
    };

    getErrors = () => {
        let error = "";
        if (this.props.location.query) {
            error = this.props.location.query.message;
        }
        if (this.state.errorRaised) {
            error = _.join(this.state.errorMessages, "\n");
        }
        return error;
    };

    render() {
        const boxStyle = {
            ...AppConfig.boxStyle,
            background: AppConfig.colors.master,
            color: "#ffffff",
            marginTop: "-40px"
        };

        let loginPage = {
			email: {
				placeholder: 'Enter Email',
				text: 'Email',
			},
			password: {
				placeholder: 'Enter Password',
				text: 'Password',
			},
			login: 'Login',
			forgotPassword: 'Forgot Password?',
		}

        return (
            <div style={boxStyle}>
                <h1>Login</h1>
                <Form
                    loading={this.state.isFetching ? true : false}
                    error={
                        this.state.errorRaised
                            ? true
                            : this.props.location.query
                            ? true
                            : false
                    }
                    onSubmit={this.handleSubmit}
                >
                    <Message error content={this.getErrors()} />
                    <Form.Input
                        label={AppConfig.authentication.label}
                        name={AppConfig.authentication.type}
                        value={this.state.email}
                        onChange={this.handleChange}
                        onCopy={e => {
                            e.preventDefault();
                            return false;
                        }}
                        onPaste={e => {
                            e.preventDefault();
                            return false;
                        }}
                        type="text"
                        placeholder={AppConfig.authentication.help}
                    />
                    <Form.Input
                        label={loginPage.password.text}
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        onCopy={e => {
                            e.preventDefault();
                            return false;
                        }}
                        onPaste={e => {
                            e.preventDefault();
                            return false;
                        }}
                        type="password"
                        placeholder={loginPage.password.placeholder}
                    />
                    <Button primary content="Login" />
                    {/* <Segment basic style={{ textAlign: "center" }}>
                        <div>Are you new here?</div>
                        <h3>
                            <a href="/#/register">Click here to Register </a>
                        </h3>
                    </Segment> */}
                </Form>
                {!AppConfig.clientApp && (
                    <div>
                        <Divider />
                        <Button
                            fluid
                            secondary
                            as="a"
                            href="/#/"
                            content="Go back to Home Page"
                        />
                    </div>
                )}
            </div>
        );
    }
}
