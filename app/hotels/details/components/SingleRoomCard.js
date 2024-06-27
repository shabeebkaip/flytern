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
      <div className='grid items-center grid-cols-1 lg:grid-cols-2'>
        <div className='p-4 mb-3'>
          <div className='flex justify-between '>
            {/* <h3 className='text-sm text-green-800 lg:text-xl '>{translation?.room_details}</h3> */}
            <h3 className='font-semibold text-green-800 lg:text-xl '>{item.currency} {item.totalPrice} </h3>
          </div>
          <div className='flex flex-col gap-2 mt-3 '>
            {item?.roomsList?.map((i, index) => (
              <div className='font-semibold' key={index}>
                {translation?.room} {index + 1} -  {i}
              </div>
            ))}

          </div>
          <div className='flex flex-wrap gap-2 mt-3'>
            {
              item?.shortdesc.map((items) => (
                <Chip label={items} key={index} />
              ))
            }
          </div>
        </div>
        <div className='grid w-full grid-cols-1 gap-3'>
          {item?.imageURLs?.length ?
            <div className='w-full p-4 '>
              {
                expand === index ?
                  <Swiper
                    spaceBetween={30}
                    slidesPerView={1}
                    modules={[Autoplay]}
                    autoplay={{
                      delay: 1000,
                      disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true }}
                    loop={true}
                    breakpoints={{
                      // When screen size is 640px or larger, set slidesPerView to 1
                      500: {
                        slidesPerView: 1.8,
                      },
                    }}
                  >
                    {item?.imageURLs.map((item, index) => (
                      <SwiperSlide key={index}>
                        <Image
                          width={160}
                          height={160}
                          className='w-full h-40 rounded-lg'
                          src={item}
                          alt=""
                          key={index}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  :
                  <div className='flex gap-5 overflow-hidden'>
                    {item?.imageURLs.slice(0, 2).map((image, index) => (
                      <div key={index}>
                        <Image
                          width={160}
                          height={160}
                          className='h-40 rounded-lg w-68'
                          src={image}
                          alt=""
                        />
                      </div>
                    ))}
                  </div>
              }
            </div> : null

          }
        </div>
      </div>

      <div className={`grid grid-cols-2 gap-3 overflow-hidden transition-all duration-300 `}>
        <div className='flex flex-col col-span-2 gap-3 p-4 border sm:col-span-1'>
          <div>
            <div>
              <h3 className='text-xl text-green-800'>{translation?.cancellation_policy}</h3>
            </div>
            {
              item?.cancelPolicies.map((i, index) => (
                <div className='flex flex-col gap-2 mt-3 ' key={index}>
                  <h4>{i.cancellationCharge} {i.chargeType} cancellation from {moment(i.fromDate, "DD-MM-YYYY HH:mm:ss").format(displayDateFormatShort)} </h4>
                </div>

              ))
            }
          </div>
          {item.supplements && item.supplements.length ?
            <div>
              <div>
                <h3 className='text-xl text-green-800'>{translation?.supplements}</h3>
              </div>
              {

                item.supplements[0].map((i, index) => {
                  return (
                    <div className='flex flex-col gap-2 mt-3 ' key={index}>
                      <LabelValue label={i.description} value={`${i.currency} ${parseFloat(i.price).toFixed(3)} `} pStyles='font-semibold' />
                    </div>
                  )
                })
              }
            </div> : null
          }

        </div>
        <div className='flex flex-col justify-between col-span-2 p-4 border sm:col-span-1'>
          <div className='flex flex-col gap-2'>
            <div>
              <h3 className='text-xl text-green-800'>{translation?.price_details}</h3>
            </div>
            <div className='flex flex-col items-center gap-3'>
              <LabelValue label={translation?.per_night} value={`${item.currency} ${parseFloat(item.perNightPrice).toFixed(3)}`} />
              <LabelValue label={translation?.total_fare} value={`${item.currency} ${parseFloat(item.totalBase).toFixed(3)}`} />
              <LabelValue label={translation?.tax_fare} value={`${item.currency} ${parseFloat(item.totalTax).toFixed(3)}`} />
              <LabelValue label={translation?.grand_total} value={`${item.currency} ${parseFloat(item.totalPrice).toFixed(3)}`} pStyles='font-semibold' />
            </div>
          </div>
          {
            location?.pathname.includes("payment") || saveTravellerData?.roomOptionid ? null :
              <button className=' h-12 text-center text-white text-base font-medium px-6 py-1.5 bg-emerald-800 rounded-md justify-center items-center mt-3 ' onClick={() => handleSelectedRoom(item)} >{translation?.select_room}</button>
          }
        </div>
      </div>

    </div>
  )
}

export default SingleRoomCard