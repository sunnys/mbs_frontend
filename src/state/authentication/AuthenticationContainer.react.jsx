// Import from NPM
// -------------------------------------
import React from "react";
import { connect } from "react-redux";
import { hashHistory } from "react-router";
import {
    Grid,
    Form,
    Popup,
    Message,
    Input,
    Button,
    Icon,
    Segment
} from "semantic-ui-react";

// Import Actions and Helpers
// -------------------------------------
import { AuthenticationAction } from "./redux/Authentication.action.react";

// Import from Config
// -------------------------------------
import { AppConfig } from "./../../config/app.config";
import { getAppConfig } from "./../../config/client.config";

// Import Components
// -------------------------------------
import Login from "./components/Login.react";
import ForgotPassword from "./components/ForgotPassword.react";
import AuthConfirmation from "./components/AuthConfirmation.react";

// Import Helpers
// -------------------------------------
import FlexBox from "./../../globals/flexbox/FlexBox.react";

class AuthenticationContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: this.props.auth.isUserLoggedIn
        };
    }

    setLoggedOut = () => {
        this.setState({ authenticated: false });
    };

    setAuthenticated = () => {
        this.props.actions.session().then(() => {
            if (this.props.location.pathname === "creator") {
                this.setState({ authenticated: true });
            } else {
                const authRoot =
                    this.props.simParams.lastLocation === "#"
                        ? AppConfig.auth.routes.authenticatedRoot
                        : this.props.simParams.lastLocation;
                hashHistory.push({
                    pathname: authRoot,
                    query: this.props.location.query
                });
            }
        });
    };

    updateName = e => this.setState({ name: e.target.value });
    updateEmail = e => this.setState({ email: e.target.value });
    updatePassword = e =>
        this.setState({ password: e.target.value, confirm: e.target.value });
    togglePasswordVisibility = e =>
        this.setState({ showPassword: !this.state.showPassword });

    validateEmail = email => {
        // eslint-disable-next-line
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    handleSubmit = () => {
        this.setState({ submitted: true }, () =>
            this.props.actions
                .register(
                    this.state.name,
                    this.state.email,
                    this.state.password,
                    this.state.confirm
                )
                .then(response => {
                    if (response.status === "error") {
                        this.setState({
                            submitted: false,
                            errorRaised: true,
                            errorMessages: response.err.errors.full_messages
                        });
                    } else {
                        hashHistory.push("/");
                    }
                })
                .catch(error => {
                    this.setState({
                        submitted: false,
                        errorRaised: true,
                        errorMessages:
                            error.err.response.err.errors.full_messages
                    });
                })
        );
    };

    render() {
        let backStyle = {
            position: "fixed",
            right: "0",
            bottom: "0",
            minWidth: "100%",
            minHeight: "100%"
        };
        let overlayStyle = {
            ...backStyle,
            background: "rgba(255,255,255,0.5)"
        };
        let coLogoStyle = {
            width: "90%",
            margin: "0 5%",
            display: "block"
        };

        let component = {};
        if (this.state.authenticated) {
            component = (
                <AuthConfirmation
                    {...this.props}
                    setLoggedOut={this.setLoggedOut}
                />
            );
        } else {
            const boxStyle = {
                ...AppConfig.boxStyle,
                background: AppConfig.colors.master,
                color: "#ffffff",
                marginTop: "-32px"
            };
            switch (this.props.location.pathname) {
                case AppConfig.auth.routes.forgotPassword:
                    component = <ForgotPassword {...this.props} />;
                    break;
                case AppConfig.auth.routes.logout:
                    component = (
                        <Login
                            {...this.props}
                            setAuthenticated={this.setAuthenticated}
                            apiUrl={this.props.apiUrl}
                        />
                    );
                    break;
                case "/register":
                    component = (
                        <div style={boxStyle}>
                            <Form
                                loading={this.state.submitted ? true : false}
                                error={
                                    this.state.errorRaised
                                        ? true
                                        : this.props.location.query
                                        ? true
                                        : false
                                }
                                onSubmit={this.handleSubmit}
                            >
                                <Message
                                    hidden={!this.state.errorRaised}
                                    visible={this.state.errorRaised}
                                    error
                                    header="There were some errors with your submission"
                                    list={this.state.errorMessages}
                                />
                                <h1>Register</h1>
                                <Form.Field>
                                    <label>Name</label>
                                    <Popup
                                        trigger={
                                            <Input
                                                fluid
                                                placeholder="Enter your Name"
                                                onChange={this.updateName}
                                            />
                                        }
                                        header="Name"
                                        content={
                                            "Please enter your Name"
                                        }
                                        on="focus"
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Email Id</label>
                                    <Popup
                                        trigger={
                                            <Input
                                                fluid
                                                placeholder="Enter your email id"
                                                onChange={this.updateEmail}
                                            />
                                        }
                                        header="Email Id"
                                        content={
                                            getAppConfig().registration
                                                .restricted
                                                ? "You can only register with " +
                                                  getAppConfig().registration.allowedDomains.join(
                                                      ", "
                                                  ) +
                                                  " domains"
                                                : "Please enter a valid email id"
                                        }
                                        on="focus"
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Password</label>
                                    <Input
                                        fluid
                                        type={
                                            this.state.showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        icon={
                                            <Icon
                                                name={
                                                    this.state.showPassword
                                                        ? "eye"
                                                        : "eye slash outline"
                                                }
                                                link
                                                onClick={
                                                    this
                                                        .togglePasswordVisibility
                                                }
                                            />
                                        }
                                        placeholder="Enter a password"
                                        onChange={this.updatePassword}
                                    />
                                </Form.Field>
                                <Button
                                    fluid
                                    secondary
                                    disabled={
                                        this.state.email === "" ||
                                        this.state.password === ""
                                    }
                                >
                                    Register
                                </Button>
                                <Segment basic style={{ textAlign: "center" }}>
                                    <div>Already registered?</div>
                                    <a href="/#/login">Login </a>
                                </Segment>
                            </Form>
                        </div>
                    );
                    break;
                default:
                    component = (
                        <Login
                            {...this.props}
                            setAuthenticated={this.setAuthenticated}
                            apiUrl={this.props.apiUrl}
                        />
                    );
                    break;
            }
        }

        return (
            <div style={{ height: "100vh", position: "relative" }}>
                <video autoPlay muted loop style={backStyle}>
                    <source
                        src="assets/images/configurable/simbg.mp4"
                        type="video/mp4"
                    />
                </video>
                <div style={overlayStyle} />
                <FlexBox>
                    <div>
                        <img
                            src={"assets/images/configurable/cologo.png"}
                            alt="logo"
                            style={coLogoStyle}
                        />
                        <br/>
                        <br/>
                        <Grid padded divided>
                            <Grid.Row>
                                <Grid.Column width={16}>{component}</Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                </FlexBox>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        simParams: state.simParams
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: {
            register: (name, email, password, confirm) => {
                return dispatch(
                    AuthenticationAction.register(
                        name,
                        email,
                        password,
                        confirm
                    )
                );
            },
            login: (email, password, domain) => {
                return dispatch(
                    AuthenticationAction.login(email, password, domain)
                );
            },
            logout: () => {
                return dispatch(AuthenticationAction.logout());
            },
            session: () => {
                return dispatch(AuthenticationAction.session());
            },
            omniAuth: userDetail => {
                return dispatch(AuthenticationAction.omniAuthLogin(userDetail));
            },
            forgotPassword: email => {
                return dispatch(AuthenticationAction.forgotPassword(email));
            }
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthenticationContainer);
