import React from 'react'

const Input = ({ 
    name = '', 
    id = '', 
    type = 'text', 
    label = '', 
    onChange, 
    placeholder = '', 
    value
}) => {

  return (
    <div>
        <label htmlFor={id}>{label}</label>
        <input 
            type={type} 
            name={name}
            id={id}
            placeholder={placeholder}
            className='w-full p-1.5 rounded'
            value={value}
            onChange={onChange}
        />
    </div>
  )
}

export default Input