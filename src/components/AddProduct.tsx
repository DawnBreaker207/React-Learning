import { useForm } from "react-hook-form"
import { Product } from "../interfaces/Product"
import { useProduct } from "../contexts/ProductContext"


const AddProduct = () => {
  const { register, handleSubmit } = useForm<Product>()
  const { Add_Product } = useProduct()

  const onSubmit = (dataInput: Product) => {
    console.log(dataInput);

    Add_Product(dataInput)
  }
  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...register("name", { required: true })} placeholder='Name' />
      <input type="text" {...register("category", { required: true })} placeholder='Category' />
      <input type="text" {...register("price", { required: true })} placeholder='Price' />
      <input type="text" {...register("thumbnail", { required: true })} placeholder='Thumbnail' />
      <button>Submit</button>
    </form>
  )
}

export default AddProduct