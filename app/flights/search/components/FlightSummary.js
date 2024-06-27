import { format } from 'date-fns'
import React from 'react'
import { useSelector } from 'react-redux'

const FlightSummary = ({ request, flightLoader, flightResults }) => {
  const { translation } = useSelector(state => state.sharedState)
  return (
    <div className="flex flex-row flex-wrap gap-2 text-sm font-normal md:items-center md:gap-2 text-neutral-400">
      {
        request?.searchList?.map((item, index) => (
          <div className="flex gap-2 " key={index}>
            <div className="flex items-center justify-between px-2 py-1 text-white bg-orange-400 border border-orange-400 rounded-md rounded-m border-1 ">
              <h6>{item.departure}  </h6>
              <span className="mx-2">-</span>
              <h6>{item.arrival}</h6>
            </div>
            {item.returnDate ? <div className="px-2 py-1 text-white bg-orange-400 border border-orange-400 rounded-md rounded-m border-1 width ">{item.departureDate ? format(new Date(item.departureDate), "dd MMM yyyy") : null} -  {item.returnDate ? format(new Date(item.returnDate), "dd MMM yyyy") : null} </div> :
              <div className="px-2 py-1 text-white bg-orange-400 border border-orange-400 rounded-md rounded-m border-1 width ">{item.departureDate ? format(new Date(item.departureDate), "dd MMM yyyy") : null}</div>
            }
          </div>
        ))
      }
      <div className="px-2 py-1 text-white bg-orange-400 border border-orange-400 rounded-md rounded-m border-1 " >{request?.adults} {request?.adults ? translation?.adults : ''}</div>
      {request?.child > 0 && <div className="px-2 py-1 text-white bg-orange-400 border border-orange-400 rounded-md rounded-m border-1 "> {request?.child} {request?.child ? translation?.child : ''}</div>}
      {request?.infants > 0 && <div className="px-2 py-1 text-white bg-orange-400 border border-orange-400 rounded-md rounded-m border-1 "> {request?.infants} {request?.infants ? translation?.infants : ''}</div>}
      <div className="px-2 py-1 text-white bg-orange-400 border border-orange-400 rounded-md rounded-m border-1 ">
        {request?.mode === 'ROUNDTRIP' ? (
          `${translation?.round_trip}`
        ) : request?.mode === 'ONEWAY' ? (
          `${translation?.one_way}`
        ) : (
          translation?.multi_city
        )}
      </div>
      {request?.allowedCabins && <div className="px-2 py-1 text-white bg-orange-400 border border-orange-400 rounded-md rounded-m border-1 ">{request?.allowedCabins?.[0].name}</div>}
      {
        flightLoader ? null :
          flightResults.totalFlights ?
            <div className="px-2 py-1 text-white bg-orange-400 border border-orange-400 rounded-md rounded-m border-1 ">{flightResults?.totalFlights} {translation?.flights}</div> : null
      }
    </div>
  )
}

export default FlightSummary