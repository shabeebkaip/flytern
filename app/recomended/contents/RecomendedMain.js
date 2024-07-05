import React, { useEffect } from 'react'
import Recomended from '../components/Recomended'
import { useDispatch, useSelector } from 'react-redux'
import SideBar from '@/app/shared/components/SideBar'
import { generalSidebarData } from '@/lib/constants'
import { getRecomendedApi } from '../api'
import Link from 'next/link'

const RecomendedMain = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getRecomendedApi(1))
  }, [dispatch])
  const { selectedLanguageAndCountry } = useSelector(state => state.sharedState)
  const { translation } = useSelector((state) => state.sharedState)
  return (
    <div className={`${selectedLanguageAndCountry?.language?.code === "ar" ? 'rtl font-arabic' : 'font-inter'} mt-12`}>
      <div className='flex gap-1 text-sm font-normal cursor-pointer text-neutral-400'>
        <div onClick={() => { if (typeof window !== undefined) { window.location.href = "/" } }}><h3 className='cursor-pointer' >{translation?.home}</h3></div>
        <h3>/</h3>
        <h3 className='font-medium text-black cursor-pointer'>{translation?.recomemded}</h3>
      </div>
      <div className="grid grid-cols-10 gap-8 mt-8 mb-8">
        <div className='hidden col-span-2 lg:block'>
          <SideBar sideBarList={generalSidebarData} />
        </div>
        <div className='col-span-10 lg:col-span-8'>
          <Recomended />
        </div>
      </div>
    </div>
  )
}

export default RecomendedMain