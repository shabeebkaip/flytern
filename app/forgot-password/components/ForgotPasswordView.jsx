import React, { useEffect, useState } from 'react';
import { Autocomplete,  TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { CustomTextField } from '@/app/shared/components/CustomTextField';
import Image from 'next/image';
import Link from 'next/link';
import { forgotPasswordApi, getCountriesListApi } from '../api';
import { useAppSelector } from '@/lib/hooks';

const ForgotPasswordView = () => {
  const [country, setCountry] = useState([]);
  const { initailInfo: { mobileCountryList = {} } } = useAppSelector(state => state.generalState)
  const { enqueueSnackbar } = useSnackbar();

  const [data, setData] = useState({
    mobile: '',
    countryCode: '+965',
  });

  useEffect(() => {
    getCountriesListApi(setCountry);
  }, []);


  const onSave = () => {
    forgotPasswordApi(data)
      .then((response) => {
        if (response.data.statusCode === 100) {
          enqueueSnackbar("OTP Verification Required", {
            variant: 'success',
            autoHideDuration: 2000,
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
          });
          if (typeof window !== "undefined") {
            window.location.href = `/otp?${response.data.data.userID}?${response.data.data.otpTo}`;
          }
        }

        else {
          enqueueSnackbar(response.data.errors[0], {
            variant: 'error',
            autoHideDuration: 2000,
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
          });
        }
      });
  };

  const { translation } = useAppSelector((state) => state.sharedState)
  return (
    <div className='flex flex-col items-center justify-center h-full bg-white lg:items-start'>
      <div className='container flex flex-col gap-6 px-10 mx-auto md:px-32' >
        <div className='flex gap-3 item-center'>
          <div onClick={() => { if (typeof window !== "undefined") {window.location.href = "/login"}}}><Image src="/arrow-left.svg" alt=""  className='duration-300 ease-in cursor-pointer hover:scale-105 w-7' width={100} height={100} /></div>
          <h4 class="text-black text-lg sm:text-2xl font-bold ">{translation?.forgot_password}</h4>
        </div>
        <p class="w-full lg:max-w-[450px] text-stone-500 text-xs sm:text-sm font-normal  leading-[200%]">{translation?.forgot_content}</p>
        <div className='grid w-full grid-cols-10 gap-2 '>
          {
            mobileCountryList && mobileCountryList.length ?
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={mobileCountryList}
                getOptionLabel={(option) => ` ${option.code} - ${option.countryName}`}
                value={mobileCountryList?.find(item => item?.code === data?.countryCode) || null}
                onChange={(event, newValue) => {
                  const selectedCountryCode = newValue ? newValue.code : '';
                  setData(prevData => ({
                    ...prevData,
                    countryCode: selectedCountryCode,
                  }));
                }}
                autoComplete='off'
                renderInput={(params) => (

                  <CustomTextField
                    {...params}
                    label={translation?.country_code}
                    className=''
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    autoComplete='off'
                    clearIcon={null}
                  />
                )}
                className='col-span-5 2xl:col-span-4 '
                clearIcon={null}
              /> : null
          }
          <TextField
            label={translation?.mobile}
            className='col-span-5 2xl:col-span-6 '
            onChange={(e) => setData({ ...data, mobile: e.target.value })}
            value={data.mobile}
          />
        </div>
        <button class="lg:max-w-[350px] h-12 mt-3 text-base font-medium text-white rounded-md bg-emerald-800 " onClick={onSave}>{translation?.send_verifcation}</button>
      </div>
    </div>
  );
};

export default ForgotPasswordView;
