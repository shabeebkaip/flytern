import React from 'react'
import AddEditCoPax from '../components/AddEditCoPax'
import { useAppSelector } from '@/lib/hooks'

const AddCoPax = () => {
    const { selectedLanguageAndCountry } = useAppSelector(state => state.sharedState)
    const { translation } = useAppSelector((state) => state.sharedState)
    return (
        <div className={`${selectedLanguageAndCountry?.language?.code === "ar"  ? 'rtl font-arabic' : 'font-inter'} mt-12`}>
            <div className='flex text-neutral-400 text-[10px] sm:text-[13px] font-normal gap-1'>
                <h3 className='cursor-pointer' onClick={()=>typeof window !== 'undefined' && (window.location.href='/')}>{translation?.home}</h3>
                <h3>/</h3>
                <h3 className='cursor-pointer' onClick={()=>typeof window !== 'undefined' && (window.location.href='/profile')}>{translation?.my_profile}</h3>
                <h3>/</h3>
                <h3 className='cursor-pointer' onClick={()=>typeof window !== 'undefined' && (window.location.href='/profile/co-pax')}>{translation?.copax}</h3>
                <h3>/</h3>
                <h3 className=' text-black text-[10px] sm:text-[13px] font-medium ' onClick={() => typeof window !== 'undefined' && (window.location.href='/profile/co-pax/add')} >{translation?.add_copax}</h3>
            </div>
            <div className='overflow-hidden bg-white rounded-md mt-[30px] mb-10 container mx-auto p-4 grid grid-cols-10'>
                <div className='col-span-10 sm:col-span-9 '>
                    <AddEditCoPax/>
                </div>

            </div>
        </div>
    )
}

export default AddCoPax