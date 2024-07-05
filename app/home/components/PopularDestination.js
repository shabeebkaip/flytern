"use client"
import React from 'react'
import TitleCard from '@/app/shared/components/TitleCard'
import Link from 'next/link'
import { useMediaQuery } from 'react-responsive'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules'
import { SeeAllIconSvg } from '@/app/shared/components/SVG'
import Image from 'next/image'
import { useAppSelector } from '@/lib/hooks';

const PopularDestination = () => {
  const isTabletAndMobile = useMediaQuery({ query: "(max-width:767px)" });
  const { translation } = useAppSelector(state => state.sharedState)
  const { data } = useAppSelector(state => state.exploreState)
  return (
    <>
      <TitleCard title={
        <>
          <div className='flex items-center justify-between'>
            <h4 className='text-xs font-bold sm:text-2xl'>{translation?.popular_destinations}</h4>
            <div className='flex items-center'>
              <div onClick={() => { if (typeof window !== "undefined") { window.location.href = "/popular-destination" } }} className='flex items-center gap-2 font-normal text-blue-400'><span className='flex items-center gap-2 text-xs sm:text-lg'>{translation?.see_all} <SeeAllIconSvg /> </span> </div>
            </div>
          </div>
        </>
      } >
        <Swiper
          slidesPerView={isTabletAndMobile ? 1.7 : 3}
          modules={[Autoplay]}
          spaceBetween={20}
          navigation={{
            prevEl: null,
            nextEl: null,
          }}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: true,
          }}
          className='grid grid-cols-3 mt-5 cursor-pointer'

        >
          {data && data.popularDestinations && data.popularDestinations.map((data, index) => (
            <SwiperSlide key={index}
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.location.href = `/packages/details/${data.refID}`;
                }
              }}
            >
              <div className="inline-flex flex-col items-start justify-start w-full gap-4">
                <Image width={500} height={500} className="w-full rounded-md" src={data.url} alt='' />
                <div className="flex flex-col self-stretch sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-black text-[8px] sm:text-sm font-medium">{data.name}</div>
                  <div className="justify-start items-center gap-[3px] flex">
                    <div className="text-black text-[7px] sm:text-sm font-medium flex items-center gap-1">
                      <Image width={50} height={50} className='w-3 h-3 sm:h-6 sm:w-6' src={"/icons/star.svg"} alt="" />
                      <span className='text-[7px] sm:text-sm'>{data.ratings}</span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>


      </TitleCard>
    </>
  )
}

export default PopularDestination