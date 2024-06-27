import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux'

const FlightStopDetails = ({ segment }) => {
    const { translation } = useSelector((state) => state.sharedState)
    return (
        <div className='flex flex-col gap-6 pb-5 '>
            <div>
                <div className='p-2.5 bg-stone-50 rounded-lg mt-7 grid grid-cols-10 gap-5'>
                    <div className='flex-col items-center justify-center hidden gap-2 md:flex md:col-span-2 '>
                        <Image width={40} height={40}  className='object-contain w-10 ' src={segment.carrierImageUrl} alt="" />
                        <div className='flex flex-col items-center' >
                            <h3 className='text-black font-normal text-[10px] md:text-sm'>{segment.flightName}</h3>
                            <h3 className='text-black font-normal text-[10px] md:text-sm'>{segment.flightNumber}</h3>
                            {/* <h3 className='text-black font-normal text-[10px] md:text-sm'>{segment.cabin}</h3> */}
                        </div>

                    </div>
                    <div className="grid grid-cols-3 col-span-10 md:col-span-8 item-center ">
                        <div className='flex flex-col justify-between gap-1'>
                            <h3 className="text-[10px] md:text-sm font-normal  text-font-gray">{segment.depaturecntry}</h3>
                            <h1 className="text-base font-medium text-black md:text-xl ">{segment.depature}</h1>
                            <h3 className="text-[10px] md:text-sm font-normal  text-font-gray">{segment.depaturetime}</h3>
                            <h3 className="text-[10px] md:text-sm font-normal  text-font-gray">{segment.depaturedt}</h3>
                            {segment.depatureTerminal ?
                                <h3 className="text-[10px] md:text-sm font-normal  text-font-gray">Terminal {segment.depatureTerminal}</h3>
                                : null
                            }
                        </div>
                        <div className="flex flex-col items-center justify-center h-full">
                            <h3 className='hidden md:block'>{segment.cabin}</h3>
                            <Image width={200} height={200} className="w-full" src={"/misc/flight.png"} alt="" />
                            <h3>{segment.duration}</h3>
                        </div>
                        <div className="flex flex-col items-end justify-between gap-1">
                            <h3 className="text-[10px] md:text-sm font-normal  text-font-gray text-end">{segment.arrivalcntry}</h3>
                            <h1 className="text-base font-medium text-black md:text-xl ">{segment.arrival}</h1>
                            <h3 className="text-[10px] md:text-sm font-normal  text-end text-font-gray">{segment.arrivaltime}</h3>
                            <h3 className="text-[10px] md:text-sm font-normal  text-end text-font-gray">{segment.arrivaldt}</h3>
                            {
                                segment.arrivalTerminal ?
                                    <h3 className="text-[10px] md:text-sm font-normal  text-font-gray">Terminal {segment.arrivalTerminal}</h3>
                                    : null
                            }
                        </div>
                    </div>
                </div>
            </div>
            {
                segment.layover ?
                    <div className='flex items-center justify-center gap-4'>
                        <div class="border-b border-dashed border-gap border-font-gray h-1 2xl:w-[38%] xl:w-[35%] md:w-[32%] sm:w-[29%] xs:w-[26%] w-[15%]">
                        </div>
                        <div className='flex items-center justify-center gap-2'>
                            <h4 className='text-[12px] sm:text-sm xl:text-base'>{translation?.change_of_planes}</h4>
                            <h4 className='text-[12px] sm:text-sm  xl:text-base' >{segment.layover}</h4>

                        </div>
                        <div class="border-b border-dashed border-gap border-font-gray h-1 2xl:w-[38%] xl:w-[35%] md:w-[32%] sm:w-[29%] xs:w-[26%] w-[15%]">
                        </div>
                    </div> : null
            }

        </div>
    )
}

export default FlightStopDetails