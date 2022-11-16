import Layout from "../components/Layout";
import ProductsList from "../components/products/ProductsList";
import data, { productType } from '../utils/data';

export default function Home({ products } : { products: productType[] }) {

  return (
    <Layout>
    <div className=''> 
      <h1 className='text-4xl font-bold'>Welcome to ShopGate</h1>
      <ProductsList products={products}/>
    </div>
    </Layout>
  )
}

export async function getStaticProps() {
	const products = data.products;
	return {
		props: { products: products },
	}
}
