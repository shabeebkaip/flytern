"use client"
import { Avatar, List, ListItem, ListItemPrefix, Popover, PopoverContent, PopoverHandler, Typography } from '@material-tailwind/react'
import React, { useState } from 'react'
import Link from 'next/link'
import { clearAllCookies, setGlobalCookie } from '@/lib/utils';
import Image from 'next/image'
import { useAppSelector } from '@/lib/hooks'
import { authApiService } from '@/lib/authApi';
import { arabic_translation } from '@/lib/constants';

const HeaderProfile = () => {
    const { profile, translation, selectedLanguageAndCountry } = useAppSelector(state => state.sharedState);
    const [openPopover, setOpenPopover] = useState(false);
    const userLogout = () => {
        clearAllCookies();
        setTimeout(() => {
            authApiService()
                .then((response) => {
                    setGlobalCookie('accessToken', JSON.stringify(response.data.data.accessToken), 1);
                    setGlobalCookie('refreshToken', JSON.stringify(response.data.data.refreshToken), 1);
                    setTimeout(() => {
                        if (typeof window !== "undefined") {
                            window.location.reload(false);
                        }
                    }, 1000);
                })
                .catch((error) => {
                    console.log('error', error);
                });
        }, 1000);
    };

    const profileOptions = [
        {
            label: translation?.my_bookings,
            icon: '/icons/share.png',
            path: '/my-bookings'
        },
        {
            label: translation?.my_travel_stories,
            icon: '/icons/travelStories.png',
            path: '/profile/travel-stories'
        },
        {
            label: translation?.change_password,
            icon: "/icons/lock.png",
            path: '/profile/change-password'
        },

    ];
    const triggers = {
        onClick: () => setOpenPopover(prev => !prev),
    };

    const handleSignInClick = () => {
        if (typeof window !== "undefined") {
            localStorage.setItem('redirectPath', JSON.stringify(`${window.location?.pathname}#contact_details`));
            window.location.href = '/login';
        }
    };

    return (
        <div className="flex items-center cursor-pointer" {...triggers}>
            {profile && Object.keys(profile).length ? (
                <Popover placement="bottom" open={openPopover} handler={setOpenPopover}>
                    <PopoverHandler {...triggers}>
                        <Image width={48} height={48} src={profile.imgUrl} alt={profile.firstName} className='object-cover w-12 h-12 rounded-full' />
                    </PopoverHandler>
                    <PopoverContent className="z-10 flex flex-col items-center justify-center mt-6 w-72">
                        <div className="flex items-center gap-4 pb-4 mt-8 mb-4 w-60">
                            <Avatar src={profile.imgUrl} alt={profile.firstName} />
                            <div>
                                <Typography variant="h6" color="blue-gray" className='text-base font-medium text-black'>
                                    {profile.firstName} {profile.lastName}
                                </Typography>
                                <Typography variant="small" color="gray" className="text-xs font-normal" style={{ color: '#A3A3A3' }}>
                                    {profile.email}
                                </Typography>
                                <Typography variant="small" color="gray" className="text-sm font-normal cursor-pointer" style={{ color: '#066651' }} onClick={() => typeof window !== 'undefined' && (window.location.href = '/profile')}>
                                    {selectedLanguageAndCountry?.language?.code === "ar" ? arabic_translation.view_profile : 'View Profile'}
                                </Typography>
                            </div>
                        </div>
                        <ul className="p-0">
                            {profileOptions.map((option, index) => (
                                <div
                                    key={index}
                                    className='flex items-center h-16 gap-5 p-1 text-sm font-normal border-b rounded-md cursor-pointer w-60 hover:bg-stone-50'
                                    onClick={() => typeof window !== 'undefined' && (window.location.href = option.path)}
                                >
                                    <div className=''>
                                        <Image width={24} height={24} className='w-6 h-6' src={option.icon} alt="" />
                                    </div>
                                    {option.label}
                                </div>
                            ))}
                            <div
                                className='flex items-center h-16 gap-5 p-1 text-sm font-normal border-b rounded-md cursor-pointer w-60 hover:bg-stone-50'
                                onClick={userLogout}
                            >
                                <div className=''>
                                    <Image width={24} height={24} className='w-6 h-6' src={"/icons/logout.png"} alt="" />
                                </div>
                                {selectedLanguageAndCountry?.language?.code === "ar" ? 'تسجيل خروج' : 'Logout'}
                            </div>
                        </ul>
                    </PopoverContent>
                </Popover>
            ) : (
                <div className='p-2 text-sm text-white rounded-md bg-emerald-800' onClick={handleSignInClick}>
                    {translation?.login} / {translation?.register}
                </div>
            )}
        </div>
    );
}

export default HeaderProfile;
