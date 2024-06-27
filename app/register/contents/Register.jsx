import Video from '@/app/shared/components/Video'
import React from 'react'
import RegisterView from '../components/RegisterView'
import { useAppSelector } from '@/lib/hooks'

const Register = () => {
  const { selectedLanguageAndCountry } = useAppSelector(state => state.sharedState)

  return (
    <div className={`${selectedLanguageAndCountry?.language?.code === "ar"  ? 'rtl font-arabic' : 'font-inter'} grid w-full h-screen lg:grid-cols-2`}>
      <Video />
      <RegisterView />
    </div>
  )
}

export default Register