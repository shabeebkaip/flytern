import { Tooltip } from '@mui/material'
import React from 'react'
import { getLocalStorageInfo } from '@/lib/utils';
import moment from 'moment';
import { displayDateFormatShort } from '@/lib/constants/index';
import { useSelector } from 'react-redux';


const HotelSummary = () => {
  const { translation } = useSelector(state => state.sharedState || {})
  const totalHotels = useSelector(state => state.hotelState?.hotels?.totalHotels || 0);
  const requestData = getLocalStorageInfo('hotelSearch')
  const totalAdults = requestData?.rooms.reduce((total, room) => total + room.adults, 0);
  const totalChildren = requestData?.rooms.reduce((total, room) => total + room.children, 0);
  const totalRooms = requestData?.rooms?.length;
  const truncatedDestination = requestData?.destination?.length > 30
    ? `${requestData.destination.substring(0, 30)}...`
    : requestData?.destination;
  const dateDiff = moment(requestData?.checkOutDate).diff(moment(requestData?.checkInDate), 'days');
  const totalNights = dateDiff > 0 ? dateDiff : 1;
  return (
    <div className='flex flex-row flex-wrap text-sm font-normal md:items-center md:gap-7 text-neutral-400'>
      <div className="flex flex-wrap items-center gap-2 ">
        <Tooltip title={requestData?.destination} placement="top">
          <div className="flex items-center justify-between px-2 py-1 text-white bg-orange-400 border border-orange-400 rounded-md rounded-m border-1 ">
            <h6>{truncatedDestination}  </h6>
          </div>
        </Tooltip>
        <div className="flex items-center justify-between px-2 py-1 text-white bg-orange-400 border border-orange-400 rounded-md rounded-m border-1 ">
          <h6>{moment(requestData?.checkInDate).format(displayDateFormatShort)} - {moment(requestData?.checkOutDate).format(displayDateFormatShort)}</h6>
        </div>
        <div className="flex items-center justify-between px-2 py-1 text-white bg-orange-400 border border-orange-400 rounded-md rounded-m border-1 ">
          <h6> {totalAdults} {translation?.adults}</h6>
        </div>
        {
          totalChildren > 0 &&
          <div className="flex items-center justify-between px-2 py-1 text-white bg-orange-400 border border-orange-400 rounded-md rounded-m border-1 ">
            <h6> {totalChildren} {translation?.children}</h6>
          </div>
        }
        <div className="flex items-center justify-between px-2 py-1 text-white bg-orange-400 border border-orange-400 rounded-md rounded-m border-1 ">
          <h6> {totalRooms} {translation?.room}</h6>
        </div>
        {
          totalHotels ?
            <div className="flex items-center justify-between px-2 py-1 text-white bg-orange-400 border border-orange-400 rounded-md rounded-m border-1 ">
              <h6> {totalHotels}{translation?.hotels}</h6>
            </div> : null
        }
        {
          totalNights ?
            <div className="flex items-center justify-between px-2 py-1 text-white bg-orange-400 border border-orange-400 rounded-md rounded-m border-1 ">
              <h6> {totalNights}  {totalNights > 1 ? translation?.nights : translation?.nights} </h6>
            </div> : null
        }
      </div>
    </div>
  )
}

export default HotelSummary