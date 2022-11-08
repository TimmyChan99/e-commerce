import Link from 'next/link'
import React from 'react'

const Header = () => {
	return (
		<header className='flex h-12 items-center justify-between shadow-md px-4'>
			<Link href='/' className='text-lg font-bold'>ShopGate</Link>
			<nav>
				<ul className='flex items-center'>
					<li className='p-2'><Link href='/'>Cart</Link></li>
					<li className='p-2'><Link href='/'>Login</Link></li>
				</ul>
			</nav>
		</header>
	)
}

export default Header
