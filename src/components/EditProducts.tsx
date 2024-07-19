import { useForm } from 'react-hook-form'
import { Product } from '../interfaces/Product'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import instance from '../configs/axios'
import { useProduct } from '../contexts/ProductContext'



const EditProducts = () => {
  const { id } = useParams()
  const { Edit_Product } = useProduct()
  const { register, handleSubmit, reset } = useForm<Product>()
  useEffect(() => {
    (async () => {
      const { data } = await instance.get(`products/${id}`)
      reset(data)
    })()
  }, [])

  const handleUpdateData = (data: Product) => {
    Edit_Product(id as string, data)

    // onEdit(data)
  }
  return (
    <form action="" onSubmit={handleSubmit(handleUpdateData)}>
      <input type="text" {...register("name", { required: true })} placeholder='Name' />
      <input type="text" {...register("category", { required: true })} placeholder='Category' />
      <input type="text" {...register("price", { required: true })} placeholder='Price' />
      <input type="text" {...register("thumbnail", { required: true })} placeholder='Thumbnail' />
      <button type='submit'>Submit</button>
    </form>
  )
}

export default EditProducts