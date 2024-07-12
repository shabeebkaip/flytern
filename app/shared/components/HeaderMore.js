"use client";
import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverHandler } from '@material-tailwind/react';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector } from 'react-redux'
import { useAppSelector } from '@/lib/hooks';

const HeaderMore = ({ isHome }) => {
    const [openPopOver, setOpenPopOver] = useState(false);
    const { translation } = useAppSelector((state) => state.sharedState);

    const handlePopoverClose = () => setOpenPopOver(false);

    const terms = useSelector(
        (item) => item?.sharedState?.social?.information?.[0]
    );
    const { selectedLanguageAndCountry } = useSelector(state => state.sharedState)
    const socialLinks = [
        { link: terms?.facebook, icon: '/icons/facebook (1).png' },
        { link: terms?.instagram, icon: '/icons/instagram.png' },
        { link: terms?.twitter, icon: '/icons/twitter.png' },
        { link: terms?.linkedIn, icon: '/icons/linkedin3.png' },
    ]

    const listItems = [
        { path: '/smart-payment', icon: '/icons/payment.png', text: translation?.smart_payment },
        { path: '/settings', icon: '/icons/Setting.png', text: translation?.settings },
        { path: '/travel-stories', icon: '/icons/travelStories.png', text: translation?.travel_stories },
        { path: '/recomended', icon: '/icons/travelStories.png', text: translation?.recommended_for_you },
        { path: '/popular-destination', icon: '/icons/travelStories.png', text: translation?.popular_destinations },
        { path: '/help-center', icon: '/icons/faq.png', text: translation?.help_center },
    ];

    return (
        <div className="flex items-center gap-4">
            <Popover placement="bottom" open={openPopOver} handler={setOpenPopOver}>
                <PopoverHandler>
                    <div className='flex items-center gap-4 cursor-pointer'>
                        <Image width={100} height={100} className='w-5 h-5' src={isHome ? '/icons/menu.png' : '/icons/Hamburger Menu.svg'} alt="Menu Icon" />
                        <p className={`text-sm font-normal text-center ${isHome ? 'text-black' : 'text-white'}`}>
                            {translation?.more}
                        </p>
                        <Image width={16} height={16} src={isHome ? '/icons/arrow.png' : '/icons/arrow-down.svg'} alt="Arrow Icon" className='w-4' />
                    </div>
                </PopoverHandler>
                <PopoverContent className="z-10 flex flex-col items-center mt-6 border-none w-72">
                    <div className="flex items-center justify-between w-full h-12 gap-4 pb-4 mb-4 border-b border-blue-gray-50">
                        <div className='p-4'>
                            <p className={`text-sm font-normal text-center ${isHome ? 'text-black' : 'text-white'}`}>
                                {translation?.more}
                            </p>
                        </div>
                        <Image width={26} height={24} className='w-6 h-6 cursor-pointer' onClick={handlePopoverClose} src="/icons/close.png" alt="Close Icon" />
                    </div>
                    <ul className="w-full">
                        {listItems.map((item, index) => (
                            <div
                                onClick={() => {
                                    if (typeof window !== 'undefined') {
                                        window.location.href = item.path;
                                    }
                                    handlePopoverClose();
                                }}
                                key={index}
                                className={`flex items-center h-16 gap-5 text-sm font-normal w-full cursor-pointer rounded-lg p-2 focus-visible:outline-none hover:bg-emerald-50 border-b`}
                                style={{ direction: selectedLanguageAndCountry?.language?.code === "ar" ? "rtl" : "ltr" }}
                            >
                                <Image width={24} height={24} className='w-6 h-6' src={item.icon} alt="" />
                                {item.text}
                            </div>
                        ))}
                    </ul>
                    <div className='flex flex-col items-center justify-between h-24 gap-4 py-4 cursor-pointer w-60'>
                        <div>
                            <p className='text-sm font-normal '>{translation?.social_account}</p>
                        </div>
                        <div className='flex gap-5 '>
                            {socialLinks.map((social, index) => (
                                <Link href={social.link} key={index} target='_blank' className='focus-visible:outline-none'>
                                    <Image width={24} height={24} className='w-6 h-6' src={social.icon} alt="Social Icon" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default HeaderMore;
