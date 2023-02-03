import Link from 'next/link'
import React from 'react'
import Layout from '../components/Layout'
import { useAppSelector, useAppDispatch } from '../redux/hooks'

const PlaceOrderScreen = () => {
	const { cartItems } = useAppSelector((state) => state.cart)
	const { shippingAddress, paymentMethod } = useAppSelector((state) => state.user)

	return (
		<Layout title='Place Order'>
			<h1 className='mb-4 text-xl'>Place Order</h1>
			{
				cartItems.length === 0 ? (
					<div className='text-center'>
						<h2 className='text-2xl'>Your cart is empty</h2>
						<p className='text-lg'>You have no items in your cart. To buy one or more items, click "Add to Cart" next to the item.</p>
						<Link href='/' className='hover:underline'>Go Shopping</Link>
					</div>
				) : (
					<div className='grid md:grid-cols-4 md:gap-5'>
						<div className="overflow-x-auto md:col-span-3">
							<div className="card  p-5">
								<h2 className="mb-2 text-lg">Shipping Address</h2>
								<div>
									{shippingAddress.fullName}, {shippingAddress.address},{' '}
									{shippingAddress.city}, {shippingAddress.postalCode},{' '}
									{shippingAddress.country}
								</div>
								<div className='text-blue-500'>
									<Link href="/shipping">Edit</Link>
								</div>
							</div>
						</div>
						<div className="card  p-5">
							<h2 className="mb-2 text-lg">Payment Method</h2>
							<div>{paymentMethod}</div>
							<div>
								<Link href="/payment">Edit</Link>
							</div>
						</div>
					</div>
				)
			}
		</Layout>
	)
}

export default PlaceOrderScreen
