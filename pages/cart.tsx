import React from "react"
import { NextPage } from "next"
import Image from "next/image"
import Link from "next/link"
import Layout from "../components/Layout"
import { selectCartItems } from "../redux/cart/cart"
import { useAppSelector, useAppDispatch } from "../redux/hooks"
import { removeItem } from "../redux/cart/cart"

const Cart: NextPage = () => {
	const cartItems = useAppSelector(selectCartItems);
	const dispatch = useAppDispatch();
	const itemsPrice = cartItems.reduce((a, item) => a + item.price * item.quantity, 0);

	const handleRemoveFromCart = (item: string) => {
		dispatch(removeItem(item));
	};

	const items = cartItems.map((item) => (
		<tr key={item.slug} className='border-b'>
			<td>
				<Image src={item.image} alt={item.name} width={50} height={50} />
				<Link href={`/product/${item.slug}`}>{item.name}</Link>
			</td>
			<td className='p-5 text-right'>{item.quantity}</td>
			<td className='p-5 text-right'>${item.price}</td>
			<td className='p-5 text-right'>
				<button type='button' 
				onClick={() => handleRemoveFromCart(item.slug)}
				className='p-2 border rounded'>-</button>
			</td>
		</tr>
	));

	if (cartItems.length === 0) {
		return (
			<Layout>
				<div className=''>Cart is empty</div>
			</Layout>
		);
	}

	return (
		<Layout title="My Shopping Cart">
			<h1>My Shopping Cart</h1>
			<div>Total Price: ${itemsPrice}</div>
			<div className='grid md:grid-cols-4 md:gap-5'>
				<div className='overlow-x-auto md:col-span-2'>
					<table className='table-auto w-full'>
						<thead className='border-b'>
							<tr>
								<th className='px-4 py-2'>Product</th>
								<th className='px-4 py-2'>Quantity</th>
								<th className='px-4 py-2'>Price</th>
								<th className='px-4 py-2'>Action</th>
							</tr>
						</thead>
						<tbody>
							{items}
						</tbody>
					</table>
				</div>
			</div>
		</Layout>
	)
}

export default Cart;
