import Layout from "../components/Layout";
import ProductsList from "../components/products/productsList";

export default function Home() {

  return (
    <Layout>
    <div className=''> 
      <h1 className='text-4xl font-bold'>Welcome to ShopGate</h1>
      <ProductsList />
    </div>
    </Layout>
  )
}
