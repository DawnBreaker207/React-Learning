import { useEffect, useState } from 'react'

import { Product } from './interfaces/Product'
import instance from './services/config'

const App = () => {
  const [products, setProduct] = useState<Product[]>([])
  const [checkdata, setData] = useState()
  const [flag, setFlag] = useState<number | string>(0)
  const [input, setInput] = useState([])
  useEffect(() => {
    (async () => {
      const { data } = await instance.get('/products')
      console.log(data);
      setProduct(data)
    })()
  }, [])
  const handleInput = (e) => {
    setInput(e)
  }
  const handleAdd = async () => {
    const { data } = await instance.post("/products", {
      name: input
    })
    console.log(data);


  }
  const handleDelete = async (id) => {
    await instance.delete(`/products/${id}`)
    console.log(`lmao`)


  }
  const handleEditData = (id: number | string) => {
    setFlag(id)

  }
  const handleUpdateData = async (id: number | string) => {
    console.log(checkdata);

    const { data } = await instance.put(`/products/${id}`, {
      name: checkdata
    })
    console.log(data);

  }
  const handleInputUpdate = (e) => {
    setData(e)
  }
  return (
    <>
      <input type="text" placeholder='Type' onChange={e => handleInput(e.target.value)} />
      <button onClick={() => handleAdd()}>Add</button>

      {products.map((index) => (
        (index.id !== flag) ?
          <div key={index.id}>
            <li>{index.name}</li>
            <button onClick={() => handleDelete(index.id)}>Delete</button>
            <button onClick={() => handleEditData(index?.id)}>Edit</button>
          </div>
          :
          <div>
            <input type='text' defaultValue={index.name} onChange={(e) => handleInputUpdate(e.target.value)} />
            <button onClick={() => handleUpdateData(index?.id)}>Update</button>
          </div>

      ))}






    </>
  )
}

export default App