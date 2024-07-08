import { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'
import { Product } from './interfaces/Product'
import instance from './services/config'

const App = () => {
  const [products, setProduct] = useState<Product[]>([])
  const { register, handleSubmit, formState = { errors }, reset } = useForm<Product>()
  const [checkdata, setData] = useState()
  const [flag, setFlag] = useState<number | string>(0)
  useEffect(() => {
    (async () => {
      const { data } = await instance.get('/products')
      console.log(data);
      setProduct(data)
    })()
  }, [])
  const onAdd = async (input: Product) => {


    const { data } = await instance.post("/products",
      input
    )
    console.log(data);


  }
  const handleDelete = async (id: number | string) => {
    await instance.delete(`/products/${id}`)
  }
  const handleEditData = (id: number | string) => {
    setFlag(id)
    const product = products.filter((p: Product) => p.id === id)

    reset({
      name: product[0].name,
      thumbnail: product[0].thumbnail,
      price: product[0].price,
      category: product[0].category,

    })
  }
  const handleUpdateData = async (dataInput: Product) => {
    try {
      const { data } = await instance.put(`/products/${flag}`, dataInput)
      const NewData = products.map((product: Product) => {
        if (product.id == flag) {
          product = data
        }
        return product
      })
      setProduct(NewData)
      setFlag(0)
      reset()

    } catch (error) {
      console.log(error);

    }

  }

  return (
    <>
      <form action="" onSubmit={handleSubmit(onAdd)}>
        <input type="text" {...register("name", { required: true })} placeholder='Name' />
        <input type="text" {...register("category", { required: true })} placeholder='Category' />
        <input type="text" {...register("price", { required: true })} placeholder='Price' />
        <input type="text" {...register("thumbnail", { required: true })} placeholder='Thumbnail' />
        <button>Submit</button>
      </form>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Thumbnail</th>
          <th>Price</th>
          <th>Category</th>
        </tr>
      </thead>

      <tbody>
        {products.map((index) => (
          (index.id === flag) ? <tr key={index.id}>
            <td colSpan={5}>
              <form action="" onSubmit={handleSubmit(handleUpdateData)}>
                <input type="text" {...register("name", { required: true })} placeholder='Name' />
                <input type="text" {...register("category", { required: true })} placeholder='Category' />
                <input type="text" {...register("price", { required: true })} placeholder='Price' />
                <input type="text" {...register("thumbnail", { required: true })} placeholder='Thumbnail' />
                <button type='submit'>Submit</button>
                <button type='button' onClick={() => setFlag(0)}>Cancel</button>

              </form>
            </td>
          </tr> :
            <tr key={index.id}>
              <td>{index.id}</td>
              <td>{index.name}</td>
              <td>
                <img src={index.thumbnail} alt="" />
              </td>
              <td>{index.price}</td>
              <td>{index.category}</td>
              <td>
                <button onClick={() => handleEditData(index.id as number)}>Edit</button>
                <button onClick={() => handleDelete(index.id as number)}>Delete</button>
              </td>


            </tr>


        ))}



      </tbody>






    </>
  )
}

export default App