import React from 'react'
import Image from 'next/image';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const FlightMoreOptions = ({ flight, lang }) => {
  const router = useRouter();
  const { selectedLanguageAndCountry } = useSelector(state => state.sharedState)
  const { translation } = useSelector((state) => state.sharedState)
  return (
    <div className="container grid items-center justify-between w-full grid-cols-12 p-2 mx-auto border-b border-orange-100 bg-slate-50">
      <div className="flex flex-col col-span-9 ">
        {flight && flight.dTOSegments && flight.dTOSegments.length
          ? flight.dTOSegments.map((item, index) => (
            <div className="grid grid-cols-4" key={index}>
              <div className="flex flex-col items-center justify-center w-32 col-span-1 gap-1 ">
                <Image
                  width={40}
                  height={40}
                  className="object-cover w-10 "
                  src={item.airlineimgurl}
                  alt=""
                />
                <p className="text-sm text-center text-font-gray">{flight?.airlineName}</p>
              </div>
              <div className="col-span-3 p-2 rounded " >
                <div className="grid grid-cols-10 gap-3 ">
                  <div className="col-span-3">
                    <h1 className="text-xl font-medium text-black ">
                      {item.departureTime}
                    </h1>
                    <h3 className="text-xs font-normal xl:text-sm text-font-gray">
                      {item.departureDate}{" "}
                    </h3>
                    <div className="flex flex-col 2xl:flex-row 2xl:items-center 2xl:gap-2">
                      <h3 className="text-xs font-semibold xl:text-sm text-emerald-800 ">
                        {item.from}
                      </h3>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center h-full col-span-4 gap-2">

                    <div className="flex items-center justify-center">
                      {selectedLanguageAndCountry?.language?.code === "ar" ? (
                        <>
                          <Image
                            width={40}
                            height={20}
                            className="w-10 2xl:w-20 xl:w-16" src={track2} alt="" />
                          <h3 className={`text-emerald-800 font-semibold font-inter 2xl:text-[12px] text-[10px]`}>
                            {item.stops - 1 ? `${item.stops - 1} ${translation?.stops}` : translation?.Direct}
                          </h3>
                          <Image width={40} height={64} className="w-10 2xl:w-20 xl:w-16" src={"/misc/track1.svg"} alt="" />
                        </>
                      ) : (
                        <>
                          <Image width={48} height={64} className="w-12 2xl:w-20 xl:w-16" src={"/misc/track1.svg"} alt="" />
                          <h3 className={`text-emerald-800 font-semibold font-inter 2xl:text-[12px] text-[10px]`}>
                            {item.stops - 1 ? `${item.stops - 1} ${translation?.stops}` : translation?.Direct}
                          </h3>
                          <Image width={48} height={80} className="w-12 2xl:w-20 xl:w-16" src={"/misc/track2.svg"} alt="" />
                        </>
                      )}
                    </div>
                    <div className="flex flex-col items-center justify-center gap-3 xl:flex-row">
                      <div className="flex items-center justify-center px-2 py-1 text-xs font-medium rounded-md font-inter bg-tag-color text-tag-color w-28"><AccessTimeIcon fontSize="small" /> : {item.travelTime}</div>
                      {
                        item.baggageDisplay ? <div className="flex items-center justify-center px-2 py-1 text-xs font-medium rounded-md font-inter bg-tag-color text-tag-color w-28"><BusinessCenterIcon fontSize="small" /> : {item.baggageDisplay.replace(/,/g, '')}</div> : null}
                    </div>
                  </div>
                  <div className="flex flex-col items-end col-span-3">
                    <h1 className="text-xl font-medium text-black ">{item.arrivalTime}</h1>
                    <h3 className="text-xs font-normal xl:text-sm text-font-gray">
                      {item.arrivalDate}
                    </h3>
                    <div className="flex flex-col items-end 2xl:flex-row 2xl:items-center 2xl:gap-2 ">
                      <h3 className="text-xs font-semibold xl:text-sm text-emerald-800">
                        {item.to}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
          : null}
      </div>
      <div className="flex flex-col items-end col-span-3 gap-6">
        <div className="flex flex-col items-end col-span-3 gap-6">
          <div className="flex justify-between gap-5">
            <div className={`p-2 h-7 ${flight.isRefund ? 'bg-tag-color text-tag-color' : 'bg-red-600 bg-opacity-20 text-red-600'} rounded-md text-xs font-medium flex justify-center items-center`}>
              {flight.isRefund ? translation?.refundable : translation?.non_refundable}</div>
          </div>
          <div>
            {
              flight.isSale ?
                <div className="flex items-center justify-between">
                  <span className='text-sm font-medium text-font-gray '>{flight.currency} </span>
                  <h4 className='text-xl font-semibold line-through text-font-gray font-inter '>{parseFloat(flight.totalPrc).toFixed(3)}</h4>
                </div> : null
            }
            <h4 className='text-xl font-semibold text-tag-color-two font-inter'><span className='text-sm font-medium'>{flight.currency} </span>{parseFloat(flight.totalPrc).toFixed(3)}</h4>
          </div>
          <div>
            <button
              className='w-32 h-10 text-white rounded-md bg-dark-green'
              onClick={() => {
                const url = lang === "ar"
                  ? `/${lang}/flights/details?objId=${flight.objectId}&ind=${flight.index}`
                  : `/flights/details?objId=${flight.objectId}&ind=${flight.index}`;
                router.push(url);
              }}
            >
              {translation?.select}
            </button>
          </div>
          <div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default FlightMoreOptions