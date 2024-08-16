import React from 'react'
import Image from 'next/image'
import { useAppSelector } from '@/lib/hooks'

const MobFlightBookingCard = ({ flight }) => {
    const { selectedLanguageAndCountry } = useAppSelector(state => state.sharedState)
    return (
        <div className='flex flex-col gap-5 p-5 bg-white rounded-lg '>
            <div className='flex items-center justify-between gap-3 '>
                <div>
                    <Image className='w-full h-5' src={flight.airlineImgUrl} alt="" width={300} height={300} />
                </div>
                <div className='flex items-center gap-2'>
                    <div className={`px-2 h-7 text-[10px]  ${flight.refund_status ? 'bg-tag-color text-tag-color' : 'bg-red-600 bg-opacity-20 text-red-600'} rounded-md  font-medium flex justify-center items-center`}>
                        {flight.refund_status ? 'Refundable' : 'Non Refundable'}
                    </div>
                    {/* <div className="flex items-center justify-center w-20 text-xs font-medium rounded-md h-7 bg-tag-color-two text-tag-color-two">
                        {flight.no_of_stops === 0 ? 'No Stops' : `${flight.no_of_stops} Stops`}
                    </div> */}
                </div>

            </div>
            <div className="flex flex-col col-span-5 gap-4 pb-4 border-b">
                {
                    flight._Listflight.map((item, index) => (
                        <div className="grid grid-cols-12 " key={index}>
                            <div className='col-span-3 '>
                                <h3 className="text-sm font-normal text-font-gray">{item.deptAirportDtl}</h3>
                                <h1 className="text-xl font-medium text-black ">{item.deptAirport}</h1>
                                <h3 className="text-sm font-normal text-font-gray">{item.depDate}</h3>
                            </div>
                            <div className="flex items-center justify-center w-full col-span-6">
                                <Image className="object-contain w-full h-full" src="/misc/flight.png" alt="" width={600} height={300} />
                            </div>
                            <div className="flex flex-col items-start w-full col-span-3">
                                <h3 className="text-sm font-normal text-font-gray">{item.arvlAirportDtl}</h3>
                                <h1 className="text-xl font-medium text-black ">{item.arvlAirport}</h1>
                                <h3 className="text-sm font-normal text-font-gray">{item.depArvlDate}</h3>
                            </div>
                        </div>
                    ))}

            </div>
            <div className='flex items-center justify-between'>
                <h3 className='text-xs font-medium text-orange-400 '>AED <span className='text-xl font-semibold text-orange-400'>{parseFloat(flight.price).toFixed(3)}</span> </h3>
                <button className='h-10 px-6 py-1.5 bg-emerald-800 rounded-md justify-center items-center gap-1 inline-flex text-center text-white text-sm font-medium'>
                    {selectedLanguageAndCountry?.language?.code === "ar" ? arabic_translation.select : 'Select'}
                </button>
            </div>
        </div>
    )
}

export default MobFlightBookingCard