import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './styles.scss';

import AuthWrapper from './../AuthWrapper';
import FormInput from './../forms/FormInput';
import Button from './../forms/Buttons';

import { auth } from './../../firebase/utils';

const initialState = {
	email: '',
	errors: [],
};

class EmailPassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...initialState,
		};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({
			[name]: value,
		});
	}

	handleSubmit = async (e) => {
		/*
        on click of the button collect the email from user 
        and we need to create a config object which contains the url to be redirected when the password reset 
        is done sucessfully
        using the auth instance call the sendPasswordResetEmail and pass the email and config
        when sucessfully reset call push to login route 
        if not update the error state so that user can see the error
        
        */
		e.preventDefault();

		try {
			const { email } = this.state;

			const config = {
				url: 'http://localhost:3000/login',
			};

			await auth
				.sendPasswordResetEmail(email, config)
				.then(() => {
					this.props.handleSnackbar();
					this.props.history.push('/login');
				})
				.catch(() => {
					const err = ['Email not found. Please try again.'];
					this.setState({
						errors: err,
					});
				});
		} catch (err) {
			// console.log(err);
		}
	};

	render() {
		const { email, errors } = this.state;

		const configAuthWrapper = {
			headline: 'Email Password',
		};

		return (
			<>
				<AuthWrapper {...configAuthWrapper}>
					<div className="formWrap">
						{errors.length > 0 && (
							<ul>
								{errors.map((e, index) => {
									return <li key={index}>{e}</li>;
								})}
							</ul>
						)}

						<form onSubmit={this.handleSubmit}>
							<FormInput
								type="email"
								name="email"
								value={email}
								placeholder="Email"
								onChange={this.handleChange}
							/>

							<Button type="submit">Email Password</Button>
						</form>
					</div>
				</AuthWrapper>
			</>
		);
	}
}

export default withRouter(EmailPassword);
