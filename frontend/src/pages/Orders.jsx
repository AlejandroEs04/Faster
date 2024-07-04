import { useEffect } from 'react'
import useShop from '../hooks/useShop'
import UserBuy from '../components/UserBuy';

const Orders = () => {
  const { handleGetBuy, orders } = useShop();

  useEffect(() => {
    handleGetBuy();
  }, [])

  return (
    <div className='flex justify-center my-10'>
      <div className='w-full md:w-2/3 xl:w-1/2'>
        <h1 className='text-2xl text-neutral-700 uppercase font-semibold text-center mb-4'>Mis pedidos</h1>

        {orders?.lenght >= 0 && (
          <p>Aun no has hecho ninguna compra</p>
        )}

        <div className='flex flex-col gap-4'>
          {orders?.map(order => !order?.delivery[0].delivered && (
            <UserBuy 
              key={order.ID}
              buy={order}
              steps={true}
            />
          ))}
        </div>

        <h1 className='text-2xl text-neutral-700 uppercase font-semibold text-center mb-4 mt-10'>Historial</h1>

        <div className='flex flex-col gap-4'>
          {orders?.map(order => order?.delivery[0].delivered && (
            <UserBuy 
              key={order.ID}
              buy={order}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Orders