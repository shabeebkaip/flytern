"use client"
import React, { useEffect, useState } from 'react'
import { Skeleton } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import GenericLoader from '@/app/shared/components/GenericLoader';
import { setGenericLoader } from '@/lib/slices/flightSlice';
import { setSaveTravellerLoader } from '@/lib/slices/insuranceSlice';
import { setPaymentWaitLoader } from '@/lib/slices/paymentSlice';
import PaymentChooseCard from '../components/PaymentChooseCard';
import AlertMessage from '@/app/shared/components/AlertMessage';
import { savePaymentMethodApi } from '../api';
import FlightDetailsCard from '@/app/flights/details/components/FlightDetailsCard';
import CabinCard from '../components/CabinCard';
import TitleCard from '@/app/shared/components/TitleCard';
import RoomCard from '@/app/hotels/details/components/RoomCard';
import BasicDetails from '../components/BasicDetails';
import Amenities from '@/app/hotels/details/components/Amenities';
import RoomRateConditions from '../components/RoomRateConditions';
import PaymentSummaryFlight from '../components/PaymentSummaryFlight';
import BookingInfo from '../components/BookingInfo';
import StoreProvider from '@/app/StoreProvider';


const PaymentMethodChild = ({gatewayList,refrence}) => {
  const dispatch = useAppDispatch()

  const { selectedLanguageAndCountry } = useAppSelector((state) => state.sharedState);


  const _gatewaylist = gatewayList?._gatewaylist;
  const _flightservice = gatewayList?._flightservice;
  const _bookingInfo = gatewayList?._bookingInfo;
  const _hotelservice = gatewayList?._hotelservice;
  const isGateway = gatewayList?.isGateway;
  const alertMsg = gatewayList?.alertMsg;

 
  const { paymentLoader } = useAppSelector(state => state.paymentState)
  const flightSegments = gatewayList?._flightservice?._flightDetail?.flightSegments;
  const isRefund = gatewayList?._flightservice?._flightDetail?.isRefund;
  const paymentWaitLoader = useAppSelector(state => state.paymentState.paymentWaitLoader)
  const [data, setData] = useState({
    processID: _gatewaylist && _gatewaylist[0]?.processID,
    paymentCode: _gatewaylist && _gatewaylist[0]?.paymentCode,
    bookingRef: refrence,
  })


  useEffect(() => {
    if (_gatewaylist?.length) {
      setData({
        processID: _gatewaylist[0]?.processID,
        paymentCode: _gatewaylist[0]?.paymentCode,
        bookingRef: refrence,
        redirectionUrl: typeof window !== 'undefined' ? `${window.location.origin}/payment-summary/?ref=${refrence}` : ''
      });
    }
  }, [_gatewaylist]);
  
  useEffect(() => {

    return () => {
      dispatch(setGenericLoader(false))
      dispatch(setSaveTravellerLoader(false))
      dispatch(setPaymentWaitLoader(false))
    }
  }, [])
  const { translation } = useAppSelector((state) => state.sharedState)
  return (
    <div className={` ${selectedLanguageAndCountry?.language?.code === "ar" ? 'rtl font-arabic' : 'font-inter'} container mx-auto px-4`} >
      {
        paymentWaitLoader ?
          <GenericLoader text={"Crafting seamless payments - your submission page is moments away!"} /> :
          <div className='mt-10 mb-10'>
            <div className='grid grid-cols-1 mb-6'>
              <div className='flex flex-col'>
                {
                  paymentLoader ?
                    <Skeleton
                      sx={{ bgcolor: 'grey.300' }}
                      variant="rectangular"
                      className="w-1/4 h-full bg-stone-50"
                      height={30}
                    /> :
                    <h4 class="text-black text-2xl font-bold ">{translation?.payment_method}</h4>
                }
                {
                  paymentLoader ?
                    <Skeleton
                      sx={{ bgcolor: 'grey.300' }}
                      variant="rectangular"
                      className="w-1/4 h-full mt-3 bg-stone-50"
                      height={30}
                    /> :
                    <div className='flex gap-1 mt-1 text-sm font-normal text-neutral-400'>
                      <h3 className='cursor-pointer' onClick={() => navigate('/')}>{translation?.home}</h3>
                      <h3>/</h3>
                      {/* <h3>{bookingRef}</h3>
                      <h3>/</h3> */}
                      <h3 className='font-medium text-black'>{translation?.payment_method}</h3>
                    </div>
                }
              </div>
            </div>
            <div className='gap-10 md:grid md:grid-cols-10 '>
              <div className='flex flex-col col-span-10 gap-5 sm:col-span-10 sm:gap-10 lg:col-span-7'>

                {
                  paymentLoader ?
                    <Skeleton
                      sx={{ bgcolor: 'grey.300' }}
                      variant="rectangular"
                      className="w-full h-full bg-stone-50"
                      height={300}
                    /> :
                    isGateway ?
                      <PaymentChooseCard  data={data} setData={setData} _gatewaylist={_gatewaylist} /> : null
                }

                {
                  paymentLoader ?
                    <Skeleton
                      sx={{ bgcolor: 'grey.300' }}
                      variant="rectangular"
                      className="w-1/4 h-full bg-stone-50"
                      height={30}
                    /> :
                    isGateway ?
                      <div>
                        <button className='text-white bg-emerald-800 sm:w-[350px] p-3 rounded-md' onClick={() => dispatch(savePaymentMethodApi(data))}  >{translation?.pay_now}</button>
                      </div> : null
                }
                {
                  alertMsg?.length ?
                    alertMsg.map((item, index) => (
                      <AlertMessage message={item} key={index} />
                    )) : null
                }
                {/* <AlertMessage message={redirectionAlert} /> */}
                {
                  paymentLoader ?
                    <Skeleton
                      sx={{ bgcolor: 'grey.300' }}
                      variant="rectangular"
                      className="w-full h-full bg-stone-50"
                      height={400}
                    /> :


                    _flightservice && Object.keys(_flightservice)?.length ? <FlightDetailsCard flightSegments={flightSegments} isRefund={isRefund} /> : null
                }
                {
                  paymentLoader ?
                    <Skeleton
                      sx={{ bgcolor: 'grey.300' }}
                      variant="rectangular"
                      className="w-full h-full bg-stone-50"
                      height={400}
                    /> :
                    _flightservice && Object.keys(_flightservice)?.length ? <CabinCard cabin={_flightservice?._flightDetail?.selectedCabinName} /> : null
                }

                {
                  paymentLoader ?
                    <Skeleton
                      sx={{ bgcolor: 'grey.300' }}
                      variant="rectangular"
                      className="w-full h-full bg-stone-50"
                      height={300}
                    /> :
                    _hotelservice?._lstRooms.length ?
                      _hotelservice?._lstRooms.map((item, index) => (
                        <TitleCard title={""} key={index}>
                          <div className='mt-4'>

                            <RoomCard key={index} room={item} />

                          </div>

                        </TitleCard>
                      )) : null
                }
                {
                  paymentLoader ?
                    <Skeleton
                      sx={{ bgcolor: 'grey.300' }}
                      variant="rectangular"
                      className="w-full h-full mt-3 bg-stone-50"
                      height={300}
                    /> :

                    _hotelservice?._lstBasicDetails ?
                      <BasicDetails data={_hotelservice?._lstBasicDetails} /> : null
                }
                {
                  paymentLoader ?
                    <Skeleton
                      sx={{ bgcolor: 'grey.300' }}
                      variant="rectangular"
                      className="w-full h-full bg-stone-50"
                      height={300}
                    /> :

                    _hotelservice?._lstamenitys.length ?
                      <TitleCard  >
                        <Amenities amenities={_hotelservice?._lstamenitys} />
                      </TitleCard> : null
                }
                {
                  paymentLoader ?
                    <Skeleton
                      sx={{ bgcolor: 'grey.300' }}
                      variant="rectangular"
                      className="w-full h-full bg-stone-50"
                      height={300}
                    /> :
                    _hotelservice?.roomRateConditions.length ?
                      <RoomRateConditions data={_hotelservice?.roomRateConditions} /> : null
                }

              </div>
              <div className='flex flex-col col-span-10 gap-5 sm:col-span-10 lg:col-span-3'>
                {paymentLoader ? (
                  <Skeleton
                    sx={{ bgcolor: 'grey.300' }}
                    variant="rectangular"
                    className="w-full h-full bg-stone-50"
                    height={300}
                  />
                ) : (
                  !paymentLoader && isGateway ? (
                    <PaymentSummaryFlight />
                  ) : null
                )}

                {
                  paymentLoader ?
                    <Skeleton
                      sx={{ bgcolor: 'grey.300' }}
                      variant="rectangular"
                      className="w-full h-full bg-stone-50"
                      height={300}
                    /> :
                    _bookingInfo && _bookingInfo?.length ?
                      <BookingInfo _bookingInfo={_bookingInfo} /> : null
                }

              </div>
            </div>
          </div >
      }

    </div>
  )
}
const PaymentMethod = ({gatewayList,refrence}) => {
  return (
    <StoreProvider>
      <PaymentMethodChild gatewayList={gatewayList} refrence={refrence}  />
    </StoreProvider>
  )
}

export default PaymentMethod