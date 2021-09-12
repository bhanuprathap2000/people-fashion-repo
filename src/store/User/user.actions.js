import actionTypes from '../actionTypes';

export const emailSignInStart = (userCredentials) => ({
	type: actionTypes.EMAIL_SIGN_IN_START,
	payload: userCredentials,
});

export const signInSuccess = (user) => ({
	type: actionTypes.SIGN_IN_SUCCESS,
	payload: user,
});

export const checkUserSession = () => ({
	type: actionTypes.CHECK_USER_SESSION,
});

export const signOutUserStart = () => ({
	type: actionTypes.SIGN_OUT_USER_START,
});

export const signOutUserSuccess = () => ({
	type: actionTypes.SIGN_OUT_USER_SUCCESS,
});

export const signUpUserStart = (userCredentials) => ({
	type: actionTypes.SIGN_UP_USER_START,
	payload: userCredentials,
});

export const userError = (err) => ({
	type: actionTypes.USER_ERROR,
	payload: [err],
});

export const resetPasswordStart = (userCredentials) => ({
	type: actionTypes.RESET_PASSWORD_START,
	payload: userCredentials,
});

export const resetPasswordSuccess = () => ({
	type: actionTypes.RESET_PASSWORD_SUCCESS,
	payload: true,
});

export const resetUserState = () => ({
	type: actionTypes.RESET_USER_STATE,
});

export const googleSignInStart = () => ({
	type: actionTypes.GOOGLE_SIGN_IN_START,
});
