import * as actionTypes from '../actionTypes';
import {
	auth,
	handleUserProfile,
	GoogleProvider,
} from './../../firebase/utils';
export const setCurrentUser = (user) => {
	return {
		type: actionTypes.SET_CURRENT_USER,
		payload: user,
	};
};

export const resetAllAuthForms = () => ({
	type: actionTypes.RESET_AUTH_FORMS,
});

export const signInUser =
	({ email, password }) =>
	async (dispatch) => {
		try {
			await auth.signInWithEmailAndPassword(email, password);
			dispatch({
				type: actionTypes.SIGN_IN_SUCCESS,
				payload: true,
			});
		} catch (err) {
			dispatch({
				type: actionTypes.SIGN_IN_ERROR,
				payload: [err.message],
			});
		}
	};
export const signOutUser = () => async (dispactch) => {
	auth.signOut();
	dispactch({ type: actionTypes.SIGN_OUT, payload: false });
};

export const signUpUser =
	({ displayName, email, password, confirmPassword }) =>
	async (dispatch) => {
		if (password !== confirmPassword) {
			const err = "Password Don't match";
			dispatch({
				type: actionTypes.SIGN_UP_ERROR,
				payload: [err],
			});
			return;
		}

		try {
			const { user } = await auth.createUserWithEmailAndPassword(
				email,
				password
			);

			await handleUserProfile(user, { displayName });
			dispatch({
				type: actionTypes.SIGN_UP_SUCCESS,
				payload: true,
			});
		} catch (err) {
			dispatch({
				type: actionTypes.SIGN_UP_ERROR,
				payload: [err.message],
			});
		}
	};
export const resetPassword =
	({ email, handleSnackbar }) =>
	async (dispatch) => {
		const config = {
			url: 'http://localhost:3000/login',
		};

		try {
			await auth
				.sendPasswordResetEmail(email, config)
				.then(() => {
					handleSnackbar();
					dispatch({
						type: actionTypes.RESET_PASSWORD_SUCCESS,
						payload: true,
					});
				})
				.catch(() => {
					const err = ['Email not found. Please try again.'];
					dispatch({
						type: actionTypes.RESET_PASSWORD_ERROR,
						payload: err,
					});
				});
		} catch (err) {
			// console.log(err);
		}
	};

export const signInWithGoogle = () => async (dispatch) => {
	try {
		await auth.signInWithPopup(GoogleProvider).then(() => {
			dispatch({
				type: actionTypes.SIGN_IN_SUCCESS,
				payload: true,
			});
		});
	} catch (err) {
		// console.log(err);
	}
};
