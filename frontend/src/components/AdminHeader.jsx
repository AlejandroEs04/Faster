import { Link } from "react-router-dom"
import useShop from "../hooks/useShop"

const AdminHeader = () => {
  const { setSlider, slider } = useShop();

  return (
    <div className='bg-neutral-800 px-2 py-3 flex items-center justify-around'>
        <Link to={'/'}>
          <img src="/img/LogoAdminWhite.png" alt="Logo Admin" className='w-32'/>
        </Link>

        <ul className='flex md:hidden items-center text-neutral-100'>
          <li>
            <button
              onClick={() => setSlider(!slider)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </li>
        </ul>

        <nav className='gap-3 hidden md:flex'>
          <Link to='/admin' className='text-neutral-100 font-bold text-base hover:text-sky-500 transition-colors' >Inicio</Link>
          <Link to='/admin/products' className='text-neutral-100 font-bold text-base hover:text-sky-500 transition-colors' >Productos</Link>
          <Link to='/admin/types' className='text-neutral-100 font-bold text-base hover:text-sky-500 transition-colors' >Modelos</Link>
          <Link to='/admin/buy' className='text-neutral-100 font-bold text-base hover:text-sky-500 transition-colors' >Compras</Link>
          <Link to='/admin/articles' className='text-neutral-100 font-bold text-base hover:text-sky-500 transition-colors' >Articulos</Link>
        </nav>
    </div>
  )
}

export default AdminHeader
