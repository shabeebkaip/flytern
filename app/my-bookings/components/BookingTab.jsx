import React from 'react'
import { useDispatch } from 'react-redux'
import TitleCard from '@/app/shared/components/TitleCard'
import { getMyBookingsApi } from '../api'
import { useAppSelector } from '@/lib/hooks'
import { arabic_translation } from '@/lib/constants'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Scrollbar } from 'swiper/modules';
import { FreeMode } from 'swiper/modules';

const BookingTab = ({ tabIndex, setTabIndex }) => {
    const dispatch = useDispatch()
    const { selectedLanguageAndCountry } = useAppSelector(state => state.sharedState)
    const { translation } = useAppSelector(state => state.sharedState)


    const handleTab = (index, mode) => {
        setTabIndex(index)
        dispatch(getMyBookingsApi(1, mode))
    }


    return (
        <div className='mb-2 '>
            <TitleCard topMargin='mt-0'
                title={selectedLanguageAndCountry?.language?.code === "ar" ? arabic_translation.flight_booking : 'My Bookings'} >
                <div className='mt-10 '>
                    <ul className='absolute bottom-0 '>
                    <Swiper
                        spaceBetween={8}
                        className="flex justify-start lg:hidden"
                        slidesPerView="auto"
                        freeMode={true}
                        loop={false}
                        modules={[FreeMode]}
                        style={{ padding: '0 16px' }}
                    >
                        {[
                            { id: 0, mode: "FLIGHT", text: selectedLanguageAndCountry?.language?.code === "ar" ? arabic_translation.flight_booking : 'Flight Booking' },
                            { id: 1, mode: "HOTEL", text: selectedLanguageAndCountry?.language?.code === "ar" ? arabic_translation.hotel_booking : 'Hotel Booking' },
                            { id: 2, mode: "PACKAGE", text: translation.packages },
                            { id: 4, mode: "INSURANCE", text: translation.insurance }
                        ].map((item) => (
                            <SwiperSlide key={item.id} style={{ width: 'auto' }}>
                                <div 
                                    className={`${tabIndex === item.id ? 'border-b-2 border-orange-400 text-orange-400' : ''} duration-300 ease-in-out p-3 cursor-pointer whitespace-nowrap`}
                                    onClick={() => handleTab(item.id, item.mode)}
                                >
                                    {item.text}
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    </ul>
                </div>
            </TitleCard >
        </div >
    )
}

export default BookingTab