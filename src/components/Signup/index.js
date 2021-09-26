import React, { Component } from 'react';
import './styles.scss';
import { auth, handleUserProfile } from './../../firebase/utils';
import FormInput from './../forms/FormInput';
import Button from './../forms/Buttons';
import AuthWrapper from '../AuthWrapper';

const initialState = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
	errors: [],
};

class Signup extends Component {
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

	handleFormSubmit = async (event) => {
		/*
      this function will run when we try to register 
      get the details from the form and check whether the password and confirm password are the same
      if not render those errors by setting the error state
      if no errors then call the auth.createUserWithEmailAndPassword with the details
      and once the user is created we get back the user
      but not over this just creteas the record for firebase but we are maintaining the
      user in seperate collection hence we need to pass the user reference to the
      handleUserProfile and then if exisits reference is created of not then new user is created 
      and then reset the form 
      we are doing this in try catch form because if we try register with existing email
      then firebase maynot allow that's to catch the error using the try catch
      
      */
		event.preventDefault();
		const { displayName, email, password, confirmPassword } = this.state;

		if (password !== confirmPassword) {
			const err = ["Password Don't match"];
			this.setState({
				errors: err,
			});
			return;
		}

		try {
			const { user } = await auth.createUserWithEmailAndPassword(
				email,
				password
			);

			await handleUserProfile(user, { displayName });

			this.setState({
				...initialState,
			});
		} catch (err) {
			console.table(err);
			this.setState({
				errors: [err.message],
			});
		}
	};

	render() {
		const { displayName, email, password, confirmPassword, errors } =
			this.state;
		const configAuthWrapper = {
			headline: 'Registration',
		};

		return (
			<AuthWrapper {...configAuthWrapper}>
				{errors.length > 0 && (
					<ul>
						{errors.map((err, index) => {
							return <li key={index}>{err}</li>;
						})}
					</ul>
				)}

				<div className="formWrap">
					<form onSubmit={this.handleFormSubmit}>
						<FormInput
							type="text"
							name="displayName"
							value={displayName}
							placeholder="Full name"
							onChange={this.handleChange}
						/>

						<FormInput
							type="email"
							name="email"
							value={email}
							placeholder="Email"
							onChange={this.handleChange}
						/>

						<FormInput
							type="password"
							name="password"
							value={password}
							placeholder="Password"
							onChange={this.handleChange}
						/>

						<FormInput
							type="password"
							name="confirmPassword"
							value={confirmPassword}
							placeholder="Confirm Password"
							onChange={this.handleChange}
						/>

						<Button type="submit">Register</Button>
					</form>
				</div>
			</AuthWrapper>
		);
	}
}

export default Signup;
