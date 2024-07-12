import { useEffect, useState } from 'react'

import { useNavigate, useRoutes } from 'react-router-dom'
import AddProduct from './components/AddProduct'
import Dashboard from './components/Dashboard'
import Detail from './components/Detail'
import EditProducts from './components/EditProducts'
import Home from './components/Home'
import Products from './components/Products'
import { Product } from './interfaces/Product'
import instance from './services/config'
import Client from './layouts/Client'
import Admin from './layouts/Admin'



const App = () => {
  const [products, setProduct] = useState<Product[]>([])
  const navigate = useNavigate()
  useEffect(() => {
    (async () => {
      const { data } = await instance.get('/products')
      setProduct(data)
    })()
  }, [])
  const onAdd = (input: Product) => {
    (async () => {
      try {
        const { data } = await instance.post("/products", input)
        setProduct([...products, data])
        if (confirm('Are you sure')) {
          navigate('/')
        }
      } catch (err) {
        console.log(err);

      }
    })()
  }
  const handleDelete = (id: number | string) => {
    (async () => {
      try {
        await instance.delete(`/products/${id}`)
        setProduct(
          products.filter(data => data.id !== id)
        )
      } catch (error) {
        console.log(error);
      }
    })()

  }
  const handleUpdateData = (dataInput: Product) => {
    (async () => {
      try {
        const { data } = await instance.put(`/products/${dataInput.id}`, dataInput)
        setProduct(products.map((product) => product.id === data.id ? data : product))
        if (confirm('Are you sure')) {
          navigate('/')
        }
      } catch (error) {
        console.log(error);
      }
    })()
  }

  const router = useRoutes([
    {
      path: '/', Component: Client, children: [
        { path: '', element: <Home products={products} /> },
        { path: 'detail', element: <Detail /> },

      ]
    }
    , {
      path: '/admin', Component: Admin, children: [
        {
          path: 'dashboard', element: <Dashboard products={products} onDelete={handleDelete} />, children: [
            { path: 'product', Component: Products }
          ]
        },
        { path: 'add', element: <AddProduct onAdd={onAdd} /> }
        , { path: 'edit', element: <EditProducts onEdit={handleUpdateData} /> }


      ]
    }
    ,
  ])
  return (
    router
  )
}

export default App