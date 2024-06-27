import React from 'react'
import { useSelector } from 'react-redux'

const SelectedFilter = ({ searchData }) => {
    const { flightResults: { sortingDcs, airlineDcs, departureTimeDcs, arrivalTimeDcs, stopDcs, priceDcs = [] } } = useSelector(state => state.flightState)


    // Get the sortingDc name if a match is found
    const matchingStopDc = stopDcs?.find(stopDc => stopDc.value == searchData?.stopDc);
    const matchingAirlineDc = airlineDcs?.find(airlineDc => airlineDc.value == searchData?.airlineDc);
    const matchingdepartureTimeDc = departureTimeDcs?.find(departureTimeDc => departureTimeDc.value == searchData?.departureTimeDc);
    const matchingarrivalTimeDc = arrivalTimeDcs?.find(arrivalTimeDc => arrivalTimeDc.value == searchData?.arrivalTimeDc);
    // const [minPrice, maxPrice] = searchData?.priceMinMaxDc?.split(',');
    return (
        <div>
            {
                (searchData?.stopDc || searchData?.airlineDc || searchData?.departureTimeDc || searchData?.arrivalTimeDc || searchData?.priceMinMaxDc) &&
                <h4 className='text-font-gray'>Filtered By : </h4>
            }

            <div className='flex items-center gap-3 my-2'>
                {
                    searchData?.stopDc ?
                        <h3 className='p-1 text-sm border rounded-md text-font-gray twz border-font-gray'>Stops : {matchingStopDc?.name}</h3>
                        : null
                }
                {
                    searchData?.airlineDc ?
                        <h3 className='p-1 text-sm border rounded-md text-font-gray twz border-font-gray'>Airline : {matchingAirlineDc?.name}</h3>
                        : null
                }
                {
                    searchData?.departureTimeDc ?
                        <h3 className='p-1 text-sm border rounded-md text-font-gray twz border-font-gray'>Departure : {matchingdepartureTimeDc?.name}</h3>
                        : null
                }
                {
                    searchData?.arrivalTimeDc ?
                        <h3 className='p-1 text-sm border rounded-md text-font-gray twz border-font-gray'>Arrival : {matchingarrivalTimeDc?.name}</h3>
                        : null
                }
                {
                    searchData?.priceMinMaxDc ?
                        <h3 className='p-1 text-sm border rounded-md text-font-gray twz border-font-gray'>Price: {searchData?.priceMinMaxDc}</h3>
                        : null
                }
            </div>
        </div>
    )
}

export default SelectedFilter