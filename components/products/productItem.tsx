/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';

type productProps = {
	product: {
		name: string;
		price: number;
		brand: string;
		rating: number;
		numReviews: number;
		description: string;
		image: string;
		countInStock: number;
		slug: string;
		category: string;
	};
};

const ProductItem = ({ product }: productProps) => {
	return (
		<div className='card'>
			<Link href={`/product/${product.slug}`}>
				<img
					src={product.image} alt={product.name}
					className='object-contain rounded-t'
				/>
			</Link>
			<div className='flex flex-col items-center justify-between p-5'>
				<Link href={`/product/${product.slug}`}>
					{product.name}
				</Link>
				<p className='font-bold'>${product.price}</p>
				<p className='font-bold'>{product.brand}</p>
				<p className='font-bold text-amber-500'>rating: {product.rating}</p>
			</div>

		</div>
	)
}

export default ProductItem;
