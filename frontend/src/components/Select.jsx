import React, { Children } from 'react'

const Select = ({ 
    name = '', 
    id = '', 
    label = '', 
    onChange, 
    value, 
    children
}) => {

  return (
    <div>
        <label htmlFor={id}>{label}</label>
        <select name={name} id={id} className='w-full p-1.5 rounded' onChange={onChange} value={value}>
            {children}
        </select>
    </div>
  )
}

export default Select