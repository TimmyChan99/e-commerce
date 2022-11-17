import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import data, { productType } from '../../utils/data';
import Layout from '../../components/Layout';
import { addItem, selectCartItems } from '../../redux/cart/cart';

type ProductProps = {
	products: productType[];
};

const ProductDetails = ({ products }: ProductProps) => {
	const cartItems = useAppSelector(selectCartItems);
	const dispatch = useAppDispatch();
	const { query } = useRouter();
	const { slug } = query;
	
	const product = products.find((p) => p.slug === slug) as productType;

	const handleAddToCart = () => {
		const existItem = cartItems.find((x) => x.slug === product?.slug);
		const quantity = existItem ? existItem.quantity + 1 : 1;
		const item = { ...product, quantity };
		if (product.countInStock >= quantity) {
			dispatch(addItem(item));
		}
		if (product.countInStock < quantity) {
			alert('Sorry, this product is out of stock');
		}
	};

	if (!product) {
		return <Layout title="Produt Not Found">Produt Not Found</Layout>;
	}

	return (
		<Layout title={product.name}>
			<Link href="/">back to products</Link>
			<div className="grid md:grid-cols-4 md:gap-3">
				<div className="md:col-span-2">
					<Image
						src={product.image}
						alt={product.name}
						width={640}
						height={640}
					/>
				</div>
				<div>
					<ul>
						<li>
							<h1 className="text-lg">{product.name}</h1>
						</li>
						<li>Category: {product.category}</li>
						<li>Brand: {product.brand}</li>
						<li>
							{product.rating} of {product.numReviews} reviews
						</li>
						<li>Description: {product.description}</li>
					</ul>
				</div>
				<div>
					<div className="card p-5">
						<div className="flex justify-between">
							<span>Price:</span>
							<span>${product.price}</span>
						</div>
						<div className="flex justify-between">
							<span>Status:</span>
							<span>{product.countInStock > 0 ? 'In Stock' : 'Unavailable'}</span>
						</div>
						<button
						type='button'
						onClick={handleAddToCart} 
						className='primary-button w-full'>Add to Cart</button>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default ProductDetails;

export async function getStaticPaths() {
	const products = data.products;
	const paths = products.map((product) => ({
		params: { slug: product.slug },
	}));
	return {
		paths,
		fallback: false,
	};
}

 
export async function getStaticProps() {
	const products = data.products;
	return {
		props: { products: products },
	}
}  
