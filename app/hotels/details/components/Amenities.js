import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules'
import { useSelector } from 'react-redux';
import Image from 'next/image';


const Amenities = ({ amenities }) => {
  const { translation } = useSelector((state) => state.sharedState)
  return (
    <>
      {amenities?.length ?

        <div className=''>
          <div className='mt-5'>
            <div className='flex items-center gap-2'>
              <Image width={40} height={40} src={"/icons/Wi-Fi Router.svg"} alt='' />
              <h3 className='text-lg font-medium text-black '>{translation?.popular_facilities}</h3>
            </div>
            <div>
              <div className='w-[38px] h-[3px] bg-orange-400 mt-3'></div>
              <div className='w-full h-[1px] bg-slate-200'></div>
            </div>
          </div>
          <Swiper
            slidesPerView={3}
            modules={[Autoplay]}
            spaceBetween={20}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: true,
            }}
            breakpoints={{
              // When screen size is 640px or larger, set slidesPerView to 1
              440: {
                slidesPerView: 4,
              },
              640: {
                slidesPerView: 5,
              },
              950: {
                slidesPerView: 6,
              }
            }}

            className='grid items-baseline grid-cols-10 gap-10 mt-6 '>
            {
              amenities?.length ? amenities.map((item, index) => {
                return (
                  <SwiperSlide className='flex flex-col items-center justify-center gap-5 cursor-grab' key={index}>
                    <div className='flex items-center justify-center w-full'>
                      <div className='flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100'>
                        <Image width={32} height={32} className='w-8 h-8 ' src={item.imagePath} alt="" />
                      </div>
                    </div>

                    <p className='mt-3 text-sm text-center'>{item.amenityName}</p>
                  </SwiperSlide>
                )
              }) : null
            }
          </Swiper>
        </div>
        : null}
    </>
  )
}

export default Amenities