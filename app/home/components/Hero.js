import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useAppSelector } from '@/lib/hooks';
const FlightBookingCard = dynamic(() => import('@/app/home/components/FlightBookingCard'))
const Carousal = dynamic(() => import('@/app/home/components/Carousal'));
const HotelBookingCard = dynamic(() => import('@/app/home/components/HotelBookingCard'))


const Hero = ({ backgroundImage }) => {
  const location = typeof window !== "undefined" ? window.location?.pathname : '';
  console.log(location)
  const [selectedCard, setSelectedCard] = useState('flight')
  useEffect(() => {
    ['/', '/ar', '/ar/flights', '/flights'].includes(location) ? setSelectedCard('flight') : setSelectedCard('hotel')
  }, [selectedCard, location])
  useEffect(() => {
    document.getElementById('hero').style.backgroundImage = `url(${backgroundImage})`
    document.getElementById('hero').style.backgroundSize = 'cover'
    document.getElementById('hero').style.backgroundRepeat = 'no-repeat'
    document.getElementById('hero').style.backgroundPosition = 'center'
  }, [backgroundImage, location])

  const { loading } = useAppSelector((state) => state.exploreState);

  return (
    <>
      {
        loading ? null :

          <div className='flex flex-col items-center justify-baseline w-full md:min-h-[600px] pb-4 h-full duration-300  bg-cover bg-no-repeat ease-in-out' id="hero"  >
            <div className='container grid gap-10 px-4 mx-auto mt-8 lg:grid-cols-3 sm:mt-24' >
              <div className='flex flex-col justify-start col-span-2 gap-10' >

                {selectedCard === "flight" && <FlightBookingCard />}
                {selectedCard === "hotel" && <HotelBookingCard />}
              </div>
              <div className='hidden w-full col-span-1 lg:block xl:w-[330px]'>
                <Carousal />
              </div>
            </div>
          </div>
      }
    </>
  )
}

export default Hero