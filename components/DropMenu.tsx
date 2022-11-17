import React from 'react';
import { Menu } from '@headlessui/react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

type DropMenuProps = {
	username: string;
};

const DropMenu = ({ username }: DropMenuProps) => {

	const handleSignOut = () => {
		signOut({ callbackUrl: '/' });
	};

	return (
		<Menu as="div" className="relative inline-block text-left">
			<Menu.Button>{username}</Menu.Button>
			<Menu.Items>
				<Menu.Item>
					<Link href="/">Profile</Link>
				</Menu.Item>
				<Menu.Item>
					<button 
					type='button' 
					onClick={handleSignOut}
					>Logout</button>
				</Menu.Item>
			</Menu.Items>
		</Menu>
	)
}

export default DropMenu
