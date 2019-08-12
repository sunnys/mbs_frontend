// Import from NPM
// -------------------------------------
import React from 'react';
import { Form, Message } from 'semantic-ui-react';
import _ from 'lodash';
import { Link } from 'react-router';

// Import from Config
// -------------------------------------
import QuoButton from './../../../globals/semantic/QuoButton.react';
import { AppConfig } from './../../../config/app.config';

export default class ForgotPassword extends React.Component {
	constructor(props) {
		super(props);
        this.state = { email: '', isFetching: false, errorRaised: false, errorMessages: [], success: false, successMessages: [] };
	}
	handleSubmit = () => {
		const email = this.state.email;
		this.setState({ isFetching: true, errorRaised: false, success: false });
		this.props.actions
			.forgotPassword(email)
			.then(response => {
				if (this.props.auth.status === 'error') {
					this.setState({
						isFetching: false,
						errorRaised: true,
						errorMessages: response.err.errors,
					});
                } else {
                    this.setState({ isFetching: false, success: true, successMessages: [response.message] });
				}
			})
			.catch(err => {
                this.setState({ isFetching: false, errorRaised: true, errorMessages: err.errors });
			});
	};
	handleChange = (e, { name, value }) => {
		this.setState({ [name]: value });
	};

	getErrors = () => {
		let error = '';
		if (this.state.errorRaised) {
			error = _.join(this.state.errorMessages, '\n');
		}
		return error;
	};

    getSuccess = () => {
        let success = '';
        if (this.state.success) {
            success = _.join(this.state.successMessages, '\n');
        }
        return success;
    };

	render() {
		// const style = {
		//     padding: "30px",padding: "30px",
		//     background: "#fff",
		//     width: "80%",
		//     margin: "10%"
		// };
		let forgotPasswordPage = {
			email: {
				placeholder: 'Enter Email',
				text: 'Email',
			},
			login: 'Login?',
			send_email: 'Send Mail',
		}
		return (
			<div style={AppConfig.style}>
				<Form
					loading={this.state.isFetching ? true : false}
					error={this.state.errorRaised}
					success={this.state.success}
					onSubmit={this.handleSubmit}>
					<Message error content={this.getErrors()} />
					<Message success content={this.getSuccess()} />
					<Form.Input
						label={forgotPasswordPage.email.text}
						name="email"
						type="email"
						value={this.state.email}
						onChange={this.handleChange}
						onCopy={(e) => { e.preventDefault(); return false }}
						onPaste={(e) => { e.preventDefault(); return false }}
						placeholder={forgotPasswordPage.email.placeholder}
					/>
					<QuoButton>{forgotPasswordPage.send_email}</QuoButton>
					<Link to={AppConfig.auth.routes.login}>{forgotPasswordPage.login}</Link>
				</Form>
			</div>
		);
	}
}
