import { Link } from "react-router-dom"
import { useProduct } from "../contexts/ProductContext"



const Dashboard = () => {
  const { products, Delete_Product } = useProduct()
  // const handleEdit = (id: number) => {
  //   onEdit(id)
  // }
  return (
    <>
      <Link to={'/admin/add'}>Add</Link>
      <table>
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
            <tr key={index.id}>
              <td>{index.id}</td>
              <td>{index.name}</td>
              <td>
                <img src={index.thumbnail} alt={index.thumbnail} />
              </td>
              <td>{index.price}</td>
              <td>{index.category}</td>
              <td>
                <Link to={`admin/edit/${index.id}`}>Edit</Link>
                {/* <button onClick={() => handleEdit(index.id as number)}>Edit</button> */}
                <button onClick={() => Delete_Product(index.id as string)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Dashboard