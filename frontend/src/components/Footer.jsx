import React from 'react'
import { Link } from 'react-router-dom'
import useShop from '../hooks/useShop'

const Footer = () => {
    const { types } = useShop();

    return (
        <footer className='bg-neutral-800 min-h-80 flex justify-center py-10 px-2'>
            <div className='flex flex-col sm:grid md:grid-cols-2 w-full md:w-2/3 xl:w-1/2'>
                <div>
                    <Link to={'/'} className="flex flex-col items-center md:items-start justify-center">
                        <img src="/img/LogoWhite.png" alt="Logo de Faster" className="w-36" />
                    </Link>
                    <div className="flex flex-col md:items-start items-center mt-10">
                        <p className="text-sky-600 font-bold text-sm">Desarrollado por:</p>
                        <Link to={'https://www.estradalopez.com'}>
                            <p className='font-bold text-neutral-100'>Alejandro Estrada</p>
                        </Link>
                    </div>
                </div>

                <div className='text-center md:text-end mt-5'>
                    <h3 className='font-bold text-xl text-neutral-200'>Navegacion</h3>
                    <nav className='flex flex-col'>
                        <a href='/' className='text-lg text-neutral-100 mb-1'>Inicio</a>
                        <a href='/Products' className='text-lg text-neutral-100'>Productos</a>
                        {types?.map(type => (
                            <a key={type.ID} href={`/products/${type.name}`} className='text-sm text-neutral-300'>{type.name}</a>
                        ))}
                        <a href='/carrito' className='text-lg text-neutral-100 mt-1'>Carrito</a>
                    </nav>
                </div>
            </div>
        </footer>
    )
}

export default Footer
