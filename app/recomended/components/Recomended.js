import React from 'react'
import { useSelector } from 'react-redux'
import TitleCard from '@/app/shared/components/TitleCard'
import Image from 'next/image'
import Link from 'next/link'
const Recomended = ({ data }) => {
    const { recomended: { records = [] } } = useSelector(state => state.generalState)

    const { translation } = useSelector((state) => state.sharedState)
    return (
        <>
            <TitleCard
                title={
                    <div className='flex items-center justify-between'>
                        <h4 className='text-xs sm:text-lg'>{translation?.recommended_for_you}</h4>
                    </div>
                }
            >
                <div
                    className='grid grid-cols-3 gap-8 mt-5 cursor-pointer'
                >
                    {records.map((data, index) => (
                        <div onClick={() => { window.location.href = `/packages/${data.refID}` }} key={index} >
                            <div key={index} >
                                <div className="inline-flex flex-col items-start justify-start w-full gap-4">
                                    <Image className="w-full rounded-md" src={data.url} alt='' width={100} height={100} />
                                    <div className="flex flex-col self-stretch sm:flex-row sm:items-center sm:justify-between">
                                        <div className="text-black text-[8px] sm:text-sm font-medium ">{data.name}</div>
                                        <div className="justify-start items-center gap-[3px] flex">
                                            <div className="text-black text-[7px] sm:text-sm font-medium  flex items-center gap-1">
                                                <Image className='w-3 h-3 sm:h-6 sm:w-6' src="/icons/star.svg" alt="" width={100} height={100} />
                                                <span className='text-[7px] sm:text-sm'>{data.ratings}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </TitleCard>
        </>
    )
}

export default Recomended