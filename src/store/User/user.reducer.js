import * as actionTypes from '../actionTypes';

const INITIAL_STATE = {
	currentUser: null,
	signInSuccess: false,
	signUpSuccess: false,
	signInError: [],
	signUpError: [],
	resetPasswordSuccess: false,
	resetPasswordError: [],
};

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case actionTypes.SET_CURRENT_USER:
			return {
				...state,
				currentUser: action.payload,
			};
		case actionTypes.SIGN_IN_SUCCESS:
			return {
				...state,
				signInSuccess: action.payload,
			};
		case actionTypes.SIGN_IN_ERROR:
			return {
				...state,
				signInError: action.payload,
			};
		case actionTypes.SIGN_OUT:
			return {
				...state,
				signInSuccess: action.payload,
				signUpSuccess: action.payload,
			};
		case actionTypes.SIGN_UP_SUCCESS:
			return {
				...state,
				signUpSuccess: action.payload,
			};
		case actionTypes.SIGN_UP_ERROR:
			return {
				...state,
				signUpError: action.payload,
			};

		case actionTypes.RESET_PASSWORD_SUCCESS:
			return {
				...state,
				resetPasswordSuccess: action.payload,
			};
		case actionTypes.RESET_PASSWORD_ERROR:
			return {
				...state,
				resetPasswordError: action.payload,
			};
		case actionTypes.RESET_AUTH_FORMS:
			return {
				...state,
				signInSuccess: false,
				signUpSuccess: false,
				signUpError: [],
				resetPasswordSuccess: false,
				resetPasswordError: [],
			};

		default:
			return state;
	}
};

export default userReducer;
