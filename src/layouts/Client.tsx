import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"


const Client = () => {
  return (
    <>
      <Header />
      <div>Client</div>
      <Outlet />
      <Footer />
    </>
  )
}

export default Client