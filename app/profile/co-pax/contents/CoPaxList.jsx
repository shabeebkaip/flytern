import React, { useEffect } from 'react'
import CoPax from '../components/CoPax'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { getCoPaxApi } from '../../api'

const CoPaxList = () => {
    const dispatch = useAppDispatch()
    const { selectedLanguageAndCountry } = useAppSelector(state => state.sharedState)


    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.scrollTo(0, 0); 
            dispatch(getCoPaxApi)
        }
    }, [dispatch])

    const { translation } = useAppSelector((state) => state.sharedState)
    return (
        <div className={`${selectedLanguageAndCountry?.language?.code === "ar"  ? 'rtl font-arabic' : 'font-inter'} mt-12`}>
            <div className="flex items-center justify-between">
                <div className='flex text-neutral-400 text-[10px] sm:text-[13px] font-normal gap-1'>
                    <h3 className='cursor-pointer' onClick={() => typeof window !== 'undefined' && (window.location.href = '/')}>{translation?.home}</h3>
                    <h3>/</h3>
                    <h3 className='cursor-pointer' onClick={() => typeof window !== 'undefined' && (window.location.href = '/profile')}>{translation?.my_profile}</h3>
                    <h3>/</h3>
                    <h3 className=' text-black sm:text-[13px] font-medium  cursor-pointer'>{translation?.copax}</h3>
                </div>
                <div>
                    <button className='sm:w-40 sm:h-10 p-3 sm:p-0 px-2.5 bg-white rounded-sm border border-orange-400 text-orange-400 text-sm  font-medium ' onClick={() =>typeof window !== 'undefined' && (window.location.href = '/profile/co-pax/add')} >{translation?.add_copax}</button>
                </div>
            </div>
            <div className='container px-4 pb-4 mx-auto mt-8 mb-10 overflow-hidden bg-white rounded-md'>
                <CoPax />
            </div>

        </div>
    )
}

export default CoPaxList