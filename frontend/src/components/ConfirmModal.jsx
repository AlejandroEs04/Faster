import React from 'react'
import useAdmin from '../hooks/useAdmin'

const ConfirmModal = ({title, text, btnAction, btnColor, func}) => {
  const { setModal } = useAdmin()

  return (
    <div className='top-0 w-full bg-neutral-50 bg-opacity-45 backdrop-blur h-full flex justify-center absolute'>
      <div className='bg-white sticky top-40 h-min rounded-xl shadow-2xl'>
        <div className='text-center p-5'>
          <h3 className='font-bold text-xl'>{title}</h3>
          <p className='text-lg font-light'>{text}</p>
        </div>

        <div className='grid grid-cols-2 mt-2'>
          <button
            onClick={() => setModal(false)}
            className='p-1 border hover:bg-neutral-200 transition-colors rounded-bl-xl'
          >
            Cancelar
          </button>

          <button
            onClick={() => {
              setModal(false)
              func()
            }}
            className={`p-1 rounded-br-xl border-${btnColor} bg-${btnColor}-500 hover:bg-${btnColor}-600 transition-colors text-neutral-100 font-medium`}
          >
            {btnAction}
          </button>
        </div>
      </div>
      
    </div>
  )
}

export default ConfirmModal