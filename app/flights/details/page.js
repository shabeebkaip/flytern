import React from 'react'
import dynamic from 'next/dynamic'
const FlightDetails = dynamic(() => import('@/app/flights/details/container/FlightDetails'))

const fetchFlightDetails = () => {

}

const page = ({ searchParams }) => {
  const { objId, ind } = searchParams

  return (
    <div className='container mx-auto px-4'>
      <FlightDetails objId={objId} ind={ind} />
    </div>
  )
}

export default page