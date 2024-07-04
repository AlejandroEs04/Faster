import { useState } from "react"
import useAuth from '../hooks/useAuth';

const UserData = () => {
  const [editarName, setEditarName] = useState(false);
  const [editarEmail, setEditarEmail] = useState(false);
  const [editarNumero, setEditarNumero] = useState(false);
  const [editarPassword, setEditarPassword] = useState(false);

  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [numero, setNumero] = useState('')
  const [currentlyPassword, setCurrentlyPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const { auth } = useAuth();

  return (
    <div className='flex justify-center'>
      <div className='w-full md:w-2/3 lg:w-1/2 2xl:w-1/3 py-10'>
        <h1 className='text-center font-bold text-2xl text-sky-600 uppercase'>Inicio de sesion y seguridad</h1>

        <form className="bg-white rounded-lg mt-4">
          <div className="flex items-center justify-between px-10 border-b pb-4 pt-4">
            <div className="flex justify-between gap-2 w-2/3">
              <div className="flex flex-col">
                <label htmlFor="name" className="font-bold">Nombre(s)</label>
                {editarName ? (
                  <input type="text" id="name" placeholder='Nombre(s)' className="w-40 px-2 py-1 border rounded" value={auth.name} />
                ) : (
                  <p className="w-40 py-1">{auth.name}</p>
                )}
              </div>

              <div className="flex flex-col">
                <label htmlFor="lastName" className="font-bold">Apellido(s)</label>
                {editarName ? (
                  <input type="text" id="lastName" placeholder='Apellido(s)' className="w-40 px-2 py-1 border rounded" value={auth.lastName} />
                ) : (
                  <p className="w-40 py-1">{auth.lastName}</p>
                )}
              </div>
            </div>
            
            {editarName ? (
              <button
                type="submit"
                className="px-2 py-1 bg-sky-600 hover:bg-sky-700 text-neutral-100 font-bold rounded h-max shadow"
              >
                Guardar
              </button>
            ) : (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  setEditarName(true)
                }}
                className="px-2 py-1 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 font-bold rounded h-max shadow"
              >
                Editar
              </button>
            )}
          </div>

          <div className="flex items-center justify-between px-10 pt-4 border-b pb-4">
            <div className="flex flex-col w-2/3">
              <label htmlFor="email" className="font-bold">Correo</label>
              {editarEmail ? (
                <input type="email" id="email" placeholder='Correo' className="px-2 py-1 border rounded w-full" value={auth.email} />
              ) : (
                <p className="w-40 py-1">{auth.email}</p>
              )}
            </div>

            {editarEmail ? (
              <button
                type="submit"
                className="px-2 py-1 bg-sky-600 hover:bg-sky-700 text-neutral-100 font-bold rounded h-max shadow"
              >
                Guardar
              </button>
            ) : (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  setEditarEmail(true)
                }}
                className="px-2 py-1 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 font-bold rounded h-max shadow"
              >
                Editar
              </button>
            )}
          </div>

          <div className="flex items-center justify-between px-10 pt-4 border-b pb-4">
          <div className="flex flex-col w-2/3">
            <label htmlFor="number" className="font-bold">Número de telefono</label>
              {editarNumero ? (
                <input type="number" id="number" placeholder='Numero de telefono' className="px-2 py-1 border rounded w-full" value={auth.number} />
              ) : (
                <p className="w-40 py-1">{auth.number}</p>
              )}
            </div>

            {editarNumero ? (
              <button
                type="submit"
                className="px-2 py-1 bg-sky-600 hover:bg-sky-700 text-neutral-100 font-bold rounded h-max shadow"
              >
                Guardar
              </button>
            ) : (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  setEditarNumero(true)
                }}
                className="px-2 py-1 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 font-bold rounded h-max shadow"
              >
                Editar
              </button>
            )}
          </div>

          <div className="flex items-center justify-between px-10 pt-2 border-b pb-4">
            <div className="flex flex-col w-2/3">
              <label htmlFor="password" className="font-bold">Contraseña</label>
              {editarPassword ? (
                <input type="password" id="password" placeholder='Nueva contraseña' className="px-2 py-1 border rounded w-full" />
              ) : (
                <input 
                  type="password" 
                  id="password" 
                  placeholder='Contraseña actual' 
                  className="px-2 py-1 border rounded w-full" 
                />
              )}
            </div>

            {editarPassword ? (
              <button
                type="submit"
                className="px-2 py-1 bg-sky-600 hover:bg-sky-700 text-neutral-100 font-bold rounded h-max shadow"
              >
                Guardar
              </button>
            ) : (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  setEditarPassword(true)
                }}
                className="px-2 py-1 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 font-bold rounded h-max shadow"
              >
                Editar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserData