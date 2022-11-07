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
			<Header />
			<main className="container mx-auto px-4">
				{children}
			</main>
			<Footer />
		</>
	)
}

export default Layout;
