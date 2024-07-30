"use client"
import Video from '@/app/shared/components/Video'
import React from 'react'
import OtpView from '../components/OtpView'
import { SnackbarProvider } from 'notistack'
import { useSelector } from 'react-redux'

const Otp = () => {
  const { selectedLanguageAndCountry } = useSelector(state => state.sharedState)

  return (
    <SnackbarProvider>
      <div  className={` ${selectedLanguageAndCountry?.language?.code === "ar"  ? 'rtl font-arabic' : 'font-inter'} grid w-full h-screen lg:grid-cols-2`}>
        <Video />
        <OtpView />
      </div>
    </SnackbarProvider>

  )
}

export default Otp