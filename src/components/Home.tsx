import { useProduct } from '../contexts/ProductContext'
import ProductItem from './ProductItem'



const Home = () => {
  const { products } = useProduct()
  return (
    <>
      <div>Home</div>
      <div className='grid grid-cols-4 gap-x-6 gap-y-10'>

        {products.map((index) => <ProductItem key={index.id} product={index} />

        )}
      </div>
    </>

  )
}

export default Home