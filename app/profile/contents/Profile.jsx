"use client"
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SuspenseLoader from '@/app/shared/components/SuspenseLoader'
import ProfileDetails from '../Components/ProfileDetails'
import BasicInformation from '../Components/BasicInformation'
import CoPax from '../Components/CoPax'
import TitleCard from '@/app/shared/components/TitleCard'
import Link from 'next/link'
import { getCoPaxApi, getProfileDetailApi } from '../api'
import { useAppSelector } from '@/lib/hooks'

const Profile = () => {
  const dispatch = useDispatch()
  const { loading, profile } = useAppSelector(state => state.profileState)
  const { selectedLanguageAndCountry } = useSelector(state => state.sharedState)


  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
      dispatch(getProfileDetailApi)
      dispatch(getCoPaxApi)
    }
  }, [dispatch])
  const { translation } = useAppSelector((state) => state.sharedState)
  return (
    <div className={`${selectedLanguageAndCountry?.language?.code === "ar"  ? 'rtl font-arabic' : 'font-inter'} `}>
      {loading ?
        <SuspenseLoader /> :
        (profile && Object.keys(profile).length) ?
          <>
            <div className="flex mt-[50px] gap-1">
              <h3 className='text-sm font-normal cursor-pointer text-neutral-400' onClick={() => navigate('/')}>{translation?.home}</h3>
              <h3 className='text-sm font-normal text-neutral-400 '>/</h3>
              <h3 className='text-sm font-medium text-black cursor-pointer' >{translation?.my_profile}</h3>
            </div>
            <div className='overflow-hidden bg-white rounded-md mt-[30px] mb-10 container mx-auto p-4'>
              <ProfileDetails />
              <BasicInformation />
              <CoPax />
            </div>
          </> :
          <div>
            <div className="grid grid-cols-10 gap-8 mt-8 mb-8">
              <div className='flex flex-col col-span-10 gap-5 lg:col-span-8'>
                <TitleCard >
                  <h1
                    className='pb-5 text-lg font-medium text-center'>
                    {translation?.login_head_content}
                  </h1>
                  <div className='flex gap-4'>
                    <div onClick={() => window.location.href = "/login"}>
                      <button className='text-center text-white text-base font-normal px-2 py-1.5 bg-orange-400 rounded-md justify-center items-center h-12 w-full' >
                        {translation?.sign_in}
                      </button>
                    </div>
                    <div onClick={() => window.location.href = "/register"}>
                      <button className='text-center text-white text-normal font-medium px-2 py-1.5 bg-emerald-800 rounded-md justify-center items-center h-12 w-full' >
                        {translation?.create_account}
                      </button>
                    </div>
                  </div>

                </TitleCard>
              </div>
            </div>
          </div>
      }

    </div>
  )
}

export default Profile