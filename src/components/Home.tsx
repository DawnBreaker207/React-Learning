import { Product } from '../interfaces/Product'

type Props = {
  products: Product[]
}

const Home = ({ products }: Props) => {
  return (
    <>
      <div>Home</div>
      {products.map((index) => (
        <div key={index.id}>
          <h1>{index.name}</h1>
          <div>
            <img src={index.thumbnail} alt={index.name} />
          </div>
          <p>{index.category}</p>
          <p>{index.price}</p>

        </div>
      ))}
    </>

  )
}

export default Home