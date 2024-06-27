import Video from '@/app/shared/components/Video'
import React from 'react'
import LoginView from '../components/LoginView'
import { useAppSelector } from '@/lib/hooks'

const Login = () => {
  const { selectedLanguageAndCountry } = useAppSelector(state => state.sharedState)

  return (
    <div  className={` ${selectedLanguageAndCountry?.language?.code === "ar"  ? 'rtl font-arabic' : 'font-inter'} grid w-full h-screen lg:grid-cols-2`} >
      <Video  />
      <LoginView />
    </div>
  )
}

export default Login