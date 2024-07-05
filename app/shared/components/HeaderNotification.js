"use client"
import React, { useState } from 'react'
import { Button, List, Popover } from '@mui/material';
import { useSelector } from 'react-redux';
import Image from 'next/image';

const HeaderNotifiction = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { notifications } = useSelector(state => state.sharedState)
    const { selectedLanguageAndCountry } = useSelector(state => state.sharedState)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleRedirection = (item) => {
        if (item.isRedirection) {
            if (typeof window !== "undefined") {
                window.location.assign(item.redirectionUrl, '_blank')
                handleClose()
            }
        } else {
            handleClose()
        }
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const location = typeof window !== "undefined" ? window.location : null;
    const isHome = location?.pathname === '/';
    return (
        <div className="flex items-center cursor-pointer">
            <Button onClick={handleClick}>
                {isHome ? (
                    <div className='relative'>
                        {/* <img className="w-8 h-8" src={require('../../assets/notification.png')} alt="" /> */}
                        <Image width={40} height={40} className='w-8 h-8' src="/notification.png" alt="" />
                        {notifications?.length > 0 ?
                            <div className='absolute flex items-center justify-center w-5 h-5 rounded-full -right-1 bg-emerald-800 -top-1 '>
                                <span className='text-xs text-white'>{notifications?.length}</span>
                            </div> : null
                        }
                    </div>
                ) : (
                    <div>
                        <Image width={40} height={40} className='w-8 h-8' src="/notification.svg" alt="" />
                        {notifications?.length > 0 ?
                            <div className='absolute top-0 flex items-center justify-center w-5 h-5 bg-white rounded-full right-3 '>
                                <span className='text-xs text-emerald-800'>{notifications?.length}</span>
                            </div> : null
                        }
                    </div>
                )}
            </Button>
            <Popover
                className='mt-5'
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <List className='max-h-[500px] overflow-auto custom-scrollbar '>
                    {
                        notifications && notifications.length ?
                            notifications.map((item, index) => (
                                <div className='flex flex-col justify-between p-3 max-w-[300px] hover:bg-stone-50 cursor-pointer border-b duration-300 ' key={index} onClick={() => handleRedirection(item)} >
                                    <p className='text-sm font-semibold'>{item.header}</p>
                                    <p className='' >{item.information}</p>
                                </div>
                            )) : <div className='flex items-center justify-between w-full p-3'>
                                <p>{selectedLanguageAndCountry?.language?.code === "ar" ? "لا يوجد إشعارات جديدة!" : "No new notifications!"}</p>
                            </div>
                    }
                </List>
            </Popover>
        </div>
    );
};


export default HeaderNotifiction