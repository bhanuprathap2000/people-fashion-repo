import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import './styles.scss';
import FormInput from './../forms/FormInput';
import Button from './../forms/Buttons';
import AuthWrapper from '../AuthWrapper';
import { signUpUser } from '../../store/User/user.actions';

const Signup = (props) => {
	const [displayName, setDisplayName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errors, setErrors] = useState([]);
	const history = useHistory();
	const dispatch = useDispatch();
	const { signUpSuccess, signUpError } = useSelector((state) => state.user);

	const resetForm = () => {
		setDisplayName('');
		setEmail('');
		setPassword('');
		setConfirmPassword('');
	};

	useEffect(() => {
		if (signUpSuccess) {
			resetForm();
			history.push('/login');
		}
	}, [signUpSuccess]);

	useEffect(() => {
		if (Array.isArray(signUpError) && signUpError.length > 0) {
			setErrors(signUpError);
		}
	}, [signUpError]);

	const handleFormSubmit = (e) => {
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
		e.preventDefault();
		dispatch(signUpUser({ displayName, email, password, confirmPassword }));
	};

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
				<form onSubmit={handleFormSubmit}>
					<FormInput
						type="text"
						name="displayName"
						value={displayName}
						placeholder="Full name"
						handleChange={(e) => setDisplayName(e.target.value)}
					/>

					<FormInput
						type="email"
						name="email"
						value={email}
						placeholder="Email"
						handleChange={(e) => setEmail(e.target.value)}
					/>

					<FormInput
						type="password"
						name="password"
						value={password}
						placeholder="Password"
						handleChange={(e) => setPassword(e.target.value)}
					/>

					<FormInput
						type="password"
						name="confirmPassword"
						value={confirmPassword}
						placeholder="Confirm Password"
						handleChange={(e) => setConfirmPassword(e.target.value)}
					/>

					<Button type="submit">Register</Button>
				</form>
			</div>
		</AuthWrapper>
	);
};

export default Signup;
