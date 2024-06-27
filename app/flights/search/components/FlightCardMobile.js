import React from 'react'

import { connect, useDispatch, useSelector } from 'react-redux'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { getMoreOptionsApi } from '@/app/flights/api';
import Moreoptiontab from '@/app/flights/search/components/MoreOptionTab';
import Image from 'next/image';


const FlightCardMobile = ({ flight, index, flightIndex, flightResults, lang }) => {
    const { selectedLanguageAndCountry } = useSelector(state => state.sharedState)
    const [more, setMore] = React.useState(false)
    const dispatch = useDispatch();
    const { translation } = useSelector((state) => state.sharedState)

    const handleMoreOptionsClick = () => {
        dispatch(getMoreOptionsApi(flight.objectId, flight.index, flightIndex, flightResults));
        setMore(!more);
    };
    return (
        <div className='flex flex-col gap-5 p-5 bg-white rounded-lg '>

            <div className="flex flex-col   gap-4 pb-4 border-b">
                {flight && flight.dTOSegments && flight.dTOSegments.length
                    ? flight.dTOSegments.map((item, index) => (
                        <div className='' key={index}>
                            <div className=' flex justify-start '>
                                <Image w={64} height={40} className='object-contain w-16 h-10' src={item.airlineimgurl} alt="" />
                            </div>

                            <div className="flex md:items-center items-start justify-between w-full ">
                                <div className='w-[25%] flex flex-col items-start'>
                                    <div className='flex flex-col sm:flex-row items-center gap-2'>
                                        <h3 className="text-sm text-emerald-800 font-semibold ">
                                            {item.from}
                                        </h3>
                                        <h3 className="text-[9px] sm:text-sm font-normal  text-font-gray">{item.fromCountry}{" "} </h3>
                                    </div>
                                    <h1 className="text-base font-medium text-black sm:text-xl ">{item.departureTime}</h1>
                                    <h3 className="text-[9px] sm:text-sm font-normal  text-font-gray">{item.departureDate}</h3>
                                </div>
                                <div className="flex flex-col items-center justify-center h-full col-span-4 gap-2 w-[50%]">

                                    <div className="flex justify-center items-center w-full">
                                        {selectedLanguageAndCountry?.language?.code === "ar" ? (
                                            <>
                                                <Image width={40} height={40} className="w-[70%] " src={"/misc/track2.svg"} alt="" />
                                                <h3 className={`text-emerald-800 font-semibold font-inter text-[9px] sm:text-[12px]`}>
                                                    {item.stops - 1 ? `${item.stops - 1} ${translation?.stops}` : translation?.Direct}
                                                </h3>
                                                <Image width={40} height={40} className="w-full " src={"/misc/track1.svg"} alt="" />
                                            </>
                                        ) : (
                                            <>
                                                <Image className="w-[30%] sm:w-[40%]" width={40} height={40} src={"/misc/track1.svg"} alt="" />
                                                <h3 className={`text-emerald-800 font-semibold font-inter text-[9px] sm:text-[12px]`}>
                                                    {item.stops - 1 ? `${item.stops - 1} ${translation?.stops}` : translation?.Direct}
                                                </h3>
                                                <Image width={40} height={40} className="w-[30%] sm:w-[40%]" src={"/misc/track2.svg"} alt="" />
                                            </>
                                        )}
                                    </div>
                                    <div className="flex flex-col sm:flex-row justify-center items-center gap-3 ">
                                        <div className="flex items-center justify-center px-2 py-1 text-xs font-medium rounded-md font-inter bg-tag-color text-tag-color"><AccessTimeIcon fontSize="small" /> : {item.travelTime}</div>
                                        {
                                            item.baggageDisplay ? <div className="flex items-center justify-center px-2 py-1 text-xs font-medium rounded-md font-inter bg-tag-color text-tag-color"><BusinessCenterIcon fontSize="small" /> : {item.baggageDisplay.replace(/,/g, '')}</div> : null}
                                    </div>
                                </div>
                                <div className="flex flex-col items-end  w-[25%]">
                                    <div className='flex flex-col sm:flex-row items-center gap-2'>
                                        <h3 className="text-sm  text-emerald-800 font-semibold">
                                            {item.to}
                                        </h3>
                                        <h3 className="text-[9px] sm:text-sm font-normal  text-font-gray"> {item.toCountry}</h3>
                                    </div>
                                    <h1 className="text-base font-medium text-black sm:text-xl ">{item.arrivalTime}</h1>
                                    <h3 className="text-[9px] sm:text-sm font-normal  text-font-gray">{item.arrivalDate}</h3>
                                </div>
                            </div>
                        </div>
                    )) : null}

            </div>
            <div className='flex items-center justify-between'>
                <div className='flex flex-col gap-1'>
                    <div className='flex items-center gap-2'>
                        <div className={`px-2 h-7 text-[10px]  ${flight.isRefund ? 'bg-tag-color text-tag-color' : 'bg-red-600 bg-opacity-20 text-red-600'} rounded-md  font-medium  flex justify-center items-center`}>
                            {flight.isRefund ? translation?.refundable : translation?.non_refundable}
                        </div>

                    </div>
                    <h3 className='text-xs font-medium text-orange-400 '>{flight.currency} <span className='text-xl font-semibold text-orange-400'>{flight.totalPrc}</span> </h3>
                </div>
                <div className='flex flex-col gap-3'>
                    <button
                        onClick={() => {
                            if (typeof window !== "undefined") {
                                const url = lang === "ar"
                                    ? `/${lang}/flights/details?objId=${flight.objectId}&ind=${flight.index}`
                                    : `/flights/details?objId=${flight.objectId}&ind=${flight.index}`;
                                window.location.href = url;
                            }
                        }}
                        className='h-10 px-6 py-1.5 bg-emerald-800 rounded-md justify-center items-center gap-1 inline-flex text-center text-white text-sm font-medium'
                    >
                        {translation?.select}
                    </button>

                    {
                        flight.moreOptioncount ?
                            <span className="xl:text-sm text-xs text-right cursor-pointer text-emerald-800" onClick={handleMoreOptionsClick}>
                                {flight.moreOptioncount} {translation?.more_options_available}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={`inline-block w-4 h-4 ml-1 ${more ? 'transform rotate-180' : ''}`}>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </span> : null
                    }
                </div>

            </div>
            {
                flight && flight?.moreOptions?.length && more ?
                    flight?.moreOptions?.map((item, index) => (
                        <Moreoptiontab flight={item} key={index} />
                    )) : null
            }
        </div>
    )
}

function mapStateToProps(state) {
    return {
        flightResults: state?.flightState?.flightResults,
        flightMoreOptions: state?.flightState?.flightMoreOptions,
    }
}

export default connect(mapStateToProps)(FlightCardMobile);