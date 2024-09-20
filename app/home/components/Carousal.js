"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';
import Link from 'next/link';
import { useAppSelector } from '@/lib/hooks';

const Carousal = () => {
  const { data: { apiSlider = [] } } = useAppSelector(state => state.exploreState)
  return (
    <Swiper
      // spaceBetween={50}
      slidesPerView={1}
      modules={[Autoplay, Pagination]}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
        bulletClass: 'swiper-pagination-bullet',
        bulletActiveClass: 'swiper-pagination-bullet-active',
      }}
      className='w-full h-full'
      onSwiper={(swiper) => { }}
      onSlideChange={() => { }}
    >
      {
        apiSlider?.map((item, index) => (
          <SwiperSlide key={index} className='cursor-pointer'>
            <div onClick={() => { if (typeof window !== "undefined") {window?.location?.href = `/packages/${item?.refID}` }}}>
              <Image width={300} height={300} src={item?.url} alt="" className='rounded-md w-full h-full' />
            </div>
          </SwiperSlide>
        ))
      }
    </Swiper>
  );
};

export default Carousal;
