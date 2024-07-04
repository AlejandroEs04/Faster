import React from 'react'

const Alerta = ({alerta}) => {

    return (
        <div className={`${alerta.error ? 'bg-red-600' : 'bg-sky-600'} text-center px-2 py-1 rounded mt-4`}>
            <p className='font-bold text-neutral-100 uppercase'>{alerta.msg}</p>
        </div>
    )
}

export default Alerta
