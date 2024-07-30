import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux'


const HotelBookingDetailsList = ({ hotel }) => {
    const { selectedLanguageAndCountry } = useSelector(state => state.sharedState)
    return (
        <div className="container grid items-center justify-between w-full grid-cols-12 gap-2 px-4 py-5 mx-auto bg-white rounded-md md:items-center sm:items-start md:gap-7">
            <div className="col-span-2 ">
                <Image className="bg-center bg-cover rounded-md w-fullh-full" src={hotel.hotelimageurl} alt="" width={100} height={100} />
            </div>

            <div className="h-full col-span-8 ">
                <div className='flex flex-col justify-center h-full sm:justify-between'>
                    <h3 className='text-xs font-medium text-black md:text-xl sm:text-base'>{hotel.hotelname}</h3>
                    <div class="text-black text-[9px] sm:text-[11px] md:text-sm font-medium  flex items-center gap-1 "> <Image className='w-3 h-3 sm:w-6 sm:h-6 ' src="/icons/star.svg" alt="" width={100} height={100} />  <span className='text-sm font-normal text-black sm:text-base md:text-2xl'>4.3</span> </div>

                    <ul className='flex gap-7'>
                        <li className='list-none sm:text-base text-[11px]'>2 Double Rooms</li>
                        <li className='list-disc sm:text-base text-[11px]' >{hotel.hotelTelephone}</li>
                    </ul>
                    <p className='h-12 text-[9px] sm:text-[11px] md:text-sm font-normal text-neutral-400 hidden sm:block'>{hotel.address}</p>

                </div>

            </div>
            <div className="flex flex-col items-end justify-center w-full h-full col-span-2 gap-6 md:justify-between ">
                <div className='w-full '>
                    <h4 className=' md:text-end text-[10px] md:text-xl font-semibold text-tag-color-two'><span className='text-[9px] md:text-sm font-medium'>{hotel.currency} </span>{parseFloat(hotel.paidAmount).toFixed(3)}</h4>
                </div>
                <div>
                    <h4 className='font-medium text-sm  '>Booking ID :<span className='text-xl text-tag-color-two font-semibold'>{hotel.bookingRef} </span></h4>
                </div>
                <div className='flex flex-col items-end justify-end w-full'>
                    {
                        hotel.status === "ISSUED" ?
                            <button
                                className='w-32 h-10 text-white rounded-md bg-dark-green'
                                onClick={() => {
                                    if (typeof window !== 'undefined') {
                                        window.location.href = `/payment-summary/?ref=${hotel.bookingRef}`;
                                    }
                                }}
                            >
                                {selectedLanguageAndCountry?.language?.code === "ar" ? "عرض الحجز" : "View Booking"}
                            </button>
                            : hotel.status === "PENDING" ?
                                <button
                                    className='w-32 h-10 text-white rounded-md bg-dark-green'
                                    onClick={() => {
                                        if (typeof window !== 'undefined') {
                                            window.location.href = `/payment-method/?ref=${hotel?.bookingRef}`;
                                        }
                                    }}
                                >
                                    {selectedLanguageAndCountry?.language?.code === "ar" ? "ادفع الآن" : "Pay Now"}
                                </button>
                                : null
                    }

                    {/* <h5 className='text-red-500 underline '>Cancel</h5> */}
                </div>
            </div>

        </div>
    )
}

export default HotelBookingDetailsList