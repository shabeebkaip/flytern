import React, { useEffect, useState } from 'react'
import { Autocomplete } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { format, parse } from 'date-fns'
import { useSnackbar } from 'notistack';
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { getProfileDetailApi } from '@/app/profile/api'
import { addCoPaxApi } from '../api'
import { CustomDatePicker, CustomTextField } from '@/app/shared/components/CustomTextField'
import { checkApiStatus } from '@/lib/utils'

const AddEditCoPax = () => {
  const { profile } = useAppSelector(state => state.profileState);
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useAppDispatch()

  const [data, setData] = useState({
    gender: '',
    firstName: '',
    lastName: '',
    dateOfBirth: format(new Date(), 'dd-MM-yyyy'),
    nationalityCode: '',
    passportNumber: '',
    passportIssuedCountryCode: '',
    passportExp: format(new Date(), 'dd-MM-yyyy'),

  })

  useEffect(() => {
    dispatch(getProfileDetailApi)
  }, [dispatch]);

  const addCopax = () => {
    let payload = Object.assign(data)
    payload = {
      ...payload,
      gender: payload.gender && payload.gender.name && payload.gender.name,
      nationalityCode: payload.nationalityCode && payload.nationalityCode.countryISOCode && payload.nationalityCode.countryISOCode,
      passportIssuedCountryCode: payload.passportIssuedCountryCode && payload.passportIssuedCountryCode.countryISOCode && payload.passportIssuedCountryCode.countryISOCode
    }
    addCoPaxApi(payload)
      .then(response => {
        if (checkApiStatus(response)) {
          enqueueSnackbar('Co-Pax Added Successfully', { variant: 'success', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
          if (typeof window !== 'undefined') {
            window.location.href = "/profile/co-pax";
          }
        }
        else {
          enqueueSnackbar('Something went wrong', { variant: 'error', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } })
        }
      })
  }

  const genderList = profile?.genderList || [];
  const countriesList = profile?.countriesList || [];

  const { selectedLanguageAndCountry } = useAppSelector(state => state.sharedState)
  return (
    <div className='flex flex-col gap-4 pb-10 mt-8'>
      <div className='flex flex-col grid-cols-2 gap-2 lg:gap-4 sm:grid'>
        {/* <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={["Mr", "Mrs", "Ms", "Miss"]}
          getOptionLabel={(option) => option.name}
          onChange={(event, value) => setData({ ...data, title: value })}
          value={data.title}
          renderInput={(params) =>
            <CustomTextField
              {...params}
              label={language === "ar" ? arabic_translation.gender : 'Select Gender'}
            />}
          className='bg-stone-50'
        /> */}

        <CustomTextField
          label={selectedLanguageAndCountry?.language?.code === "ar" ? arabic_translation.first_name : 'First Name'}
          className='bg-stone-50'
          value={data.firstName}
          onChange={(event) => setData({ ...data, firstName: event.target.value })}
          autoComplete='off'

        />
        <CustomTextField
          label={selectedLanguageAndCountry?.language?.code === "ar" ? arabic_translation.last_name : 'Last Name'}
          className='bg-stone-50'
          value={data.lastName}
          onChange={(event) => setData({ ...data, lastName: event.target.value })}
          autoComplete='off'

        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={genderList}
          getOptionLabel={(option) => option.name}
          onChange={(event, value) => setData({ ...data, gender: value })}
          autoComplete='off'
          renderInput={(params) =>
            <CustomTextField
              {...params}
              label={selectedLanguageAndCountry?.language?.code === "ar" ? arabic_translation.gender : 'Select Gender'}
              autoComplete='off'

            />}
          className='bg-stone-50'
        />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CustomDatePicker
            label={selectedLanguageAndCountry?.language?.code === "ar" ? arabic_translation.dob : 'Date of Birth'}
            value={parse(data.dateOfBirth, 'dd-MM-yyyy', new Date())}
            className='bg-stone-50 '
            onChange={(e) => setData({ ...data, dateOfBirth: format(e, 'dd-MM-yyyy') })}
            renderInput={(params) => <CustomTextField {...params} className='bg-stone-50' />}
          />
        </LocalizationProvider>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={countriesList}
          onChange={(event, value) => setData({ ...data, nationalityCode: value })}
          getOptionLabel={(option) => option.countryName}
          autoComplete='off'
          renderInput={(params) =>
            <CustomTextField
              {...params} label={selectedLanguageAndCountry?.language?.code === "ar" ? arabic_translation.Select_Nationality : 'Select Nationality'} autoComplete='off' />}
          className=' bg-stone-50'

        />

        <CustomTextField
          label={selectedLanguageAndCountry?.language?.code === "ar" ? arabic_translation.enter_passport_no : 'Passport Number'}
          className=' bg-stone-50'
          onChange={(event) => setData({ ...data, passportNumber: event.target.value })}
          autoComplete='off'

        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CustomDatePicker
            label={selectedLanguageAndCountry?.language?.code === "ar" ? arabic_translation.passport_expire : 'Passport Expiry'}
            value={parse(data.passportExp, 'dd-MM-yyyy', new Date())}
            className='bg-stone-50 '
            onChange={(e) => setData({ ...data, passportExp: format(e, 'dd-MM-yyyy') })}
          />
        </LocalizationProvider>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={countriesList}
          getOptionLabel={(option) => option.countryName}
          onChange={(event, value) => setData({ ...data, passportIssuedCountryCode: value })}
          autoComplete='off'
          renderInput={(params) => <CustomTextField
            {...params} label={selectedLanguageAndCountry?.language?.code === "ar" ? arabic_translation.passport_issuer_country : 'Passport Issuer Country'}
            autoComplete='off'
          />}
          className=' bg-stone-50'
        />

      </div>

      <button className='h-12 mt-3 text-base font-medium text-white rounded-md sm:w-64 bg-emerald-800 ' onClick={addCopax}  >{selectedLanguageAndCountry?.language?.code === "ar" ? arabic_translation.add : 'Add'}
      </button>

    </div >
  )
}

export default AddEditCoPax