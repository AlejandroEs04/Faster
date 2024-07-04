import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useShop from "../hooks/useShop";
import Alerta from "../components/Alerta";

const ResetPassword = () => { 
    const [password, setPassword] = useState('');

    const params = useParams()
    const token = params.token

    const { handleCheckToken, handleResetPassword, tokenTrue, alertas } = useShop();
    
    useEffect(() => {
        handleCheckToken(token);
    }, [])

    return (
        <div className='flex justify-center py-20 fondoLogin'>
            <div className='bg-white bg-opacity-70 backdrop-blur px-4 py-8 m-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 md:min-w-96 rounded sm:m-0 '>
                <h1 className='text-2xl text-sky-600 font-bold'>Restablece tu contraseña</h1>
                <p className='text-neutral-500 text-sm'>Ingresa tu nueva contraseña para poder restablecerla</p>

                {alertas && (
                    <Alerta 
                        alerta={alertas}
                    />
                )}

                {tokenTrue && (
                    <form 
                        className="flex flex-col gap-4 mt-4" 
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleResetPassword(token, password);
                        }}
                    >
                        <div className="flex flex-col">
                            <label>Nueva contraseña</label>
                            <input  
                                type='password'
                                id='password'
                                placeholder="Nueva contraseña"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                className="px-2 py-1 border"
                            />
                        </div>

                        <button className='bg-sky-600 hover:bg-sky-700 transition-colors text-neutral-100 font-bold uppercase rounded px-2 py-1'>
                            Restablecer contraseña
                        </button>
                    </form>
                )}

                {alertas?.set && (
                    <div className='mt-4'>
                        <div className='flex justify-center mt-2'>
                            <Link to={`/login`} className='bg-neutral-600 w-full text-center uppercase px-2 py-1 rounded text-lg font-bold text-neutral-100 hover:bg-neutral-700 transition-colors' >Iniciar Sesion</Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ResetPassword
