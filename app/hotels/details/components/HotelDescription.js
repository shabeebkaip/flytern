import React from 'react'
import Amenities from '@/app/hotels/details/components/Amenities'; 

const HotelDescription = ({hotelDetails}) => {
  
  return (
    <div className='flex flex-col w-full gap-5 p-6 bg-white rounded-md'>
      <div className='flex flex-col gap-5'>
        <h4 className="text-xl font-bold text-black md:text-3xl">{hotelDetails?.hotelName}</h4>
        <div className="text-justify text-gray-500 text-xs md:text-base font-normal leading-[200%]">{hotelDetails?.descriptionInfo}</div>
      </div>
      <Amenities amenities={hotelDetails?._lstamenitys} />
    </div>
  )
}

export default HotelDescription