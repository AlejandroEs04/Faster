import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'
import axios from 'axios';
import Loader from '../components/Loader'
import useShop from '../hooks/useShop'
import Alerta from '../components/Alerta';

const ConfirmAccount = () => {
    const { load, alertas, handleConfirmAccount, setAlertas } = useShop();

    useEffect(() => {
        setAlertas(null)
    }, [])

    const params = useParams();
    const { token } = params

    useEffect(() => {
        handleConfirmAccount(token);
    }, [])

    return (
        <div className='flex justify-center py-20 fondoLogin'>
            <div className='bg-white bg-opacity-70 backdrop-blur px-4 py-8 m-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 md:min-w-96 rounded sm:m-0 '>
                <h1 className='text-3xl font-bold text-sky-600'>Confirma tu cuenta para poder comprar tus <span className='text-neutral-700'>productos</span></h1>
                {alertas && (
                    <Alerta 
                        alerta={alertas}
                    />
                )}
                {load && (
                    <Loader />
                )}
                {!alertas?.error && (
                    <div className='mt-4'>
                        <p className='text-neutral-500 font-bold'>Su cuenta esta confirmada, ya puede iniciar sesion</p>
                        <div className='flex justify-center mt-2'>
                            <Link to={`/login`} className='bg-sky-600 px-2 py-1 rounded text-lg font-bold text-neutral-100 hover:bg-sky-700 transition-colors' >Iniciar Sesion</Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ConfirmAccount
