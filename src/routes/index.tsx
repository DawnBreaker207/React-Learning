import { useRoutes } from "react-router-dom"
import Detail from "../components/Detail"
import Client from "../layouts/Client"

const Index = () => {
  const router = useRoutes([
    {
      path: '/', Component: Client, children: [
        { path: 'detail', element: <Detail /> },

      ]
    }
    ,
  ])
  return (
    router
  )
}

export default Index