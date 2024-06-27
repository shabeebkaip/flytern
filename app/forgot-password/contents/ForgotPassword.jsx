import Video from '@/app/shared/components/Video'
import React from 'react'
import ForgotPasswordView from '../components/ForgotPasswordView'
import { useAppSelector } from '@/lib/hooks'

const ForgotPassword = () => {
  const { selectedLanguageAndCountry } = useAppSelector(state => state.sharedState)

  
  return (
    <div   className={` ${selectedLanguageAndCountry?.language?.code === "ar"  ? 'rtl font-arabic' : 'font-inter'} grid w-full h-screen lg:grid-cols-2`}>
      <Video />
      <ForgotPasswordView />
    </div>

  )
}

export default ForgotPassword