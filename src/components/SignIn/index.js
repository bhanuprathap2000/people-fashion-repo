import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './styles.scss';
import Button from './../forms/Buttons';
import FormInput from './../forms/FormInput';
import AuthWrapper from '../AuthWrapper';
import { Link } from 'react-router-dom';
import { signInUser, signInWithGoogle } from '../../store/User/user.actions';

const SignIn = (props) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const history = useHistory();
	const [errors, setErrors] = useState([]);
	const { signInSuccess, signInError } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const resetForm = () => {
		setEmail('');
		setPassword('');
	};

	useEffect(() => {
		if (signInSuccess) {
			resetForm();
			history.push('/');
		}
	}, [signInSuccess]);

	useEffect(() => {
		if (Array.isArray(signInError) && signInError.length > 0) {
			setErrors(signInError);
		}
	}, [signInError]);

	const handleSubmit = (e) => {
		/*
		
		so this function will run when we click on the submit and we prevent the default behaviour
		and then using  the auth instance call the siginWithemailandpassword and pass the details
		we are doing this in try catch block because their might be any error that can occur during the
		sigin
		when it is sucessful we reset the form 
		*/
		e.preventDefault();

		dispatch(signInUser({ email, password }));
	};
	const handleGoogleSignIn = () => {
		dispatch(signInWithGoogle());
	};

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
				<form onSubmit={handleSubmit}>
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

					<Button type="submit">LogIn</Button>

					<div className="socialSignin">
						<div className="row">
							<Button onClick={handleGoogleSignIn}>Sign in with Google</Button>
						</div>
					</div>
					<div className="links">
						<Link to="/recovery">Reset Password</Link>
					</div>
				</form>
			</div>
		</AuthWrapper>
	);
};

export default SignIn;
