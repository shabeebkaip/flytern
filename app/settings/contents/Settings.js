"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Autocomplete } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { countryAndLanguageSuccess } from '@/lib/slices/genaralSlice'
import { getlanguageSwitchApi, saveDeviceLanguage } from '@/app/shared/api'
import { CustomTextField } from '@/app/shared/components/CustomTextField'
import { useAppSelector } from '@/lib/hooks'
import { checkApiStatus, setGlobalCookie } from '@/lib/utils'
import { generalSidebarData } from '@/lib/constants'
import SideBar from '@/app/shared/components/SideBar'
import TitleCard from '@/app/shared/components/TitleCard'

const Settings = () => {
  const dispatch = useDispatch();
  //   const navigate = useNavigate();
  const { languages } = useAppSelector((item) => item.sharedState);
  const { initailInfo: { mobileCountryList = {} } } = useAppSelector(state => state.generalState)
  const { selectedLanguageAndCountry } = useAppSelector((state) => state.sharedState);
  const { enqueueSnackbar } = useSnackbar();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedLanguages, setSelectedLangauages] = useState(null);
  useEffect(() => {
    setSelectedCountry(selectedLanguageAndCountry?.country)
    setSelectedLangauages(selectedLanguageAndCountry?.language)
  }, [selectedLanguageAndCountry]);
  useEffect(() => {
    dispatch(getlanguageSwitchApi);
  }, [dispatch]);

  const changeLanguage = (language) => {
    setSelectedLangauages(language)
    setGlobalCookie('language', JSON.stringify(language.code), 1)
  };

  const addLanguage = () => {
    debugger
    let payload = {
      countryCode: selectedCountry?.countryISOCode || '',
      language: selectedLanguages?.code || '',
      notificationEnabled: false,
      notificationToken: selectedLanguages?.code || '',
    };
    setGlobalCookie('selectedCountryName', JSON.stringify(selectedCountry?.countryName));
    setGlobalCookie('selectedLanguage', JSON.stringify(selectedLanguages?.name));
    saveDeviceLanguage(payload)
      .then(response => {
        if (checkApiStatus(response)) {
          dispatch(countryAndLanguageSuccess(payload))
          enqueueSnackbar("Language changed successfully", { variant: 'success', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
          setTimeout(() => {
            if (typeof window !== 'undefined') {
              if (payload.language === 'ar') {
                window.location.href='/ar'
                // window.location.reload();
              } else {
                window.location.href='/'
                // window.location.reload();
              }
            }
          }, 3000);
        } else {
          enqueueSnackbar('Something went wrong', { variant: 'error', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
        }
      })
      .catch(error => {
        enqueueSnackbar('Something went wrong', { variant: 'error', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
      });
  }
  const { translation } = useAppSelector((state) => state.sharedState)
  return (
    <div className={`${selectedLanguageAndCountry?.language?.code === "ar" ? 'rtl font-arabic' : 'font-inter'} mt-12`}>
      <div className='flex gap-1 mt-1 text-sm font-normal text-neutral-400'>
        <h3 className='cursor-pointer' onClick={() => navigate('/')}>{translation?.home}</h3>
        <h3>/</h3>
        <h3 className='font-medium text-black cursor-pointer ' >{translation?.settings}</h3>

      </div>
      <div className="grid grid-cols-10 gap-8 mt-8 mb-8">
        <div className='hidden col-span-2 lg:block'>
          <SideBar sideBarList={generalSidebarData} />
        </div>
        <div className='flex flex-col col-span-10 gap-5 lg:col-span-8'>
          <TitleCard title={translation?.country}>
            <div className='grid grid-cols-2 mt-10'>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={mobileCountryList} // Use the country list data
                getOptionLabel={(option) => `${option?.countryName_Ar} (${option?.code})`}
                value={selectedCountry}
                onChange={(event, newValue) => setSelectedCountry(newValue)}
                renderInput={(params) => <CustomTextField {...params} label={translation?.select__country} />}
                className=' bg-stone-50'
              />
            </div>
          </TitleCard>

          <TitleCard title={translation?.language}>
            <div className='grid grid-cols-2 mt-10'>
              <Autocomplete
                disablePortal
                id="language-select"
                options={languages}
                getOptionLabel={(option) => option.name}
                onChange={(event, newValue) => changeLanguage(newValue)}
                value={selectedLanguages}
                renderInput={(params) => (
                  <CustomTextField
                    {...params}
                    label={translation?.select_language}
                  />
                )}
                className='bg-stone-50'
              />
            </div>
          </TitleCard>
          <button className='h-12 col-span-2 mt-3 text-base font-medium text-white rounded-md sm:w-64 bg-emerald-800' onClick={addLanguage}>{translation?.submit}</button>
        </div>
      </div>
    </div>
  )
}

export default Settings