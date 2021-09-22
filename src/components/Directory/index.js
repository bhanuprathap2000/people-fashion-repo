import React from 'react';
import ShopMen from '../../assests/shopMens.jpg';
import ShopWomen from '../../assests/shopWomens.jpg';
import { Link } from 'react-router-dom';
import './styles.scss';

const Directory = (props) => {
	return (
		<div className="directory">
			<div className="wrap">
				<div
					className="item"
					style={{
						backgroundImage: `url(${ShopWomen})`,
					}}>
					<Link to="/search/womens">Shop Womens</Link>
				</div>
				<div
					className="item"
					style={{
						backgroundImage: `url(${ShopMen})`,
					}}>
					<Link to="/search/mens">Shop Mens</Link>
				</div>
			</div>
		</div>
	);
};

export default Directory;
