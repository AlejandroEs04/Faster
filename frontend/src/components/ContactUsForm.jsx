import React, { useState } from 'react'
import useShop from '../hooks/useShop'
import LoaderMain from './LoaderMain';

const ContactUsForm = () => {
    const [mailInfo, setMailInfo] = useState({
        name : '', 
        lastName : '', 
        email : '', 
        message : ''
    });

    const { handleContactUs, load } = useShop();

    const handleChange = (e) => {
        const { name, value } = e.target

        setMailInfo({
            ...mailInfo, 
            [name] : value
        })
    }

    const handleSendMail = async(e) => {
        e.preventDefault()

        await handleContactUs(mailInfo)

        setMailInfo({
            name: '', lastName: '', email: '', message: ''
        })
    }

    return (
        <div className='my-10'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5 bg-white shadow rounded mt-2'>
            <form 
                className='flex flex-col gap-2 p-4'
                onSubmit={handleSendMail}
            >
                <h2 className='text-neutral-800 font-semibold text-3xl'>Contactanos</h2>
                <p>Llena la informacion que se solicita para contactarte con Faster</p>

                {load ? <LoaderMain /> : (
                    <>
                    
                        <div className='flex flex-col'>
                            <label htmlFor="name" className='text-lg font-medium'>Nombre</label>
                            <input 
                                type="text" 
                                name="name" 
                                id="name" 
                                placeholder='Nombre' 
                                className='p-1 rounded border' 
                                value={mailInfo.name}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <div className='flex flex-col'>
                            <label htmlFor="lastName" className='text-lg font-medium'>Apellido(s)</label>
                            <input 
                                type="text" 
                                name="lastName" 
                                id="lastName" 
                                placeholder='Apellido(s)' 
                                className='p-1 rounded border' 
                                value={mailInfo.lastName}
                                onChange={handleChange}
                            />
                        </div>
        
                        <div className='flex flex-col'>
                            <label htmlFor="email" className='text-lg font-medium'>Correo</label>
                            <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                placeholder='Ej. correo@correo.com' 
                                className='p-1 rounded border' 
                                value={mailInfo.email}
                                onChange={handleChange}
                            />
                        </div>
        
                        <div className='flex flex-col'>
                            <label htmlFor="lastName" className='text-lg font-medium'>Mensaje</label>
                            <textarea 
                                name="message" 
                                id="message" 
                                className='p-1 rounded border h-36'
                                value={mailInfo.message}
                                onChange={handleChange}
                            ></textarea>
                        </div>
        
                        <button className='bg-sky-600 px-2 py-1 rounded text-white hover:bg-sky-700 transition-colors'>Enviar</button>
                    </>
                )}
                

            </form>

            <div className='p-4 bg-neutral-500 text-white rounded-r'>
              <h3 className='font-semibold text-2xl text-center'>Medios de contactos</h3>
              <p className='text-center'>Tambien puedes contactarte con nosotros por los siguientes medios</p>

              <div className='flex justify-center mt-4'>
                <a href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`} className='flex gap-2 items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" className='w-8 h-8' viewBox="0 0 24 24"><path fill="currentColor" d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23c-1.48 0-2.93-.39-4.19-1.15l-.3-.17l-3.12.82l.83-3.04l-.2-.32a8.2 8.2 0 0 1-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.24M8.53 7.33c-.16 0-.43.06-.66.31c-.22.25-.87.86-.87 2.07c0 1.22.89 2.39 1 2.56c.14.17 1.76 2.67 4.25 3.73c.59.27 1.05.42 1.41.53c.59.19 1.13.16 1.56.1c.48-.07 1.46-.6 1.67-1.18s.21-1.07.15-1.18c-.07-.1-.23-.16-.48-.27c-.25-.14-1.47-.74-1.69-.82c-.23-.08-.37-.12-.56.12c-.16.25-.64.81-.78.97c-.15.17-.29.19-.53.07c-.26-.13-1.06-.39-2-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.12-.24-.01-.39.11-.5c.11-.11.27-.29.37-.44c.13-.14.17-.25.25-.41c.08-.17.04-.31-.02-.43c-.06-.11-.56-1.35-.77-1.84c-.2-.48-.4-.42-.56-.43c-.14 0-.3-.01-.47-.01"></path></svg>
                  <p>WhatsApp</p>
                </a>
              </div>
            </div>
          </div>
        </div>
    )
}

export default ContactUsForm