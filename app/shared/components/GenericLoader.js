import Image from 'next/image'
import React from 'react'

const GenericLoader = ({text}) => {
  return (
    <div className='flex flex-col items-center justify-center '>
      <Image src="/app.gif" alt='' className='' width={500} height={500} />
      <span className='p-3 text-center text-[#cc5b41] bg-[#cc5b41] rounded-md bg-opacity-10'  >
        {text}
      </span>
    </div>
  )
}

export default GenericLoader