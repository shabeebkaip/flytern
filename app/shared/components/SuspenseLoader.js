import Image from 'next/image'
import React from 'react'

const SuspenseLoader = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <Image src="/app.gif" alt='' className='w-96 h-96' width={1000} height={1000}  />
    </div>
  )
}

export default SuspenseLoader