import React from 'react'
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Autoplay } from 'swiper/modules';
import moment from 'moment';
import Image from 'next/image';
import { displayDateFormatShort } from '@/lib/constants';

const PackageDecription = () => {
    const { packageDetails: { packageHeaderImage, packages, packagesDtl ,packageSubImages= [] } } = useSelector((state) => state.packageState);
    const images = [...packageHeaderImage.map(item => ({ image: item.headerimage })), ...packageSubImages]

    
    return (
        <div className='container flex flex-col gap-5 p-4 mx-auto mt-3 overflow-hidden bg-white rounded-md'>
            <div className=''>
                {
                    images.length > 1 ?
                        <Swiper
                            spaceBetween={50}
                            slidesPerView={1}
                            modules={[Autoplay]}
                            autoplay={{ delay: 2000, disableOnInteraction: false }}
                        >
                            {
                                images.map((item, index) => (
                                    <SwiperSlide  key={index}>
                                        <div className='flex items-center justify-center' >
                                            <Image src={item.image} alt='' className='object-cover rounded-md md:h-96 ' width={400} height={400} />
                                        </div>
                                    </SwiperSlide>

                                ))
                            }
                        </Swiper> :
                        <div className='flex items-center justify-center' >
                            <Image src={images[0]?.image} alt='' className='object-cover rounded-md md:h-96 ' width={400} height={400} />
                        </div>
                }


            </div>

            <div className='flex flex-col items-baseline justify-between sm:flex-row'>
                <div className='flex flex-col gap-3 '>
                    <h3 className='text-xl font-bold text-black sm:text-3xl'>{packages[0] && packages[0].name && packages[0].name}</h3>
                    <div class="text-black sm:text-base text-xsfont-medium flex items-center gap-1 "> <Image className='w-6 h-6' src="/package/star.svg" alt="" width={400} height={400}/>  <span className='text-2xl font-normal text-black '>{packages[0] && packages[0].ratings && packages[0].ratings}</span> </div>
                </div>
                <div>
                    <h3 className='text-xs font-medium text-orange-400 sm:text-base '>{packages[0] && packages[0].currency && packages[0].currency} <span className='text-lg font-semibold sm:text-2xl'>{packages[0] && packages[0].price && parseFloat(packages[0].price).toFixed(3)}</span></h3>
                </div>
            </div>
            <div className='w-full'>
              
                <p className='w-full text-xs text-justify text-gray-500 sm:text-base'>
                   <span className=' font-semibold md:text-[20px]'>Validity : </span>{moment(packagesDtl[0]?.validFrom).format(displayDateFormatShort)} - {moment(packagesDtl[0]?.validTo).format(displayDateFormatShort)}
                </p>

            </div>
        </div>
    )
}

export default PackageDecription