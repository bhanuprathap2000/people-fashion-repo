import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);
//auth and firestore instances to be used wherever needed
export const auth = firebase.auth();
export const firestore = firebase.firestore();
//we can have multiple provider here we are using the google provider
const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt: 'select_account' });
//this function will be called when we click on the button signin with google
export const signInWithGoogle = () => auth.signInWithPopup(GoogleProvider);
//this function is responsible for creating the new users in the users collection
//because the users will be in different table in the auth section so we can create a
//seperate section for users
export const handleUserProfile = async (userAuth, additionalData) => {
	/*
	it takes a user object and any additional data as props if user not signin then simply return 
	if user exsists then destrture it
	then get a reference to the users collection  with uid if not there it will created (i mean reference)
	then call the get method if there it returns that snapshot if not then we can check the exists prperty
	if no document with that matching uid then exists is false if match then true
	if not match then we need to create the new user in the users collection
	if exists return back that reference or create a document and return back that reference
	*/
	if (!userAuth) return;
	const { uid } = userAuth;

	const userRef = firestore.doc(`users/${uid}`);
	const snapshot = await userRef.get();

	if (!snapshot.exists) {
		const { displayName, email } = userAuth;
		const timestamp = firebase.firestore.FieldValue.serverTimestamp();

		try {
			await userRef.set({
				displayName,
				email,
				createdDate: timestamp,
				...additionalData,
			});
		} catch (err) {
			// console.log(err);
		}
	}
	return userRef;
};
