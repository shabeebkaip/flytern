import LabelValue from '@/app/shared/components/LabelValue';
import TitleCard from '@/app/shared/components/TitleCard';
import { useAppSelector } from '@/lib/hooks';
import React from 'react'
const BookingInfo = ({ _bookingInfo }) => {
  const  { translation} = useAppSelector((state) =>  state.sharedState)
  return (
    <div>
      <TitleCard title={translation?.booking_info} >
        <div className='my-6'>
          {
            _bookingInfo?.map((item, index) => {
              const lastIndexDivider = _bookingInfo?.length - 1;
              return (
                item?.groupName ?
                  item?.title === "DIVIDER" ? index === lastIndexDivider ?
                    null : <div className='w-full h-[1px] bg-orange-100 my-4'></div> :
                    <LabelValue label={item?.title} value={item?.information} styles={"mb-4"} pStyles='text-[12px]' />
                  :
                  <h4 className='mb-4 font-semibold text-[16px]'>{item?.information}</h4>
              )
            })
          }
        </div>

      </TitleCard>
    </div>
  )
}

export default BookingInfo