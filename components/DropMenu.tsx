import React from 'react';
import Link from 'next/link';
import { Menu } from '@headlessui/react';
import { signOut } from 'next-auth/react';
import { useAppDispatch } from '../redux/hooks';
import { clearCart } from '../redux/cart/cart';

type DropMenuProps = {
	username: string;
};

const DropMenu = ({ username }: DropMenuProps) => {
	const dispatch = useAppDispatch();

	const handleSignOut = async () => {
		await signOut({ callbackUrl: '/' });
		dispatch(clearCart());
	};

	return (
		<Menu as="div" className="relative inline-block text-left">
			<Menu.Button className='primary-button'>
				{username}
			</Menu.Button>
			<Menu.Items 
			className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-zinc-200 shadow-lg flex flex-col">
				<Menu.Item>
					<Link href="/" 
					className='text-zinc-900 hover:bg-zinc-100 hover:text-zinc-900 block px-4 py-2 text-sm'>
					Profile</Link>
				</Menu.Item>
				<Menu.Item>
					<button
						type='button'
						className='text-yellow-500 hover:text-yellow-600 font-meduim'
						onClick={handleSignOut}
					>Logout</button>
				</Menu.Item>
			</Menu.Items>
		</Menu>
	)
}

export default DropMenu
