import React from 'react'
import useShop from '../hooks/useShop'
import { formatearDinero } from "../helpers/index"

const MainContainer = () => {
  const { products, articles } = useShop();

  console.log(articles);

  return (
    <div className=''>
      <div className='w-full flex gap-4 justify-center'>
        <div className='w-2/3 grid grid-cols-2 px-4 py-10 gap-4'>
          <div className=''>
            <h2 className='font-bold text-2xl text-sky-600 uppercase'>¿Que ofrecemos?</h2>
            <p className='text-neutral-600'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ipsum orci, dapibus malesuada rhoncus vel, porttitor a odio. Phasellus pretium metus ut ligula aliquam tincidunt. Ut semper ante at ipsum egestas, eu hendrerit tellus rhoncus. Cras tristique orci sodales nunc tempor imperdiet eu sed nisl. Nunc venenatis rutrum libero ac rhoncus. Aenean mattis sapien nec varius feugiat. </p>
          </div>

          <div>
            <p>Imagen o slider</p>
          </div>
        </div>
      </div>

      <div className=' bg-neutral-500 w-full flex flex-col py-4 items-center'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold text-neutral-100 uppercase'>Nuestros Productos</h2>
        </div>
          
        <div className='w-2/3 p-4 grid grid-cols-3 gap-5'>
          {products?.map(product => (
            <div key={product.ID} className='p-4 bg-neutral-100 rounded-lg'>
              <div>
                <img src={product.imageUrl} alt={`Imagen del producto ${product.name}`} />
              </div>

              <div className='mt-2'>
                <h3 className='text-sky-600 font-bold text-xl'>{product.name}</h3>
                <p className=' text-neutral-500'>Tipo: <span className='font-bold text-neutral-700'>{product.type.name}</span></p>
                <p className=' text-neutral-500 truncate'>{product.description}</p>
                <p className='text-xl font-bold text-neutral-700 mt-2'>{formatearDinero(product.price)} mxn</p>

                <div className='flex mt-4'>
                  <button className='bg-sky-600 text-neutral-100 font-bold px-2 py-1 rounded hover:bg-sky-700 transition-colors'>
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MainContainer
