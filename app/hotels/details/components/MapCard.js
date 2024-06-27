import React from 'react'
import Image from 'next/image'
import { useAppSelector } from '@/lib/hooks'


const MapCard = ({ hotelDetails }) => {
  const { translation } = useAppSelector((state) => state.sharedState)
  return (
    <div className='flex flex-col w-full gap-6 p-4 bg-white rounded-md '>
      <a href={hotelDetails.locationurl} target='_blank' rel='noreferror' className='w-full' >
        <Image width={1000} height={1000} src={"/misc/map.png"} alt='' className='w-full' />
      </a>
      <div className=''>
        <div className='flex items-center gap-2'>
          <Image width={1000} height={1000} src={"/icons/Map Point Wave.svg"} className='w-8' alt='' />
          <h3 className='text-lg font-medium text-black '>{translation?.location}</h3>
        </div>
        <div>
          <div className='w-[38px] h-[3px] bg-orange-400 mt-3'></div>
          <div className='w-full h-[1px] bg-slate-200'></div>
        </div>
      </div>
      <p class=" text-gray-500 text-base font-normal  leading-snug">{hotelDetails?.address}</p>
    </div>
  )
}

export default MapCard