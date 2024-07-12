import { Link } from "react-router-dom"
import { Product } from "../interfaces/Product"

type Props = {
  products: Product[]
  onDelete: (id: number) => void
}

const Dashboard = ({ products, onDelete }: Props) => {
  const handleDelete = (id: number) => {
    onDelete(id)

  }
  // const handleEdit = (id: number) => {
  //   onEdit(id)
  // }
  return (
    <>
      <Link to={'/add'}>Add</Link>
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
                <Link to={`edit/${index.id}`}>Edit</Link>
                {/* <button onClick={() => handleEdit(index.id as number)}>Edit</button> */}
                <button onClick={() => handleDelete(index.id as number)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Dashboard