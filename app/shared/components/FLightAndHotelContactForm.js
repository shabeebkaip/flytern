import React, { useState } from 'react'

import { Autocomplete } from '@mui/material'
import { connect, useDispatch, useSelector } from 'react-redux'
import { regexConstants } from '@/lib/regex'
import TitleCard from './TitleCard';
import { PhoneIconSvg } from './SVG';
import { CustomTextField } from './CustomTextField';
import { setContactDetails, setShowUserDetails } from '@/lib/slices/sharedSlice';
import Link from 'next/link';
import GuestDetails from './GuestDetails';
import { arabic_translation } from '@/lib/constants'





const FLightAndHotelContactForm = ({ countryCode, profile, contactDc, hideButton = false }) => {
    const [showGuestDetails, setShowGuestDetails] = useState(false);
    const [error, setError] = useState({});
    const { mobileCountryList } = useSelector(state => state.sharedState)
    const dispatch = useDispatch()
    // const isMobile = useMediaQuery({ query: "(max-width: 1023px)" });


    const handleSignInClick = () => {
        if (typeof window !== "undefined") {
            const currentUrl = window.location.href;
            localStorage.setItem('redirectPath', JSON.stringify(`${currentUrl}#contact_details`));
            window.location.href = '/login';
        }
    };

    const handleSignUpClick = () => {
        if (typeof window !== "undefined") {
            const currentUrl = window.location.href;
            localStorage.setItem('redirectPath', JSON.stringify(`${currentUrl}#contact_details`));
            window.location.href = '/register';
        }
    };
    const handleGuestUser = () => {
        let validationError = {
            email: contactDc?.email ? isValidEmail(contactDc?.email) ? '' : 'Please enter a valid email address' : 'Please enter email',
            mobileNumber: contactDc?.mobileNumber ? '' : 'Please enter mobile number',
            countryCode: contactDc?.countryCode ? '' : 'Please enter country code',
        }
        if (Object.values(validationError).every(value => value === "")) {
            setShowGuestDetails(true);
            dispatch(setShowUserDetails(true));
        } else {
            setError(validationError)
        }
    }

    const isValidEmail = (email) => {
        const emailRegex = regexConstants.emailRegex;
        return emailRegex.test(email);
    };
    const { selectedLanguageAndCountry } = useSelector(state => state.sharedState)
    const { translation } = useSelector((state) => state.sharedState)

    return (
        <>
            {!showGuestDetails ? (
                <TitleCard
                    topMargin='mt-8'
                    title={
                        <>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-2 '>
                                    <PhoneIconSvg color={'#066651'} />
                                    <h4 className='text-lg font-medium text-black'>{translation?.contact_details}</h4>
                                </div>
                                <div className='items-center hidden gap-4 md:flex'>
                                    {
                                        profile?.email ? null :
                                            <div className='col-span-5 sm:col-span-3'>
                                                <button className='px-6 sm:h-12 py-1.5 rounded-md border border-emerald-800 justify-center items-center w-full text-center text-emerald-800 text-sm font-medium capitalize' onClick={handleSignInClick}>{translation?.sign_in}</button>
                                            </div>
                                    }
                                    {
                                        profile?.email ? null :
                                            <div className='col-span-5 sm:col-span-3'>
                                                <button className='px-6 sm:h-12 py-1.5 rounded-md border border-emerald-800 justify-center items-center w-full text-center text-emerald-800 text-sm font-medium capitalize' onClick={handleSignUpClick}>{translation?.sign_up}</button>
                                            </div>
                                    }
                                </div>
                            </div>
                        </>
                    }
                    target='contact_details'
                >
                    <div className='grid grid-cols-10 gap-3 pt-8 sm:gap-6'>
                        <div className='col-span-10 '>
                            <CustomTextField
                                label={translation?.email}
                                placeholder={translation?.email}
                                value={contactDc?.email}
                                onChange={(e) => {
                                    const emailInput = e.target.value;
                                    dispatch(setContactDetails({ ...contactDc, email: emailInput }));
                                }}
                                onFocus={() => setError({ ...error, email: '' })}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                error={error?.email ? true : false}
                                helperText={error?.email ? error?.email : ''}
                                autoComplete="off"
                            />
                        </div>
                        {
                            mobileCountryList && mobileCountryList.length ?
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={mobileCountryList}
                                    getOptionLabel={(option) => ` ${option.code} - ${option.countryName}`}
                                    value={mobileCountryList.find(item => item.code === contactDc?.countryCode)}
                                    onChange={(event, value) => dispatch(setContactDetails({ ...contactDc, countryCode: value.code, mobileCntry: value.code }))}
                                    autoComplete='off'
                                    error={error?.countryCode ? true : false}
                                    helperText={error?.countryCode ? error?.countryCode : ''}
                                    onFocus={() => setError({ ...error, countryCode: '' })}
                                    renderInput={(params) => (

                                        <CustomTextField
                                            {...params}
                                            label={translation?.country_code}
                                            className=''
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}
                                            autoComplete='off'
                                            clearIcon={null}
                                            error={error?.countryCode ? true : false}
                                            helperText={error?.countryCode ? error?.countryCode : ''}
                                            onFocus={() => setError({ ...error, countryCode: '' })}
                                        />
                                    )}
                                    className='col-span-10 md:col-span-3'
                                    clearIcon={null}
                                /> : null
                        }
                        <CustomTextField
                            label={translation?.mobile}
                            className='col-span-10 md:col-span-7'
                            value={contactDc?.mobileNumber}
                            onChange={(e) => {
                                const input = e.target.value.replace(/\D/g, '');
                                dispatch(setContactDetails({ ...contactDc, mobileNumber: input }));
                            }}
                            onFocus={() => setError({ ...error, mobileNumber: '' })}
                            error={error?.mobileNumber ? true : false}
                            helperText={error?.mobileNumber ? error?.mobileNumber : ''}
                            InputLabelProps={{ shrink: true }}
                            autoComplete="off"
                        />

                        {hideButton ? null :
                            profile?.email ? <button className='w-full h-12 col-span-4 mt-3 text-base font-medium text-white rounded-md bg-emerald-800' onClick={() => handleGuestUser()}  >{translation?.continue}
                            </button> :
                                <button className='w-full h-12 col-span-12 mt-3 text-base font-medium text-white rounded-md md:col-span-4 bg-emerald-800' onClick={() => handleGuestUser()}  >{translation?.continue_as_guest}
                                </button>
                        }
                        <div className='items-center col-span-12 md:hidden'>
                            <div className="h-[19px] items-center gap-1.5 lg:inline-flex flex justify-center w-full lg:max-w-[450px] my-5">
                                <div className="w-full h-[0px] opacity-10 border border-neutral-400"></div>
                                <div className="text-base font-normal text-center text-stone-500">{translation?.or}</div>
                                <div className="w-full h-[0px] opacity-10 border border-neutral-400"></div>
                            </div>

                            {profile?.email ? null :
                                <div className="flex gap-3">
                                    <button className='px-6 sm:h-12 py-1.5 rounded-md border border-emerald-800 justify-center items-center w-full text-center text-emerald-800 text-sm font-medium capitalize' onClick={handleSignInClick}>
                                        {translation?.sign_in}
                                    </button>

                                    <button className='ml-4 px-6 sm:h-12 py-1.5 rounded-md border border-emerald-800 justify-center items-center w-full text-center text-emerald-800 text-sm font-medium capitalize' onClick={handleSignUpClick}>
                                        {translation?.sign_up}
                                    </button>
                                </div>
                            }
                        </div>
                        {showGuestDetails && <GuestDetails />}
                        <div className=' col-span-10 p-2.5 bg-orange-400 bg-opacity-10 rounded-[10px] justify-start items-center gap-2.5'>
                            <p className='text-orange-400 text-[11px] sm:text-sm font-medium '>{translation?.note_you_will}</p>
                        </div>

                    </div>
                </TitleCard>
            ) : (
                <GuestDetails />
            )}
        </>

    )
}

function mapStateToProps(state) {
    return {
        countryCode: state?.sharedState?.countries?.map(item => item.code),
        contactDc: state?.sharedState?.contactDc,
        profile: state?.sharedState?.profile,
    }
}

export default connect(mapStateToProps, null)(FLightAndHotelContactForm)