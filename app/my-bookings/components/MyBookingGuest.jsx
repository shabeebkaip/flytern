import { getGlobalCookie } from '@/lib/utils'
import React, { useState } from 'react'
import { getGuestBookingsApi } from '../api'
import TitleCard from '@/app/shared/components/TitleCard'
import { useAppSelector } from '@/lib/hooks'
import InputField from '@/app/shared/components/InputField'
import Link from 'next/link'

const MyBookingGuest = () => {
  const [guestBookingData, setGuestBookingData] = useState({
    bookingRef: '',
    email: ''
  })

  
  const [error, setError] = useState({})
  const language = getGlobalCookie('language')
  const handleGuestBooking = () => {
    let validateInput = {
      bookingRef: guestBookingData.bookingRef ? "" : "Please enter booking reference",
      email: guestBookingData.email ? "" : "Please enter email"
    }
    if (Object.values(validateInput).every(x => x === "")) {
      getGuestBookingsApi(guestBookingData)
    } else {
      setError(validateInput)
    }
  }
  const { translation } = useAppSelector((state) => state.sharedState)
  return (
    <div className='flex flex-col col-span-10 gap-5 lg:col-span-8'>
      <TitleCard title={translation?.my_bookings} topMargin="0">
        <div className="grid grid-cols-10 mt-8">
          <div className='flex flex-col col-span-10 gap-10 sm:col-span-6'>
            <div>
              <InputField
                styles={'w-full'}
                type="text"
                placeholder={translation?.enter_booking_id}
                className='absolute z-40 top-[12px] right-4 text-slate-500'
                value={guestBookingData.bookingRef}
                onChange={(e) => {
                  setGuestBookingData({
                    ...guestBookingData,
                    bookingRef: e.target.value
                  });
                  setError({ ...error, bookingRef: "" })
                }}
              />
              <p className='text-xs text-red-500 '>{error.bookingRef}</p>
            </div>
            <div className="col-span-6 sm:col-span-4">
              <div className=" col-span-10 p-2.5 bg-orange-400 bg-opacity-10 rounded-[10px] justify-start items-center gap-2.5 ">
                <p className="text-orange-400 text-[11px] sm:text-sm font-medium ">
                  {translation?.note_enter_booking}
                </p>
              </div>
            </div>
            <div>
              <InputField
                styles={'w-full'}
                type="email"
                placeholder={translation?.enter_your_email}
                className='absolute z-40 top-[12px] right-4 text-slate-500'
                value={guestBookingData.email}
                onChange={(e) => {
                  setGuestBookingData({
                    ...guestBookingData,
                    email: e.target.value
                  });
                  setError({ ...error, email: "" })
                }}
              />
              <p className='text-xs text-red-500 '>{error.email}</p>
            </div>

            <button className='h-12 col-span-2 mt-3 text-base font-medium text-white rounded-md lg:w-full sm:w-64 bg-emerald-800' onClick={() => { handleGuestBooking() }} >{translation?.submit}</button>


            <div className=" h-[19px]  items-center gap-1.5 lg:inline-flex flex justify-center w-full ">
              <div className="w-full h-[0px] opacity-10 border border-neutral-400"></div>
              <div className="text-center text-stone-500 text-base font-normal ">{translation?.or}</div>
              <div className="w-full h-[0px] opacity-10 border border-neutral-400"></div>
            </div>
            <div onClick={() => { if (typeof window !== "undefined") {window.location.href = "/login"}}}>
              <button
                className='text-center text-white text-base font-medium px-6 py-1.5 bg-emerald-800 rounded-md justify-center items-center h-12 w-full'
              >
                {translation?.sign_in}
              </button>
            </div>
          </div>
        </div>
      </TitleCard>


    </div>
  )
}

export default MyBookingGuest