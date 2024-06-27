import Image from 'next/image'
import React from 'react'

const SuspenseLoader = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <Image src="/app.gif" alt='' className='' width={100} height={100}  />
    </div>
  )
}

export default SuspenseLoader