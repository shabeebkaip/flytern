import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setSaveTravellerData } from '@/lib/slices/hotelSlice';
import { useSnackbar } from 'notistack';
import SingleRoomCard from './SingleRoomCard';
//1
const RoomCard = ({ active, room }) => {
  const dispatch = useDispatch();
  const [expand, setExpand] = useState(0)
  const { saveTravellerData } = useSelector(state => state.hotelState)
  const { enqueueSnackbar } = useSnackbar();
  const handlExpandCard = (selectedIndex) => {
    setExpand(selectedIndex)

  }
  const handleSelectedRoom = (item) => {
    dispatch(setSaveTravellerData({
      ...saveTravellerData,
      bookingCode: item.bookingCode,
      roomOptionid: item.roomOptionid,
      roomId: room.roomid
    }))
    enqueueSnackbar('Room Selected Successfully', { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center', }, })
    setTimeout(() => {
      redirect()
    }, 1000);
  }

  const redirect = () => {
    // Scroll to the element with ID 'contact_details'
    const userDetailsElement = document.getElementById('contact_details');
    if (userDetailsElement) {
      userDetailsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  return (
    <div className='flex flex-col gap-5'>
      {room?._lstRoomsDtls?.length &&
        room?._lstRoomsDtls
          .filter(room => !saveTravellerData?.roomOptionid || room.roomOptionid === saveTravellerData.roomOptionid)
          .map((item, index) => (
            <SingleRoomCard
              key={index}
              active={active}
              index={index}
              item={item}
              handleSelectedRoom={handleSelectedRoom}
              expand={expand}
              setExpand={setExpand}
              handlExpandCard={handlExpandCard}
            />
          ))}
    </div>

  )
}

export default RoomCard