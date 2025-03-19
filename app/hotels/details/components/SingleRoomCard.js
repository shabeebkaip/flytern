import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Autoplay } from "swiper/modules"
import LabelValue from '@/app/shared/components/LabelValue';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { displayDateFormatShort } from '@/lib/constants';
import { Chip } from '@mui/material'
import Image from 'next/image';

const SingleRoomCard = ({ item, handleSelectedRoom, expand, handlExpandCard, index }) => {
  const { saveTravellerData } = useSelector(state => state.hotelState)
  const location = typeof window !== "undefined" ? window.location : null;
  const { translation } = useSelector((state) => state.sharedState)

  return (
    <div
      className={`p-2 transition-all cursor-pointer shadow-md duration-300 ${location?.pathname.includes("payment") ? 'bg-white' : expand === index ? ' border-emerald-800 bg-[#f8f8f8] rounded-md' : ''}`}
      onClick={() => handlExpandCard(index)}
      onMouseOver={() => handlExpandCard(index)}
    >
      <div className='grid items-center grid-cols-1 gap-3 lg:grid-cols-2'>
        <div className='p-4 mb-3'>
          <div className='flex justify-between'>
            <h3 className='font-semibold text-green-800 lg:text-xl '>{item.currency} {item.totalPrice} </h3>
          </div>
          <div className='flex flex-col gap-2 mt-3'>
            {item?.roomsList?.map((i, index) => (
              <div className='font-semibold' key={index}>
                {translation?.room} {index + 1} -  {i}
              </div>
            ))}
          </div>
          <div className='flex flex-wrap gap-2 mt-3'>
            {item?.shortdesc.map((items) => (
              <Chip label={items} key={index} />
            ))}
          </div>
        </div>

        <div className='grid w-full grid-cols-1 gap-3 lg:grid-cols-1 lg:row-span-2'>
          {item?.imageURLs?.length ? (
            <div className='w-full p-4'>
              {expand === index ? (
                <Swiper
                  className='flex flex-wrap items-center w-full'
                  spaceBetween={20}
                  modules={[Autoplay]}
                  autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                  }}
                  breakpoints={{
                    320: {
                      slidesPerView: 1.5,
                      spaceBetween: 10,
                    },
                    500: {
                      slidesPerView: 2.5,
                      spaceBetween: 15,
                    },
                    640: {
                      slidesPerView: 3,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 4,
                      spaceBetween: 20,
                    },
                  }}
                >
                  {item?.imageURLs.map((image, index) => (
                    <SwiperSlide key={index}>
                      <Image
                        width={160}
                        height={160}
                        className='object-cover w-full h-20 rounded-lg sm:h-40'
                        src={image}
                        alt=""
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className='flex gap-5 overflow-hidden'>
                  {item?.imageURLs.slice(0, 2).map((image, index) => (
                    <div key={index}>
                      <Image
                        width={160}
                        height={160}
                        className='object-cover rounded-lg h-28 sm:h-40'
                        src={image}
                        alt=""
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>

      <div className='grid grid-cols-1 gap-3 overflow-hidden transition-all duration-300 sm:grid-cols-2'>
        <div className='flex flex-col gap-3 p-4 border sm:col-span-2 lg:col-span-1 lg:row-span-1'>
          <div>
            <h3 className='text-xl text-green-800'>{translation?.cancellation_policy}</h3>
            {item?.cancelPolicies.map((i, index) => (
              <div className='flex flex-col gap-2 mt-3' key={index}>
                <h4>{i.cancellationCharge} {i.chargeType} cancellation from {moment(i.fromDate, "DD-MM-YYYY HH:mm:ss").format(displayDateFormatShort)}</h4>
              </div>
            ))}
          </div>
          {item.supplements && item.supplements.length ?
            <div>
              <h3 className='text-xl text-green-800'>{translation?.supplements}</h3>
              {item.supplements[0].map((i, index) => (
                <div className='flex flex-col gap-2 mt-3' key={index}>
                  <LabelValue label={i.description} value={`${i.currency} ${parseFloat(i.price).toFixed(3)}`} pStyles='font-semibold' />
                </div>
              ))}
            </div> : null
          }
        </div>

        <div className='flex flex-col justify-between p-4 border sm:col-span-2 lg:col-span-1 lg:row-span-1'>
          <div className='flex flex-col gap-2'>
            <h3 className='text-xl text-green-800'>{translation?.price_details}</h3>
            <div className='flex flex-col items-center gap-3'>
              <LabelValue label={translation?.per_night} value={`${item.currency} ${parseFloat(item.perNightPrice).toFixed(3)}`} />
              <LabelValue label={translation?.total_fare} value={`${item.currency} ${parseFloat(item.totalBase).toFixed(3)}`} />
              <LabelValue label={translation?.tax_fare} value={`${item.currency} ${parseFloat(item.totalTax).toFixed(3)}`} />
              <LabelValue label={translation?.grand_total} value={`${item.currency} ${parseFloat(item.totalPrice).toFixed(3)}`} pStyles='font-semibold' />
            </div>
          </div>
          {
            location?.pathname.includes("payment") || saveTravellerData?.roomOptionid ? null :
              <button className='h-12 text-center text-white text-base font-medium px-6 py-1.5 bg-emerald-800 rounded-md justify-center items-center mt-3' onClick={() => handleSelectedRoom(item)}>{translation?.select_room}</button>
          }
        </div>
      </div>
    </div>
  )
}

export default SingleRoomCard;
