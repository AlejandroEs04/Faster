import React from 'react'

const Textarea = ({
    name = '', 
    id = '', 
    label = '', 
    onChange, 
    value, 
}) => {
  return (
    <div>
        <label htmlFor={id}>{label}</label>
        <textarea className='w-full p-1.5 rounded h-full' onChange={onChange} name={name} value={value} id={id}></textarea>
    </div>
  )
}

export default Textarea