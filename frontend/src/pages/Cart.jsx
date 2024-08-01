import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import useShop from '../hooks/useShop';
import CartProducts from '../components/CartProducts';
import { formatearDinero } from '../helpers';
import Loader from '../components/Loader';
import ProductsList from '../components/ProductsList';

const Cart = () => {
  const [total, setTotal] = useState(0)
  const [cant, setCant] = useState(0)
  const { handleGetCart, cart, load } = useShop();
  
  console.log(cart)

  useEffect(() => {
    handleGetCart()
  }, [])

  useEffect(() => {
    if(cart.length >= 1) {
        const calculoTotal = cart?.reduce((total, cartProduct) => total + (
          // El carrito tiene mas de 10 productos 
          cartProduct.cantidad >= 10 ?
            // El residuo de la cantidad de productos es 0
            cartProduct.cantidad % 10 === 0 ? (cartProduct.products.wholesalePrice * (cartProduct.cantidad / 10)) : 

            // El residuo no es 0 pero es mayor a 10
            ((Math.floor(cartProduct.cantidad / 10) * cartProduct.products.wholesalePrice) + ((cartProduct.cantidad % 10) * cartProduct.products.price)) :

          // La cantidad de productos no es mayor a 10
          (cartProduct.products.price * cartProduct.cantidad))
          , 0
        )
        setTotal(calculoTotal)

        const calculoCant = cart.reduce((cantidad, cartProduct) => cantidad + cartProduct.cantidad, 0)
        setCant(calculoCant)
    }
  },[cart])

  return (
    <>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 my-10'>
        <h1 className='font-bold uppercase text-sky-600 text-3xl text-center'>Carrito</h1>
        <div className='flex flex-col md:grid md:grid-cols-2 w-full gap-5 mt-5 mb-10'>
          <div>
            <div className='flex flex-col justify-center gap-4 min-h-full w-full'>
              {load && cart.length <= 0 && (
                <Loader />
              )}

              {cart.length > 0 ? (
                <CartProducts 
                  cart={cart}
                  buttons={true}
                />
              ) : (
                <h1 className='text-2xl uppercase font-bold text-sky-600 flex gap-1 px-10 flex-col'>
                  No hay productos en el 
                  <span className='text-neutral-600 flex items-center gap-2'>
                    Carrito
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                  </span>
                </h1>
              )}
              
            </div>
          </div>

          <div className='flex w-full sticky'>
            <div className='bg-neutral-600 rounded p-5 flex w-full h-max flex-col'>
              <h3 className='font-bold text-neutral-200 uppercase text-2xl'>Resumen</h3>

              <p className='text-sky-400 font-semibold uppercase text-xl mt-4'>Subtotal: <span className='font-bold text-neutral-100'>{formatearDinero(total)} MXN</span></p>
              <p className='text-sky-500 font-bold uppercase text-LG mt-1'>Cantidad: <span className='font-extrabold text-neutral-100 capitalize'>{cant} productos</span></p>

              <Link 
                to={`${cart.length > 0 ? '/buy' : ''}`} 
                className={`${cart.length > 0 ? 'bg-sky-600 hover:bg-sky-700 text-neutral-100' : 'bg-neutral-200 text-neutral-600'}  px-2 py-1 rounded  font-bold transition-colors mt-5 uppercase text-center`}
              >
                Continuar compra
              </Link>
            </div>
          </div>
        </div>
      
        <ProductsList 
          text='Productos que te pueden interesar'
          textColor='text-neutral-600'
        />
      </div>

    </>
  )
}

export default Cart
