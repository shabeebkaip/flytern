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
import { arabic_translation } from '@/lib/constants';
import TitleCard from '@/app/shared/components/TitleCard'

const AddEditCoPax = () => {
  const { profile } = useAppSelector(state => state.profileState);
  const { enqueueSnackbar } = useSnackbar();
  const [errors, setErrors] = useState({});

  const updateErrorField = (key) => {
    setErrors((prevErrors) => ({ ...prevErrors, [key]: "" }));
  };

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


  const validateFields = () => {
    const newErrors = {};

    if (!data.title) newErrors.title = 'Please select a title';
    if (!data.firstName.trim()) newErrors.firstName = 'Please enter a first name';
    if (!data.lastName.trim()) newErrors.lastName = 'Please enter a last name';
    if (!data.gender) newErrors.gender = 'Please select a gender';
    if (!data.dateOfBirth) newErrors.dateOfBirth = 'Please select a date of birth';
    if (!data.nationalityCode) newErrors.nationalityCode = 'Please select a nationality';
    if (!data.passportNumber.trim()) newErrors.passportNumber = 'Please enter a passport number';
    if (!data.passportExp) newErrors.passportExp = 'Please select a passport expiry date';
    if (!data.passportIssuedCountryCode) newErrors.passportIssuedCountryCode = 'Please select a passport issuer country';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addCopax = () => {
    let payload = Object.assign(data)
    payload = {
      ...payload,
      gender: payload.gender && payload.gender.name && payload.gender.name,
      nationalityCode: payload.nationalityCode && payload.nationalityCode.countryISOCode && payload.nationalityCode.countryISOCode,
      passportIssuedCountryCode: payload.passportIssuedCountryCode && payload.passportIssuedCountryCode.countryISOCode && payload.passportIssuedCountryCode.countryISOCode
    }

    if (!validateFields()) {
      enqueueSnackbar('Please fill all required fields', { variant: 'error', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
      return;
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
  const { translation } = useAppSelector((state) => state.sharedState)
  const { selectedLanguageAndCountry } = useAppSelector(state => state.sharedState)
  return (
    <div className='flex flex-col gap-4 pb-10 mt-8'>
     
        <div className='flex flex-col grid-cols-2 gap-2 lg:gap-4 sm:grid'>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={["Mr", "Mrs", "Ms", "Miss"]}
            getOptionLabel={(option) => option}
            onChange={(event, value) => {
              setData({ ...data, title: value });
              setErrors({ ...errors, title: '' });
            }}
            value={data.title}
            autoComplete='off'
            renderInput={(params) =>
              <CustomTextField
                {...params}
                label={selectedLanguageAndCountry?.language?.code === "ar" ? 'عنوان' : '  Title'}
                autoComplete='off'
                error={!!errors.title}
                helperText={errors.title}
              />}
            className='bg-stone-50'
          />

          <CustomTextField
            label={selectedLanguageAndCountry?.language?.code === "ar" ? 'عنوان' : 'First Name'}
            className='bg-stone-50'
            value={data.firstName}
            onChange={(event, value) => {
              setData({ ...data, firstName: event.target.value });
              setErrors({ ...errors, firstName: '' });
            }}
            autoComplete='off'
            error={!!errors.firstName}
            helperText={errors.firstName}

          />
          <CustomTextField
            label={selectedLanguageAndCountry?.language?.code === "ar" ? arabic_translation.last_name : 'Last Name'}
            className='bg-stone-50'
            value={data.lastName}
            onChange={(event, value) => {
              setData({ ...data, lastName: event.target.value });
              setErrors({ ...errors, lastName: '' });
            }}
            autoComplete='off'
            error={!!errors.lastName}
            helperText={errors.lastName}

          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={genderList}
            getOptionLabel={(option) => option.name}
            onChange={(event, value) => {
              setData({ ...data, gender: value });
              setErrors({ ...errors, gender: '' });
            }}
            autoComplete='off'
            renderInput={(params) =>
              <CustomTextField
                {...params}
                label={selectedLanguageAndCountry?.language?.code === "ar" ? arabic_translation.gender : 'Select Gender'}
                autoComplete='off'
                error={!!errors.gender}
                helperText={errors.gender}

              />}
            className='bg-stone-50'
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CustomDatePicker
              label={selectedLanguageAndCountry?.language?.code === "ar" ? arabic_translation.dob : 'Date of Birth'}
              value={parse(data.dateOfBirth, 'dd-MM-yyyy', new Date())}
              className='bg-stone-50 '
              onChange={(e) => {
                setData({ ...data, dateOfBirth: format(e, 'dd-MM-yyyy') });
                setErrors({ ...errors, dateOfBirth: '' });
              }}
              renderInput={(params) => <CustomTextField {...params} className='bg-stone-50' />}
              maxDate={new Date()}
            />
          </LocalizationProvider>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={countriesList}
            onChange={(event, value) => {
              setData({ ...data, nationalityCode: value });
              setErrors({ ...errors, nationalityCode: '' });
            }}
            getOptionLabel={(option) => option.countryName}
            autoComplete='off'
            renderInput={(params) =>
              <CustomTextField
                {...params}
                label={selectedLanguageAndCountry?.language?.code === "ar" ? arabic_translation.Select_Nationality : 'Select Nationality'}
                autoComplete='off'
                error={!!errors.nationalityCode}
                helperText={errors.nationalityCode}
              />}
            className=' bg-stone-50'
          />

          <CustomTextField
            label={selectedLanguageAndCountry?.language?.code === "ar" ? arabic_translation.enter_passport_no : 'Passport Number'}
            className=' bg-stone-50'
            onChange={(event) => {
              setData({ ...data, passportNumber: event.target.value });
              setErrors({ ...errors, passportNumber: '' });
            }}
            error={!!errors.passportNumber}
            helperText={errors.passportNumber}
            autoComplete='off'

          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CustomDatePicker
              label={selectedLanguageAndCountry?.language?.code === "ar" ? arabic_translation.passport_expire : 'Passport Expiry'}
              value={parse(data.passportExp, 'dd-MM-yyyy', new Date())}
              className='bg-stone-50 '
              onChange={(e) => {
                setData({ ...data, passportExp: format(e, 'dd-MM-yyyy') });
                setErrors({ ...errors, passportExp: '' });
              }}
              minDate={new Date()}
            />
          </LocalizationProvider>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={countriesList}
            getOptionLabel={(option) => option.countryName}
            onChange={(event, value) => {
              setData({ ...data, passportIssuedCountryCode: value });
              setErrors({ ...errors, passportIssuedCountryCode: '' });
            }}
            autoComplete='off'
            renderInput={(params) => (
              <CustomTextField
                {...params}
                label={selectedLanguageAndCountry?.language?.code === "ar" ? arabic_translation.passport_issuer_country : 'Passport Issuer Country'}
                autoComplete='off'
                error={!!errors.passportIssuedCountryCode}
                helperText={errors.passportIssuedCountryCode}
              />
            )}
            className=' bg-stone-50'
          />

        </div>
        <button className='h-12 mt-3 text-base font-medium text-white rounded-md sm:w-64 bg-emerald-800 ' onClick={addCopax}  >{selectedLanguageAndCountry?.language?.code === "ar" ? arabic_translation.add : 'Add'}
        </button>
    




    </div >

  )
}

export default AddEditCoPax