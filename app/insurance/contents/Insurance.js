import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Skeleton, Snackbar } from '@mui/material';
import { setSaveTravellerLoader } from '@/lib/slices/insuranceSlice';
import { useAppSelector } from '@/lib/hooks';
import { setGenericLoader } from '@/lib/slices/flightSlice';
import FLightAndHotelContactForm from '@/app/shared/components/FLightAndHotelContactForm';
import GenericLoader from '@/app/shared/components/GenericLoader';
import InsuranceForm from '../components/InsuranceForm';
import { getInsuranceFormListApi } from '../api';
import PackagePoster from '@/app/shared/components/PackagePoster';
import CovidForm from '../components/CovidForm';
import RegularForm from '../components/RegularForm';
import PaymentSummary from '../components/PaymentSummary';
import UserDetails from '../components/UserDetails';
import { setPaymentWaitLoader } from '@/lib/slices/paymentSlice';
import { SnackbarProvider } from 'notistack';

const Insurance = () => {
    const { loading } = useAppSelector(state => state.insuranceState)
    const { saveTravellerLoader } = useAppSelector(state => state.insuranceState)
    const [tabIndex, setTabIndex] = useState(0);
    const [mainData, setMainData] = useState({});
    const { insurancePaymentSummary } = useAppSelector(state => state.insuranceState)
    const dispatch = useDispatch()
    const data = mainData;
    useEffect(() => {
        dispatch(getInsuranceFormListApi());
    }, [dispatch]); // Added the dependency array

    useEffect(() => {
        return () => {
            dispatch(setGenericLoader(false))
            dispatch(setSaveTravellerLoader(false))
            dispatch(setPaymentWaitLoader(false))
        }
    }, []);
    const { translation } = useAppSelector((state) => state.sharedState)
    const { selectedLanguageAndCountry } = useAppSelector((state) => state.sharedState);

    return (
        <div className={` ${selectedLanguageAndCountry?.language?.code === "ar"  ? 'rtl font-arabic' : 'font-inter'} container mx-auto px-4`}>
            {
                saveTravellerLoader ?
                    <GenericLoader text={"Crafting seamless payments - your submission page is moments away!"} />
                    :
                    <div className='mt-12 mb-8'>
                        <SnackbarProvider>
                            {
                                loading ?
                                    <Skeleton
                                        sx={{ bgcolor: 'grey.300' }}
                                        variant="rectangular"
                                        className="h-full bg-stone-50"
                                        width={"10vw"}
                                        height={40}
                                    /> :
                                    <div>
                                        <h3 className='text-2xl font-bold text-black cursor-pointer '>
                                            {translation?.travel_insurance}
                                        </h3>
                                    </div>
                            }
                            <div className='grid grid-cols-10 gap-8 mt-8'>
                                <div className='flex flex-col col-span-10 gap-5 lg:col-span-7'>
                                    {
                                        loading ?
                                            <Skeleton
                                                sx={{ bgcolor: 'grey.300' }}
                                                variant="rectangular"
                                                className="w-full h-full bg-stone-50"
                                                height={40}
                                            /> :
                                            <InsuranceForm tabIndex={tabIndex} setTabIndex={setTabIndex} />
                                    }
                                    {
                                        loading ?
                                            <Skeleton
                                                sx={{ bgcolor: 'grey.300' }}
                                                variant="rectangular"
                                                className="w-full h-full bg-stone-50"
                                                height={"70vh"}
                                            /> :
                                            tabIndex === 0 && <CovidForm />
                                    }
                                    {
                                        loading ?
                                            <Skeleton
                                                sx={{ bgcolor: 'grey.300' }}
                                                variant="rectangular"
                                                className="w-full h-full bg-stone-50"
                                                height={"70vh"}
                                            /> :
                                            tabIndex === 1 && <RegularForm setMainData={setMainData} />
                                    }
                                    {
                                        loading ?
                                            <Skeleton
                                                sx={{ bgcolor: 'grey.300' }}
                                                variant="rectangular"
                                                className="w-full h-full bg-stone-50"
                                                height={"20vh"}
                                            /> :
                                            <FLightAndHotelContactForm />
                                    }
                                    {
                                        loading ?
                                            <Skeleton
                                                sx={{ bgcolor: 'grey.300' }}
                                                variant="rectangular"
                                                className="w-full h-full bg-stone-50"
                                                height={"20vh"}
                                            /> :

                                            insurancePaymentSummary.price && <PaymentSummary />
                                    }
                                    {
                                        loading ?
                                            <Skeleton
                                                sx={{ bgcolor: 'grey.300' }}
                                                variant="rectangular"
                                                className="w-full h-full bg-stone-50"
                                                height={"50vh"}
                                            /> :

                                            insurancePaymentSummary.price &&
                                            <div>
                                                <UserDetails setMainData={setMainData} object={data} />
                                            </div>
                                    }
                                </div>
                                <div className='hidden col-span-3 lg:block'>
                                    {
                                        loading ?
                                            <Skeleton
                                                sx={{ bgcolor: 'grey.300' }}
                                                variant="rectangular"
                                                className="w-full h-full bg-stone-50"
                                                height={"100vh"}
                                            /> :
                                            <PackagePoster />
                                    }
                                </div>
                            </div>
                        </SnackbarProvider>
                    </div>
            }
        </div>
    );
};

export default Insurance;
