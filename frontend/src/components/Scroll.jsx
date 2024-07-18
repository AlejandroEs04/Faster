import React from 'react'

const Scroll = ({children}) => {
  return (
    <div className='overflow-hidden'>
        <div className='overflow-x-auto pb-4'>
            {children}
        </div>
    </div>
  )
}

export default Scroll