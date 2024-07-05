import React, { useState } from 'react'
import { useSnackbar } from 'notistack';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Autocomplete, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import InputField from '@/app/shared/components/InputField';
import { checkApiStatus } from '@/lib/utils';
import Image from 'next/image';
import { userSignUpApi } from '../api';
import { regexConstants } from '@/lib/regex';
import { CustomTextField } from '@/app/shared/components/CustomTextField';
import Link from 'next/link';

const RegisterView = () => {
  const [data, setData] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    Password: '',
    PhoneNumber: '',
    CountryCode: '+965',
    File: null
  })
  const [loader, setLoader] = useState(false)
  const [errors, setErrors] = useState({})
  const updateErrorFields = (field, value) => {
    setErrors({
      ...errors,
      [field]: value
    })
  }

  const [showPassword, setShowPassword] = useState({
    stateOne: false,
    stateTwo: false,
  })

  const { enqueueSnackbar } = useSnackbar()
  const [previewImages, setPreviewImages] = useState({ File: null })
  const { initailInfo: { mobileCountryList = {} } } = useSelector(state => state.generalState)

  const onFieldChange = (field, value) => {
    setData({
      ...data,
      [field]: field === 'File' ? value[0] : value
    })
    if (field === 'File') {
      const file = value[0]
      if (file) {
        const previewURL = URL.createObjectURL(file)
        setPreviewImages(prev => ({ ...prev, [field]: previewURL }))
      }
    }
  }

  const onSave = () => {
    let payload = new FormData()
    payload.append('FirstName', data.FirstName)
    payload.append('LastName', data.LastName)
    payload.append('Email', data.Email)
    payload.append('Password', data.Password)
    payload.append('PhoneNumber', data.PhoneNumber)
    payload.append('CountryCode', data.CountryCode)
    payload.append('File', data.File)
    let validateInput = {
      firstName: data.FirstName.length ? "" : "First Name is required",
      lastName: data.LastName.length ? "" : "Last Name is required",
      email: regexConstants.emailRegex.test(data?.Email) ? "" : "Enter a valid E-mail ",
      password: data.Password.length >= 6 ? "" : "Password must consist of minimum 6 characters.",
      phoneNumber: data.PhoneNumber ? "" : "Enter a valid phone number",
      passwordDoesntMatch: data.Password === data.ConfirmPassword ? "" : "Passwords should match",
    }
    if (Object.values(validateInput).every(value => value === "")) {
      setLoader(true)
      userSignUpApi(payload)
        .then(response => {
          setLoader(false)
          if (checkApiStatus(response)) {
            enqueueSnackbar('Account Created Successfully', { variant: 'success', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } })
            if (typeof window !== 'undefined') {
            window.location.href='/login'
            }
          }
          else if (response.data.statusCode === 100) {
            enqueueSnackbar("OTP Verification Required", { variant: 'error', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } })
            if (typeof window !== 'undefined') {
            window.location.href = `/otp?${response.data.data.userID}?${response.data.data.otpTo}`
            }
          }
          else {
            response?.data?.errors?.map((data) => enqueueSnackbar(`${data}`, { variant: 'error', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } }));
          }
        })
    } else {
      setErrors(validateInput)
    }
  }
  const { translation } = useSelector((state) => state.sharedState)
  return (
    <div className='flex flex-col items-center h-full py-20 bg-white lg:items-start lg:py-0 lg:justify-center '>
      <div className='container flex flex-col gap-6 px-10 mx-auto md:px-32 '>
        <h4 className="text-2xl font-bold text-black">{translation?.create_an_account}</h4>
        <p className="text-stone-500 text-sm font-normal leading-[200%] max-w-[350px] 2xl:max-w-[450px]">{translation?.join_as}

        </p>
        <div className='relative w-20 h-20 border border-dotted rounded-full bg-[#f8f8f8] cursor-pointer '>
          {
            previewImages.File ?
              <Image src={previewImages.File} alt="" className="object-cover w-full h-full rounded-full"  width={100} height={100}/> :
              <Image src="/Camera_duotone_line.svg" alt="" className="absolute w-10 h-10 mt-3 top-[5px] left-[18px]" width={100} height={100} />
          }
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={(e) => { onFieldChange('File', e.target.files) }}
          />
        </div>
        <div class=" text-gray-500 text-sm font-normal  relative">{translation?.upload_photo}
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={(e) => { onFieldChange('File', e.target.files) }}
          />
        </div>
        <div className='grid sm:grid-cols-2 w-full lg:max-w-[350px] gap-2 2xl:max-w-[450px]'>
          <div>
            <InputField
              label=''
              placeholder={translation?.enter_first_name}
              type="text"
              styles={"border-zinc-100 bg-stone-50 w-full lg:max-w-[350px] 2xl:max-w-[450px] "}
              value={data.FirstName}
              onChange={(e) => { updateErrorFields('firstName', ""); onFieldChange('FirstName', e.target.value) }}
            />
            {errors.firstName && <p className='text-xs mt-2 lg:max-w-[350px] 2xl:max-w-[450px] w-full text-red-600'>{errors?.firstName}</p>}
          </div>
          <div>
            <InputField
              label=''
              placeholder={translation?.enter_last_name}
              type="text"
              styles={"border-zinc-100 bg-stone-50 w-full lg:max-w-[350px] 2xl:max-w-[450px] "}
              value={data.LastName}
              onChange={(e) => { updateErrorFields('lastName', ""); onFieldChange('LastName', e.target.value) }}
            />
            {errors.lastName && <p className='text-xs mt-2 lg:max-w-[350px] 2xl:max-w-[450px] w-full text-red-600'>{errors?.lastName}</p>}
          </div>
        </div>
        <div >
          <InputField
            label=''
            placeholder={translation?.enter_your_email}
            type="email"
            styles={"border-zinc-100 bg-stone-50 w-full lg:max-w-[350px] 2xl:max-w-[450px] "}
            value={data.Email}
            onChange={(e) => { updateErrorFields('email', ""); onFieldChange('Email', e.target.value) }}
          />
          {errors.email && <p className='text-xs mt-2 lg:max-w-[350px] 2xl:max-w-[450px] w-full text-red-600'>{errors?.email}</p>}
        </div>

        <div className="relative w-full  lg:max-w-[350px] 2xl:max-w-[450px]">
          <InputField
            label='Password'
            placeholder={translation?.enter_your_password}
            type={`${showPassword.stateTwo ? "text" : "password"}`}
            styles={"border-zinc-100 bg-stone-50 w-full  lg:max-w-[350px] 2xl:max-w-[450px] "}
            value={data.Password}
            onChange={(e) => { updateErrorFields('password', ""); onFieldChange('Password', e.target.value) }}
          />
          <RemoveRedEyeIcon
            className='absolute z-40 top-[12px] right-4 text-slate-500'
            onClick={() => setShowPassword({ ...showPassword, stateTwo: !showPassword.stateTwo })}
          />
          {showPassword.stateTwo && <VisibilityOffIcon
            className='absolute z-40 top-[12px] right-4 text-slate-500'
            onClick={() => setShowPassword({ ...showPassword, stateTwo: !showPassword.stateTwo })}
          />}
        </div>
        {errors.password && <p className='text-xs lg:max-w-[350px] 2xl:max-w-[450px] w-full text-red-600'>{errors?.password}</p>}
        <div className="relative w-full lg:max-w-[350px] 2xl:max-w-[450px]">
          <InputField
            label='Password'
            placeholder={translation?.confirm_password}
            type={`${showPassword.stateOne ? "text" : "password"}`}
            styles={"border-zinc-100 bg-stone-50 w-full lg:max-w-[350px] 2xl:max-w-[450px] "}
            value={data.ConfirmPassword}
            onChange={(e) => { updateErrorFields('passwordDoesntMatch', ""); onFieldChange('ConfirmPassword', e.target.value) }}
          />
          <RemoveRedEyeIcon
            onClick={() => setShowPassword({ ...showPassword, stateOne: !showPassword.stateOne })}
            className='absolute z-40 top-[12px] right-4 text-slate-500'

          />
          {showPassword.stateOne && <VisibilityOffIcon
            className='absolute z-40 top-[12px] right-4 text-slate-500'
            onClick={() => setShowPassword({ ...showPassword, stateOne: !showPassword.stateOne })}
          />}
          {errors.passwordDoesntMatch && <p className='text-xs mt-2 lg:max-w-[350px] 2xl:max-w-[450px] w-full text-red-600'>{errors?.passwordDoesntMatch}</p>}
        </div>
        <div className='grid grid-cols-5 gap-2 w-full lg:max-w-[350px] 2xl:max-w-[450px] '>
          <div className='col-span-2 '>
            {
              mobileCountryList?.length ?
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={mobileCountryList}
                  getOptionLabel={(option) => option?.code}
                  value={mobileCountryList?.find(item => item?.code === data?.CountryCode) || null}
                  clearIcon={null}
                  onChange={(event, newValue) => {
                    const selectedCountryCode = newValue ? newValue.code : '';
                    setData(prevData => ({
                      ...prevData,
                      CountryCode: selectedCountryCode,
                    }));
                  }}
                  renderInput={(params) => (

                    <CustomTextField
                      {...params}
                      label={translation?.country_code}
                      className=' bg-stone-50'
                      fullWidth
                      InputLabelProps={{ shrink: true }}

                    />
                  )}
                  className='col-span-3 bg-stone-50'
                /> : null
            }
          </div>
          <div className='col-span-3 '>
            <InputField
              type="text"
              styles={"w-full h-[55px]"}
              placeholder={translation?.enter_phone_number}
              value={data.PhoneNumber}
              onChange={(e) => { updateErrorFields('phoneNumber', ""); onFieldChange('PhoneNumber', e.target.value) }}
            />
            {errors.phoneNumber && <p className='text-xs mt-2  lg:max-w-[350px] 2xl:max-w-[450px] w-full text-red-600'>{errors?.phoneNumber}</p>}
          </div>
        </div>
        <button className='h-12 mt-3 text-base font-medium text-white rounded-md bg-emerald-800  w-full lg:max-w-[350px] 2xl:max-w-[450px] ' onClick={onSave}>{loader ? <CircularProgress style={{ color: 'white' }} /> : translation?.create_an_account} </button>
        <div className="text-center flex justify-center w-full lg:max-w-[450px] gap-1">
          <span className="text-xs font-normal text-black sm:text-sm ">{translation?.already_have} {" "}</span>
          <span className="text-xs font-normal text-black sm:text-sm ">{" "} </span>
          <div onClick={() => window.location.href = "/login"} className="text-xs font-semibold text-orange-400 cursor-pointer sm:text-sm " >{translation?.sign_in}</div>
        </div>
        <div class=" h-[19px]  items-center gap-1.5 lg:inline-flex flex justify-center w-full lg:max-w-[450px]">
          <div class="w-full h-[0px] opacity-10 border border-neutral-400"></div>
          <div class="text-center text-stone-500 text-base font-normal ">{translation?.or}</div>
          <div class="w-full h-[0px] opacity-10 border border-neutral-400"></div>
        </div>
        <div class="text-center flex gap-2 justify-center items-center w-full lg:max-w-[450px]">
          <span className="text-xs font-normal text-black sm:text-sm ">{translation?.continue_as_a} </span>
          <div onClick={() => window.location.href = "/"} className="text-xs font-medium text-orange-400 sm:text-sm ">{translation?.guest_user}</div></div>
      </div>
    </div>
  )
}

export default RegisterView