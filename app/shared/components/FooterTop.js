"use client"
import StoreProvider from '@/app/StoreProvider'
import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux'
import { usePathname } from 'next/navigation'

const authPaths = ["/login", "/register", "/forgot-password", "/reset-password", "/otp","/forgot-password/otp"]
const FooterTopChild = () => {
    const pathname = usePathname();
    const { translation } = useSelector(state => state.sharedState)
    const { genericLoader } = useSelector(state => state.flightState)
    const { saveTravellerLoader } = useSelector(state => state.insuranceState)
    const { paymentWaitLoader } = useSelector(state => state.paymentState)
    const { loading } = useSelector((state) => state.exploreState);

    const isAuth = authPaths.includes(pathname);

    if (isAuth) {
        return null;
    }

    return (
        <>
            {
                loading || genericLoader || saveTravellerLoader || paymentWaitLoader ?
                    null :
                    <div className=' bg-black lg:grid grid-cols-10 h-[356px] hidden ' >
                        <div className='relative col-span-4 '>
                            <Image className='w-full h-60' src='/footerone.png' alt="" srcSet="" width={1000} height={1000} />
                            <Image className='h-80 w-72 absolute  left-[30%] bottom-0' src='/footerphone.png' alt="" width={500} height={500} />
                        </div>
                        <div className="flex flex-col justify-center h-full col-span-6 gap-8 pl-10">
                            <div className='flex flex-col text-white gap-7'>
                                <h3 className='text-3xl font-bold uppercase'>{translation?.download_app}</h3>
                                <h4 className='text-2xl font-medium uppercase'>{translation?.be_informed_about}</h4>
                                <h6 className='text-orange-400 text-[15px] font-normal uppercase'>{translation?.for_free}</h6>
                            </div>
                            <div className='flex gap-5 cursor-pointer'>
                                <a href='https://play.google.com/store/apps/details?id=com.oneglobal.flytern' target='_blank' rel="noreferrer"><Image className='w-[184px] h-[50px] rounded-md' src='/googleicon.png' alt="" width={1000} height={1000} /></a>
                                <a href='https://apps.apple.com/us/app/flytern-flights-hotels/id6469104609' target='_blank' rel="noreferrer" >
                                    <Image className='w-[184px] h-[50px] rounded-md ' src='/appleicon.png' alt="" width={1000} height={1000} />
                                </a>
                            </div>
                        </div>
                    </div>
            }
        </>
    );
}

const FooterTop = () => {
    return (
        <StoreProvider>
            <FooterTopChild />
        </StoreProvider>
    );
}

export default FooterTop;
