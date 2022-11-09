import React from 'react'
import data from '../../utils/data';
import ProductItem from '../../components/products/productItem';

const productsList = () => {
	const products = data.products;
	const productList = products.map((product) => {
		return <ProductItem key={product.name} product={product} />;
	});

	return (
		<ul className='grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
			{productList}
		</ul>
	)
}

export default productsList
