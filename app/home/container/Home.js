"use client"
import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import Layout from '@/hoc/Layout'
import SuspenseLoader from '@/app/shared/components/SuspenseLoader'
import StoreProvider from '@/app/StoreProvider'
import { useAppSelector } from '@/lib/hooks'
import { useDispatch } from 'react-redux'
import { exploresSuccess } from '@/lib/slices/exploreSlice'
import { getGlobalCookie } from '@/lib/utils'

const SubHeader = dynamic(() => import('@/app/home/components/SubHeader'))
const Hero = dynamic(() => import('@/app/home/components/Hero'))
const Recommended = dynamic(() => import('@/app/home/components/Recommended'))
const TravelStories = dynamic(() => import('@/app/home/components/TravelStories'))
const PopularDestination = dynamic(() => import('@/app/home/components/PopularDestination'))

const HomeChild = ({ service, data }) => {
  const location = typeof window !== "undefined" ? window.location?.pathname : '';
  const { selectedLanguageAndCountry } = useAppSelector((state) => state.sharedState);
  const { loading } = useAppSelector((state) => state.exploreState);
  const dispatch = useDispatch();
  const flightBgUrl = data?.bgGrounds?.length && data?.bgGrounds[0]['flightBgURL']
  const hotelBgUrl = data?.bgGrounds?.length && data?.bgGrounds[0]['hotelBgURL']
  useEffect(() => {
    if (data) {
      dispatch(exploresSuccess(data))
    }
  }, [data, dispatch]);
  return (
    <div className={` ${selectedLanguageAndCountry?.language?.code === "ar" || location.includes("/ar") ? 'rtl font-arabic' : 'font-inter'}`}>
      <SubHeader />
      {
        loading ? <SuspenseLoader /> :
          <>
            <Hero backgroundImage={service === "flight" ? flightBgUrl : hotelBgUrl} service={service} />
            <Layout>
              <div className='flex flex-col gap-5 my-5 ' >
                <Recommended />
                <PopularDestination />
                <TravelStories />
              </div>
            </Layout>
          </>
      }

    </div>
  )
}
const Home = ({ service, data }) => {
  const loading = getGlobalCookie('loading')
  return (
    <StoreProvider>
      {loading ?
        <SuspenseLoader /> :
        <HomeChild service={service} data={data} />
      }
    </StoreProvider>
  )
}

export default Home