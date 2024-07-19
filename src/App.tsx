
import { useRoutes } from 'react-router-dom'
import AddProduct from './components/AddProduct'
import Dashboard from './components/Dashboard'
import Detail from './components/Detail'
import EditProducts from './components/EditProducts'
import Home from './components/Home'
import Products from './components/Products'
import Admin from './layouts/Admin'
import Client from './layouts/Client'



const App = () => {
  // const [products, setProduct] = useState<Product[]>([])
  // const navigate = useNavigate()
  // useEffect(() => {
  //   (async () => {
  //     const data = await Get_All()
  //     setProduct(data)
  //   })()
  // }, [])
  // const onAdd = (input: Product) => {
  //   (async () => {
  //     try {
  //       const data = await Create(input)
  //       setProduct([...products, data])
  //       if (confirm('Are you sure')) {
  //         navigate('/')
  //       }
  //     } catch (err) {
  //       console.log(err);

  //     }
  //   })()
  // }
  // const handleDelete = (id: number | string) => {
  //   (async () => {
  //     try {
  //       await Delete(id)
  //       setProduct(
  //         products.filter(data => data.id !== id)
  //       )
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })()

  // }
  // const handleUpdateData = (dataInput: Product) => {
  //   (async () => {
  //     try {
  //       const data = await Update(dataInput?.id as string, dataInput)
  //       setProduct(products.map((product) => product.id === data.id ? data : product))
  //       if (confirm('Are you sure')) {
  //         navigate('/')
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })()
  // }

  const router = useRoutes([
    {
      path: '/', Component: Client, children: [
        { path: '', element: <Home /> },
        { path: 'detail', element: <Detail /> },

      ]
    }
    , {
      path: '/admin', Component: Admin, children: [
        {
          path: 'dashboard', element: <Dashboard />, children: [
            { path: 'product', Component: Products }
          ]
        },
        { path: 'add', element: <AddProduct /> }
        , { path: 'edit', element: <EditProducts /> }
      ]
    }
    ,
  ])
  return (
    router
  )
}

export default App