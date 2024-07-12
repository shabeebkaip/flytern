import React, { useCallback, useEffect, useState } from 'react';
import { format, parse } from 'date-fns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Autocomplete } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import { insuranceReviewDetailsSuccess, setSaveTravellerLoader } from '@/lib/slices/insuranceSlice';
import { checkApiStatus, encryptUrl } from '@/lib/utils';
import TitleCard from '@/app/shared/components/TitleCard';
import { ProfileIconSvg } from '@/app/shared/components/SVG';
import { CustomDatePicker, CustomTextField } from '@/app/shared/components/CustomTextField';
import { arabic_translation } from '@/lib/constants';
import { addInsuranceUserDetailsApi } from '../api';

const UserDetails = () => {
    const { insuranceFormList: { _lstPolicyNationality, _lstPolicyRelationship, minPolicyDate } = {} } = useSelector(state => state.insuranceState);
    const { saveTraveller, } = useSelector(state => state.insuranceState);
    const { contactDc } = useSelector(state => state.sharedState)
    const dispatch = useDispatch()

    const { saveTraveller: { policyRelationshipValues } } = useSelector(state => state.insuranceState);

    const [data, setData] = useState([]);
    const [openIndexes, setOpenIndexes] = useState([]);

    const updateDataAndSetMainData = (key, value, index) => {
        setData(data.map((item, i) => i === index ? { ...item, [key]: value } : item))
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
    }, [policyRelationshipValues, setData]);

    useEffect(() => {
        handleClick();
    }, [handleClick]);

    const validateForm = () => {
        for (const form of data) {
            if (!form.firstName || !form.lastName || !form.dateOfBirth || !form.nationalityCode || !form.civilID || !form.passportNumber) {
                enqueueSnackbar('Please fill in all fields for each form', { variant: 'error' });
                return false;
            }
        }
        return true;
    };

    const addInsuranceUserDetails = (params) => {
        if (!validateForm()) {
            return;
        }

        const relationshipCodes = data.map((form) => form.relationshipCode);
        const contributorCount = relationshipCodes.filter(code => code === "000").length;
        const spuaseCount = relationshipCodes.filter(code => code === "001").length;
        const sonCount = relationshipCodes.filter(code => code === "002").length;
        const daughterCount = relationshipCodes.filter(code => code === "003").length;
        const insuranceData = {
            covid: saveTraveller.covidtype,
            contributor: contributorCount,
            son: sonCount,
            daughter: daughterCount,
            spouse: spuaseCount,
            policyPlan: saveTraveller.policyplan,
            policyType: saveTraveller.policy_type,
            policyDuration: saveTraveller.policyperiod,
            policyDate: format(parse(minPolicyDate, 'dd-MM-yyyy', new Date()), 'yyyy-MM-dd'),
        };
        const contactData = {
            email: contactDc.email && contactDc.email,
            mobileCntry: contactDc.countryCode && contactDc.countryCode,
            mobileNumber: contactDc.mobileNumber && contactDc.mobileNumber
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
                        setTimeout(() => {
                            window.location.href = `/payment-method/?ref=${response.data.data.bookingRef}`
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
                                    />

                                    <CustomTextField
                                        type='text'
                                        placeholder={selectedLanguageAndCountry?.language?.code === 'ar' ? arabic_translation.last_name : 'Enter last name'}
                                        value={item.lastName}
                                        onChange={(e) => updateDataAndSetMainData('lastName', e.target.value, index)}
                                        className=' bg-stone-50'
                                        autoComplete='off'
                                    />

                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <CustomDatePicker
                                            label={selectedLanguageAndCountry?.language?.code === 'ar' ? arabic_translation.dob : 'Date of Birth'}
                                            value={parse(item.dateOfBirth, 'dd-MM-yyyy', new Date())}
                                            className='bg-stone-50'
                                            onChange={(e) => updateDataAndSetMainData('dateOfBirth', format(e, 'dd-MM-yyyy'), index)}
                                            renderInput={(params) => <CustomTextField {...params} className='bg-stone-50' />}
                                            maxDate={new Date()}
                                            disableFuture
                                        />
                                    </LocalizationProvider>

                                    <Autocomplete
                                        disablePortal
                                        id='combo-box-demo'
                                        options={_lstPolicyNationality}
                                        onChange={(event, value) => updateDataAndSetMainData('nationalityCode', value.code, index)}
                                        getOptionLabel={(option) => option.information}
                                        autoComplete='off'
                                        renderInput={(params) => (
                                            <CustomTextField
                                                {...params}
                                                label={selectedLanguageAndCountry?.language?.code === 'ar' ? arabic_translation.Select_Nationality : 'Select Nationality'}
                                                autoComplete='off'
                                            />
                                        )}
                                        className=' bg-stone-50'
                                    />

                                    <CustomTextField
                                        styles={'w-full'}
                                        type='text'
                                        placeholder={selectedLanguageAndCountry?.language?.code === 'ar' ? arabic_translation.enter_id : 'Enter ID'}
                                        value={item.civilID}
                                        className=' bg-stone-50'
                                        onChange={(e) => updateDataAndSetMainData('civilID', e.target.value, index)}
                                        autoComplete='off'
                                    />

                                    <CustomTextField
                                        label={selectedLanguageAndCountry?.language?.code === 'ar' ? arabic_translation.enter_passport_no : 'Passport Number'}
                                        className=' bg-stone-50'
                                        onChange={(event) => updateDataAndSetMainData('passportNumber', event.target.value, index)}
                                        value={item.passportNumber}
                                        autoComplete='off'
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
