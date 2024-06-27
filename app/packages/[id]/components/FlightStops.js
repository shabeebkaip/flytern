import Image from 'next/image';
import React from 'react'
import { useSelector } from 'react-redux';

const FlightsStops = ({flight}) => {
    const { packageDetails: {  packages = [] } } = useSelector((state) => state.packageState);

    return (
        
        <div className='flex flex-col gap-6 pb-5 mt-6'>
            <div>
                <div className='flex items-center gap-4 '>
                    {/* <img className='h-6 w-[103px] object-cover' src={require('../../../assets/emirites.png')} alt="" /> */}
                    <h3 className='text-black  text-[10px] md:text-sm'>{flight.flightName}     {flight.flightNumber}</h3>

                </div>

                 <div className=' p-2.5 bg-stone-50 rounded-lg   mt-7  grid grid-cols-10 gap-5'>
                 <div className="grid grid-cols-10 col-span-10 item-center sm:col-span-6">
                        <div className='flex flex-col justify-between col-span-3 gap-1'>
                            <h3 className="text-[10px] md:text-sm font-normal  text-font-gray">{flight.depaturecntry}</h3>
                            <h1 className="text-base font-medium text-black md:text-xl ">{flight.depature}</h1>
                            <h3 className="text-[10px] md:text-sm font-normal  text-font-gray">{flight.depaturetime}</h3>
                        </div>
                        <div className="flex items-center justify-center h-full col-span-4">
                            <Image className="w-full " src="/package/flight.png" alt="" width={300} height={100} />
                        </div>
                        <div className="flex flex-col items-end justify-between col-span-3 gap-1" >
                            <h3 className="text-[10px] md:text-sm font-normal  text-font-gray text-end">{flight.arrivalcntry}</h3>
                            <h1 className="text-base font-medium text-black md:text-xl ">{flight.arrival}</h1>
                            <h3 className="text-[10px] md:text-sm font-normal  text-end text-font-gray">{flight.arrivaltime}</h3>
                        </div>
                    </div>
                    <div className='flex items-center justify-around col-span-10 sm:col-span-4'>
                        <div className="flex flex-col gap-2">
                            <h3 className='text-neutral-400 text-[9px] md:text-xs font-normal '>Flight No.</h3>
                            <h2 className='text-center text-black text-[10px] md:text-sm font-medium'>{flight.flightNumber}</h2>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className='text-neutral-400 text-[9px] md:text-xs font-normal '>Baggage</h3>
                            <h2 className='text-center text-black text-[10px] md:text-sm font-medium'>20kg</h2>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className='text-neutral-400 text-[9px] md:text-xs font-normal '>Cabin Class</h3>
                            <h2 className='text-center text-black text-[10px] md:text-sm font-medium'></h2>{flight.cabin}
                        </div>
                    </div>
                </div> 
            </div>


        </div>
    )
}

export default FlightsStops