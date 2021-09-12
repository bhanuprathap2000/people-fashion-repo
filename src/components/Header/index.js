import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './styles.scss';
import { Link } from 'react-router-dom';
import Logo from '../../assests/logo.png';
import { signOutUser } from '../../store/User/user.actions';

const Header = (props) => {
	const { currentUser } = useSelector((state) => state.user);
	const dispatch = useDispatch();

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
								<span onClick={() => dispatch(signOutUser())}>LogOut</span>
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
// const matchStateToProps = ({ user }) => {
// 	return {
// 		currentUser: user.currentUser,
// 	};
// };

//this is a higher order component concept
export default Header;
