import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Autocomplete } from '@mui/material';
import { CustomTextField } from '../../../shared/components/CustomTextField';
import { flightPriceOptionSucess } from '@/lib/slices/flightSlice';
import TitleCard from '../../../shared/components/TitleCard';
import Image from 'next/image';

const PriceDetails = () => {
    const dispatch = useDispatch()
    const { flightDetails: { _lstCabinInfos = [] } } = useSelector(state => state.flightState)
    const { translation } = useSelector((state) => state.sharedState)

    const [selectedClass, setSelectedClass] = useState(null);
    useEffect(() => {
        if (_lstCabinInfos?.length > 0 && !selectedClass) {
            setSelectedClass(_lstCabinInfos[0] || null);
        }
    }, [_lstCabinInfos, selectedClass]);

    const filteredPriceDetails = selectedClass
        ? _lstCabinInfos?.filter((item) => item?.class === selectedClass?.class)
        : _lstCabinInfos;

    const handleSelectedPriceOption = (item) => {
        setSelectedClass(item);
        dispatch(flightPriceOptionSucess(item));
    }

    return (
        <div className='grid'>
            {filteredPriceDetails?.length > 0 &&
                filteredPriceDetails?.map((item, index) => (
                    <TitleCard title="Price Details" key={index}>
                        <div key={index} className="grid grid-cols-1 py-5 border-b sm:flex-row sm:gap-5">
                            <Autocomplete
                                disablePortal
                                id={`combo-box-demo-${index}`}
                                options={_lstCabinInfos || []}
                                getOptionLabel={(option) => option?.class}
                                onChange={(event, value) => handleSelectedPriceOption(value)}
                                value={selectedClass}
                                clearIcon={null}
                                renderInput={(params) => (
                                    <CustomTextField
                                        {...params}
                                        label={translation?.select_cabin}
                                    />
                                )}
                                className=' bg-stone-50'
                            />
                            <div className="flex flex-col gap-2" >
                                {item?.infos ? Object.values(item?.infos).map((info, index) => (
                                    <div key={index} dangerouslySetInnerHTML={{ __html: info }} className={`${selectedClass?.class?.includes(info) ? 'font-semibold' : ''}`}  ></div>
                                )) : null}
                            </div>
                            <div className='flex items-center w-full gap-3'>
                                <Image width={200} height={200} className='w-16 h-16' src={"/misc/adult.png"} alt="" />
                                <div className='flex flex-col w-1/2 gap-1 p-0'><h4 className='p-0 m-0 text-gray-500'>{translation?.adult}</h4>
                                    <h4 className='p-0 m-0'>{translation?.base_fare} : {parseFloat(item?.adultBase)?.toFixed(3)} {item?.currency}</h4>
                                </div>
                            </div>
                            {item?.childBase ?
                                <div className='flex items-center w-full gap-3'>
                                    <Image width={200} height={200} className='w-16 h-16' src={"/misc/adult.png"} alt="" />
                                    <div className='flex flex-col w-1/2 gap-1 p-0'><h4 className='p-0 m-0 text-gray-500'>{translation?.child}</h4>
                                        <h4 className='p-0 m-0'>{translation?.base_fare} : {parseFloat(item?.childBase)?.toFixed(3)} {item?.currency}</h4>
                                    </div>
                                </div>
                                : null
                            }
                            {item?.infantBase ?
                                <div className='flex items-center w-full gap-3'>
                                    <Image width={200} height={200} className='w-16 h-16' src={"/misc/adult.png"} alt="" />
                                    <div className='flex flex-col w-1/2 gap-1 p-0'><h4 className='p-0 m-0 text-gray-500'>{translation?.infant}</h4>
                                        <h4 className='p-0 m-0'>{translation?.base_fare} : {parseFloat(item?.infantBase).toFixed(3)} {item?.currency}</h4>
                                    </div>
                                </div>
                                : null}
                            <div className='flex flex-col justify-center gap-3 pt-6 border-t'>
                                <div className='flex items-center w-full'>
                                    <div className='flex items-center justify-start w-1/2'>
                                        <h4>{translation?.base_fare} </h4>
                                    </div>
                                    <h4 className='w-1/2'>{parseFloat(item?.totalBase).toFixed(3)} {item?.currency}</h4>
                                </div>
                                <div className='flex items-center w-full'>
                                    <div className='flex items-center justify-start w-1/2 gap-3'>
                                        <h4>{translation?.tax_fare}</h4>
                                    </div>
                                    <h4 className='w-1/2'>{parseFloat(item?.totalTax).toFixed(3)} {item?.currency}</h4>
                                </div>
                                {
                                    item.discount > 0 ?
                                        <div className='flex items-center w-full'>
                                            <div className='flex items-center justify-start w-1/2 gap-3'>
                                                <h4>{translation?.discount}</h4>
                                            </div>
                                            <h4 className='w-1/2'>{parseFloat(item?.discount).toFixed(3)} {item?.currency}</h4>
                                        </div> : null
                                }
                                <div className='flex items-center w-full'>
                                    <div className='flex items-center justify-start w-1/2 gap-3'>
                                        <h4>{translation?.total_fare}</h4>
                                    </div>
                                    <h4 className='w-1/2'>{parseFloat(item?.totalPrice)?.toFixed(3)} {item?.currency}</h4>
                                </div>
                            </div>

                            <div className='pt-6 mt-4 border-t'>
                                <div className='flex items-center w-full'>
                                    <div className='flex items-center justify-start w-1/2 gap-3'>
                                        <h4>{translation?.grand_total}</h4>
                                    </div>
                                    <h4 className='w-1/2'>{parseFloat(item?.finalAmount)?.toFixed(3)} {item?.currency}</h4>
                                </div>
                            </div>
                        </div>
                    </TitleCard>
                ))}        </div>
    );
};

function mapStateToProps(state) {
    return {
        priceDetails: state?.flightState?.flightDetails?._lstCabinInfos,
    };
}

export default connect(mapStateToProps, null)(PriceDetails);
