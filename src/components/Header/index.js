import React from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';
import { auth } from './../../firebase/utils';
import Logo from '../../assests/logo.png';
import { connect } from 'react-redux';

const Header = (props) => {
	const { currentUser } = props;

	return (
		<header className="header">
			<div className="wrap">
				<div className="logo">
					<Link to="/">
						<img src={Logo} alt="SimpleTut LOGO" />
					</Link>
				</div>

				<div className="callToActions">
					{currentUser && (
						<ul>
							<li>
								<Link to="/dashboard">My Account</Link>
							</li>
							<li>
								<span onClick={() => auth.signOut()}>LogOut</span>
							</li>
						</ul>
					)}

					{!currentUser && (
						<ul>
							<li>
								<Link to="/registration">Register</Link>
							</li>
							<li>
								<Link to="/login">Login</Link>
							</li>
						</ul>
					)}
				</div>
			</div>
		</header>
	);
};

Header.defaultProps = {
	currentUser: null,
};

//Here we are connecting the redux store to the component props
//we are destructuring the required fronm the redux store(user) and return them  and they will be avialable as
//component props
const matchStateToProps = ({ user }) => {
	return {
		currentUser: user.currentUser,
	};
};

//this is a higher order component concept
export default connect(matchStateToProps, null)(Header);
