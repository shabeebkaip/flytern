import { displayDateFormatShort } from '@/lib/constants'
import { Rating } from '@mui/material'
import moment from 'moment'
import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux'

const PackageDetailCard = ({ item }) => {
    const { selectedLanguageAndCountry } = useSelector(state => state.sharedState)

    return (
        <div>
            <div className='container flex items-center p-4 mx-auto overflow-hidden bg-white rounded-md'>
                <div className="grid grid-cols-12 gap-4 md:gap-8">
                    <div className='w-full col-span-4 md:col-span-3'>
                        <Image src={item.url} className='object-cover w-full rounded-md' alt='' width={300} height={300} />
                    </div>
                    <div className='flex justify-between w-full col-span-8 md:col-span-7'>
                        <div className='flex flex-col gap-1 md:gap-5'>
                            <h3 className='text-sm font-medium text-black sm:text-xl'>{item.name}</h3>
                            <h3 className='text-xs font-normal sm:text-base text-zinc-600'>{item.shortDesc}</h3>
                            <div className='flex flex-col justify-center gap-1 md:gap-5'>
                                <div className='flex gap-1'>
                                    <Image className='w-6 h-6' src="/package/routing-2.png" alt="" width={300} height={300} />
                                    <h3 className='text-xs font-normal sm:text-base text-zinc-600'>{item.fromTo}</h3>
                                </div>
                                <div className='flex items-center gap-1 md:gap-3'>
                                    <div className='flex items-center justify-center gap-1 md:gap-2'>
                                        <Image className='w-6 h-6' src="/package/Buildings 2.png" alt="" width={300} height={300} />
                                        <h3 className='text-xs font-normal sm:text-base text-zinc-600 '>{item.hotelName}</h3>
                                    </div>
                                    <div className='flex items-center justify-center gap-1 md:gap-2'>
                                        <Image className='w-6 h-6' src="/package/plane.png" alt="" width={300} height={300} />
                                        <h3 className='text-xs font-normal sm:text-base text-zinc-600'>{item.airline}</h3>
                                    </div>
                                </div>
                                <div>
                                    <Rating value={item.ratings}
                                        precision={0.5} // Allows half-star ratings
                                        readOnly // Prevents user interaction
                                    />
                                </div>
                            </div>

                        </div>


                    </div>
                    <div className='flex flex-row items-center justify-between col-span-12 md:flex-col md:items-end md:col-span-2'>
                        <h3 className=' text-[11px] sm:text-base font-medium text-orange-400'>
                            {item.currency}
                            <span className='ml-1 text-base font-semibold sm:text-2xl'>
                                {item.price}
                            </span>
                        </h3>

                        <h4 className='font-medium text-sm  '>Enquired Date :<br/><span className='text-xl text-tag-color-two font-semibold'>
                            {item?.enquiredOn
                                ? moment(item?.enquiredOn).format(
                                    displayDateFormatShort
                                )
                                : "--"}
                                </span></h4>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default PackageDetailCard