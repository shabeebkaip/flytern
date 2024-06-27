import React from 'react'
import { useDispatch } from 'react-redux'
import TitleCard from '@/app/shared/components/TitleCard'
import { getMyBookingsApi } from '../api'
import { useAppSelector } from '@/lib/hooks'
import { arabic_translation } from '@/lib/constants'

const BookingTab = ({ tabIndex, setTabIndex }) => {
    const dispatch = useDispatch()
    const { selectedLanguageAndCountry } = useAppSelector(state => state.sharedState)
    const { translation } = useAppSelector(state => state.sharedState)

   
    const handleTab = (index,mode) => {
        setTabIndex(index)
        dispatch(getMyBookingsApi(1,mode))
    }

    
    return (
        <div className='mb-2 '>
            <TitleCard topMargin='mt-0'
                title={selectedLanguageAndCountry?.language?.code === "ar" ? arabic_translation.flight_booking:'My Bookings'} >
                <div className='mt-10 '>
                    <ul className='absolute bottom-0 flex flex-wrap gap-3 duration-300 ease-out'>
                        <li className={`${tabIndex === 0 && 'border-b-2 border-orange-400 text-orange-400'} duration-300 ease-in-out p-3 cursor-pointer`} onClick={ () => handleTab(0,"FLIGHT")} >{selectedLanguageAndCountry?.language?.code === "ar" ? arabic_translation.flight_booking:'Flight Booking'}</li>
                        <li className={`${tabIndex === 1 && 'border-b-2 border-orange-400 text-orange-400'} duration-300 ease-in-out p-3 cursor-pointer`} onClick={() => handleTab(1,"HOTEL")}>{selectedLanguageAndCountry?.language?.code === "ar" ? arabic_translation.hotel_booking:'Hotel Booking'}</li>
                        <li className={`${tabIndex === 2 && 'border-b-2 border-orange-400 text-orange-400'} duration-300 ease-in-out p-3 cursor-pointer`} onClick={() => handleTab(2,"PACKAGE")}>{translation.packages}</li>
                        {/* <li className={`${tabIndex === 3 && 'border-b-2 border-orange-400 text-orange-400'} duration-300 ease-in-out p-3 cursor-pointer`} onClick={() => handleTab(3,"ACTIVITY")}>Activities</li> */}
                        <li className={`${tabIndex === 4 && 'border-b-2 border-orange-400 text-orange-400'} duration-300 ease-in-out p-3 cursor-pointer`} onClick={() => handleTab(4,"INSURANCE")}>{translation.insurance}</li>
                    </ul>
                </div>
            </TitleCard >
        </div >
    )
}

export default BookingTab