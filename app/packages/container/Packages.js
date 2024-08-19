import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPackagesApi, getpackageCountryListApi } from '../api';
import { CustomTextField } from '@/app/shared/components/CustomTextField';
import { Autocomplete, Skeleton } from '@mui/material';
import InfiniteScroll from "react-infinite-scroll-component";
import PackageCard from '../components/PackageCard';
import PackagePoster from '@/app/shared/components/PackagePoster';
import { useAppSelector } from '@/lib/hooks';



const Packages = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(null)
    const { data: { packages, destinations } = {} } = useAppSelector(state => state.packageState) || {};
    const packageLoader = useAppSelector(state => state.packageState.packageLoader)
    const { selectedLanguageAndCountry } = useAppSelector((state) => state.sharedState);
    const { data } = useAppSelector(state => state.packageState) || {};
    const [next, setNext] = useState(false)
    const [selectedDestination, setSelectedDestination] = useState(null);



    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.scrollTo(0, 0);
            dispatch(getPackagesApi({ pageid: page }));
            dispatch(getpackageCountryListApi())
        }
    }, [dispatch]);

    useEffect(() => {
        if (!page) {
            setPage(data?.currentPage)
        }
        const hasNext = page >= data?.totalPages ? false : true
        setNext(hasNext)
    }, [data])


    const filteredPackages = selectedDestination
        ? packages.filter(item => item.destinations === selectedDestination.countryName)
        : packages;
    const handleNext = () => {
        // window.location.reload(false)
        var pa = page + 1
        const hasNext = pa >= data?.totalPages ? false : true
        setNext(hasNext)
        if (pa <= data?.totalPages) {

            var pa = page + 1
            setPage(pa)
            dispatch(getPackagesApi({ pageid: pa }, data));
        }

    }
    const { translation } = useSelector((state) => state.sharedState)

    return (
        <div className={` ${selectedLanguageAndCountry?.language?.code === "ar" ? 'rtl font-arabic' : 'font-inter'} mt-12`}>
            <div className='grid grid-cols-10 gap-8'>
                {
                    packageLoader ?
                        <div className='col-span-7'>
                            <Skeleton
                                sx={{ bgcolor: 'grey.300' }}
                                variant="rectangular"
                                className="w-1/3 h-full bg-stone-50"
                                height={30}
                            />
                        </div>
                        :
                        <div className='col-span-7'>
                            <h3 className='text-2xl font-bold text-black'>{translation?.packages}</h3>
                        </div>
                }

                {
                    packageLoader ?
                        <Skeleton
                            sx={{ bgcolor: 'grey.300' }}
                            variant="rectangular"
                            className="h-full col-span-3 bg-stone-50"
                            height={60}
                        /> :
                        <div className='col-span-10 md:col-span-3'>
                            <Autocomplete
                                style={{ fontFamily: 'font-arabic' }}
                                disablePortal
                                id={`combo-box`}
                                options={destinations}
                                getOptionLabel={option => option.countryName}
                                value={selectedDestination}
                                onChange={(_, newValue) => {
                                    setSelectedDestination(newValue);
                                }}
                                renderInput={params => (
                                    <CustomTextField
                                        {...params}
                                        label={translation?.select_destination}
                                    />
                                )}
                                className='bg-stone-50'
                            />
                        </div>
                }

            </div>
            <div className='grid grid-cols-10 gap-8'>
                <div className='flex flex-col col-span-10 gap-4 lg:col-span-7'>
                    {
                        packageLoader ?
                            Array(10).fill().map((item, index) => (
                                <Skeleton
                                    sx={{ bgcolor: 'grey.300' }}
                                    variant="rectangular"
                                    className="w-full h-full bg-stone-50"
                                    height={200}
                                    key={index}
                                />
                            )) :
                            filteredPackages && filteredPackages.length > 0 ? (
                                <InfiniteScroll
                                    dataLength={filteredPackages?.length}
                                    next={handleNext}
                                    hasMore={next}
                                    loader={<p className="mt-2 mb-2 text-lg font-semibold text-center text-stone-500">Loading Packages....</p>}
                                >

                                    {filteredPackages.map((item, index) => (
                                        <PackageCard item={item} key={index} />
                                    ))}
                                </InfiniteScroll>
                            ) : (
                                <p>No packages available for the selected destination.</p>

                            )}
                </div>

                <div className='hidden mt-8 lg:block lg:col-span-3'>
                    {
                        packageLoader ?
                            <Skeleton
                                sx={{ bgcolor: 'grey.300' }}
                                variant="rectangular"
                                className="h-full col-span-3 bg-stone-50"
                                height={500}
                            /> :
                            <PackagePoster />
                    }
                </div>
            </div>
        </div>
    )
}

export default Packages