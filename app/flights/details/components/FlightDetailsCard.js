import React, { useState } from 'react'
import { ArrowIconSvg, PlaneIconSvg } from '@/app/shared/components/SVG'
import HeaderBorder from '@/app/shared/components/HeaderBorder'
import { useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import FlightsStopDetails from '@/app/flights/details/components/FlightStopDetails'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import FlightDetailSummary from '@/app/flights/details/components/FlightDetailSummary'
import Image from 'next/image'

const FlightDetailsCard = (props) => {
    const [details, setDetails] = useState(true);
    const { flightSegments, isRefund } = props
    const toggleDetailsAccordion = () => {
        setDetails(!details);
    };
    const isMobile = useMediaQuery({ query: "(max-width: 1023px)" });
    const { translation } = useSelector((state) => state.sharedState)
    return (
        <div className="container flex flex-col w-full gap-3 p-5 mx-auto bg-white rounded-lg group ">
            <div
                onClick={toggleDetailsAccordion}
                className="flex items-center justify-between w-full bg-white"
            >
                <div className='w-full '>
                    <div className='flex items-center gap-2'>
                        <PlaneIconSvg color='#066651' />
                        <h5 className='text-base font-medium text-black sm:text-lg '>{translation?.flight_summary}</h5>
                    </div>
                    <div className='w-full'>
                        <HeaderBorder />
                    </div>
                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 transform ${details ? 'rotate-0' : '-rotate-180'} transition-transform duration-300`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </div>
            <div>
                {details ?
                    (<>
                        {flightSegments && flightSegments.length ? flightSegments.map((item, parentIndex) => (
                            <div className='mt-4' key={parentIndex}>
                                <div className='flex flex-col gap-2'>
                                    {isMobile ?
                                        <div className='flex flex-col gap-2 '>
                                            <div className="flex gap-2">
                                                <FlightTakeoffIcon style={{ color: 'orange' }} fontSize='small' />
                                                <h3 className='text-sm font-medium text-black md:text-md '>{item.departure}</h3>
                                            </div>
                                            <div className="flex gap-2">
                                                <FlightLandIcon style={{ color: 'orange' }} fontSize='small' />
                                                <h3 className='text-sm font-medium text-black md:text-md '>{item.arrival}</h3>
                                            </div>

                                        </div> :
                                        <div className='flex items-center gap-5'>
                                            <h3 className='text-base font-medium text-black md:text-md '>{item.departure}</h3>
                                            <ArrowIconSvg color={'black'} />
                                            <h3 className='text-base font-medium text-black md:text-md '>{item.arrival}</h3>
                                        </div>
                                    }
                                    <FlightDetailSummary item={item} isRefund={isRefund} />
                                </div>
                                {item.flightSegmentDetails.map((segment, childIndex) => (
                                    <div key={childIndex}>
                                        <div className={`flex flex-col flex-wrap md:items-center justify-between mt-4 sm:flex-row gap-[10px] md:gap-0`}>
                                            {
                                                isMobile ?
                                                    <div className='flex flex-wrap items-center gap-4 flex-start'>
                                                        <Image width={200} height={200} className='object-contain w-10 ' src={segment.carrierImageUrl} alt="" />
                                                        <div className="flex items-center gap-5 p-2 rounded-md bg-tag-color h-7">
                                                            <h3 className='text-tag-color font-medium text-[9px]'>{segment.flightName}</h3>
                                                        </div>
                                                        <div className='flex items-center gap-5 p-2 rounded-md bg-tag-color h-7'>
                                                            <h3 className='text-tag-color font-medium text-[9px]'>{segment.flightNumber}</h3>
                                                        </div>
                                                        <div className='flex items-center gap-5 p-2 rounded-md bg-tag-color h-7'>
                                                            <h3 className='text-tag-color font-medium text-[9px]'>{segment.cabin}</h3>
                                                        </div>

                                                    </div>
                                                    :
                                                    null
                                            }

                                        </div>
                                        <FlightsStopDetails segment={segment} baggageDetails={item.baggage} />
                                    </div>
                                ))}

                            </div>
                        )) : null
                        }
                    </>
                    )
                    :
                    null
                }
            </div>

        </div>
    )
}

export default FlightDetailsCard