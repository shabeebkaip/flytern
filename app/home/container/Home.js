"use client"
import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import StoreProvider from '@/app/StoreProvider'
import { getExploresApi } from '../api'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import Layout from '@/hoc/Layout'
import SuspenseLoader from '@/app/shared/components/SuspenseLoader'
import { useDispatch, useSelector } from 'react-redux'
import { exploresRequest } from '@/lib/slices/exploreSlice'


const SubHeader = dynamic(() => import('@/app/home/components/SubHeader'))
const Hero = dynamic(() => import('@/app/home/components/Hero'))
const Recommended = dynamic(() => import('@/app/home/components/Recommended'))
const TravelStories = dynamic(() => import('@/app/home/components/TravelStories'))
const PopularDestination = dynamic(() => import('@/app/home/components/PopularDestination'))

const HomeChild = () => {
  const location = typeof window !== "undefined" ? window.location?.pathname : '';
  const { selectedLanguageAndCountry } = useAppSelector((state) => state.sharedState);
  const { data, loading } = useAppSelector((state) => state.exploreState);
  const dispatch = useDispatch();
  const flightBgUrl = data?.bgGrounds?.length && data?.bgGrounds[0]['flightBgURL']
  const hotelBgUrl = data?.bgGrounds?.length && data?.bgGrounds[0]['hotelBgURL']
console.log(data,"data")
console.log(loading,"loading")

useEffect(() => {
  window.scrollTo(0, 0);
  dispatch(exploresRequest());
}, []);

  return (
    <div className={` ${selectedLanguageAndCountry?.language?.code === "ar" || location.includes("/ar") ? 'rtl font-arabic' : 'font-inter'}`}>
      <SubHeader />
      {
        loading ? <SuspenseLoader /> :
          <>
            <Hero backgroundImage={['/', '/ar', '/ar/flights', '/flights'].includes(location) ? flightBgUrl : hotelBgUrl} />
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
const Home = () => {
  return (
    <StoreProvider>
      <HomeChild />
    </StoreProvider>
  )
}

export default Home