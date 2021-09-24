import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchProductStart,
	setProduct,
} from './../../store/Products/products.actions';
import Button from './../forms/Buttons';
import { addProduct } from './../../store/Cart/cart.actions';

import './styles.scss';

const mapState = (state) => ({
	product: state.productsData.product,
});

const ProductCard = ({}) => {
	const dispatch = useDispatch();
	const { productID } = useParams();
	const { product } = useSelector(mapState);

	const { productThumbnail, productName, productPrice, productDesc } = product;

	useEffect(() => {
		dispatch(fetchProductStart(productID));

		return () => {
			dispatch(setProduct({}));
		};
	}, []);

	const handleAddToCart = (product) => {
		if (!product) return;
		dispatch(
		  addProduct(product)
		)
	  }

	const configAddToCartBtn = {
		type: 'button',
	};

	return (
		<div className="productCard">
			<div className="hero">
				<img src={productThumbnail} />
			</div>
			<div className="productDetails">
				<ul>
					<li>
						<h1>{productName}</h1>
					</li>
					<li>
						<span>₹{productPrice}</span>
					</li>
					<li>
						<div className="addToCart">
						<Button {...configAddToCartBtn} onClick={() => handleAddToCart(product)}>Add To Cart</Button>

						</div>
					</li>
					<li>
						<span
							className="desc"
							dangerouslySetInnerHTML={{ __html: productDesc }}
						/>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default ProductCard;
