import React from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

type LayoutProps = {
	children?: React.ReactNode;
	title?: string;
};

const Layout = ({ children, title }: LayoutProps) => {

	return (
		<>
			<Head>
				<title>{title ? `${title} - ShopGate` : 'ShopGate'}</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className='min-h-screen flex flex-col justify-between'>
				<Header />
				<main className="container mx-auto bg-gray-300">
					{children}
				</main>
				<Footer />
			</div>
		</>
	)
}

export default Layout;
