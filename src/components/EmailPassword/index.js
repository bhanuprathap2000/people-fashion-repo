import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './styles.scss';

import AuthWrapper from './../AuthWrapper';
import FormInput from './../forms/FormInput';
import Button from './../forms/Buttons';
import {
	resetPassword,
	resetAllAuthForms,
} from './../../store/User/user.actions';

const EmailPassword = ({ handleSnackbar }) => {
	const [email, setEmail] = useState();
	const [errors, setErrors] = useState([]);
	const history = useHistory();
	const dispatch = useDispatch();
	const { resetPasswordSuccess, resetPasswordError } = useSelector(
		(state) => state.user
	);

	useEffect(() => {
		if (resetPasswordSuccess) {
			dispatch(resetAllAuthForms());
			history.push('/login');
		}
	}, [resetPasswordSuccess]);

	useEffect(() => {
		if (Array.isArray(resetPasswordError) && resetPasswordError.length > 0) {
			setErrors(resetPasswordError);
		}
	}, [resetPasswordError]);

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

		dispatch(resetPassword({ email, handleSnackbar }));
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
