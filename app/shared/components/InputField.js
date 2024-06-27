import React from 'react'

const InputField = ({ type, placeholder, onChange, value, styles }) => {
  return (
    <input type={type} placeholder={placeholder} onChange={onChange} value={value} className={`${styles} border border-zinc-100 bg-stone-50 px-2.5 py-3 h-12 focus:outline-none  text-gray-500 rounded-md text-xs sm:text-sm   `} />
  )
}

export default InputField