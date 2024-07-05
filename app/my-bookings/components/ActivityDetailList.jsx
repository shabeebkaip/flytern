import React from 'react'
import Image from 'next/image';
import { useSelector } from 'react-redux';


const ActivityDetailList = ({ activity }) => {
    const { selectedLanguageAndCountry } = useSelector(state => state.sharedState)
    return (
        <div className="container grid items-center justify-between w-full grid-cols-12 gap-2 px-4 py-5 mx-auto bg-white rounded-md md:items-center sm:items-start md:gap-7">
            <div className="col-span-2 ">
                <Image className="bg-center bg-cover rounded-md w-fullh-full" src={activity.hotelImageUrl} alt="" width={300} height={300} />
            </div>

            <div className="h-full col-span-8 ">
                <div className='flex flex-col justify-center h-full sm:justify-between'>
                    <h3 className='text-xs font-medium text-black md:text-xl sm:text-base'>{activity.hotelname}</h3>
                    <div class="text-black text-[9px] sm:text-[11px] md:text-sm font-medium  flex items-center gap-1 "> <Image className='w-3 h-3 sm:w-6 sm:h-6 ' src="/icons/star.svg" alt="" width={100} height={100} />  <span className='text-sm font-normal text-black sm:text-base md:text-2xl'>4.3</span> </div>

                    <ul className='flex gap-7'>
                        <li className='list-none sm:text-base text-[11px]'>2 Double Rooms</li>
                        <li className='list-disc sm:text-base text-[11px]' >{activity.hotelTelephone}</li>
                    </ul>
                    <p className='h-12 text-[9px] sm:text-[11px] md:text-sm font-normal text-neutral-400 hidden sm:block'>{activity.address}</p>

                </div>

            </div>
            <div className="flex flex-col items-end justify-center w-full h-full col-span-2 gap-6 md:justify-between ">
                <div className='w-full '>
                    <h4 className=' md:text-end text-[10px] md:text-xl font-semibold text-tag-color-two'><span className='text-[9px] md:text-sm font-medium'>{activity.currency} </span>{parseFloat(activity.paidAmount).toFixed(3)}</h4>
                </div>
                <div className='flex flex-col items-end justify-end w-full gap-3'>
                    <button className='flex items-center justify-center px-4 py-2 text-xs text-white rounded-md md:w-32 md:p-0 md:h-10 bg-dark-green'> {selectedLanguageAndCountry?.language?.code === "ar" ? "عرض الحجز" : "View Booking"}
                    </button>
                    <h5 className='text-red-500 underline cursor-pointer'>{selectedLanguageAndCountry?.language?.code === "ar" ? "يلغي" : "Cancel"}</h5>
                </div>
            </div>

        </div>
    )
}

export default ActivityDetailList