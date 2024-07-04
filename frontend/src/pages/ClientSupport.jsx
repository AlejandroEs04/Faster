import React from 'react'

const ClientSupport = () => {
  return (
    <div className='flex flex-col items-center'>
      <h1 className='mt-5 font-bold text-2xl text-neutral-600 uppercase'>Soporte / Atención a clientes</h1>
      <div className='w-full md:w-2/3 xl:w-1/2 mt-5 mb-10'>
        <div className='flex flex-col px-4 md:grid md:grid-cols-2 gap-4'>
          <form className='flex flex-col gap-1.5'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
              <div className='flex flex-col'>
                <label htmlFor="name" className='text-lg text-sky-600'>Nombre</label>
                <input 
                  type="text" 
                  id='name'
                  className='border rounded'
                />
              </div>
              
              <div className='flex flex-col'>
                <label htmlFor="lastName" className='text-lg text-sky-600'>Apellido(s)</label>
                <input 
                  type="text" 
                  id='lastName'
                  className='border rounded'
                />
              </div>
            </div>

            <div className='flex flex-col'>
              <label htmlFor="email" className='text-lg text-sky-600'>Correo</label>
              <input 
                type="email" 
                id="email" 
                className='border rounded'
              />
            </div>

            <div className='flex flex-col'>
              <label htmlFor="message" className='text-lg text-sky-600'>Mensaje</label>
              <textarea 
                id="message"
                className='border rounded h-32'
              ></textarea>
            </div>

            <button className='bg-sky-500 hover:bg-sky-600 transition-colors text-neutral-100 px-2 py-1 rounded text-base uppercase'>Enviar</button>
          </form>

          <div className='bg-neutral-600 rounded p-5'>
            <h2 className='text-xl font-bold text-neutral-100'>Atencion a clientes</h2>
            <p className='text-neutral-100 font-extralight'>Bienvenido a atencion a clientes, para poder contactar porfavor llene el formulario con los datos que se solicitan.</p>
            <p className='text-neutral-100 font-extralight mt-2'>Trataremos de solucionar su problema o ponernos en contacto con usted lo más pronto posible.</p>
          </div>
        </div>
      </div>

      <h2 className='text-2xl font-light'>Preguntas Frecuentes</h2>
      <div className='mb-5'>
        <div>
          <p className='text-red-600 uppercase text-lg font-bold'>Aun no hay preguntas</p>
        </div>
      </div>
    </div>
  )
}

export default ClientSupport