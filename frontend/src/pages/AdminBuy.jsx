import { useState, useEffect } from 'react';
import axios from 'axios';
import BuyContainer from '../components/BuyContainer';

const handleGetAllBuy = async() => {
  const token = localStorage.getItem('token');
  
  const config = {
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
      }
  }

  try {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/api/buy/admin`, config)

      return data?.buys
  } catch (error) {
      console.log(error)
  }
}

const AdminBuy = () => {
  // Modificable
  const [buys, setBuys] = useState([])

  // Estatico
  const [buysArray, setBuysArray] = useState([])
  const [activo, setActivo] = useState();
  const [step, setStep] = useState();

  useEffect(() => {
    const getBuys = async() => {
      const buysArray = await handleGetAllBuy();

      setBuys(buysArray)
      setBuysArray(buysArray)
    }
    getBuys()
  }, [])

  useEffect(() => {
    if(activo === '') {
      setBuys(buysArray)
    } else {
      const newArray = buysArray.filter(buy => buy.active === (activo === 'true' ? true : false));

      setBuys(newArray)
    }
  }, [activo])

  useEffect(() => {
    console.log(step)

    if(step === '') {
      setBuys(buysArray)
    } else {
      switch (step) {
        case 'received':
          const received = buysArray.filter(buy => buy.delivery[0].received === true && buy.delivery[0].onTheWay === false);
          setBuys(received)
          break;
        case 'onTheWay':
          const onTheWay = buysArray.filter(buy => buy.delivery[0].onTheWay === true && buy.delivery[0].delivered === false);
          setBuys(onTheWay)
          break;
          
        case 'delivered':
          const delivered = buysArray.filter(buy => buy.delivery[0].delivered === true);
          setBuys(delivered)
          break;
      }
    }
  }, [step])

  return (
    <div className='flex justify-center'>
      <div className='w-full md:w-2/3 xl:w-1/2 my-10'>
        <h1 className='text-center font-bold text-neutral-600 text-2xl uppercase'>Historial de compras</h1>
        <p className='text-center text-lg font-light'>Desde esta seccion podra ver el historial de compras que se han realizado</p>

        <div className='flex flex-wrap gap-4 justify-around border-t pt-2 mt-2'>
          <div className='flex gap-2'>
            <label htmlFor="active">Activo:</label>
            <select 
              id="active" 
              className='border rounded'
              onChange={(e) => setActivo(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="true">Activo</option>
              <option value="false">No activo</option>
            </select>
          </div>

          <div className='flex gap-2'>
            <label htmlFor="step">Estado:</label>
            <select id="step" className='border rounded' onChange={(e) => setStep(e.target.value)}>
              <option value="" selected>Todos</option>
              <option value="received">Pendientes</option>
              <option value="onTheWay">En camino</option>
              <option value="delivered">Entregado</option>
            </select>
          </div>

          <div className='flex gap-2'>
            <label htmlFor="start">Del:</label>
            <input type="date" id="start" />
            <label htmlFor="end">Al:</label>
            <input type="date" id="end" />
          </div>
        </div>

        <div className='flex flex-col gap-5 mt-5 px-2'>
          {buys?.sort(function(a, b){return b.ID-a.ID}).map(buy => (
            <BuyContainer 
              key={buy.ID}
              buy={buy}
              btn={false}
              steps={false}
            />
          ))}
        </div>
        
      </div>
    </div>
  )
}

export default AdminBuy