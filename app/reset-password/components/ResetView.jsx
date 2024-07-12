import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { useAppSelector } from '@/lib/hooks';
import InputField from '@/app/shared/components/InputField';
import { CustomTextField } from '@/app/shared/components/CustomTextField';
import { TextField } from '@mui/material';


const ResetView = () => {
  const { selectedLanguageAndCountry } = useAppSelector(state => state.sharedState)
  const { translation } = useAppSelector((state) => state.sharedState)

  return (
    <div className='flex flex-col items-center justify-center h-full bg-white lg:items-start'>
      <div className='container flex flex-col gap-6 px-10 mx-auto md:px-32' >
        <div className='flex gap-3 item-center'>
          <div onClick={() => { if (typeof window !== "undefined") {window.location.href = "/login"}}}><Image src="/arrow-left.svg" alt="" className='duration-300 ease-in cursor-po hover:scale-105 w-7' width={100} height={100} /></div>
          <h4 class="text-black text-lg sm:text-2xl font-bold">{translation?.reset_password}</h4>
        </div>
        <p class="w-full lg:w-[350px] text-stone-500 text-xs sm:text-sm font-normal leading-[200%]">{translation?.reset_content}</p>
        <TextField label='password' placeholder={translation?.ener_new_password} type="password" styles={"border-zinc-100 bg-stone-50 w-full lg:max-w-[350px] "} />
        <TextField label='password' placeholder={translation?.confirm_new_password} type="password" styles={"border-zinc-100 bg-stone-50 w-full lg:max-w-[350px] "} />
        <div onClick={() => { if (typeof window !== "undefined") {window.location.href = "/login"}}}><button class="w-full lg:max-w-[350px] h-12 mt-3 text-base font-medium text-white rounded-md bg-emerald-800 " >{translation?.reset_password}</button></div>
      </div>
    </div>
  )
}

export default ResetView