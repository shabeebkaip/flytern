import React from 'react'
import { useSelector } from 'react-redux'
import { ArrowIconSvg } from '@/app/shared/components/SVG';
import FlightsStops from './FlightStops';

const TravelFlightDetails = () => {
    const { packageDetails: {  apiFlightDtail = [] } } = useSelector((state) => state.packageState);

    return (
        <div className='p-4 mt-10 bg-white rounded-lg'>
        {
            apiFlightDtail?.flightSegments && apiFlightDtail?.flightSegments.map((item, index) => (
                <div key={index}>
                    <div className='flex flex-col flex-wrap items-baseline justify-between sm:flex-row '>
                        <div className='flex flex-col gap-5'>
                            <div className='flex items-center gap-5'>
                                <h3 className='text-base font-medium text-black md:text-xl '>{item.departure}</h3>
                                <ArrowIconSvg color={'black'} />
                                <h3 className='text-base font-medium text-black lg:text-xl '>{item.arrival}</h3>
                            </div>
                            <div>
                                <h4 className='text-neutral-400 text-[13px] font-normal font-inter'>{item.departureDate}</h4>
                            </div>
                        </div>
                       
                    </div>
                    { item.flightSegmentDetails && item.flightSegmentDetails.map((items, index) => (
                        <FlightsStops key={index} flight={items} />
                    ))}
                </div>
            ))
        }
        </div>
    )
}

export default TravelFlightDetails