import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utils';

// layouts
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';

// pages
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import Login from './pages/Login';
import './default.scss';

const initialState = {
	currentUser: null,
};

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...initialState,
		};
	}

	authListener = null;

	componentDidMount() {
		/*
		working
		so after the component is mounted then we will setup a listener and which will be listening for 
		auth changes if user login we receive the user object and if logout then we will receive null
		assuming the user is logged in inside the if check is there
		we pass that user object to handleUserProfile function (please look into that function what it does)
		then we get back a user reference we setup a listener for that document and then update our local state 
		of the current  user
		if logged out then reset the state of the current user
		in the render function we destruture the current user and pass to all the routes
		and based on the current we show the registartion,login or logout
		if already login redirect back to the homepage
		inside the render prop of the route we will render the components based on the current user for 
		login route rest only the layout wrapping.
		
		*/
		this.authListener = auth.onAuthStateChanged(async (userAuth) => {
			console.log(userAuth);

			if (userAuth) {
				const userRef = await handleUserProfile(userAuth);
				userRef.onSnapshot((snapshot) => {
					this.setState({
						currentUser: {
							id: snapshot.id,
							...snapshot.data(),
						},
					});
				});
			}

			this.setState({
				...initialState,
			});
		});
	}

	componentWillUnmount() {
		this.authListener();
	}

	render() {
		const { currentUser } = this.state;

		return (
			<div className="App">
				<Switch>
					<Route
						exact
						path="/"
						render={() => (
							<HomepageLayout currentUser={currentUser}>
								<Homepage />
							</HomepageLayout>
						)}
					/>
					<Route
						path="/registration"
						render={() =>
							currentUser ? (
								<Redirect to="/" />
							) : (
								<MainLayout currentUser={currentUser}>
									<Registration />
								</MainLayout>
							)
						}
					/>
					<Route
						path="/login"
						render={() =>
							currentUser ? (
								<Redirect to="/" />
							) : (
								<MainLayout currentUser={currentUser}>
									<Login />
								</MainLayout>
							)
						}
					/>
				</Switch>
			</div>
		);
	}
}

export default App;
