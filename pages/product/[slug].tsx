import Link from 'next/link';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { productType } from '../../utils/data';
import Layout from '../../components/Layout';
import { addItem, selectCartItems } from '../../redux/cart/cart';
import dbConnect from '../../utils/db';
import Product from '../../models/Product';

type ProductProps = {
	product: productType & {
	createdAt: string;
	updatedAt: string;
	__v: number;
	_id: string;
};}

const ProductDetails = ({ product }: ProductProps) => {
	const cartItems = useAppSelector(selectCartItems);
	const dispatch = useAppDispatch();


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

export async function getServerSideProps(context: { params: { slug: string}; }) {
	const { params } = context;
	const { slug } = params;
	await dbConnect();
	const product = await Product.findOne({ slug }).lean();
	const convertDocTobj = (doc: { _id: {}, createdAt: {}, updatedAt: {} }) => {
		doc._id = doc._id.toString();
		doc.createdAt = doc.createdAt.toString();
		doc.updatedAt = doc.updatedAt.toString();
		return doc;
	}
	return {
		props: {
			product: product ? convertDocTobj(product) : null
		}
	}
}
