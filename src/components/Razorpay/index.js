import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { Snackbar } from '@material-ui/core';
import Button from './../forms/Buttons';
function Razorpay({ updatePayment, handleSubmit, address, totalAmount }) {
	const [snackbarText, setSnackbarText] = useState('');

	useEffect(() => {
		displayRazorpay();
	}, []);

	function loadScript(src) {
		return new Promise((resolve) => {
			const script = document.createElement('script');
			script.src = src;
			script.onload = () => {
				resolve(true);
			};
			script.onerror = () => {
				resolve(false);
			};
			document.body.appendChild(script);
		});
	}

	async function displayRazorpay() {
		try {
			const res = await loadScript(
				'https://checkout.razorpay.com/v1/checkout.js'
			);

			if (!res) {
				setSnackbarText('Razorpay SDK failed to load. Are you online?');
				return;
			}
			const result = await axios.post('https://people-fashion.herokuapp.com/payment/orders', {
				amount: totalAmount,
			});
			const { amount, id: order_id, currency } = result.data;

			const options = {
				key: 'rzp_test_Vib5UbLkta1Ve8', // Enter the Key ID generated from the Dashboard
				amount: amount.toString(),
				currency: currency,
				name: 'People Fashion',
				description: 'Test Transaction',
				// image: { logo },
				order_id: order_id,
				handler: async function (response) {
					const data = {
						orderCreationId: order_id,
						razorpayPaymentId: response.razorpay_payment_id,
						razorpayOrderId: response.razorpay_order_id,
						razorpaySignature: response.razorpay_signature,
					};

					try {
						const result = await axios.post(
							'https://people-fashion.herokuapp.com/payment/success',
							data
						);

						const resu = await updatePayment(result);
						handleSubmit(resu, {
							razorpayPaymentId: response.razorpay_payment_id,
							razorpayOrderId: response.razorpay_order_id,
						});
					} catch (err) {
						setSnackbarText('Server error. Are you online?');

						return;
					}
				},
				// prefill: {
				// 	name: firstName+" "+lastName,
				// 	email: email,
				// 	contact: mobileNumber,
				// },
				notes: {
					address,
				},
				theme: {
					color: '#61dafb',
				},
			};

			const paymentObject = new window.Razorpay(options);

			paymentObject.open();
		} catch (err) {
			setSnackbarText(
				'Server error. Are you online? If amount debited please contact support'
			);

			return;
		}
	}

	return (
		<Fragment>
			<Button onClick={displayRazorpay} type="submit">
				Pay Now
			</Button>

			{snackbarText && (
				<Snackbar
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'left',
					}}
					open={!!snackbarText}
					autoHideDuration={5000}
					onClose={(e, reason) => reason !== 'clickaway' && setSnackbarText('')}
					message={snackbarText}
				/>
			)}
		</Fragment>
	);
}

export default Razorpay;
