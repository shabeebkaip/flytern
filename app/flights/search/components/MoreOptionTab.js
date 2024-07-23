import React from 'react'
import Image from 'next/image';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useAppSelector } from '@/lib/hooks';
import { useRouter } from 'next/navigation';

const Moreoptiontab = ({ flight, lang }) => {
    const router = useRouter();
    const { selectedLanguageAndCountry } = useAppSelector(state => state.sharedState)
    const { translation } = useAppSelector((state) => state.sharedState)
    return (
        <div className='flex flex-col gap-5 p-5 bbg-slate-50 rounded-lg mb-5 border '>
            <div className='flex items-center justify-end gap-3 '>
                <div className='flex items-center gap-2'>
                    <div className={`px-2 h-7 text-[10px]  ${flight.isRefund ? 'bg-tag-color text-tag-color' : 'bg-red-600 bg-opacity-20 text-red-600'} rounded-md  font-medium  flex justify-center items-center`}>
                        {flight.isRefund ? translation?.refundable : translation?.non_refundable}
                    </div>
                </div>
            </div>
            <div className="flex flex-col   gap-4 pb-4 border-b">
                {flight && flight.dTOSegments && flight.dTOSegments.length
                    ? flight.dTOSegments.map((item, index) => (
                        <div key={index}>
                            <div>
                                <Image width={64} height={40} className='object-contain w-16 h-10' src={item.airlineimgurl} alt="" />
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
                                                <Image width={48} height={64} className="w-12 2xl:w-20 xl:w-16" src={"/misc/track1.svg"} alt="" />
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
                <h3 className='text-xs font-medium text-orange-400 '>{flight.currency} <span className='text-xl font-semibold text-orange-400'>{flight.totalPrc}</span> </h3>
                <div className='flex flex-col'>
                    <button
                        onClick={() => {
                            const url = lang === "ar"
                                ? `/${lang}/flights/details?objId=${flight.objectId}&ind=${flight.index}`
                                : `/flights/details?objId=${flight.objectId}&ind=${flight.index}`;
                            router.push(url)
                        }}
                        className='h-10 px-6 py-1.5 bg-emerald-800 rounded-md justify-center items-center gap-1 inline-flex text-center text-white text-sm font-medium'
                    >
                        {translation?.select}
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Moreoptiontab