"use client"
import React, { useEffect } from 'react'
// import FlightDetailsCard from '../components/FlightDetailsCard'
// import FLightAndHotelContactForm from '../../../shared/components/FLightAndHotelContactForm'
// import FlightUserDetails from '../components/FlightUserDetails'
// import FlightPaymentSummary from '../components/FlightPaymentSummary'
// import PackagePoster from '../../../shared/components/PackagePoster'
// import FlightMoreDetails from '../components/FlightMoreDetails'

import { getFlightDetailsApi } from '@/app/flights/api'
import { Skeleton } from '@mui/material'
import AlertMessage from '@/app/shared/components/AlertMessage'
import { getCoPaxApi } from '@/app/profile/api'
import GenericLoader from '@/app/shared/components/GenericLoader'
import { setGenericLoader } from '@/lib/slices/flightSlice'
import { setSaveTravellerLoader } from '@/lib/slices/insuranceSlice'
import { setPaymentWaitLoader } from '@/lib/slices/paymentSlice'
import { decryptUrl } from '@/lib/utils'
import { Store } from '@mui/icons-material'
import StoreProvider from '@/app/StoreProvider'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import FlightDetailsCard from '@/app/flights/details/components/FlightDetailsCard'
import PriceDetails from '@/app/flights/details/components/PriceDetails'
import FareRule from '@/app/flights/details/components/FareRule'
import FLightAndHotelContactForm from '@/app/shared/components/FLightAndHotelContactForm'
import FlightUserDetails from '@/app/flights/details/components/FlightUserDetails'
import FlightPaymentSummary from '@/app/flights/details/components/FlightPaymentSummary'
import PackagePoster from '@/app/shared/components/PackagePoster'

const FlightDetailsChild = ({ objId, ind }) => {
  const { userReviewDetails, flightLoader, genericLoader } = useAppSelector(state => state.flightState)
  const { selectedLanguageAndCountry } = useAppSelector((state) => state.sharedState);
  const { flightDetails: { flightSegments = [], isRefund, alertMsg } } = useAppSelector(state => state.flightState)
  const { showUserDetails } = useAppSelector(state => state.sharedState)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (typeof window !== "undefined") {
    let hash = window.location.hash;
    if (hash) {
      var targetId = hash.substring(1);
      var targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.error('Element with id "' + targetId + '" not found.');
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
    dispatch(getFlightDetailsApi({ objectID: objId, index: ind }))
  }, [ind, objId])
  useEffect(() => {
    dispatch(getCoPaxApi)
  }, [])
  useEffect(() => {
    return () => {
      dispatch(setGenericLoader(false))
      dispatch(setSaveTravellerLoader(false))
      dispatch(setPaymentWaitLoader(false))
    }
  }, []);
  const { translation } = useAppSelector((state) => state.sharedState)
  return (
    <div className={` ${selectedLanguageAndCountry?.language?.code === "ar"  ? 'rtl font-arabic' : 'font-inter'} container mx-auto px-4`}>
      {
        genericLoader ?
          <GenericLoader text={"Securing your seat - your travel experience is just a payment away! "} /> :
          <div className='mt-12 mb-12 '>
            {
              flightLoader ?
                <Skeleton
                  sx={{ bgcolor: 'grey.300' }}
                  variant="rectangular"
                  className="h-full bg-stone-50"
                  height={20}
                  width={"10vw"}
                /> : <h3 className='text-lg font-bold text-black sm:text-2xl '>{translation?.flight_details}</h3>
            }
            {
              flightLoader ?
                <Skeleton
                  sx={{ bgcolor: 'grey.300' }}
                  variant="rectangular"
                  className="h-full mt-5 bg-stone-50"
                  height={20}
                  width={"10vw"}
                /> : <div className='flex gap-1 mt-1 text-[11px] sm:text-sm font-normal text-neutral-400'>
              <h3 className='cursor-pointer' onClick={() => { if (typeof window !== "undefined") { window.location.href = "/" } }}>{translation?.home}</h3>
              <h3>/</h3>
                  <h3 className='cursor-pointer' onClick={() => { if (typeof window !== "undefined")  {window.location.href = "/flights/search" }}}>{translation?.search_results}</h3>
                  <h3>/</h3>
                  <h3 className='font-medium text-black'>{translation?.flight_details}</h3>
                </div>
            }

            <div className="grid grid-cols-10 gap-8 mt-8">
              {
                alertMsg && !flightLoader ?
                  <div className='col-span-10'>
                    <AlertMessage message={alertMsg} />
                  </div>
                  :
                  <>
                    <div className='flex flex-col col-span-10 gap-8 lg:col-span-7 '>
                      {
                        flightLoader ?
                          <Skeleton
                            sx={{ bgcolor: 'grey.300' }}
                            variant="rectangular"
                            className="w-full bg-stone-50"
                            height={"50vh"}
                          /> : <FlightDetailsCard flightSegments={flightSegments} isRefund={isRefund} />

                      }
                      {
                        flightLoader ?
                          <Skeleton
                            sx={{ bgcolor: 'grey.300' }}
                            variant="rectangular"
                            className="w-full bg-stone-50"
                            height={"40vh"}
                          /> : <PriceDetails />
                      }
                      {
                        flightLoader ?
                          <Skeleton
                            sx={{ bgcolor: 'grey.300' }}
                            variant="rectangular"
                            className="w-full bg-stone-50"
                            height={"40vh"}
                          /> : <FareRule />
                      }
                      {
                        flightLoader ?
                          <Skeleton
                            sx={{ bgcolor: 'grey.300' }}
                            variant="rectangular"
                            className="w-full bg-stone-50"
                            height={"30vh"}
                          /> : <FLightAndHotelContactForm />
                      }
                      {flightLoader ? (
                        <Skeleton
                          sx={{ bgcolor: 'grey.300' }}
                          variant="rectangular"
                          className="w-full bg-stone-50"
                          height={"40vh"}
                        />
                      ) : (
                        userReviewDetails._Travellerinfo ? null :
                          showUserDetails ? <FlightUserDetails /> :
                            null
                      )}

                    </div>
                    <div className='flex flex-col col-span-10 gap-8 lg:col-span-3 '>
                      {
                        flightLoader ?
                          <Skeleton
                            sx={{ bgcolor: 'grey.300' }}
                            variant="rectangular"
                            className="w-full bg-stone-50"
                            height={"30vh"}
                          /> : <FlightPaymentSummary />
                      }
                      {
                        flightLoader ?
                          <Skeleton
                            sx={{ bgcolor: 'grey.300' }}
                            variant="rectangular"
                            className="w-full bg-stone-50"
                            height={"50vh"}
                          /> : <PackagePoster />
                      }


                    </div>
                  </>
              }

            </div>
          </div>
      }
    </div>
  )
}

const FlightDetails = ({ objId, ind }) => {
  return (
    <StoreProvider>
      <FlightDetailsChild objId={objId} ind={ind} />
    </StoreProvider>
  )
}

export default FlightDetails