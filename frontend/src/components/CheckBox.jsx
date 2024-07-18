import React from 'react'

const CheckBox = ({
    name = '', 
    id = '', 
    label = '', 
    onChange, 
    value
}) => {
  return (
    <div className='flex gap-1 items-center'>
        <input type="checkbox" name={name} id={id} onChange={onChange} checked={value} />
        <label htmlFor={id}>{label}</label>
    </div>
  )
}

export default CheckBox