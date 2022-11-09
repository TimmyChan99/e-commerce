import Link from 'next/link'
import React from 'react'
import { selectCartItems } from '../redux/cart/cart';
import { useAppSelector } from '../redux/hooks';

const Header = () => {
	const cartItems = useAppSelector(selectCartItems);
	return (
		<header className='flex h-12 items-center justify-between shadow-md px-4'>
			<Link href='/' className='text-lg font-bold'>ShopGate</Link>
			<nav>
				<ul className='flex items-center'>
					<li className='p-2'>
						<Link href='/'>
							Cart
							{cartItems.length > 0 && (
								<span className='ml-1 bg-red-600 rounded-full text-xs text-white px-2 py-1 font-bold'>
									{
										cartItems.reduce((acc, item) => acc + item.quantity, 0)
									}
								</span>
							)}
						</Link>
					</li>
					<li className='p-2'><Link href='/'>Login</Link></li>
				</ul>
			</nav>
		</header>
	)
}

export default Header
