import Video from '@/app/shared/components/Video'
import React from 'react'
import ResetView from '../components/ResetView'

const Reset = () => {
  return (
    <div className='grid w-full h-screen lg:grid-cols-2'>
      <Video />
      <ResetView />
    </div>
  )
}

export default Reset