import { Rating } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'

const PackageCard = ({ item }) => {
    // const navigate = useNavigate()
    const { translation } = useSelector((state) => state.sharedState)
    return (
        <div>
            <div className='container flex items-center p-4 mx-auto mt-8 mb-8 overflow-hidden bg-white rounded-md'>
                <div className="grid grid-cols-12 gap-4 md:gap-8">
                    <div className='w-full col-span-4 md:col-span-3'>
                        <Image src={item.url} className='object-cover w-full rounded-md' alt="" width={1000} height={1000} />
                    </div>
                    <div className='flex justify-between w-full col-span-8 md:col-span-7'>
                        <div className='flex flex-col gap-1 md:gap-5'>
                            <h3 className='text-sm font-medium text-black sm:text-xl'>{item.name}</h3>
                            <h3 className='text-xs font-normal sm:text-base text-zinc-600'>{item.shortDesc}</h3>
                            <div className='flex flex-col justify-center gap-1 md:gap-5'>
                                <div className='flex gap-1'>
                                    <Image className='w-6 h-6' src='/package/routing-2.png' alt="" height={100} width={100} />
                                    <h3 className='text-xs font-normal sm:text-base text-zinc-600'>{item.fromTo}</h3>
                                </div>
                                <div className='flex items-center gap-1 md:gap-3'>
                                    <div className='flex items-center justify-center gap-1 md:gap-2'>
                                        <Image className='w-6 h-6' src="/package/Buildings 2.png" alt="" height={100} width={100} />
                                        <h3 className='text-xs font-normal sm:text-base text-zinc-600 '>The Bank Hotel</h3>
                                    </div>
                                    <div className='flex items-center justify-center gap-1 md:gap-2'>
                                        <Image className='w-6 h-6' src="/package/plane.png" alt="" height={100} width={100} />
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
                        <Link href={(`/packages/${item.refID}`)}>
                            <button
                                className="h-10 px-4 text-white rounded-md md:w-32 md:p-0 bg-dark-green"
                            // onClick={() => lang ? navigate(`/${lang}/packages/details/${item.refID}`) : navigate(`/packages/details/${item.refID}`)}
                            >
                                {translation?.view_detalis}
                            </button>
                        </Link>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default PackageCard