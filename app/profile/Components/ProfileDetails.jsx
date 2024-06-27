import React from 'react'
import Image from 'next/image';
import { useAppSelector } from '@/lib/hooks';

const ProfileDetails = () => {
    const { profile } = useAppSelector(state => state.profileState)
    const { translation } = useAppSelector((state) => state.sharedState)
    return (
        <div className='flex justify-between '>
            <div className='flex flex-col items-center gap-5 sm:flex-row'>
                <div>
                    <Image className='h-14 w-14 sm:w-[104px] sm:h-[104px] rounded-full' src={profile && profile.imgUrl} alt="" width={100} height={100} /></div>
                <div className='flex flex-col gap-4'>
                    <h3 className='text-base font-bold text-black sm:text-xl '>{profile && profile.firstName} {profile && profile.lastName}</h3>
                    <h6 className='text-[10px] sm:text-sm font-normal text-neutral-400 '>{profile && profile.email}</h6>
                </div>
            </div>
            <div>
                <button className='p-2 sm:w-[160px] sm:h-[46px] rounded-md border border-emerald-800 text-center text-emerald-800 text-sm font-medium' onClick={() => typeof window !== 'undefined' && (window.location.href='/profile/edit')}>{translation?.edit_profile}</button>
            </div>
        </div>
    )
}

export default ProfileDetails