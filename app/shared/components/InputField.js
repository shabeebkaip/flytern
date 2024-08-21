import React from 'react'

const InputField = ({ type, placeholder, onChange, value, styles, onFocus, error }) => {

  return (
    <input type={type} placeholder={placeholder} onChange={onChange} onFocus={onFocus} value={value} className={`${styles} border ${error ? 'border-red-500' : 'border-zinc-100'} bg-stone-50 px-2.5 py-3 h-12 focus:outline-none text-gray-500 rounded-md text-xs sm:text-sm `} />
  )
}

export default InputField