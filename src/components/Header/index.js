import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signOutUserStart } from './../../store/User/user.actions';
import { selectCartItemsCount } from './../../store/Cart/cart.selectors';

import './styles.scss';
import { Link } from 'react-router-dom';

const mapState = (state) => ({
	currentUser: state.user.currentUser,
	totalNumCartItems: selectCartItemsCount(state)
  });

const Header = (props) => {
	const dispatch = useDispatch();
	const { currentUser, totalNumCartItems } = useSelector(mapState);

	const signOut = () => {
		dispatch(signOutUserStart());
	};

	return (
		<header className="header">
			<div className="wrap">
				<div className="logo">
					<Link to="/">
						<h3>People Fashion</h3>
					</Link>
				</div>
				<nav>
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/search">Search</Link>
						</li>
					</ul>
				</nav>
				<div className="callToActions">

<ul>

  <li>
	<Link to="/cart">
	  Your Cart ({totalNumCartItems})
	</Link>
  </li>

  {currentUser && [
							<li key={ 1}>
	  <Link to="/dashboard">
		My Account
	  </Link>
	</li>,
							<li key={ 2}>
	  <span onClick={() => signOut()}>
		LogOut
	  </span>
	</li>
  ]}

  {!currentUser && [
	<li  key={ 1}>
	  <Link to="/registration">
		Register
	  </Link>
	</li>,
	<li  key={ 2}>
	  <Link to="/login">
		Login
	  </Link>
	</li>
  ]}

</ul>





</div>
</div>
		</header>
	);
};

Header.defaultProps = {
	currentUser: null,
};

export default Header;
