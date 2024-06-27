import React from 'react'
import TitleCard from '@/app/shared/components/TitleCard'
import RoomCard from '@/app/hotels/search/components/RoomCard';
import { arabic_translation } from '@/lib/constants';
import { useDispatch, useSelector } from 'react-redux';
import { setSaveTravellerData } from '@/lib/slices/hotelSlice';
import { EditIconSvg } from '@/app/shared/components/SVG';
import Image from 'next/image';

const RoomSelect = ({ rooms, room }) => {
  const dispatch = useDispatch();
  const { selectedLanguageAndCountry } = useSelector(state => state.sharedState)
  const { saveTravellerData: { roomOptionid } } = useSelector(state => state.hotelState)
  const { saveTravellerData } = useSelector(state => state.hotelState)

  const handleEditButtonClick = (item) => {
    dispatch(
      setSaveTravellerData({
        ...saveTravellerData,
        bookingCode: "",
        roomOptionid: "",
      })
    );
  };
  const  { translation} = useSelector((state) =>  state.sharedState)
  return (
    <TitleCard
      title={
        <div className='flex justify-between'>
          <div className='flex items-center justify-start gap-3 '>
            <Image src='/icons/Stars Minimalistic.svg' alt='' width={100} height={100} />
            <h4 className="text-lg font-medium text-black capitalize">
              {translation?.room_selection}
            </h4>
          </div>
          {roomOptionid ? (
            <div className='flex items-center gap-1 cursor-pointer' onClick={() => handleEditButtonClick(room)}>
              <EditIconSvg color='#519CEC' />
              <h3 className='text-blue-400 text-[10px] sm:text-xs md:text-sm font-bold '>{selectedLanguageAndCountry?.language?.code === "ar" ? arabic_translation.edit : 'Edit'}</h3>
            </div>

          ) : null}
        </div>
      }
    >
      <div className='grid gap-10 mt-4 md:grid-cols-1'>
        {rooms?.length
          ? rooms.map((item, index) => (
            <RoomCard index={index} room={item} key={index} />
          ))
          : null}
      </div>
    </TitleCard>
  );
};

export default RoomSelect;