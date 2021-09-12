import actionTypes from '../actionTypes';

const INITIAL_STATE = {
	currentUser: null,
	resetPasswordSuccess: false,
	userErr: [],
	snackBarText: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case actionTypes.SIGN_IN_SUCCESS:
			return {
				...state,
				currentUser: action.payload,
				userErr: [],
			};
		case actionTypes.RESET_PASSWORD_SUCCESS:
			return {
				...state,
				resetPasswordSuccess: action.payload,
				snackBarText: 'Reset Link Sent To mail.',
			};
		case actionTypes.USER_ERROR:
			return {
				...state,
				userErr: action.payload,
			};
		case actionTypes.RESET_USER_STATE:
		case actionTypes.SIGN_OUT_USER_SUCCESS:
			return {
				...state,
				...INITIAL_STATE,
			};
		default:
			return state;
	}
};

export default userReducer;
