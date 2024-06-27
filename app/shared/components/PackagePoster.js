import Image from 'next/image'
import React from 'react'

const PackagePoster = () => {
  return (
    <div className='hidden lg:block w-full'>
        <Image className='w-full' src="/package/packagePoster.png" alt="" height={600} width={300} />

    </div>
  )
}

export default PackagePoster