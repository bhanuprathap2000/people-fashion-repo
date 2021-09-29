import React, { useState, useEffect } from 'react';
import FormInput from './../forms/FormInput';
import Button from './../forms/Buttons';
import {
	selectCartTotal,
	selectCartItemsCount,
	selectCartItems,
} from './../../store/Cart/cart.selectors';
import { saveOrderHistory } from './../../store/Orders/orders.actions';
import { clearCart } from './../../store/Cart/cart.actions';
import { createStructuredSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './styles.scss';
import Razorpay from '../Razorpay';

const initialAddressState = {
	customerName: '',
	line1: '',
	line2: '',
	city: '',
	state: '',
	postal_code: '',
};

const mapState = createStructuredSelector({
	total: selectCartTotal,
	itemCount: selectCartItemsCount,
	cartItems: selectCartItems,
});

const PaymentDetails = () => {
	const history = useHistory();
	const { total, itemCount, cartItems } = useSelector(mapState);
	const dispatch = useDispatch();
	const [billingAddress, setBillingAddress] = useState({
		...initialAddressState,
	});
	const [shippingAddress, setShippingAddress] = useState({
		...initialAddressState,
	});

	const [formFilled, setFormFilled] = useState(false);
	const [checked, setChecked] = useState(false);

	useEffect(() => {
		if (itemCount < 1) {
			history.push('/dashboard');
		}
	}, [itemCount]);

	const handleShipping = (evt) => {
		const { name, value } = evt.target;
		setShippingAddress({
			...shippingAddress,
			[name]: value,
		});
	};

	const handleBilling = (evt) => {
		const { name, value } = evt.target;
		setBillingAddress({
			...billingAddress,
			[name]: value,
		});
	};

	const updatePayment = (result) => {
		return new Promise((resolve) => {
			if (!result) {
				resolve(false);
			} else {
				resolve(true);
			}
		});
	};

	const handlePayment = (pay, razorpayOrderId, razorpayPaymentId) => {
		if (pay) {
			const configOrder = {
				orderTotal: total,
				orderItems: cartItems.map((item) => {
					const {
						documentID,
						productThumbnail,
						productName,
						productPrice,
						quantity,
					} = item;

					return {
						documentID,
						productThumbnail,
						productName,
						productPrice,
						quantity,
					};
				}),
			};
			dispatch(saveOrderHistory(configOrder));
		}
	};

	const handleFormSubmit = async (evt) => {
		evt.preventDefault();

		console.log('hi ');

		if (
			!shippingAddress.line1 ||
			!shippingAddress.city ||
			!shippingAddress.state ||
			!shippingAddress.customerName ||
			!shippingAddress.postal_code ||
			!billingAddress.line1 ||
			!billingAddress.city ||
			!billingAddress.state ||
			!billingAddress.postal_code ||
			!billingAddress.customerName
		) {
			return;
		}

		setFormFilled(true);
	};

	const handleChange = (e) => {
		const { checked } = e.target;
		console.log(checked);
		setChecked(checked);
	};

	useEffect(() => {
		if (checked) {
			setBillingAddress({ ...shippingAddress });
		} else {
			setBillingAddress({ ...initialAddressState });
		}
	}, [checked]);

	return (
		<div className="paymentDetails">
			<form onSubmit={handleFormSubmit}>
				<div className="group">
					<h2>Shipping Address</h2>

					<FormInput
						required
						placeholder="Recipient Name"
						name="customerName"
						handleChange={(evt) => handleShipping(evt)}
						value={shippingAddress.customerName}
						type="text"
					/>

					<FormInput
						required
						placeholder="Line 1"
						name="line1"
						handleChange={(evt) => handleShipping(evt)}
						value={shippingAddress.line1}
						type="text"
					/>

					<FormInput
						placeholder="Line 2"
						name="line2"
						handleChange={(evt) => handleShipping(evt)}
						value={shippingAddress.line2}
						type="text"
					/>

					<FormInput
						required
						placeholder="City"
						name="city"
						handleChange={(evt) => handleShipping(evt)}
						value={shippingAddress.city}
						type="text"
					/>

					<FormInput
						required
						placeholder="State"
						name="state"
						handleChange={(evt) => handleShipping(evt)}
						value={shippingAddress.state}
						type="text"
					/>

					<FormInput
						required
						placeholder="Postal Code"
						name="postal_code"
						handleChange={(evt) => handleShipping(evt)}
						value={shippingAddress.postal_code}
						type="text"
					/>
				</div>

				<label style={{ cursor: 'pointer', color: 'red' }} htmlFor="checkbox1">
					Click if shipping and billing address are same.
				</label>
				<input
					type="checkbox"
					name="checkBox"
					id="checkbox1"
					checked={checked}
					onChange={handleChange}
				/>
				<div style={{ marginBottom: '20px' }}></div>

				<div className="group">
					<h2>Billing Address</h2>

					<FormInput
						required
						placeholder="Recipient Name"
						name="customerName"
						handleChange={(evt) => handleShipping(evt)}
						value={billingAddress.customerName}
						type="text"
					/>

					<FormInput
						required
						placeholder="Line 1"
						name="line1"
						handleChange={(evt) => handleBilling(evt)}
						value={billingAddress.line1}
						type="text"
					/>

					<FormInput
						placeholder="Line 2"
						name="line2"
						handleChange={(evt) => handleBilling(evt)}
						value={billingAddress.line2}
						type="text"
					/>

					<FormInput
						required
						placeholder="City"
						name="city"
						handleChange={(evt) => handleBilling(evt)}
						value={billingAddress.city}
						type="text"
					/>

					<FormInput
						required
						placeholder="State"
						name="state"
						handleChange={(evt) => handleBilling(evt)}
						value={billingAddress.state}
						type="text"
					/>

					<FormInput
						required
						placeholder="Postal Code"
						name="postal_code"
						handleChange={(evt) => handleBilling(evt)}
						value={billingAddress.postal_code}
						type="text"
					/>
				</div>

				{formFilled ? (
					<Razorpay
						totalAmount={total}
						address={shippingAddress}
						handleSubmit={handlePayment}
						updatePayment={updatePayment}
					/>
				) : (
					<Button type="submit">Pay Now</Button>
				)}
			</form>
		</div>
	);
};

export default PaymentDetails;
