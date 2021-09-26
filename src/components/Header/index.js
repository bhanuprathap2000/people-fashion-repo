import React, { useState,useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signOutUserStart } from './../../store/User/user.actions';
import { selectCartItemsCount } from './../../store/Cart/cart.selectors';
import { Link, useLocation  } from 'react-router-dom';

import './styles.scss';

const mapState = (state) => ({
	currentUser: state.user.currentUser,
	totalNumCartItems: selectCartItemsCount(state)
  });

const Header = (props) => {
	const location = useLocation();
	const [activeMenu, setActiveMenu] = useState(false);
	const dispatch = useDispatch();
	const { currentUser, totalNumCartItems } = useSelector(mapState);

	const signOut = () => {
		dispatch(signOutUserStart());
	};

	useEffect(() => {
		setActiveMenu(false);
	  }, [location]);
	return (
		<header className="header">
			<div className="wrap">
				<div className="logo">
					<Link to="/">
						<h3>People Fashion</h3>
					</Link>
				</div>
				<nav className={`mainMenu ${activeMenu ? 'active' : ''}`}>
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
								<i class="fas fa-shopping-basket"></i>
	</Link>
  </li>

  {currentUser && [
							<li key={ 1}>
	  <Link to="/dashboard">
			  My Account
			  <i class="fas fa-user-circle"></i>
	  </Link>
	</li>,
							<li key={ 2}>
	  <span onClick={() => signOut()}>
									LogOut
									<i class="fas fa-sign-out-alt"></i>
	  </span>
	</li>
  ]}

  {!currentUser && [
	<li key={1} className="hideOnMobile">
	  <Link to="/registration">
		Register
	  </Link>
	</li>,
	<li  key={ 2}>
	  <Link to="/login">
			Login
			<i class="fas fa-user-circle"></i>
	  </Link>
	</li>
						]}
						<li className="mobileMenu">
              <span onClick={() => setActiveMenu(!activeMenu)}>
                <i className="fas fa-bars"></i>
              </span>
            </li>

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
