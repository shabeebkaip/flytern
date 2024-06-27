import HeaderBorder from '@/app/shared/components/HeaderBorder';
import { ProfileIconSvg } from '@/app/shared/components/SVG';
import { useAppSelector } from '@/lib/hooks';
import React from 'react'

const BasicInformation = () => {
    const { profile } = useAppSelector(state => state.profileState)
    // Define default values for the properties you want to display
    const firstName = profile?.firstName ?? '-';
    const lastName = profile?.lastName ?? '-';
    const email = profile?.email ?? '--';
    const phoneCountryCode = profile?.phoneCountryCode ?? '--';
    const phoneNumber = profile?.phoneNumber ?? '--';
    const dateOfBirth = profile?.dateOfBirth ?? '--';
    const passportNumber = profile?.passportNumber ?? '--';
    const passportExpiry = profile?.passportExpiry ?? '--';
    const passportIssuerCountryName = profile?.passportIssuerCountryName ?? '--';


    const { selectedLanguageAndCountry } = useAppSelector(state => state.sharedState)
    const { translation } = useAppSelector((state) => state.sharedState)
    return (
        <div className='pt-[41px]'>
            <div className='flex gap-3'>
                <ProfileIconSvg color='#066651' width='24' height='24' />
                <h5 className='text-lg font-medium text-black '>{translation?.basic_information} </h5>
            </div>
            <HeaderBorder />
            <div className=' flex justify-between sm:justify-start sm:gap-[215px] mt-[30px]'>
                <div className='flex flex-col gap-[34px]'>
                    <h3 className='text-zinc-600 text-xs sm:text-[15px] font-normal sm:h-6'>{translation?.full_name} </h3>
                    <h3 className='text-zinc-600 text-xs sm:text-[15px] font-normal sm:h-6'>{translation?.email} </h3>
                    <h3 className='text-zinc-600 text-xs sm:text-[15px] font-normal sm:h-6'>{translation?.phone_number}</h3>
                    <h3 className='text-zinc-600 text-xs sm:text-[15px] font-normal sm:h-6'>{translation?.dob}</h3>
                    <h3 className='text-zinc-600 text-xs sm:text-[15px] font-normal sm:h-6'>{translation?.passport_number}</h3>
                    <h3 className='text-zinc-600 text-xs sm:text-[15px] font-normal sm:h-6'>{translation?.passport_expire}</h3>
                    <h3 className='text-zinc-600 text-xs sm:text-[15px] font-normal sm:h-6'>{translation?.passport_issuer_country}</h3>
                </div>
                <div className='flex flex-col gap-[34px]'>
                    <h3 className='text-xs font-medium text-black sm:text-base'> {firstName} {lastName}</h3>
                    <h3 className='text-xs font-medium text-black sm:text-base'>{email}</h3>
                    <h3 className='text-xs font-medium text-black sm:text-base'>{phoneCountryCode} {phoneNumber}</h3>
                    <h3 className='text-xs font-medium text-black sm:text-base'>{dateOfBirth}</h3>
                    <h3 className='text-xs font-medium text-black sm:text-base'>{passportNumber}</h3>
                    <h3 className='text-xs font-medium text-black sm:text-base'>{passportExpiry}</h3>
                    <h3 className='text-xs font-medium text-black sm:text-base'>{passportIssuerCountryName}</h3>
                </div>
            </div>
        </div>
    )
}

export default BasicInformation