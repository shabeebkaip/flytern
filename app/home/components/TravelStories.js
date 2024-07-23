import React from 'react'
import TitleCard from '@/app/shared/components/TitleCard'
import Link from 'next/link'
import { Rating } from '@mui/material'
import { useMediaQuery } from 'react-responsive'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { SeeAllIconSvg } from '@/app/shared/components/SVG'
import ReactPlayer from 'react-player';
import Image from 'next/image'
import { useAppSelector } from '@/lib/hooks'

const TravelStories = () => {
  const isTabletAndMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const { data } = useAppSelector(state => state.exploreState)
  const { translation } = useAppSelector(state => state.sharedState)
  return (
    <>
      <TitleCard title={
        <>
          <div className='flex items-center justify-between'>
            <h4 className='text-xs font-bold sm:text-2xl'>{translation?.travel_stories}</h4>
            <div onClick={() => { if (typeof window !== "undefined") {window.location.href="/travel-stories"}}} className='flex items-center gap-2 font-normal text-blue-400'><span className='flex items-center gap-2 text-xs sm:text-lg cursor-pointer'>{translation?.see_all} <SeeAllIconSvg /> </span> </div>
          </div>
        </>
      } >
        <Swiper
          slidesPerView={isTabletAndMobile ? 1.3 : 3.2}
          spaceBetween={20}
          modules={[Autoplay]}
          navigation={{
            prevEl: null,
            nextEl: null,
          }}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: true,
          }}
          className='grid grid-cols-2 gap-5 mt-5 cursor-pointer'
        >
          {data && data.travelStories && data.travelStories.map((story, index) => {
            return (
              <SwiperSlide className='flex flex-col justify-start gap-3' key={index} onClick={() => {
                if (typeof window !== 'undefined') {
                  window.location.href = '/travel-stories';
                }
              }}>
                {story.urlType === 'VIDEO' ? (
                  <ReactPlayer
                    url={story.url}
                    width="100%"
                    height="100%"
                    controls
                  />
                ) : (
                  <div className='md:h-96'>
                    <Image width={500} height={500} src={story.url} alt='' className='object-cover w-full h-40 rounded-md sm:h-48 md:h-full' />
                  </div>
                )}
                <div className='flex flex-col gap-5'>
                  <div className='flex flex-col justify-between gap-2 mt-3 md:flex-row md:items-center'>
                    <div className='flex items-center gap-3 '>
                      <Image width={500} height={500} src={story.profileUrl} alt='' className='w-6 h-6 rounded-full' />
                      <p className="text-black text-[8px] sm:text-xs font-medium ">{story.name}</p>
                    </div>
                    <div>
                      {/*   <p className="text-stone-500 text-[7px] sm:text-xs font-normal tracking-tight m-0 p-0">January 24, 2023 1:17 PM </p> */}
                    </div>
                  </div>
                  <div className='flex flex-col gap-3'>
                    {isTabletAndMobile ? (
                      <Rating style={{ fontSize: '16px' }} name="read-only" value={parseFloat(story.ratings)} readOnly precision={0.5} />
                    ) : (
                      <Rating name="read-only" value={parseFloat(story.ratings)} readOnly precision={0.5} />
                    )}
                    <div className=" text-stone-500 text-[9px] sm:text-[13px] font-normal  leading-tight tracking-tight">{story.shortDesc}</div>
                  </div>
                </div>
              </SwiperSlide>
            )
          })
          }
        </Swiper>
      </TitleCard>
    </>
  )
}
export default TravelStories