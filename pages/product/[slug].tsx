import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import data from '../../utils/data';
import Layout from '../../components/Layout';

const ProductDetails: NextPage = () => {
	const { query } = useRouter();
	const { slug } = query;
	const products = data.products;
	const product = products.find((p) => p.slug === slug);

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
						<button type='button' className='primary-button w-full'>Add to Cart</button>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default ProductDetails;
