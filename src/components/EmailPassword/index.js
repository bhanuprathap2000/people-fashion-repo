import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './styles.scss';

import AuthWrapper from './../AuthWrapper';
import FormInput from './../forms/FormInput';
import Button from './../forms/Buttons';

import { auth } from './../../firebase/utils';

const EmailPassword = (props) => {
	const [email, setEmail] = useState();
	const [errors, setErrors] = useState([]);
	const history = useHistory();

	const handleSubmit = async (e) => {
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
			//redirect uri after password reset
			const config = {
				url: 'http://localhost:3000/login',
			};

			await auth
				.sendPasswordResetEmail(email, config)
				.then(() => {
					props.handleSnackbar();
					history.push('/login');
				})
				.catch(() => {
					const err = ['Email not found. Please try again.'];
					setErrors(err);
				});
		} catch (err) {
			// console.log(err);
		}
	};

	const configAuthWrapper = {
		headline: 'Email Password Reset',
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

					<form onSubmit={handleSubmit}>
						<FormInput
							type="email"
							name="email"
							value={email}
							placeholder="Email"
							handleChange={(e) => setEmail(e.target.value)}
						/>

						<Button type="submit">Email Password Reset</Button>
					</form>
				</div>
			</AuthWrapper>
		</>
	);
};

export default EmailPassword;
