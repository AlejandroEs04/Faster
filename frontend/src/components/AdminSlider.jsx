import { Link } from 'react-router-dom'
import useShop from '../hooks/useShop'
import useAuth from '../hooks/useAuth'

const AdminSlider = () => {
    const {setSlider} = useShop()
    const { auth, logOut } = useAuth();
    
    return (
        <div className='top-0 absolute z-40 w-full h-full'>
        <div className=' sticky top-0'>
        <div className='bg-neutral-300 flex md:hidden flex-col items-end text-end p-10 w-full h-screen max-w-md before:w-0 after:w-full'>
            <button 
            onClick={() => setSlider(false)}
            className=' flex justify-end mb-1'
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
            </button>
            <nav className='flex flex-col gap-1'>
            <h2 className='uppercase text-3xl text-sky-600 mb-5'>Menú</h2>
            <button
                onClick={() => setSlider(false)}
                className='text-end'
            >
                <Link to={'/admin'} className='text-neutral-700 text-2xl'>Inicio</Link>
            </button>
            
            <button
                onClick={() => setSlider(false)}
                className='text-end'
            >
                <Link to={'/admin/products'} className='text-neutral-700 text-2xl'>Productos</Link>
            </button>

            <button
                onClick={() => setSlider(false)}
                className='text-end'
            >
                <Link to={'/admin/types'} className='text-neutral-700 text-2xl'>Modelos</Link>
            </button>
            
            <button
                onClick={() => setSlider(false)}
                className='text-end'
            >
                <Link to={'/admin/buy'} className='text-neutral-700 text-2xl'>Compras</Link>
            </button>

            <button
                onClick={() => setSlider(false)}
                className='text-end'
            >
                <Link to={'/admin/articles'} className='text-neutral-700 text-2xl'>Articulos</Link>
            </button>

            {!auth.ID ? (
                <button
                onClick={() => setSlider(false)}
                className='text-end'
                >
                <Link to='/login' className='bg-gradient-to-r from-sky-500 to-sky-700 bg-clip-text text-transparent font-bold hover:text-sky-800 text-2xl transition-colors'>Iniciar Sesion</Link>
                </button>
                
            ) : (
                <button onClick={() => {
                logOut()
                setSlider(false)
                }} className='bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent font-bold hover:text-red-700 text-2xl text-start transition-colors' >Cerrar Sesion</button>
            )}
            </nav>
        </div>
        </div>
        </div>
    )
}

export default AdminSlider