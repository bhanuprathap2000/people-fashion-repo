import { takeLatest, call, all, put } from 'redux-saga/effects';
import {
	auth,
	handleUserProfile,
	getCurrentUser,
	GoogleProvider,
} from './../../firebase/utils';
import actionTypes from '../actionTypes';
import {
	signInSuccess,
	signOutUserSuccess,
	resetPasswordSuccess,
	userError,
} from './user.actions';
import { handleResetPasswordAPI } from './user.helpers';
export function* getSnapshotFromUserAuth(user, additionalData = {}) {
	/*
	 so this will accept the user CURRENTLY logged in and 
	checks for it whether i exists in the users collection and if present then returs the rerference
	if not it creates the a new user and returns back the new user reference
	from that reference we fetch the actual user data and then we dispatch that so that redux store 
	will be updated earlier we have setup a listener in app.js but now we have removed it and done this 
	approach and also created a user session approach for maintaining the user even when refresh
	*/
	try {
		const userRef = yield call(handleUserProfile, {
			userAuth: user,
			additionalData,
		});
		const snapshot = yield userRef.get();
		yield put(
			signInSuccess({
				id: snapshot.id,
				...snapshot.data(),
			})
		);
	} catch (err) {
		yield put(userError(err));
		// console.log(err);
	}
}

export function* emailSignIn({ payload: { email, password } }) {
	/*
	This is a worker saga which will be called by watcher saga and gets hold of the total action
	object which we are destructuring it as { payload: { email, password } }
	and then we try to signin the user and if sucessful it return the user tried to signin
	and then calling getSnapshotFromUserAuth(user)
	
	*/
	try {
		const { user } = yield auth.signInWithEmailAndPassword(email, password);
		yield getSnapshotFromUserAuth(user);
	} catch (err) {
		yield put(userError(err.message));
		// console.log(err);
	}
}

export function* onEmailSignInStart() {
	/*
	This is a watcher saga which will watch for dispatching of EMAIL_SIGN_IN_START
	and then calls the emailSignIn
	
	*/
	yield takeLatest(actionTypes.EMAIL_SIGN_IN_START, emailSignIn);
}

export function* isUserAuthenticated() {
	/*
	This is a saga which will run by below worker saga 
	and we have avoided the listeer and made a promise wrapper around it in the firebase utils 
	which will subscribe and ge the userAuth which is either null or current user 
	and instantly unsubscibe from it 
	if userAuth null means just return do nothing that means no user logged in
	if their is a user then use the helper function getSnapshotFromUserAuth(userAuth);
	*/
	try {
		const userAuth = yield getCurrentUser();
		if (!userAuth) return;
		yield getSnapshotFromUserAuth(userAuth);
	} catch (err) {
		// console.log(err);
	}
}

export function* onCheckUserSession() {
	//this saga is listening for this saga and which will called when we rerfresh the application
	yield takeLatest(actionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* signOutUser() {
	//we try to signout and then dispatch action to update the redux store
	try {
		yield auth.signOut();
		yield put(signOutUserSuccess());
	} catch (err) {
		// console.log(err);
	}
}

export function* onSignOutUserStart() {
	//wathcher saga for signout
	yield takeLatest(actionTypes.SIGN_OUT_USER_START, signOutUser);
}

export function* signUpUser({
	payload: { displayName, email, password, confirmPassword },
}) {
	/*
	this will be called when we try to register
	we check if both passwords are equal then dispatch an err
	if not hen we try to create a new user and it returns back a user if sucessfully created
	then pass the user to getSnapshotFromUserAuth so that it updates the redux store
	*/
	if (password !== confirmPassword) {
		const err = "Password Don't match";
		yield put(userError([err]));
		return;
	}

	try {
		const { user } = yield auth.createUserWithEmailAndPassword(email, password);
		const additionalData = { displayName };
		yield getSnapshotFromUserAuth(user, additionalData);
	} catch (err) {
		yield put(userError(err.message));
		console.log(err);
	}
}

export function* onSignUpUserStart() {
	//watcher saga for registartion
	yield takeLatest(actionTypes.SIGN_UP_USER_START, signUpUser);
}

export function* resetPassword({ payload: { email, handleSnackbar } }) {
	//we will pass the handleer funcion to reset and email via call effect
	//if sucessful then call the resetPasswordSucess
	//if not dispatch the error
	try {
		yield call(handleResetPasswordAPI, email);
		yield put(resetPasswordSuccess());
		handleSnackbar();
	} catch (err) {
		yield put(userError(err));
	}
}

export function* onResetPasswordStart() {
	yield takeLatest(actionTypes.RESET_PASSWORD_START, resetPassword);
}

export function* googleSignIn() {
	//this saga will be called by below worker and try to signin with google
	//if successful then use the helper function getSnapshotFromUserAuth(user);
	//if not then dispatch the err
	try {
		const { user } = yield auth.signInWithPopup(GoogleProvider);
		yield getSnapshotFromUserAuth(user);
	} catch (err) {
		yield put(userError(err.message));
		// console.log(err);
	}
}

export function* onGoogleSignInStart() {
	yield takeLatest(actionTypes.GOOGLE_SIGN_IN_START, googleSignIn);
}

export default function* userSagas() {
	yield all([
		call(onEmailSignInStart),
		call(onCheckUserSession),
		call(onSignOutUserStart),
		call(onSignUpUserStart),
		call(onResetPasswordStart),
		call(onGoogleSignInStart),
	]);
}
