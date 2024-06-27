import React from 'react'

const LabelValue = ({ label, value, styles = '', pStyles = "" }) => {
  return (
    <div className={`${styles} grid w-full grid-cols-2 sm:gap-10  gap-10 `}>
      <p className={`${pStyles} text-[12px]  font-normal text-zinc-600  sm:text-base break-words`}>{label}</p>
      <p className={`${pStyles} text-[12px]  font-normal text-zinc-600  sm:text-base break-words`}>{value}</p>
    </div>
  )
}

export default LabelValue 