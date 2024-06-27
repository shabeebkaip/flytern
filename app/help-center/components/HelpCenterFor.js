import React, { useState } from 'react'
import { Autocomplete } from '@mui/material'
import { useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { postQueryApi } from '../api'
import { checkApiStatus } from '@/lib/utils'
import { CustomTextField } from '@/app/shared/components/CustomTextField'
import TitleCard from '@/app/shared/components/TitleCard'

const HelpCenterFor = () => {
    const { initailInfo: { mobileCountryList = [] } } = useSelector(state => state.generalState)
    const { enqueueSnackbar } = useSnackbar();
    const [isEmailValid, setIsEmailValid] = useState(true);

    const [data, setdata] = useState({
        mobileCountryCode: "",
        mobile: "",
        email: "",
        bookingRef: "",
        moreDetails: ""
    })
    const addQuery = () => {
        if (!isEmailValid) {
            enqueueSnackbar('Please enter a valid email address', { variant: 'error', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
            return;
        }
        let payload = {
            mobileCountryCode: data.mobileCountryCode,
            mobile: data.mobile,
            email: data.email,
            bookingRef: data.bookingRef,
            moreDetails: data.moreDetails,
        };

        postQueryApi(payload)
            .then(response => {
                if (checkApiStatus(response)) {
                    enqueueSnackbar(response.data.data, { variant: 'success', autoHideDuration: 4000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
                    setTimeout(() => {
                        // navigate('/'); // Replace '/home' with the actual path to your home page
                    }, 1000);
                } else {
                    enqueueSnackbar('Something went wrong', { variant: 'error', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
                }
            });
    }

    const handleInputChange = (fieldName, value) => {
        let sanitizedValue = value;

        // Allow only numbers in the mobile field
        if (fieldName === 'mobile') {
            sanitizedValue = value.replace(/\D/g, ''); // Remove non-numeric characters
        }

        setdata(prevData => ({
            ...prevData,
            [fieldName]: sanitizedValue,
        }));

        // Check email validity
        if (fieldName === 'email') {
            setIsEmailValid(validateEmail(sanitizedValue));
        }
    }


    const validateEmail = (email) => {
        // Use a regular expression for basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    const { selectedLanguageAndCountry } = useSelector(state => state.sharedState)
    const  { translation} = useSelector((state) =>  state.sharedState)
    return (
        <TitleCard title={translation?.help_center}>
            <div className='grid grid-cols-5 gap-4 mt-5'>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={mobileCountryList}
                    getOptionLabel={(option) => `${option.code} - ${option.countryName}`}
                    value={data.nationalityCode}
                    onChange={(event, value) => handleInputChange('mobileCountryCode', value.code)}
                    autoComplete="off"
                    renderInput={(params) => (
                        <CustomTextField
                            {...params}
                            label={translation?.country_code}
                            className=''
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            clearIcon={null}
                            autoComplete='off'
                        />
                    )}
                    className='col-span-1 '
                    clearIcon={null}
                />
                <CustomTextField
                    label={translation?.mobile}
                    value={data.mobile}
                    onChange={(e) => handleInputChange('mobile', e.target.value)}
                    className='col-span-3 '
                    autoComplete='off'
                />
            </div>
            <div className='grid grid-cols-5 gap-4 mt-4'>
                <CustomTextField
                    label={translation?.email}
                    value={data.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`col-span-2  ${isEmailValid ? '' : 'error'}`}
                    helperText={isEmailValid ? '' : 'Please enter a valid email address'}
                    error={!isEmailValid}
                    autoComplete='off'
                />
                <CustomTextField
                    label={translation?.enter_booking_id}
                    value={data.bookingRef}
                    onChange={(e) => handleInputChange('bookingRef', e.target.value)}
                    className='col-span-2 '
                    autoComplete='off'
                />
            </div>
            <div className='grid grid-cols-5 gap-4 mt-4'>
                <div className='col-span-4  p-2.5 bg-orange-400 bg-opacity-10 rounded-[10px] justify-start items-center gap-2.5 '>
                    <p className='text-orange-400 text-[11px] sm:text-sm font-medium '>{translation?.please_share}</p>
                </div>
                <CustomTextField
                    label={translation?.your_query}
                    value={data.moreDetails}
                    onChange={(e) => handleInputChange('moreDetails', e.target.value)}
                    className='col-span-4 '
                    autoComplete='off'
                />
                <button className='h-12 col-span-2 mt-3 text-base font-medium text-white rounded-md sm:w-64 bg-emerald-800' onClick={addQuery}>{translation?.submit}</button>
            </div>
        </TitleCard>
    )
}

export default HelpCenterFor