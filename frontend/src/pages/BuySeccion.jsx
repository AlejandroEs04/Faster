import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth'
import useShop from '../hooks/useShop';
import CartProducts from '../components/CartProducts';
import AddressForm from '../components/AddressForm';
import { formatearDinero } from '../helpers';
import PayPal from '../components/PayPal';

const BuySeccion = () => {
  const [total, setTotal] = useState(0);
  const [amount, setAmount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [sent, setSent] = useState(100); 
  const [completeAddress, setCompleteAddress] = useState(false)

  const { cart, handleGetCart } = useShop();
  const { auth } = useAuth();

  const checkAddress = () => {
    if(
      auth.city === '' ||
      auth.state === '' ||
      auth.country === '' ||
      auth.street === '' ||
      auth.externNumber === 0 ||
      auth.postalCode === '' ||
      auth.neighborhood === '' 
    ) {
      setCompleteAddress(false)
    } else {
      setCompleteAddress(true)
    }
  }

  useEffect(() => {
    handleGetCart();
    checkAddress();
  }, []);

  useEffect(() => {
    if(cart.length >= 1) {
      const calculoSubtotal = cart.reduce((total, cartProduct) => total + (
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
      setSubtotal(calculoSubtotal)

      const calculoAmount = cart.reduce((amount, cartProduct) => amount + cartProduct.cantidad, 0)
      setAmount(calculoAmount)

      if(['apodaca', 'guadalupe', 'general escobedo', 'escobedo', 'san nicolas', 'san nicolás', 'san pedro garza garcia', 'san pedro garza garcía', 'santa catarina'].includes(auth.city.trim().toLowerCase())) {
        setSent(0)
      } else {
        setSent(0)
      }

    }
  }, [cart])

  useEffect(() => {
    setTotal(subtotal + sent);
  }, [subtotal])

  return (
    <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 my-10'>
      <h1 className='text-2xl font-bold uppercase text-sky-600 text-center'>Finalizar Compra</h1>
      <div className='flex flex-col-reverse md:grid md:grid-cols-2 w-full px-4 gap-5 mt-5'>
        <div className='flex flex-col gap-4 min-h-full '>
          <div className='bg-white rounded shadow-lg py-2'>
            <h3 className='px-5 text-lg font-bold text-neutral-600 mt-1'>Direccion de entrega</h3>
            <AddressForm 
              button
            />
          </div>
          <CartProducts 
            cart={cart}
            buttons={false}
          />
        </div>

        <div className='h-full'>
          <div className='bg-neutral-600 rounded p-5 sticky top-20'>
            <h3 className='text-neutral-100 font-bold text-2xl'>Resumen de la compra</h3>

            <p className='text-sky-400 font-semibold uppercase text-lg mt-4'>Subtotal: <span className='font-bold text-neutral-100'>{formatearDinero(subtotal)} MXN</span></p>
            <p className='text-sky-500 font-bold uppercase mt-1'>Cantidad: <span className='font-extrabold text-neutral-100 capitalize'>{amount} productos</span></p>

            <p className='text-sky-500 font-bold uppercase mt-1'>Costo envio: <span className='font-extrabold text-neutral-100 capitalize'>{formatearDinero(sent)}</span></p>

            <p className='text-sky-400 font-bold uppercase text-2xl mt-4'>Total: <span className='font-bold text-neutral-100'>{formatearDinero(subtotal + sent)} MXN</span></p>

            <div className='mt-10 z-0'>
              {completeAddress ? (
                <PayPal 
                  total={total}
                />
              ) : (
                <div>
                  <p className='text-lg text-neutral-100'>La direccion no esta completa, por favor actualiza la direccion de envio <Link to={'/user/porfile/address'} className='text-sky-500'>aqui</Link></p>
                </div>
                
              )}
              
            </div>
          </div>
        </div>
      </div>     
    </div>
  )
}

export default BuySeccion
