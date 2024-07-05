"use client";
import React, { useEffect, } from 'react';
import { getHotelDetailsApi, getPreTravellerApi } from '@/app/hotels/api';
import { connect } from 'react-redux';
import { Skeleton } from '@mui/material';
import { setHotelDetails, setPreTravellerData } from '@/lib/slices/hotelSlice';
import { setGenericLoader } from '@/lib/slices/flightSlice';
import { setSaveTravellerLoader } from '@/lib/slices/insuranceSlice';
import { setPaymentWaitLoader } from '@/lib/slices/paymentSlice';
// import ImageContainer from '@/app/hotels/details/components/ImageContainer';
// import HotelDescription from '@/app/hotels/search/components/HotelDescription';
// import RoomSelect from '@/app/hotels/search/components/RoomSelect';
// import MapCard from '../components/MapCard';
// import PackagePoster from '../../../../shared/components/PackagePoster';
// import FLightAndHotelContactForm from '../../../../shared/components/FLightAndHotelContactForm';
// import MoreDetails from '../components/MoreDetails';
// import HotelUserDetails from '../components/HotelUserDetails';
// import AlertMessage from '../../../shared/components/AlertMessage';
// import GenericLoader from '../../../../shared/components/GenericLoader';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import GenericLoader from '@/app/shared/components/GenericLoader';
import Link from 'next/link';
import AlertMessage from '@/app/shared/components/AlertMessage';
import ImageContainer from '@/app/hotels/details/components/ImageContainer';
import HotelDescription from '@/app/hotels/details/components/HotelDescription';
import MoreDetails from '@/app/hotels/details/components/MoreDetails';
import RoomSelect from '@/app/hotels/details/components/RoomSelect';
import FLightAndHotelContactForm from '@/app/shared/components/FLightAndHotelContactForm';
import HotelUserDetails from '@/app/hotels/details/components/HotelUserDetails';
import MapCard from '@/app/hotels/details/components/MapCard';
import PackagePoster from '@/app/shared/components/PackagePoster';
const HotelDetails = (props) => {
  const { hotelDetails, imageUrl, saveTravellerData, profile, showUserDetails, buttonLoader, objId, ind } = props
  const { selectedLanguageAndCountry } = useAppSelector((state) => state.sharedState);
  const { hotelLoader } = useAppSelector(state => state.hotelState)
  const { translation } = useAppSelector((state) => state.sharedState)
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (location.hash === "#contact_details") {
      // Scroll to the element with ID 'contact_details'
      const userDetailsElement = document.getElementById('contact_details');
      if (userDetailsElement) {
        userDetailsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      if (typeof window !== 'undefined') {
        window.scrollTo(0, 0)
      }
    }
    dispatch(getHotelDetailsApi(objId, ind))
    dispatch(getPreTravellerApi(objId, ind))
  }, [])
  useEffect(() => {
    return () => {
      dispatch(setHotelDetails({}));
      dispatch(setPreTravellerData({}));
      dispatch(setGenericLoader(false))
      dispatch(setSaveTravellerLoader(false))
      dispatch(setPaymentWaitLoader(false))
    };
  }, []);

  return (
    <div className={` ${selectedLanguageAndCountry?.language?.code === "ar" ? 'rtl font-arabic' : 'font-inter'} container mx-auto px-4`}>
      {
        buttonLoader ?
          <GenericLoader text={"Securing your Room - your travel experience is just a payment away! "} /> :
          <div className='mt-10 mb-10'>
            <div className='grid grid-cols-1'>
              <div className='flex flex-col'>
                {
                  hotelLoader ? (
                    <Skeleton
                      sx={{ bgcolor: 'grey.300' }}
                      variant="rectangular"
                      className="w-1/4 h-full bg-stone-50"
                      height={30}
                    />
                  ) :
                    <h4 class="text-black text-lg md:text-2xl font-bold ">{hotelDetails?.hotelName}</h4>
                }
                {
                  hotelLoader ? (
                    <Skeleton
                      sx={{ bgcolor: 'grey.300' }}
                      variant="rectangular"
                      className="w-1/4 h-full mt-3 bg-stone-50"
                      height={30}
                    />
                  ) :
                    <div className='flex gap-1 mt-1 text-[11px] md:text-sm font-normal text-neutral-400'>
                      <div onClick={() => window.location.href = "/"}>{translation?.home}</div>
                      <h3>/</h3>
                      <div onClick={() => window.location.href = "/hotels/search"} className='cursor-pointer'>{translation?.search_results}</div>
                      {
                        hotelDetails?.hotelName ?
                          <>
                            <h3>/</h3>
                            <h3 className='font-medium text-black cursor-pointer'>{hotelDetails?.hotelName}</h3>
                          </>
                          : null
                      }

                    </div>
                }
              </div>
            </div>
            <div className='grid grid-cols-10 mt-8 md:gap-10'>
              {
                hotelDetails?.alertMsg ?
                  <div className='col-span-10'>
                    <AlertMessage message={hotelDetails?.alertMsg} />
                  </div> :
                  <>
                    <div className='flex flex-col col-span-10 mt-6 lg:col-span-7 md:gap-10'>
                      {
                        hotelLoader ? (
                          <Skeleton
                            sx={{ bgcolor: 'grey.300' }}
                            variant="rectangular"
                            className="w-full h-full bg-stone-50"
                            height={600}
                          />
                        ) :
                          <ImageContainer imageUrl={imageUrl} />
                      }
                      {
                        hotelLoader ? (
                          <Skeleton
                            sx={{ bgcolor: 'grey.300' }}
                            variant="rectangular"
                            className="w-full h-full mt-4 bg-stone-50"
                            height={300}
                          />
                        ) :
                          <HotelDescription hotelDetails={hotelDetails} />
                      }
                      {
                        hotelLoader ? (
                          <Skeleton
                            sx={{ bgcolor: 'grey.300' }}
                            variant="rectangular"
                            className="w-full h-full mt-3 bg-stone-50"
                            height={400}
                          />
                        ) :
                          <MoreDetails moreDetails={hotelDetails?._lstBasicDetails} />
                      }
                      {
                        hotelLoader ? (
                          <Skeleton
                            sx={{ bgcolor: 'grey.300' }}
                            variant="rectangular"
                            className="w-full h-full mt-3 bg-stone-50"
                            height={300}
                          />
                        ) :
                          <RoomSelect rooms={hotelDetails?._lstRooms} />
                      }

                      {
                        saveTravellerData?.bookingCode ?
                          <>
                            <div className='my-4'>
                              <FLightAndHotelContactForm />
                            </div>
                            {
                              profile && Object.keys(profile).length ? <HotelUserDetails objectID={objId} id={ind} /> :
                                showUserDetails ?
                                  <HotelUserDetails objectID={objId} id={ind} /> : null

                            }

                          </> : null
                      }
                    </div>
                    <div className='col-span-10 mt-6 lg:col-span-3 md:gap-10'>
                      {
                        hotelLoader ? (
                          <Skeleton
                            sx={{ bgcolor: 'grey.300' }}
                            variant="rectangular"
                            className="w-full h-full bg-stone-50"
                            height={300}
                          />
                        ) :
                          <MapCard hotelDetails={hotelDetails} />
                      }
                      <div className='mt-12'>
                        {
                          hotelLoader ? (
                            <Skeleton
                              sx={{ bgcolor: 'grey.300' }}
                              variant="rectangular"
                              className="w-full h-full mt-4 bg-stone-50"
                              height={400}
                            />
                          ) :
                            <PackagePoster />
                        }
                      </div>
                    </div>
                  </>
              }
            </div>
          </div>
      }


    </div>
  );

}


function mapStateToProps(state) {
  return {
    hotelDetails: state.hotelState.hotelDetails,
    imageUrl: state.hotelState?.hotelDetails?.imageUrl,
    hotelLoading: state.hotelState.hotelLoading,
    saveTravellerData: state.hotelState.saveTravellerData,
    profile: state.sharedState.profile,
    showUserDetails: state.sharedState.showUserDetails,
    buttonLoader: state.hotelState.buttonLoader,

  }
}

export default connect(mapStateToProps)(HotelDetails);
