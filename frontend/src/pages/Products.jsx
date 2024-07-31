import { Link } from 'react-router-dom'
import { formatearDinero } from '../helpers'
import useShop from '../hooks/useShop'

const Products = () => {
  const { products } = useShop()

  return (
    <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 my-10'>
      <h1 className='text-3xl font-semibold text-sky-600'>Productos</h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-2'>
        {products?.map(product => (
          <div 
            key={product?.ID}
            className='bg-white shadow-md hover:shadow-xl transition-colors rounded'
          >
            <div className='px-4 pt-4 flex justify-center'>
              <img 
                src={product?.imageUrl} 
                alt={`Imagen de producto ${product?.name}`} 
                className='max-w-56 w-full'
              />
            </div>

            <div className='p-4'>
              <h3 className='text-lg font-semibold'>{product?.name}</h3>
              <p className='text-2xl font-bold text-sky-600'>{formatearDinero(+product?.price)}</p>

              <p>Por cada 10: {formatearDinero(+product?.wholesalePrice)}</p>
            
              <div className="my-2">
                <h4 className="text-sky-600">Tallas Disponibles</h4>
                <div className="flex gap-2 py-1">
                  {product?.detProductSize?.map(size => (
                    <button 
                      key={size.ID}
                      className="text-sm bg-neutral-500 text-neutral-100 font-semibold p-0.5 w-6 h-6 text-center rounded bg-opacity-95 shadow-sm"
                    >{size.size.letter}</button>
                  ))}
                </div>
              </div>

              <Link to={`/products/${product.ID}`} className='w-full bg-sky-600 text-white px-3 py-1 rounded'>Saber más</Link>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Products
