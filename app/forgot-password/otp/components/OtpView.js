import React, { useRef, useState } from 'react'
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkApiStatus } from '@/lib/utils';
import Image from 'next/image';
import { resendOTPApi, userVerifyOtpApi } from '@/app/otp/api';
// import { resendOTPApi, userVerifyOtpApi } from '../api';

const OtpView = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(120);
  const { enqueueSnackbar } = useSnackbar()
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)]
  let str;
  if (typeof window !== 'undefined') {
    str = window.location.search.split('?')[1];
  } let modifiedStr = str

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer > 0 && prevTimer - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleInput = (e, index) => {
    setOtp([...otp.map((d, idx) => (idx === index ? e.target.value : d))]);
    const value = e.target.value;
    if (value.length === 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  }

  const onOtpVerify = () => {
    const otpValue = otp.join('')
    userVerifyOtpApi({ otp: otpValue, userID: modifiedStr })
      .then(response => {
        if (checkApiStatus(response)) {
          enqueueSnackbar('OTP Verified Successfully', { variant: 'success', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } })
          setTimeout(() => {
            if (typeof window !== 'undefined') {
              window.location.href = '/reset-password'
            }
          }, 1000)
        } else {
          enqueueSnackbar(response.data.data, { variant: "error", autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } })
        }
      })
  }
  const resendOtp = () => {
    resendOTPApi({ userID: modifiedStr })
      .then(response => {
        if (checkApiStatus(response)) {
          enqueueSnackbar('OTP Sent Successfully', { variant: 'success', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } })
          setTimer(120)
        } else {
          enqueueSnackbar(response.data?.errors?.[0], { variant: "error", autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } })
        }
      })
  }
  const { translation } = useSelector((state) => state.sharedState)
  return (
    <div className='flex flex-col items-start justify-center w-screen h-full bg-white lg:items-start sm:items-center lg:w-full'>
      <div className='container flex flex-col gap-6 px-5 mx-auto md:px-32 sm:px-20' >
        <div className='flex gap-3 item-center'>
          <Image src="/arrow-left.svg" alt="" onClick={() => {
            if (typeof window !== 'undefined') {
              window.location.href = '/login'
            }
          }}
            className='duration-300 ease-in cursor-pointer hover:scale-105 w-7' width={100} height={100} />
          <h4 class="text-black text-2xl font-bold ">{translation?.otp_verification}</h4>
        </div>
        <p>Please enter the OTP you received to {typeof window !== 'undefined' ? window.location.search.split('?')[2] : ''}</p>
        <div class="flex flex-row items-center justify-between  w-full lg:max-w-sm gap-3 ">
          {
            inputRefs.map((inputRef, index) => (
              <div class="sm:w-16 sm:h-16 h-10 w-10" key={index}>
                <input
                  ref={inputRef}
                  class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                  type="text"
                  name=""
                  id=""
                  maxLength={1}
                  // onKeyDown={(e) => handleInput(e, index)}
                  onChange={(e) => handleInput(e, index)}
                  autoFocus={index === 0}
                />
              </div>
            ))
          }
        </div>
        <div className='text-center lg:max-w-sm'>
          {
            timer <= 0 && <p>{`Didn't receive the OTP?`}<span className='text-orange-400 cursor-pointer' onClick={resendOtp}>Resend</span></p>
          }
          {
            timer > 0 && <p>Expires in <span className='text-orange-400' >{timer}</span>  seconds</p>
          }
        </div>
        <button class="w-full lg:max-w-sm h-12 mt-3 text-base font-medium text-white rounded-md bg-emerald-800" onClick={onOtpVerify}>{translation?.verify}</button>
      </div>
    </div>
  )
}

export default OtpView