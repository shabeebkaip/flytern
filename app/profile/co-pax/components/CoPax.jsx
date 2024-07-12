import HeaderBorder from '@/app/shared/components/HeaderBorder';
import LabelValue from '@/app/shared/components/LabelValue';
import { CoPaxIconSvg, EditIconSvg, SeeAllIconSvg } from '@/app/shared/components/SVG';
import { useAppSelector } from '@/lib/hooks';
import { Skeleton } from '@mui/material';
import Link from 'next/link';
import React from 'react'
import { useSelector } from 'react-redux';



const CoPax = () => {
    const array = [1, 1, 1, 1, 1]
    const { coPax } = useAppSelector(state => state.profileState);
    const { loading } = useSelector((state) => state.profileState || {});
    console.log(loading, "loading");

    // If the profile route is active, limit the number of displayed Co-Pax to 4
    const maxCoPaxCount = typeof window !== 'undefined' && window.location?.pathname.includes('/profile/co-pax') ? (coPax && coPax.length) : 4;

    const { translation } = useAppSelector((state) => state.sharedState)
    return (
        <div className='mt-[42px]'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <CoPaxIconSvg color='#066651' />
                    <h3 className='text-base font-semibold text-black sm:text-lg '>{translation?.copax} </h3>
                </div>
                <div>
                    <div onClick={() => { if (typeof window !== "undefined") {window.location.href = "/profile/co-pax"}}} className='flex items-center gap-2 font-normal text-blue-400' ><span> {translation?.see_all}</span> <SeeAllIconSvg /></div>
                </div>
            </div>
            <HeaderBorder />
            {
                loading ?
                    <div className='flex justify-center w-full'>
                        <Skeleton
                            sx={{ bgcolor: 'grey.300' }}
                            variant="rectangular"
                            className="w-full h-full mt-4 red"
                            height={300}
                        />
                    </div>
                    :
                    <div className='mt-6 lg:grid md:grid-cols-2 ' >
                        {coPax && coPax.length ? coPax.slice(0, maxCoPaxCount).map((item, index) => {
                            const lastArray = maxCoPaxCount > 2 ? (maxCoPaxCount % 2 === 0 ? [maxCoPaxCount - 1, maxCoPaxCount - 2] : [maxCoPaxCount - 1]) : [];

                            return (
                                <div className={` ${lastArray.includes(index) ? 'border-none' : 'border-b'}  pb-5 mt-6`} key={index}>
                                    <div className=''>
                                        <div className='flex items-center justify-start gap-10'>
                                            <h3 class="text-black text-sm font-semibold ">{translation?.copax} #{index + 1}</h3>
                                            <div onClick={() => { if (typeof window !== "undefined") {window.location.href=`/profile/co-pax/${item.id}`}}}><EditIconSvg color='#Fb923C' /></div>
                                        </div>
                                        {/* <HeaderBorder /> */}
                                    </div>


                                    <div className='flex flex-col gap-5 mt-4'>
                                        <LabelValue label={`Title`} value={item.title} />
                                        <LabelValue label={translation?.full_name} value={`${item.firstName} ${item.lastName}`} />
                                        <LabelValue label={translation?.nationality} value={item.nationalityName} />
                                        <LabelValue label={translation?.dob} value={item.dateofBirth} />
                                        <LabelValue label={translation?.passport_number} value={item.passportNumber} />
                                        <LabelValue label={translation?.passport_expire} value={item.passportExp} />
                                        <LabelValue label={translation?.passport_issuer_country} value={item.passportIssuedCountryName} />
                                    </div>
                                </div>
                            )
                        }) :
                            <div className='flex flex-col items-center justify-center col-span-2 gap-5'>
                                <h3 className='text-base font-semibold text-black sm:text-lg '>{translation?.no_copax_added}</h3>
                                <button className='p-2 sm:w-[160px] sm:h-[46px] rounded-md border border-emerald-800 text-center text-emerald-800 text-sm font-medium' onClick={() => navigate('/profile/co-pax/add')}>{translation?.add_copax}</button>
                            </div>
                        }
                    </div>
            }
        </div>
    )
}

export default CoPax;
