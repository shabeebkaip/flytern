import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { generalSidebarData } from '@/lib/constants'
import SideBar from '@/app/shared/components/SideBar'
import HelpCenterFor from '../components/HelpCenterFor'

const HelpCenter = () => {
    const { selectedLanguageAndCountry } = useSelector(state => state.sharedState)
    const { translation } = useSelector((state) => state.sharedState)
    return (
        <div className={` ${selectedLanguageAndCountry?.language?.code === "ar" ? 'rtl font-arabic' : 'font-inter'} mt-12 px-3 md:px-0 mb-20 `}>
            <div className='flex gap-1 text-sm font-normal cursor-pointer text-neutral-400'>
                <div onClick={() => { if (typeof window !== "undefined") { window.location.href = "/" } }}><h3 className='cursor-pointer' >{translation?.home}</h3></div>
                <h3>/</h3>
                <h3 className='font-medium text-black cursor-pointer'>{translation?.help_center}</h3>
            </div>
            <div className="grid grid-cols-10 gap-8 mt-8 mb-8">
                <div className='hidden col-span-2 lg:block'>
                    <SideBar sideBarList={generalSidebarData} />
                </div>
                <div className='col-span-10 lg:col-span-8'>
                    <HelpCenterFor />
                </div>
            </div>
        </div>
    )
}

export default HelpCenter