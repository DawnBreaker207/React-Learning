import { createContext, useContext, useEffect, useState } from "react";
import { Product } from '../interfaces/Product';
import { Create, Delete, Get_All, Update } from "../services/product";
import { useNavigate } from "react-router-dom";

interface ProductContextType {
  products: Product[]
  // Get_Product: () => void
  Add_Product: (dataInput: Product) => Promise<void>
  Edit_Product: (id: string, dataInput: Product) => Promise<void>
  Delete_Product: (id: string) => Promise<void>
}


const ProductContext = createContext<ProductContextType>({} as ProductContextType)

export const useProduct = () => {
  return useContext(ProductContext)
}

type ProductProviderProps = {
  children: React.ReactNode
}

const ProductContextProvider = ({ children }: ProductProviderProps) => {
  const navigate = useNavigate()
  const [products, setProduct] = useState<Product[]>([])

  useEffect(() => {
    (async () => {
      const data = await Get_All()
      setProduct(data)
    })()
  }, [])

  const Add_Product = async (dataInput: Product) => {
    try {
      const data = await Create(dataInput)
      setProduct([...products, data])
      navigate('/admin/dashboard')
    } catch (error) {
      console.log(error);
    }
  }
  const Edit_Product = async (id: string, dataInput: Product) => {
    try {
      const data = await Update(id, dataInput)
      setProduct(products.map((product) => product.id === id ? data : product))
      navigate('/admin/dashboard')
    } catch (error) {
      console.log(error);
    }
  }
  const Delete_Product = async (id: string) => {
    try {
      await Delete(id)
      setProduct(products.filter((product) => product.id !== id))
    } catch (error) {
      console.log(error);

    }
  }
  return <ProductContext.Provider value={{ products, Add_Product, Delete_Product, Edit_Product }}>
    {children}
  </ProductContext.Provider>
}

export default ProductContextProvider