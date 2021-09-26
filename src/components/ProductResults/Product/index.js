import React from 'react';
import { Link,useHistory } from 'react-router-dom';
import Button from './../../forms/Buttons';
import { useDispatch } from 'react-redux';
import { addProduct } from './../../../store/Cart/cart.actions';

const Product = (product) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const {
	  documentID,
	  productThumbnail,
	  productName,
	  productPrice
	} = product;
	if (
		!documentID ||
		!productThumbnail ||
		!productName ||
		typeof productPrice === 'undefined'
	)
		return null;

	const configAddToCartBtn = {
		type: 'button',
	};

	const handleAddToCart = (product) => {
		if (!product) return;
		dispatch(
		  addProduct(product)
		)
	  };

	return (
		<div className="product">
			<div  className="thumb">
				<Link to={`/product/${documentID}`}>
					<img src={productThumbnail} alt={productName} />
				</Link>
			</div>

			<div className="details">
				<ul>
					<li>
						<span className="name">
							<Link to={`/product/${documentID}`}>{productName}</Link>
						</span>
					</li>
					<li>
						<span className="price">₹{productPrice}</span>
					</li>
					<li>
						<div className="addToCart">
							<Button {...configAddToCartBtn} onClick={() => {
								handleAddToCart(product)
								history.push('/cart')
							}} >Add To Cart</Button>
						</div>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Product;
