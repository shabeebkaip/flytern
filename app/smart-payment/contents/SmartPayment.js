import React, { useEffect } from 'react'
import SmartPaymentForm from '../components/SmartPaymentForm'
import { useSelector } from 'react-redux'
import SideBar from '@/app/shared/components/SideBar.js'
import { arabic_translation, generalSidebarData } from '@/lib/constants'
import { useAppSelector } from '@/lib/hooks'




const SmartPayment = ({ type }) => {
  const { selectedLanguageAndCountry } = useAppSelector(state => state.sharedState)
  return (
    <div className={`${selectedLanguageAndCountry?.language?.code === "ar"  ? 'rtl font-arabic' : 'font-inter'} mt-12`}>
      <div className='flex gap-1 mt-1 text-sm font-normal text-neutral-400'>
        <h3  className='cursor-pointer' onClick={()=>navigate('/')}>{selectedLanguageAndCountry?.language?.code === "ar" ? arabic_translation.home:'Home'}</h3>
        <h3>/</h3>
        <h3 className='font-medium text-black cursor-pointer'>{selectedLanguageAndCountry?.language?.code === "ar" ? arabic_translation.smart_payment:'Smart Payment'}</h3>
      </div>
      <div className="grid grid-cols-10 gap-8 mt-8 mb-8">
        <div className='hidden col-span-2 lg:block'>
          <SideBar sideBarList={generalSidebarData} />
        </div>
        <div className='col-span-10 lg:col-span-8'>
          <SmartPaymentForm/>
        </div>
      </div>
    </div>
  )
}

export default SmartPayment