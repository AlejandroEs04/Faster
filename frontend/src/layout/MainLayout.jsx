import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import useShop from '../hooks/useShop'
import Slider from '../components/Slider'

const MainLayout = () => {
  const {slider} = useShop()

  return (
    <>
      {slider && (
        <Slider />
      )}
      <main className={`bg-gary-50 ${slider && 'overflow-y-hidden'}`}>
        <Header />
        <div>
          <Outlet />
        </div>
        <Footer />

        <ToastContainer />
      </main>
    </> 
  )
}

export default MainLayout
