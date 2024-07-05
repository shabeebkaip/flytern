import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive';
import { Skeleton } from '@mui/material';
import SideBar from '@/app/shared/components/SideBar';
import { profileSidebarData } from '@/lib/constants';
import BookingTab from '../components/BookingTab';
import MobFlightBookingCard from '../components/MobFlightBookingCard';
import FlightBookingDetailsList from '../components/FlightBookingDetailsList';
import AlertMessage from '@/app/shared/components/AlertMessage';
import HotelBookingDetailsList from '../components/HotelBookingDetailsList';
import PackageDetailCard from '../components/PackageDetailCard';
import InsuranceCard from '../components/InsuranceCard';
import MyBookingGuest from '../components/MyBookingGuest';
import { getMyBookingsApi } from '../api';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import Link from 'next/link';


const Mybookings = () => {
    const isTabletAndMobile = useMediaQuery({ maxWidth: '1024px' })
    const { bookings: { _MyFlightBookingResponse, _MyHotelBookingResponse, _MyPackageBookingResponse, _MyInsuranceBookingResponse, _MyActivityBookingResponse = [] }, loading } = useAppSelector(state => state.profileState)
    console.log(_MyInsuranceBookingResponse,"_MyInsuranceBookingResponse")
    console.log(_MyPackageBookingResponse,"_MyPackageBookingResponse")
    const [tabIndex, setTabIndex] = useState(0)
    const dispatch = useAppDispatch()
    const { profile } = useAppSelector(state => state.sharedState)
    const { selectedLanguageAndCountry } = useAppSelector(state => state.sharedState)


    useEffect(() => {
        dispatch(getMyBookingsApi(1, "FLIGHT"))
    }, [dispatch])
    const { translation } = useAppSelector((state) => state.sharedState)
    return (
        <div  className={` ${selectedLanguageAndCountry?.language?.code === "ar"  ? 'rtl font-arabic' : 'font-inter'} mt-12 mb-8`}>
            <div className='flex flex-col gap-3'>
                <div className='flex items-center gap-1 text-sm font-normal text-neutral-400'>
                    <div onClick={() => window.location.href = "/"}><h3 className='cursor-pointer' >{translation?.home}</h3></div>
                    <h3>/</h3>
                    <h3 className='font-medium text-black'>{translation?.my_bookings}</h3>
                </div>
            </div>
            <div className='grid grid-cols-10 gap-8 mt-4 '>
                <div className='hidden col-span-2 lg:block '>
                    <SideBar sideBarList={profileSidebarData} />
                </div>
                {
                    profile && Object.keys(profile).length ?
                        <div className='flex flex-col col-span-10 gap-5 lg:col-span-8 '>
                            <BookingTab tabIndex={tabIndex} setTabIndex={(value) => setTabIndex(value)} />
                            {
                                tabIndex === 0 ?
                                    loading ?
                                        Array(3).fill().map((item, index) => (<Skeleton
                                            sx={{ bgcolor: 'grey.300' }}
                                            variant="rectangular"
                                            className="w-full h-full bg-stone-50"
                                            height={400}
                                            key={index}
                                        />))
                                        :
                                        _MyFlightBookingResponse && _MyFlightBookingResponse.length ?
                                            _MyFlightBookingResponse.map((flight, index) => (
                                                isTabletAndMobile ? <MobFlightBookingCard flight={flight} key={index} /> : <FlightBookingDetailsList flight={flight} key={index} />
                                            )) :

                                            <AlertMessage message={"No Records Found"} />
                                    : null
                            }
                            {
                                tabIndex === 1 ?
                                    loading ?
                                        Array(3).fill().map((item, index) => (<Skeleton
                                            sx={{ bgcolor: 'grey.300' }}
                                            variant="rectangular"
                                            className="w-full h-full bg-stone-50"
                                            height={400}
                                            key={index}
                                        />)) :
                                        _MyHotelBookingResponse && _MyHotelBookingResponse?.length ? _MyHotelBookingResponse.map((hotel, index) => (
                                            <HotelBookingDetailsList hotel={hotel} key={index} />

                                        )) : <AlertMessage message={"No Records Found"} />
                                    : null
                            }
                            {
                                tabIndex === 2 ?
                                    loading ?
                                        Array(3).fill().map((item, index) => (<Skeleton
                                            sx={{ bgcolor: 'grey.300' }}
                                            variant="rectangular"
                                            className="w-full h-full bg-stone-50"
                                            height={400}
                                            key={index}
                                        />)) :
                                        _MyPackageBookingResponse && _MyPackageBookingResponse?.length ? _MyPackageBookingResponse.map((item, index) => (
                                            <PackageDetailCard item={item} key={index} />
                                        )) : <AlertMessage message={"No Records Found"} />
                                    : null
                            }
                            {/* {
                                tabIndex === 3 && _MyActivityBookingResponse && _MyActivityBookingResponse.map((activity, index) => (
                                    <ActivityDetailList activity={activity} key={index} />
                                ))
                            } */}
                            {
                                tabIndex === 4 ?
                                    loading ?
                                        Array(3).fill().map((item, index) => (<Skeleton
                                            sx={{ bgcolor: 'grey.300' }}
                                            variant="rectangular"
                                            className="w-full h-full bg-stone-50"
                                            height={400}
                                            key={index}
                                        />)) :
                                        _MyInsuranceBookingResponse && _MyInsuranceBookingResponse.length ? _MyInsuranceBookingResponse.map((item, index) => (
                                            <InsuranceCard item={item} key={index} />
                                        )) : <AlertMessage message={"No Records Found"} />
                                    : null
                            }
                        </div>
                        :
                        <MyBookingGuest />
                }

            </div>
        </div>
    )
}

export default Mybookings