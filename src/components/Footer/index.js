import React from 'react';
import './styles.scss';

const Footer = (props) => {
	const date = new Date();
	const year = date.getFullYear();
	return (
		<footer className="footer">
			<div className="wrap">© People Fashion {year}</div>
		</footer>
	);
};

export default Footer;
