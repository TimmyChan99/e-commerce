import Layout from "../components/Layout";
import ProductsList from "../components/products/ProductsList";
import Product from "../models/Product";
import { productType } from '../utils/data';
import dbConnect from "../utils/db";

export default function Home({ products }: { products: productType[] }) {

  return (
    <Layout>
      <div className=''>
        <h1 className='text-4xl font-bold'>Welcome to ShopGate</h1>
        <ProductsList products={products} />
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  await dbConnect();
  const products = await Product.find().lean()

  return {
    props: {
      products: products.map((doc) => {
        doc._id = doc._id.toString();
        doc.createdAt = doc.createdAt.toString();
        doc.updatedAt = doc.updatedAt.toString();
        return doc;
      })
    }
  }
}
