'use client'
import React, { useEffect, useState } from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PaymentIcon from '@mui/icons-material/Payment';
import ShareIcon from '@mui/icons-material/Share';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import PhoneIcon from '@mui/icons-material/Phone';
// import { clearAllCookies, setGlobalCookie } from '../../utils';
import { useSelector } from 'react-redux';
// import { authApiService } from '../../utils/authApi';
import FlightIcon from '@mui/icons-material/Flight';
import { getGlobalCookie } from '@/lib/utils';


const MobileHeaderMenu = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const { selectedLanguageAndCountry } = useSelector(state => state.sharedState)
    const { loading, profile } = useSelector(state => state.profileState)

    const handleNavToggle = () => {
        setIsNavOpen(!isNavOpen);
    };

    
    const handleListItemClick = (path) => {
        window.location.href = path;
        closeNav();
    };
    
    const closeNav = () => {
        setIsNavOpen(false);
    };
    const location = typeof window !== "undefined" ? window.location : null;
    const isHome = location?.pathname === "/";
    const userLogout = () => {
        clearAllCookies();
        setTimeout(() => {
            authApiService('/api/Auths/Token', { "DeviceID": "00700834" })
                .then((response) => {
                    setGlobalCookie('accessToken', JSON.stringify(response.data.data.accessToken));
                    setGlobalCookie('refreshToken', JSON.stringify(response.data.data.refreshToken));
                    setTimeout(() => {
                        window.location.reload(false);
                    }, 1000);
                })
                .catch((error) => {
                });
        }, 1000);
    }
    const { translation } = useSelector((state) => state.sharedState)
    const isUserLoggedIn = getGlobalCookie('isUserLoggedIn')
    console.log(isUserLoggedIn);
    return (
        <div className="w-[30px]">
            <div className='w-full'>
                <IconButton onClick={handleNavToggle} style={{ color: isHome ? "#066651" : "#fff" }}>
                    <MenuIcon />
                </IconButton>
            </div>

            <Drawer anchor="left" open={isNavOpen} onClose={closeNav} variant="temporary"  >
                <div className='w-[85vw] h-full flex flex-col justify-between'>
                    <List>
                        <ListItem button onClick={() => handleListItemClick('/smart-payment')}>
                            <ListItemIcon>
                                <PaymentIcon />
                            </ListItemIcon>
                            <ListItemText primary={translation?.smart_payment} />
                        </ListItem>
                        <ListItem button onClick={() => handleListItemClick('/my-bookings')}>
                            <ListItemIcon>
                                <ShareIcon />
                            </ListItemIcon>
                            <ListItemText primary={translation?.my_bookings} />
                        </ListItem>
                        <ListItem button onClick={() => handleListItemClick('/settings')}>
                            <ListItemIcon>
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText primary={translation?.settings} />
                        </ListItem>
                        <ListItem button onClick={() => handleListItemClick('/help-center')}>
                            <ListItemIcon>
                                <HelpIcon />
                            </ListItemIcon>
                            <ListItemText primary={translation?.help_center} />
                        </ListItem>
                        <ListItem button onClick={() => handleListItemClick('/contact-us')}>
                            <ListItemIcon>
                                <PhoneIcon />
                            </ListItemIcon>
                            <ListItemText primary={translation?.contact_us} />
                        </ListItem>
                        <ListItem button onClick={() => handleListItemClick('/travel-stories')}>
                            <ListItemIcon>
                                <FlightIcon />
                            </ListItemIcon>
                            <ListItemText primary={translation?.travel_stories} />
                        </ListItem>
                        <ListItem button onClick={() => handleListItemClick('/popular-destination')}>
                            <ListItemIcon>
                                <FlightIcon />
                            </ListItemIcon>
                            <ListItemText primary={translation?.popular_destinations} />
                        </ListItem>
                        <ListItem button onClick={() => handleListItemClick('/recomended')}>
                            <ListItemIcon>
                                <FlightIcon />
                            </ListItemIcon>
                            <ListItemText primary={translation?.recommended_for_you} />
                        </ListItem>
                    </List>


                    {
                        isUserLoggedIn
                            ?
                            <div className='flex p-4 item-center'>
                                <button className='text-center text-white text-base font-normal px-2 py-1.5 bg-emerald-800 rounded-md justify-center items-center h-12 w-full' onClick={() => userLogout()}>
                                    {translation?.logout}
                                </button>
                            </div>
                            :
                            <div className='flex gap-4 p-4 '>
                                <button className='text-center text-white text-base font-normal px-2 py-1.5 bg-orange-400 rounded-md justify-center items-center h-12 w-full'  onClick={() => handleListItemClick('/login')}>
                                    {translation?.sign_in}
                                </button>
                                <button className='text-center text-white text-normal font-medium px-2 py-1.5 bg-emerald-800 rounded-md justify-center items-center h-12 w-full'  onClick={() => handleListItemClick('/register')}>
                                    {translation?.create_account}
                                </button>
                            </div>

                    }
                </div>
            </Drawer>
        </div>
    );
};

export default MobileHeaderMenu;
