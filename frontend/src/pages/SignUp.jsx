import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import useShop from "../hooks/useShop";
import Loader from "../components/Loader";
import Alerta from "../components/Alerta";

const SignUp = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");

  const { handleCreateAccount, alertas, load, setAlertas } = useShop();

  useEffect(() => {
    setAlertas(null)
  }, [])

  const comprobarInfo = useCallback(() => {
    return email === '' || password === '' || password.length <= 9 || name === '' || lastName === '' || number === ''
  }, [email, password, name, lastName, number])

  useEffect(() => {
      comprobarInfo()
  }, [email, password, name, lastName, number])

  return (
    <div className='flex justify-center py-20 fondoLogin'>
      <div className='bg-white bg-opacity-70 backdrop-blur px-4 py-8 m-2 w-full sm:w-2/3 md:w-1/3 md:min-w-96 rounded sm:m-0 '>
        <h1 className='text-sky-600 font-bold text-2xl'>Crear Cuenta</h1>
        <p className='text-neutral-500 font-bold'>Ingresa la informacion que se te pide para crear una nueva cuenta</p>
        {alertas && (
          <Alerta 
            alerta={alertas}
          />
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleCreateAccount(
              name, lastName, email , number, password
            )
          }}
        >
          <div className='grid grid-cols-2 gap-2 mt-4'>
            <div className='flex flex-col'>
                <label htmlFor='name'>Nombre(s)</label>
                <input 
                    type='text'
                    id='name' 
                    placeholder='Nombre(s)' 
                    className='px-2 py-1 border rounded'
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
            </div>

            <div className='flex flex-col'>
                <label htmlFor='lastName'>Apellido(s)</label>
                <input 
                    type='text' 
                    id='lastName'
                    placeholder='Apellido(s)' 
                    className='px-2 py-1 border rounded'
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                />
            </div>
          </div>

          <div className='flex flex-col mt-4'>
            <label htmlFor='email'>Correo</label>
            <input 
              type='email' 
              id='email'
              placeholder='Correo' 
              className='px-2 py-1 border rounded'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className='grid grid-cols-2 gap-2 mt-4'>
            <div className='flex flex-col'>
                <label htmlFor='phone'>Numero celular</label>
                <input 
                    type='text'
                    id='phone' 
                    placeholder='Numero de celular' 
                    className='px-2 py-1 border rounded'
                    onChange={(e) => setNumber(e.target.value)}
                    value={number}
                />
            </div>

            <div className='flex flex-col'>
                <label htmlFor='password'>Contraseña</label>
                <input 
                    type='password' 
                    id='password'
                    placeholder='Contraseña' 
                    className='px-2 py-1 border rounded'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />

                <p className="text-neutral-500 text-sm mt-1">El password debe tener 10 o más carácteres</p>
            </div>
          </div>

          {load && (
            <Loader />
          )}

          <div className="flex justify-center mt-5">
            <button
              type="submit"
              disabled={comprobarInfo()}
              className={`${comprobarInfo() ? 'bg-neutral-200 text-neutral-500' : 'bg-sky-600 hover:bg-sky-700 text-neutral-100'} px-2 py-1 transition-colors font-bold uppercase rounded`}
            >
              Crear Cuenta
            </button>
          </div>
        </form>

        <div className='mt-10 flex flex-col gap-2'>
          <p className='text-sm font-medium'>¿Ya tienes cuenta? <Link to='/login' className='text-sky-600 hover:text-sky-700 transition-colors'>Iniciar Sesion</Link></p>
        </div>
      </div>
    </div>
  )
}

export default SignUp
