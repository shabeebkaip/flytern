"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { useAppSelector } from '@/lib/hooks';
import InputField from '@/app/shared/components/InputField';
import { CustomTextField } from '@/app/shared/components/CustomTextField';
import { TextField } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { updatePasswordApi } from '@/app/profile/change-password/api';


const ResetView = () => {

  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState({
    stateOne: false,
    stateTwo: false,
    stateThree: false
  })
  const [data, setData] = useState({
    oldPassword: '',
    newPassword: '',
    reEnteredPassword: ''
  })
  const [error, seterror] = useState({
    fieldBlank: "",
    doesntMatch: "",
    repeatingPassword: "",
  })
  const noError = {
    fieldBlank: "",
    doesntMatch: "",
    repeatingPassword: "",
  }

  useEffect(() => {

  }, [data])
  const changePassword = async () => {
    if (data.newPassword.trim() === data.oldPassword.trim()) {
        seterror({
            ...error,
            repeatingPassword: "New password should not be the same as the old one"
        });
    } else if (data.newPassword.trim() !== data.reEnteredPassword.trim()) {
        seterror({
            ...error,
            doesntMatch: "Passwords should match"
        });
    } else if (!error.doesntMatch && !error.repeatingPassword && !error.fieldBlank) {
        const status = await updatePasswordApi(data);
        if (status === true) {
            enqueueSnackbar('Password changed successfully', {
                variant: 'success',
                autoHideDuration: 2000,
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
            });
            setTimeout(() => {
                window.location.href = '/login'; 
            }, 2000);
        }
    }
}

  const { selectedLanguageAndCountry } = useAppSelector(state => state.sharedState)
  const { translation } = useAppSelector((state) => state.sharedState)

  return (
    <SnackbarProvider>
      <div className='flex flex-col items-center justify-center h-full bg-white lg:items-start'>
        <div className='container flex flex-col gap-6 px-10 mx-auto md:px-32' >
          <div className='flex gap-3 item-center'>
            <div onClick={() => { if (typeof window !== "undefined") { window.location.href = "/login" } }}><Image src="/arrow-left.svg" alt="" className='duration-300 ease-in cursor-po hover:scale-105 w-7' width={100} height={100} /></div>
            <h4 class="text-black text-lg sm:text-2xl font-bold">{translation?.reset_password}</h4>
          </div>
          <p class="w-full lg:w-[350px] text-stone-500 text-xs sm:text-sm font-normal leading-[200%]">{translation?.reset_content}</p>
          <div className="grid grid-cols-10 mt-8">
            <div className='flex flex-col col-span-10 gap-2 sm:col-span-6'>

              <label>{selectedLanguageAndCountry?.language?.code === "ar" ? "كلمة المرور الجديدة" : "New password"}</label>
              <div className="relative">
                <InputField styles={'w-full '} type={`${showPassword.stateTwo ? "text" : "password"}`} placeholder={translation?.enter_new_password} value={data.newPassword} onChange={(e) => { seterror({ ...noError }); setData({ ...data, newPassword: e.target.value }) }} />
                {error.repeatingPassword && <p className='text-red-500 cursor-pointer'> {error.repeatingPassword}</p>}
                <RemoveRedEyeIcon
                  className={`absolute z-40 top-[12px] ${selectedLanguageAndCountry?.language?.code === "ar" ? 'left-4' : 'right-4'} text-slate-500`}
                  onClick={() => setShowPassword({ ...showPassword, stateTwo: !showPassword.stateTwo })}
                />
                {showPassword.stateTwo && <VisibilityOffIcon
                  className={`absolute z-40 top-[12px] ${selectedLanguageAndCountry?.language?.code === "ar" ? 'left-4' : 'right-4'} text-slate-500`}
                  onClick={() => setShowPassword({ ...showPassword, stateTwo: !showPassword.stateTwo })}
                />}
              </div>
              <label>{translation?.re_enter_new_password}</label>
              <div className="relative">
                <InputField styles={'w-full'} type={`${showPassword.stateThree ? "text" : "password"}`} placeholder={translation?.re_enter_new_password} value={data.reEnteredPassword} onChange={(e) => { seterror({ ...noError }); setData({ ...data, reEnteredPassword: e.target.value }) }} />
                {error.doesntMatch && <p className='text-red-500 cursor-pointer'> {error.doesntMatch}</p>}
                {error.fieldBlank && <p className='text-red-500 cursor-pointer'> {error.fieldBlank}</p>}
                <RemoveRedEyeIcon
                  className={`absolute z-40 top-[12px] ${selectedLanguageAndCountry?.language?.code === "ar" ? 'left-4' : 'right-4'} text-slate-500`}
                  onClick={() => setShowPassword({ ...showPassword, stateThree: !showPassword.stateThree })}
                />
                {showPassword.stateThree && <VisibilityOffIcon
                  className={`absolute z-40 top-[12px] ${selectedLanguageAndCountry?.language?.code === "ar" ? 'left-4' : 'right-4'} text-slate-500`}
                  onClick={() => setShowPassword({ ...showPassword, stateThree: !showPassword.stateThree })}
                />}
              </div>
              <div onClick={changePassword}><button class="w-full  h-12 mt-3 text-base font-medium text-white rounded-md bg-emerald-800 " >{translation?.reset_password}</button></div>


            </div>
          </div>
        </div>
      </div>
    </SnackbarProvider>
  )
}

export default ResetView