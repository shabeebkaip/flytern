import React, { useEffect } from 'react'
import {  useSelector } from 'react-redux'
import TravelStoriesList from '../components/TravelStoriesList.js'
import { generalSidebarData, profileSidebarData } from '@/lib/constants/index.js'
import { useAppSelector } from '@/lib/hooks.js'
import Link from 'next/link.js'
import SideBar from '@/app/shared/components/SideBar.js'

const TravelStories = () => {
  const { profile } = useSelector(state => state.sharedState)
  const type = "profile"


  const  { translation} = useAppSelector((state) =>  state.sharedState)
  const { selectedLanguageAndCountry } = useSelector(state => state.sharedState)
  return (
    <div className={`${selectedLanguageAndCountry?.language?.code === "ar"  ? 'rtl font-arabic' : 'font-inter'} mt-12 mb-8 `}>

      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-1 text-[10px] sm:text-sm font-normal text-neutral-400'>
          <div onClick={() => window.location.href = "/"}><h3 className='cursor-pointer'  >{translation?.home}</h3></div>
          <h3>/</h3>
          <h3 className='font-medium text-black'>{type === "general" ? '' : 'My'} {translation?.travel_stories}</h3>
        </div>
        <div className=''>
          {
            profile && Object.keys(profile).length ?
              <button className='text-orange-400 text-[11px] sm:text-[13px] font-medium  px-2.5 bg-white rounded-[5px] border border-orange-400 justify-center items-center h-10 sm:w-40'><div onClick={() => window.location.href = "/profile/travel-stories/add-testimonial"} >{translation?.add_testmonial}</div></button>
              : null
          }
        </div>
      </div>
      <div className="grid grid-cols-10 gap-8 mt-8">
        <div className='hidden col-span-2 lg:block '>
          <SideBar sideBarList={type === "general" ? generalSidebarData : profileSidebarData} />
        </div>
        <div className='col-span-10 lg:col-span-8'>
          <TravelStoriesList type={type} />
        </div>
      </div>
    </div>
  )
}

export default TravelStories