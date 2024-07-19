"use client"
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSocialApi } from '../api'
import { socialsuccess } from '@/lib/slices/sharedSlice'
import { useAppSelector } from '@/lib/hooks'
import { usePathname } from 'next/navigation';
import StoreProvider from '@/app/StoreProvider'
import Link from 'next/link'
import Image from 'next/image'
const authPaths = ["/login", "/register", "/forgot-password", "/reset-password", "/otp"];
const FooterChild = () => {
    const pathname = usePathname();
    const { genericLoader } = useSelector(state => state.flightState)
    const { saveTravellerLoader } = useSelector(state => state.insuranceState)
    const { paymentWaitLoader } = useSelector(state => state.paymentState)
    const { buttonLoader } = useSelector(state => state.hotelState)
    const dispatch = useDispatch()
    useEffect(() => {
        const getTerms = async () => {
            const data = await getSocialApi();
            if (data) {
                dispatch(socialsuccess(data));
            }
        };
        getTerms();
    }, []);
    const terms = useSelector(
        (item) => item?.sharedState?.social?.information?.[0]
    );
    const facebooklink = terms?.facebook
    const instalink = terms?.instagram
    const twitter = terms?.twitter
    const linikedin = terms?.linkedIn
    const { translation } = useSelector((state) => state.sharedState)
    const { loading } = useAppSelector((state) => state.exploreState);
    const isAuth = authPaths.includes(pathname);
    if (isAuth) {
        return null; // Hide the component for auth paths
    }
    return (
        <div>
            {
                loading || genericLoader || saveTravellerLoader || paymentWaitLoader || buttonLoader ?
                    null :
                    <div className='container mx-auto'>
                        <div className='grid lg:grid-cols-10'>
                            <div className='grid grid-cols-2 gap-10 w-full lg:grid-cols-5  lg:col-span-10  items-baseline pt-[50px] '>
                                <div className='flex flex-col gap-3 cursor-pointer'>
                                    <div>
                                        <h3 className='text-lg font-bold text-black '>{translation?.explore}</h3>
                                    </div>
                                    <div className='flex flex-col gap-4 text-sm font-normal cursor-pointer text-neutral-400'>
                                        <Link className='hover:text-emerald-800' href="/" ><h6>{translation?.home}</h6></Link>
                                        <Link className='hover:text-emerald-800' href='/flights' >{translation?.flights}</Link>
                                        <Link className='hover:text-emerald-800' href='/hotels'>{translation?.hotels}</Link>
                                        <Link className='hover:text-emerald-800' href="/packages"> {translation?.packages}</Link>
                                        <Link className='hover:text-emerald-800' href="/insurance">{translation?.travel_insurance}</Link>
                                        <Link className='hover:text-emerald-800' href="/activityCities" >{translation?.activities}</Link>
                                    </div>

                                </div>
                                <div className='flex flex-col gap-3 cursor-pointer'>
                                    <div>
                                        <h3 className='text-lg font-bold text-black '>{translation?.about}</h3>
                                    </div>
                                    <div className='flex flex-col gap-4 text-sm font-normal cursor-pointer text-neutral-400'>
                                        <Link className='hover:text-emerald-800' href="/aboutus"><h6>{translation?.about_us}</h6></Link>
                                        <Link className='hover:text-emerald-800' href="/terms-conditions"><h6>{translation?.terms_n_conditions}</h6></Link>
                                        <Link className='hover:text-emerald-800' href="/privacy-policy"><h6>{translation?.privacy_policy}</h6></Link>
                                    </div>

                                </div>
                                <div className='flex flex-col gap-3 cursor-pointer'>
                                    <div>
                                        <h3 className='text-lg font-bold text-black'>{translation?.for_users}</h3>
                                    </div>
                                    <div className='flex flex-col gap-4 text-sm font-normal text-neutral-400'>
                                        <Link className='hover:text-emerald-800' href="/login"><h6>{translation?.login}</h6></Link>
                                        <Link className='hover:text-emerald-800' href="/register"><h6>{translation?.register}</h6></Link>
                                        <Link className='hover:text-emerald-800' href='/settings'>{translation?.settings}</Link>
                                    </div>

                                </div>
                                <div className='flex flex-col gap-3 cursor-pointer'>
                                    <div>
                                        <h3 className='text-lg font-bold text-black'>{translation?.follow_us}</h3>
                                    </div>
                                    <div className='flex gap-3'>
                                        <Link href={`${facebooklink}`} target='blank'><Image className='w-5 h-5 sm:h-8 sm:w-8' src='/facebook3.png' alt="" width={100} height={100} /></Link>
                                        <Link href={`${instalink}`} target='blank'>  <Image className='w-5 h-5 sm:h-8 sm:w-8' src='/instagram3.png' alt="" width={100} height={100} /></Link>
                                        <Link href={`${twitter}`} target='blank'><Image className='w-5 h-5 sm:h-8 sm:w-8' src='/twitter.png' alt="" width={100} height={100} /></Link>
                                        <Link href={`${linikedin}`} target='blank'><Image className='w-5 h-5 sm:h-8 sm:w-8' src='/linkedin3.png' alt="" width={100} height={100} /></Link>
                                        {/* <img className='w-5 h-5 sm:h-8 sm:w-8' src={require('../../assets/linkedin3.png')} alt="" /> */}
                                    </div>
                                    <div className='items-baseline justify-between hidden gap-5 mt-6 md:flex'>
                                        <div className='flex flex-col items-center justify-center gap-2'>
                                            <Image src='/license/Emblem_of_Kuwait.png' alt="" className='object-contain w-12 ' width={100} height={100} />
                                            <p className='text-sm text-font-gray'>2012/2323/M</p>
                                        </div>
                                        <div className='flex flex-col items-center justify-center gap-2'>
                                            <Image src='/license/DGCA_Kuwait.png' alt="" className='object-contain w-16 ' width={100} height={100} />
                                            <p className='text-sm text-font-gray'>13384/42</p>
                                        </div>
                                        <div className='flex flex-col items-center justify-center gap-2'>
                                            <Image src='/license/iatalogo.png' alt="" className='object-contain w-16 h-16' width={100} height={100} />
                                            <p className='text-sm text-font-gray'>42212332</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex items-baseline justify-between gap-5 mt-6 md:hidden'>
                                    <div className='flex flex-col items-center justify-center gap-2'>
                                        <Image src='/license/Emblem_of_Kuwait.png' alt="" className='object-contain w-12 ' width={100} height={100} />
                                        <p className='text-sm text-font-gray'>2012/2323/M</p>
                                    </div>
                                    <div className='flex flex-col items-center justify-center gap-2'>
                                        <Image src='/license/DGCA_Kuwait.png' alt="" className='object-contain w-16 ' width={100} height={100} />
                                        <p className='text-sm text-font-gray'>13384/42</p>
                                    </div>
                                    <div className='flex flex-col items-center justify-center gap-2'>
                                        <Image src='/license/iatalogo.png' alt="" className='object-contain w-16 h-16' width={100} height={100} />
                                        <p className='text-sm text-font-gray'>42212332</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col items-center justify-center gap-2 pt-8 pb-16 md:pb-24 lg:pb-8 md:flex-row '>
                            <h4 className='text-sm font-normal text-black sm:text-sm lg:text-base '>Copyright © {new Date().getFullYear()} Flytern, Inc.- All Rights Reserved.</h4>
                        </div>
                    </div>
            }
        </div>
    )
}

const Footer = () => {
    return (
        <StoreProvider>
            <FooterChild />
        </StoreProvider>
    )
}

export default Footer