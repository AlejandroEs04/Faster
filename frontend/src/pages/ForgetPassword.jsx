import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import useShop from "../hooks/useShop";
import Alerta from "../components/Alerta";
import Loader from "../components/Loader";

const ForgetPassword = () => {
    const [email, setEmail] = useState('');

    const { handleForgetPassword, load, alertas, setAlertas } = useShop();

    useEffect(() => {
        setAlertas(null)
    }, [])

    const comprobarInfo = useCallback(() => {
        return email === '' 
    }, [email])
    
    useEffect(() => {
          comprobarInfo()
    }, [email])

    return (
        <div className='flex justify-center py-20 fondoLogin'>
            <div className='bg-white bg-opacity-70 backdrop-blur px-4 py-8 m-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 md:min-w-96 rounded sm:m-0 '>
                <h1 className='text-2xl text-sky-600 font-bold'>Recupera tu contraseña</h1>
                <p className='text-neutral-500 text-sm'>Ingresa el email para poder recuperar tu contraseña</p>

                {alertas && (
                    <Alerta 
                        alerta={alertas}
                    />
                )}

                {load && (
                    <Loader />
                )}

                <form 
                    className='flex flex-col gap-4 mt-4' 
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleForgetPassword(email)
                    }}
                >
                    <div className='flex flex-col'>
                        <label htmlFor='email'>Email</label>
                        <input 
                            type='email' 
                            placeholder='Email de registro'
                            id='email'
                            className='px-2 py-1 border'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>

                    <button 
                        disabled={comprobarInfo()}
                        className={`${comprobarInfo() ? 'bg-neutral-200 text-neutral-500' : 'bg-sky-600 hover:bg-sky-700 text-neutral-100'} px-2 py-1 transition-colors font-bold uppercase rounded`}>
                        Enviar Instrucciones
                    </button>
                </form>

                <div className='mt-10 flex flex-col gap-2'>
                    <p className='text-sm font-medium'>¿Ya tienes cuenta? <Link to='/login' className='text-sky-600 hover:text-sky-700 transition-colors'>Iniciar Sesion</Link></p>
                    <p className='text-sm font-medium'>¿Aun no tienes cuenta? <Link to='/new-account' className='text-sky-600 hover:text-sky-700 transition-colors'>Crea nueva cuenta</Link></p>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword
