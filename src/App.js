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
import Recovery from './pages/Recovery';

import './default.scss';
import Snackbar from '@material-ui/core/Snackbar';

import { connect } from 'react-redux';
import setCurrentUser from './store/User/user.actions';

const initialState = {
	open: false,
};

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...initialState,
		};
	}
	handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		this.setState({ open: false });
	};

	handleSnackbar = () => {
		this.setState({ open: true });
	};

	authListener = null;

	componentDidMount() {
		const { setCurrentUser } = this.props;
		/*
		working
		so after the component is mounted then we will setup a listener and which will be listening for 
		auth changes if user login we receive the user object and if logout then we will receive null
		assuming the user is logged in inside the if check is there
		we pass that user object to handleUserProfile function (please look into that function what it does)
		then we get back a user reference we setup a listener for that document and then update our local state 
		of the current  user
		if logged out then reset the state of the current user using the setCurrentUser function
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
					setCurrentUser({
						currentUser: {
							id: snapshot.id,
							...snapshot.data(),
						},
					});
				});
			}

			setCurrentUser(userAuth);
		});
	}

	componentWillUnmount() {
		this.authListener();
	}

	render() {
		const { open } = this.state;
		const { currentUser } = this.props;

		return (
			<>
				<div className="App">
					<Switch>
						<Route
							exact
							path="/"
							render={() => (
								<HomepageLayout>
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
									<MainLayout>
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
									<MainLayout>
										<Login />
									</MainLayout>
								)
							}
						/>
						<Route
							path="/recovery"
							render={() => (
								<MainLayout>
									<Recovery handleSnackbar={this.handleSnackbar} />
								</MainLayout>
							)}
						/>
					</Switch>
				</div>
				<Snackbar
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'left',
					}}
					open={open}
					autoHideDuration={6000}
					onClose={this.handleClose}
					message="Reset Link sent to Email"
				/>
			</>
		);
	}
}

//so what does this mapStateToProps do is it connects redux store to the props of the component

const mapStateToProps = ({ user }) => {
	return {
		currentUser: user.currentUser,
	};
};

//what does the mapDispatchToProps do is that we can create functions which when called will dispatch the actions and make available these functions to
//component to call them as props.
//  i prefer return {}-.explict return  thyan this ({})->implict return
const mapDispatchToProps = (dispatch) => {
	return {
		setCurrentUser: (user) => dispatch(setCurrentUser(user)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
