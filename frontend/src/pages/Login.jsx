import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import useShop from "../hooks/useShop";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";
 
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { handleLogin, alertas, setAlertas } = useShop();
    const { setAuth } = useAuth();

    useEffect(() => {
        setAlertas(null)
    }, [])

    const navigate = useNavigate();

    const handleSubmit = async() => {
        const user = await handleLogin(email, password)

        if(user) {
            await setAuth(user);

            if(user.admin) {
                navigate('/admin');
            } else {
                navigate('/');
            }
        }
    }

    const comprobarInfo = useCallback(() => {
        return email === '' || password === '' || password.length <= 9
    }, [email, password])

    useEffect(() => {
        comprobarInfo()
    }, [email, password])

    return (
        <div className='flex justify-center py-20 fondoLogin'>
            <div className='bg-white bg-opacity-70 backdrop-blur px-4 py-8 m-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 md:min-w-96 rounded sm:m-0 '>
                <form 
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }} 
                >
                    <h1 className='text-sky-600 font-bold text-2xl'>Iniciar Sesion</h1>
                    <p className='text-neutral-500 text-sm'>Ingresa la informacion que se te pide para iniciar sesion</p>

                    {alertas && (
                        <Alerta 
                            alerta={alertas}
                        />
                    )}

                    <div className='flex flex-col mt-4'>
                        <label htmlFor='email'>Correo</label>
                        <input 
                            type='email' 
                            id='email'
                            placeholder='Ej. correo@correo.com' 
                            className='px-2 py-1 border rounded'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>

                    <div className='flex flex-col mt-4'>
                        <label htmlFor='password'>Contraseña</label>
                        <input 
                            type='password'
                            id='password' 
                            placeholder='Contraseña' 
                            className='px-2 py-1 border rounded'
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            autoComplete="true"
                        />
                    </div>

                    <div className='flex justify-center mt-5'>
                        <button
                            disabled={comprobarInfo()}
                            className={`${comprobarInfo() ? 'bg-neutral-200 text-neutral-500' : 'bg-sky-600 hover:bg-sky-700 text-neutral-100'} px-2 py-1 transition-colors font-bold uppercase rounded`}
                        >
                            Iniciar Sesion
                        </button>
                    </div>
                </form>

                <div className='mt-10 flex flex-col gap-2'>
                    <p className='text-sm font-medium'>¿Aun no tienes cuenta? <Link to='/new-account' className='text-sky-600 hover:text-sky-700 transition-colors'>Crea nueva cuenta</Link></p>
                    <p className='text-sm font-medium'>¿Olvidaste tu contraseña? <Link to='/forget-password' className='text-sky-600 hover:text-sky-700 transition-colors'>Olvide mi contraseña</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login
