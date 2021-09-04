import React, { Component } from 'react';
import './styles.scss';
import Button from './../forms/Buttons';
import { signInWithGoogle, auth } from './../../firebase/utils';
import FormInput from './../forms/FormInput';
import AuthWrapper from '../AuthWrapper';
import { Link } from 'react-router-dom';

const initialState = {
	email: '',
	password: '',
	errors: [],
};

class SignIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...initialState,
		};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		//this function responsibele for updating the state
		const { name, value } = e.target;
		this.setState({
			[name]: value,
		});
	}

	handleSubmit = async (e) => {
		/*
		
		so this function will run when we click on the submit and we destruture the email and password
		and then using  the auth instance call the siginWithemailandpassword and pass the details
		we are doing this in try catch block because their might be any error that can occur during the
		sigin
		when it is sucessful we reset the form 
		*/
		e.preventDefault();
		const { email, password } = this.state;

		try {
			await auth.signInWithEmailAndPassword(email, password);
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
		const { email, password, errors } = this.state;
		const configAuthWrapper = {
			headline: 'LogIn',
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
					<form onSubmit={this.handleSubmit}>
						<FormInput
							type="email"
							name="email"
							value={email}
							placeholder="Email"
							handleChange={this.handleChange}
						/>

						<FormInput
							type="password"
							name="password"
							value={password}
							placeholder="Password"
							handleChange={this.handleChange}
						/>

						<Button type="submit">LogIn</Button>

						<div className="socialSignin">
							<div className="row">
								<Button onClick={signInWithGoogle}>Sign in with Google</Button>
							</div>
						</div>
						<div className="links">
							<Link to="/recovery">Reset Password</Link>
						</div>
					</form>
				</div>
			</AuthWrapper>
		);
	}
}

export default SignIn;
