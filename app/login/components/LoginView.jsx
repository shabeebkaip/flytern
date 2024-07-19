import React, { useState } from 'react'
import { useSnackbar } from 'notistack'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { CircularProgress } from '@mui/material'
import { useSelector } from 'react-redux'
import { regexConstants } from '@/lib/regex'
import { checkApiStatus, getLocalStorageInfo, setGlobalCookie } from '@/lib/utils'
import { userLoginApi } from '../api'
import InputField from '@/app/shared/components/InputField';
import Link from 'next/link';



const LoginView = () => {
  const [data, setData] = useState({ email: '', password: '' })
  const [loader, setLoader] = useState(false)
  const [error, setError] = useState({ email: '', password: '' })
  const { enqueueSnackbar } = useSnackbar()
  const redirectPath = getLocalStorageInfo('redirectPath')

  const [showPassword, setShowPassword] = useState({
    stateOne: false,
    stateTwo: false,
  })
  const updateErrorFields = (key, value) => {
    setError({ ...error, [key]: value })
  }
  const onLogin = () => {
    let validateInput = {
      email: regexConstants.emailRegex.test(data.email) ? '' : 'Please enter valid email address',
      password: data.password ? '' : 'Please enter password',
    }
    if (Object.values(validateInput).every(value => value === "")) {
      setLoader(true)
      userLoginApi(data)
        .then(response => {
          setLoader(false)
          if (checkApiStatus(response)) {
            enqueueSnackbar('Login Successfully', { variant: 'success', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } })
            setGlobalCookie('accessToken', JSON.stringify(response.data.data.accessToken), 1)
            setGlobalCookie('refreshToken', JSON.stringify(response.data.data.refreshToken), 1)
            if (typeof window !== 'undefined') {
              if (redirectPath) {
                window.location.href = redirectPath
                localStorage.removeItem('redirectPath')
              } else {
                window.location.href = '/'
              }
            }

          }
          else if (response.data.statusCode === 100) {
            if (typeof window !== 'undefined') {
              window.location.href = `/otp?${response.data.data.userID}?${response.data.data.otpTo}`
            }
          } else {
            enqueueSnackbar(response.data.errors[0], { variant: 'error', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } })
          }
        })
        .catch(error => {
          setLoader(false)
          enqueueSnackbar('Something went wrong', { variant: 'error', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } })
        })
    } else {
      setError(validateInput)
    }


  }
  const { translation } = useSelector((state) => state.sharedState)
  return (
    <div className='flex flex-col items-center justify-center h-full pt-8 pb-8 bg-white md:items-start md:pb-0 md:pt-0'>
      <div className='container flex flex-col items-center gap-6 px-10 mx-auto md:items-start lg:px-32'>
        <div className="flex flex-col gap-[15px]  md:items-start">
          <h4 className="text-xl font-bold text-black sm:text-2xl ">{translation?.sign_in}</h4>
          <h6 className="text-base font-bold text-black sm:text-lg ">{translation?.welcome_flyturn}</h6>
          <p className="text-stone-500  text-xs sm:text-lg font-normal  leading-[18px]">{translation?.login_head_content}</p>
        </div>
        <div className='w-full xl:max-w-[420px] 2xl:max-w-[450px]' >
          <InputField
            label='Email'
            placeholder={translation?.enter_your_email}
            type="email"
            styles={"border-zinc-100 bg-stone-50 lg:max-w-[450px] w-full "}
            value={data.email}
            onChange={(e) => { setData({ ...data, email: e.target.value }); updateErrorFields('email', "") }}
          />
          {error?.email && <p className="text-xs text-red-500">{error.email}</p>}
        </div>
        <div className='relative w-full xl:max-w-[420px] 2xl:max-w-[450px]'>
          <InputField
            label='Password'
            placeholder={translation?.enter_your_password}
            type={`${showPassword.stateTwo ? "text" : "password"}`}
            styles={"border-zinc-100 bg-stone-50 lg:max-w-[450px] w-full"}
            value={data.password}
            onChange={(e) => { setData({ ...data, password: e.target.value }); updateErrorFields('password', "") }}
          />
          <RemoveRedEyeIcon
            className='absolute z-40 top-[12px] right-4  text-slate-500'
            onClick={() => setShowPassword({ ...showPassword, stateTwo: !showPassword.stateTwo })}
          />
          {showPassword.stateTwo && <VisibilityOffIcon
            className='absolute z-40 top-[12px] right-4  text-slate-500'
            onClick={() => setShowPassword({ ...showPassword, stateTwo: !showPassword.stateTwo })}
          />}
          {error?.password && <p className="text-xs text-red-500">{error.password}</p>}
        </div>

        <div onClick={() => { if (typeof window !== "undefined") { window.location.href = "/forgot-password" } }} class=" text-orange-400 text-xs sm:text-sm font-medium  capitalize">
          {translation?.forgot_password}
        </div>
        <button className='w-full h-12 mt-3 text-base font-medium text-white rounded-md bg-emerald-800  xl:max-w-[420px] 2xl:max-w-[450px]' onClick={onLogin}>
          {loader ? <CircularProgress style={{ color: 'white' }} size={20} /> : translation?.sign_in}
        </button>
        <div className="text-center flex justify-center w-full lg:max-w-[450px] gap-1">
          <span className="text-xs font-normal text-black sm:text-sm ">{translation?.dont_have_account} {" "}</span>
          <span className="text-xs font-normal text-black sm:text-sm ">{" "} </span>
          <div onClick={() => { if (typeof window !== "undefined") { window.location.href = "/register" } }} className="text-xs font-semibold text-orange-400 cursor-pointer sm:text-sm " >{translation?.sign_up}</div>
        </div>
        <div class=" h-[19px]  items-center gap-1.5 lg:inline-flex flex justify-center w-full lg:max-w-[450px]">
          <div class="w-full h-[0px] opacity-10 border border-neutral-400"></div>
          <div class="text-center text-stone-500 text-base font-normal ">{translation?.or}</div>
          <div class="w-full h-[0px] opacity-10 border border-neutral-400"></div>
        </div>
        <div class="text-center flex gap-2 justify-center items-center w-full lg:max-w-[450px]">
          <span className="text-xs font-normal text-black sm:text-sm ">{translation?.continue_as_a} </span>
          <div onClick={() => { if (typeof window !== "undefined") { window.location.href = "/" } }} className="text-xs font-medium text-orange-400 sm:text-sm ">{translation?.guest_user}  </div></div>
      </div>
    </div>
  )
}

export default LoginView