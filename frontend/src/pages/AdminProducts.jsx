import { Link } from 'react-router-dom'
import useShop from '../hooks/useShop'
import { formatearDinero } from '../helpers'
import useAdmin from '../hooks/useAdmin'
import Scroll from '../components/Scroll'
import { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import LoaderMain from '../components/LoaderMain'

const AdminProducts = () => {
    const [productsActive, setProductsActive] = useState(true)
    const [productsFiltered, setProductsFiltered] = useState([])

    const { products, load } = useShop()
    const { handleDeleteProduct, handleRecoveryProduct, loading } = useAdmin()

    useEffect(() => {
        let productsArray = []

        if(productsActive) {
            productsArray = products.filter(product => product.active === true)
        } else {
            productsArray = products
        }

        setProductsFiltered(productsArray)
    }, [products, productsActive])

    return (
        <div className="container mx-auto mt-10 px-4">
            <div className='flex flex-col md:flex-row md:items-end justify-between'>
                <div>
                    <h1 className='text-4xl font-semibold text-sky-600'>Productos</h1>
                    <p className='text-lg'>Crea, Actualiza y Elimina tus productos</p>
                </div>

                <div className='mt-2 flex justify-end gap-2'>
                    <Link to={'create'} className='px-2 py-1 bg-sky-600 text-white rounded w-full'>Nuevo Producto</Link>
                    <button 
                        onClick={() => setProductsActive(!productsActive)}
                        className='px-2 py-1 bg-slate-900 text-white rounded'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                        </svg>
                    </button>
                </div>
            </div>

            {loading || load ? (
                <LoaderMain />
            ) : (
                <Scroll>
                    <table className='w-full mt-3'>
                        <thead>
                            <tr className='bg-gray-700 text-white'>
                                <th className='py-1 px-2 text-start'>Id</th>
                                <th className='py-1 px-2 text-start'>Nombre</th>
                                <th className=' w-96 py-1 px-2 text-start'>Descripción</th>
                                <th className='py-1 px-2 text-start'>Precio</th>
                                <th className='py-1 px-2 text-start'>Tipo</th>
                                <th className='py-1 px-2 text-start'>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {productsFiltered?.sort((a, b) => a.ID-b.ID).map(product => (
                                <tr key={product.ID} className='bg-white border-b'>
                                    <td className='py-1 px-2'>{product.ID}</td>
                                    <td className='py-1 px-2'>{product.name}</td>
                                    <td className='py-1 px-2 line-clamp-2 w-96'>{product.description}</td>
                                    <td className='py-1 px-2'>{formatearDinero(product.price)}</td>
                                    <td className='py-1 px-2'>{product.type.name}</td>
                                    <td className='py-1 px-2'>
                                        <div className='flex items-center justify-around'>
                                            <Link
                                                to={`edit/${product.ID}`}
                                                className='text-sky-700'
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                </svg>
                                            </Link>

                                            {product.active ? (
                                                <button
                                                    className='text-red-600 p-1'
                                                    onClick={() => handleDeleteProduct(product.ID)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                    </svg>
                                                </button>
                                            ) : (
                                                <button
                                                    className='text-green-600 p-1'
                                                    onClick={() => handleRecoveryProduct(product.ID)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                                    </svg>
                                                </button>

                                            )}

                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Scroll>
            )}

        </div>
    )
}

export default AdminProducts