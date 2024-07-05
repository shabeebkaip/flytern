

import Image from 'next/image'
import React from 'react'

const SuspenseLoader = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <Image width={200} height={200} className='object-contain w-10 ' src='/Gif.gif' alt="" />
    </div>
  )
}

export default SuspenseLoader