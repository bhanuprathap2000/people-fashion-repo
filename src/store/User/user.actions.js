import * as actionTypes from '../actionTypes';
const setCurrentUser = (user) => {
	return {
		type: actionTypes.SET_CURRENT_USER,
		payload: user,
	};
};

export default setCurrentUser;
