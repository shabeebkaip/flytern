"use client"
import { Skeleton } from '@mui/material'
import Link from 'next/link';
import AlertMessage from '@/app/shared/components/AlertMessage';
import FlightDetailsCard from '@/app/flights/details/components/FlightDetailsCard';
import RoomCard from '@/app/hotels/details/components/RoomCard';
import TitleCard from '@/app/shared/components/TitleCard';
import BasicDetails from '@/app/payment-method/components/BasicDetails';
import Amenities from '@/app/hotels/details/components/Amenities';
import RoomRateConditions from '@/app/payment-method/components/RoomRateConditions';
import BookingInfo from '@/app/payment-method/components/BookingInfo';
import { useAppSelector } from '@/lib/hooks';
import PaymentSuccess from '../components/PaymentSuccess';
import StoreProvider from '@/app/StoreProvider';
import { useEffect } from 'react';
import { decryptId, encryptId } from '@/lib/utils';

const PaymentSummaryChild = ({ paymentStatus }) => {
  const { selectedLanguageAndCountry } = useAppSelector((state) => state.sharedState);


  const _flightservice = paymentStatus?._flightservice;
  const _hotelservice = paymentStatus?._hotelservice;
  const _bookingInfo = paymentStatus?._bookingInfo;
  const isIssued = paymentStatus?.isIssued;
  const _paymentInfo = paymentStatus?._paymentInfo;
  const alertMsg = paymentStatus?.alertMsg;
  const servicetype = paymentStatus?.servicetype
  useEffect(() => {
    if (!_paymentInfo || _paymentInfo.length === 0) {
      // if (typeof window !== 'undefined') {
      // }
    }
  }, [])

  const { paymentLoader } = useAppSelector(state => state.paymentState)
  const flightSegments = paymentStatus?._flightservice?._flightDetail?.flightSegments;
  const isRefund = paymentStatus?._flightservice?._flightDetail?.isRefund;

  const { translation } = useAppSelector((state) => state.sharedState)
  return (
    <div className={` ${selectedLanguageAndCountry?.language?.code === "ar" ? 'rtl font-arabic' : 'font-inter'} container mx-auto px-4`}>
      {
        _paymentInfo?.length ?
          <div className='mt-10 mb-10'>
            <div className='grid grid-cols-1'>
              <div className='flex flex-col'>
                <h4 class="text-black text-2xl font-bold">{translation?.booking_summary}</h4>
                <div className='flex gap-1 mt-1 text-sm font-normal text-neutral-400'>
                  <div onClick={() => { if (typeof window !== "undefined") { window.location.href = "/" } }}>{translation?.home}</div>
                  <h3>/</h3>
                  <h3 className='font-medium text-black'>{translation?.booking_summary}</h3>
                </div>
              </div>
            </div>
            <div className='grid grid-cols-12 gap-10'>
              <div className='flex flex-col col-span-11 gap-10 mt-5 md:col-span-12 lg:col-span-8'>

                {
                  paymentLoader ?
                    <Skeleton
                      sx={{ bgcolor: 'grey.300' }}
                      variant="rectangular"
                      className="w-full h-full bg-stone-50"
                      height={400}
                    />
                    :
                    <PaymentSuccess _paymentInfo={_paymentInfo} />
                }
                {
                  alertMsg?.length ?
                    alertMsg.map((item, index) => (
                      <AlertMessage message={item} key={index} />
                    )) : null
                }
                {
                  isIssued ?
                    servicetype === "FLIGHT" ?
                      <button className='text-white bg-emerald-800 w-[350px] p-3 rounded-md'><a href={paymentStatus.pdfLink} download={"E ticket"} target='_blank' rel="noreferrer" > {translation?.get_your_eticket}</a></button>
                      : servicetype === "HOTEL" ?
                        <button className='text-white bg-emerald-800 w-[350px] p-3 rounded-md'><a href={paymentStatus.pdfLink} download={"Voucher"} target='_blank' rel="noreferrer" > {translation?.get_your_vouchar} </a></button>
                        : null
                    : null
                }
                {
                  paymentLoader ?
                    <Skeleton
                      sx={{ bgcolor: 'grey.300' }}
                      variant="rectangular"
                      className="w-full h-full bg-stone-50"
                      height={400}
                    /> :
                    _flightservice ? <FlightDetailsCard flightSegments={flightSegments} isRefund={isRefund} /> : null
                }
                {
                  _hotelservice?._lstRooms ?
                    _hotelservice?._lstRooms.map((item, index) => (
                      <TitleCard title={translation?.room_details} key={index} >
                        <div className='mt-4'>
                          <RoomCard key={index} room={item} />
                        </div>
                      </TitleCard>
                    )) : null
                }
                {
                  _hotelservice?._lstBasicDetails ?
                    <BasicDetails data={_hotelservice?._lstBasicDetails} /> : null
                }
                {
                  _hotelservice?._lstamenitys.length ?
                    <TitleCard  >
                      <Amenities amenities={_hotelservice?._lstamenitys} />
                    </TitleCard> : null
                }
                {
                  _hotelservice?.roomRateConditions?.length ?
                    <RoomRateConditions data={_hotelservice?.roomRateConditions} /> : null
                }

                {/* <button className='text-white bg-emerald-800 w-[350px] p-3 rounded-md'><a href={paymentStatus.pdfLink} download={"E ticket"} target='_blank' rel="noreferrer" > {language === 'ar' ? arabic_translation.e_ticket : 'Get Your E-Ticket'} </a></button> */}
              </div>
              <div className='flex flex-col col-span-10 gap-10 mt-5 lg:col-span-4'>
                {
                  paymentLoader ?
                    <Skeleton
                      sx={{ bgcolor: 'grey.300' }}
                      variant="rectangular"
                      className="w-full h-full bg-stone-50"
                      height={400}
                    /> :
                    <BookingInfo _bookingInfo={_bookingInfo} />
                }
              </div>
            </div>
          </div> :
          <>
            {
              paymentStatus?.redirectionAlert?.length ?
                <div className='mt-10 '>
                  <AlertMessage message={paymentStatus?.redirectionAlert} />
                </div>
                : null
            }
          </>
      }
    </div>
  )
}

const PaymentSummary = ({ paymentStatus,isSuccess,bookingRef}) => {

  const decryptedRef = encryptId(bookingRef)

 
  
  

 useEffect(() => {
    if (decryptedRef && isSuccess === false) {
      window.location.href = `/payment-method?ref=${decryptedRef}`;
    }
  }, [isSuccess, decryptedRef]);
  return (
    <StoreProvider>
      <PaymentSummaryChild paymentStatus={paymentStatus} />
    </StoreProvider>
  )
}

export default PaymentSummary