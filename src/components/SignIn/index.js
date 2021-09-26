import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
	emailSignInStart,
	googleSignInStart,
} from './../../store/User/user.actions';

import './styles.scss';

import AuthWrapper from './../AuthWrapper';
import FormInput from './../forms/FormInput';
import Button from './../forms/Buttons';

const SignIn = (props) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { currentUser, userErr } = useSelector((state) => state.user);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState([]);

	useEffect(() => {
		if (currentUser) {
			resetForm();
			history.push('/');
		}
	}, [currentUser]);

	useEffect(() => {
		if (Array.isArray(userErr) && userErr.length > 0) {
			setErrors(userErr);
		}
	}, [userErr]);

	const resetForm = () => {
		setEmail('');
		setPassword('');
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(emailSignInStart({ email, password }));
	};

	const handleGoogleSignIn = () => {
		dispatch(googleSignInStart());
	};

	const configAuthWrapper = {
		headline: 'LogIn',
	};

	return (
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
						<Link to="/registration">Register</Link>
						{` | `}
						<Link to="/login">LogIn</Link>
						{` | `}
						<Link to="/recovery">Reset Password</Link>
					</div>
				</form>
			</div>
		</AuthWrapper>
	);
};

export default SignIn;
