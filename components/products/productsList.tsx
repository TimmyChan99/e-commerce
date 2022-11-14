import React from 'react'
import ProductItem from './ProductItem';
import  { productType }	from  '../../utils/data' ;

type ProductsListProps = {
	products: productType[];
};

const ProductsList = ({ products }: ProductsListProps) => {
	const productList = products.map((product) => {
		return <ProductItem key={product.name} product={product} />;
	});

	return (
		<ul className='grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
			{productList}
		</ul>
	)
}


export default ProductsList;
