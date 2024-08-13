import { Skeleton } from '@mui/material';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';
// import 'swiper/swiper.min.css'; // Import Swiper styles

const ImageContainer = ({ imageUrl }) => {
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleSlideClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className='flex flex-col w-full gap-5'>
      {
        imageUrl?.length ?
          <>
            <div className='flex items-center justify-center'>
              {imageUrl?.length ? (
                <Image width={500} height={500} src={imageUrl[activeIndex]} alt='' className=' rounded-lg h-[400px] sm:h-[500px] w-full' />
              ) : null}
            </div>
            <Swiper
  className='flex flex-wrap items-center w-full'
  spaceBetween={20}
  modules={[Autoplay]}
  autoplay={{
    delay: 2000,
    disableOnInteraction: true,
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
  {imageUrl?.length
    ? imageUrl.map((item, index) => (
      <SwiperSlide key={index}>
        <Image
          src={item}
          height={160}
          width={160}
          alt=''
          className='w-full h-32 p-2 cursor-pointer sm:h-40 rounded-3xl'
          onClick={() => handleSlideClick(index)}
        />
      </SwiperSlide>
    ))
    : null}
</Swiper>
          </>
          : null}
    </div>
  );
};

export default ImageContainer;
