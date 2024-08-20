import React, { useCallback, useEffect, useState } from 'react';
import { format, parse } from 'date-fns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Autocomplete } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import { insuranceReviewDetailsSuccess, setSaveTravellerLoader } from '@/lib/slices/insuranceSlice';
import { checkApiStatus, encryptId } from '@/lib/utils';
import TitleCard from '@/app/shared/components/TitleCard';
import { ProfileIconSvg } from '@/app/shared/components/SVG';
import { CustomDatePicker, CustomTextField } from '@/app/shared/components/CustomTextField';
import { arabic_translation } from '@/lib/constants';
import { addInsuranceUserDetailsApi } from '../api';

const UserDetails = () => {
    const { insuranceFormList: { _lstPolicyNationality, _lstPolicyRelationship, minPolicyDate } = {} } = useSelector(state => state.insuranceState);
    const { saveTraveller } = useSelector(state => state.insuranceState);
    const { contactDc } = useSelector(state => state.sharedState);
    const dispatch = useDispatch();

    const { saveTraveller: { policyRelationshipValues } } = useSelector(state => state.insuranceState);

    const [data, setData] = useState([]);
    const [openIndexes, setOpenIndexes] = useState([]);
    const [errors, setErrors] = useState({});

    const updateDataAndSetMainData = (key, value, index) => {
        setData(data.map((item, i) => i === index ? { ...item, [key]: value } : item));
        // Clear the error for this field when it's updated
        setErrors(prev => ({ ...prev, [`${key}_${index}`]: '' }));
    };

    const handleClick = useCallback(() => {
        const generatedForms = [];
        policyRelationshipValues.forEach((item) => {
            const numForms = item.value;
            if (numForms > 0) {
                for (let i = 0; i < numForms; i++) {
                    generatedForms.push({
                        relationshipCode: item.code,
                        firstName: '',
                        lastName: '',
                        dateOfBirth: format(new Date(), 'dd-MM-yyyy'),
                        passportNumber: '',
                        civilID: '',
                        nationalityCode: '',
                    });
                }
            }
        });
        setData(generatedForms);
        setOpenIndexes(generatedForms.map(() => true));
    }, [policyRelationshipValues]);

    useEffect(() => {
        handleClick();
    }, [handleClick]);

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        data.forEach((form, index) => {
            if (!form.firstName.trim()) {
                newErrors[`firstName_${index}`] = 'First name is required';
                isValid = false;
            }
            if (!form.lastName.trim()) {
                newErrors[`lastName_${index}`] = 'Last name is required';
                isValid = false;
            }
            if (!form.dateOfBirth) {
                newErrors[`dateOfBirth_${index}`] = 'Date of birth is required';
                isValid = false;
            }
            if (!form.nationalityCode) {
                newErrors[`nationalityCode_${index}`] = 'Nationality is required';
                isValid = false;
            }
            if (!form.civilID.trim()) {
                newErrors[`civilID_${index}`] = 'Civil ID is required';
                isValid = false;
            }
            if (!form.passportNumber.trim()) {
                newErrors[`passportNumber_${index}`] = 'Passport number is required';
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const addInsuranceUserDetails = () => {
        if (!validateForm()) {
            enqueueSnackbar('Please fill in all required fields', { variant: 'error' });
            return;
        }

        const relationshipCodes = data.map((form) => form.relationshipCode);
        const contributorCount = relationshipCodes.filter(code => code === "000").length;
        const spouseCount = relationshipCodes.filter(code => code === "001").length;
        const sonCount = relationshipCodes.filter(code => code === "002").length;
        const daughterCount = relationshipCodes.filter(code => code === "003").length;
        const insuranceData = {
            covid: saveTraveller.covidtype,
            contributor: contributorCount,
            son: sonCount,
            daughter: daughterCount,
            spouse: spouseCount,
            policyPlan: saveTraveller.policyplan,
            policyType: saveTraveller.policy_type,
            policyDuration: saveTraveller.policyperiod,
            policyDate: format(parse(minPolicyDate, 'dd-MM-yyyy', new Date()), 'yyyy-MM-dd'),
        };
        const contactData = {
            email: contactDc.email,
            mobileCntry: contactDc.countryCode,
            mobileNumber: contactDc.mobileNumber
        }
        const travellerData = {
            _Travellerinfo: data,
            _PolicyInfo: insuranceData,
            _ContactInfo: contactData
        };
        dispatch(insuranceReviewDetailsSuccess(travellerData))
        dispatch(setSaveTravellerLoader(true))
        addInsuranceUserDetailsApi(travellerData)
            .then(response => {
                if (checkApiStatus(response)) {
                    enqueueSnackbar('Insurance Details Added Successfully', { variant: 'success' });
                    if (typeof window !== "undefined") {
                        const encryptedBookingRef = encryptId(response.data.data.bookingRef);
                        setTimeout(() => {
                            window.location.href = `/payment-method/?ref=${encryptedBookingRef}`
                        }, 1000);
                    }
                } else {
                    dispatch(setSaveTravellerLoader(false))
                }
            })
    };

    const toggleDetailsAccordion = (index) => {
        setOpenIndexes((prevOpenIndexes) => {
            const newOpenIndexes = [...prevOpenIndexes];
            newOpenIndexes[index] = !newOpenIndexes[index];
            return newOpenIndexes;
        });
    };

    const { selectedLanguageAndCountry } = useSelector(state => state.sharedState)

    return (
        <div>
            <div >
                <TitleCard
                    topMargin='mt-0'
                    title={
                        <>
                            <div className='flex items-center justify-between gap-2 '>
                                <div className='flex items-center gap-2'>
                                    <ProfileIconSvg color={'#066651'} width={'24'} />
                                    <h4>{selectedLanguageAndCountry?.language?.code === 'ar' ? arabic_translation.user_details : 'User Details'}</h4>
                                </div>
                            </div>
                        </>
                    }>
                    {data.map((item, index) => (
                        <div className='container flex flex-col w-full gap-3 px-2 mx-auto mt-8 group' key={index}>
                            <button
                                onClick={() => toggleDetailsAccordion(index)}
                                className='flex items-center justify-between w-full bg-white'>
                                <span className='text-base font-medium text-black '>
                                    #{_lstPolicyRelationship.find(relItem => relItem.code === data[index].relationshipCode)?.information || index + 1}
                                </span>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className={`h-4 w-4 transform ${openIndexes[index] ? 'rotate-0' : '-rotate-180'} transition-transform duration-300`}
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7' />
                                </svg>
                            </button>
                            {openIndexes[index] && (
                                <div className='grid gap-4 sm:grid-cols-2 md:gap-8'>
                                    <CustomTextField
                                        type='text'
                                        placeholder={selectedLanguageAndCountry?.language?.code === 'ar' ? arabic_translation.first_name : 'Enter first name'}
                                        value={item.firstName}
                                        onChange={(e) => updateDataAndSetMainData('firstName', e.target.value, index)}
                                        className=' bg-stone-50'
                                        autoComplete='off'
                                        error={!!errors[`firstName_${index}`]}
                                        helperText={errors[`firstName_${index}`]}
                                    />

                                    <CustomTextField
                                        type='text'
                                        placeholder={selectedLanguageAndCountry?.language?.code === 'ar' ? arabic_translation.last_name : 'Enter last name'}
                                        value={item.lastName}
                                        onChange={(e) => updateDataAndSetMainData('lastName', e.target.value, index)}
                                        className=' bg-stone-50'
                                        autoComplete='off'
                                        error={!!errors[`lastName_${index}`]}
                                        helperText={errors[`lastName_${index}`]}
                                    />

                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <CustomDatePicker
                                            label={selectedLanguageAndCountry?.language?.code === 'ar' ? arabic_translation.dob : 'Date of Birth'}
                                            value={parse(item.dateOfBirth, 'dd-MM-yyyy', new Date())}
                                            className='bg-stone-50'
                                            onChange={(e) => updateDataAndSetMainData('dateOfBirth', format(e, 'dd-MM-yyyy'), index)}
                                            renderInput={(params) => (
                                                <CustomTextField 
                                                    {...params} 
                                                    className='bg-stone-50'
                                                    error={!!errors[`dateOfBirth_${index}`]}
                                                    helperText={errors[`dateOfBirth_${index}`]}
                                                />
                                            )}
                                            maxDate={new Date()}
                                            disableFuture
                                        />
                                    </LocalizationProvider>

                                    <Autocomplete
                                        disablePortal
                                        id='combo-box-demo'
                                        options={_lstPolicyNationality}
                                        onChange={(event, value) => updateDataAndSetMainData('nationalityCode', value?.code, index)}
                                        getOptionLabel={(option) => option.information}
                                        autoComplete='off'
                                        renderInput={(params) => (
                                            <CustomTextField
                                                {...params}
                                                label={selectedLanguageAndCountry?.language?.code === 'ar' ? arabic_translation.Select_Nationality : 'Select Nationality'}
                                                autoComplete='off'
                                                error={!!errors[`nationalityCode_${index}`]}
                                                helperText={errors[`nationalityCode_${index}`]}
                                            />
                                        )}
                                        className=' bg-stone-50'
                                    />

                                    <CustomTextField
                                        styles={'w-full'}
                                        type='text'
                                        placeholder={selectedLanguageAndCountry?.language?.code === 'ar' ? arabic_translation.enter_id : 'Enter Civil ID'}
                                        value={item.civilID}
                                        className=' bg-stone-50'
                                        onChange={(e) => updateDataAndSetMainData('civilID', e.target.value, index)}
                                        autoComplete='off'
                                        error={!!errors[`civilID_${index}`]}
                                        helperText={errors[`civilID_${index}`]}
                                    />

                                    <CustomTextField
                                        label={selectedLanguageAndCountry?.language?.code === 'ar' ? arabic_translation.enter_passport_no : 'Passport Number'}
                                        className=' bg-stone-50'
                                        onChange={(event) => updateDataAndSetMainData('passportNumber', event.target.value, index)}
                                        value={item.passportNumber}
                                        autoComplete='off'
                                        error={!!errors[`passportNumber_${index}`]}
                                        helperText={errors[`passportNumber_${index}`]}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                    <button
                        className='h-12 text-center text-white text-base font-medium mt-7 px-6 py-1.5 bg-emerald-800 rounded-md justify-center items-center'
                        onClick={addInsuranceUserDetails}>
                        {selectedLanguageAndCountry?.language?.code === 'ar' ? arabic_translation.continue : 'Continue'}
                    </button>
                </TitleCard>
            </div>
        </div>
    );
};

export default UserDetails;