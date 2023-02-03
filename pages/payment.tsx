import Link from 'next/link';
import router from 'next/router';
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useAppDispatch } from '../redux/hooks';
import { setPaymentMethod } from '../redux/user/user';

const Payment = () => {
	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
	const dispatch = useAppDispatch()
	const submitHandler = (e: { preventDefault: () => void; }) => {
		e.preventDefault();
		dispatch(setPaymentMethod(selectedPaymentMethod))
	}

	return (
		<Layout title="Payment Method">
		{/* <CheckoutWizard activeStep={2} /> */}
		<form className="mx-auto max-w-screen-md" onSubmit={submitHandler}>
			<h1 className="mb-4 text-xl">Payment Method</h1>
			{['PayPal', 'Stripe', 'CashOnDelivery'].map((payment) => (
				<div key={payment} className="mb-4">
					<input
						name="paymentMethod"
						className="p-2 outline-none focus:ring-0"
						id={payment}
						type="radio"
						checked={selectedPaymentMethod === payment}
						onChange={() => { setSelectedPaymentMethod(payment) }}
					/>

					<label className="p-2" htmlFor={payment}>
						{payment}
					</label>
				</div>
			))}
			<div className="mb-4 flex justify-between">
				<button
					onClick={() => router.push('/shipping')}
					type="button"
					className="default-button"
				>
					Back
				</button>
				<button className="primary-button">
					<Link href="/placeOrder">Next</Link>
				</button>
			</div>
		</form>
	</Layout>
	)
}

export default Payment
 